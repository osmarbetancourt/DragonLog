"use client";

import React, { useEffect } from "react";

type TransitionVeilProps = {
  onComplete: () => void;
};

export default function TransitionVeil({ onComplete }: TransitionVeilProps) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 2600);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="transition-veil" aria-hidden="true">
      <style>{`
        .transition-veil {
          position: fixed;
          inset: 0;
          z-index: 12;
          background: radial-gradient(circle at center, rgba(12,8,26,0.25) 0%, rgba(6,4,18,0.92) 60%, rgba(2,1,6,1) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          animation: veilFade 2.6s ease forwards;
        }
        .transition-tunnel {
          position: absolute;
          inset: -30%;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .transition-tunnel__rings {
          position: relative;
          width: 220vmax;
          height: 220vmax;
          border-radius: 50%;
          background: radial-gradient(circle at center,
            rgba(255, 236, 210, 0.42) 0%,
            rgba(255, 170, 120, 0.26) 12%,
            rgba(110, 70, 210, 0.12) 28%,
            rgba(10, 6, 30, 0) 40%
          );
          animation: tunnelCollapse 2.5s cubic-bezier(.45,0,.28,1) forwards;
          mix-blend-mode: screen;
        }
        .transition-tunnel__rings::after {
          content: "";
          position: absolute;
          inset: -12%;
          border-radius: 50%;
          background: repeating-radial-gradient(
            circle,
            rgba(255, 222, 180, 0.22) 0%,
            rgba(255, 222, 180, 0.22) 3%,
            rgba(15, 8, 28, 0) 7%
          );
          animation: tunnelCollapse 2.5s cubic-bezier(.45,0,.28,1) forwards;
          opacity: 0.6;
        }
        .transition-tunnel__sweep {
          position: absolute;
          width: 180vmax;
          height: 180vmax;
          border-radius: 50%;
          background: conic-gradient(from 90deg,
            rgba(255,220,180,0.0) 0%,
            rgba(255,220,180,0.35) 10%,
            rgba(90,150,255,0.25) 30%,
            rgba(255,220,180,0.0) 60%
          );
          opacity: 0.4;
          mix-blend-mode: screen;
          animation: tunnelSpin 2.1s linear infinite;
        }
        .transition-tunnel__particles {
          position: absolute;
          width: 120%;
          height: 120%;
          background: radial-gradient(ellipse at center,
            rgba(255,255,255,0.38) 0%,
            rgba(255,255,255,0.1) 14%,
            rgba(0,0,0,0) 35%);
          mask-image: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(0,0,0,0) 65%);
          animation: particleRush 1.8s ease-out infinite;
          opacity: 0.5;
        }
        .transition-sigil {
          font-family: 'Old Charlotte', serif;
          text-transform: none;
          letter-spacing: 0.12em;
          font-size: clamp(18px, 2.4vw, 42px);
          color: rgba(255,224,180,0.9);
          text-shadow: 0 0 18px rgba(255,210,140,0.55);
          animation: sigilRise 2.2s ease-out forwards;
        }
        @keyframes veilFade {
          0% { opacity: 0; }
          10% { opacity: 1; }
          70% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes tunnelCollapse {
          0% {
            transform: scale(1.05);
            opacity: 0.75;
          }
          60% {
            transform: scale(0.4);
            opacity: 0.9;
          }
          100% {
            transform: scale(0.05);
            opacity: 0;
          }
        }
        @keyframes tunnelSpin {
          0% { transform: rotate(0deg) scale(1); opacity: 0.45; }
          50% { opacity: 0.6; }
          100% { transform: rotate(360deg) scale(0.8); opacity: 0.45; }
        }
        @keyframes particleRush {
          0% {
            transform: scale(0.9);
            opacity: 0.55;
            filter: blur(0px);
          }
          70% {
            opacity: 0.75;
            filter: blur(3px);
          }
          100% {
            transform: scale(0.2);
            opacity: 0;
            filter: blur(6px);
          }
        }
        @keyframes sigilRise {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }
          35% {
            opacity: 1;
            transform: translateY(0);
          }
          70% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-18px);
          }
        }
      `}</style>
      <div className="transition-tunnel">
        <div className="transition-tunnel__rings"></div>
        <div className="transition-tunnel__sweep"></div>
        <div className="transition-tunnel__particles"></div>
      </div>
      <div className="transition-sigil">Thy Vigil Transcendeth</div>
    </div>
  );
}
