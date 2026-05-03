import { db } from '../../lib/firebase';
import { collection, getDocs, writeBatch, doc } from 'firebase/firestore';
import { MOCK_PROPERTIES } from '../../utils/mockData';

// One-time migration: patches existing Firestore property docs to match Expert Agent schema.
// Call GET /api/migrate-properties?secret=<MIGRATION_SECRET> once, then delete this file.
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (req.query.secret !== process.env.MIGRATION_SECRET) {
    return res.status(401).json({ error: 'Unauthorised' });
  }

  try {
    const propertiesRef = collection(db, 'properties');
    const snapshot = await getDocs(propertiesRef);

    // Build a lookup of mock data by id for merging
    const mockById = Object.fromEntries(MOCK_PROPERTIES.map(p => [p.id, p]));

    const batch = writeBatch(db);
    const updated = [];
    const skipped = [];

    snapshot.forEach((docSnap) => {
      const existing = docSnap.data();
      const mock = mockById[docSnap.id];

      const schemaDefaults = {
        houseNumber: '',
        district: '',
        county: '',
        country: 'UK',
        area: '',
        priceText: existing.price ? `£${existing.price.toLocaleString('en-GB')}` : '',
        receptions: 0,
        propertyType: '',
        propertyStyle: '',
        propertyOfWeek: false,
        adverts: [],
        mainImage: existing.images?.[0] || null,
        floorplans: [],
        bullets: [],
        rooms: [],
        tenure: '',
        department: 'Residential Sales',
        priority: 'On Market',
        brochure: '',
        virtualTourUrl: '',
        status: existing.status || 'For Sale',
        agentId: existing.agentId || '',
      };

      // Merge: mock data wins over defaults, existing Firestore data wins over both
      // (preserves manually edited fields like isBoosted, location, agent)
      const patched = {
        ...schemaDefaults,
        ...(mock || {}),
        // Always preserve these from Firestore so we don't clobber live edits
        id: existing.id || docSnap.id,
        isBoosted: existing.isBoosted ?? schemaDefaults.isBoosted ?? false,
        location: existing.location || mock?.location || { lat: 52.628, lng: 1.297 },
        agent: existing.agent || mock?.agent || {},
        agentId: existing.agentId || mock?.agentId || '',
        createdAt: existing.createdAt,
      };

      batch.set(doc(db, 'properties', docSnap.id), patched, { merge: false });
      updated.push(docSnap.id);
    });

    await batch.commit();

    return res.status(200).json({
      success: true,
      message: `Migrated ${updated.length} properties.`,
      updated,
      skipped,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
