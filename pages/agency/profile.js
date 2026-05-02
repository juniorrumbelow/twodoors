import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import { db } from '../../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const AGENT_ID = 'agent_winkworth_01';

export default function AgencyProfile() {
  const { user, loading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState('');
  const router = useRouter();

  const [profileForm, setProfileForm] = useState({
    name: '',
    branchName: '',
    email: '',
    phone: '',
    website: '',
    logo: ''
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/agent/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchAgentData();
    }
  }, [user]);

  const fetchAgentData = async () => {
    try {
      setIsLoading(true);
      const agentRef = doc(db, 'agents', AGENT_ID);
      const docSnap = await getDoc(agentRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfileForm({
          name: data.name || '',
          branchName: data.branchName || '',
          email: data.email || '',
          phone: data.phone || '',
          website: data.website || '',
          logo: data.logo || ''
        });
      }
    } catch (err) {
      console.error('Error fetching agent data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const agentRef = doc(db, 'agents', AGENT_ID);
      await updateDoc(agentRef, {
        ...profileForm,
        updatedAt: new Date().toISOString()
      });
      setSyncStatus('Profile updated successfully!');
      setTimeout(() => setSyncStatus(''), 3000);
    } catch (err) {
      setSyncStatus('Failed to update profile: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#01bf8f]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>Agency Profile | TwoDoors</title>
      </Head>

      <Navbar />

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 w-full flex-grow">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Agency Profile</h1>
          <p className="text-lg text-gray-400 font-medium mb-12">Update how your agency appears to home seekers.</p>

          {syncStatus && (
            <div className={`mb-8 p-4 rounded-2xl text-sm font-black flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${syncStatus.includes('failed') || syncStatus.includes('Failed') ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-[#01bf8f]/10 text-[#01bf8f] border border-[#01bf8f]/20'}`}>
              <div className="h-2 w-2 rounded-full bg-current"></div>
              {syncStatus}
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="bg-white shadow-xl shadow-gray-200/50 border border-gray-100 rounded-3xl p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Agency Name</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#01bf8f] font-bold text-gray-900"
                  placeholder="Enter agency name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Branch Name</label>
                <input
                  type="text"
                  value={profileForm.branchName}
                  onChange={(e) => setProfileForm({ ...profileForm, branchName: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#01bf8f] font-bold text-gray-900"
                  placeholder="e.g. Hellesdon"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Public Email</label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#01bf8f] font-bold text-gray-900"
                  placeholder="enquiries@agency.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                <input
                  type="text"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#01bf8f] font-bold text-gray-900"
                  placeholder="01603 123456"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Website</label>
                <input
                  type="url"
                  value={profileForm.website}
                  onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#01bf8f] font-bold text-gray-900"
                  placeholder="https://youragency.co.uk"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Agency Logo URL</label>
                <input
                  type="text"
                  value={profileForm.logo}
                  onChange={(e) => setProfileForm({ ...profileForm, logo: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#01bf8f] font-bold text-gray-900"
                  placeholder="https://example.com/logo.png"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#01bf8f]/10 border border-[#01bf8f]/20 flex items-center justify-center shadow-sm overflow-hidden">
                  {profileForm.logo ? (
                    <img src={profileForm.logo} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[#01bf8f] font-black text-xl">{profileForm.name?.charAt(0) || 'A'}</span>
                  )}
                </div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                  {profileForm.logo ? 'Live Preview' : 'Default Avatar'}
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gray-900 text-white font-black px-10 py-4 rounded-2xl hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-gray-200 disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Save Profile Changes'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
