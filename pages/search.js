import React, { useState, useEffect, useMemo, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "@components/Navbar";
import DynamicPropertyMap from "@components/DynamicPropertyMap";
import PropertyMapCard from "@components/PropertyMapCard";
import { db } from "../lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const PILL =
  "whitespace-nowrap px-3 py-1.5 rounded-full border text-xs font-bold outline-none transition-colors appearance-none cursor-pointer focus:ring-1 focus:ring-[#f13053]";
const pillActive = "border-[#f13053] bg-[#f13053]/5 text-[#f13053]";
const pillInactive =
  "border-gray-200 text-gray-700 bg-white focus:border-[#f13053]";

export default function SearchPage({ initialProperties }) {
  const router = useRouter();
  const { query: urlQuery } = router;
  const listRef = useRef(null);

  const [location, setLocation] = useState(urlQuery.location || "");
  const [minPrice, setMinPrice] = useState(urlQuery.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(urlQuery.maxPrice || "");
  const [minBeds, setMinBeds] = useState(urlQuery.minBeds || "");
  const [propertyType, setPropertyType] = useState(urlQuery.type || "Any");
  const [sortBy, setSortBy] = useState(urlQuery.sort || "default");
  const [channel, setChannel] = useState(urlQuery.channel || "buy");
  const [mobileView, setMobileView] = useState("list");
  const [hoveredId, setHoveredId] = useState(null);

  const isRent = channel === "rent";

  useEffect(() => {
    setLocation(urlQuery.location || "");
    setMinPrice(urlQuery.minPrice || "");
    setMaxPrice(urlQuery.maxPrice || "");
    setMinBeds(urlQuery.minBeds || "");
    setPropertyType(urlQuery.type || "Any");
    setSortBy(urlQuery.sort || "default");
    setChannel(urlQuery.channel || "buy");
  }, [urlQuery]);

  const filteredProperties = useMemo(() => {
    const RENT_STATUSES = ["available", "to rent", "to let"];
    const filtered = initialProperties.filter((p) => {
      const dept = (p.department || "").toLowerCase();
      const status = (p.status || "").toLowerCase();
      const isRentListing =
        dept.includes("letting") ||
        (!dept && RENT_STATUSES.some((s) => status.includes(s)));
      if (channel === "buy" && isRentListing) return false;
      if (channel === "rent" && !isRentListing) return false;
      if (location) {
        const searchStr =
          `${p.title} ${p.address} ${p.description}`.toLowerCase();
        if (!searchStr.includes(location.toLowerCase())) return false;
      }
      if (minPrice && p.price < parseInt(minPrice)) return false;
      if (maxPrice && p.price > parseInt(maxPrice)) return false;
      if (minBeds && p.bedrooms < parseInt(minBeds)) return false;
      if (propertyType !== "Any") {
        const typeStr = (p.title + " " + (p.department || "")).toLowerCase();
        if (!typeStr.includes(propertyType.toLowerCase())) return false;
      }
      return true;
    });

    if (sortBy === "price_asc")
      return [...filtered].sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc")
      return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [
    initialProperties,
    channel,
    location,
    minPrice,
    maxPrice,
    minBeds,
    propertyType,
    sortBy,
  ]);

  const updateFilters = (updates) => {
    const newQuery = { ...urlQuery, ...updates };
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
    listRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hasActiveFilters =
    minPrice ||
    maxPrice ||
    minBeds ||
    propertyType !== "Any" ||
    sortBy !== "default";

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      <Head>
        <title>
          {isRent ? "Properties to Rent" : "Properties for Sale"} | TwoDoors
        </title>
      </Head>

      <Navbar />

      <div className="flex flex-1 overflow-hidden relative">
        {/* List Sidebar */}
        <div
          ref={listRef}
          className={`${mobileView === "map" ? "hidden md:flex" : "flex"} flex-col w-full md:w-[50%] lg:w-[50%] xl:w-[50%] h-full overflow-y-auto bg-gray-50 border-r border-gray-200 z-10`}
        >
          {/* Filters Header */}
          <div className="p-4 bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
            <div className="flex flex-col gap-4">
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
                  placeholder="City, town or postcode..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl text-sm font-bold text-gray-900 border-none focus:ring-2 focus:ring-[#f13053] transition-all"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    updateFilters({ location: e.target.value });
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-lg font-black text-gray-900">
                    {location
                      ? `Properties ${isRent ? "to rent" : "for sale"} in ${location}`
                      : isRent
                        ? "Properties to rent"
                        : "Properties for sale"}
                  </h1>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                    {filteredProperties.length} Results Found
                  </p>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={() =>
                      router.push({ pathname: "/search", query: { channel } })
                    }
                    className="text-xs text-gray-400 font-bold hover:text-red-400 transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Filter Pills */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <select
                  aria-label="Minimum price"
                  className={`${PILL} ${minPrice ? pillActive : pillInactive}`}
                  value={minPrice}
                  onChange={(e) => updateFilters({ minPrice: e.target.value })}
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
                  onChange={(e) => updateFilters({ maxPrice: e.target.value })}
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
                  onChange={(e) => updateFilters({ minBeds: e.target.value })}
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
                  onChange={(e) => updateFilters({ type: e.target.value })}
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
                  onChange={(e) => updateFilters({ sort: e.target.value })}
                >
                  <option value="default">Sort: Featured</option>
                  <option value="price_asc">Price: Low–High</option>
                  <option value="price_desc">Price: High–Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
            {filteredProperties.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  No properties match your search
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Try adjusting your filters or search area
                </p>
                <button
                  onClick={() =>
                    router.push({ pathname: "/search", query: { channel } })
                  }
                  className="mt-6 text-[#f13053] font-bold text-sm hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              filteredProperties.map((property) => (
                <PropertyMapCard
                  key={property.id}
                  property={property}
                  onHover={setHoveredId}
                  onLeave={() => setHoveredId(null)}
                />
              ))
            )}
          </div>
        </div>

        {/* Map */}
        <div
          className={`${mobileView === "list" ? "hidden md:block" : "block"} flex-1 relative z-0 p-5`}
        >
          <DynamicPropertyMap
            properties={filteredProperties}
            hoveredId={hoveredId}
          />
        </div>

        {/* Mobile list/map toggle — floating pill */}
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 md:hidden z-50 bg-white rounded-full shadow-xl border border-gray-100 flex p-1 gap-1">
          <button
            onClick={() => setMobileView("list")}
            className={`px-5 py-2 text-sm font-bold rounded-full transition-all ${mobileView === "list" ? "bg-gray-900 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            List
          </button>
          <button
            onClick={() => setMobileView("map")}
            className={`px-5 py-2 text-sm font-bold rounded-full transition-all ${mobileView === "map" ? "bg-gray-900 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            Map
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const propertiesRef = collection(db, "properties");
    const q = query(propertiesRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const properties = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort((a, b) => {
        if (a.isBoosted && !b.isBoosted) return -1;
        if (!a.isBoosted && b.isBoosted) return 1;
        return 0;
      });

    return {
      props: {
        initialProperties: JSON.parse(JSON.stringify(properties)),
      },
    };
  } catch (error) {
    console.error("Error fetching properties for search:", error);
    return {
      props: {
        initialProperties: [],
      },
    };
  }
}
