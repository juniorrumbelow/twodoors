import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@components/Navbar';
import { db } from '../lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function Properties({ properties }) {
  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>Our Properties | Two Doors</title>
      </Head>

      <Navbar />


      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Available Properties
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Browse our latest selection of premium properties fetched directly from our XML feed.
          </p>
        </div>


        {properties.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-lg">
            No properties found in the database. Try running the ingest API first!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Link 
                key={property.id} 
                href={`/property/${property.id}`}
                className={`group bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col ${property.isBoosted ? 'border-[#01bf8f] ring-1 ring-[#01bf8f]/10' : 'border-gray-200'}`}
              >
                {/* Image Section */}
                <div className="relative h-64 w-full bg-gray-200 overflow-hidden">
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md border ${
                      property.status?.toLowerCase().includes('sale') 
                        ? 'bg-white text-blue-700 border-blue-100' 
                        : 'bg-white text-emerald-700 border-emerald-100'
                    }`}>
                      {property.status || 'Available'}
                    </span>
                  </div>

                  {property.isBoosted && (
                    <div className="absolute top-4 right-4 z-10 bg-[#01bf8f] text-white text-[10px] font-black px-2 py-1 rounded shadow-sm flex items-center gap-1">
                      FEATURED
                    </div>
                  )}
                  
                  {property.mainImage ? (
                    <img
                      src={property.mainImage}
                      alt={property.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No Image Available
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 group-hover:text-[#01bf8f] transition-colors">
                        {formatPrice(property.price)}
                      </h2>
                      <p className="text-gray-600 font-medium mt-1 line-clamp-1">
                        {property.address}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex space-x-6 py-4 border-y border-gray-100 mb-4 text-sm">
                    <div className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span className="font-bold">{property.bedrooms}</span>
                      <span className="ml-1 text-gray-500">Bed</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span className="font-bold">{property.bathrooms}</span>
                      <span className="ml-1 text-gray-500">Bath</span>
                    </div>
                  </div>

                  <p className="text-gray-600 line-clamp-3 mb-6 flex-grow text-sm">
                    {property.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                    <div className="flex items-center gap-2">
                      <img src={property.agent?.logo} alt={property.agent?.name} className="w-6 h-6 rounded-full border border-gray-200" />
                      <span className="text-xs font-semibold text-gray-500">{property.agent?.name}</span>
                    </div>
                    <div className="text-[#01bf8f] text-sm font-bold">
                      View Details
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    // Fetch properties from Firestore
    const propertiesRef = collection(db, 'properties');
    const q = query(propertiesRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const properties = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      // Firestore timestamps need to be converted to strings for Next.js props
      createdAt: doc.data().createdAt || null
    })).sort((a, b) => {
      if (a.isBoosted && !b.isBoosted) return -1;
      if (!a.isBoosted && b.isBoosted) return 1;
      return 0;
    });

    return {
      props: {
        properties: JSON.parse(JSON.stringify(properties)),
      },
    };
  } catch (error) {
    console.error("Error fetching properties from Firestore:", error);
    return {
      props: {
        properties: [],
      },
    };
  }
}

