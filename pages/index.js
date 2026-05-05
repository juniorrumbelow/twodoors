import Head from "next/head";

export default function LaunchingSoon() {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Head>
        <title>TwoDoors | Coming Soon</title>
        <meta
          name="description"
          content="TwoDoors is launching soon — your local Norwich property portal."
        />
      </Head>

      <main className="flex-grow flex items-center justify-center relative">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-bg.png"
            alt="Beautiful modern home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {/* Wordmark */}
          <div className="mb-10">
            <span className="text-white text-3xl font-black tracking-tight">
              two<span className="text-[#f13053]">doors</span>
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6 drop-shadow-xl leading-tight">
            Something exciting
            <br />
            is coming.
          </h1>

          <p className="text-lg md:text-xl text-white/80 font-medium max-w-xl mx-auto">
            A better way to find property in Norwich and Norfolk.
          </p>
        </div>
      </main>
    </div>
  );
}
