"use client";

import React, { CSSProperties, useEffect, useRef } from "react";

import AmbientAudioToggle from "./AmbientAudioToggle";
import RuneDecodeText from "./RuneDecodeText";

const FEATURES = [
  {
    title: "Vigil Unbroken",
    description: "Real-time log sentries sweep thy realm, binding rogue signals before discord taketh hold.",
    sigil: "V1",
    lore: "Ashen sentinels sweep each shard every nine breaths, never blinking, never tiring.",
  },
  {
    title: "Dragon’s Insight",
    description: "Ancestral charts, heat-laden metrics, and rune-scribed alerts reveal peril long ere it strikes.",
    sigil: "D2",
    lore: "Ember scryers bind omen threads so thy metrics kindle before calamity.",
  },
  {
    title: "Sanctum of Control",
    description: "Gather microservice scrolls, pipeline epics, and shard whispers under one vigilant gaze.",
    sigil: "S3",
    lore: "Gate-keeps braid a thousand scrolls into one command dais awaiting thy decree.",
  },
  {
    title: "Open Flame",
    description: "Forge new integrations with open source embers; extend the lair with spells of thine own making.",
    sigil: "F4",
    lore: "Forge-fellows leave the brazier open, welcoming each craftsman bearing new runes.",
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

const CTA_PANELS = [
  {
    title: "Kindle Thy Vigil",
    description: "Unlock guided rites to weave DragonLog into thy observatory keep and breathe flame into first telemetry.",
    action: "Summon the Guide",
    href: "#summon-vigil",
    image: "/images/portal.png",
  },
  {
    title: "Unseal the Codex",
    description: "Walk the ramparts of the open source hoard, claim issues, and draft runes for the legion of keepers.",
    action: "Enter the Gitkeep",
    href: "https://github.com/osmarbetancourt/DragonLog",
    image: "/images/ruined_castle.png",
  },
];

type CSSVariables = CSSProperties & Record<`--journey-${string}`, string>;
type RevealVariables = CSSProperties & {
  "--reveal-translate"?: string;
  "--reveal-scale"?: string;
};
type CTARevealVariables = RevealVariables & {
  "--cta-delay"?: string;
};

const JOURNEY_PARTICLES = [
  { top: "12%", left: "18%", duration: "26s", delay: "0s", scale: "1" },
  { top: "38%", left: "8%", duration: "22s", delay: "-4s", scale: "0.9" },
  { top: "68%", left: "16%", duration: "24s", delay: "-8s", scale: "1.1" },
  { top: "22%", left: "42%", duration: "28s", delay: "-2s", scale: "1.1" },
  { top: "58%", left: "44%", duration: "24s", delay: "-11s", scale: "0.85" },
  { top: "78%", left: "38%", duration: "30s", delay: "-6s", scale: "1.2" },
  { top: "18%", left: "68%", duration: "25s", delay: "-9s", scale: "0.95" },
  { top: "48%", left: "72%", duration: "29s", delay: "-14s", scale: "1.05" },
  { top: "74%", left: "66%", duration: "27s", delay: "-5s", scale: "0.9" },
  { top: "32%", left: "86%", duration: "24s", delay: "-7s", scale: "1.15" },
  { top: "62%", left: "88%", duration: "32s", delay: "-12s", scale: "1.05" },
  { top: "82%", left: "80%", duration: "26s", delay: "-16s", scale: "0.95" },
];

export default function LandingShowcase() {
  const journeyBannerRef = useRef<HTMLDivElement | null>(null);
  const journeyCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const animatedElements = document.querySelectorAll<HTMLElement>("[data-scroll-reveal]");
    animatedElements.forEach(el => el.classList.add("scroll-reveal"));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const banner = journeyBannerRef.current;
    const canvas = journeyCanvasRef.current;
    if (!banner || !canvas) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      fade: number;
      seed: number;
    };

  let particles: Particle[] = [];
  let width = 0;
  let height = 0;
  let pixelRatio = 1;
    let animationFrame: number | null = null;

    const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

    const configureCanvas = () => {
      const rect = banner.getBoundingClientRect();
  width = rect.width;
  height = rect.height;
  pixelRatio = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(width * pixelRatio));
  canvas.height = Math.max(1, Math.floor(height * pixelRatio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const area = Math.max(width * height, 1);
      const targetCount = Math.min(80, Math.max(18, Math.floor(area / 20000)));
      particles = Array.from({ length: targetCount }, () => ({
        x: randomBetween(0, width),
        y: randomBetween(0, height),
        vx: randomBetween(-0.04, 0.04),
        vy: randomBetween(-0.22, -0.08),
        radius: randomBetween(0.6, 1.6),
        alpha: randomBetween(0.16, 0.28),
        fade: randomBetween(0.0008, 0.0022),
        seed: Math.random() * 1000,
      }));
    };

    const resetParticle = (particle: Particle, anchorY: number) => {
      particle.x = randomBetween(0, width);
      particle.y = anchorY + randomBetween(0, height * 0.1);
      particle.vx = randomBetween(-0.05, 0.05);
      particle.vy = randomBetween(-0.24, -0.08);
      particle.radius = randomBetween(0.65, 1.8);
      particle.alpha = randomBetween(0.18, 0.32);
      particle.fade = randomBetween(0.0012, 0.0026);
      particle.seed = Math.random() * 1000;
    };

    const clear = () => {
      context.save();
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.restore();
    };

    const draw = (time: number) => {
      clear();
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.globalCompositeOperation = "lighter";

      particles.forEach(particle => {
        const sway = Math.sin((time * 0.0004 + particle.seed) % (Math.PI * 2)) * 0.22;
        particle.x += particle.vx + sway;
        particle.y += particle.vy;
        particle.alpha -= particle.fade;

        if (particle.alpha <= 0 || particle.y < -20) {
          resetParticle(particle, height * 0.85);
        }

        context.globalAlpha = Math.max(particle.alpha, 0);
        const gradient = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.radius * 4);
        gradient.addColorStop(0, "rgba(255, 206, 150, 0.55)");
        gradient.addColorStop(0.6, "rgba(255, 148, 90, 0.18)");
        gradient.addColorStop(1, "rgba(20, 8, 12, 0)");
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius * 4, 0, Math.PI * 2);
        context.fill();
      });

      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";
    };

    const step = (time: number) => {
      draw(time);
      animationFrame = window.requestAnimationFrame(step);
    };

    const stop = () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
    };

    const start = () => {
      if (mediaQuery.matches || animationFrame !== null) {
        return;
      }
      animationFrame = window.requestAnimationFrame(step);
    };

    configureCanvas();
    if (!mediaQuery.matches) {
      start();
    } else {
      clear();
    }

    const handleResize = () => {
      stop();
      configureCanvas();
      clear();
      start();
    };

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(banner);
    } else {
      window.addEventListener("resize", handleResize);
    }

    const handleMotionChange = () => {
      if (mediaQuery.matches) {
        stop();
        clear();
      } else {
        handleResize();
      }
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      stop();
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", handleResize);
      }
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <div className="landing-canvas">
      <style>{`
        .landing-canvas {
          position: relative;
          width: 100%;
          min-height: 100vh;
          color: #f7e8d6;
          background: linear-gradient(180deg, rgba(8,6,14,0.95) 0%, rgba(12,9,18,0.94) 45%, rgba(6,4,10,1) 100%);
          overflow: hidden;
        }
        .scroll-reveal {
          opacity: 0;
          transform: translate3d(0, var(--reveal-translate, 32px), 0) scale(var(--reveal-scale, 0.98));
          transition: opacity 0.8s ease, transform 0.8s ease;
          will-change: opacity, transform;
        }
        .reveal-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
        }
        .reveal-delay-1 {
          transition-delay: 0.15s;
        }
        .reveal-delay-2 {
          transition-delay: 0.3s;
        }
        .reveal-delay-3 {
          transition-delay: 0.45s;
        }
        .reveal-delay-4 {
          transition-delay: 0.6s;
        }
        .landing-hero {
          position: relative;
          padding: clamp(4rem, 12vw, 8rem) clamp(1.5rem, 9vw, 6rem) clamp(3rem, 10vw, 7rem);
          display: grid;
          gap: clamp(2.5rem, 6vw, 4rem);
          overflow: hidden;
          max-width: 1180px;
          margin: 0 auto;
        }
        .landing-hero-grid {
          position: relative;
          display: grid;
          grid-template-columns: minmax(120px, 200px) minmax(0, 1fr);
          gap: clamp(1.75rem, 4vw, 3rem);
          align-items: start;
        }
        .landing-hero-content {
          position: relative;
          display: grid;
          gap: clamp(1.4rem, 4vw, 2rem);
        }
        .rune-decode {
          display: inline-block;
          letter-spacing: inherit;
        }
        .landing-logo-placeholder {
          position: relative;
          width: clamp(140px, 22vw, 220px);
          height: clamp(140px, 22vw, 220px);
          border-radius: 28px;
          border: 1px solid rgba(215,180,120,0.32);
          box-shadow: 0 22px 38px rgba(0,0,0,0.44);
          background-image:
            radial-gradient(circle at 24% 18%, rgba(255,176,102,0.18), rgba(28,10,12,0) 60%),
            linear-gradient(165deg, rgba(24,10,22,0.82), rgba(10,6,14,0.95)),
            url('/images/DragonLog_Logo_WBG.svg');
          background-repeat: no-repeat;
          background-position: center;
          background-size: 78% auto;
          overflow: hidden;
        }
        .landing-logo-placeholder::after {
          content: "";
          position: absolute;
          inset: 12%;
          border-radius: 24px;
          border: 1px solid rgba(255,210,150,0.12);
          pointer-events: none;
        }
        .landing-logo-placeholder .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
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
          line-height: clamp(1.15, 3vw, 1.28);
          margin: 0;
        }
        .landing-hero p {
          position: relative;
          max-width: 720px;
          font-size: clamp(1.05rem, 2vw, 1.35rem);
          line-height: 1.8;
          color: rgba(247,232,214,0.86);
          margin: 0;
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
          position: relative;
          overflow: hidden;
          min-width: 200px;
        }
        .landing-hero-actions a > span {
          display: inline-block;
          width: 100%;
        }
        .landing-hero-actions a.primary {
          background: linear-gradient(135deg, rgba(225,178,104,0.9), rgba(155,82,24,0.85));
          color: #1a0a02;
          box-shadow: 0 12px 24px rgba(255,170,80,0.25);
          isolation: isolate;
        }
        .landing-hero-actions a.primary::after {
          content: "";
          position: absolute;
          inset: -40% -120%;
          background: linear-gradient(120deg, rgba(255, 238, 210, 0) 0%, rgba(255, 238, 210, 0.5) 48%, rgba(255, 238, 210, 0) 100%);
          transform: translate3d(-60%, 0, 0) skewX(-18deg);
          animation: ctaGlint 5.6s ease-in-out infinite;
          mix-blend-mode: screen;
        }
        .landing-hero-actions a.primary:focus-visible::after,
        .landing-hero-actions a.primary:hover::after {
          animation-duration: 2.6s;
        }
        .landing-hero-actions a.primary:focus-visible {
          outline: 2px solid rgba(255, 226, 180, 0.85);
          outline-offset: 3px;
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
          aspect-ratio: 17 / 15;
          min-height: clamp(360px, 42vw, 760px);
          margin: 0 clamp(1.5rem, 8vw, 6rem);
          border-radius: clamp(16px, 4vw, 32px);
          border: 1px solid rgba(215,180,120,0.32);
          background: linear-gradient(180deg, rgba(18,12,24,0.95) 0%, rgba(8,4,12,0.85) 100%);
          box-shadow: 0 18px 48px rgba(0,0,0,0.45);
        }
        .journey-banner {
          position: relative;
          margin: clamp(3rem, 9vw, 5.5rem) clamp(1.5rem, 8vw, 6rem);
          border-radius: clamp(18px, 4vw, 28px);
          overflow: hidden;
          aspect-ratio: 1 / 1;
          min-height: clamp(480px, 60vw, 960px);
          border: 1px solid rgba(215,180,120,0.32);
          box-shadow: 0 22px 48px rgba(0,0,0,0.45);
        }
        .journey-banner::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url('/images/dragon_log_walking.png');
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          filter: saturate(1.05) contrast(1.05);
          animation: journeyParallax 28s ease-in-out infinite alternate;
          z-index: -2;
        }
        .journey-banner::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(8,4,12,0.3) 0%, rgba(8,4,12,0.82) 100%);
          z-index: -1;
        }
        .journey-fog {
          position: absolute;
          inset: 0;
          pointer-events: none;
          mix-blend-mode: screen;
          opacity: 0.65;
          filter: saturate(0.85);
          z-index: 1;
        }
        .journey-fog canvas {
          width: 100%;
          height: 100%;
          display: block;
        }
        .journey-particle {
          position: absolute;
          width: clamp(8px, 1vw, 12px);
          height: clamp(8px, 1vw, 12px);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,206,146,0.7), rgba(255,112,64,0.2) 70%, transparent);
          box-shadow: 0 0 12px rgba(255,176,106,0.6);
          animation: emberFloat var(--journey-duration) linear var(--journey-delay) infinite;
          opacity: 0.82;
          transform: scale(var(--journey-scale));
        }
        .journey-banner:hover .journey-particle {
          animation-duration: calc(var(--journey-duration) * 0.85);
        }
        .journey-banner-content {
          position: relative;
          z-index: 3;
          height: 100%;
          display: grid;
          align-items: end;
          padding: clamp(3rem, 10vw, 5rem);
          gap: 1.5rem;
        }
        .journey-banner h3 {
          font-family: 'Old Charlotte', serif;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          margin: 0;
        }
        .journey-banner p {
          max-width: 580px;
          line-height: 1.8;
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: rgba(245,228,204,0.88);
          margin: 0;
        }
        .journey-banner a {
          justify-self: start;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.65rem 1.8rem;
          border-radius: 999px;
          font-family: 'Old Charlotte', serif;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: clamp(0.95rem, 1.8vw, 1.1rem);
          color: rgba(25,12,6,0.92);
          background: linear-gradient(135deg, rgba(225,178,104,0.9), rgba(140,74,26,0.85));
          text-decoration: none;
          box-shadow: 0 12px 26px rgba(255,190,120,0.28);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .journey-banner a:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 32px rgba(255,196,130,0.35);
        }
        .parallax-layer {
          position: absolute;
          inset: 0;
          background-size: 100% 100%;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.6;
          transform: translateZ(0);
        }
        .journey-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 2;
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
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          gap: clamp(1.5rem, 5vw, 3rem);
          padding: clamp(1.75rem, 5vw, 3rem);
          border-radius: 28px;
          background:
            linear-gradient(145deg, rgba(34,20,40,0.95), rgba(18,12,28,0.92)) padding-box,
            linear-gradient(155deg, rgba(210,160,120,0.35), rgba(95,70,110,0.25)) border-box;
          border: 1px solid transparent;
          box-shadow: 0 22px 44px rgba(0,0,0,0.36);
          overflow: hidden;
          max-width: 1180px;
          margin: 0 auto;
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
          list-style-position: outside;
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
        .feature-rune-badge {
          position: absolute;
          top: 1.15rem;
          right: 1.15rem;
          width: clamp(46px, 4.4vw, 58px);
          aspect-ratio: 1 / 1;
          border-radius: 50%;
          border: 1px solid rgba(232,198,148,0.38);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle, rgba(255,198,132,0.38) 0%, rgba(90,38,14,0.08) 68%, rgba(18,8,10,0.94) 100%);
          box-shadow: 0 12px 26px rgba(0,0,0,0.42), 0 0 14px rgba(255,190,120,0.3);
          animation: runePulse 6.2s ease-in-out infinite;
          pointer-events: none;
        }
        .feature-rune-badge span {
          font-family: 'Old Charlotte', serif;
          letter-spacing: 0.16em;
          font-size: clamp(0.72rem, 1.4vw, 0.95rem);
          color: rgba(255,226,186,0.88);
        }
        .feature-lore {
          margin-top: 1.1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(215,180,120,0.22);
          color: rgba(244,226,198,0.7);
          font-size: clamp(0.85rem, 1.6vw, 1rem);
          font-style: italic;
          line-height: 1.6;
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
        .cta-gallery {
          position: relative;
          padding: clamp(3.5rem, 9vw, 5.5rem) clamp(1.5rem, 8vw, 6rem) clamp(4.5rem, 10vw, 6.5rem);
          display: grid;
          gap: clamp(1.8rem, 5vw, 2.5rem);
        }
        .cta-gallery::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 65% 28%, rgba(255,190,120,0.16) 0%, rgba(22,12,30,0.92) 70%);
          pointer-events: none;
        }
        .cta-gallery-grid {
          position: relative;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: clamp(1.5rem, 4vw, 2.3rem);
          max-width: 1180px;
          margin: 0 auto;
        }
        .cta-card {
          position: relative;
          border-radius: clamp(18px, 4vw, 26px);
          overflow: hidden;
          min-height: clamp(320px, 36vw, 420px);
          padding: clamp(2.2rem, 6vw, 3rem);
          background-color: rgba(16,10,22,0.95);
          background-size: cover;
          background-position: center;
          box-shadow: 0 24px 48px rgba(0,0,0,0.42);
          border: 1px solid rgba(210,170,110,0.28);
          transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
          display: grid;
          align-content: end;
        }
        .cta-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(8,4,12,0.05) 0%, rgba(8,4,12,0.78) 75%, rgba(8,4,12,0.92) 100%);
          pointer-events: none;
          z-index: 1;
          animation: ctaEmberPulse 9s ease-in-out infinite;
        }
        .cta-card::after {
          content: "";
          position: absolute;
          inset: 12px;
          border-radius: clamp(16px, 3.5vw, 22px);
          border: 1px solid rgba(245,210,160,0.18);
          mix-blend-mode: screen;
          opacity: 0.65;
          pointer-events: none;
          z-index: 1;
        }
        .cta-card:hover {
          transform: translateY(-8px);
          border-color: rgba(235,206,150,0.45);
          box-shadow: 0 28px 64px rgba(0,0,0,0.5);
        }
        .cta-card-content {
          position: relative;
          z-index: 2;
          display: grid;
          gap: 1rem;
        }
        .cta-card h3 {
          font-family: 'Old Charlotte', serif;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          margin: 0;
        }
        .cta-card p {
          color: rgba(245,228,204,0.85);
          line-height: 1.75;
          font-size: clamp(1rem, 2vw, 1.18rem);
          margin: 0;
        }
        .cta-card a {
          justify-self: start;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.7rem 2.1rem;
          border-radius: 999px;
          font-family: 'Old Charlotte', serif;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: clamp(0.92rem, 1.7vw, 1.08rem);
          color: rgba(22,10,6,0.92);
          background: linear-gradient(135deg, rgba(230,188,132,0.92), rgba(162,84,30,0.9));
          text-decoration: none;
          box-shadow: 0 14px 32px rgba(255,195,130,0.32);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          min-width: 200px;
        }
        .cta-card a:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px rgba(255,210,150,0.35);
        }
        .lore-panel {
          position: relative;
          border: 1px solid rgba(210,170,110,0.32);
          border-radius: clamp(18px, 4vw, 26px);
          padding: clamp(2rem, 6vw, 3rem);
          background: linear-gradient(160deg, rgba(18,12,24,0.88), rgba(12,9,16,0.92));
          box-shadow: 0 20px 48px rgba(0,0,0,0.4);
          overflow: hidden;
          clip-path: inset(45% 0 45% 0);
          transition: clip-path 1.1s ease-in-out;
        }
        .lore-panel::before,
        .lore-panel::after {
          content: "";
          position: absolute;
          left: 0;
          width: 100%;
          height: 24px;
          background: linear-gradient(180deg, rgba(255,216,156,0.18) 0%, rgba(34,20,30,0) 100%);
          opacity: 0.35;
          pointer-events: none;
        }
        .lore-panel::before {
          top: 0;
        }
        .lore-panel::after {
          bottom: 0;
          transform: scaleY(-1);
        }
        .lore-panel.reveal-visible {
          clip-path: inset(0 0 0 0);
        }
        .lore-panel.reveal-visible::before,
        .lore-panel.reveal-visible::after {
          animation: parchmentGlow 4.4s ease-in-out forwards;
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
          display: grid;
          gap: 1.2rem;
          justify-items: center;
        }
        .landing-footer p {
          font-family: 'Old Charlotte', serif;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: clamp(1.1rem, 2.2vw, 1.4rem);
          color: rgba(245,228,206,0.82);
        }
        .ambient-audio-toggle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.7rem 2.4rem;
          border-radius: 999px;
          border: 1px solid rgba(220,182,138,0.42);
          background: linear-gradient(135deg, rgba(20,14,28,0.85), rgba(12,8,18,0.92));
          color: rgba(245,228,204,0.86);
          font-family: 'Old Charlotte', serif;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 12px 28px rgba(0,0,0,0.35);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
        }
        .ambient-audio-toggle:hover,
        .ambient-audio-toggle:focus-visible {
          transform: translateY(-2px);
          box-shadow: 0 16px 32px rgba(0,0,0,0.4);
          border-color: rgba(236,206,156,0.6);
          outline: none;
        }
        .ambient-audio-toggle--active {
          background: linear-gradient(135deg, rgba(228,180,118,0.85), rgba(150,78,28,0.82));
          color: rgba(24,12,6,0.92);
          box-shadow: 0 18px 40px rgba(255,198,130,0.35);
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
        @keyframes journeyParallax {
          from { transform: translate3d(-2%, -2%, 0); }
          to { transform: translate3d(2%, 3%, 0); }
        }
        @keyframes emberFloat {
          0% { transform: translate3d(0, 0, 0) scale(var(--journey-scale)); opacity: 0.2; }
          10% { opacity: 0.85; }
          50% { transform: translate3d(2%, -18%, 0) scale(calc(var(--journey-scale) * 1.05)); opacity: 0.9; }
          100% { transform: translate3d(-3%, -36%, 0) scale(calc(var(--journey-scale) * 0.9)); opacity: 0; }
        }
        @keyframes ctaGlint {
          0%, 65% { transform: translate3d(-60%, 0, 0) skewX(-18deg); opacity: 0; }
          70% { opacity: 0.9; }
          78% { transform: translate3d(120%, 0, 0) skewX(-18deg); opacity: 0; }
          100% { transform: translate3d(120%, 0, 0) skewX(-18deg); opacity: 0; }
        }
        @keyframes ctaEmberPulse {
          0% { opacity: 0.18; transform: scale(1); }
          40% { opacity: 0.35; transform: scale(1.05); }
          70% { opacity: 0.2; transform: scale(1.02); }
          100% { opacity: 0.18; transform: scale(1); }
        }
        @keyframes runePulse {
          0% { box-shadow: 0 12px 26px rgba(0,0,0,0.4), 0 0 12px rgba(255,188,120,0.28); }
          50% { box-shadow: 0 14px 32px rgba(0,0,0,0.45), 0 0 18px rgba(255,216,156,0.45); }
          100% { box-shadow: 0 12px 26px rgba(0,0,0,0.4), 0 0 12px rgba(255,188,120,0.28); }
        }
        @keyframes parchmentGlow {
          0% { opacity: 0.06; }
          40% { opacity: 0.38; }
          100% { opacity: 0.22; }
        }
        @media (max-width: 768px) {
          .landing-hero {
            padding: clamp(3.2rem, 12vw, 4.5rem) 1.5rem clamp(2.6rem, 12vw, 4.2rem);
            text-align: center;
          }
          .landing-hero-grid {
            grid-template-columns: 1fr;
            justify-items: center;
            gap: clamp(1.5rem, 6vw, 2.4rem);
          }
          .landing-logo-placeholder {
            width: clamp(120px, 40vw, 160px);
            height: clamp(120px, 40vw, 160px);
            justify-self: center;
          }
          .landing-hero-content {
            justify-items: center;
          }
          .landing-hero h1 {
            letter-spacing: 0.08em;
          }
          .landing-hero-actions {
            justify-content: center;
          }
          .landing-hero-actions a {
            width: 100%;
            max-width: 280px;
            justify-content: center;
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
            aspect-ratio: 4 / 5;
            min-height: clamp(300px, 82vw, 420px);
          }
          .journey-banner {
            margin: clamp(2.5rem, 14vw, 3.5rem) 1.25rem;
            aspect-ratio: auto;
            min-height: clamp(240px, 90vw, 360px);
          }
          .journey-banner-content {
            align-items: center;
            text-align: center;
          }
          .journey-banner::before {
            background-size: cover;
            background-position: center 58%;
          }
          .journey-banner a {
            justify-self: center;
          }
          .integration-badges {
            justify-content: center;
          }
          .cta-gallery {
            padding: clamp(2.8rem, 12vw, 4rem) 1.5rem clamp(3.2rem, 12vw, 4.5rem);
          }
          .cta-gallery-grid {
            grid-template-columns: 1fr;
          }
          .cta-card {
            min-height: clamp(260px, 88vw, 360px);
            justify-items: center;
            text-align: center;
          }
          .feature-rune-badge {
            position: static;
            margin: 0 auto 0.75rem;
          }
          .feature-lore {
            margin-top: 0.85rem;
            padding-top: 0.75rem;
            text-align: center;
          }
          .cta-card a {
            justify-self: center;
          }
        }
        @media (max-width: 520px) {
          .landing-hero h1 {
            font-size: clamp(2.4rem, 10vw, 2.8rem);
          }
          .landing-hero p {
            font-size: 1rem;
          }
          .journey-banner h3 {
            font-size: clamp(1.6rem, 7vw, 2rem);
          }
          .journey-banner p {
            font-size: 0.98rem;
          }
          .cta-card h3 {
            font-size: clamp(1.4rem, 6.5vw, 1.8rem);
          }
          .cta-card p {
            font-size: 0.98rem;
          }
        }
        @media (min-width: 1200px) {
          .landing-parallax {
            min-height: clamp(480px, 38vw, 840px);
          }
          .journey-banner {
            min-height: clamp(560px, 42vw, 960px);
          }
        }
        @media (min-width: 1600px) {
          .landing-parallax {
            min-height: clamp(580px, 34vw, 980px);
          }
          .journey-banner {
            min-height: clamp(640px, 36vw, 1100px);
          }
        }
      `}</style>

      <section className="landing-hero" data-scroll-reveal>
        <div className="landing-hero-grid">
          <div className="landing-logo-placeholder" role="img" aria-label="DragonLog Sigil">
            <span className="sr-only">DragonLog Sigil</span>
          </div>
          <div className="landing-hero-content">
            <h1>
              <RuneDecodeText text="DragonLog Keepeth Vigil Eternal" className="rune-decode" />
            </h1>
            <p>
              From the first ember of deployment to the last ash of failure, DragonLog guardeth every
              whisper. Enter the sanctum and witness telemetry wrought in obsidian, powered by open
              source flame.
            </p>
            <div className="landing-hero-actions">
              <a className="primary" href="#summon-vigil" data-rune-reactive="true">
                <RuneDecodeText
                  text="Begin Thy Vigil"
                  className="rune-decode"
                  duration={900}
                  revealDelay={260}
                />
              </a>
              <a
                className="secondary"
                href="https://github.com/osmarbetancourt/DragonLog"
                target="_blank"
                rel="noreferrer"
                data-rune-reactive="true"
              >
                <RuneDecodeText
                  text="View the Codex"
                  className="rune-decode"
                  duration={900}
                  revealDelay={320}
                />
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

      <section className="landing-parallax scroll-reveal reveal-delay-1" aria-hidden="true" data-scroll-reveal>
        <div className="parallax-layer back"></div>
        <div className="parallax-layer mid"></div>
        <div className="parallax-layer front"></div>
        <div className="landing-parallax-overlay"></div>
      </section>

      <section
        className="journey-banner scroll-reveal reveal-delay-2"
        data-scroll-reveal
        ref={journeyBannerRef}
      >
        <div className="journey-banner-content">
          <h3>Step Through the Ruined Causeway</h3>
          <p>
            The portal delivereth thee unto a blasted approach where the dragon&apos;s keep looms. Let this
            vision be the omen of dashboards yet to breathe—summon the journey and vow the vigil.
          </p>
          <a href="#summon-vigil" data-rune-reactive="true">Witness the Vigil</a>
        </div>
        <div className="journey-fog" aria-hidden="true">
          <canvas ref={journeyCanvasRef} />
        </div>
        <div className="journey-particles" aria-hidden="true">
          {JOURNEY_PARTICLES.map((particle, index) => (
            <span
              key={`journey-particle-${index}`}
              className="journey-particle"
              style={{
                top: particle.top,
                left: particle.left,
                // Inline custom properties typed via CSSVariables interface below.
                ...({
                  "--journey-duration": particle.duration,
                  "--journey-delay": particle.delay,
                  "--journey-scale": particle.scale,
                } as CSSVariables),
              }}
            />
          ))}
        </div>
      </section>

      <section className="landing-features" id="summon-vigil" data-scroll-reveal>
        <div className="landing-features-header">
          <h2>Arcane Faculties of the Dragon</h2>
          <p>
            These runes detail the arts bestowed upon those who keep the vigil: swift observance,
            relentless alerts, and infrastructures woven into a single lair.
          </p>
        </div>
        <div className="landing-features-grid">
          {FEATURES.map((feature, index) => (
            <article
              className="landing-feature-card scroll-reveal"
              data-scroll-reveal
              key={feature.title}
              style={
                {
                  transitionDelay: `${0.12 * index}s`,
                  "--reveal-translate": `${28 + (index % 2) * 8}px`,
                  "--reveal-scale": "0.97",
                } as RevealVariables
              }
            >
              <div className="feature-rune-badge" aria-hidden="true">
                <span>{feature.sigil}</span>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <p className="feature-lore">{feature.lore}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="tech-stack" data-scroll-reveal>
        <div className="tech-stack-header">
          <h2>Forge &amp; Conduits</h2>
          <p>
            DragonLog standeth upon a triad of grimoires: Next.js portals for the watchkeepers, Kafka
            ravens ferrying tidings, and Rust-bound daemons hammering resilience into every circuit.
          </p>
        </div>
        <div className="tech-pillars">
          {TECH_PILLARS.map((pillar, index) => (
            <article
              className="tech-card scroll-reveal"
              data-scroll-reveal
              key={pillar.name}
              style={
                {
                  transitionDelay: `${0.15 * index + 0.1}s`,
                  "--reveal-translate": `${34 - index * 6}px`,
                  "--reveal-scale": "0.975",
                } as RevealVariables
              }
            >
              <div className="tech-card-content">
                <h3>{pillar.name}</h3>
                <p>{pillar.lore}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="integration-badges" aria-label="Cloud integrations">
          {INTEGRATIONS.map((name, index) => (
            <span
              className="integration-badge scroll-reveal"
              data-scroll-reveal
              key={name}
              style={
                {
                  transitionDelay: `${0.14 * index + 0.3}s`,
                  "--reveal-translate": `${20 + index * 6}px`,
                } as RevealVariables
              }
            >
              {name}
            </span>
          ))}
        </div>
      </section>

      <section className="cta-gallery scroll-reveal reveal-delay-3" data-scroll-reveal>
        <div className="cta-gallery-grid">
          {CTA_PANELS.map((panel, index) => {
            const isExternal = panel.href.startsWith("http");
            return (
              <article
                className="cta-card scroll-reveal"
                data-scroll-reveal
                key={panel.title}
                style={
                  {
                    backgroundImage: `linear-gradient(120deg, rgba(16,10,20,0.2), rgba(16,10,20,0.2)), url('${panel.image}')`,
                    transitionDelay: `${0.16 * index + 0.12}s`,
                    "--reveal-translate": `${28 + index * 6}px`,
                    "--reveal-scale": "0.975",
                  } as CTARevealVariables
                }
              >
                <div className="cta-card-content">
                  <h3>{panel.title}</h3>
                  <p>{panel.description}</p>
                  <a
                    href={panel.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    data-rune-reactive="true"
                  >
                    {panel.action}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="landing-lore" data-scroll-reveal>
        <article className="lore-panel scroll-reveal" data-scroll-reveal>
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
        <AmbientAudioToggle />
      </footer>
    </div>
  );
}
