import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSound } from "../context/SoundContext";
import SoundBar from "../components/SoundBar";
import "../styles/PortalAdmin.css";

export default function AdminDashboard() {
  const { user, projects, auditLogs, login, logout, addProject, updateProjectStatus, addProjectFile } = useAuth();
  const { playClick, playSuccess } = useSound();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // Project creation modal state
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newClientName, setNewClientName] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");
  const [newService, setNewService] = useState("Website Building");
  const [newBudget, setNewBudget] = useState("$12,000");

  // File upload modal state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedProjForUpload, setSelectedProjForUpload] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("14.2 MB");

  const isAdmin = user && user.role === "admin";

  const handleLogin = (e) => {
    e.preventDefault();
    playClick();
    login(email || "admin@404ox.studio", password || "admin123", "admin");
    playSuccess();
  };

  const handleDemoAdmin = () => {
    playClick();
    login("admin@404ox.studio", "admin123", "admin");
    playSuccess();
  };

  const handleLogout = () => {
    playClick();
    logout();
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    playClick();
    addProject({
      title: newTitle,
      clientName: newClientName || "New Client Co.",
      clientEmail: newClientEmail || "client@company.com",
      service: newService,
      budget: newBudget,
      progress: 15,
      status: "In Production",
    });
    playSuccess();
    setShowNewProjectModal(false);
    setNewTitle("");
    setNewClientName("");
    setNewClientEmail("");
  };

  const handleUploadFile = (e) => {
    e.preventDefault();
    if (!fileName.trim() || !selectedProjForUpload) return;
    playClick();
    addProjectFile(selectedProjForUpload, {
      name: fileName,
      size: fileSize,
      type: "deliverable",
    });
    playSuccess();
    setShowUploadModal(false);
    setFileName("");
  };

  // If not logged in as admin
  if (!isAdmin) {
    return (
      <div className="portal-admin-wrapper">
        <header className="portal-navbar">
          <Link to="/" className="portal-brand" onClick={playClick}>
            <span className="portal-logo-tag">404ØX</span>
            <span className="portal-badge" style={{ background: "rgba(239, 177, 29, 0.15)", color: "#b57a00", borderColor: "rgba(239, 177, 29, 0.4)" }}>
              ADMIN CONSOLE
            </span>
          </Link>
          <div className="portal-nav-actions">
            <SoundBar />
            <Link to="/" className="portal-btn-ghost" onClick={playClick}>
              ← BACK TO STUDIO
            </Link>
          </div>
        </header>

        <main className="dashboard-container" style={{ display: "grid", placeItems: "center" }}>
          <div className="auth-container">
            <div className="auth-header">
              <span className="portal-badge" style={{ background: "rgba(228, 61, 18, 0.1)", color: "var(--portal-vermilion)", marginBottom: "8px" }}>
                RESTRICTED ACCESS
              </span>
              <h1 className="auth-title">ADMIN LOGIN</h1>
              <p className="auth-subtitle">Private operations control, project CRM, analytics & security auditing.</p>
            </div>

            <form className="auth-form" onSubmit={handleLogin}>
              <div className="form-field">
                <label htmlFor="admin-email">ADMINISTRATOR EMAIL</label>
                <input
                  id="admin-email"
                  type="email"
                  placeholder="admin@404ox.studio"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="admin-password">SECURITY MASTER KEY</label>
                <input
                  id="admin-password"
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="portal-btn-solid" style={{ width: "100%", justifyContent: "center", padding: "13px" }}>
                <span>AUTHORIZE CONSOLE</span>
                <span>↗</span>
              </button>
            </form>

            <div className="demo-account-box">
              <p>INSTANT DEMO PREVIEW</p>
              <button type="button" className="demo-quick-btn" onClick={handleDemoAdmin}>
                ⚡ ONE-CLICK DEMO ADMIN LOGIN (Studio Director)
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="portal-admin-wrapper">
      <header className="portal-navbar">
        <Link to="/" className="portal-brand" onClick={playClick}>
          <span className="portal-logo-tag">404ØX</span>
          <span className="portal-badge" style={{ background: "rgba(228, 61, 18, 0.1)", color: "var(--portal-vermilion)" }}>
            ADMIN CENTER
          </span>
        </Link>
        <div className="portal-nav-actions">
          <SoundBar />
          <span style={{ fontSize: "0.75rem", fontFamily: "var(--mono)", fontWeight: 700 }}>
            ⚡ {user.name} ({user.email})
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
        {/* Top Header */}
        <section className="dashboard-hero">
          <div className="dashboard-title-group">
            <span className="portal-badge" style={{ marginBottom: "8px" }}>INTERNAL MANAGEMENT · 404ØX STUDIO</span>
            <h1>ADMIN OPERATIONS CONSOLE</h1>
            <p>Manage active client accounts, monitor real-time website traffic, and review security logs.</p>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              type="button"
              className="portal-btn-solid"
              onClick={() => { playClick(); setShowNewProjectModal(true); }}
            >
              <span>+ NEW CLIENT PROJECT</span>
            </button>
            <button
              type="button"
              className="portal-btn-ghost"
              onClick={() => {
                if (projects.length > 0) {
                  setSelectedProjForUpload(projects[0].id);
                  setShowUploadModal(true);
                  playClick();
                }
              }}
            >
              <span>↑ UPLOAD DELIVERABLE</span>
            </button>
          </div>
        </section>

        {/* Studio KPI Cards */}
        <section className="metrics-row">
          <div className="metric-stat-card">
            <span className="metric-stat-label">TOTAL REVENUE (Q3)</span>
            <span className="metric-stat-value">$184,200</span>
            <span className="metric-stat-badge">↑ +24% vs last quarter</span>
          </div>
          <div className="metric-stat-card">
            <span className="metric-stat-label">ACTIVE PROJECTS</span>
            <span className="metric-stat-value">{projects.length}</span>
            <span className="metric-stat-badge">Across 13 Global Partners</span>
          </div>
          <div className="metric-stat-card">
            <span className="metric-stat-label">AVG CONVERSION RATE</span>
            <span className="metric-stat-value">8.4%</span>
            <span className="metric-stat-badge">Landing page enquiries</span>
          </div>
          <div className="metric-stat-card">
            <span className="metric-stat-label">SECURITY INCIDENTS</span>
            <span className="metric-stat-value">0</span>
            <span className="metric-stat-badge" style={{ color: "#b57a00" }}>All shields operational</span>
          </div>
        </section>

        {/* Tab Selection */}
        <div className="dash-tabs">
          <button
            type="button"
            className={`dash-tab-btn ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => { playClick(); setActiveTab("overview"); }}
          >
            📊 PROJECT MANAGEMENT & CRM ({projects.length})
          </button>
          <button
            type="button"
            className={`dash-tab-btn ${activeTab === "analytics" ? "active" : ""}`}
            onClick={() => { playClick(); setActiveTab("analytics"); }}
          >
            📈 WEBSITE ANALYTICS & TELEMETRY
          </button>
          <button
            type="button"
            className={`dash-tab-btn ${activeTab === "security" ? "active" : ""}`}
            onClick={() => { playClick(); setActiveTab("security"); }}
          >
            🛡️ SECURITY MONITORING & AUDIT LOGS ({auditLogs.length})
          </button>
        </div>

        {/* TAB 1: PROJECT MANAGEMENT */}
        {activeTab === "overview" && (
          <section className="projects-grid">
            {projects.map((proj) => (
              <article key={proj.id} className="project-dash-card">
                <div className="project-card-header">
                  <div>
                    <span style={{ fontSize: "0.62rem", fontFamily: "var(--mono)", fontWeight: 700, color: "var(--portal-vermilion)" }}>
                      {proj.service} · {proj.budget}
                    </span>
                    <h3>{proj.title}</h3>
                    <small style={{ color: "rgba(28, 10, 8, 0.6)", fontSize: "0.72rem" }}>
                      Client: {proj.clientName} ({proj.clientEmail})
                    </small>
                  </div>
                  <span className={`project-status-pill ${
                    proj.status === "Completed"
                      ? "status-completed"
                      : proj.status === "Client Review"
                      ? "status-client-review"
                      : "status-in-production"
                  }`}>
                    ● {proj.status.toUpperCase()}
                  </span>
                </div>

                {/* Progress adjustor */}
                <div className="progress-track-wrapper">
                  <div className="progress-meta">
                    <span>STAGE PROGRESS: {proj.progress}%</span>
                    <span>DUE: {proj.dueDate}</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${proj.progress}%` }} />
                  </div>
                </div>

                {/* Admin Quick Status Update */}
                <div style={{ background: "#fbf9f5", padding: "12px", borderRadius: "10px", border: "1px solid rgba(228, 61, 18, 0.1)" }}>
                  <label style={{ display: "block", fontFamily: "var(--mono)", fontSize: "0.62rem", fontWeight: 700, marginBottom: "6px" }}>
                    UPDATE PRODUCTION STAGE:
                  </label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <select
                      value={proj.status}
                      onChange={(e) => {
                        playClick();
                        updateProjectStatus(proj.id, e.target.value, proj.progress);
                      }}
                      style={{ flex: 1, padding: "6px 10px", borderRadius: "8px", border: "1px solid var(--portal-border)", fontSize: "0.75rem" }}
                    >
                      <option value="In Production">In Production</option>
                      <option value="Client Review">Client Review</option>
                      <option value="Completed">Completed</option>
                    </select>

                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={proj.progress}
                      onChange={(e) => updateProjectStatus(proj.id, proj.status, e.target.value)}
                      style={{ width: "65px", padding: "6px 8px", borderRadius: "8px", border: "1px solid var(--portal-border)", fontSize: "0.75rem" }}
                      title="Progress %"
                    />
                  </div>
                </div>

                {/* Deliverables preview */}
                <div className="deliverables-box">
                  <h4>DELIVERABLES ({proj.deliverables.length})</h4>
                  {proj.deliverables.map((d) => (
                    <div key={d.id} className="deliverable-item">
                      <span>{d.completed ? "✓" : "○"}</span>
                      <span>{d.title}</span>
                    </div>
                  ))}
                </div>

                {/* Files attached */}
                <div>
                  <h4 style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", color: "var(--portal-vermilion)", margin: "0 0 8px" }}>
                    ATTACHED FILES ({proj.files.length})
                  </h4>
                  {proj.files.map((f) => (
                    <div key={f.id} className="file-row" style={{ marginBottom: "6px" }}>
                      <span className="file-name">📄 {f.name}</span>
                      <small style={{ color: "rgba(28, 10, 8, 0.5)", fontSize: "0.62rem" }}>{f.size}</small>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </section>
        )}

        {/* TAB 2: WEBSITE ANALYTICS */}
        {activeTab === "analytics" && (
          <div>
            <div className="analytics-grid">
              {/* Traffic Telemetry Card */}
              <div className="analytics-card">
                <div className="analytics-card-header">
                  <div>
                    <h3>REAL-TIME AUDIENCE TELEMETRY</h3>
                    <p style={{ margin: "4px 0 0", fontSize: "0.82rem", color: "rgba(28, 10, 8, 0.6)" }}>
                      Live user sessions, referrers and high-intent engagement.
                    </p>
                  </div>
                  <span className="portal-badge" style={{ background: "rgba(239, 177, 29, 0.2)", color: "#b57a00" }}>
                    ● 28 VISITORS ACTIVE NOW
                  </span>
                </div>

                {/* Visualizer bar graph */}
                <div style={{ height: "180px", display: "flex", alignItems: "flex-end", gap: "12px", borderBottom: "1px solid var(--portal-border)", paddingBottom: "12px", marginBottom: "20px" }}>
                  {[
                    { day: "MON", visits: 65, height: "65%" },
                    { day: "TUE", visits: 82, height: "82%" },
                    { day: "WED", visits: 74, height: "74%" },
                    { day: "THU", visits: 95, height: "95%" },
                    { day: "FRI", visits: 88, height: "88%" },
                    { day: "SAT", visits: 54, height: "54%" },
                    { day: "SUN (TODAY)", visits: 98, height: "98%" },
                  ].map((bar, i) => (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                      <div
                        style={{
                          width: "100%",
                          height: bar.height,
                          background: i === 6 ? "var(--portal-vermilion)" : "rgba(228, 61, 18, 0.2)",
                          borderRadius: "6px 6px 0 0",
                          transition: "height 0.3s ease",
                        }}
                      />
                      <span style={{ fontSize: "0.62rem", fontFamily: "var(--mono)", fontWeight: 700 }}>
                        {bar.day}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", textAlign: "center" }}>
                  <div>
                    <span style={{ fontSize: "0.65rem", fontFamily: "var(--mono)", color: "rgba(28, 10, 8, 0.6)" }}>PAGEVIEWS TODAY</span>
                    <div style={{ fontFamily: "var(--display)", fontSize: "1.6rem", color: "var(--portal-vermilion)" }}>4,819</div>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.65rem", fontFamily: "var(--mono)", color: "rgba(28, 10, 8, 0.6)" }}>AVG SESSION TIME</span>
                    <div style={{ fontFamily: "var(--display)", fontSize: "1.6rem", color: "var(--portal-vermilion)" }}>2m 48s</div>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.65rem", fontFamily: "var(--mono)", color: "rgba(28, 10, 8, 0.6)" }}>BOUNCE RATE</span>
                    <div style={{ fontFamily: "var(--display)", fontSize: "1.6rem", color: "var(--portal-rose)" }}>24.2%</div>
                  </div>
                </div>
              </div>

              {/* Traffic Sources & Countries */}
              <div className="analytics-card">
                <div className="analytics-card-header">
                  <h3>CHANNELS & REGIONS</h3>
                </div>

                <h4 style={{ fontFamily: "var(--mono)", fontSize: "0.68rem", color: "var(--portal-vermilion)", margin: "0 0 10px" }}>
                  ACQUISITION CHANNELS
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
                  {[
                    { source: "Google Organic Search", pct: 44 },
                    { source: "Direct Traffic / Portfolio URL", pct: 28 },
                    { source: "Instagram Reels & Social", pct: 18 },
                    { source: "Client Referrals & Partners", pct: 10 },
                  ].map((ch, idx) => (
                    <div key={idx}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", marginBottom: "3px" }}>
                        <span>{ch.source}</span>
                        <strong>{ch.pct}%</strong>
                      </div>
                      <div style={{ height: "6px", background: "#f0ece1", borderRadius: "99px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${ch.pct}%`, background: "var(--portal-vermilion)" }} />
                      </div>
                    </div>
                  ))}
                </div>

                <h4 style={{ fontFamily: "var(--mono)", fontSize: "0.68rem", color: "var(--portal-vermilion)", margin: "0 0 10px" }}>
                  TOP VISITOR COUNTRIES
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.75rem" }}>
                  <div>🇺🇸 United States — <strong>38%</strong></div>
                  <div>🇬🇧 United Kingdom — <strong>26%</strong></div>
                  <div>🇮🇳 India — <strong>18%</strong></div>
                  <div>🇩🇪 Germany & EU — <strong>18%</strong></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SECURITY MONITORING */}
        {activeTab === "security" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "26px" }}>
              <div className="metric-stat-card">
                <span className="metric-stat-label">TLS / SSL INTEGRITY</span>
                <span className="metric-stat-value" style={{ color: "#b57a00" }}>ACTIVE</span>
                <span className="metric-stat-badge">256-Bit Encrypted Edge Delivery</span>
              </div>
              <div className="metric-stat-card">
                <span className="metric-stat-label">BRUTE FORCE SHIELD</span>
                <span className="metric-stat-value">0 BLOCKED</span>
                <span className="metric-stat-badge">Rate-limit threshold: 100 req/min</span>
              </div>
              <div className="metric-stat-card">
                <span className="metric-stat-label">DATABASE TENANT ISOLATION</span>
                <span className="metric-stat-value">100% RLS</span>
                <span className="metric-stat-badge">Zero cross-client leak risk</span>
              </div>
            </div>

            <div className="analytics-card">
              <div className="analytics-card-header">
                <div>
                  <h3>LIVE SECURITY AUDIT STREAM</h3>
                  <p style={{ margin: "4px 0 0", fontSize: "0.82rem", color: "rgba(28, 10, 8, 0.6)" }}>
                    Real-time authentication, firewall, and token authorization logs.
                  </p>
                </div>
                <button
                  type="button"
                  className="portal-btn-ghost"
                  onClick={() => { playSuccess(); alert("Security audit export downloaded (JSON)."); }}
                >
                  EXPORT LOGS (JSON) ↗
                </button>
              </div>

              <div style={{ overflowX: "auto" }}>
                <table className="security-logs-table">
                  <thead>
                    <tr>
                      <th>TIMESTAMP</th>
                      <th>EVENT TYPE</th>
                      <th>DETAILS</th>
                      <th>IP ADDRESS</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.map((log) => (
                      <tr key={log.id}>
                        <td style={{ color: "rgba(28, 10, 8, 0.55)" }}>{log.timestamp}</td>
                        <td style={{ color: "var(--portal-vermilion)", fontWeight: 700 }}>{log.type}</td>
                        <td style={{ color: "var(--portal-ink)" }}>{log.message}</td>
                        <td style={{ color: "rgba(28, 10, 8, 0.6)" }}>{log.ip}</td>
                        <td>
                          <span className={`log-status-badge ${log.status === "SUCCESS" || log.status === "VERIFIED" ? "SUCCESS" : "SECURE"}`}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: CREATE PROJECT */}
        {showNewProjectModal && (
          <div className="modal-overlay" onClick={() => setShowNewProjectModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3 style={{ fontFamily: "var(--display)", fontSize: "1.8rem", color: "var(--portal-vermilion)", margin: "0 0 16px" }}>
                INITIALIZE NEW CLIENT PROJECT
              </h3>
              <form onSubmit={handleCreateProject} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div className="form-field">
                  <label>PROJECT TITLE</label>
                  <input
                    type="text"
                    placeholder="e.g. AURA Fashion Campaign 2026"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-field">
                  <label>CLIENT COMPANY NAME</label>
                  <input
                    type="text"
                    placeholder="e.g. Aura Global Studio"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-field">
                  <label>CLIENT EMAIL (FOR PORTAL ACCESS)</label>
                  <input
                    type="email"
                    placeholder="e.g. hello@auraglobal.com"
                    value={newClientEmail}
                    onChange={(e) => setNewClientEmail(e.target.value)}
                    required
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div className="form-field">
                    <label>CORE SERVICE</label>
                    <select value={newService} onChange={(e) => setNewService(e.target.value)}>
                      <option value="Website Building">Website Building</option>
                      <option value="App Building">App Building</option>
                      <option value="Video Editing">Video Editing</option>
                      <option value="E-Commerce">E-Commerce</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label>BUDGET CONTRACT</label>
                    <input
                      type="text"
                      placeholder="$12,000"
                      value={newBudget}
                      onChange={(e) => setNewBudget(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
                  <button type="button" className="portal-btn-ghost" onClick={() => setShowNewProjectModal(false)}>
                    CANCEL
                  </button>
                  <button type="submit" className="portal-btn-solid">
                    CREATE & LAUNCH PORTAL ↗
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: UPLOAD FILE */}
        {showUploadModal && (
          <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3 style={{ fontFamily: "var(--display)", fontSize: "1.8rem", color: "var(--portal-vermilion)", margin: "0 0 16px" }}>
                ATTACH DELIVERABLE FILE
              </h3>
              <form onSubmit={handleUploadFile} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div className="form-field">
                  <label>SELECT TARGET PROJECT</label>
                  <select
                    value={selectedProjForUpload}
                    onChange={(e) => setSelectedProjForUpload(e.target.value)}
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>{p.title} ({p.clientName})</option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label>FILE NAME</label>
                  <input
                    type="text"
                    placeholder="e.g. final-master-cut-4k.mp4 or brand-guidelines.fig"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-field">
                  <label>FILE SIZE ESTIMATE</label>
                  <input
                    type="text"
                    placeholder="e.g. 18.5 MB"
                    value={fileSize}
                    onChange={(e) => setFileSize(e.target.value)}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
                  <button type="button" className="portal-btn-ghost" onClick={() => setShowUploadModal(false)}>
                    CANCEL
                  </button>
                  <button type="submit" className="portal-btn-solid">
                    SAVE TO CLIENT REPOSITORY ↗
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
