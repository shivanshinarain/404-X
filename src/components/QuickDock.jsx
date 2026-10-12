import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSound } from "../context/SoundContext";

export default function QuickDock() {
  const navigate = useNavigate();
  const location = useLocation();
  const { soundEnabled, toggleSound, playClick } = useSound();

  const handleNav = (path) => {
    playClick();
    navigate(path);
  };

  const isHome = location.pathname === "/";
  const isPortal = location.pathname.startsWith("/portal");
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <aside className="quick-dock" aria-label="System Quick Switcher">
      <button
        type="button"
        className={`dock-pill ${isHome ? "active" : ""}`}
        onClick={() => handleNav("/")}
        title="View public 404ØX Studio website"
      >
        <span>STUDIO</span>
      </button>

      <button
        type="button"
        className={`dock-pill ${isPortal ? "active" : ""}`}
        onClick={() => handleNav("/portal")}
        title="Client Login & Project Portal"
      >
        <span>PORTAL</span>
      </button>

      <button
        type="button"
        className={`dock-pill ${isAdmin ? "active" : ""}`}
        onClick={() => handleNav("/admin")}
        title="Private Admin Dashboard & Security Center"
      >
        <span>ADMIN</span>
      </button>

      <button
        type="button"
        className="dock-sound-btn"
        onClick={() => {
          playClick();
          toggleSound();
        }}
        title={soundEnabled ? "Mute all audio" : "Enable futuristic sound effects"}
      >
        <span>{soundEnabled ? "🔊" : "🔇"}</span>
      </button>
    </aside>
  );
}
