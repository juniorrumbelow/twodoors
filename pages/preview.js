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
              Discover <span className="text-[#f13053]">Norwich.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium mb-12 max-w-2xl mx-auto drop-shadow-md">
              Norfolk homes. All in one place.
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
                    className="w-full pl-16 pr-6 py-5 bg-white rounded-[2rem] text-lg font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#f13053]/30 transition-all placeholder:text-gray-400 shadow-inner"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-[#f13053] hover:bg-[#c9203f] text-white px-10 py-5 rounded-[2rem] text-lg font-black transition-all shadow-lg active:scale-95 whitespace-nowrap"
                >
                  Search Properties
                </button>
              </form>
            </div>

            {/* Quick Links / Popular Searches */}
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-white/80 font-bold text-sm">
              <span>Explore:</span>
              <button onClick={() => router.push('/search?location=Golden%20Triangle')} className="hover:text-[#f13053] transition-colors underline decoration-[#f13053]/30 underline-offset-4">Golden Triangle</button>
              <button onClick={() => router.push('/search?location=Thorpe%20St%20Andrew')} className="hover:text-[#f13053] transition-colors underline decoration-[#f13053]/30 underline-offset-4">Thorpe St Andrew</button>
              <button onClick={() => router.push('/search?location=Hellesdon')} className="hover:text-[#f13053] transition-colors underline decoration-[#f13053]/30 underline-offset-4">Hellesdon</button>
              <button onClick={() => router.push('/search?location=Eaton')} className="hover:text-[#f13053] transition-colors underline decoration-[#f13053]/30 underline-offset-4">Eaton</button>
              <button onClick={() => router.push('/search?location=Wymondham')} className="hover:text-[#f13053] transition-colors underline decoration-[#f13053]/30 underline-offset-4">Wymondham</button>
            </div>
          </div>
        </section>
      </main>

<Footer />
    </div>
  );
}
