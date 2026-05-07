function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const toRad = d => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function resolveSchoolType(tags) {
  if (tags.amenity === 'university') return 'University';
  if (tags.amenity === 'college') return 'College';
  const phase = (tags['school:phase'] || '').toLowerCase();
  if (phase.includes('primary') || phase.includes('infant') || phase.includes('junior')) return 'Primary';
  if (phase.includes('secondary') || phase.includes('high')) return 'Secondary';
  const isced = tags['isced:level'] || '';
  if (isced.includes('1')) return 'Primary';
  if (isced.includes('2') || isced.includes('3')) return 'Secondary';
  return 'School';
}

const OFSTED_LABELS = { '1': 'Outstanding', '2': 'Good', '3': 'Requires Improvement', '4': 'Inadequate' };

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { lat, lng, type } = req.query;

  const latNum = parseFloat(lat);
  const lngNum = parseFloat(lng);

  if (isNaN(latNum) || isNaN(lngNum) || latNum < 49 || latNum > 61 || lngNum < -8 || lngNum > 2) {
    return res.status(400).json({ error: 'Invalid coordinates' });
  }
  if (!['schools', 'transport'].includes(type)) {
    return res.status(400).json({ error: 'type must be schools or transport' });
  }

  const schoolsQuery = `[out:json][timeout:15];
(
  node["amenity"~"^(school|college|university)$"](around:1500,${latNum},${lngNum});
  way["amenity"~"^(school|college|university)$"](around:1500,${latNum},${lngNum});
  relation["amenity"~"^(school|college|university)$"](around:1500,${latNum},${lngNum});
);
out center tags;`;

  const transportQuery = `[out:json][timeout:15];
(
  node["highway"="bus_stop"](around:800,${latNum},${lngNum});
  node["railway"~"^(station|halt|tram_stop)$"](around:1200,${latNum},${lngNum});
  way["railway"~"^(station|halt)$"](around:1200,${latNum},${lngNum});
);
out center tags;`;

  const query = type === 'schools' ? schoolsQuery : transportQuery;

  try {
    const overpassRes = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `data=${encodeURIComponent(query)}`,
    });

    if (!overpassRes.ok) throw new Error('Overpass API request failed');

    const data = await overpassRes.json();
    const elements = data.elements || [];

    if (type === 'schools') {
      const schools = elements
        .filter(el => el.tags?.name)
        .map(el => {
          const elLat = el.lat ?? el.center?.lat;
          const elLng = el.lon ?? el.center?.lon;
          return {
            name: el.tags.name,
            type: resolveSchoolType(el.tags),
            ofsted: OFSTED_LABELS[el.tags['ofsted:rating']] || null,
            distance: Math.round(haversineDistance(latNum, lngNum, elLat, elLng)),
          };
        })
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 8);

      return res.status(200).json({ schools });
    }

    // Transport
    const items = elements
      .filter(el => el.tags)
      .map(el => {
        const elLat = el.lat ?? el.center?.lat;
        const elLng = el.lon ?? el.center?.lon;
        let transportType = 'Bus Stop';
        if (el.tags.railway === 'station') transportType = 'Train Station';
        else if (el.tags.railway === 'halt') transportType = 'Train Stop';
        else if (el.tags.railway === 'tram_stop') transportType = 'Tram Stop';
        return {
          name: el.tags.name || el.tags.ref || 'Stop',
          type: transportType,
          distance: Math.round(haversineDistance(latNum, lngNum, elLat, elLng)),
          lines: el.tags['route_ref'] || null,
        };
      })
      .sort((a, b) => a.distance - b.distance);

    // Deduplicate by name+type, keeping nearest instance
    const seen = new Set();
    const transport = items.filter(item => {
      const key = `${item.type}:${item.name}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 12);

    return res.status(200).json({ transport });
  } catch {
    return res.status(500).json({ error: 'Failed to fetch nearby data' });
  }
}
