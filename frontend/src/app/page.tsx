"use client";
import React, { useState } from "react";
import AmbientEffects from "./components/AmbientEffects";
import BookPortal from "./components/BookPortal";
import LandingShowcase from "./components/LandingShowcase";
import TransitionVeil from "./components/TransitionVeil";

type ExperiencePhase = "book" | "transition" | "landing";

export default function Page() {
  const [phase, setPhase] = useState<ExperiencePhase>("book");
  const showDebugControls = true;

  return (
    <main className="experience-shell">
      <style>{`
        .experience-shell {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: stretch;
          overflow: hidden;
          background: transparent;
          color: #f5e4ce;
        }
        .experience-layer {
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2rem);
        }
        .experience-layer::before {
          content: none;
        }
        .experience-layer--landing::before {
          content: "";
          position: absolute;
          inset: clamp(0.75rem, 2.5vw, 2.75rem);
          border-radius: clamp(36px, 8vw, 72px);
          background: radial-gradient(
            circle at 50% 30%,
            rgba(90, 120, 180, 0.12) 0%,
            rgba(40, 52, 98, 0.18) 35%,
            rgba(8, 12, 26, 0.85) 100%
          );
          box-shadow: 0 0 80px rgba(120, 160, 255, 0.12);
          pointer-events: none;
          z-index: -1;
        }
        .debug-controls {
          position: fixed;
          top: 1rem;
          right: 1rem;
          z-index: 20;
          display: flex;
          gap: 0.5rem;
        }
        .debug-controls button {
          background: rgba(20, 24, 42, 0.85);
          border: 1px solid rgba(255, 210, 140, 0.35);
          color: #f7eee0;
          padding: 0.45rem 0.9rem;
          border-radius: 999px;
          font-size: 0.8rem;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .debug-controls button:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 16px rgba(255, 190, 120, 0.25);
        }
      `}</style>
      {showDebugControls ? (
        <div className="debug-controls">
          <button type="button" onClick={() => setPhase("book")}>
            Book Phase
          </button>
          <button type="button" onClick={() => setPhase("transition")}>
            Trigger Portal
          </button>
          <button type="button" onClick={() => setPhase("landing")}>
            Show Landing
          </button>
        </div>
      ) : null}
    <AmbientEffects phase={phase} />
      <div
        className={`experience-layer${
          phase === "book" ? " experience-layer--book" : ""
        }${phase === "landing" ? " experience-layer--landing" : ""}`}
      >
        {phase === "book" ? (
          <BookPortal onAscend={() => setPhase("transition")} />
        ) : phase === "landing" ? (
          <LandingShowcase />
        ) : null}
      </div>
      {phase === "transition" ? (
        <TransitionVeil onComplete={() => setPhase("landing")} />
      ) : null}
    </main>
  );
}
