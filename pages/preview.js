import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

const animationStyles = `
  @keyframes orb1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%       { transform: translate(40px, -60px) scale(1.12); }
    66%       { transform: translate(-25px, 30px) scale(0.9); }
  }
  @keyframes orb2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%       { transform: translate(-50px, 35px) scale(1.08); }
    66%       { transform: translate(30px, -45px) scale(0.93); }
  }
  @keyframes orb3 {
    0%, 100% { transform: translate(-50%, -50%) scale(1); }
    33%       { transform: translate(calc(-50% + 25px), calc(-50% + 45px)) scale(0.92); }
    66%       { transform: translate(calc(-50% - 35px), calc(-50% - 20px)) scale(1.1); }
  }
  @keyframes grid-pulse {
    0%, 100% { opacity: 0.18; }
    50%       { opacity: 0.28; }
  }
  .orb1 { animation: orb1 7s ease-in-out infinite; }
  .orb2 { animation: orb2 9s ease-in-out infinite; }
  .orb3 { animation: orb3 6s ease-in-out infinite; }
  .grid-overlay {
    background-image:
      linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
    background-size: 56px 56px;
    animation: grid-pulse 9s ease-in-out infinite;
  }
`;

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?location=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/search");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Head>
        <title>twodoors | Norwich Property Portal</title>
        <meta
          name="description"
          content="Discover the best properties for sale and rent in Norwich and surrounding Norfolk areas with twodoors."
        />
      </Head>

      <Navbar />

      <style>{animationStyles}</style>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden" style={{ background: '#f5f1ea' }}>
          {/* Background atmosphere */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-48 -right-36 w-[640px] h-[640px] rounded-full blur-[80px]" style={{ background: '#a8c3a0', opacity: 0.4 }} />
            <div className="absolute -bottom-56 -left-44 w-[600px] h-[600px] rounded-full blur-[80px]" style={{ background: '#e8d5c4', opacity: 0.55 }} />
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(45,58,46,0.07) 1px, transparent 1.5px)', backgroundSize: '24px 24px', opacity: 0.45 }} />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-5xl md:text-7xl lg:text-7xl font-black tracking-tight mb-8" style={{ color: '#2d3a2e' }}>
              Discover <span style={{ color: '#7a9c72' }}>Norfolk</span>
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-12 max-w-2xl mx-auto" style={{ color: '#6f6a5e' }}>
              Norfolk homes. All in one place.
            </p>

            {/* Search Input Box */}
            <div className="max-w-4xl mx-auto bg-white p-2 rounded-[2.5rem] shadow-xl border border-black/5">
              <form
                onSubmit={handleSearch}
                className="flex flex-col md:flex-row gap-2"
              >
                <div className="flex-grow relative">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
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
                    placeholder="Enter city, town, or postcode..."
                    className="w-full pl-16 pr-6 md:pr-12 py-5 bg-white rounded-[2rem] text-lg font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#7a9c72]/30 transition-all placeholder:text-gray-400 shadow-inner"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#7a9c72] hover:bg-[#5e7d57] text-white px-10 py-5 rounded-[2rem] text-lg font-black transition-all shadow-lg active:scale-95 whitespace-nowrap"
                >
                  Search Properties
                </button>
              </form>
            </div>

            {/* Quick Links / Popular Searches */}
            <div className="mt-8 flex flex-wrap justify-center gap-4 font-bold text-sm" style={{ color: '#6f6a5e' }}>
              <span>Explore:</span>
              <button
                onClick={() =>
                  router.push("/search?location=Golden%20Triangle")
                }
                className="hover:text-[#7a9c72] transition-colors underline decoration-[#7a9c72]/30 underline-offset-4"
              >
                Golden Triangle
              </button>
              <button
                onClick={() =>
                  router.push("/search?location=Thorpe%20St%20Andrew")
                }
                className="hover:text-[#7a9c72] transition-colors underline decoration-[#7a9c72]/30 underline-offset-4"
              >
                Thorpe St Andrew
              </button>
              <button
                onClick={() => router.push("/search?location=Hellesdon")}
                className="hover:text-[#7a9c72] transition-colors underline decoration-[#7a9c72]/30 underline-offset-4"
              >
                Hellesdon
              </button>
              <button
                onClick={() => router.push("/search?location=Eaton")}
                className="hover:text-[#7a9c72] transition-colors underline decoration-[#7a9c72]/30 underline-offset-4"
              >
                Eaton
              </button>
              <button
                onClick={() => router.push("/search?location=Wymondham")}
                className="hover:text-[#7a9c72] transition-colors underline decoration-[#7a9c72]/30 underline-offset-4"
              >
                Wymondham
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
