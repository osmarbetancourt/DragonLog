"use client";

import React, { useMemo } from "react";

const EMBER_COUNT = 42;

type AmbientPhase = "book" | "transition" | "landing";

type Ember = {
  left: string;
  delay: string;
  duration: string;
  size: string;
};

type AmbientEffectsProps = {
  phase: AmbientPhase;
};

export default function AmbientEffects({ phase }: AmbientEffectsProps) {
  const pseudoRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const embers = useMemo<Ember[]>(() => {
    return Array.from({ length: EMBER_COUNT }).map((_, index) => {
      const base = index + 1;
      const left = pseudoRandom(base * 3.17) * 100;
      const delay = pseudoRandom(base * 7.91) * 12;
      const duration = 12 + pseudoRandom(base * 11.41) * 14;
      const size = 4 + pseudoRandom(base * 17.83) * 6;
      return {
        left: `${left.toFixed(4)}%`,
        delay: `${delay.toFixed(2)}s`,
        duration: `${duration.toFixed(2)}s`,
        size: `${size.toFixed(1)}px`,
      };
    });
  }, []);

  return (
    <div
      className={`ambient-stage ambient-stage--${phase}`}
      aria-hidden="true"
    >
      <style>{`
        .ambient-stage {
          position: fixed;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
          background: radial-gradient(circle at top, rgba(10,8,20,0.85) 0%, rgba(4,3,8,0.95) 45%, #050308 100%);
        }
        .ambient-stage--landing {
          background: radial-gradient(circle at top, rgba(6,10,24,0.88) 0%, rgba(3,5,12,0.95) 45%, #040309 100%);
        }
        .ambient-stage--transition {
          background: radial-gradient(circle at 50% 40%, rgba(18,12,34,0.82) 0%, rgba(5,4,12,0.96) 65%, #040208 100%);
        }
        .ambient-haze {
          position: absolute;
          inset: -10%;
          background: radial-gradient(circle at 50% 80%, rgba(120, 90, 50, 0.18) 0%, rgba(40, 28, 24, 0.42) 38%, rgba(8, 5, 12, 0.88) 70%);
          mix-blend-mode: screen;
          opacity: 0.85;
          filter: blur(18px);
          animation: hazePulse 24s ease-in-out infinite;
        }
        .ambient-stage--book .ambient-haze {
          opacity: 1;
          filter: blur(24px);
        }
        .ambient-stage--landing .ambient-haze {
          opacity: 0.6;
        }
        .ambient-mist {
          position: absolute;
          inset: -20%;
          background: radial-gradient(circle, rgba(120,120,140,0.18) 0%, rgba(40,40,60,0.05) 45%, rgba(10,10,18,0) 70%);
          filter: blur(18px);
          animation: ambientDrift 38s ease-in-out infinite;
          mix-blend-mode: screen;
        }
        .ambient-stage--book .ambient-mist {
          animation-duration: 48s;
        }
        .ambient-mist::after,
        .ambient-mist::before {
          content: "";
          position: absolute;
          inset: -20%;
          background: radial-gradient(circle, rgba(140,90,60,0.12) 0%, rgba(50,30,20,0) 70%);
          filter: blur(22px);
          animation: ambientDriftAlt 42s ease-in-out infinite;
        }
        .ambient-mist::before {
          animation-duration: 56s;
          animation-delay: -12s;
        }
        .ember-field {
          position: absolute;
          inset: 0;
        }
        .ground-fog {
          position: absolute;
          bottom: -10%;
          left: -25%;
          right: -25%;
          height: 55%;
          background: radial-gradient(circle at 50% 90%, rgba(120,90,70,0.26) 0%, rgba(60,42,32,0.18) 45%, rgba(20,14,24,0) 75%);
          filter: blur(32px);
          opacity: 0;
          transform: translate3d(0, 10%, 0);
          animation: groundFogRise 12s ease-in-out infinite;
        }
        .ambient-stage--book .ground-fog {
          opacity: 1;
        }
        .ember {
          position: absolute;
          bottom: -10%;
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(255,180,90,0.95) 0%, rgba(255,90,0,0.65) 60%, rgba(0,0,0,0) 100%);
          box-shadow: 0 0 12px rgba(255,130,60,0.6), 0 0 22px rgba(255,200,120,0.35);
          opacity: 0;
          animation-name: emberRise;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes emberRise {
          0% {
            transform: translate3d(0, 0, 0) scale(0.6);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          70% {
            opacity: 0.8;
          }
          100% {
            transform: translate3d(-12px, -120vh, 0) scale(1.2);
            opacity: 0;
          }
        }
        @keyframes ambientDrift {
          0% {
            transform: translate3d(-4%, -2%, 0) scale(1.05);
          }
          50% {
            transform: translate3d(6%, 3%, 0) scale(1.08);
          }
          100% {
            transform: translate3d(-4%, -2%, 0) scale(1.05);
          }
        }
        @keyframes ambientDriftAlt {
          0% {
            transform: translate3d(3%, 4%, 0) scale(1.02);
          }
          50% {
            transform: translate3d(-5%, -6%, 0) scale(1.07);
          }
          100% {
            transform: translate3d(3%, 4%, 0) scale(1.02);
          }
        }
        @keyframes hazePulse {
          0% {
            opacity: 0.78;
            transform: scale(1);
          }
          45% {
            opacity: 0.96;
            transform: scale(1.04);
          }
          100% {
            opacity: 0.78;
            transform: scale(1);
          }
        }
        @keyframes groundFogRise {
          0% {
            opacity: 0.75;
            transform: translate3d(0, 8%, 0);
          }
          50% {
            opacity: 0.9;
            transform: translate3d(0, 3%, 0);
          }
          100% {
            opacity: 0.75;
            transform: translate3d(0, 8%, 0);
          }
        }
      `}</style>
      <div className="ambient-haze"></div>
      <div className="ambient-mist"></div>
      {phase === "book" ? <div className="ground-fog"></div> : null}
      <div className="ember-field">
        {embers.map((ember, index) => (
          <span
            className="ember"
            key={index}
            style={{
              left: ember.left,
              animationDelay: ember.delay,
              animationDuration: ember.duration,
              width: ember.size,
              height: ember.size,
            }}
          ></span>
        ))}
      </div>
    </div>
  );
}
