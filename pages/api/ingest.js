import { XMLParser } from 'fast-xml-parser';
import { adminDb } from '../../lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 1. Fetch the XML feed from the mock API endpoint
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host || 'localhost:3000';
    const feedUrl = `${protocol}://${host}/api/properties`;
    const response = await fetch(feedUrl);
    const xmlData = await response.text();

    console.log("Ingest API: Starting ingestion...");

    // 2. Define the Agent for this specific feed
    // In a real scenario, this endpoint might be called like /api/ingest?agentId=agent_123
    const agentId = req.query.agentId || 'agent_winkworth_01';
    const agentProfile = {
      id: agentId,
      name: 'Winkworth',
      branchName: 'Hellesdon',
      email: 'hello@winkworth.co.uk',
      phone: '01603 123456',
      website: 'https://winkworth.co.uk',
      logo: 'https://ui-avatars.com/api/?name=W&background=01bf8f&color=fff',
      feedUrl: 'https://winkworth.co.uk/feed.xml',
      updatedAt: FieldValue.serverTimestamp()
    };

    // 3. Parse the XML into a Javascript Object
    const parser = new XMLParser({
      ignoreAttributes: false,
      parseAttributeValue: true,
      textNodeName: "_text",
      cdataPropName: "__cdata"
    });

    let parsedObj = parser.parse(xmlData);

    // Fetch existing properties to preserve their state (like isBoosted)
    const existingPropsSnapshot = await adminDb.collection('properties').where('agentId', '==', agentId).get();
    const existingPropertiesMap = {};
    existingPropsSnapshot.forEach((docSnap) => {
      existingPropertiesMap[docSnap.id] = docSnap.data();
    });

    // 4. Navigate the parsed XML
    let propertiesData = parsedObj?.properties?.property || [];
    if (!Array.isArray(propertiesData)) {
      propertiesData = [propertiesData];
    }

    const mappedProperties = propertiesData.map((prop) => {
      // 1. Extract Pictures
      let imagesArray = [];
      if (prop.pictures && prop.pictures.picture) {
        const pics = Array.isArray(prop.pictures.picture)
          ? prop.pictures.picture
          : [prop.pictures.picture];
        imagesArray = pics.map(p => p.filename || p._text || p).filter(Boolean);
      }

      // 2. Extract Floorplans
      let floorplansArray = [];
      if (prop.floorplans && prop.floorplans.floorplan) {
        const fps = Array.isArray(prop.floorplans.floorplan)
          ? prop.floorplans.floorplan
          : [prop.floorplans.floorplan];
        floorplansArray = fps.map(f => f.filename || f._text || f).filter(Boolean);
      }

      // 3. Extract Bullets
      const bullets = [];
      for (let i = 1; i <= 10; i++) {
        if (prop[`bullet${i}`]) {
          bullets.push(prop[`bullet${i}`]);
        }
      }

      // 4. Extract Rooms
      let roomsArray = [];
      if (prop.rooms && prop.rooms.room) {
        const rooms = Array.isArray(prop.rooms.room)
          ? prop.rooms.room
          : [prop.rooms.room];
        roomsArray = rooms.map(r => ({
          name: r["@_name"] || r.name || 'Room',
          measurements: r.measurement_text || '',
          description: r.description || ''
        }));
      }

      // 5. Construct Address
      const addressParts = [
        prop.house_number,
        prop.street,
        prop.district,
        prop.town,
        prop.county,
        prop.postcode
      ].filter(Boolean);
      const displayAddress = addressParts.join(', ') || 'Address Not Provided';

      // 6. Identify Property ID (from attribute 'reference')
      const propertyId = prop["@_reference"] || prop.reference || prop.propertyID?.toString() || `imported-${Date.now()}-${Math.random()}`;
      const existingProp = existingPropertiesMap[propertyId];

      // 6. Extract additional adverts (advert2–advert6)
      const adverts = [];
      for (let i = 2; i <= 6; i++) {
        const advert = prop[`advert${i}`];
        if (advert && typeof advert === 'string' && advert.trim()) {
          adverts.push(advert.trim());
        }
      }

      return {
        id: propertyId,
        title: prop.advert_heading || `${prop.bedrooms || ''} Bed Property`,
        address: displayAddress,
        houseNumber: prop.house_number || '',
        street: prop.street || '',
        district: prop.district || '',
        town: prop.town || '',
        county: prop.county || '',
        postcode: prop.postcode || '',
        country: prop.country || 'UK',
        area: prop.area || '',
        price: parseFloat(prop.numeric_price) || 0,
        priceText: prop.price_text || `£${prop.numeric_price}`,
        bedrooms: parseInt(prop.bedrooms) || 0,
        bathrooms: parseInt(prop.bathrooms) || 0,
        receptions: parseInt(prop.receptions) || 0,
        propertyType: prop.property_type || '',
        propertyStyle: prop.property_style || '',
        propertyOfWeek: prop.propertyofweek === 'Yes',
        description: prop.main_advert || prop.summary || '',
        adverts,
        images: imagesArray,
        mainImage: imagesArray[0] || null,
        floorplans: floorplansArray,
        bullets,
        rooms: roomsArray,
        tenure: prop.tenure || '',
        department: prop.department || '',
        priority: prop.priority || '',
        brochure: prop.brochure || '',
        virtualTourUrl: prop.virtual_tour_url || '',
        location: {
          lat: parseFloat(prop.location?.latitude) || 52.6280,
          lng: parseFloat(prop.location?.longitude) || 1.2974
        },
        status: prop.priority || prop.status || 'For Sale',
        isBoosted: existingProp?.isBoosted || false,

        agentId: agentId,
        agent: {
          name: agentProfile.name,
          branchName: agentProfile.branchName,
          logo: agentProfile.logo
        },

        createdAt: FieldValue.serverTimestamp()
      };
    });

    // 5. Save to Firebase Firestore using a single Batch
    const batch = adminDb.batch();

    // Save the Agent Record
    const agentRef = adminDb.collection('agents').doc(agentId);
    batch.set(agentRef, agentProfile, { merge: true });

    // Save the Properties
    mappedProperties.forEach((property) => {
      const docRef = adminDb.collection('properties').doc(property.id);
      batch.set(docRef, property, { merge: true });
    });

    await batch.commit();

    return res.status(200).json({
      success: true,
      message: `Successfully saved agent profile and ${mappedProperties.length} properties to Firestore.`,
      data: {
        agent: agentProfile,
        propertiesCount: mappedProperties.length
      }
    });

  } catch (error) {
    console.error("Ingestion Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
