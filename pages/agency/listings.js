import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/Logo';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import Navbar from '../../components/Navbar';

const AGENT_ID = 'agent_winkworth_01';

export default function AgencyListings() {
  const { user, isAgent, loading: authLoading } = useAuth();
  const [properties, setProperties] = useState([]);
  const [agentData, setAgentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (authLoading) return;
    if (!user) router.push('/agent/login');
    else if (!isAgent) router.push('/search');
  }, [user, isAgent, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchAgentProperties();
      // We still fetch agent name for the welcome message
      fetchAgentData();
    }
  }, [user]);

  const fetchAgentData = async () => {
    try {
      const agentRef = doc(db, 'agents', AGENT_ID);
      const docSnap = await getDocs(query(collection(db, 'agents'), where('__name__', '==', AGENT_ID)));
      if (!docSnap.empty) {
        setAgentData(docSnap.docs[0].data());
      }
    } catch (err) {
      console.error('Error fetching agent data:', err);
    }
  };

  const fetchAgentProperties = async () => {
    try {
      setIsLoading(true);
      const propertiesRef = collection(db, 'properties');
      const q = query(propertiesRef, where('agentId', '==', AGENT_ID));
      const querySnapshot = await getDocs(q);
      const props = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProperties(props);
    } catch (err) {
      console.error('Error fetching properties:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBoost = async (propertyId, currentStatus) => {
    try {
      setSyncStatus('Updating boost status...');
      const propertyRef = doc(db, 'properties', propertyId);
      await updateDoc(propertyRef, {
        isBoosted: !currentStatus
      });

      setProperties(prev => prev.map(p =>
        p.id === propertyId ? { ...p, isBoosted: !currentStatus } : p
      ));

      setSyncStatus(`Property ${!currentStatus ? 'boosted' : 'unboosted'} successfully!`);
      setTimeout(() => setSyncStatus(''), 3000);
    } catch (err) {
      setSyncStatus('Failed to update boost status: ' + err.message);
    }
  };

  const handleSync = async () => {
    try {
      setSyncStatus('Syncing with Winkworth...');
      const response = await fetch('/api/ingest');
      const data = await response.json();
      if (data.success) {
        setSyncStatus('Sync successful! ' + data.message);
        fetchAgentProperties();
      } else {
        setSyncStatus('Sync failed: ' + data.error);
      }
      setTimeout(() => setSyncStatus(''), 5000);
    } catch (err) {
      setSyncStatus('Network error during sync: ' + err.message);
    }
  };

  if (authLoading || !user || !isAgent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f13053]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>Agency Listings | TwoDoors</title>
      </Head>

      <Navbar />

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 w-full flex-grow">
        {syncStatus && (
          <div className={`mb-8 p-4 rounded-2xl text-sm font-black flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${syncStatus.includes('failed') || syncStatus.includes('Failed') ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-[#f13053]/10 text-[#f13053] border border-[#f13053]/20'}`}>
            <div className={`h-2 w-2 rounded-full ${syncStatus.includes('Syncing') || syncStatus.includes('Updating') ? 'bg-[#f13053] animate-ping' : 'bg-current'}`}></div>
            {syncStatus}
          </div>
        )}

        <div className="md:flex md:items-end md:justify-between mb-12">
          <div className="flex-1 min-w-0">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
              Welcome back, {agentData?.name?.split(' ')[0] || 'Partner'}
            </h1>
            <p className="text-lg text-gray-400 font-medium">Manage your property portfolio and sync live data.</p>
          </div>
          <div className="mt-6 flex md:mt-0 md:ml-4 gap-4">
            <button
              onClick={handleSync}
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-2xl shadow-sm text-sm font-black text-white bg-[#f13053] hover:bg-[#c9203f] transition-all active:scale-95"
            >
              Sync XML Feed
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 mb-12">
          <div className="bg-white overflow-hidden shadow-sm border border-gray-100 rounded-3xl p-8 hover:shadow-md transition-shadow">
            <dt className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Active Listings</dt>
            <dd className="flex items-baseline justify-between">
              <div className="text-4xl font-black text-gray-900">{properties.length}</div>
              <div className="text-[10px] font-black text-[#f13053] bg-[#f13053]/10 px-2 py-1 rounded-full uppercase tracking-tighter">
                Live on TwoDoors
              </div>
            </dd>
          </div>
        </div>

        <div className="bg-white shadow-xl shadow-gray-200/50 border border-gray-100 sm:rounded-3xl overflow-hidden mb-12">
          <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
            <h3 className="text-xl font-black text-gray-900">Live Inventory</h3>
            <div className="text-xs font-bold text-gray-400">Total: {properties.length} Active</div>
          </div>
          {isLoading ? (
            <div className="py-32 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f13053] mx-auto mb-4"></div>
              <p className="text-gray-400 font-bold">Loading your portfolio...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="py-32 text-center text-gray-400 flex flex-col items-center">
              <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              <p className="font-bold text-lg">No properties synchronized yet.</p>
              <button onClick={handleSync} className="mt-4 text-[#f13053] font-black hover:underline">Click here to sync your XML feed</button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-white">
                  <tr>
                    <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Listing Info</th>
                    <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Valuation</th>
                    <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Portal Status</th>
                    <th className="px-8 py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Portal Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-50">
                  {properties.map((property) => (
                    <tr key={property.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-6 whitespace-nowrap">
                        <Link href={`/property/${property.id}`} className="flex items-center group">
                          <div className="h-14 w-14 flex-shrink-0 relative overflow-hidden rounded-2xl shadow-sm border border-gray-100">
                            <img className="h-full w-full object-cover transition-transform group-hover:scale-110" src={property.mainImage} alt="" />
                            {property.isBoosted && <div className="absolute inset-0 bg-[#f13053]/20 border-2 border-[#f13053] rounded-2xl"></div>}
                          </div>
                          <div className="ml-5">
                            <div className="text-sm font-black text-gray-900 group-hover:text-[#f13053] transition-colors">{property.title}</div>
                            <div className="text-[11px] text-gray-400 font-bold mt-0.5">{property.address}</div>
                          </div>
                        </Link>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="text-base font-black text-gray-900">£{property.price.toLocaleString()}</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{property.status}</div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="flex flex-col gap-1.5">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${property.isBoosted ? 'bg-[#f13053] text-white shadow-sm shadow-[#f13053]/40' : 'bg-gray-100 text-gray-400'}`}>
                            {property.isBoosted ? 'Boosted' : 'Standard'}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => handleBoost(property.id, property.isBoosted)}
                            className={`font-black text-[11px] uppercase px-4 py-2 rounded-xl transition-all shadow-sm active:scale-95 ${property.isBoosted ? 'bg-gray-900 text-white' : 'bg-[#f13053] text-white hover:bg-[#c9203f]'}`}
                          >
                            {property.isBoosted ? 'Unboost' : 'Boost Listing'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
