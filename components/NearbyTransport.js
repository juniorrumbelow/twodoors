import { useState, useEffect } from 'react';

function formatDistance(metres) {
  return metres >= 1000 ? `${(metres / 1000).toFixed(1)} km` : `${metres} m`;
}

const TYPE_ORDER = ['Train Station', 'Train Stop', 'Tram Stop', 'Bus Stop'];

const TYPE_META = {
  'Train Station': {
    label: 'Train',
    colour: 'bg-blue-100 text-blue-800',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  'Train Stop': {
    label: 'Train',
    colour: 'bg-blue-100 text-blue-800',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  'Tram Stop': {
    label: 'Tram',
    colour: 'bg-green-100 text-green-800',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  'Bus Stop': {
    label: 'Bus',
    colour: 'bg-orange-100 text-orange-800',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
      </svg>
    ),
  },
};

function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-100 last:border-0 animate-pulse">
      <div className="h-9 w-9 bg-gray-200 rounded-xl shrink-0"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-2/5"></div>
        <div className="h-3 bg-gray-200 rounded w-1/5"></div>
      </div>
      <div className="h-3 bg-gray-200 rounded w-10"></div>
    </div>
  );
}

export default function NearbyTransport({ location }) {
  const [transport, setTransport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location?.lat || !location?.lng) {
      setLoading(false);
      return;
    }

    fetch(`/api/nearby?lat=${location.lat}&lng=${location.lng}&type=transport`)
      .then(res => res.json())
      .then(json => {
        if (json.error) throw new Error(json.error);
        setTransport(json.transport);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [location?.lat, location?.lng]);

  if (!location?.lat || !location?.lng) return null;
  if (!loading && !error && (!transport || transport.length === 0)) return null;

  // Group by type, maintaining priority order
  const grouped = TYPE_ORDER.reduce((acc, type) => {
    const items = transport?.filter(t => t.type === type) || [];
    if (items.length) acc[type] = items;
    return acc;
  }, {});

  const groupCount = Object.keys(grouped).length;

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gray-100 p-2.5 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#f13053]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-gray-900">Transport Links</h3>
      </div>

      {loading && (
        <div className="border border-gray-100 rounded-2xl overflow-hidden">
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </div>
      )}

      {error && (
        <div className="border border-gray-100 rounded-2xl p-6 text-center text-gray-500 font-medium">
          Could not load transport data for this area.
        </div>
      )}

      {!loading && !error && transport && (
        <div className={`grid grid-cols-1 ${groupCount > 1 ? 'md:grid-cols-2' : ''} gap-6`}>
          {TYPE_ORDER.filter(type => grouped[type]).map(type => {
            const meta = TYPE_META[type];
            const items = grouped[type];
            return (
              <div key={type} className="border border-gray-100 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-3 bg-gray-50 border-b border-gray-100">
                  {meta.icon}
                  <span className="font-black text-sm text-gray-700">{type}s</span>
                  <span className={`ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${meta.colour}`}>
                    {items.length} nearby
                  </span>
                </div>
                <div className="divide-y divide-gray-100">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors">
                      <div className="min-w-0 mr-4">
                        <p className="font-semibold text-gray-900 text-sm truncate">{item.name}</p>
                        {item.lines && (
                          <p className="text-xs text-gray-400 font-medium mt-0.5 truncate">{item.lines}</p>
                        )}
                      </div>
                      <span className="text-sm font-bold text-gray-400 shrink-0">{formatDistance(item.distance)}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
