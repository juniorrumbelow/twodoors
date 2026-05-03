import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

const ITEMS_PER_PAGE = 5;

import { UNIQUE_UK_LOCATIONS as SUGGESTIONS } from '../utils/locations';
import DynamicMap from './DynamicMap';

export default function PlanningSearch() {
  const router = useRouter();
  const { query } = router;

  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState('list');
  const resultsRef = useRef(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle URL changes to trigger search or reset
  useEffect(() => {
    if (!router.isReady) return;

    if (query.location) {
      // If the location in URL changed and it's not what we're currently showing, search it
      // We check !loading to avoid duplicate calls during initialization/shallow updates
      if (!loading && (!data || query.location !== location)) {
        setLocation(query.location);
        performSearch(query.location);
      }
    } else if (data || location) {
      // URL has no location, but we have active results or input - clear them (e.g., clicking logo)
      setData(null);
      setLocation('');
      setError(null);
    }
  }, [router.isReady, query.location]);

  const filteredSuggestions = location
    ? SUGGESTIONS.filter(s => s.toLowerCase().includes(location.toLowerCase()))
    : SUGGESTIONS;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) {
      return dateString;
    }
  };

  const getSafeUrl = (app) => {
    const url = app['site-plan-url'] || app['planning-permission-history'];
    if (!url) return null;
    return url.startsWith('http://') || url.startsWith('https://') ? url : null;
  };

  const performSearch = async (searchLocation) => {
    setLoading(true);
    setError(null);
    setData(null);
    setCurrentPage(1);

    try {
      const res = await fetch(`/api/planning?location=${encodeURIComponent(searchLocation)}`);
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to fetch data');
      }

      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!location.trim()) return;

    // Update URL with the new search location
    router.push({
      pathname: '/',
      query: { location: location.trim() },
    }, undefined, { shallow: true });

    await performSearch(location.trim());
  };

  const handleShare = async () => {
    // Ensure we use the full URL including protocol and host
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Planning results for ${data?.location?.name || location} | whatsplanned`,
          url: url,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Error copying to clipboard:', err);
      }
    }
  };

  // Pagination Logic
  const totalItems = data?.entities?.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEntities = data?.entities?.slice(startIndex, startIndex + ITEMS_PER_PAGE) || [];

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 animate-in fade-in duration-500">
      <div className="relative mb-10 w-full max-w-3xl mx-auto z-50" ref={dropdownRef}>
        <form onSubmit={handleSearch} className="relative flex items-center justify-center group w-full">
          <input
            type="text"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            placeholder="Search location or postcode..."
            className="w-full pl-6 pr-28 md:px-8 py-5 text-lg font-medium text-gray-900 bg-white border border-gray-200 rounded-full shadow-2xl focus:outline-none focus:border-[#f13053] focus:ring-4 focus:ring-[#f13053]/20 transition-all placeholder:text-gray-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 bottom-2 px-4 md:px-8 bg-[#f13053] text-white font-bold rounded-full hover:bg-[#02a97e] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 z-10"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="hidden sm:inline">Searching...</span>
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Search</span>
                <svg className="w-5 h-5 group-focus-within:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </>
            )}
          </button>
        </form>

        {showDropdown && filteredSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-100 rounded-3xl shadow-2xl max-h-72 overflow-y-auto animate-in fade-in slide-in-from-top-2 py-3 text-left z-50 ring-1 ring-black/5 custom-scrollbar">
            {filteredSuggestions.map((suggestion, idx) => (
              <button
                key={idx}
                type="button"
                className="w-full px-6 py-3 text-left text-gray-700 hover:bg-[#f13053]/10 hover:text-[#f13053] font-medium transition-colors cursor-pointer border-b border-gray-50 last:border-0"
                onClick={() => {
                  setLocation(suggestion);
                  setShowDropdown(false);
                  // Trigger search immediately on selection
                  const newLoc = suggestion;
                  router.push({
                    pathname: '/',
                    query: { location: newLoc },
                  }, undefined, { shallow: true });
                  performSearch(newLoc);
                }}
              >
                <span className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-[#f13053]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  {suggestion}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div className="max-w-3xl mx-auto p-4 mb-8 text-white bg-red-500/90 rounded-2xl shadow-sm text-center font-medium backdrop-blur-sm border border-red-400">
          {error}
        </div>
      )}

      {data && (
        <div ref={resultsRef} className="bg-white rounded-[2rem] p-6 md:p-10 shadow-2xl border border-gray-100 text-gray-900 scroll-mt-24">
          <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between border-b border-gray-100 pb-6 gap-4">
            <div>
              <h2 className="text-2xl md:text-2xl font-extrabold tracking-tight">Planned Development</h2>
              <p className="text-gray-500 mt-2 font-medium text-lg flex items-center gap-2">
                <svg className="w-5 h-5 text-[#f13053]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                {data.location?.admin_district} • {data.location?.name}
              </p>
            </div>

            {data?.entities?.length > 0 && (
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center bg-gray-100 p-1 rounded-full font-bold text-sm hidden md:flex">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${viewMode === 'list' ? 'bg-white text-gray-900 shadow' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    List
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${viewMode === 'map' ? 'bg-white text-gray-900 shadow' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
                    Map
                  </button>
                </div>

                <button
                  onClick={handleShare}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${copied
                    ? 'bg-emerald-500 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-[#f13053] hover:text-[#f13053] hover:shadow-md'
                    }`}
                >
                  {copied ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                      Share
                    </>
                  )}
                </button>
                <div className="bg-gray-50 text-gray-500 px-4 py-2.5 rounded-full font-bold text-sm tracking-wide border border-gray-100 flex-shrink-0">
                  {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, totalItems)} of {totalItems} Results
                </div>
              </div>
            )}
          </div>

          {data?.entities?.length > 0 && (
            <div className="md:hidden flex w-full mb-4 mt-2">
              <div className="flex w-full items-center bg-gray-100 p-1 rounded-full font-bold text-sm">
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex-1 flex justify-center items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${viewMode === 'list' ? 'bg-white text-gray-900 shadow' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  List
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`flex-1 flex justify-center items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${viewMode === 'map' ? 'bg-white text-gray-900 shadow' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Map
                </button>
              </div>
            </div>
          )}

          {!data.entities || data.entities.length === 0 ? (
            <div className="text-center py-16 text-gray-400 bg-gray-50 rounded-3xl border border-gray-100">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              <p className="text-xl font-semibold text-gray-900">No planned development found.</p>
              <p className="mt-2 text-sm">Try searching a different location or check back later.</p>
            </div>
          ) : viewMode === 'map' ? (
            <div className="mt-4 animate-in fade-in duration-500 relative z-0">
              <DynamicMap entities={data.entities} location={data.location} />
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-6">
                {paginatedEntities.map((app, index) => {
                  const url = getSafeUrl(app);
                  const CardTag = url ? 'a' : 'div';
                  return (
                    <CardTag
                      key={app.entity}
                      href={url}
                      target={url ? "_blank" : undefined}
                      rel={url ? "noopener noreferrer" : undefined}
                      className={`group bg-white rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col md:flex-row gap-6 animate-in slide-in-from-bottom-4 ${url ? 'cursor-pointer block' : ''}`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* Left Column: Status & Date */}
                      <div className="md:w-48 flex-shrink-0 flex flex-row md:flex-col justify-between md:justify-start gap-4 md:border-r md:border-gray-100 md:pr-6">
                        <div className="flex flex-col gap-2">
                          <span className="inline-flex items-center px-3 py-1 bg-[#f13053]/10 text-[#f13053] text-[10px] font-bold rounded-full uppercase tracking-wider w-fit">
                            {app.dataset?.replace('-', ' ') || 'Planning'}
                          </span>
                          <div className="flex flex-col gap-1.5 border-l-2 border-gray-50 pl-3 mt-1">
                            {app['entry-date'] && (
                              <div className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tight w-12">Listed</span>
                                {formatDate(app['entry-date'])}
                              </div>
                            )}
                            {app['decision-date'] && (
                              <div className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tight w-12">Decided</span>
                                {formatDate(app['decision-date'])}
                              </div>
                            )}
                            {app['end-date'] && (
                              <div className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tight w-12">Ended</span>
                                {formatDate(app['end-date'])}
                              </div>
                            )}
                            {(!app['entry-date'] && !app['decision-date'] && !app['end-date']) && (
                              <div className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z"></path></svg>
                                {formatDate(app['entry-date'] || app['decision-date'] || app['end-date'])}
                              </div>
                            )}
                          </div>
                        </div>

                        {app.reference && (
                          <div className="hidden md:block">
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">Reference</p>
                            <p className="text-xs font-mono text-gray-600 truncate">{app.reference}</p>
                          </div>
                        )}
                      </div>

                      {/* Right Column: Main Content */}
                      <div className="flex-grow flex flex-col">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                          <div className="flex-grow max-w-4xl">
                            <h3 className="font-extrabold text-lg md:text-xl text-gray-900 mb-2 leading-tight group-hover:text-[#f13053] transition-colors line-clamp-3" title={app.notes || app.description || 'No details available'}>
                              {app.notes || app.description || 'No details available'}
                            </h3>
                            {(app['address-text'] || app['site-address']) && (
                              <p className="text-gray-500 flex items-center gap-2 text-sm md:text-base font-medium">
                                <svg className="w-4 h-4 flex-shrink-0 text-[#f13053]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                {app['address-text'] || app['site-address']}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Metadata Badges Footer */}
                        <div className="flex flex-wrap items-center gap-3 mt-auto pt-4 border-t border-gray-50">
                          {(app['planning-decision-type'] || app['planning-permission-status']) && (
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border ${(app['planning-decision-type'] || app['planning-permission-status']).toLowerCase().includes('grant') || (app['planning-decision-type'] || app['planning-permission-status']).toLowerCase().includes('permissioned')
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                              : (app['planning-decision-type'] || app['planning-permission-status']).toLowerCase().includes('refused') || (app['planning-decision-type'] || app['planning-permission-status']).toLowerCase().includes('not-permissioned')
                                ? 'bg-red-50 text-red-700 border-red-100'
                                : 'bg-blue-50 text-blue-700 border-blue-100'
                              }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${(app['planning-decision-type'] || app['planning-permission-status']).toLowerCase().includes('grant') || (app['planning-decision-type'] || app['planning-permission-status']).toLowerCase().includes('permissioned')
                                ? 'bg-emerald-500'
                                : (app['planning-decision-type'] || app['planning-permission-status']).toLowerCase().includes('refused') || (app['planning-decision-type'] || app['planning-permission-status']).toLowerCase().includes('not-permissioned')
                                  ? 'bg-red-500'
                                  : 'bg-blue-500'
                                }`}></span>
                              {(app['planning-decision-type'] || app['planning-permission-status']).replace(/-/g, ' ')}
                            </span>
                          )}

                          {app['maximum-net-dwellings'] && (
                            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg border border-amber-100">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                              {app['maximum-net-dwellings']} Dwellings
                            </span>
                          )}

                          {app.hectares && (
                            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-50 text-teal-700 text-xs font-bold rounded-lg border border-teal-100">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                              Site: {app.hectares} Hectares
                            </span>
                          )}

                          {app.reference && (
                            <span className="md:hidden inline-flex items-center px-3 py-1.5 bg-gray-50 text-gray-500 text-xs font-bold rounded-lg border border-gray-100 uppercase tracking-tighter">
                              Ref: {app.reference}
                            </span>
                          )}

                          {/* CTA Link Pushed to the End */}
                          {url && (
                            <span
                              className="inline-flex items-center gap-2 px-6 py-2 bg-[#f13053] hover:bg-[#02a97e] text-white font-bold text-sm rounded-xl transition-all duration-300 shadow-sm hover:shadow-md md:ml-auto group/btn"
                            >
                              View Details
                              <svg className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                            </span>
                          )}
                        </div>
                      </div>
                    </CardTag>
                  );
                })}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-gray-500 text-sm font-medium">
                    Showing <span className="text-gray-900 font-bold">{startIndex + 1}</span> to <span className="text-gray-900 font-bold">{Math.min(startIndex + ITEMS_PER_PAGE, totalItems)}</span> of <span className="text-gray-900 font-bold">{totalItems}</span> results
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-50 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-gray-50 text-gray-600 font-bold text-sm rounded-xl transition-all duration-300 border border-gray-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                      Previous
                    </button>

                    <div className="flex items-center gap-1 min-w-[80px] justify-center text-sm font-bold">
                      <span className="text-[#f13053]">{currentPage}</span>
                      <span className="text-gray-300">/</span>
                      <span className="text-gray-600">{totalPages}</span>
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f13053] hover:bg-[#02a97e] disabled:opacity-30 disabled:hover:bg-[#f13053] text-white font-bold text-sm rounded-xl transition-all duration-300 shadow-lg"
                    >
                      Next
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
