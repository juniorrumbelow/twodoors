import React, { useState, useMemo, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "@components/Navbar";
import DynamicPropertyMap from "@components/DynamicPropertyMap";
import PropertyCard from "@components/PropertyCard";
import Footer from "@components/Footer";
import { db } from "../lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function SearchPage({ initialProperties }) {
  const router = useRouter();
  const { query: urlQuery } = router;
  const listRef = useRef(null);

  const [mobileView, setMobileView] = useState("list");
  const [hoveredId, setHoveredId] = useState(null);

  const channel = urlQuery.channel || "buy";
  const isRent = channel === "rent";

  const filteredProperties = useMemo(() => {
    const location = urlQuery.location || "";
    const minPrice = urlQuery.minPrice || "";
    const maxPrice = urlQuery.maxPrice || "";
    const minBeds = urlQuery.minBeds || "";
    const propertyType = urlQuery.type || "Any";
    const sortBy = urlQuery.sort || "default";

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
  }, [initialProperties, urlQuery]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Head>
        <title>
          {isRent ? "Properties to Rent" : "Properties for Sale"} | TwoDoors
        </title>
      </Head>

      <Navbar />

      <div className="flex flex-1 relative">
        {/* List column — scrolls with the page */}
        <div
          ref={listRef}
          className={`${mobileView === "map" ? "hidden md:flex" : "flex"} flex-col w-full md:w-[50%] lg:w-[50%] xl:w-[50%] z-10`}
        >
          {/* Properties Grid */}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredProperties.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
                <PropertyCard
                  key={property.id}
                  property={property}
                  onHover={setHoveredId}
                  onLeave={() => setHoveredId(null)}
                />
              ))
            )}
          </div>
        </div>

        {/* Map — sticky so it stays in view while the list scrolls */}
        <div
          className={`${mobileView === "list" ? "hidden md:block" : "block"} flex-1 sticky top-16 self-start h-[calc(100vh-4rem)] z-0 p-6`}
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

      <Footer />
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
