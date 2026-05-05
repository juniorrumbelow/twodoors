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
        <title>TwoDoors | Norwich Property Portal</title>
        <meta
          name="description"
          content="Discover the best properties for sale and rent in Norwich and surrounding Norfolk areas with TwoDoors."
        />
      </Head>

      <Navbar />

      <style>{animationStyles}</style>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#06060f]">
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[#06060f]" />
            <div className="orb1 absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full bg-[#f13053]/18 blur-[140px]" />
            <div className="orb2 absolute -bottom-40 -right-40 w-[650px] h-[650px] rounded-full bg-blue-500/15 blur-[130px]" />
            <div className="orb3 absolute top-1/2 left-1/2 w-[420px] h-[420px] rounded-full bg-violet-600/12 blur-[100px]" />
            <div className="grid-overlay absolute inset-0" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-5xl md:text-7xl lg:text-7xl font-black text-white tracking-tight mb-8 drop-shadow-xl">
              Discover <span className="text-[#f13053]">Norfolk</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium mb-12 max-w-2xl mx-auto drop-shadow-md">
              Norfolk homes. All in one place.
            </p>

            {/* Search Input Box */}
            <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-2 rounded-[2.5rem] shadow-2xl border border-white/20">
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
              <button
                onClick={() =>
                  router.push("/search?location=Golden%20Triangle")
                }
                className="hover:text-[#f13053] transition-colors underline decoration-[#f13053]/30 underline-offset-4"
              >
                Golden Triangle
              </button>
              <button
                onClick={() =>
                  router.push("/search?location=Thorpe%20St%20Andrew")
                }
                className="hover:text-[#f13053] transition-colors underline decoration-[#f13053]/30 underline-offset-4"
              >
                Thorpe St Andrew
              </button>
              <button
                onClick={() => router.push("/search?location=Hellesdon")}
                className="hover:text-[#f13053] transition-colors underline decoration-[#f13053]/30 underline-offset-4"
              >
                Hellesdon
              </button>
              <button
                onClick={() => router.push("/search?location=Eaton")}
                className="hover:text-[#f13053] transition-colors underline decoration-[#f13053]/30 underline-offset-4"
              >
                Eaton
              </button>
              <button
                onClick={() => router.push("/search?location=Wymondham")}
                className="hover:text-[#f13053] transition-colors underline decoration-[#f13053]/30 underline-offset-4"
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
