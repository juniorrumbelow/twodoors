import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?location=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/search');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Head>
        <title>TwoDoors | Norwich Property Portal</title>
        <meta name="description" content="Discover the best properties for sale and rent in Norwich and surrounding Norfolk areas with TwoDoors." />
      </Head>

      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/hero-bg.png" 
              alt="Beautiful modern home" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight mb-8 drop-shadow-xl">
              Discover <span className="text-[#01bf8f]">Norwich.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium mb-12 max-w-2xl mx-auto drop-shadow-md">
              Your dedicated portal for properties in Norwich and the surrounding Norfolk areas.
            </p>

            {/* Search Input Box */}
            <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-2 rounded-[2.5rem] shadow-2xl border border-white/20">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
                <div className="flex-grow relative">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Enter city, town, or postcode..."
                    className="w-full pl-16 pr-6 py-5 bg-white rounded-[2rem] text-lg font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#01bf8f]/30 transition-all placeholder:text-gray-400 shadow-inner"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-[#01bf8f] hover:bg-[#019e76] text-white px-10 py-5 rounded-[2rem] text-lg font-black transition-all shadow-lg active:scale-95 whitespace-nowrap"
                >
                  Search Properties
                </button>
              </form>
            </div>

            {/* Quick Links / Popular Searches */}
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-white/80 font-bold text-sm">
              <span>Explore:</span>
              <button onClick={() => router.push('/search?location=Golden%20Triangle')} className="hover:text-[#01bf8f] transition-colors underline decoration-[#01bf8f]/30 underline-offset-4">Golden Triangle</button>
              <button onClick={() => router.push('/search?location=Thorpe%20St%20Andrew')} className="hover:text-[#01bf8f] transition-colors underline decoration-[#01bf8f]/30 underline-offset-4">Thorpe St Andrew</button>
              <button onClick={() => router.push('/search?location=Hellesdon')} className="hover:text-[#01bf8f] transition-colors underline decoration-[#01bf8f]/30 underline-offset-4">Hellesdon</button>
              <button onClick={() => router.push('/search?location=Eaton')} className="hover:text-[#01bf8f] transition-colors underline decoration-[#01bf8f]/30 underline-offset-4">Eaton</button>
              <button onClick={() => router.push('/search?location=Wymondham')} className="hover:text-[#01bf8f] transition-colors underline decoration-[#01bf8f]/30 underline-offset-4">Wymondham</button>
            </div>
          </div>
        </section>

        {/* Featured Sections */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="group p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-[#01bf8f]/10 rounded-2xl flex items-center justify-center text-[#01bf8f] mb-6 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">Buy a property</h3>
                <p className="text-gray-500 font-medium leading-relaxed mb-6">Find your dream home with our immersive map search and verified listings.</p>
                <button onClick={() => router.push('/search')} className="text-[#01bf8f] font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  Browse for sale <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
              </div>

              <div className="group p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-[#01bf8f]/10 rounded-2xl flex items-center justify-center text-[#01bf8f] mb-6 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">Rent a property</h3>
                <p className="text-gray-500 font-medium leading-relaxed mb-6">Discover premium rentals in your area with direct agent communication.</p>
                <button onClick={() => router.push('/search')} className="text-[#01bf8f] font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  Browse for rent <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
              </div>

              <div className="group p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-[#01bf8f]/10 rounded-2xl flex items-center justify-center text-[#01bf8f] mb-6 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">What's Planned</h3>
                <p className="text-gray-500 font-medium leading-relaxed mb-6">Stay informed about local developments and planning permissions in your area.</p>
                <button onClick={() => router.push('/planning')} className="text-[#01bf8f] font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  View planning data <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
