// import React from "react"; // Uncomment if your tooling requires explicit React import

"use client";

import React, { useEffect, useMemo, useState } from "react";

const LEFT_PAGE_CONTENT = {
  title: "Chronicle of Vigilance",
  paragraphs: [
    "Harken, keeper of ledgers, for DragonLog guardeth every ember of thy craft.",
    "Within these leaves dwell runes of insight, won from watches of unblinking flame.",
    "Let no whisper of error stray beyond the dragon’s lore-scribed dominion.",
  ],
};

const RIGHT_PAGE_PASSAGES = [
  {
    title: "First Vigil",
    paragraphs: [
      "At moonrise the sentinels kindle braziers of audit and bind the wild logs.",
      "Glyphs of latency glimmer, guiding weary stewards through the mist of failing nodes.",
    ],
  },
  {
    title: "Whispers of Ember",
    paragraphs: [
      "When the forges roar and queues grow fierce, heed the crimson rune.",
      "It speaketh of surging flame within the pipelines, begging for tempered vigilance.",
    ],
  },
  {
    title: "Oath of Binding",
    paragraphs: [
      "Swear upon these leaves to guard thy realms with diligence and grace.",
      "For every insight harvested, the dragon bestoweth clarity above the din.",
    ],
  },
];

export default function Page() {
  // Book open/close state
  const [bookOpen, setBookOpen] = useState(false);
  // Right reading page flip state
  const [rightPageFlipped, setRightPageFlipped] = useState(false);
  const [turnedRightPages, setTurnedRightPages] = useState(0);
  const [pageTurnerKey, setPageTurnerKey] = useState(0);
  const currentRightPassage = RIGHT_PAGE_PASSAGES[turnedRightPages % RIGHT_PAGE_PASSAGES.length];
  const [viewport, setViewport] = useState({ width: 1280, height: 720 });

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

  const bookMetrics = useMemo(() => {
    const ratio = 4 / 3; // height = width * ratio
    const maxHeight = viewport.height * 0.6;
    const maxWidthFromHeight = maxHeight / ratio;
    let width = Math.min(viewport.width * 0.68, maxWidthFromHeight, 820);
    width = Math.max(width, 140);
    let height = width * ratio;
    if (height > maxHeight) {
      height = maxHeight;
      width = height / ratio;
    }
    const pageScale = Math.min(Math.max(width / 520, 0.8), 1.5);
    return { width, height, pageScale };
  }, [viewport]);

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
    if (!bookOpen || rightPageFlipped) return;
    setRightPageFlipped(true);
  };

  const handleRightPageTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName !== "transform" || !rightPageFlipped) return;
    setRightPageFlipped(false);
    setTurnedRightPages(count => count + 1);
    setPageTurnerKey(key => key + 1);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-10 lg:px-16">
      <style>{`
        .book-demo-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          min-height: 80vh;
          padding: clamp(12px, 5vw, 60px);
        }
        .book {
          position: relative;
          width: var(--book-width, 320px);
          height: var(--book-height, 420px);
          perspective: 1500px;
          transform-style: preserve-3d;
          transform: rotateX(10deg);
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
        /* Right reading page animates via React state, so no static transform here */

        @media (max-width: 768px) {
          .book-demo-container {
            min-height: 90vh;
          }
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
      <div className="book-demo-container">
        <div
          className={"book" + (bookOpen ? " open" : "")}
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
          {/* Right-side pages, one always visible, one appears on open */}
          <div className="page-right-stack">
            <div className="page-right page-right-1"></div>
            <div className="page-right page-right-2"></div>
            {Array.from({ length: turnedRightPages }).map((_, index) => (
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
                  <figure style={figureStyle}>
                    <img
                      src="/images/ruined_castle.png"
                      alt="Ruined castle under dragon vigil"
                      style={imageStyle}
                    />
                    <figcaption style={figcaptionStyle}>
                      "Ruins kept beneath the dragon’s watch"
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </div>
          <div className="cover"></div>
        </div>
      </div>
    </main>
  );
}
