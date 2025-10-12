"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type RuneDecodeTextProps = {
  text: string;
  duration?: number;
  revealDelay?: number;
  className?: string;
};

const GLYPH_SOURCE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&";

const getRandomGlyph = () => GLYPH_SOURCE[Math.floor(Math.random() * GLYPH_SOURCE.length)] ?? "*";

export default function RuneDecodeText({
  text,
  duration = 1400,
  revealDelay = 0,
  className,
}: RuneDecodeTextProps) {
  const characters = useMemo(() => text.split(""), [text]);
  const [display, setDisplay] = useState(() =>
    characters.map(char => (char === " " ? " " : "\u00A0")).join("")
  );
  const frameRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const indices = characters
      .map((char, index) => (char.trim() ? index : -1))
      .filter(index => index >= 0);

    if (indices.length === 0) {
      setDisplay(text);
      return () => undefined;
    }

    const shuffled = [...indices].sort(() => Math.random() - 0.5);
    const working = characters.map(char => (char === " " ? " " : getRandomGlyph()));
    let settledCount = 0;
    let start = 0;

    const animate = (timestamp: number) => {
      if (!start) {
        start = timestamp;
      }

      const elapsed = timestamp - start;
      const progress = Math.min(1, elapsed / duration);
      const targetSettled = Math.floor(progress * shuffled.length);

      for (let i = settledCount; i < targetSettled; i += 1) {
        const settledIndex = shuffled[i];
        working[settledIndex] = characters[settledIndex];
      }
      settledCount = targetSettled;

      for (let i = settledCount; i < shuffled.length; i += 1) {
        const scrambleIndex = shuffled[i];
        if (characters[scrambleIndex] !== " ") {
          working[scrambleIndex] = getRandomGlyph();
        }
      }

      setDisplay(working.join(""));

      if (settledCount >= shuffled.length) {
        setDisplay(text);
        return;
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    timeoutRef.current = window.setTimeout(() => {
      frameRef.current = window.requestAnimationFrame(animate);
    }, revealDelay);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [characters, duration, revealDelay, text]);

  return (
    <span className={className} aria-label={text} role="text">
      {display}
    </span>
  );
}
