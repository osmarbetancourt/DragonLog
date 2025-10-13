const MUSIC_URL = "/audio/DragonLog_theme.mp3";

let audioContext: AudioContext | null = null;
let musicBuffer: AudioBuffer | null = null;
let musicGain: GainNode | null = null;
let musicSource: AudioBufferSourceNode | null = null;
let isPlaying = false;
let fadeTimeout: number | null = null;

const listeners = new Set<(playing: boolean) => void>();

const notify = () => {
  listeners.forEach(listener => {
    try {
      listener(isPlaying);
    } catch (_error) {
      /* listener failure ignored */
    }
  });
};

const ensureContext = async () => {
  if (typeof window === "undefined") {
    return null;
  }
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }
  return audioContext;
};

const loadMusicBuffer = async (context: AudioContext) => {
  if (musicBuffer) {
    return musicBuffer;
  }
  const response = await fetch(MUSIC_URL);
  const arrayBuffer = await response.arrayBuffer();
  musicBuffer = await context.decodeAudioData(arrayBuffer);
  return musicBuffer;
};

const teardown = () => {
  if (musicSource) {
    try {
      musicSource.stop();
    } catch (_error) {
      /* source already stopped */
    }
    musicSource.disconnect();
    musicSource = null;
  }
  musicGain?.disconnect();
  musicGain = null;
  if (fadeTimeout !== null) {
    window.clearTimeout(fadeTimeout);
    fadeTimeout = null;
  }
  const wasPlaying = isPlaying;
  isPlaying = false;
  if (wasPlaying) {
    notify();
  }
};

export const startAmbient = async () => {
  if (isPlaying) {
    return;
  }
  const context = await ensureContext();
  if (!context) {
    return;
  }
  const buffer = await loadMusicBuffer(context);
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  const gain = context.createGain();
  gain.gain.value = 0;

  source.connect(gain);
  gain.connect(context.destination);

  source.start();

  const now = context.currentTime;
  gain.gain.cancelScheduledValues(now);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.7, now + 3.2);

  musicSource = source;
  musicGain = gain;
  isPlaying = true;
  notify();
};

export const stopAmbient = () => {
  if (!musicGain && !musicSource) {
    return;
  }
  if (!audioContext) {
    teardown();
    return;
  }
  const now = audioContext.currentTime;
  musicGain?.gain.cancelScheduledValues(now);
  musicGain?.gain.linearRampToValueAtTime(0, now + 1.6);

  if (isPlaying) {
    isPlaying = false;
    notify();
  }

  if (fadeTimeout !== null) {
    window.clearTimeout(fadeTimeout);
  }
  fadeTimeout = window.setTimeout(() => {
    teardown();
  }, 1800);
};

export const subscribeAmbient = (listener: (playing: boolean) => void) => {
  listeners.add(listener);
  listener(isPlaying);
  return () => {
    listeners.delete(listener);
  };
};

export const getAmbientState = () => isPlaying;
