"use client";

import React, { useEffect, useRef, useState } from "react";

const NOISE_BUFFER_DURATION = 4;

export default function AmbientAudioToggle() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourcesRef = useRef<{
    gain?: GainNode;
    oscillators: OscillatorNode[];
    noise?: AudioBufferSourceNode;
    lfoGain?: GainNode;
  }>({ oscillators: [] });
  const [enabled, setEnabled] = useState(false);
  const [initialised, setInitialised] = useState(false);

  useEffect(() => {
    return () => {
      if (sourcesRef.current.noise) {
        sourcesRef.current.noise.stop();
      }
      sourcesRef.current.oscillators.forEach(oscillator => oscillator.stop());
      sourcesRef.current.lfoGain?.disconnect();
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => undefined);
      }
    };
  }, []);

  const ensureContext = async () => {
    if (typeof window === "undefined") {
      return null;
    }
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    const context = audioContextRef.current;
    if (context.state === "suspended") {
      await context.resume();
    }
    return context;
  };

  const createNoiseBuffer = (context: AudioContext) => {
    const buffer = context.createBuffer(1, context.sampleRate * NOISE_BUFFER_DURATION, context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * 0.4;
    }
    return buffer;
  };

  const stopSound = () => {
    const { noise, oscillators, gain, lfoGain } = sourcesRef.current;
    if (gain) {
      const ctx = audioContextRef.current;
      if (ctx) {
        const now = ctx.currentTime;
        gain.gain.cancelScheduledValues(now);
        gain.gain.linearRampToValueAtTime(0, now + 1.6);
        window.setTimeout(() => {
          oscillators.forEach(oscillator => {
            try {
              oscillator.stop();
            } catch (_error) {
              /* oscillator already stopped */
            }
            oscillator.disconnect();
          });
          if (noise) {
            try {
              noise.stop();
            } catch (_error) {
              /* source already stopped */
            }
            noise.disconnect();
          }
          lfoGain?.disconnect();
          gain.disconnect();
          sourcesRef.current = { oscillators: [] };
        }, 1800);
      }
    } else {
      oscillators.forEach(oscillator => {
        try {
          oscillator.stop();
        } catch (_error) {
          /* oscillator already stopped */
        }
        oscillator.disconnect();
      });
      if (noise) {
        try {
          noise.stop();
        } catch (_error) {
          /* source already stopped */
        }
        noise.disconnect();
      }
      lfoGain?.disconnect();
      sourcesRef.current = { oscillators: [] };
    }
  };

  const startSound = async () => {
    const context = await ensureContext();
    if (!context) {
      return;
    }

    const gain = context.createGain();
    gain.gain.value = 0;
    gain.connect(context.destination);

    const baseOsc = context.createOscillator();
    baseOsc.type = "sine";
    baseOsc.frequency.value = 48;

    const overtone = context.createOscillator();
    overtone.type = "triangle";
    overtone.frequency.value = 96;

    const slowOsc = context.createOscillator();
    slowOsc.type = "sine";
    slowOsc.frequency.value = 0.08;

    const lfoGain = context.createGain();
    lfoGain.gain.value = 12;
    slowOsc.connect(lfoGain);
    lfoGain.connect(baseOsc.frequency);

    const noiseSource = context.createBufferSource();
    noiseSource.buffer = createNoiseBuffer(context);
    noiseSource.loop = true;

    const noiseGain = context.createGain();
    noiseGain.gain.value = 0.08;
    noiseSource.connect(noiseGain);

    baseOsc.connect(gain);
    overtone.connect(gain);
    noiseGain.connect(gain);

    baseOsc.start();
    overtone.start();
    slowOsc.start();
    noiseSource.start();

    const now = context.currentTime;
    gain.gain.linearRampToValueAtTime(0.28, now + 3.5);

    sourcesRef.current = {
      gain,
      oscillators: [baseOsc, overtone, slowOsc],
      noise: noiseSource,
      lfoGain,
    };
  };

  const handleToggle = async () => {
    if (!enabled) {
      await startSound();
      setEnabled(true);
      setInitialised(true);
    } else {
      setEnabled(false);
      stopSound();
    }
  };

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
