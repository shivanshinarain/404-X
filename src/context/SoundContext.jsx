import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const SoundContext = createContext();

export function SoundProvider({ children }) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [ambientPlaying, setAmbientPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const audioCtxRef = useRef(null);
  const ambientNodesRef = useRef([]);

  // Initialize AudioContext on first user interaction
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Play a crisp modern futuristic UI click
  const playClick = () => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(volume * 0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio error fallback
    }
  };

  // Play a gentle hover tick
  const playHover = () => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(volume * 0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch {
      // Audio error fallback
    }
  };

  // Play an action success chime (high tech dual-tone)
  const playSuccess = () => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      [587.33, 880].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);

        gain.gain.setValueAtTime(volume * 0.18, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.25);
      });
    } catch {
      // Audio error fallback
    }
  };

  // Ambient generative soundscape using dual harmonic low-pass filtered drones
  const startAmbient = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      stopAmbient();

      const freqs = [110, 164.81, 220]; // A2, E3, A3 warm ambient chord
      const nodes = [];

      freqs.forEach((freq) => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(volume * 0.06, ctx.currentTime + 2.5);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        nodes.push({ osc, gain });
      });

      ambientNodesRef.current = nodes;
      setAmbientPlaying(true);
    } catch {
      // Audio error fallback
    }
  };

  const stopAmbient = () => {
    if (ambientNodesRef.current.length > 0) {
      try {
        const ctx = audioCtxRef.current;
        ambientNodesRef.current.forEach(({ osc, gain }) => {
          if (ctx) {
            gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.8);
            setTimeout(() => {
              try {
                osc.stop();
              } catch {}
            }, 850);
          } else {
            osc.stop();
          }
        });
      } catch {}
      ambientNodesRef.current = [];
    }
    setAmbientPlaying(false);
  };

  const toggleSound = () => {
    getAudioContext();
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    if (!nextState) {
      stopAmbient();
    }
  };

  const toggleAmbient = () => {
    if (!soundEnabled) {
      setSoundEnabled(true);
    }
    if (ambientPlaying) {
      stopAmbient();
    } else {
      startAmbient();
    }
  };

  useEffect(() => {
    return () => {
      stopAmbient();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
        ambientPlaying,
        volume,
        setVolume,
        toggleSound,
        toggleAmbient,
        playClick,
        playHover,
        playSuccess,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    return {
      soundEnabled: false,
      ambientPlaying: false,
      volume: 0.5,
      setVolume: () => {},
      toggleSound: () => {},
      toggleAmbient: () => {},
      playClick: () => {},
      playHover: () => {},
      playSuccess: () => {},
    };
  }
  return context;
}
