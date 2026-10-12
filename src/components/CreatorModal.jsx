import React, { useEffect, useState } from "react";
import { useSound } from "../context/SoundContext";
import "../styles/CreatorModal.css";

export default function CreatorModal({ forceOpen, onToggle }) {
  const { playClick, playContactSound } = useSound();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed modal in this session
    const hasSeen = sessionStorage.getItem("404ox_creator_popup_seen");
    if (!hasSeen) {
      // Pop up smoothly after initial page load
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 750);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen to external toggle if passed
  useEffect(() => {
    if (typeof forceOpen === "boolean") {
      setIsOpen(forceOpen);
    }
  }, [forceOpen]);

  // Handle escape key to dismiss
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    playClick();
    setIsOpen(false);
    sessionStorage.setItem("404ox_creator_popup_seen", "true");
    if (onToggle) onToggle(false);
  };

  const openWhatsApp = () => {
    playContactSound();
    const msg = encodeURIComponent(
      "Hi Shivanshi! I saw your welcome note on 404ØX Studio and would love to connect."
    );
    window.open(`https://wa.me/919196299954?text=${msg}`, "_blank", "noopener,noreferrer");
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="creator-modal-backdrop"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome from Founder of 404ØX"
    >
      <div
        className="creator-modal-card"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking card
      >
        {/* Top-Right Dismiss Button */}
        <button
          type="button"
          className="creator-close-btn"
          onClick={handleClose}
          aria-label="Close welcome message"
          title="Close (Esc)"
        >
          ✕
        </button>

        {/* LEFT COLUMN: Founder Portrait & Brand Gold Backdrop */}
        <div className="creator-left-column">
          <div className="creator-top-chip">
            <span>✳</span>
            <span>FOUNDER & CREATOR</span>
          </div>

          <div className="creator-photo-frame">
            <img
              src="/founder.jpg"
              alt="Shivanshi Narain — Creator and Founder of 404ØX"
              className="creator-photo-img"
              loading="eager"
            />
          </div>

          <div className="creator-caption-pill">
            <span className="creator-name">SHIVANSHI NARAIN</span>
            <span className="creator-role">FOUNDER · 404ØX STUDIO</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Friendly Greeting, Personal Message & Socials */}
        <div className="creator-right-column">
          <h2 className="creator-greeting">Howdy! 👋</h2>

          <p className="creator-message">
            Thank you so much for getting here! I’m <strong>Shivanshi</strong>, creator and founder of <strong>404ØX</strong>. I’d really love to get in touch with you to hear your vision, discuss your next project, or just say hello! 😃
          </p>

          <div className="reach-label">
            <span>REACH ME ON</span>
          </div>

          {/* Social Reach Icon Pills */}
          <div className="reach-icons-grid" aria-label="Direct contact channels">
            {/* WhatsApp */}
            <a
              href="https://wa.me/919196299954"
              target="_blank"
              rel="noreferrer"
              className="reach-icon-btn"
              onClick={playContactSound}
              title="Chat directly on WhatsApp (+91 91962 99954)"
            >
              <span className="reach-icon-svg" aria-hidden="true">💬</span>
              <span className="reach-icon-name">CHAT</span>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="reach-icon-btn"
              onClick={playClick}
              title="Follow 404ØX on Instagram"
            >
              <span className="reach-icon-svg" aria-hidden="true">📸</span>
              <span className="reach-icon-name">INSTA</span>
            </a>

            {/* Email */}
            <a
              href="mailto:hello@404ox.studio"
              className="reach-icon-btn"
              onClick={playClick}
              title="Email directly at hello@404ox.studio"
            >
              <span className="reach-icon-svg" aria-hidden="true">✉️</span>
              <span className="reach-icon-name">EMAIL</span>
            </a>

            {/* Direct Hotline Call */}
            <a
              href="tel:+919196299954"
              className="reach-icon-btn"
              onClick={playClick}
              title="Call studio direct hotline"
            >
              <span className="reach-icon-svg" aria-hidden="true">📞</span>
              <span className="reach-icon-name">CALL</span>
            </a>
          </div>

          {/* Primary Action Buttons */}
          <div className="creator-actions">
            <button
              type="button"
              className="creator-chat-btn"
              onClick={openWhatsApp}
              title="Start WhatsApp conversation"
            >
              <span>💬 CHAT ON WHATSAPP</span>
              <span>↗</span>
            </button>

            <button
              type="button"
              className="creator-skip-btn"
              onClick={handleClose}
              title="Enter 404ØX studio website"
            >
              <span>EXPLORE STUDIO →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
