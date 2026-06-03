import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import PhotoGallery from '@components/PhotoGallery';
import Link from 'next/link';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { getAgentUrl } from '../../utils/formatters';
import DynamicPropertyDetailMap from '@components/DynamicPropertyDetailMap';
import PropertyPlanningSection from '@components/PropertyPlanningSection';
import NearbySchools from '@components/NearbySchools';
import NearbyTransport from '@components/NearbyTransport';
import GardenSunExposure from '@components/GardenSunExposure';
import BedIcon from '@components/icons/BedIcon';
import BathIcon from '@components/icons/BathIcon';
import HouseIcon from '@components/icons/HouseIcon';
import FloorplanIcon from '@components/icons/FloorplanIcon';
import { useAuth } from '../../context/AuthContext';
import { useFavourites } from '../../context/FavouritesContext';

export default function PropertyDetail({ property, id }) {
  const router = useRouter();
  const { user } = useAuth();
  const { isFavourite, toggleFavourite } = useFavourites();
  const [localAreaTab, setLocalAreaTab] = useState('schools');

  const [copied, setCopied] = useState(false);

  const saved = isFavourite(id);

  const handleSave = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    toggleFavourite(id);
  };

  const handleShare = async () => {
    if (typeof window === 'undefined') return;
    const url = window.location.href;
    const shareData = {
      title: property.title,
      text: `${property.title} — ${property.priceText || `£${property.price.toLocaleString()}`}`,
      url,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      // User dismissed the share sheet or sharing was unavailable — no action needed
    }
  };

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col bg-white">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Property not found</h1>
        <Link href="/search" className="text-[#7a9c72] font-bold hover:underline transition-all">
          Return to search
        </Link>
      </div>
    );
  }

  // Build a Rightmove-style page title, e.g. "3 bedroom semi-detached house for sale in Whitehall Road, Norwich, NR2"
  const transaction = /lett|rent/i.test(property.department || property.status || '') ? 'to rent' : 'for sale';
  const descriptor = [...new Set(
    [property.propertyStyle, property.propertyType].filter(Boolean).join(' ').toLowerCase().split(/\s+/)
  )].join(' ');
  const bedPart = property.bedrooms > 0 ? `${property.bedrooms} bedroom ` : '';
  const summary = `${bedPart}${descriptor}${descriptor ? ' ' : ''}${transaction} in ${property.address}`;
  const pageTitle = summary.charAt(0).toUpperCase() + summary.slice(1);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Head>
        <title>{pageTitle} | twodoors</title>
      </Head>

      <Navbar />

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Title Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
          <div className="max-w-2xl">
            <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">{property.address}</h1>
            <div className="text-xl font-black text-gray-900 mt-4">{property.priceText || `£${property.price.toLocaleString()}`}</div>
          </div>
          <div className="flex flex-col items-stretch gap-3">
            <div className="self-end flex items-center gap-2">
              <button
                onClick={handleSave}
                aria-pressed={saved}
                className={`flex items-center justify-center gap-1.5 font-bold text-sm px-4 py-2 rounded-xl border transition-all active:scale-[0.98] ${
                  saved
                    ? 'bg-[#ef4444] text-white border-[#ef4444] hover:bg-[#dc2626]'
                    : 'bg-white text-gray-900 border-gray-200 hover:border-[#ef4444] hover:text-[#ef4444]'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill={saved ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {saved ? 'Saved' : 'Save property'}
              </button>
              <button
                onClick={handleShare}
                aria-label="Share property"
                className="flex items-center justify-center gap-1.5 font-bold text-sm px-4 py-2 rounded-xl border bg-white text-gray-900 border-gray-200 hover:border-gray-900 transition-all active:scale-[0.98]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                {copied ? 'Link copied' : 'Share'}
              </button>
            </div>
          </div>
        </div>

        {/* Photo Gallery */}
        <PhotoGallery
          images={property.images?.length > 0 ? property.images : [property.mainImage].filter(Boolean)}
          title={property.title}
          isBoosted={property.isBoosted}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Details */}
          <div className="lg:col-span-2">
            {/* Info reel */}
            <dl className="flex flex-wrap gap-x-10 gap-y-6 mb-10 pb-8 border-b border-gray-100">
              {[
                property.propertyType && {
                  label: 'Property type',
                  value: property.propertyType,
                  icon: <HouseIcon className="h-4 w-4 text-[#7a9c72]" />,
                },
                {
                  label: 'Bedrooms',
                  value: property.bedrooms,
                  icon: <BedIcon className="h-4 w-4 text-[#7a9c72]" />,
                },
                {
                  label: 'Bathrooms',
                  value: property.bathrooms,
                  icon: <BathIcon className="h-4 w-4 text-[#7a9c72]" />,
                },
                {
                  label: 'Size',
                  value: property.size || 'Ask agent',
                  icon: <FloorplanIcon className="h-4 w-4 text-[#7a9c72]" />,
                },
                property.tenure && {
                  label: 'Tenure',
                  value: property.tenure,
                  icon: null,
                },
              ]
                .filter(Boolean)
                .map(({ label, value, icon }) => (
                  <div key={label} className="flex flex-col gap-2">
                    <dt className="text-xs font-black text-gray-400 uppercase tracking-widest">
                      {label}
                    </dt>
                    <dd className="flex items-center gap-2">
                      {icon}
                      <span className="font-bold text-base text-gray-900">{value}</span>
                    </dd>
                  </div>
                ))}
            </dl>

            <h2 className="text-2xl font-black text-gray-900 mb-6">Property Overview</h2>
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
                      <div className="h-2 w-2 bg-[#7a9c72] rounded-full"></div>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Garden & Sun Exposure */}
            <GardenSunExposure
              bullets={property.bullets || []}
              description={property.description || ''}
            />

            {/* Room Details */}
            {property.rooms && property.rooms.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-black text-gray-900 mb-6">Room Details</h3>
                <div className="space-y-6">
                  {property.rooms.map((room, idx) => (
                    <div key={idx} className="border-b border-gray-100 pb-6 last:border-0">
                      <div className="flex justify-between items-baseline mb-2">
                        <h4 className="text-lg font-black text-gray-900">{room.name}</h4>
                        <span className="text-sm font-bold text-[#7a9c72]">{room.measurements}</span>
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
                    <div key={idx} className="bg-white rounded-3xl p-4 border border-gray-100">
                      <img src={fp} alt={`Floorplan ${idx + 1}`} className="w-full h-auto rounded-2xl shadow-sm" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location Map */}
            {property.location && (
              <div className="mb-12">
                <h3 className="text-2xl font-black text-gray-900 mb-6">Location</h3>
                <DynamicPropertyDetailMap location={property.location} />
              </div>
            )}

            {/* Local Area */}
            <div className="mb-12">
              <h3 className="text-2xl font-black text-gray-900 mb-6">Local Area</h3>
              <div className="flex gap-2 mb-6 border-b border-gray-100">
                {[
                  { id: 'schools', label: 'Schools' },
                  { id: 'transport', label: 'Transport Links' },
                  { id: 'planning', label: 'Planning Applications' },
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setLocalAreaTab(id)}
                    className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-colors -mb-px border-b-2 ${
                      localAreaTab === id
                        ? 'text-[#7a9c72] border-[#7a9c72]'
                        : 'text-gray-400 border-transparent hover:text-gray-600'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {localAreaTab === 'planning' && <PropertyPlanningSection address={property.address} />}
              {localAreaTab === 'schools' && <NearbySchools location={property.location} />}
              {localAreaTab === 'transport' && <NearbyTransport location={property.location} />}
            </div>

          </div>

          {/* Sidebar / Agent Card */}
          <div className="relative">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 sticky top-32 shadow-xl shadow-gray-200/50">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Marketed by</h3>

              <Link href={getAgentUrl(property.agent, property.agentId)} className="flex items-center gap-4 mb-8 group">
                <img src={property.agent.logo} alt={property.agent.name} className="w-16 h-16 rounded-full border-2 border-white shadow-md transition-transform group-hover:scale-105" />
                <div>
                  <div className="font-black text-xl text-gray-900 group-hover:text-[#7a9c72] transition-colors">{property.agent.name}</div>
                  {property.agent.branchName && (
                    <div className="text-sm font-bold text-gray-500 mb-1">{property.agent.branchName}</div>
                  )}
                  <div className="text-sm font-bold text-[#7a9c72]">View Profile</div>
                </div>
              </Link>

              <div className="space-y-4">
                {property.agent.phone ? (
                  <a
                    href={`tel:${property.agent.phone}`}
                    className="block w-full bg-gray-900 text-white font-bold text-lg py-4 rounded-2xl hover:bg-gray-800 transition-all shadow-md active:scale-[0.98] text-center"
                  >
                    Call Agent
                  </a>
                ) : (
                  <button disabled className="w-full bg-gray-200 text-gray-400 font-bold text-lg py-4 rounded-2xl cursor-not-allowed">
                    Call Agent
                  </button>
                )}
                {property.agent.email ? (
                  <a
                    href={`mailto:${property.agent.email}?subject=${encodeURIComponent(`Enquiry: ${property.title}`)}`}
                    className="block w-full bg-[#7a9c72] text-white font-bold text-lg py-4 rounded-2xl hover:bg-[#5e7d57] transition-all shadow-md active:scale-[0.98] text-center"
                  >
                    Email Agent
                  </a>
                ) : (
                  <button disabled className="w-full bg-gray-200 text-gray-400 font-bold text-lg py-4 rounded-2xl cursor-not-allowed">
                    Email Agent
                  </button>
                )}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center justify-center gap-2 text-gray-400 text-sm font-bold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  twodoors Verified Listing
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const docRef = doc(db, 'properties', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return { notFound: true };
    }

    const propertyData = docSnap.data();

    // Fetch agent contact details if not already embedded on the property
    if (propertyData.agentId && (!propertyData.agent?.email && !propertyData.agent?.phone)) {
      const agentRef = doc(db, 'agents', propertyData.agentId);
      const agentSnap = await getDoc(agentRef);
      if (agentSnap.exists()) {
        const agentData = agentSnap.data();
        propertyData.agent = {
          ...propertyData.agent,
          email: agentData.email || null,
          phone: agentData.phone || null,
        };
      }
    }

    return {
      props: {
        property: JSON.parse(JSON.stringify(propertyData)),
        id,
      },
    };
  } catch (error) {
    return {
      props: {
        property: null,
        id: null,
      },
    };
  }
}

