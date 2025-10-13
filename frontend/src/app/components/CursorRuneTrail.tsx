"use client";

import React, { useEffect, useRef, useState } from "react";

const TAIL_LENGTH = 12;
const LERP_FACTOR = 0.28;
const NOISE_FACTOR = 0.18;

export default function CursorRuneTrail() {
  const layerRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<Array<HTMLSpanElement | null>>(Array(TAIL_LENGTH).fill(null));
  const pointerRef = useRef({ x: 0, y: 0 });
  const velocitiesRef = useRef(Array.from({ length: TAIL_LENGTH }, () => ({ x: 0, y: 0 })));
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) {
      return;
    }

    document.body.classList.add("cursor-rune-active");
    setIsActive(true);

    pointerRef.current.x = window.innerWidth / 2;
    pointerRef.current.y = window.innerHeight / 2;

    const positions = Array.from({ length: TAIL_LENGTH }, (_, index) => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      alpha: Math.max(0.25, 1 - index * 0.08),
      scale: 1 - index * 0.05,
    }));
    const noiseSeeds = Array.from({ length: TAIL_LENGTH }, (_, index) => Math.random() * (index + 1));

    const updateNode = (node: HTMLSpanElement, index: number) => {
      const point = positions[index];
      const velocity = velocitiesRef.current[index];
      node.style.opacity = `${point.alpha}`;
      const offset = 11;
      node.style.transform = `translate3d(${point.x - offset}px, ${point.y - offset}px, 0) scale(${point.scale}) rotate(${velocity.x * 12}deg)`;
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current.x = event.clientX;
      pointerRef.current.y = event.clientY;
      const target = event.target as HTMLElement | null;
      if (target && target.closest("[data-rune-reactive]")) {
        document.body.classList.add("cursor-rune-flare");
      } else {
        document.body.classList.remove("cursor-rune-flare");
      }
    };

    const handlePointerDown = () => {
      velocitiesRef.current.forEach(velocity => {
        velocity.x *= 1.2;
        velocity.y *= 1.2;
      });
    };

    const handlePointerOut = (event: PointerEvent) => {
      const related = event.relatedTarget as HTMLElement | null;
      if (!related || !related.closest("[data-rune-reactive]")) {
        document.body.classList.remove("cursor-rune-flare");
      }
    };

    const animate = (time: number) => {
      const pointer = pointerRef.current;
      positions.forEach((point, index) => {
        const target = index === 0 ? pointer : positions[index - 1];
        point.x += (target.x - point.x) * LERP_FACTOR;
        point.y += (target.y - point.y) * LERP_FACTOR;

        const velocity = velocitiesRef.current[index];
        velocity.x = target.x - point.x;
        velocity.y = target.y - point.y;

        const noise = Math.sin((noiseSeeds[index] + time * 0.0012) % (Math.PI * 2)) * NOISE_FACTOR * (index + 1);
        point.x += noise;
        point.y += noise * 0.4;
      });

      nodeRefs.current.forEach((node, index) => {
        if (!node) {
          return;
        }
        updateNode(node, index);
      });

      animationFrame = window.requestAnimationFrame(animate);
    };

    const resize = () => {
      positions.forEach(point => {
        point.x = window.innerWidth / 2;
        point.y = window.innerHeight / 2;
      });
    };

    let animationFrame = window.requestAnimationFrame(animate);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("resize", resize);
    window.addEventListener("pointerout", handlePointerOut, { passive: true });

    return () => {
      document.body.classList.remove("cursor-rune-active");
      document.body.classList.remove("cursor-rune-flare");
      setIsActive(false);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerout", handlePointerOut);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      className="cursor-rune-layer"
      ref={layerRef}
      aria-hidden="true"
      style={isActive ? undefined : { display: "none" }}
    >
      <style>{`
        .cursor-rune-active {
          cursor: none !important;
        }
        .cursor-rune-layer {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 120;
          mix-blend-mode: screen;
        }
        .cursor-rune-node {
          position: absolute;
          top: 0;
          left: 0;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          opacity: 0;
          background: radial-gradient(circle, rgba(255, 220, 150, 0.8) 0%, rgba(255, 148, 64, 0.45) 45%, rgba(120, 48, 12, 0.1) 72%, rgba(30, 10, 4, 0) 100%);
          box-shadow: 0 0 18px rgba(255, 170, 90, 0.55), 0 0 36px rgba(80, 140, 255, 0.18);
          transform: translate3d(0, 0, 0) scale(0);
          transition: opacity 0.2s ease;
          will-change: transform;
        }
        .cursor-rune-node::after {
          content: "";
          position: absolute;
          inset: 22%;
          border-radius: 50%;
          border: 1px solid rgba(255, 210, 180, 0.4);
          box-shadow: inset 0 0 12px rgba(255, 210, 180, 0.45);
          mix-blend-mode: overlay;
        }
        body.cursor-rune-flare .cursor-rune-node {
          background: radial-gradient(circle, rgba(255, 236, 190, 0.95) 0%, rgba(255, 178, 92, 0.55) 45%, rgba(140, 68, 22, 0.12) 72%, rgba(40, 16, 6, 0) 100%);
          box-shadow: 0 0 22px rgba(255, 208, 140, 0.75), 0 0 46px rgba(110, 180, 255, 0.28);
        }
      `}</style>
      {Array.from({ length: TAIL_LENGTH }).map((_, index) => (
        <span
          key={`cursor-rune-node-${index}`}
          className="cursor-rune-node"
          ref={element => {
            nodeRefs.current[index] = element;
          }}
        />
      ))}
    </div>
  );
}
