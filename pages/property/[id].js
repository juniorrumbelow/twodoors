import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '@components/Navbar';
import Link from 'next/link';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { getAgentUrl } from '../../utils/formatters';

export default function PropertyDetail({ property }) {
  const router = useRouter();

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Property not found</h1>
        <Link href="/search" className="text-[#f13053] font-bold hover:underline transition-all">
          Return to search
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Head>
        <title>{property.title} | TwoDoors</title>
      </Head>

      <Navbar />

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Title Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-3 tracking-tight">{property.title}</h1>
            <p className="text-xl text-gray-500 font-medium flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#f13053]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {property.address}
            </p>
          </div>
          <div className="bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Asking Price</div>
            <div className="text-4xl font-black text-[#f13053]">{property.priceText || `£${property.price.toLocaleString()}`}</div>
          </div>
        </div>

        {/* Image Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[400px] md:h-[600px] rounded-3xl overflow-hidden mb-12 shadow-md">
          {/* Main Large Image */}
          <div className="md:col-span-3 md:row-span-2 relative group cursor-pointer">
            <img
              src={property.images[0] || property.mainImage}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {property.isBoosted && (
              <div className="absolute top-6 left-6 bg-[#f13053] text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-lg z-10 tracking-widest">
                FEATURED
              </div>
            )}
          </div>

          {/* Secondary Images (Grid) */}
          <div className="hidden md:block relative group overflow-hidden">
            <img
              src={property.images[1] || property.images[0] || property.mainImage}
              alt="View 2"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="hidden md:block relative group overflow-hidden">
            <img
              src={property.images[2] || property.images[0] || property.mainImage}
              alt="View 3"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {property.images.length > 3 && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-xl backdrop-blur-[2px]">
                +{property.images.length - 3} More
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Details */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-8 text-gray-900 font-bold text-xl mb-10 pb-8 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2.5 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#f13053]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                </div>
                {property.bedrooms} Bedrooms
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2.5 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#f13053]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
                </div>
                {property.bathrooms} Bathrooms
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mb-6">Property Overview</h2>
            <p className="text-gray-600 text-xl leading-relaxed whitespace-pre-wrap mb-12">
              {property.description}
            </p>

            {/* Key Features */}
            {property.bullets && property.bullets.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-black text-gray-900 mb-6">Key Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-600 font-medium">
                      <div className="h-2 w-2 bg-[#f13053] rounded-full"></div>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Room Details */}
            {property.rooms && property.rooms.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-black text-gray-900 mb-6">Room Details</h3>
                <div className="space-y-6">
                  {property.rooms.map((room, idx) => (
                    <div key={idx} className="border-b border-gray-100 pb-6 last:border-0">
                      <div className="flex justify-between items-baseline mb-2">
                        <h4 className="text-lg font-black text-gray-900">{room.name}</h4>
                        <span className="text-sm font-bold text-[#f13053]">{room.measurements}</span>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed">{room.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Floorplans */}
            {property.floorplans && property.floorplans.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-black text-gray-900 mb-6">Floorplans</h3>
                <div className="grid grid-cols-1 gap-8">
                  {property.floorplans.map((fp, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-3xl p-4 border border-gray-100">
                      <img src={fp} alt={`Floorplan ${idx + 1}`} className="w-full h-auto rounded-2xl shadow-sm" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Details */}
            <div className="bg-gray-50 rounded-3xl p-10 border border-gray-100 mb-12">
              <h3 className="text-xl font-black text-gray-900 mb-6">Additional Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Tenure</div>
                  <div className="font-bold text-gray-900">{property.tenure || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Department</div>
                  <div className="font-bold text-gray-900">{property.department || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Priority</div>
                  <div className="font-bold text-gray-900">{property.priority || 'N/A'}</div>
                </div>
              </div>
            </div>

            <div className="bg-[#f13053]/5 rounded-3xl p-8 border border-[#f13053]/10">
              <h3 className="text-xl font-bold text-[#f13053] mb-4 text-center">Interested in this property?</h3>
              <p className="text-[#f13053]/70 text-center mb-0 font-medium">Use the contact form on the right to reach out to the listing agent.</p>
            </div>
          </div>

          {/* Sidebar / Agent Card */}
          <div className="relative">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 sticky top-32 shadow-xl shadow-gray-200/50">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Listing Agent</h3>

              <Link href={getAgentUrl(property.agent, property.agentId)} className="flex items-center gap-4 mb-8 group">
                <img src={property.agent.logo} alt={property.agent.name} className="w-16 h-16 rounded-full border-2 border-white shadow-md transition-transform group-hover:scale-105" />
                <div>
                  <div className="font-black text-xl text-gray-900 group-hover:text-[#f13053] transition-colors">{property.agent.name}</div>
                  {property.agent.branchName && (
                    <div className="text-sm font-bold text-gray-500 mb-1">{property.agent.branchName}</div>
                  )}
                  <div className="text-sm font-bold text-[#f13053]">View Profile</div>
                </div>
              </Link>

              <div className="space-y-4">
                <button className="w-full bg-gray-900 text-white font-bold text-lg py-4 rounded-2xl hover:bg-gray-800 transition-all shadow-md active:scale-[0.98]">
                  Call Agent
                </button>
                <button className="w-full bg-[#f13053] text-white font-bold text-lg py-4 rounded-2xl hover:bg-[#c9203f] transition-all shadow-md active:scale-[0.98]">
                  Email Agent
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center justify-center gap-2 text-gray-400 text-sm font-bold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  TwoDoors Verified Listing
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const docRef = doc(db, 'properties', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return {
        notFound: true,
      };
    }

    const propertyData = docSnap.data();

    return {
      props: {
        property: JSON.parse(JSON.stringify(propertyData)),
      },
    };
  } catch (error) {
    console.error("Error fetching property details:", error);
    return {
      props: {
        property: null,
      },
    };
  }
}

