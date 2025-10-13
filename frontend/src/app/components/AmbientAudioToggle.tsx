"use client";

import React, { useCallback, useEffect, useState } from "react";
import { startAmbient, stopAmbient, subscribeAmbient } from "../audio/ambientAudioManager";

export default function AmbientAudioToggle() {
  const [enabled, setEnabled] = useState(false);
  const [initialised, setInitialised] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeAmbient(playing => {
      setEnabled(playing);
      if (playing) {
        setInitialised(true);
      }
    });
    return unsubscribe;
  }, []);

  const handleToggle = useCallback(async () => {
    if (!enabled) {
      await startAmbient();
      setInitialised(true);
    } else {
      stopAmbient();
    }
  }, [enabled]);

  const label = enabled ? "Silence the Ambience" : initialised ? "Summon Ambience" : "Summon Ambience";

  return (
    <button
      type="button"
      className={`ambient-audio-toggle${enabled ? " ambient-audio-toggle--active" : ""}`}
      onClick={handleToggle}
      data-rune-reactive="true"
      aria-pressed={enabled}
    >
      <span aria-live="polite">{label}</span>
    </button>
  );
}
