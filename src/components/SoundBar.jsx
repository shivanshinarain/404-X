import React from "react";
import { useSound } from "../context/SoundContext";

export default function SoundBar() {
  const { soundEnabled, ambientPlaying, toggleSound, playClick } = useSound();

  const handleToggle = () => {
    playClick();
    toggleSound();
  };

  return (
    <button
      type="button"
      className={`sound-bar ${soundEnabled ? "sound-active" : "sound-muted"}`}
      onClick={handleToggle}
      title={soundEnabled ? "Audio 100% Active (Click to mute)" : "Audio Muted (Click to enable)"}
      aria-label="Sound controller"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "7px",
        padding: "6px 13px",
        borderRadius: "999px",
        background: soundEnabled ? "rgba(228, 61, 18, 0.08)" : "#f5f3ed",
        border: soundEnabled ? "1px solid rgba(228, 61, 18, 0.3)" : "1px solid rgba(28, 10, 8, 0.15)",
        color: soundEnabled ? "var(--vermilion, #E43D12)" : "rgba(28, 10, 8, 0.5)",
        fontFamily: "var(--mono, 'Space Grotesk', monospace)",
        fontSize: "0.68rem",
        fontWeight: 800,
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
    >
      <div className="sound-waves" style={{ display: "inline-flex", alignItems: "flex-end", gap: "2.5px", height: "13px" }}>
        <span className={`sound-wave-bar ${soundEnabled ? "active" : ""}`} />
        <span className={`sound-wave-bar ${soundEnabled ? "active" : ""}`} />
        <span className={`sound-wave-bar ${soundEnabled ? "active" : ""}`} />
        <span className={`sound-wave-bar ${soundEnabled ? "active" : ""}`} />
      </div>
      <span style={{ letterSpacing: "0.5px" }}>
        {soundEnabled ? "SOUND 100%" : "MUTED"}
      </span>
    </button>
  );
}
