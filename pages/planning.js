import Head from 'next/head';
import Logo from '@components/Logo';
import Footer from '@components/Footer';
import PlanningSearch from '@components/PlanningSearch';
import Navbar from '@components/Navbar';

export default function Planning() {
  return (
    <div className="relative flex flex-col min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <Head>
        <title>whatsplanned | Discover local planning data</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      {/* Background decorations for a more dynamic feel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#f13053]/5 blur-3xl mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#f13053]/5 blur-3xl mix-blend-multiply"></div>
      </div>

      <main className="flex-grow flex flex-col items-center justify-start pt-12 md:pt-24 pb-24 px-4 relative z-20 w-full animate-in slide-in-from-bottom-8 duration-700">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 drop-shadow-sm leading-tight">
            Discover What's Planned.
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-500 font-medium max-w-3xl mx-auto leading-relaxed">
            View housing developments, land building permissions, and planning applications right in your area.
          </p>
        </div>

        <PlanningSearch />
      </main>

      <div className="w-full px-4 mt-auto relative z-0 pb-4">
        <Footer />
      </div>
    </div>
  );
}
