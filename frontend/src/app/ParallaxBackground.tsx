"use client";
import React from "react";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";

export default function ParallaxBackground() {
	return (
		<div className="relative w-full h-[600px] flex flex-col items-center justify-center bg-gradient-to-b from-black via-[#18181b] to-[#23232a] select-none">
			{/* Fade in and scale up as you scroll */}
			<Parallax speed={-20} opacity={[0, 1]} scale={[0.8, 1]}>
				<div className="text-4xl md:text-5xl font-old-charlotte text-amber-300 mb-8 tracking-wider text-center">
					In the shadow of the Ashen Peaks,
				</div>
			</Parallax>
			<Parallax speed={-10} opacity={[0, 1]} scale={[0.9, 1]}>
				<div className="text-2xl md:text-3xl font-old-charlotte text-amber-100 mb-8 tracking-wide text-center">
					the DragonLog endures, keeper of every tale and sin.
				</div>
			</Parallax>
			<Parallax speed={-5} opacity={[0.2, 1]} scale={[1, 1.05]}>
				<div className="text-xl md:text-2xl font-old-charlotte text-amber-400 tracking-widest text-center">
					Only the vigilant may read, but none may forget.
				</div>
			</Parallax>
		</div>
	);
}
