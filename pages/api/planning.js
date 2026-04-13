const rateLimitMap = new Map();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate Limiting Policy
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 20;
  
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
  } else {
    const rateData = rateLimitMap.get(ip);
    if (now > rateData.resetTime) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    } else {
      rateData.count++;
      if (rateData.count > maxRequests) {
        return res.status(429).json({ error: 'Too many requests, please try again later.' });
      }
    }
  }

  // Pseudo-periodic cleanup of stale IPs to prevent memory leaks in long-running pods
  if (Math.random() < 0.05) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) rateLimitMap.delete(key);
    }
  }

  const rawQuery = req.query.location || req.query.postcode;
  const query = Array.isArray(rawQuery) ? rawQuery[0] : rawQuery;
  
  if (!query) {
    return res.status(400).json({ error: 'Location is required' });
  }

  try {
    let longitude, latitude, locationName, district;

    // 1. Get coordinates from query (try Postcode -> Outcode -> Place)
    let pcRes = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(query)}`);
    let pcData = await pcRes.json();
    
    if (pcData.status === 200) {
      longitude = pcData.result.longitude;
      latitude = pcData.result.latitude;
      locationName = pcData.result.postcode;
      district = pcData.result.admin_district;
    } else {
      // Try outcode
      pcRes = await fetch(`https://api.postcodes.io/outcodes/${encodeURIComponent(query)}`);
      pcData = await pcRes.json();
      if (pcData.status === 200) {
        longitude = pcData.result.longitude;
        latitude = pcData.result.latitude;
        locationName = pcData.result.outcode;
        district = Array.isArray(pcData.result.admin_district) ? pcData.result.admin_district[0] : pcData.result.admin_district;
      } else {
        // Try place
        pcRes = await fetch(`https://api.postcodes.io/places?q=${encodeURIComponent(query)}`);
        pcData = await pcRes.json();
        if (pcData.status === 200 && pcData.result && pcData.result.length > 0) {
          const typePriority = { 'City': 1, 'Town': 2, 'Suburban Area': 3, 'Village': 4, 'Hamlet': 5 };
          
          pcData.result.sort((a, b) => {
            const pA = typePriority[a.local_type] || 99;
            const pB = typePriority[b.local_type] || 99;
            return pA - pB;
          });

          const bestMatch = pcData.result[0];
          longitude = bestMatch.longitude;
          latitude = bestMatch.latitude;
          locationName = bestMatch.name_1;
          district = bestMatch.district_borough || bestMatch.county_unitary;
        } else {
          // Last resort: OpenStreetMap Nominatim for counties, boroughs, cities that postcodes.io misses
          const nomRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query + ', UK')}&format=json&limit=1`, {
            headers: { 'User-Agent': 'whatsplanned-app' }
          });
          const nomData = await nomRes.json();
          if (nomData && nomData.length > 0) {
            longitude = parseFloat(nomData[0].lon);
            latitude = parseFloat(nomData[0].lat);
            locationName = nomData[0].name || query;
            district = nomData[0].display_name.split(',')[1]?.trim() || '';
          } else {
            return res.status(404).json({ error: 'Location not found. Please try a valid UK postcode, outcode, or city name.' });
          }
        }
      }
    }

    // 2. We can draw a small bounding box (roughly 1km each way)
    const delta = 0.01;
    const polygon = `POLYGON((${longitude-delta} ${latitude-delta}, ${longitude+delta} ${latitude-delta}, ${longitude+delta} ${latitude+delta}, ${longitude-delta} ${latitude+delta}, ${longitude-delta} ${latitude-delta}))`;

    // 3. Query planning API
    const url = `https://www.planning.data.gov.uk/entity.json?dataset=planning-application&dataset=brownfield-land&geometry=${encodeURIComponent(polygon)}&geometry_relation=intersects&limit=50`;
    
    const planRes = await fetch(url);
    if (!planRes.ok) {
      throw new Error('Failed to fetch from planning.data.gov.uk');
    }
    const planData = await planRes.json();

    return res.status(200).json({
      location: { 
        name: locationName, 
        admin_district: district, 
        lat: latitude, 
        lng: longitude 
      },
      entities: planData.entities || [],
      count: planData.count || 0
    });
  } catch (error) {
    console.error('Planning API error:', error);
    return res.status(500).json({ error: 'Internal server error while fetching planning data' });
  }
}
