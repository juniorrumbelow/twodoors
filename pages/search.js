import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '@components/Navbar';
import DynamicPropertyMap from '@components/DynamicPropertyMap';
import PropertyMapCard from '@components/PropertyMapCard';
import { db } from '../lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function SearchPage({ initialProperties }) {
  const router = useRouter();
  const { query: urlQuery } = router;

  // Filter States
  const [location, setLocation] = useState(urlQuery.location || '');
  const [minPrice, setMinPrice] = useState(urlQuery.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(urlQuery.maxPrice || '');
  const [minBeds, setMinBeds] = useState(urlQuery.minBeds || '');
  const [propertyType, setPropertyType] = useState(urlQuery.type || 'Any');

  // Sync state with URL on load and changes
  useEffect(() => {
    setLocation(urlQuery.location || '');
    setMinPrice(urlQuery.minPrice || '');
    setMaxPrice(urlQuery.maxPrice || '');
    setMinBeds(urlQuery.minBeds || '');
    setPropertyType(urlQuery.type || 'Any');
  }, [urlQuery]);

  // Derived Properties (Filtered)
  const filteredProperties = useMemo(() => {
    return initialProperties.filter(p => {
      // Location Filter (Search in title, address, description)
      if (location) {
        const searchStr = `${p.title} ${p.address} ${p.description}`.toLowerCase();
        if (!searchStr.includes(location.toLowerCase())) return false;
      }

      // Price Filter
      if (minPrice && p.price < parseInt(minPrice)) return false;
      if (maxPrice && p.price > parseInt(maxPrice)) return false;

      // Bedrooms Filter
      if (minBeds && p.bedrooms < parseInt(minBeds)) return false;

      // Property Type Filter (Mock check as data might vary)
      if (propertyType !== 'Any') {
        const typeStr = (p.title + ' ' + (p.department || '')).toLowerCase();
        if (!typeStr.includes(propertyType.toLowerCase())) return false;
      }

      return true;
    });
  }, [initialProperties, location, minPrice, maxPrice, minBeds, propertyType]);

  const updateFilters = (updates) => {
    const newQuery = { ...urlQuery, ...updates };
    // Remove empty filters
    Object.keys(newQuery).forEach(key => {
      if (!newQuery[key] || newQuery[key] === 'Any') delete newQuery[key];
    });
    router.push({ pathname: '/search', query: newQuery }, undefined, { shallow: true });
  };

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      <Head>
        <title>Search Properties | TwoDoors</title>
      </Head>

      <Navbar />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative">

        {/* Left Sidebar (Listings) */}
        <div className="w-full md:w-[50%] lg:w-[40%] xl:w-[35%] h-full overflow-y-auto bg-gray-50 border-r border-gray-200 z-10 flex flex-col">

          {/* Search Filters / Header */}
          <div className="p-4 bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
            <div className="flex flex-col gap-4">
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  placeholder="City, town or postcode..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl text-sm font-bold text-gray-900 border-none focus:ring-2 focus:ring-[#01bf8f] transition-all"
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
                    {location ? `Properties in ${location}` : 'Properties for sale'}
                  </h1>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{filteredProperties.length} Results Found</p>
                </div>
              </div>

              {/* Functional Filters */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {/* Price Select */}
                <select 
                  className="whitespace-nowrap px-3 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-gray-700 bg-white focus:border-[#01bf8f] focus:ring-1 focus:ring-[#01bf8f] outline-none transition-colors appearance-none cursor-pointer"
                  value={maxPrice}
                  onChange={(e) => updateFilters({ maxPrice: e.target.value })}
                >
                  <option value="">Any Price</option>
                  <option value="100000">Up to £100k</option>
                  <option value="250000">Up to £250k</option>
                  <option value="500000">Up to £500k</option>
                  <option value="750000">Up to £750k</option>
                  <option value="1000000">Up to £1m</option>
                </select>

                {/* Beds Select */}
                <select 
                  className="whitespace-nowrap px-3 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-gray-700 bg-white focus:border-[#01bf8f] focus:ring-1 focus:ring-[#01bf8f] outline-none transition-colors appearance-none cursor-pointer"
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

                {/* Type Select */}
                <select 
                  className="whitespace-nowrap px-3 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-gray-700 bg-white focus:border-[#01bf8f] focus:ring-1 focus:ring-[#01bf8f] outline-none transition-colors appearance-none cursor-pointer"
                  value={propertyType}
                  onChange={(e) => updateFilters({ type: e.target.value })}
                >
                  <option value="Any">All Types</option>
                  <option value="House">Houses</option>
                  <option value="Flat">Flats</option>
                  <option value="Apartment">Apartments</option>
                  <option value="Bungalow">Bungalows</option>
                </select>
              </div>
            </div>
          </div>

          {/* Properties List */}
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
            {filteredProperties.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">No properties match your search</h3>
                <p className="text-sm text-gray-500 mt-1">Try adjusting your filters or search area</p>
                <button 
                  onClick={() => router.push('/search')}
                  className="mt-6 text-[#01bf8f] font-bold text-sm hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              filteredProperties.map(property => (
                <PropertyMapCard key={property.id} property={property} />
              ))
            )}
          </div>

        </div>

        {/* Right Content (Map) */}
        <div className="hidden md:block flex-1 bg-gray-100 relative z-0">
          <DynamicPropertyMap properties={filteredProperties} />
        </div>

      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const propertiesRef = collection(db, 'properties');
    const q = query(propertiesRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const properties = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })).sort((a, b) => {
      // Sort by boosted status first
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
