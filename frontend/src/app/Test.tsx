


"use client";


import React, { useRef, useEffect, useState } from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

const LORE = [
  {
    title: "The Ashen Peaks",
    text: "Where dragons once soared, the mountains now whisper secrets to those who dare to listen.",
    color: "from-amber-400/80 to-amber-700/80",
  },
  {
    title: "The Ember Knight",
    text: "A lone knight guards the last flame, his oath unbroken through centuries of shadow.",
    color: "from-purple-400/80 to-purple-700/80",
  },
  {
    title: "The Ruined Forest",
    text: "Twisted roots and silent trees remember the wars of old, their scars hidden in mist.",
    color: "from-sky-400/80 to-sky-700/80",
  },
  {
    title: "The Forgotten Gate",
    text: "Beyond the shattered archway, lost souls wander, seeking the dawn that never comes.",
    color: "from-amber-400/80 to-amber-700/80",
  },
];

export default function Test() {
  const [scrollEl, setScrollEl] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    setScrollEl(scrollRef.current);
  }, []);

  return (
    <section className="w-full flex flex-col items-center py-32 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-950">
      <h2 className="text-3xl md:text-4xl font-old-charlotte text-amber-300 mb-8 drop-shadow-lg tracking-wider text-center">Horizontal Scroll Parallax Demo</h2>
      <div
        ref={scrollRef}
        className="relative w-full max-w-[90vw] h-[60vh] min-h-[320px] overflow-x-auto overflow-y-hidden rounded-xl border border-amber-900 bg-zinc-900 shadow-2xl flex items-center"
        style={{ WebkitOverflowScrolling: 'touch', scrollSnapType: 'x mandatory' }}
        tabIndex={0}
      >
        {scrollEl && (
          <ParallaxProvider scrollAxis="horizontal" scrollContainer={scrollEl}>
            <div
              className="relative flex flex-row items-center h-full min-w-full w-fit snap-x snap-mandatory"
              style={{ width: `calc(${LORE.length * 2} * 100%)` }}
            >
              {/* Repeat the lore boxes twice for seamless effect */}
              {[...Array(2)].flatMap((_, repeatIdx) =>
                LORE.map((lore, i) => (
                  <Parallax
                    key={repeatIdx + '-' + i}
                    translateY={i % 2 === 0 ? ['-40px', '40px'] : ['40px', '-40px']}
                    className={`flex flex-col items-center justify-center h-full w-full min-w-full bg-gradient-to-br ${lore.color} rounded-xl shadow-2xl px-8 py-12 snap-center select-none border-2 border-amber-900/40 transition-all duration-500`}
                    style={{ scrollSnapAlign: 'center' }}
                  >
                    <span className="text-4xl md:text-5xl font-old-charlotte text-amber-100 mb-4 text-center drop-shadow">{lore.title}</span>
                    <span className="text-xl md:text-2xl font-cambridge text-zinc-100 text-center mt-2 max-w-2xl">{lore.text}</span>
                  </Parallax>
                ))
              )}
            </div>
          </ParallaxProvider>
        )}
      </div>
  <p className="mt-6 text-zinc-300 text-center max-w-2xl">Scroll horizontally to unveil each tale. Each lore card fills the screen, immersing thee in DragonLog's legend.</p>
    </section>
  );
}
