import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSound } from "../context/SoundContext";
import "../styles/PortalAdmin.css";

export default function ClientPortal() {
  const { user, projects, login, logout, addProjectUpdate } = useAuth();
  const { playClick, playSuccess } = useSound();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("projects");
  const [revisionNote, setRevisionNote] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || "");
  const [submittedMessage, setSubmittedMessage] = useState("");

  const isClient = user && user.role === "client";

  const handleLogin = (e) => {
    e.preventDefault();
    playClick();
    login(email || "client@velox.com", password || "password123", "client");
    playSuccess();
  };

  const handleDemoClient = () => {
    playClick();
    login("client@velox.com", "password123", "client");
    playSuccess();
  };

  const handleLogout = () => {
    playClick();
    logout();
  };

  const handleSendRevision = (e) => {
    e.preventDefault();
    if (!revisionNote.trim()) return;
    playClick();
    addProjectUpdate(selectedProjectId, revisionNote, user?.name || "Client");
    playSuccess();
    setRevisionNote("");
    setSubmittedMessage("Your note has been submitted directly to the studio team!");
    setTimeout(() => setSubmittedMessage(""), 4000);
  };

  const handleDownloadFile = (fileName) => {
    playSuccess();
    alert(`Downloading deliverable: ${fileName}\n(Verified secure token issued)`);
  };

  // If not logged in as client
  if (!isClient) {
    return (
      <div className="portal-admin-wrapper">
        <header className="portal-navbar">
          <Link to="/" className="portal-brand" onClick={playClick}>
            <span className="portal-logo-tag">404ØX</span>
            <span className="portal-badge">CLIENT PORTAL</span>
          </Link>
          <div className="portal-nav-actions">
            <Link to="/" className="portal-btn-ghost" onClick={playClick}>
              ← BACK TO STUDIO
            </Link>
          </div>
        </header>

        <main className="dashboard-container" style={{ display: "grid", placeItems: "center" }}>
          <div className="auth-container">
            <div className="auth-header">
              <span className="portal-badge" style={{ marginBottom: "8px" }}>SECURE ACCESS</span>
              <h1 className="auth-title">CLIENT LOGIN</h1>
              <p className="auth-subtitle">Access your active studio projects, reviews & private deliverables.</p>
            </div>

            <form className="auth-form" onSubmit={handleLogin}>
              <div className="form-field">
                <label htmlFor="client-email">CLIENT EMAIL ADDRESS</label>
                <input
                  id="client-email"
                  type="email"
                  placeholder="name@yourcompany.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="client-password">SECURE ACCESS KEY / PASSWORD</label>
                <input
                  id="client-password"
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="portal-btn-solid" style={{ width: "100%", justifyContent: "center", padding: "13px" }}>
                <span>AUTHENTICATE & ENTER</span>
                <span>↗</span>
              </button>
            </form>

            <div className="demo-account-box">
              <p>INSTANT DEMO PREVIEW</p>
              <button type="button" className="demo-quick-btn" onClick={handleDemoClient}>
                ⚡ ONE-CLICK DEMO CLIENT LOGIN (Velox Studio)
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Filter client projects
  const clientProjects = projects.filter(
    (p) => !user.company || p.clientEmail === user.email || p.clientName.toLowerCase().includes(user.name.toLowerCase()) || projects.indexOf(p) === 0
  );

  return (
    <div className="portal-admin-wrapper">
      <header className="portal-navbar">
        <Link to="/" className="portal-brand" onClick={playClick}>
          <span className="portal-logo-tag">404ØX</span>
          <span className="portal-badge">CLIENT PORTAL</span>
        </Link>
        <div className="portal-nav-actions">
          <span style={{ fontSize: "0.75rem", fontFamily: "var(--mono)", fontWeight: 700 }}>
            {user.avatar} {user.name} ({user.company || "Client"})
          </span>
          <button type="button" className="portal-btn-ghost" onClick={handleLogout}>
            LOGOUT
          </button>
          <Link to="/" className="portal-btn-solid" onClick={playClick}>
            ← STUDIO
          </Link>
        </div>
      </header>

      <main className="dashboard-container">
        {/* Welcome Banner */}
        <section className="dashboard-hero">
          <div className="dashboard-title-group">
            <span className="portal-badge" style={{ marginBottom: "8px" }}>WORKSPACE · {user.company || "CLIENT ACCOUNT"}</span>
            <h1>PROJECT DASHBOARD</h1>
            <p>Track production milestones, review 4K assets, and download approved production files.</p>
          </div>
          <button
            type="button"
            className="portal-btn-solid"
            onClick={() => {
              playClick();
              window.open("https://wa.me/919196299954", "_blank");
            }}
          >
            <span>DIRECT STUDIO HOTLINE</span>
            <span>💬</span>
          </button>
        </section>

        {/* Client KPI Row */}
        <section className="metrics-row">
          <div className="metric-stat-card">
            <span className="metric-stat-label">ACTIVE PROJECTS</span>
            <span className="metric-stat-value">{clientProjects.length}</span>
            <span className="metric-stat-badge">In Production with 404ØX</span>
          </div>
          <div className="metric-stat-card">
            <span className="metric-stat-label">OVERALL PROGRESS</span>
            <span className="metric-stat-value">
              {Math.round(clientProjects.reduce((acc, p) => acc + p.progress, 0) / (clientProjects.length || 1))}%
            </span>
            <span className="metric-stat-badge">On schedule for delivery</span>
          </div>
          <div className="metric-stat-card">
            <span className="metric-stat-label">AVAILABLE FILES</span>
            <span className="metric-stat-value">
              {clientProjects.reduce((acc, p) => acc + p.files.length, 0)}
            </span>
            <span className="metric-stat-badge">Ready for secure download</span>
          </div>
        </section>

        {/* Tab selection */}
        <div className="dash-tabs">
          <button
            type="button"
            className={`dash-tab-btn ${activeTab === "projects" ? "active" : ""}`}
            onClick={() => { playClick(); setActiveTab("projects"); }}
          >
            📂 ACTIVE PROJECTS & FILES ({clientProjects.length})
          </button>
          <button
            type="button"
            className={`dash-tab-btn ${activeTab === "feedback" ? "active" : ""}`}
            onClick={() => { playClick(); setActiveTab("feedback"); }}
          >
            💬 REQUEST REVISION & BRIEF
          </button>
        </div>

        {activeTab === "projects" && (
          <section className="projects-grid">
            {clientProjects.map((project) => (
              <article key={project.id} className="project-dash-card">
                <div className="project-card-header">
                  <div>
                    <span style={{ fontSize: "0.62rem", fontFamily: "var(--mono)", fontWeight: 700, color: "var(--portal-vermilion)" }}>
                      {project.service}
                    </span>
                    <h3>{project.title}</h3>
                  </div>
                  <span className={`project-status-pill ${
                    project.status === "Completed"
                      ? "status-completed"
                      : project.status === "Client Review"
                      ? "status-client-review"
                      : "status-in-production"
                  }`}>
                    ● {project.status.toUpperCase()}
                  </span>
                </div>

                <p style={{ margin: 0, fontSize: "0.82rem", lineHeight: 1.5, color: "rgba(28, 10, 8, 0.72)" }}>
                  {project.description}
                </p>

                {/* Progress bar */}
                <div className="progress-track-wrapper">
                  <div className="progress-meta">
                    <span>STAGE COMPLETION</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${project.progress}%` }} />
                  </div>
                </div>

                {/* Deliverables Checklist */}
                <div className="deliverables-box">
                  <h4>STAGE DELIVERABLES</h4>
                  {project.deliverables.map((deliv) => (
                    <div key={deliv.id} className="deliverable-item">
                      <input
                        type="checkbox"
                        checked={deliv.completed}
                        readOnly
                        className="deliverable-checkbox"
                      />
                      <span style={{ textDecoration: deliv.completed ? "line-through" : "none", opacity: deliv.completed ? 0.7 : 1 }}>
                        {deliv.title}
                      </span>
                    </div>
                  ))}
                </div>

                {/* File Repository */}
                <div>
                  <h4 style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", letterSpacing: "1px", color: "var(--portal-vermilion)", margin: "0 0 8px" }}>
                    APPROVED ASSETS & DELIVERABLES ({project.files.length})
                  </h4>
                  {project.files.length === 0 ? (
                    <p style={{ fontSize: "0.75rem", color: "rgba(28, 10, 8, 0.5)", margin: 0 }}>No files uploaded yet.</p>
                  ) : (
                    <div className="files-list">
                      {project.files.map((file) => (
                        <div key={file.id} className="file-row">
                          <div>
                            <div className="file-name">📄 {file.name}</div>
                            <small style={{ color: "rgba(28, 10, 8, 0.5)", fontSize: "0.62rem" }}>
                              {file.size} · {file.date}
                            </small>
                          </div>
                          <button
                            type="button"
                            className="file-download-btn"
                            onClick={() => handleDownloadFile(file.name)}
                          >
                            DOWNLOAD ↗
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Timeline Feed */}
                <div style={{ borderTop: "1px dashed var(--portal-border)", paddingTop: "12px" }}>
                  <h4 style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", letterSpacing: "1px", color: "rgba(28, 10, 8, 0.6)", margin: "0 0 8px" }}>
                    LATEST STUDIO UPDATES
                  </h4>
                  {project.updates.map((update) => (
                    <div key={update.id} style={{ fontSize: "0.75rem", marginBottom: "6px", color: "rgba(28, 10, 8, 0.8)" }}>
                      <strong style={{ color: "var(--portal-vermilion)" }}>[{update.date}] {update.author}: </strong>
                      {update.text}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </section>
        )}

        {activeTab === "feedback" && (
          <section style={{ maxWidth: "680px", margin: "0 auto", background: "#fff", padding: "34px", borderRadius: "20px", border: "1px solid var(--portal-border)" }}>
            <h3 style={{ fontFamily: "var(--display)", fontSize: "1.8rem", color: "var(--portal-vermilion)", margin: "0 0 8px" }}>
              SUBMIT REVISION OR CHANGE REQUEST
            </h3>
            <p style={{ fontSize: "0.88rem", color: "rgba(28, 10, 8, 0.7)", marginBottom: "20px" }}>
              Your note will be appended directly into the active production sprint timeline.
            </p>

            <form onSubmit={handleSendRevision} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="form-field">
                <label htmlFor="select-project">SELECT PROJECT</label>
                <select
                  id="select-project"
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                >
                  {clientProjects.map((p) => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="revision-note">YOUR FEEDBACK / REVISION DETAILS</label>
                <textarea
                  id="revision-note"
                  rows="5"
                  placeholder="Detail any changes to hooks, pacing, typography, layout, or assets..."
                  value={revisionNote}
                  onChange={(e) => setRevisionNote(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="portal-btn-solid" style={{ width: "max-content", padding: "12px 24px" }}>
                <span>POST TO PRODUCTION TIMELINE</span>
                <span>↗</span>
              </button>

              {submittedMessage && (
                <p style={{ color: "var(--portal-vermilion)", fontWeight: 700, fontSize: "0.82rem", margin: 0 }}>
                  ✓ {submittedMessage}
                </p>
              )}
            </form>
          </section>
        )}
      </main>
    </div>
  );
}
