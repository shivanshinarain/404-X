import React, { createContext, useContext, useEffect, useRef } from "react";

const SoundContext = createContext();

export function SoundProvider({ children }) {
  const audioCtxRef = useRef(null);
  const lastTouchTimeRef = useRef(0);

  // Initialize or resume AudioContext safely
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  };

  // Tactile touch click sound on every touch/tap/click anywhere on the website
  const playTouch = () => {
    const now = Date.now();
    if (now - lastTouchTimeRef.current < 40) return;
    lastTouchTimeRef.current = now;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      const startTime = ctx.currentTime;
      osc.frequency.setValueAtTime(820, startTime);
      osc.frequency.exponentialRampToValueAtTime(260, startTime + 0.04);

      gain.gain.setValueAtTime(0.45, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.045);
    } catch {}
  };

  // Distinct signature sound for "404ØX" brand
  const playBrandSound = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;

      // 1. Resonant sub-bass impact drop (110Hz -> 45Hz)
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(110, now);
      subOsc.frequency.exponentialRampToValueAtTime(45, now + 0.45);
      subGain.gain.setValueAtTime(0.65, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.46);

      // 2. Futuristic holographic rising celestial arpeggio
      const brandArp = [
        { freq: 293.66, t: 0.0 },  // D4
        { freq: 440.0,  t: 0.07 }, // A4
        { freq: 587.33, t: 0.14 }, // D5
        { freq: 739.99, t: 0.21 }, // F#5
        { freq: 880.0,  t: 0.28 }, // A5
        { freq: 1174.66,t: 0.35 }, // D6
      ];

      brandArp.forEach(({ freq, t }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + t);
        gain.gain.setValueAtTime(0.55, now + t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + t);
        osc.stop(now + t + 0.42);
      });

      // 3. Shimmer overtone bell
      const bellOsc = ctx.createOscillator();
      const bellGain = ctx.createGain();
      bellOsc.type = "triangle";
      bellOsc.frequency.setValueAtTime(1480, now + 0.35);
      bellGain.gain.setValueAtTime(0.35, now + 0.35);
      bellGain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);
      bellOsc.connect(bellGain);
      bellGain.connect(ctx.destination);
      bellOsc.start(now + 0.35);
      bellOsc.stop(now + 0.86);
    } catch {}
  };

  // Distinct sound for "About us"
  const playAboutSound = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      const now = ctx.currentTime;

      // Warm harmonic double chime (F4 + C5)
      [349.23, 523.25].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        gain.gain.setValueAtTime(0.5, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.32);
      });
    } catch {}
  };

  // Distinct sound for "Services"
  const playServicesSound = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      const now = ctx.currentTime;

      // High-tech ascending triplet (D4 -> F#4 -> A4 -> D5)
      [293.66, 369.99, 440.0, 587.33].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        gain.gain.setValueAtTime(0.45, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.26);
      });
    } catch {}
  };

  // Distinct sound for "Work"
  const playWorkSound = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      const now = ctx.currentTime;

      [329.63, 659.25].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        gain.gain.setValueAtTime(0.5, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.32);
      });
    } catch {}
  };

  // Distinct sound for "Clients"
  const playClientsSound = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      const now = ctx.currentTime;

      [392.0, 587.33].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        gain.gain.setValueAtTime(0.5, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.28);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.3);
      });
    } catch {}
  };

  // Distinct sound for "Contact" / "Let's Talk"
  const playContactSound = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      const now = ctx.currentTime;

      [440.0, 554.37, 659.25].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.55, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.36);
      });
    } catch {}
  };

  const playClick = () => {
    playTouch();
  };

  // Global touch / click listener to play touch sound anywhere on the page
  useEffect(() => {
    const handleGesture = () => {
      getAudioContext();
    };

    const handlePointerDown = (e) => {
      handleGesture();
      // Do not double-play click if clicking on an interactive element with its own sound
      const target = e.target;
      const isCustomSound = target.closest(
        ".brand, [href='#about'], [href='#services'], [href='#cases'], [href='#clients'], .nav-cta, .mascot, .ticker span"
      );
      if (!isCustomSound) {
        playTouch();
      }
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("touchstart", handleGesture, { passive: true });
    window.addEventListener("click", handleGesture, { passive: true });
    window.addEventListener("keydown", handleGesture, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("touchstart", handleGesture);
      window.removeEventListener("click", handleGesture);
      window.removeEventListener("keydown", handleGesture);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <SoundContext.Provider
      value={{
        soundEnabled: true,
        volume: 1.0,
        playTouch,
        playClick,
        playBrandSound,
        playAboutSound,
        playServicesSound,
        playWorkSound,
        playClientsSound,
        playContactSound,
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
      soundEnabled: true,
      volume: 1.0,
      playTouch: () => {},
      playClick: () => {},
      playBrandSound: () => {},
      playAboutSound: () => {},
      playServicesSound: () => {},
      playWorkSound: () => {},
      playClientsSound: () => {},
      playContactSound: () => {},
    };
  }
  return context;
}
