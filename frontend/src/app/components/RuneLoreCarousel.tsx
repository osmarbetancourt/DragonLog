"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type RuneCard = {
  id: string;
  title: string;
  incantation: string;
  lore: string;
  sigil: string;
};

const RUNE_CARDS: RuneCard[] = [
  {
    id: "sentinel",
    title: "Sentinel Oath",
    incantation: "Ashen watchfires bind each shard to the dragon's call.",
    lore: "Vigilant wardens coil around every log stream, translating static into omen glyphs.",
    sigil: "Vigil Rune",
  },
  {
    id: "codex",
    title: "Codex Unfurling",
    incantation: "Scripted claws dance across vellum etched in obsidian light.",
    lore: "DragonLog's growing grimoire teaches fledgling keepers to weave telemetry rites and summon sentry daemons.",
    sigil: "Codex Sigil",
  },
  {
    id: "ember",
    title: "Ember Artery",
    incantation: "Molten pulse ferries tidings through raven's-flight channels.",
    lore: "Kafka ravens bear shards of flame to every wing of the lair, their wings beating telemetry into a single heart.",
    sigil: "Artery Mark",
  },
  {
    id: "forge",
    title: "Forge Covenant",
    incantation: "Rust-forged daemons hammer resilience beneath volcanic anvils.",
    lore: "Ironwrought tasks and pipeline rites temper each deployment, sealing fractures before they bloom into ruin.",
    sigil: "Forge Band",
  },
  {
    id: "sanctum",
    title: "Sanctum Circuit",
    incantation: "Gilded lenses focus the lair's thousand-fold whispers.",
    lore: "All shards converge into a single obsidian dais where command glyphs glow and alerts hiss with foresight.",
    sigil: "Sanctum Seal",
  },
  {
    id: "wyrm",
    title: "Wyrm's Gaze",
    incantation: "Twin embers open, and latency hides nowhere beneath the stare.",
    lore: "DragonLog's sentries animate the gaze, mapping anomalies into constellations the keepers may amend.",
    sigil: "Gaze Sigil",
  },
  {
    id: "flame",
    title: "Kindled Accord",
    incantation: "Open flame welcomes every artisan to engrave new glyphs.",
    lore: "Integrations arrive as ember offerings; the lair remembers each and braids them into future rites.",
    sigil: "Accord Crest",
  },
];

const RuneLoreCarousel: React.FC = () => {
  const baseAngle = 360 / RUNE_CARDS.length;
  const radius = 420;

  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [flippedState, setFlippedState] = useState<boolean[]>(() => RUNE_CARDS.map(() => true));
  const [isDragging, setIsDragging] = useState(false);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const pointerState = useRef({
    isDragging: false,
    startX: 0,
    startRotation: 0,
    moved: false,
    pointerId: null as null | number,
    hasCapture: false,
  });

  const normalizedRotation = useMemo(() => {
    const value = rotation % 360;
    return value < 0 ? value + 360 : value;
  }, [rotation]);

  useEffect(() => {
    const rawIndex = Math.round(-rotation / baseAngle);
    const positiveIndex = ((rawIndex % RUNE_CARDS.length) + RUNE_CARDS.length) % RUNE_CARDS.length;
    setActiveIndex(positiveIndex);
  }, [rotation, baseAngle]);

  const snapRotation = (target: number) => {
    const snapped = Math.round(target / baseAngle) * baseAngle;
    setRotation(snapped);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) {
      return;
    }
    pointerState.current = {
      isDragging: true,
      startX: event.clientX,
      startRotation: rotation,
      moved: false,
      pointerId: event.pointerId,
      hasCapture: false,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerState.current.isDragging) {
      return;
    }
    const delta = event.clientX - pointerState.current.startX;
    if (!pointerState.current.moved && Math.abs(delta) > 8) {
      pointerState.current.moved = true;
      const track = trackRef.current;
      if (track && !pointerState.current.hasCapture) {
        track.setPointerCapture(event.pointerId);
        pointerState.current.hasCapture = true;
      }
    }
    const sensitivity = 0.35;
    setRotation(pointerState.current.startRotation + delta * sensitivity);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerState.current.isDragging) {
      return;
    }
    pointerState.current.isDragging = false;
    const track = trackRef.current;
    if (track && pointerState.current.hasCapture && pointerState.current.pointerId !== null) {
      track.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
    pointerState.current.moved = false;
    pointerState.current.pointerId = null;
    pointerState.current.hasCapture = false;
    snapRotation(rotation);
  };

  const handleCardClick = (index: number) => {
    if (pointerState.current.isDragging || pointerState.current.moved) {
      pointerState.current.moved = false;
      return;
    }
    setFlippedState(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setRotation(prev => prev + baseAngle);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setRotation(prev => prev - baseAngle);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setFlippedState(prev => {
        const next = [...prev];
        next[activeIndex] = !next[activeIndex];
        return next;
      });
    }
  };

  return (
    <div className="rune-carousel" aria-label="DragonLog rune carousel">
      <style>{`
        .rune-carousel {
          position: relative;
          width: 100%;
          height: clamp(360px, 40vw, 540px);
          display: grid;
          place-items: center;
          perspective: 2000px;
          overflow: visible;
        }
        .rune-carousel-track {
          position: relative;
          width: clamp(280px, 28vw, 360px);
          aspect-ratio: 432 / 675;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
          cursor: grab;
        }
        .rune-carousel-track:active {
          cursor: grabbing;
        }
        .rune-carousel-track.is-dragging {
          transition: none;
        }
        .rune-card {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .rune-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          aspect-ratio: 432 / 675;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
          box-shadow: 0 24px 48px rgba(0,0,0,0.35);
          border-radius: 22px;
        }
        .rune-card-inner.is-flipped {
          transform: rotateY(180deg);
        }
        .rune-card-face {
          position: absolute;
          inset: 0;
          padding: clamp(1.6rem, 4vw, 2.4rem);
          display: grid;
          gap: clamp(1rem, 2.2vw, 1.5rem);
          border-radius: inherit;
          background: linear-gradient(160deg, #1a1222, #0c0812);
          border: 1px solid rgba(215,180,140,0.32);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform-origin: center;
        }
        .rune-card-face.front {
          transform: rotateY(0deg);
        }
        .rune-card-face h4 {
          margin: 0;
          font-family: 'Old Charlotte', serif;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: clamp(1.15rem, 2.4vw, 1.6rem);
        }
        .rune-card-face p {
          margin: 0;
          line-height: 1.75;
          color: rgba(245,228,204,0.85);
          font-size: clamp(0.92rem, 1.8vw, 1.1rem);
        }
        .rune-card-face span {
          font-size: clamp(0.82rem, 1.6vw, 1rem);
          letter-spacing: 0.08em;
          color: rgba(245,226,198,0.72);
          text-transform: uppercase;
        }
        .rune-card-face.back {
          transform: rotateY(180deg);
          padding: 0;
          border: none;
          overflow: hidden;
          border-radius: clamp(18px, 3.6vw, 24px);
          background: url('/images/DragonLogCard.png') center/cover no-repeat;
          background-size: calc(100% + 4px) calc(100% + 6px);
          background-position: calc(50% - 1px) calc(50% - 2px);
          display: block;
        }
        .rune-card-face.back::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background:
            radial-gradient(circle at 50% 20%, rgba(255,230,190,0.12), transparent 65%),
            radial-gradient(circle at 50% 85%, rgba(12,5,8,0.65), transparent 85%);
          pointer-events: none;
          opacity: 0.9;
          mix-blend-mode: multiply;
        }
        .rune-card-face.back::after {
          content: "";
          position: absolute;
          inset: min(1.8%, 10px);
          border-radius: calc(clamp(18px, 3.6vw, 24px) - 4px);
          border: 1px solid rgba(0,0,0,0.35);
          box-shadow: inset 0 0 18px rgba(0,0,0,0.4);
          pointer-events: none;
        }
        .rune-card-face * {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rune-card::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 22px;
          border: 1px solid rgba(230,194,150,0.2);
          pointer-events: none;
        }
        .rune-card.is-active .rune-card-inner {
          box-shadow: 0 28px 62px rgba(255,186,120,0.28);
        }
        .rune-card.is-active .rune-card-face.front::before {
          opacity: 0.32;
        }
        .rune-card-face.front::before {
          content: "";
          position: absolute;
          inset: -18%;
          background: radial-gradient(circle at 30% 30%, rgba(255,206,156,0.14), transparent 60%);
          opacity: 0.1;
          pointer-events: none;
        }
        .rune-carousel-indicator {
          position: absolute;
          bottom: clamp(0.75rem, 2vw, 1.2rem);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.45rem;
          pointer-events: none;
        }
        .rune-carousel-indicator span {
          width: clamp(8px, 1vw, 10px);
          height: clamp(8px, 1vw, 10px);
          border-radius: 50%;
          border: 1px solid rgba(230,194,150,0.4);
          background: rgba(18,12,18,0.8);
          opacity: 0.55;
        }
        .rune-carousel-indicator span.is-active {
          background: rgba(230,194,150,0.9);
          opacity: 1;
          box-shadow: 0 0 12px rgba(255,190,130,0.45);
        }
        @media (max-width: 768px) {
          .rune-carousel {
            height: clamp(320px, 85vw, 440px);
          }
          .rune-carousel-track {
            width: clamp(240px, 72vw, 320px);
          }
        }
      `}</style>

      <div
        ref={trackRef}
  className={`rune-carousel-track${isDragging ? " is-dragging" : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ transform: `rotateY(${normalizedRotation}deg)` }}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-activedescendant={`rune-card-${activeIndex}`}
        onKeyDown={handleKeyDown}
      >
        {RUNE_CARDS.map((card, index) => {
          const angle = index * baseAngle;
          const isActive = index === activeIndex;
          const transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
          const flipped = flippedState[index];

          return (
            <div
              key={card.id}
              id={`rune-card-${index}`}
              className={`rune-card${isActive ? " is-active" : ""}`}
              style={{ transform }}
              role="button"
              tabIndex={-1}
              aria-pressed={flipped}
              aria-label={`${card.title} card ${flipped ? "back" : "front"}`}
              onClick={() => handleCardClick(index)}
            >
              <div className={`rune-card-inner${flipped ? " is-flipped" : ""}`}>
                <div className="rune-card-face front">
                  <span>{card.sigil}</span>
                  <h4>{card.title}</h4>
                  <p>{card.incantation}</p>
                  {card.lore && <p>{card.lore}</p>}
                </div>
                <div className="rune-card-face back"></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rune-carousel-indicator" aria-hidden="true">
        {RUNE_CARDS.map((_, index) => (
          <span key={`indicator-${index}`} className={index === activeIndex ? "is-active" : ""}></span>
        ))}
      </div>
    </div>
  );
};

export default RuneLoreCarousel;
