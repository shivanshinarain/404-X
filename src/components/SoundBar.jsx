import React from "react";
import { useSound } from "../context/SoundContext";

export default function SoundBar() {
  const { soundEnabled, ambientPlaying, toggleSound, toggleAmbient, playClick } = useSound();

  const handleSoundToggle = () => {
    playClick();
    toggleSound();
  };

  const handleAmbientToggle = (e) => {
    e.stopPropagation();
    playClick();
    toggleAmbient();
  };

  return (
    <div
      className="sound-bar"
      onClick={handleSoundToggle}
      title={soundEnabled ? "Sound enabled (Click to mute SFX)" : "Sound muted (Click to enable audio SFX)"}
    >
      <div className="sound-waves">
        <span className={`sound-wave-bar ${soundEnabled ? "active" : ""}`} />
        <span className={`sound-wave-bar ${soundEnabled ? "active" : ""}`} />
        <span className={`sound-wave-bar ${soundEnabled ? "active" : ""}`} />
        <span className={`sound-wave-bar ${soundEnabled ? "active" : ""}`} />
      </div>
      <span>{soundEnabled ? "AUDIO ON" : "AUDIO MUTED"}</span>

      {soundEnabled && (
        <button
          type="button"
          onClick={handleAmbientToggle}
          className={`dock-sound-btn ${ambientPlaying ? "active" : ""}`}
          style={{
            marginLeft: "4px",
            fontSize: "0.6rem",
            padding: "2px 7px",
            background: ambientPlaying ? "var(--portal-vermilion)" : "#f0ece1",
            color: ambientPlaying ? "#fff" : "var(--portal-ink)",
            border: "none",
            borderRadius: "999px",
            cursor: "pointer",
          }}
          title="Toggle Ambient Studio Music Drone"
        >
          {ambientPlaying ? "AMBIENT: ON" : "AMBIENT: OFF"}
        </button>
      )}
    </div>
  );
}
