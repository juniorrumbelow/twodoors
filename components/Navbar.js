import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";
import { UNIQUE_UK_LOCATIONS } from "../utils/locations";

export default function Navbar() {
  const { user, isAgent, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [pendingFilters, setPendingFilters] = useState({
    minPrice: "",
    maxPrice: "",
    minBeds: "",
    propertyType: "Any",
    sortBy: "default",
    channel: "buy",
  });
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const isSearchPage = router.pathname === "/search";
  const {
    minPrice = "",
    maxPrice = "",
    minBeds = "",
    type: propertyType = "Any",
    sort: sortBy = "default",
    channel = "buy",
  } = router.query;
  const isRent = channel === "rent";

  const activeFilterCount = [
    minPrice,
    maxPrice,
    minBeds,
    propertyType !== "Any" ? propertyType : "",
    sortBy !== "default" ? sortBy : "",
  ].filter(Boolean).length;

  const openFiltersModal = () => {
    setPendingFilters({ minPrice, maxPrice, minBeds, propertyType, sortBy, channel });
    setShowFiltersModal(true);
  };

  const applyFilters = () => {
    const { minPrice, maxPrice, minBeds, propertyType, sortBy, channel } = pendingFilters;
    const newQuery = { ...(router.query.location ? { location: router.query.location } : {}) };
    if (channel) newQuery.channel = channel;
    if (minPrice) newQuery.minPrice = minPrice;
    if (maxPrice) newQuery.maxPrice = maxPrice;
    if (minBeds) newQuery.minBeds = minBeds;
    if (propertyType && propertyType !== "Any") newQuery.type = propertyType;
    if (sortBy && sortBy !== "default") newQuery.sort = sortBy;
    router.push({ pathname: "/search", query: newQuery }, undefined, { shallow: true });
    setShowFiltersModal(false);
  };

  const clearPendingFilters = () => {
    setPendingFilters((prev) => ({
      ...prev,
      minPrice: "",
      maxPrice: "",
      minBeds: "",
      propertyType: "Any",
      sortBy: "default",
    }));
  };

  const setPending = (key, value) =>
    setPendingFilters((prev) => ({ ...prev, [key]: value }));

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (showFiltersModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showFiltersModal]);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    if (value.trim().length >= 2) {
      const filtered = UNIQUE_UK_LOCATIONS.filter((loc) =>
        loc.toLowerCase().startsWith(value.toLowerCase()),
      ).slice(0, 6);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchSubmit = (value) => {
    const term = (value ?? searchQuery).trim();
    setShowSuggestions(false);
    const q = {
      ...(term ? { location: term } : {}),
      ...(channel ? { channel } : {}),
    };
    router.push({ pathname: "/search", query: q });
    setSearchQuery(term);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearchSubmit();
  };

  const pendingIsRent = pendingFilters.channel === "rent";
  const hasPendingFilters = [
    pendingFilters.minPrice,
    pendingFilters.maxPrice,
    pendingFilters.minBeds,
    pendingFilters.propertyType !== "Any" ? pendingFilters.propertyType : "",
    pendingFilters.sortBy !== "default" ? pendingFilters.sortBy : "",
  ].filter(Boolean).length > 0;

  const BED_OPTIONS = ["Any", "1+", "2+", "3+", "4+", "5+"];
  const TYPE_OPTIONS = ["Any", "House", "Flat", "Apartment", "Bungalow"];

  return (
    <>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <div className="flex items-center gap-6 shrink-0">
              <div className="hover:opacity-80 transition-opacity">
                <Logo size="text-2xl" />
              </div>

              <nav className="hidden md:flex items-center gap-6">
                <Link
                  href="/search?channel=buy"
                  className={`text-sm font-bold transition-colors ${router.pathname === "/search" && router.query.channel !== "rent" ? "text-[#f13053]" : "text-gray-500 hover:text-[#f13053]"}`}
                >
                  Buy
                </Link>
                <Link
                  href="/search?channel=rent"
                  className={`text-sm font-bold transition-colors ${router.pathname === "/search" && router.query.channel === "rent" ? "text-[#f13053]" : "text-gray-500 hover:text-[#f13053]"}`}
                >
                  Rent
                </Link>
                {!isAgent && (
                  <Link
                    href="/onboarding"
                    className={`text-sm font-bold transition-colors ${router.pathname === "/onboarding" ? "text-[#f13053]" : "text-gray-500 hover:text-[#f13053]"}`}
                  >
                    Home Profile
                  </Link>
                )}
              </nav>
            </div>

            {/* Search bar + Filters button — desktop */}
            <div
              className={`${router.pathname === "/" ? "hidden" : "hidden md:flex"} flex-1 max-w-lg items-center gap-2`}
            >
              {/* Location search */}
              <div className="relative flex-1" ref={searchRef}>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search properties in Norfolk..."
                  className="w-full pl-9 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f13053] focus:border-transparent transition-all"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                />
                {searchQuery && (
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => { setSearchQuery(""); setSuggestions([]); setShowSuggestions(false); }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                {showSuggestions && (
                  <ul className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-100 rounded-2xl shadow-xl py-1.5 z-50 overflow-hidden">
                    {suggestions.map((suggestion) => (
                      <li key={suggestion}>
                        <button
                          className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#f13053] transition-colors flex items-center gap-2"
                          onMouseDown={(e) => { e.preventDefault(); handleSearchSubmit(suggestion); }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {suggestion}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Filters button */}
              {isSearchPage && (
                <button
                  onClick={openFiltersModal}
                  className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-bold transition-all ${
                    activeFilterCount > 0
                      ? "border-[#f13053] bg-[#f13053] text-white shadow-sm"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white text-[#f13053] text-[10px] font-black">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              )}
            </div>

            <div className="hidden md:flex items-center gap-3 shrink-0">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm hover:shadow-md active:scale-95 ${
                      isDropdownOpen
                        ? "bg-gray-900 text-white"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#f13053]/10 flex items-center justify-center text-[#f13053] text-[10px]">
                        {user.email?.charAt(0).toUpperCase()}
                      </div>
                      Account
                    </div>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      {!isAgent && (
                        <>
                          <Link
                            href="/onboarding"
                            className="block px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-[#f13053] transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            Home Profile
                          </Link>
                          <div className="my-1 mx-4 border-t border-gray-50"></div>
                        </>
                      )}
                      {isAgent && (
                        <>
                          <Link
                            href="/agency/listings"
                            className="block px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-[#f13053] transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            My Listings
                          </Link>
                          <Link
                            href="/agency/profile"
                            className="block px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-[#f13053] transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            Agency Profile
                          </Link>
                        </>
                      )}
                      <div className="my-2 border-t border-gray-50"></div>
                      <button
                        onClick={() => { logout(); setIsDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="text-sm font-bold text-gray-600 hover:text-[#f13053] transition-colors px-2"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              {isSearchPage && (
                <button
                  onClick={openFiltersModal}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-bold transition-all ${
                    activeFilterCount > 0
                      ? "border-[#f13053] bg-[#f13053] text-white"
                      : "border-gray-200 bg-white text-gray-700"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-white text-[#f13053] text-[9px] font-black">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              )}
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none transition-colors"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden animate-fade-in border-t border-gray-100 bg-white">
            {router.pathname !== "/" && (
              <div className="px-4 pt-3 pb-2">
                <div className="relative" ref={searchRef}>
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search properties in Norfolk..."
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f13053] focus:border-transparent transition-all"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") { handleSearchSubmit(); setIsMenuOpen(false); }
                    }}
                  />
                </div>
                {suggestions.length > 0 && searchQuery && (
                  <ul className="mt-1 bg-white border border-gray-100 rounded-2xl shadow-lg py-1 overflow-hidden">
                    {suggestions.map((suggestion) => (
                      <li key={suggestion}>
                        <button
                          className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#f13053] transition-colors flex items-center gap-2"
                          onMouseDown={(e) => { e.preventDefault(); handleSearchSubmit(suggestion); setIsMenuOpen(false); }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {suggestion}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <div className="px-4 pt-1 pb-3 space-y-1">
              <Link
                href="/search?channel=buy"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${router.pathname === "/search" && router.query.channel !== "rent" ? "text-[#f13053] bg-[#f13053]/5" : "text-gray-600 hover:text-[#f13053] hover:bg-gray-50"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Buy
              </Link>
              <Link
                href="/search?channel=rent"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${router.pathname === "/search" && router.query.channel === "rent" ? "text-[#f13053] bg-[#f13053]/5" : "text-gray-600 hover:text-[#f13053] hover:bg-gray-50"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Rent
              </Link>
              {!isAgent && (
                <Link
                  href="/onboarding"
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${router.pathname === "/onboarding" ? "text-[#f13053] bg-[#f13053]/5" : "text-gray-600 hover:text-[#f13053] hover:bg-gray-50"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home Profile
                </Link>
              )}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-100">
              <div className="px-4 space-y-1">
                {user ? (
                  <>
                    <div className="px-3 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">Account</div>
                    {isAgent && (
                      <>
                        <Link href="/agency/listings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#f13053] hover:bg-gray-50 transition-colors" onClick={() => setIsMenuOpen(false)}>
                          My Listings
                        </Link>
                        <Link href="/agency/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#f13053] hover:bg-gray-50 transition-colors" onClick={() => setIsMenuOpen(false)}>
                          Agency Profile
                        </Link>
                      </>
                    )}
                    <button
                      onClick={() => { logout(); setIsMenuOpen(false); }}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#f13053] hover:bg-gray-50 transition-colors" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Filters modal */}
      {showFiltersModal && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowFiltersModal(false)}
          />

          {/* Panel */}
          <div className="relative w-full md:max-w-lg bg-white rounded-t-3xl md:rounded-3xl shadow-2xl flex flex-col max-h-[90vh] md:max-h-[85vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <button
                onClick={() => setShowFiltersModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-sm font-black text-gray-900">Filters</h2>
              <div className="w-8" />
            </div>

            {/* Body */}
            <div className="overflow-y-auto flex-1 px-6 py-5 space-y-7">

              {/* Buy / Rent */}
              <section>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Type of search</h3>
                <div className="grid grid-cols-2 gap-2">
                  {["buy", "rent"].map((ch) => (
                    <button
                      key={ch}
                      onClick={() => setPending("channel", ch)}
                      className={`py-2.5 rounded-xl border text-sm font-bold transition-all ${
                        pendingFilters.channel === ch
                          ? "border-[#f13053] bg-[#f13053]/5 text-[#f13053]"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {ch === "buy" ? "Buy" : "Rent"}
                    </button>
                  ))}
                </div>
              </section>

              {/* Price */}
              <section>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
                  Price {pendingIsRent ? "(per month)" : ""}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5">Minimum</label>
                    <select
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#f13053] focus:border-transparent"
                      value={pendingFilters.minPrice}
                      onChange={(e) => setPending("minPrice", e.target.value)}
                    >
                      <option value="">No min</option>
                      {pendingIsRent ? (
                        <>
                          <option value="500">£500 pcm</option>
                          <option value="750">£750 pcm</option>
                          <option value="1000">£1,000 pcm</option>
                          <option value="1500">£1,500 pcm</option>
                          <option value="2000">£2,000 pcm</option>
                          <option value="2500">£2,500 pcm</option>
                        </>
                      ) : (
                        <>
                          <option value="50000">£50,000</option>
                          <option value="100000">£100,000</option>
                          <option value="200000">£200,000</option>
                          <option value="300000">£300,000</option>
                          <option value="500000">£500,000</option>
                        </>
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5">Maximum</label>
                    <select
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#f13053] focus:border-transparent"
                      value={pendingFilters.maxPrice}
                      onChange={(e) => setPending("maxPrice", e.target.value)}
                    >
                      <option value="">No max</option>
                      {pendingIsRent ? (
                        <>
                          <option value="750">£750 pcm</option>
                          <option value="1000">£1,000 pcm</option>
                          <option value="1500">£1,500 pcm</option>
                          <option value="2000">£2,000 pcm</option>
                          <option value="3000">£3,000 pcm</option>
                          <option value="5000">£5,000 pcm</option>
                        </>
                      ) : (
                        <>
                          <option value="100000">£100,000</option>
                          <option value="250000">£250,000</option>
                          <option value="500000">£500,000</option>
                          <option value="750000">£750,000</option>
                          <option value="1000000">£1,000,000</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
              </section>

              {/* Bedrooms */}
              <section>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Bedrooms</h3>
                <div className="flex flex-wrap gap-2">
                  {BED_OPTIONS.map((opt) => {
                    const val = opt === "Any" ? "" : opt.replace("+", "");
                    const active = pendingFilters.minBeds === val;
                    return (
                      <button
                        key={opt}
                        onClick={() => setPending("minBeds", val)}
                        className={`px-4 py-2 rounded-full border text-sm font-bold transition-all ${
                          active
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Property type */}
              <section>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Property type</h3>
                <div className="flex flex-wrap gap-2">
                  {TYPE_OPTIONS.map((opt) => {
                    const active = pendingFilters.propertyType === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => setPending("propertyType", opt)}
                        className={`px-4 py-2 rounded-full border text-sm font-bold transition-all ${
                          active
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {opt === "Any" ? "All types" : `${opt}s`}
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Sort */}
              <section>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Sort by</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { val: "default", label: "Featured" },
                    { val: "price_asc", label: "Price: Low to High" },
                    { val: "price_desc", label: "Price: High to Low" },
                  ].map(({ val, label }) => {
                    const active = pendingFilters.sortBy === val;
                    return (
                      <button
                        key={val}
                        onClick={() => setPending("sortBy", val)}
                        className={`px-4 py-2 rounded-full border text-sm font-bold transition-all ${
                          active
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between gap-3">
              <button
                onClick={clearPendingFilters}
                disabled={!hasPendingFilters}
                className="text-sm font-bold text-gray-500 underline underline-offset-2 hover:text-gray-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Clear all
              </button>
              <button
                onClick={applyFilters}
                className="flex-1 py-3 bg-[#f13053] text-white rounded-xl text-sm font-black hover:bg-[#d42847] active:scale-95 transition-all shadow-sm"
              >
                Show results
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
