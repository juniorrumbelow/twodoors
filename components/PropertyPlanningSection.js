import { useState, useEffect } from 'react';
import Link from 'next/link';

const UK_POSTCODE_REGEX = /[A-Z]{1,2}[0-9][0-9A-Z]?\s*[0-9][A-Z]{2}/i;

function extractPostcode(address) {
  if (!address) return null;
  const match = address.match(UK_POSTCODE_REGEX);
  return match ? match[0].toUpperCase() : null;
}

function StatusBadge({ entity }) {
  const dataset = entity.dataset;

  if (dataset === 'brownfield-land') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 shrink-0">
        Brownfield
      </span>
    );
  }

  const status = entity['planning-permission-status'] || entity['planning-decision-type'];
  if (!status) return null;

  const normalized = status.toLowerCase();
  let colorClass = 'bg-gray-100 text-gray-700';
  if (normalized.includes('grant') || normalized.includes('approv')) {
    colorClass = 'bg-green-100 text-green-800';
  } else if (normalized.includes('refus') || normalized.includes('deni')) {
    colorClass = 'bg-red-100 text-red-800';
  } else if (normalized.includes('pend') || normalized.includes('progress') || normalized.includes('undecided')) {
    colorClass = 'bg-blue-100 text-blue-800';
  } else if (normalized.includes('withdraw')) {
    colorClass = 'bg-gray-100 text-gray-500';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold shrink-0 ${colorClass}`}>
      {status}
    </span>
  );
}

function SkeletonCard() {
  return (
    <div className="border border-gray-100 rounded-2xl p-5 animate-pulse">
      <div className="flex justify-between items-start gap-4 mb-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-5 bg-gray-200 rounded-full w-20"></div>
      </div>
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
    </div>
  );
}

export default function PropertyPlanningSection({ address }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const postcode = extractPostcode(address);

  useEffect(() => {
    if (!postcode) {
      setLoading(false);
      return;
    }

    fetch(`/api/planning?location=${encodeURIComponent(postcode)}`)
      .then(res => res.json())
      .then(json => {
        if (json.error) throw new Error(json.error);
        setData(json);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [postcode]);

  if (!postcode) return null;
  if (!loading && !error && (!data || data.entities?.length === 0)) return null;

  const recent = data?.entities?.slice(0, 5) || [];

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-black text-gray-900">Nearby Planning Applications</h3>
        <Link href="/planning" className="text-sm font-bold text-[#f13053] hover:underline">
          View all →
        </Link>
      </div>

      {loading && (
        <div className="space-y-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {error && (
        <div className="bg-gray-50 rounded-2xl p-6 text-center text-gray-500 font-medium">
          Could not load planning data for this area.
        </div>
      )}

      {!loading && !error && recent.length > 0 && (
        <>
          <div className="space-y-4">
            {recent.map((entity, idx) => {
              const title = entity.notes || entity.description || entity.reference || 'Planning application';
              const addr = entity['address-text'] || entity['site-address'];
              const date = entity['decision-date'] || entity['entry-date'];
              const formattedDate = date
                ? new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                : null;
              const externalLink = entity['planning-permission-history'] || entity['site-plan-url'];

              return (
                <div key={idx} className="border border-gray-100 rounded-2xl p-5 hover:border-gray-200 hover:shadow-sm transition-all">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <p className="text-gray-900 font-semibold text-sm leading-snug line-clamp-2 flex-1">{title}</p>
                    <StatusBadge entity={entity} />
                  </div>
                  {addr && <p className="text-gray-500 text-xs font-medium mb-1">{addr}</p>}
                  <div className="flex items-center justify-between mt-3">
                    {formattedDate && <span className="text-gray-400 text-xs">{formattedDate}</span>}
                    {externalLink && (
                      <a
                        href={externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-[#f13053] hover:underline ml-auto"
                      >
                        View application →
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/planning"
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors"
            >
              Search all planning applications near {postcode}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
