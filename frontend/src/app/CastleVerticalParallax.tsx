import type { ReactNode, RefObject } from "react";
"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const LORE = [
    {
        img: "/castle_pixel/pixel_1.png",
        text: "In the misted vale, shadows of the old kingdom linger still.",
    },
    {
        img: "/castle_pixel/pixel_2.png",
        text: "Twisted boughs guard the path, their roots entwined with secrets.",
    },
    {
        img: "/castle_pixel/pixel_3.png",
        text: "Beyond the mountains, the silent city awaits the return of its dragon lord.",
    },
    {
        img: "/castle_pixel/pixel_4.png",
        text: "Upon the highest spire, the vigil of DragonLog keepeth watch eternal.",
    },
];

interface AnimatedBookPagesProps {
    left: ReactNode;
    right: ReactNode;
    bookRef: RefObject<HTMLDivElement>;
    leftPageRef: RefObject<HTMLDivElement>;
    rightPageRef: RefObject<HTMLDivElement>;
    spineRef: RefObject<HTMLDivElement>;
}

function AnimatedBookPages(props: AnimatedBookPagesProps) {
    const { left, right, bookRef, leftPageRef, rightPageRef, spineRef } = props;
    return (
        <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-gradient-to-b from-[#18181b] to-[#23232a] z-40">
            <div
                ref={bookRef}
                className="relative flex flex-row items-center justify-center"
                style={{ perspective: 2000, width: 900, height: 600, maxWidth: '95vw', maxHeight: '90vh' }}
            >
                {/* Left page */}
                <div
                    ref={leftPageRef}
                    className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-br from-[#f5ecd7] to-[#e7d7b6] border-r-2 border-amber-900 rounded-l-2xl shadow-2xl z-20 flex flex-col items-center justify-center px-10 py-12 page-texture"
                    style={{
                        transform: 'rotateY(0deg)',
                        transformOrigin: 'left center',
                        boxShadow: '8px 0 32px 0 #0004',
                    }}
                >
                    {left}
                </div>
                {/* Right page */}
                <div
                    ref={rightPageRef}
                    className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-bl from-[#f5ecd7] to-[#e7d7b6] border-l-2 border-amber-900 rounded-r-2xl shadow-2xl z-20 flex flex-col items-center justify-center px-10 py-12 page-texture"
                    style={{
                        transform: 'rotateY(0deg)',
                        transformOrigin: 'right center',
                        boxShadow: '-8px 0 32px 0 #0004',
                    }}
                >
                    {right}
                </div>
                {/* Spine */}
                <div
                    ref={spineRef}
                    className="absolute left-1/2 top-0 h-full w-6 bg-gradient-to-b from-amber-900 to-amber-700 rounded z-30 shadow-xl"
                    style={{ transform: 'translateX(-50%) scaleY(1.04)' }}
                />
                {/* Page stack (left) */}
                <div className="absolute left-0 top-2 h-[96%] w-3 bg-gradient-to-b from-[#e7d7b6] to-[#cbb98a] opacity-80 z-10 rounded" />
                {/* Page stack (right) */}
                <div className="absolute right-0 top-2 h-[96%] w-3 bg-gradient-to-b from-[#e7d7b6] to-[#cbb98a] opacity-80 z-10 rounded" />
            </div>
        </div>
    );
}

export default function CastleVerticalParallax() {
    const [opened, setOpened] = useState(false);
    const [animating, setAnimating] = useState(false);
    const bookRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
    const leftPageRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
    const rightPageRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
    const spineRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
    const [bookRotated, setBookRotated] = useState(false);

    // Enhanced book opening animation: rotate book, then open covers
    const handleOpen = () => {
        if (opened || animating) return;
        setAnimating(true);
        if (bookRef.current && leftPageRef.current && rightPageRef.current && spineRef.current) {
            // Step 1: Rotate the whole book toward the viewer (Y and X axis)
            gsap.to(bookRef.current, {
                rotateY: 0,
                rotateX: 0,
                scale: 1.04,
                duration: 0.5,
                ease: "power2.out",
                onStart: () => {
                    // Set initial rotation if not already set
                    gsap.set(bookRef.current, { rotateY: -30, rotateX: 18, scale: 1 });
                },
                onComplete: () => {
                    setBookRotated(true);
                    // Step 2: Open covers/pages with bounce
                    gsap.to(leftPageRef.current, {
                        rotateY: -70,
                        duration: 1.1,
                        ease: "power2.inOut",
                        transformOrigin: "left center",
                    });
                    gsap.to(rightPageRef.current, {
                        rotateY: 70,
                        duration: 1.1,
                        ease: "power2.inOut",
                        transformOrigin: "right center",
                    });
                    gsap.to(bookRef.current, {
                        scale: 1.12,
                        boxShadow: "0 0 80px 20px #000a",
                        duration: 0.5,
                        ease: "power1.out",
                        yoyo: true,
                        repeat: 1,
                        onComplete: () => {
                            setOpened(true);
                            setTimeout(() => setAnimating(false), 400);
                        },
                    });
                },
            });
        }
    };

    // Closed book view
    if (!opened) {
        return (
            <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#18181b] to-[#23232a]">
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <div
                        ref={bookRef}
                        className="relative flex flex-row items-center justify-center cursor-pointer select-none"
                        style={{
                            perspective: 1600,
                            width: 420,
                            height: 320,
                            transform: 'rotateY(-30deg) rotateX(18deg) scale(1)',
                            transition: 'transform 0.4s cubic-bezier(0.7,0.2,0.2,1)',
                        }}
                        onClick={handleOpen}
                    >
                        {/* Left cover (styled as thick) */}
                        <div
                            className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-br from-amber-900 to-amber-700 border-4 border-amber-900 rounded-l-2xl shadow-2xl z-10"
                            style={{ transform: "rotateY(0deg)", transformOrigin: "left center", transition: "box-shadow 0.3s" }}
                        />
                        {/* Right cover (styled as thick) */}
                        <div
                            className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-bl from-amber-900 to-amber-700 border-4 border-amber-900 rounded-r-2xl shadow-2xl z-10"
                            style={{ transform: "rotateY(0deg)", transformOrigin: "right center", transition: "box-shadow 0.3s" }}
                        />
                        {/* Spine */}
                        <div className="absolute left-1/2 top-0 h-full w-3 bg-amber-900 z-20 rounded" style={{ transform: "translateX(-50%)" }} />
                        {/* Book title */}
                        <div className="absolute w-full text-center top-1/2 left-0 -translate-y-1/2 text-3xl font-old-charlotte text-amber-200 drop-shadow-lg z-30 pointer-events-none">
                            DragonLog Lore
                        </div>
                        {/* Click prompt */}
                        <div className="absolute bottom-4 w-full text-center text-amber-100 text-lg animate-pulse z-30 pointer-events-none">
                            Click to open the tome
                        </div>
                        {/* Subtle paper edge */}
                        <div className="absolute left-1/2 top-2 h-[96%] w-2 bg-gradient-to-b from-[#e7d7b6] to-[#cbb98a] opacity-80 z-5 rounded" style={{ transform: "translateX(-50%)" }} />
                    </div>
                </div>
            </div>
        );
    }

    // Open book view: animated pages
    return (
        <AnimatedBookPages
            bookRef={bookRef}
            leftPageRef={leftPageRef}
            rightPageRef={rightPageRef}
            spineRef={spineRef}
            left={
                <div className="flex flex-col h-full w-full justify-center items-center">
                    <div className="text-3xl font-old-charlotte text-amber-900 mb-8 drop-shadow-lg">DragonLog Lore</div>
                    <Image
                        src={LORE[0].img}
                        alt={LORE[0].text}
                        width={220}
                        height={220}
                        className="w-[220px] max-w-full h-auto mb-6 drop-shadow-xl rounded-lg border-2 border-amber-900 bg-zinc-900/30"
                        sizes="(max-width: 768px) 70vw, 220px"
                    />
                    <div className="text-xl font-old-charlotte text-amber-900 text-center max-w-md drop-shadow-lg leading-relaxed">
                        {LORE[0].text}
                    </div>
                </div>
            }
            right={
                <div className="flex flex-col h-full w-full justify-center items-center">
                    <div className="flex flex-col gap-8">
                        {LORE.slice(1).map((section, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <Image
                                    src={section.img}
                                    alt={section.text}
                                    width={140}
                                    height={140}
                                    className="w-[140px] max-w-full h-auto mb-4 drop-shadow-xl rounded-lg border-2 border-amber-900 bg-zinc-900/30"
                                    sizes="(max-width: 768px) 60vw, 140px"
                                />
                                <div className="text-lg font-old-charlotte text-amber-900 text-center max-w-md drop-shadow-lg leading-relaxed">
                                    {section.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        />
    );
}

// Add a subtle paper texture if you want: add this to your global CSS or Tailwind config
// .page-texture {
//   background-image: url('/path/to/paper-texture.png');
//   background-blend-mode: multiply;
//   background-size: cover;
//   opacity: 0.98;
// }