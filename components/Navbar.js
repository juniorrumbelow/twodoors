import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";
import { UNIQUE_UK_LOCATIONS } from "../utils/locations";

const PILL =
  "whitespace-nowrap px-3 py-1.5 rounded-full border text-xs font-bold outline-none transition-colors appearance-none cursor-pointer focus:ring-1 focus:ring-[#f13053]";
const pillActive = "border-[#f13053] bg-[#f13053]/5 text-[#f13053]";
const pillInactive =
  "border-gray-200 text-gray-700 bg-white focus:border-[#f13053]";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
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

  const updateSearchFilter = (updates) => {
    const newQuery = { ...router.query, ...updates };
    Object.keys(newQuery).forEach((key) => {
      if (key === "channel") return;
      if (
        !newQuery[key] ||
        newQuery[key] === "Any" ||
        newQuery[key] === "default"
      )
        delete newQuery[key];
    });
    router.push({ pathname: "/search", query: newQuery }, undefined, {
      shallow: true,
    });
  };

  const hasActiveFilters =
    minPrice ||
    maxPrice ||
    minBeds ||
    propertyType !== "Any" ||
    sortBy !== "default";

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
    const channel = router.query.channel;
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

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
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
              <Link
                href="/onboarding"
                className={`text-sm font-bold transition-colors ${router.pathname === "/onboarding" ? "text-[#f13053]" : "text-gray-500 hover:text-[#f13053]"}`}
              >
                Home Profile
              </Link>
            </nav>
          </div>

          {/* Search bar — desktop */}
          <div
            className={`${router.pathname === "/" ? "hidden" : "hidden md:flex"} flex-1 max-w-sm relative`}
            ref={searchRef}
          >
            <div className="relative w-full">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search properties in Norfolk..."
                className="w-full pl-9 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f13053] focus:border-transparent transition-all"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() =>
                  suggestions.length > 0 && setShowSuggestions(true)
                }
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => {
                    setSearchQuery("");
                    setSuggestions([]);
                    setShowSuggestions(false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            {showSuggestions && (
              <ul className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-100 rounded-2xl shadow-xl py-1.5 z-50 overflow-hidden">
                {suggestions.map((suggestion) => (
                  <li key={suggestion}>
                    <button
                      className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#f13053] transition-colors flex items-center gap-2"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSearchSubmit(suggestion);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 text-gray-400 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 mb-1">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        My Account
                      </p>
                    </div>
                    <Link
                      href="/onboarding"
                      className="block px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-[#f13053] transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Home Profile
                    </Link>
                    <div className="my-1 mx-4 border-t border-gray-50"></div>
                    <div className="px-4 py-1.5">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Agency Portal
                      </p>
                    </div>
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
                    <div className="my-2 border-t border-gray-50"></div>
                    <button
                      onClick={() => {
                        logout();
                        setIsDropdownOpen(false);
                      }}
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
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Filter row — search page only */}
      {isSearchPage && (
        <div className="border-t border-gray-100 py-2">
          <div className="flex items-center gap-2 px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-hide pb-1">
            <select
              aria-label="Minimum price"
              className={`${PILL} ${minPrice ? pillActive : pillInactive}`}
              value={minPrice}
              onChange={(e) => updateSearchFilter({ minPrice: e.target.value })}
            >
              <option value="">{isRent ? "Min PCM" : "Min Price"}</option>
              {isRent ? (
                <>
                  <option value="500">£500+ pcm</option>
                  <option value="750">£750+ pcm</option>
                  <option value="1000">£1,000+ pcm</option>
                  <option value="1500">£1,500+ pcm</option>
                  <option value="2000">£2,000+ pcm</option>
                  <option value="2500">£2,500+ pcm</option>
                </>
              ) : (
                <>
                  <option value="50000">£50k+</option>
                  <option value="100000">£100k+</option>
                  <option value="200000">£200k+</option>
                  <option value="300000">£300k+</option>
                  <option value="500000">£500k+</option>
                </>
              )}
            </select>

            <select
              aria-label="Maximum price"
              className={`${PILL} ${maxPrice ? pillActive : pillInactive}`}
              value={maxPrice}
              onChange={(e) => updateSearchFilter({ maxPrice: e.target.value })}
            >
              <option value="">{isRent ? "Max PCM" : "Max Price"}</option>
              {isRent ? (
                <>
                  <option value="750">Up to £750 pcm</option>
                  <option value="1000">Up to £1,000 pcm</option>
                  <option value="1500">Up to £1,500 pcm</option>
                  <option value="2000">Up to £2,000 pcm</option>
                  <option value="3000">Up to £3,000 pcm</option>
                  <option value="5000">Up to £5,000 pcm</option>
                </>
              ) : (
                <>
                  <option value="100000">Up to £100k</option>
                  <option value="250000">Up to £250k</option>
                  <option value="500000">Up to £500k</option>
                  <option value="750000">Up to £750k</option>
                  <option value="1000000">Up to £1m</option>
                </>
              )}
            </select>

            <select
              aria-label="Minimum bedrooms"
              className={`${PILL} ${minBeds ? pillActive : pillInactive}`}
              value={minBeds}
              onChange={(e) => updateSearchFilter({ minBeds: e.target.value })}
            >
              <option value="">Any Beds</option>
              <option value="1">1+ Beds</option>
              <option value="2">2+ Beds</option>
              <option value="3">3+ Beds</option>
              <option value="4">4+ Beds</option>
              <option value="5">5+ Beds</option>
            </select>

            <select
              aria-label="Property type"
              className={`${PILL} ${propertyType !== "Any" ? pillActive : pillInactive}`}
              value={propertyType}
              onChange={(e) => updateSearchFilter({ type: e.target.value })}
            >
              <option value="Any">All Types</option>
              <option value="House">Houses</option>
              <option value="Flat">Flats</option>
              <option value="Apartment">Apartments</option>
              <option value="Bungalow">Bungalows</option>
            </select>

            <select
              aria-label="Sort by"
              className={`${PILL} ${sortBy !== "default" ? pillActive : pillInactive}`}
              value={sortBy}
              onChange={(e) => updateSearchFilter({ sort: e.target.value })}
            >
              <option value="default">Sort: Featured</option>
              <option value="price_asc">Price: Low–High</option>
              <option value="price_desc">Price: High–Low</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={() =>
                  router.push({ pathname: "/search", query: { channel } })
                }
                className="whitespace-nowrap text-xs text-gray-400 font-bold hover:text-red-400 transition-colors ml-1"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in border-t border-gray-100 bg-white">
          {/* Mobile search */}
          {router.pathname !== "/" && (
            <div className="px-4 pt-3 pb-2">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search properties in Norfolk..."
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f13053] focus:border-transparent transition-all"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearchSubmit();
                      setIsMenuOpen(false);
                    }
                  }}
                />
              </div>
              {suggestions.length > 0 && searchQuery && (
                <ul className="mt-1 bg-white border border-gray-100 rounded-2xl shadow-lg py-1 overflow-hidden">
                  {suggestions.map((suggestion) => (
                    <li key={suggestion}>
                      <button
                        className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#f13053] transition-colors flex items-center gap-2"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSearchSubmit(suggestion);
                          setIsMenuOpen(false);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5 text-gray-400 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
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
            <Link
              href="/onboarding"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${router.pathname === "/onboarding" ? "text-[#f13053] bg-[#f13053]/5" : "text-gray-600 hover:text-[#f13053] hover:bg-gray-50"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home Profile
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-100">
            <div className="px-4 space-y-1">
              {user ? (
                <>
                  <div className="px-3 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Account
                  </div>
                  <Link
                    href="/agency/listings"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#f13053] hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Listings
                  </Link>
                  <Link
                    href="/agency/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#f13053] hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Agency Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#f13053] hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
