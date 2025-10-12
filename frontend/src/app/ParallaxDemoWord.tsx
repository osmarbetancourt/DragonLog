"use client";

import React, { useRef } from "react";
import { ParallaxProvider, useParallax } from "react-scroll-parallax";

// Image paths relative to /public
const imageBg = "/parallax_demon_woods_pack/parallax_demon_woods_pack/layers/parallax-demon-woods-bg.png";
const imageFar = "/parallax_demon_woods_pack/parallax_demon_woods_pack/layers/parallax-demon-woods-far-trees.png";
const imageMid = "/parallax_demon_woods_pack/parallax_demon_woods_pack/layers/parallax-demon-woods-mid-trees.png";
const imageClose = "/parallax_demon_woods_pack/parallax_demon_woods_pack/layers/parallax-demon-woods-close-trees.png";

// Inline styles mimicking the example's SCSS
const rootStyle: React.CSSProperties = {
	position: "relative",
	backgroundColor: "black",
	width: "300vw",
	height: "100vh",
	overflow: "hidden",
};
const layerStyle: React.CSSProperties = {
	position: "absolute",
	top: 0,
	bottom: 0,
	backgroundSize: "auto 100%",
	backgroundRepeat: "repeat-x",
	height: "100vh",
};
const artistStyle: React.CSSProperties = {
	position: "fixed",
	right: 10,
	bottom: 10,
	textAlign: "right",
	color: "rgb(190, 102, 87)",
	fontFamily: "monospace",
	zIndex: 10,
	fontSize: 16,
};


function ParallaxLayers() {
	const target = useRef<HTMLDivElement>(null);
	const mid = useParallax({ speed: 50, targetElement: target.current ?? undefined });
	const close = useParallax({ speed: 100, targetElement: target.current ?? undefined });

	// These values extend the mid/close layers for a wider effect
	const midExtend = 50 * 5 * -1;
	const closeExtend = 100 * 5 * -1;

	return (
		<div
			ref={target}
			style={{ ...rootStyle, minWidth: "1200px" }}
			className="overflow-x-auto overflow-y-hidden rounded-xl border border-amber-900 shadow-2xl mx-auto"
			tabIndex={0}
		>
			<div
				style={{ ...layerStyle, backgroundImage: `url(${imageBg})`, left: 0, right: 0, zIndex: 1 }}
			/>
			<div
				style={{ ...layerStyle, backgroundImage: `url(${imageFar})`, left: 0, right: 0, zIndex: 2 }}
			/>
			<div
				style={{ ...layerStyle, backgroundImage: `url(${imageMid})`, left: midExtend, right: midExtend, zIndex: 3 }}
				ref={mid.ref as React.Ref<HTMLDivElement>}
			/>
			<div
				style={{ ...layerStyle, backgroundImage: `url(${imageClose})`, left: closeExtend, right: closeExtend, zIndex: 4 }}
				ref={close.ref as React.Ref<HTMLDivElement>}
			/>
		</div>
	);
}

export default function ParallaxDemoWord() {
	return (
		<ParallaxProvider scrollAxis="horizontal">
			<a
				target="_blank"
				href="https://aethrall.itch.io/"
				style={artistStyle}
				rel="noopener noreferrer"
			>
				Art by Aethrall
			</a>
			<ParallaxLayers />
		</ParallaxProvider>
	);
}
