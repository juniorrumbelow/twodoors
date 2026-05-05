import Head from "next/head";

export default function LaunchingSoon() {
  return (
    <div className="min-h-screen flex flex-col bg-[#06060f] overflow-hidden">
      <Head>
        <title>TwoDoors | Coming Soon</title>
        <meta
          name="description"
          content="TwoDoors is launching soon — your local Norwich property portal."
        />
      </Head>

      <style>{`
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
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
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

        .scanline {
          animation: scanline 7s linear infinite;
        }

        .hero-content {
          animation: fade-up 1s ease-out both;
        }
        .hero-content-delay {
          animation: fade-up 1s ease-out 0.15s both;
        }
        .hero-content-delay-2 {
          animation: fade-up 1s ease-out 0.3s both;
        }
      `}</style>

      <main className="flex-grow flex items-center justify-center relative">
        {/* ── Animated background ── */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Deep base */}
          <div className="absolute inset-0 bg-[#06060f]" />

          {/* Orb 1 — brand red, top-left */}
          <div className="orb1 absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full bg-[#f13053]/18 blur-[140px]" />

          {/* Orb 2 — electric blue, bottom-right */}
          <div className="orb2 absolute -bottom-40 -right-40 w-[650px] h-[650px] rounded-full bg-blue-500/15 blur-[130px]" />

          {/* Orb 3 — violet, centre */}
          <div className="orb3 absolute top-1/2 left-1/2 w-[420px] h-[420px] rounded-full bg-violet-600/12 blur-[100px]" />

          {/* Subtle grid */}
          <div className="grid-overlay absolute inset-0" />
        </div>

        {/* ── Content ── */}
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <div className="hero-content mb-10">
            <span className="text-white text-3xl font-bold tracking-tight">
              two<span className="text-[#f13053]">doors</span>
            </span>
          </div>

          <h1 className="hero-content-delay text-5xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
            Something exciting
            <br />
            is coming.
          </h1>

          <p className="hero-content-delay-2 text-lg md:text-xl text-white/50 font-medium max-w-xl mx-auto">
            A better way to find property in Norwich and Norfolk.
          </p>
        </div>
      </main>
    </div>
  );
}
