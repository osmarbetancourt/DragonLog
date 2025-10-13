
"use client";
import React, { useState } from "react";

const svgList = [
  {
    name: "Knight Fire 1",
    src: "/DragonLogSvgs/knight_fire_1.svg",
  },
  {
    name: "Knight Fire 2",
    src: "/DragonLogSvgs/knight_fire_2.svg",
  },
];


export default function CompareSVGs() {
  const [bg, setBg] = useState("#18181b");
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [grayscale, setGrayscale] = useState(false);
  const [shadow, setShadow] = useState(false);

  // Helper to set correct style for background or backgroundImage
  const getBgStyle = (bg: string) => {
    if (bg.startsWith("linear-gradient")) {
      return { backgroundImage: bg };
    } else {
      return { backgroundColor: bg };
    }
  };

  // SVG style
  const getSvgStyle = () => ({
    transform: `scale(${scale}) rotate(${rotate}deg)`,
    filter: `${grayscale ? "grayscale(1) " : ""}${shadow ? "drop-shadow(0 0 16px #ffb300)" : ""}`,
    transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
  });

  return (
    <section className="w-full flex flex-col items-center py-12 gap-8">
      <h2 className="text-2xl md:text-3xl font-old-charlotte text-amber-300 drop-shadow mb-4">Compare SVG Quality</h2>
      <div className="flex flex-row gap-8 justify-center items-end w-full max-w-4xl">
        {svgList.map((svg, idx) => (
          <div key={svg.name} className="flex flex-col items-center gap-2 bg-gray-900/70 rounded-lg p-4 shadow-lg border border-amber-900">
            <div className="w-64 h-64 flex items-center justify-center" style={getBgStyle(bg)}>
              <img src={svg.src} alt={svg.name} className="max-w-full max-h-full object-contain" style={getSvgStyle()} />
            </div>
            <span className="text-lg text-amber-200 font-semibold mt-2">{svg.name}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-2 mt-4 flex-wrap justify-center">
        <span className="text-sm text-gray-300">Background:</span>
        <button
          type="button"
          className="px-2 py-1 rounded bg-[#18181b] text-gray-100 border border-gray-700 cursor-pointer"
          onClick={() => setBg("#18181b")}
        >
          Dark
        </button>
        <button
          type="button"
          className="px-2 py-1 rounded bg-white text-gray-900 border border-gray-300 cursor-pointer"
          onClick={() => setBg("#fff")}
        >
          Light
        </button>
        <button
          type="button"
          style={{ background: "linear-gradient(135deg,#18181b 60%,#ffb300 100%)" }}
          className="px-2 py-1 rounded text-gray-900 border border-amber-400 cursor-pointer"
          onClick={() => setBg("linear-gradient(135deg,#18181b 60%,#ffb300 100%)")}
        >
          Fantasy
        </button>
        <span className="text-sm text-gray-300 ml-4">SVG FX:</span>
        <button type="button" className="px-2 py-1 rounded bg-gray-700 text-amber-200 border border-amber-700 cursor-pointer" onClick={() => setScale(s => Math.max(0.5, s - 0.1))}>- Scale</button>
        <button type="button" className="px-2 py-1 rounded bg-gray-700 text-amber-200 border border-amber-700 cursor-pointer" onClick={() => setScale(s => Math.min(2, s + 0.1))}>+ Scale</button>
        <button type="button" className="px-2 py-1 rounded bg-gray-700 text-amber-200 border border-amber-700 cursor-pointer" onClick={() => setRotate(r => (r - 15) % 360)}>&#8634; Rotate</button>
        <button type="button" className="px-2 py-1 rounded bg-gray-700 text-amber-200 border border-amber-700 cursor-pointer" onClick={() => setRotate(r => (r + 15) % 360)}>&#8635; Rotate</button>
        <button type="button" className={`px-2 py-1 rounded border cursor-pointer ${grayscale ? "bg-amber-700 text-white border-amber-400" : "bg-gray-700 text-amber-200 border-amber-700"}`} onClick={() => setGrayscale(g => !g)}>Grayscale</button>
        <button type="button" className={`px-2 py-1 rounded border cursor-pointer ${shadow ? "bg-amber-700 text-white border-amber-400" : "bg-gray-700 text-amber-200 border-amber-700"}`} onClick={() => setShadow(s => !s)}>Glow</button>
      </div>
    </section>
  );
}