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
          .landing-parallax {
            margin: 0 1.25rem;
          }
          .landing-feature-card {
            text-align: left;
          }
        }
      `}</style>

      <section className="landing-hero">
        <h1>DragonLog Keepeth Vigil Eternal</h1>
        <p>
          From the first ember of deployment to the last ash of failure, DragonLog guardeth every
          whisper. Enter the sanctum and witness telemetry wrought in obsidian, powered by open source
          flame.
        </p>
        <div className="landing-hero-actions">
          <a className="primary" href="#summon-vigil">Begin Thy Vigil</a>
          <a className="secondary" href="https://github.com/osmarbetancourt/DragonLog" target="_blank" rel="noreferrer">
            View the Codex
          </a>
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
