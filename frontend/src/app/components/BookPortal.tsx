"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type BookPortalProps = {
  onAscend: () => void;
};

type Passage = {
  title: string;
  paragraphs: string[];
  ctaLabel?: string;
  ctaSubtext?: string;
  illustration?: {
    src: string;
    alt: string;
    caption: string;
  };
};

const LEFT_PAGE_CONTENT = {
  title: "Chronicle of Vigilance",
  paragraphs: [
    "Harken, keeper of ledgers, for DragonLog guardeth every ember of thy craft.",
    "Within these leaves dwell runes of insight, won from watches of unblinking flame.",
    "Let no whisper of error stray beyond the dragon’s lore-scribed dominion.",
  ],
};

const RIGHT_PAGE_PASSAGES: Passage[] = [
  {
    title: "First Vigil",
    paragraphs: [
      "At moonrise the sentinels kindle braziers of audit and bind the wild logs.",
      "Glyphs of latency glimmer, guiding weary stewards through the mist of failing nodes.",
    ],
    illustration: {
      src: "/DragonLogSvgs/ruined_castle.svg",
      alt: "Ruined castle beneath the dragon's watch",
      caption: "Ruins kept beneath the dragon's ward",
    },
  },
  {
    title: "Whispers of Ember",
    paragraphs: [
      "When the forges roar and queues grow fierce, heed the crimson rune.",
      "It speaketh of surging flame within the pipelines, begging for tempered vigilance.",
    ],
    illustration: {
      src: "/DragonLogSvgs/knight_fire_1.svg",
      alt: "Knight tending a fire in the data sanctum",
      caption: "The sentinel kindles the audit flame",
    },
  },
  {
    title: "Oath of Binding",
    paragraphs: [
      "Swear upon these leaves to guard thy realms with diligence and grace.",
      "For every insight harvested, the dragon bestoweth clarity above the din.",
    ],
    illustration: {
      src: "/DragonLogSvgs/mountain.svg",
      alt: "Mountain citadel forged of telemetry",
      caption: "Signal peaks whisper from obsidian heights",
    },
  },
  {
    title: "The Portal Awaits",
    paragraphs: [
      "Thy study of lore draweth near its end, yet a grander vigil beckons beyond.",
      "Step through the dragon’s seal and let the embers unveil the apparatus of mastery.",
    ],
    ctaLabel: "Summon the Dragon’s Gate",
    ctaSubtext: "Thy DragonLog shall commence its adventure.",
  },
];

export default function BookPortal({ onAscend }: BookPortalProps) {
  const [bookOpen, setBookOpen] = useState(false);
  const [rightPageFlipped, setRightPageFlipped] = useState(false);
  const [turnedRightPages, setTurnedRightPages] = useState(0);
  const [pageTurnerKey, setPageTurnerKey] = useState(0);
  const [viewport, setViewport] = useState({ width: 1280, height: 720 });
  const [portalSummoned, setPortalSummoned] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const postSummonTimeoutRef = useRef<number | null>(null);
  const autoSummonTimeoutRef = useRef<number | null>(null);
  const countdownIntervalRef = useRef<number | null>(null);
  const bookFogRef = useRef<HTMLDivElement | null>(null);
  const vantaRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const mountFog = async () => {
      if (!bookFogRef.current) return;
      const module = await import("vanta/dist/vanta.fog.min");
      if (cancelled || !bookFogRef.current) return;
      const VANTA = module.default;
      vantaRef.current = VANTA({
        el: bookFogRef.current,
        THREE,
        mouseControls: true,
        touchControls: false,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        highlightColor: 0xefd8aa,
        midtoneColor: 0x5a2c1f,
        lowlightColor: 0x110a1c,
        baseColor: 0x08050f,
        blurFactor: 0.65,
        speed: 1.1,
        zoom: 0.9,
      });
    };

    mountFog();

    return () => {
      cancelled = true;
      if (vantaRef.current) {
        vantaRef.current.destroy();
        vantaRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (postSummonTimeoutRef.current !== null) {
        window.clearTimeout(postSummonTimeoutRef.current);
      }
      if (autoSummonTimeoutRef.current !== null) {
        window.clearTimeout(autoSummonTimeoutRef.current);
      }
      if (countdownIntervalRef.current !== null) {
        window.clearInterval(countdownIntervalRef.current);
      }
    };
  }, []);

  const bookMetrics = useMemo(() => {
    const ratio = 4 / 3;
    const maxHeight = viewport.height * 0.6;
    const maxWidthFromHeight = maxHeight / ratio;
    let width = Math.min(viewport.width * 0.68, maxWidthFromHeight, 820);
    width = Math.max(width, 160);
    let height = width * ratio;
    if (height > maxHeight) {
      height = maxHeight;
      width = height / ratio;
    }
    const pageScale = Math.min(Math.max(width / 520, 0.8), 1.5);
    return { width, height, pageScale };
  }, [viewport]);

  const currentIndex = Math.min(turnedRightPages, RIGHT_PAGE_PASSAGES.length - 1);
  const currentRightPassage = RIGHT_PAGE_PASSAGES[currentIndex];
  const isFinalPassage = currentIndex === RIGHT_PAGE_PASSAGES.length - 1;

  const bookStyle = useMemo<React.CSSProperties>(() => ({
    cursor: "pointer",
    "--book-width": `${bookMetrics.width}px`,
    "--book-height": `${bookMetrics.height}px`,
    "--page-scale": bookMetrics.pageScale,
  }), [bookMetrics]);

  const figureStyle = useMemo<React.CSSProperties>(() => ({
    marginTop: `${8 * bookMetrics.pageScale}px`,
    textAlign: "center",
  }), [bookMetrics.pageScale]);

  const imageStyle = useMemo<React.CSSProperties>(() => ({
    width: "100%",
    maxWidth: `${Math.min(200, 190 * bookMetrics.pageScale)}px`,
    height: "auto",
    margin: "0 auto",
    borderRadius: "8px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
    border: "1px solid rgba(120,85,42,0.6)",
  }), [bookMetrics.pageScale]);

  const figcaptionStyle = useMemo<React.CSSProperties>(() => ({
    fontSize: `${Math.min(14, 11 * bookMetrics.pageScale)}px`,
    marginTop: `${Math.min(8, 6 * bookMetrics.pageScale)}px`,
    opacity: 0.8,
  }), [bookMetrics.pageScale]);

  const handleBookClick = () => {
    if (portalSummoned) return;
    setBookOpen(open => {
      const next = !open;
      if (!next) {
        setRightPageFlipped(false);
        setTurnedRightPages(0);
      }
      return next;
    });
  };

  const handleRightPageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!bookOpen || rightPageFlipped || isFinalPassage || portalSummoned) return;
    setRightPageFlipped(true);
  };

  const handleRightPageTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName !== "transform" || !rightPageFlipped) return;
    setRightPageFlipped(false);
    setTurnedRightPages(count => {
      const next = count + 1;
      if (next >= RIGHT_PAGE_PASSAGES.length - 1) {
        return RIGHT_PAGE_PASSAGES.length - 1;
      }
      return next;
    });
    setPageTurnerKey(key => key + 1);
  };

  const clearAutoSummonTimers = useCallback(() => {
    if (autoSummonTimeoutRef.current !== null) {
      window.clearTimeout(autoSummonTimeoutRef.current);
      autoSummonTimeoutRef.current = null;
    }
    if (countdownIntervalRef.current !== null) {
      window.clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  }, []);

  const triggerAscend = useCallback(() => {
    if (portalSummoned) return;
    clearAutoSummonTimers();
    setCountdown(null);
    setPortalSummoned(true);
    postSummonTimeoutRef.current = window.setTimeout(() => {
      onAscend();
      postSummonTimeoutRef.current = null;
    }, 750);
  }, [clearAutoSummonTimers, onAscend, portalSummoned]);

  const handlePortalClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      event.preventDefault();
      triggerAscend();
    },
    [triggerAscend]
  );

  const handlePortalKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        event.stopPropagation();
        triggerAscend();
      }
    },
    [triggerAscend]
  );

  useEffect(() => {
    if (!isFinalPassage || portalSummoned) {
      clearAutoSummonTimers();
      setCountdown(null);
      return;
    }
    setCountdown(5);
    let remaining = 5;
    countdownIntervalRef.current = window.setInterval(() => {
      remaining = Math.max(0, remaining - 1);
      setCountdown(remaining);
    }, 1000);
    autoSummonTimeoutRef.current = window.setTimeout(() => {
      triggerAscend();
    }, 5000);
    return () => {
      clearAutoSummonTimers();
    };
  }, [clearAutoSummonTimers, isFinalPassage, portalSummoned, triggerAscend]);

  return (
    <div className="book-portal">
      <style>{`
        .book-portal {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 80vh;
          padding: clamp(12px, 5vw, 60px);
          overflow: hidden;
        }
        .book-fog-layer {
          position: absolute;
          inset: clamp(-12%, -6vw, -3%);
          z-index: 0;
          opacity: 0.65;
        }
        .book-fog-layer::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 80%, rgba(32, 18, 48, 0.55) 0%, rgba(6, 4, 14, 0.95) 70%);
          mix-blend-mode: screen;
          pointer-events: none;
        }
        .book-portal > *:not(.book-fog-layer) {
          position: relative;
          z-index: 1;
        }
        .book {
          position: relative;
          width: var(--book-width, 320px);
          height: var(--book-height, 420px);
          perspective: 1500px;
          transform-style: preserve-3d;
          transform: rotateX(10deg);
        }
        .book.portal-summoned {
          pointer-events: none;
          animation: bookSuction 0.7s cubic-bezier(.65,0,.35,1) forwards;
        }
        .cover, .page {
          position: absolute;
          width: 100%;
          height: 100%;
          transform-origin: left;
          transition: transform 0.8s cubic-bezier(.77,0,.18,1), opacity 0.8s cubic-bezier(.77,0,.18,1);
        }
        .page-right {
          position: absolute;
          width: 100%;
          height: 100%;
          left: auto;
          transform-origin: left;
          background: #fff;
          border: 1px solid #ccc;
          z-index: 0;
          opacity: 1;
        }
        .page-right-stack {
          position: absolute;
          inset: 0;
        }
        .page-right-1 {
          transform: rotateY(0deg);
          box-shadow: -8px 0 16px #0002;
          background: linear-gradient(to right, #fff 92%, #ececec 100%);
          pointer-events: none;
        }
        .page-right-2 {
          position: absolute;
          width: 98%;
          height: 100%;
          left: 0px;
          transform-origin: left;
          background: linear-gradient(to right, #fff 88%, #e5e5e5 100%);
          border: 1px solid #ccc;
          z-index: 1;
          opacity: 1;
          pointer-events: none;
          transform: rotateY(0deg);
          box-shadow: -12px 0 24px #0002;
        }
        .page-right-turner {
          position: absolute;
          width: 96%;
          height: 100%;
          left: 0px;
          transform-origin: left;
          background: linear-gradient(to right, #fafafa 78%, #dcdcdc 100%);
          border: 1px solid #bfbfbf;
          z-index: 3;
          opacity: 1;
          transform: rotateY(0deg);
          box-shadow: -16px 0 32px #0003;
          transition: transform 1s cubic-bezier(.77,0,.18,1), box-shadow 1s cubic-bezier(.77,0,.18,1);
          cursor: pointer;
          pointer-events: auto;
        }
        .page-right-turner.flipped {
          transform: rotateY(-110deg);
          box-shadow: 16px 0 32px #0001;
        }
        .page-right-turned {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0px;
          transform-origin: left;
          transform: rotateY(-110deg);
          background: linear-gradient(to left, #f8f8f8 85%, #d9d9d9 100%);
          border: 1px solid #b5b5b5;
          z-index: 5;
          box-shadow: 14px 0 28px #0002;
          pointer-events: none;
        }
        .page-texture-overlay {
          position: absolute;
          inset: 0;
          padding: clamp(20px, calc(30px * var(--page-scale, 1)), 58px);
          pointer-events: none;
        }
        .page-text {
          width: 100%;
          height: 100%;
          overflow-y: auto;
          font-size: clamp(14px, calc(16px * var(--page-scale, 1) + 0.35vw), 26px);
          line-height: calc(1.65 * var(--page-scale, 1));
          color: #3f2b0d;
          letter-spacing: 0.02em;
          text-shadow: 0 1px 0 rgba(255,255,255,0.35);
        }
        .page-text h3 {
          font-size: clamp(20px, calc(24px * var(--page-scale, 1) + 0.5vw), 36px);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: clamp(10px, calc(15px * var(--page-scale, 1)), 26px);
        }
        .page-text p {
          margin-bottom: clamp(10px, calc(14px * var(--page-scale, 1)), 24px);
        }
        .page-text::-webkit-scrollbar {
          width: 6px;
        }
        .page-text::-webkit-scrollbar-thumb {
          background: #c8b48a;
          border-radius: 9999px;
        }
        .page.page-1::after,
        .page.page-2::after,
        .page.page-3::after,
        .page.page-4::after,
        .page.page-5::after {
          content: "Ledger script murmurs in ember light \AIts gilded edges soft with age.\ACiphers coil beneath the dragon seal\AA labyrinth for eyes unblessed.\AVigil keepers etch the watchful oath\ATheir ink a blend of shadow, iron, and fate.\AAll records bend to sovereign flame,\AFor truth is written in the ash.\AThe first page sealed by mortal fear,\AThe final, by a timeless creed.";
          position: absolute;
          top: 26px;
          left: 22px;
          right: 26px;
          bottom: 30px;
          font-family: 'Old Charlotte', serif;
          font-size: calc(11px * var(--page-scale, 1));
          line-height: calc(1.6 * var(--page-scale, 1));
          color: rgba(63, 43, 13, 0.28);
          letter-spacing: 0.09em;
          white-space: pre-line;
          pointer-events: none;
        }
        .cover {
          z-index: 10;
          background: url('/images/DragonLogCover.png') center/cover no-repeat;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
        }
        .page {
          background: #fff;
          border: 1px solid #ccc;
          z-index: 1;
        }
        .book.open .cover {
          transform: rotateY(-135deg);
        }
        .book.open .page-1 { transform: rotateY(-130deg); z-index: 9; }
        .book.open .page-2 { transform: rotateY(-125deg); z-index: 8; }
        .book.open .page-3 { transform: rotateY(-120deg); z-index: 7; }
        .book.open .page-4 { transform: rotateY(-115deg); z-index: 6; }
        .book.open .page-5 { transform: rotateY(-110deg); z-index: 5; }
          .portal-gate {
            margin-top: clamp(20px, calc(26px * var(--page-scale, 1)), 38px);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: clamp(12px, calc(16px * var(--page-scale, 1)), 20px);
          }
          .portal-gate__frame {
            position: relative;
            width: clamp(140px, calc(148px * var(--page-scale, 1) + 12vw), 260px);
            height: clamp(140px, calc(148px * var(--page-scale, 1) + 12vw), 260px);
            border-radius: clamp(18px, 6vw, 36px);
            overflow: hidden;
            background: radial-gradient(circle at 50% 60%, rgba(32,18,48,0.85) 0%, rgba(12,8,20,0.96) 65%, rgba(6,4,12,0.98) 100%);
            border: 1px solid rgba(152,112,66,0.55);
            box-shadow: 0 0 28px rgba(255,210,140,0.25);
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
          }
          .portal-gate__frame:hover {
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 0 38px rgba(255,220,160,0.32);
          }
          .portal-gate__frame--active {
            pointer-events: none;
            transform: scale(0.96);
            box-shadow: 0 0 48px rgba(120,200,255,0.35);
          }
          .portal-gate__aura,
          .portal-gate__glimmer {
            position: absolute;
            inset: -12%;
            border-radius: inherit;
            mix-blend-mode: screen;
            opacity: 0.85;
          }
          .portal-gate__aura {
            background: radial-gradient(circle, rgba(125,205,255,0.32) 0%, rgba(38,82,120,0.18) 45%, rgba(12,10,24,0.4) 75%);
            filter: blur(14px);
            animation: portalAuraPulse 4.5s ease-in-out infinite;
          }
          .portal-gate__glimmer {
            inset: -6%;
            background: conic-gradient(from 0.25turn, rgba(255,222,188,0.28), rgba(120,86,200,0.12), rgba(255,222,188,0.28));
            filter: blur(10px);
            opacity: 0.45;
            animation: portalGlimmer 6s linear infinite;
          }
          .portal-gate__image {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .portal-gate__image img {
            width: 92%;
            height: 92%;
            object-fit: contain;
            mix-blend-mode: screen;
            filter: drop-shadow(0 0 22px rgba(120, 200, 255, 0.45));
            animation: portalBreath 5.5s ease-in-out infinite;
          }
          .portal-gate__status {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: clamp(4px, calc(6px * var(--page-scale, 1)), 10px);
            text-align: center;
          }
          .portal-gate__status span {
            font-family: 'Old Charlotte', serif;
            text-transform: uppercase;
            letter-spacing: 0.08em;
          }
          .portal-gate__status small {
            font-family: 'Old Charlotte', serif;
            font-size: clamp(12px, calc(14px * var(--page-scale, 1)), 18px);
            opacity: 0.85;
          }
          @keyframes bookSuction {
            0% {
              transform: rotateX(10deg) scale(1);
            }
            40% {
              transform: rotateX(16deg) scale(0.88) translateZ(18px);
            }
            100% {
              transform: rotateX(24deg) scale(0.32) translateZ(160px);
              opacity: 0;
            }
          }
          @keyframes portalAuraPulse {
            0% {
              opacity: 0.8;
              transform: scale(0.96);
            }
            50% {
              opacity: 1;
              transform: scale(1.04);
            }
            100% {
              opacity: 0.8;
              transform: scale(0.96);
            }
          }
          @keyframes portalGlimmer {
            0% { transform: rotate(0deg); opacity: 0.4; }
            50% { opacity: 0.6; }
            100% { transform: rotate(360deg); opacity: 0.4; }
          }
          @keyframes portalBreath {
            0% {
              transform: scale(0.95);
              filter: drop-shadow(0 0 16px rgba(120, 200, 255, 0.4));
            }
            50% {
              transform: scale(1.02);
              filter: drop-shadow(0 0 30px rgba(140, 220, 255, 0.55));
            }
            100% {
              transform: scale(0.95);
              filter: drop-shadow(0 0 16px rgba(120, 200, 255, 0.4));
            }
          }
        @media (max-width: 768px) {
          .book {
            transform: rotateX(8deg);
          }
        }
        @media (max-width: 480px) {
          .book {
            transform: rotateX(6deg);
          }
          .page-text {
            font-size: clamp(13px, calc(14px * var(--page-scale, 1)), 19px);
          }
          .page-text h3 {
            font-size: clamp(17px, calc(20px * var(--page-scale, 1)), 28px);
          }
        }
      `}</style>
      <div className="book-fog-layer" ref={bookFogRef}></div>
      <div
        className={
          "book" + (bookOpen ? " open" : "") + (portalSummoned ? " portal-summoned" : "")
        }
        onClick={handleBookClick}
        style={bookStyle}
      >
        <div className="page page-1"></div>
        <div className="page page-2"></div>
        <div className="page page-3"></div>
        <div className="page page-4"></div>
        <div className="page page-5"></div>
        <div className="page-texture-overlay">
          <div className="page-text font-old-charlotte">
            <h3>{LEFT_PAGE_CONTENT.title}</h3>
            {LEFT_PAGE_CONTENT.paragraphs.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
        <div className="page-right-stack">
          <div className="page-right page-right-1"></div>
          <div className="page-right page-right-2"></div>
          {Array.from({ length: currentIndex }).map((_, index) => (
            <div className="page-right page-right-turned" key={index}></div>
          ))}
          <div
            className={`page-right page-right-turner${rightPageFlipped ? " flipped" : ""}`}
            onClick={handleRightPageClick}
            onTransitionEnd={handleRightPageTransitionEnd}
            aria-label="Turn page"
            key={pageTurnerKey}
          >
            <div className="page-texture-overlay">
              <div className="page-text font-old-charlotte">
                <h3>{currentRightPassage.title}</h3>
                {currentRightPassage.paragraphs.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
                {isFinalPassage ? (
                  <div className="portal-gate">
                    <div
                      className={`portal-gate__frame${portalSummoned ? " portal-gate__frame--active" : ""}`}
                      onClick={handlePortalClick}
                      role="button"
                      tabIndex={0}
                      onKeyDown={handlePortalKeyDown}
                      aria-label={portalSummoned ? "Portal sequence engaged" : "Enter the portal"}
                    >
                      <div className="portal-gate__aura"></div>
                      <div className="portal-gate__image">
                        <img src="/images/portal.png" alt="DragonLog portal vortex" />
                      </div>
                      <div className="portal-gate__glimmer"></div>
                    </div>
                    <div className="portal-gate__status">
                      <span>{portalSummoned ? "Translocation commencing" : "Portal alignment"}</span>
                      <small>
                        {portalSummoned
                          ? "Hold fast, the gate draws you inward."
                          : countdown !== null
                          ? `Stand ready… translation in ${countdown}s`
                          : "Arcane matrices calibrating."}
                      </small>
                    </div>
                  </div>
                ) : currentRightPassage.illustration ? (
                  <figure style={figureStyle}>
                    <img
                      src={currentRightPassage.illustration.src}
                      alt={currentRightPassage.illustration.alt}
                      style={imageStyle}
                    />
                    <figcaption style={figcaptionStyle}>
                      {currentRightPassage.illustration.caption}
                    </figcaption>
                  </figure>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="cover"></div>
      </div>
    </div>
  );
}
