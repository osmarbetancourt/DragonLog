"use client";

import React from "react";

const FEATURES = [
  {
    title: "Vigil Unbroken",
    description: "Real-time log sentries sweep thy realm, binding rogue signals before discord taketh hold.",
  },
  {
    title: "Dragon’s Insight",
    description: "Ancestral charts, heat-laden metrics, and rune-scribed alerts reveal peril long ere it strikes.",
  },
  {
    title: "Sanctum of Control",
    description: "Gather microservice scrolls, pipeline epics, and shard whispers under one vigilant gaze.",
  },
  {
    title: "Open Flame",
    description: "Forge new integrations with open source embers; extend the lair with spells of thine own making.",
  },
];

const TECH_PILLARS = [
  {
    name: "Next.js",
    lore: "Frontend grimoire weaving portals and dashboards with server-borne speed.",
  },
  {
    name: "Kafka",
    lore: "Raven-black message streams ferry every whisper into the dragon's hoard.",
  },
  {
    name: "Rust",
    lore: "Forge-daemons compiled in iron oath ensure the pipeline never slumbers.",
  },
];

const INTEGRATIONS = ["AWS", "Render", "Hetzner"];

export default function LandingShowcase() {
  return (
    <div className="landing-canvas">
      <style>{`
        .landing-canvas {
          position: relative;
          width: 100%;
          min-height: 100vh;
          color: #f7e8d6;
          background: linear-gradient(180deg, rgba(8,6,14,0.95) 0%, rgba(12,9,18,0.94) 45%, rgba(6,4,10,1) 100%);
        }
        .landing-hero {
          position: relative;
          padding: clamp(4rem, 12vw, 8rem) clamp(1.5rem, 9vw, 6rem) clamp(3rem, 10vw, 7rem);
          display: grid;
          gap: clamp(2.5rem, 6vw, 4rem);
          overflow: hidden;
        }
        .landing-hero-grid {
          position: relative;
          display: grid;
          grid-template-columns: minmax(120px, 220px) 1fr;
          gap: clamp(1.75rem, 4vw, 3rem);
          align-items: start;
        }
        .landing-logo-placeholder {
          position: relative;
          width: clamp(140px, 22vw, 220px);
          height: clamp(140px, 22vw, 220px);
          border-radius: 24px;
          border: 1px dashed rgba(215,180,120,0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Old Charlotte', serif;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(245,228,198,0.68);
          background: linear-gradient(160deg, rgba(20,10,22,0.65), rgba(12,8,18,0.82));
          box-shadow: 0 14px 32px rgba(0,0,0,0.35);
        }
        .landing-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top right, rgba(164,76,28,0.28) 0%, rgba(24,10,6,0.4) 45%, rgba(8,6,14,0.92) 70%);
          opacity: 0.8;
          pointer-events: none;
        }
        .landing-hero::after {
          content: "";
          position: absolute;
          inset: -40%;
          background: radial-gradient(circle, rgba(255,210,120,0.08) 0%, rgba(255,128,54,0.02) 35%, rgba(0,0,0,0) 70%);
          transform: rotate(18deg);
          animation: heroPulse 24s ease-in-out infinite;
          pointer-events: none;
        }
        .landing-hero h1 {
          position: relative;
          font-family: 'Old Charlotte', serif;
          font-size: clamp(2.8rem, 6vw, 5.2rem);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-shadow: 0 0 22px rgba(255,196,120,0.55);
          line-height: 1.15;
        }
        .landing-hero p {
          position: relative;
          max-width: 720px;
          font-size: clamp(1.05rem, 2vw, 1.35rem);
          line-height: 1.8;
          color: rgba(247,232,214,0.86);
        }
        .landing-hero-actions {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .landing-hero-actions a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          padding: 0.85rem 2.8rem;
          text-decoration: none;
          text-transform: uppercase;
          font-family: 'Old Charlotte', serif;
          letter-spacing: 0.08em;
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
        }
        .landing-hero-actions a.primary {
          background: linear-gradient(135deg, rgba(225,178,104,0.9), rgba(155,82,24,0.85));
          color: #1a0a02;
          box-shadow: 0 12px 24px rgba(255,170,80,0.25);
        }
        .landing-hero-actions a.primary:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(255,190,110,0.35);
        }
        .landing-hero-actions a.secondary {
          background: rgba(15,10,22,0.75);
          border: 1px solid rgba(215,180,120,0.55);
          color: rgba(244,225,194,0.85);
        }
        .landing-hero-actions a.secondary:hover {
          transform: translateY(-4px);
          background: rgba(26,18,36,0.9);
          box-shadow: 0 12px 26px rgba(172,120,72,0.25);
        }
        .landing-parallax {
          position: relative;
          overflow: hidden;
          height: clamp(280px, 48vw, 520px);
          margin: 0 clamp(1.5rem, 8vw, 6rem);
          border-radius: clamp(16px, 4vw, 32px);
          border: 1px solid rgba(215,180,120,0.32);
          background: linear-gradient(180deg, rgba(18,12,24,0.95) 0%, rgba(8,4,12,0.85) 100%);
          box-shadow: 0 18px 48px rgba(0,0,0,0.45);
        }
        .parallax-layer {
          position: absolute;
          inset: -4%;
          background-size: cover;
          background-position: center;
          opacity: 0.6;
          transform: translateZ(0);
        }
        .parallax-layer.back {
          background-image: url('/castle_pixel/pixel_1.png');
          animation: parallaxDriftBack 36s linear infinite;
        }
        .parallax-layer.mid {
          background-image: url('/castle_pixel/pixel_2.png');
          animation: parallaxDriftMid 48s linear infinite;
          mix-blend-mode: screen;
          opacity: 0.5;
        }
        .parallax-layer.front {
          background-image: url('/castle_pixel/pixel_3.png');
          animation: parallaxDriftFront 28s linear infinite;
          opacity: 0.55;
        }
        .landing-parallax-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(8,4,12,0.1) 0%, rgba(8,4,12,0.75) 100%);
        }
        .landing-features {
          padding: clamp(3.5rem, 9vw, 6rem) clamp(1.5rem, 8vw, 6rem) clamp(4rem, 10vw, 7rem);
          display: grid;
          gap: clamp(2rem, 6vw, 3rem);
        }
        .product-summary {
          position: relative;
          display: grid;
          grid-template-columns: minmax(260px, 1fr) minmax(260px, 440px);
          gap: clamp(1.5rem, 5vw, 3rem);
          padding: clamp(1.75rem, 5vw, 3rem);
          border-radius: 28px;
          background:
            linear-gradient(145deg, rgba(34,20,40,0.95), rgba(18,12,28,0.92)) padding-box,
            linear-gradient(155deg, rgba(210,160,120,0.35), rgba(95,70,110,0.25)) border-box;
          border: 1px solid transparent;
          box-shadow: 0 22px 44px rgba(0,0,0,0.36);
          overflow: hidden;
        }
        .product-summary > * {
          position: relative;
          z-index: 1;
        }
        .product-summary::after {
          content: "";
          position: absolute;
          inset: 12px;
          border-radius: 22px;
          pointer-events: none;
          background: linear-gradient(160deg, rgba(210,160,120,0.12), rgba(60,35,65,0.08));
          opacity: 0.7;
        }
        .landing-product {
          position: relative;
          aspect-ratio: 16 / 10;
          border-radius: 16px;
          overflow: hidden;
          background: radial-gradient(circle at 55% 40%, rgba(230,200,155,0.18), rgba(15,8,20,0.92));
          border: 1px solid rgba(210,160,120,0.28);
          box-shadow: inset 0 0 30px rgba(0,0,0,0.4);
        }
        .landing-product::before {
          content: "";
          position: absolute;
          inset: 24px;
          border-radius: 12px;
          border: 1px dashed rgba(210,160,120,0.35);
        }
        .landing-product::after {
          content: "Product realm placeholder";
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Old Charlotte', serif;
          letter-spacing: 0.06em;
          font-size: clamp(1rem, 1.8vw, 1.35rem);
          color: rgba(245,228,198,0.7);
          text-align: center;
          padding: 0 3rem;
        }
        .product-copy {
          position: relative;
          display: grid;
          gap: 1.2rem;
          align-content: center;
        }
        .product-copy h3 {
          font-family: 'Old Charlotte', serif;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: clamp(1.4rem, 2.6vw, 1.9rem);
        }
        .product-copy p {
          color: rgba(247,232,214,0.86);
          line-height: 1.8;
          font-size: clamp(0.98rem, 1.9vw, 1.15rem);
        }
        .product-copy ul {
          margin: 0;
          padding-left: 1.1rem;
          display: grid;
          gap: 0.4rem;
          color: rgba(244,225,194,0.8);
          font-size: clamp(0.95rem, 1.7vw, 1.1rem);
          list-style: square;
        }
        .landing-features-header {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 720px;
        }
        .landing-features-header h2 {
          font-family: 'Old Charlotte', serif;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: clamp(2rem, 4vw, 3rem);
        }
        .landing-features-grid {
          display: grid;
          gap: clamp(1.5rem, 4vw, 2.5rem);
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        }
        .landing-feature-card {
          position: relative;
          padding: clamp(1.4rem, 4vw, 2rem);
          border-radius: clamp(14px, 3vw, 22px);
          background: linear-gradient(160deg, rgba(20,12,24,0.85), rgba(9,6,14,0.9));
          border: 1px solid rgba(215,180,120,0.24);
          box-shadow: 0 18px 36px rgba(0,0,0,0.35);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
          overflow: hidden;
        }
        .landing-feature-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top, rgba(255,190,120,0.18) 0%, rgba(25,12,18,0) 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .landing-feature-card:hover {
          transform: translateY(-6px);
          border-color: rgba(235,210,150,0.45);
          box-shadow: 0 22px 48px rgba(0,0,0,0.45);
        }
        .landing-feature-card:hover::before {
          opacity: 1;
        }
        .landing-feature-card h3 {
          font-family: 'Old Charlotte', serif;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 1rem;
          font-size: clamp(1.2rem, 2.3vw, 1.6rem);
        }
        .landing-feature-card p {
          color: rgba(246,228,204,0.82);
          line-height: 1.75;
          font-size: clamp(0.95rem, 1.8vw, 1.1rem);
        }
        .tech-stack {
          position: relative;
          padding: clamp(3.5rem, 9vw, 6.5rem) clamp(1.5rem, 8vw, 6rem) clamp(4rem, 10vw, 6.5rem);
          display: grid;
          gap: clamp(2rem, 5vw, 3rem);
        }
        .tech-stack::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 20% 10%, rgba(138,72,34,0.35), rgba(10,6,12,0.95) 70%);
          pointer-events: none;
        }
        .tech-stack-header {
          position: relative;
          display: grid;
          gap: 1rem;
          max-width: 720px;
        }
        .tech-stack-header h2 {
          font-family: 'Old Charlotte', serif;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: clamp(1.9rem, 3.8vw, 2.8rem);
        }
        .tech-stack-header p {
          color: rgba(246,228,204,0.85);
          line-height: 1.8;
          font-size: clamp(1rem, 2vw, 1.2rem);
        }
        .tech-pillars {
          position: relative;
          display: grid;
          gap: clamp(1.4rem, 4vw, 2.2rem);
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        }
        .tech-card {
          position: relative;
          border-radius: clamp(14px, 3vw, 20px);
          padding: clamp(1.4rem, 4vw, 2rem);
          background: linear-gradient(150deg, rgba(24,16,30,0.88), rgba(12,8,18,0.94));
          border: 1px solid rgba(210,170,110,0.26);
          box-shadow: 0 18px 36px rgba(0,0,0,0.34);
        }
        .tech-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top, rgba(210,160,120,0.18), transparent 65%);
          opacity: 0.75;
        }
        .tech-card-content {
          position: relative;
          display: grid;
          gap: 0.8rem;
        }
        .tech-card h3 {
          font-family: 'Old Charlotte', serif;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: clamp(1.2rem, 2.4vw, 1.6rem);
        }
        .tech-card p {
          color: rgba(245,228,204,0.82);
          line-height: 1.75;
          font-size: clamp(0.96rem, 1.9vw, 1.12rem);
        }
        .integration-badges {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .integration-badge {
          border-radius: 999px;
          padding: 0.55rem 1.6rem;
          border: 1px solid rgba(215,180,120,0.32);
          background: rgba(18,12,26,0.8);
          font-family: 'Old Charlotte', serif;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(245,228,204,0.78);
          box-shadow: 0 10px 24px rgba(0,0,0,0.3);
        }
        .landing-lore {
          padding: clamp(3rem, 9vw, 6rem) clamp(1.5rem, 8vw, 6rem) clamp(5rem, 10vw, 7rem);
          display: grid;
          gap: clamp(2rem, 6vw, 3rem);
          position: relative;
        }
        .landing-lore::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(45,26,18,0.45) 0%, rgba(10,6,12,0.95) 70%);
          pointer-events: none;
        }
        .lore-panel {
          position: relative;
          border: 1px solid rgba(210,170,110,0.32);
          border-radius: clamp(18px, 4vw, 26px);
          padding: clamp(2rem, 6vw, 3rem);
          background: linear-gradient(160deg, rgba(18,12,24,0.88), rgba(12,9,16,0.92));
          box-shadow: 0 20px 48px rgba(0,0,0,0.4);
        }
        .lore-panel h3 {
          font-family: 'Old Charlotte', serif;
          font-size: clamp(1.8rem, 3.6vw, 2.6rem);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 1.4rem;
        }
        .lore-panel p {
          line-height: 1.9;
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: rgba(243,224,198,0.85);
        }
        .landing-footer {
          padding: clamp(2.5rem, 7vw, 4rem) clamp(1.5rem, 8vw, 5rem) clamp(4rem, 10vw, 6rem);
          text-align: center;
          border-top: 1px solid rgba(215,180,120,0.22);
        }
        .landing-footer p {
          font-family: 'Old Charlotte', serif;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: clamp(1.1rem, 2.2vw, 1.4rem);
          color: rgba(245,228,206,0.82);
        }
        @keyframes heroPulse {
          0% { opacity: 0.65; transform: rotate(16deg) scale(1); }
          50% { opacity: 0.9; transform: rotate(12deg) scale(1.12); }
          100% { opacity: 0.65; transform: rotate(16deg) scale(1); }
        }
        @keyframes parallaxDriftBack {
          from { transform: translate3d(-6%, 0, 0); }
          to { transform: translate3d(6%, 0, 0); }
        }
        @keyframes parallaxDriftMid {
          from { transform: translate3d(4%, 0, 0) scale(1.05); }
          to { transform: translate3d(-4%, 0, 0) scale(1.05); }
        }
        @keyframes parallaxDriftFront {
          from { transform: translate3d(-2%, 0, 0) scale(1.1); }
          to { transform: translate3d(2%, 0, 0) scale(1.1); }
        }
        @media (max-width: 768px) {
          .landing-hero-grid {
            grid-template-columns: 1fr;
          }
          .landing-logo-placeholder {
            width: clamp(120px, 40vw, 160px);
            height: clamp(120px, 40vw, 160px);
            justify-self: center;
          }
          .product-summary {
            grid-template-columns: 1fr;
          }
          .landing-product {
            order: 2;
          }
          .product-copy {
            order: 1;
          }
          .landing-parallax {
            margin: 0 1.25rem;
          }
          .integration-badges {
            justify-content: center;
          }
          .landing-feature-card {
            text-align: left;
          }
        }
      `}</style>

      <section className="landing-hero">
        <div className="landing-hero-grid">
          <div className="landing-logo-placeholder">DragonLog Sigil</div>
          <div className="landing-hero-content">
            <h1>DragonLog Keepeth Vigil Eternal</h1>
            <p>
              From the first ember of deployment to the last ash of failure, DragonLog guardeth every
              whisper. Enter the sanctum and witness telemetry wrought in obsidian, powered by open
              source flame.
            </p>
            <div className="landing-hero-actions">
              <a className="primary" href="#summon-vigil">Begin Thy Vigil</a>
              <a className="secondary" href="https://github.com/osmarbetancourt/DragonLog" target="_blank" rel="noreferrer">
                View the Codex
              </a>
            </div>
          </div>
        </div>
        <div className="product-summary">
          <div className="landing-product" aria-hidden="true"></div>
          <div className="product-copy">
            <h3>Future Vigilant Console</h3>
            <p>
              Here the command console unfurls—dashboards, rune-fed alerts, and shard inventories drawn
              beneath the dragon&apos;s wing. The frame awaiteth live glyphs, yet the promise is etched in
              embers.
            </p>
            <ul>
              <li>Summon service pulsars and tail rituals in a single obsidian pane.</li>
              <li>Bind deployments to autonomous sentries that scry Kafka and flame-forged streams.</li>
              <li>Carve integrations unto cloud bastions for swift redeploy and recovery.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="landing-parallax" aria-hidden="true">
        <div className="parallax-layer back"></div>
        <div className="parallax-layer mid"></div>
        <div className="parallax-layer front"></div>
        <div className="landing-parallax-overlay"></div>
      </section>

      <section className="landing-features" id="summon-vigil">
        <div className="landing-features-header">
          <h2>Arcane Faculties of the Dragon</h2>
          <p>
            These runes detail the arts bestowed upon those who keep the vigil: swift observance,
            relentless alerts, and infrastructures woven into a single lair.
          </p>
        </div>
        <div className="landing-features-grid">
          {FEATURES.map(feature => (
            <article className="landing-feature-card" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="tech-stack">
        <div className="tech-stack-header">
          <h2>Forge &amp; Conduits</h2>
          <p>
            DragonLog standeth upon a triad of grimoires: Next.js portals for the watchkeepers, Kafka
            ravens ferrying tidings, and Rust-bound daemons hammering resilience into every circuit.
          </p>
        </div>
        <div className="tech-pillars">
          {TECH_PILLARS.map(pillar => (
            <article className="tech-card" key={pillar.name}>
              <div className="tech-card-content">
                <h3>{pillar.name}</h3>
                <p>{pillar.lore}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="integration-badges" aria-label="Cloud integrations">
          {INTEGRATIONS.map(name => (
            <span className="integration-badge" key={name}>{name}</span>
          ))}
        </div>
      </section>

      <section className="landing-lore">
        <article className="lore-panel">
          <h3>The Chronicle of Flame</h3>
          <p>
            In the age of splintered services, when signals perished in shadow, DragonLog arose as the
            archivist of vigilance. Its claws sift logs from ruin, its breath illumines latency, and its
            heart forges oaths of observability. Enter this covenant and align thy deployments beneath
            the dragon’s gaze.
          </p>
        </article>
      </section>

      <footer className="landing-footer">
        <p>Forge thy observability. Let none log escape the dragon’s gaze.</p>
      </footer>
    </div>
  );
}
