import { useState, useEffect } from 'react';

function formatDistance(metres) {
  return metres >= 1000 ? `${(metres / 1000).toFixed(1)} km` : `${metres} m`;
}

const TYPE_COLOURS = {
  Primary:    'bg-blue-100 text-blue-800',
  Secondary:  'bg-purple-100 text-purple-800',
  College:    'bg-indigo-100 text-indigo-800',
  University: 'bg-gray-100 text-gray-700',
  School:     'bg-gray-100 text-gray-700',
};

const OFSTED_COLOURS = {
  Outstanding:           'bg-green-100 text-green-800',
  Good:                  'bg-emerald-100 text-emerald-800',
  'Requires Improvement':'bg-amber-100 text-amber-800',
  Inadequate:            'bg-red-100 text-red-800',
};

function SkeletonRow() {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0 animate-pulse">
      <div className="flex-1 space-y-2 mr-4">
        <div className="h-4 bg-gray-200 rounded w-3/5"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      </div>
      <div className="h-3 bg-gray-200 rounded w-12"></div>
    </div>
  );
}

export default function NearbySchools({ location }) {
  const [schools, setSchools] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location?.lat || !location?.lng) {
      setLoading(false);
      return;
    }

    fetch(`/api/nearby?lat=${location.lat}&lng=${location.lng}&type=schools`)
      .then(res => res.json())
      .then(json => {
        if (json.error) throw new Error(json.error);
        setSchools(json.schools);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [location?.lat, location?.lng]);

  if (!location?.lat || !location?.lng) return null;
  if (!loading && !error && (!schools || schools.length === 0)) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gray-100 p-2.5 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#f13053]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422A12.083 12.083 0 0121 12c0 6.075-4.925 11-11 11S-1 18.075-1 12c0-.54.041-1.07.12-1.578L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v7" />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-gray-900">Nearby Schools</h3>
      </div>

      <div className="border border-gray-100 rounded-2xl divide-y divide-gray-100 overflow-hidden">
        {loading && (
          <div className="px-5">
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </div>
        )}

        {error && (
          <div className="p-6 text-center text-gray-500 font-medium">
            Could not load schools data for this area.
          </div>
        )}

        {!loading && !error && schools?.map((school, idx) => (
          <div key={idx} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex-1 min-w-0 mr-4">
              <p className="font-semibold text-gray-900 text-sm truncate">{school.name}</p>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${TYPE_COLOURS[school.type] || TYPE_COLOURS.School}`}>
                  {school.type}
                </span>
                {school.ofsted && (
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${OFSTED_COLOURS[school.ofsted] || ''}`}>
                    Ofsted: {school.ofsted}
                  </span>
                )}
              </div>
            </div>
            <span className="text-sm font-bold text-gray-400 shrink-0">{formatDistance(school.distance)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
