import Head from "next/head";

export default function LaunchingSoon() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f13053] overflow-hidden">
      <Head>
        <title>twodoors | Coming Soon</title>
        <meta
          name="description"
          content="twodoors is launching soon — your local Norwich property portal."
        />
      </Head>

      <style>{`
        @keyframes orb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(60px, -80px) scale(1.2); }
          66%       { transform: translate(-40px, 50px) scale(0.85); }
        }
        @keyframes orb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(-70px, 50px) scale(1.15); }
          66%       { transform: translate(50px, -60px) scale(0.88); }
        }
        @keyframes orb3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          33%       { transform: translate(calc(-50% + 50px), calc(-50% + 70px)) scale(0.85); }
          66%       { transform: translate(calc(-50% - 60px), calc(-50% - 40px)) scale(1.2); }
        }
        @keyframes orb4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(-30px, 60px) scale(1.1); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .orb1 { animation: orb1 8s ease-in-out infinite; }
        .orb2 { animation: orb2 11s ease-in-out infinite; }
        .orb3 { animation: orb3 7s ease-in-out infinite; }
        .orb4 { animation: orb4 13s ease-in-out infinite; }

        .spin-ring {
          animation: spin-slow 18s linear infinite;
        }
        .spin-ring-reverse {
          animation: spin-slow 24s linear infinite reverse;
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
          {/* Solid coral base */}
          <div className="absolute inset-0 bg-[#f13053]" />

          {/* Orb 1 — light rose, top-left */}
          <div className="orb1 absolute -top-48 -left-48 w-[900px] h-[900px] rounded-full bg-[#ff6070]/25 blur-[100px]" />

          {/* Orb 2 — crimson, bottom-right */}
          <div className="orb2 absolute -bottom-48 -right-48 w-[850px] h-[850px] rounded-full bg-[#aa0030]/30 blur-[120px]" />

          {/* Orb 3 — soft rose, centre-left */}
          <div className="orb3 absolute top-1/2 left-1/3 w-[600px] h-[600px] rounded-full bg-[#ff7080]/20 blur-[90px]" />

          {/* Orb 4 — dark red, top-right */}
          <div className="orb4 absolute -top-24 -right-24 w-[550px] h-[550px] rounded-full bg-[#b0002a]/25 blur-[110px]" />

          {/* Slowly rotating large ring */}
          <div className="spin-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border-[60px] border-white/5" />
          <div className="spin-ring-reverse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border-[80px] border-white/[0.03]" />
        </div>

        {/* ── Content ── */}
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">

          {/* Logo */}
          <div className="hero-content mb-10 flex justify-center">
            <span className="text-white text-4xl font-bold tracking-tight">
              twodoors
            </span>
          </div>

          <h1 className="hero-content-delay text-5xl md:text-6xl font-black tracking-tight mb-6 leading-tight text-white">
            Something exciting
            <br />
            is coming.
          </h1>

          <p className="hero-content-delay-2 text-lg md:text-xl text-white/70 font-medium max-w-xl mx-auto">
            A better way to find property in Norwich and Norfolk.
          </p>
        </div>
      </main>
    </div>
  );
}
