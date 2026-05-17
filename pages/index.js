import Head from "next/head";
import Logo from "../components/Logo";

export default function LaunchingSoon() {
  return (
    <div
      style={{ background: "#f5f1ea", minHeight: "100vh", overflow: "hidden" }}
    >
      <Head>
        <title>twodoors · From one door to the next</title>
        <meta
          name="description"
          content="A better way to find property in Norwich and Norfolk."
        />
      </Head>

      <style>{`
        :root {
          --bg: #f5f1ea;
          --soft: #e8d5c4;
          --accent: #a8c3a0;
          --accent-deep: #7a9c72;
          --ink: #2d3a2e;
          --sub: #6f6a5e;
        }

        .stage {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 40px 64px;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }
        .blob-sage {
          top: -200px;
          right: -140px;
          width: 640px;
          height: 640px;
          background: var(--accent);
          opacity: 0.40;
        }
        .blob-peach {
          bottom: -220px;
          left: -180px;
          width: 600px;
          height: 600px;
          background: var(--soft);
          opacity: 0.55;
        }


.stage-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .headline {
          font-family: "Lora", Georgia, serif;
          font-weight: 500;
          font-size: clamp(56px, 9vw, 100px);
          line-height: 1.0;
          letter-spacing: -2.5px;
          color: var(--ink);
          margin: 0;
          text-wrap: balance;
        }
        .headline em {
          font-style: normal;
          color: var(--accent-deep);
        }

        .lede {
          font-family: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-size: clamp(18px, 1.6vw, 22px);
          line-height: 1.5;
          color: var(--sub);
          margin: 36px 0 0;
        }

        .features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 48px;
        }
        .feature {
          background: rgba(255,255,255,0.55);
          border: 1px solid rgba(45,58,46,0.10);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(6px);
        }
        .feature-icon {
          width: 36px;
          height: 36px;
          margin-bottom: 14px;
          color: var(--accent-deep);
        }
        .feature h3 {
          font-family: "Lora", Georgia, serif;
          font-weight: 500;
          font-size: 17px;
          color: var(--ink);
          margin: 0 0 8px;
        }
        .feature p {
          font-family: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-size: 14px;
          line-height: 1.55;
          color: var(--sub);
          margin: 0;
        }

        @media (max-width: 720px) {
          .stage { padding: 28px 28px; }
          .headline { letter-spacing: -1.2px; }
          .features { grid-template-columns: 1fr; }
          .blob-sage { top: 200px; }
        }
      `}</style>

      <div className="stage">
        <div className="blob blob-sage" />
        <div className="blob blob-peach" />

        <main className="stage-content">
          <div style={{ marginBottom: "36px" }}>
            <Logo size="text-5xl" />
          </div>

          <h1 class="headline">
            From one door to the <em>next</em>.
          </h1>
          <p className="lede">
            A better way to find property in Norwich and Norfolk. Launching
            soon.
          </p>

          <div className="features">
            <div className="feature">
              <svg
                className="feature-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h3>Smart property search</h3>
              <p>
                Browse every home for sale and to rent across Norwich and
                Norfolk in one clean, easy-to-use place.
              </p>
            </div>
            <div className="feature">
              <svg
                className="feature-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3>Planning insights</h3>
              <p>
                See nearby planning applications before you buy — know what's
                happening in the neighbourhood before you commit.
              </p>
            </div>
            <div className="feature">
              <svg
                className="feature-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <h3>Local knowledge built in</h3>
              <p>
                Schools, transport links, and sun exposure — the details that
                matter to you, surfaced on every listing.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
