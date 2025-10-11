// import React from "react"; // Uncomment if your tooling requires explicit React import

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#18181b] via-[#23232a] to-[#1a1a1a] text-gray-100 overflow-hidden">
      {/* Hero Section */}
      <div className="z-10 flex flex-col items-center text-center gap-6 pt-24 pb-16 px-4">
  <h1 className="font-old-charlotte text-4xl md:text-6xl tracking-wider text-amber-200 drop-shadow-lg">
          DragonLog
        </h1>
  <p className="font-old-charlotte text-lg md:text-xl italic tracking-wide text-amber-100 max-w-2xl drop-shadow-md">
          “Let none log escape thy dragon’s gaze.”
        </p>
        <a
          href="#"
          className="mt-8 inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-amber-600 via-red-700 to-amber-800 text-lg font-semibold shadow-lg ring-2 ring-amber-400 hover:scale-105 hover:ring-amber-300 transition-all duration-200 gothic-font"
        >
          Begin Thy Vigil, Devil!
        </a>
      </div>
      {/* Subtle background effects placeholder */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Add particles, SVGs, or 3D dragon here in the future */}
      </div>
    </main>
  );
}
