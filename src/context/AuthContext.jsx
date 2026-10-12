import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const INITIAL_PROJECTS = [
  {
    id: "proj-1",
    title: "VELOX DTC Flagship Store",
    clientEmail: "client@velox.com",
    clientName: "Velox Studio",
    service: "E-Commerce / Storefronts",
    status: "In Production",
    progress: 78,
    dueDate: "2026-11-15",
    budget: "$14,500",
    description: "Custom headless Shopify architecture, 1-click checkout optimization, and interactive lookbook.",
    deliverables: [
      { id: "d1", title: "Custom Shopify Theme Build", completed: true },
      { id: "d2", title: "Cart & Checkout Upsell Flow", completed: true },
      { id: "d3", title: "Speed Optimization (<1.2s LCP)", completed: false },
      { id: "d4", title: "Final QA & Staging Deployment", completed: false },
    ],
    files: [
      { id: "f1", name: "velox-design-tokens-v2.pdf", size: "4.2 MB", date: "Oct 10, 2026", type: "document" },
      { id: "f2", name: "high-converting-product-page.fig", size: "38.5 MB", date: "Oct 11, 2026", type: "design" },
      { id: "f3", name: "staging-deployment-preview.mov", size: "14.1 MB", date: "Oct 12, 2026", type: "video" },
    ],
    updates: [
      { id: "u1", date: "Oct 12, 2026", author: "404ØX Team", text: "Completed custom mobile drawer navigation and optimized image CDN delivery." },
      { id: "u2", date: "Oct 08, 2026", author: "404ØX Team", text: "Approved design systems and locked checkout webhook integrations." },
    ]
  },
  {
    id: "proj-2",
    title: "REELCRAFT High-Retention Ad Engine",
    clientEmail: "client@reelcraft.com",
    clientName: "ReelCraft Media",
    service: "Video Editing / Motion",
    status: "Client Review",
    progress: 92,
    dueDate: "2026-10-24",
    budget: "$8,900",
    description: "Viral short-form Reels suite, dynamic sound design, kinetic captions, and 3 high-converting ad variations.",
    deliverables: [
      { id: "d1", title: "Hook Scripting & Storyboards", completed: true },
      { id: "d2", title: "12x 9:16 Kinetic Video Reels", completed: true },
      { id: "d3", title: "Sound Design & Color Grading", completed: true },
      { id: "d4", title: "Final 4K Master Export", completed: false },
    ],
    files: [
      { id: "f1", name: "reelcraft-cut-batch-01.mp4", size: "185 MB", date: "Oct 11, 2026", type: "video" },
      { id: "f2", name: "sound-sfx-master-track.wav", size: "42 MB", date: "Oct 10, 2026", type: "audio" },
    ],
    updates: [
      { id: "u1", date: "Oct 11, 2026", author: "Lead Editor", text: "Uploaded batch 01 master cut. Awaiting client review on hook pacing." }
    ]
  },
  {
    id: "proj-3",
    title: "SYNTHEX Interactive Agency Web",
    clientEmail: "client@synthex.com",
    clientName: "Synthex Labs",
    service: "Website Building",
    status: "Completed",
    progress: 100,
    dueDate: "2026-10-05",
    budget: "$18,000",
    description: "WebGL fluid physics, responsive Next.js frontend, and GSAP micro-animations with 100/100 performance score.",
    deliverables: [
      { id: "d1", title: "Interactive Canvas & 3D WebGL", completed: true },
      { id: "d2", title: "Next.js Production Build", completed: true },
      { id: "d3", title: "Edge Cloudflare Deployment", completed: true },
      { id: "d4", title: "DNS Handover & Documentation", completed: true },
    ],
    files: [
      { id: "f1", name: "synthex-production-bundle.zip", size: "64.2 MB", date: "Oct 05, 2026", type: "archive" }
    ],
    updates: [
      { id: "u1", date: "Oct 05, 2026", author: "404ØX Team", text: "Successfully launched live on custom domain! All audits passed." }
    ]
  }
];

const INITIAL_LOGS = [
  { id: "log-1", timestamp: "Just now", type: "SEC_SHIELD", message: "TLS 1.3 & HSTS verified on edge server. 0 SSL vulnerabilities detected.", status: "SUCCESS", ip: "127.0.0.1" },
  { id: "log-2", timestamp: "2 mins ago", type: "AUTH_ACTIVITY", message: "Admin authenticated via secure token exchange.", status: "SUCCESS", ip: "192.168.1.104" },
  { id: "log-3", timestamp: "18 mins ago", type: "FIREWALL", message: "Rate-limiting evaluated: 142 public requests handled under 4ms latency.", status: "SECURE", ip: "Various" },
  { id: "log-4", timestamp: "44 mins ago", type: "FILE_ACCESS", message: "Client signed download token generated for velox-design-tokens-v2.pdf.", status: "APPROVED", ip: "172.56.21.9" },
  { id: "log-5", timestamp: "1 hour ago", type: "AUDIT_CHECK", message: "Row-Level Security (RLS) simulation passed with 100% tenant isolation.", status: "VERIFIED", ip: "System" },
  { id: "log-6", timestamp: "3 hours ago", type: "ANALYTICS_SYNC", message: "Real-time telemetry aggregated: 4,819 unique sessions tracked today.", status: "SYNCED", ip: "Edge Worker" }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("404ox_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("404ox_projects");
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem("404ox_logs");
    return saved ? JSON.parse(saved) : INITIAL_LOGS;
  });

  // Sync state to local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem("404ox_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("404ox_user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("404ox_projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("404ox_logs", JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Login handler
  const login = (email, password, forcedRole = null) => {
    let authenticatedUser = null;

    if (forcedRole === "admin" || email.toLowerCase().includes("admin")) {
      authenticatedUser = {
        id: "usr-admin-01",
        email: email || "admin@404ox.studio",
        name: "Studio Director",
        role: "admin",
        avatar: "⚡",
      };
    } else {
      // Default to client
      authenticatedUser = {
        id: "usr-client-01",
        email: email || "client@velox.com",
        name: email.split("@")[0].toUpperCase() || "Velox Studio",
        role: "client",
        company: "Velox Apparel Co.",
        avatar: "💼",
      };
    }

    setUser(authenticatedUser);

    // Append security audit log
    const newLog = {
      id: `log-${Date.now()}`,
      timestamp: "Just now",
      type: "AUTH_LOGIN",
      message: `${authenticatedUser.role.toUpperCase()} session initiated for ${authenticatedUser.email}.`,
      status: "SUCCESS",
      ip: "127.0.0.1",
    };
    setAuditLogs((prev) => [newLog, ...prev.slice(0, 19)]);

    return authenticatedUser;
  };

  const logout = () => {
    if (user) {
      const newLog = {
        id: `log-${Date.now()}`,
        timestamp: "Just now",
        type: "AUTH_LOGOUT",
        message: `User session closed for ${user.email}.`,
        status: "INFO",
        ip: "127.0.0.1",
      };
      setAuditLogs((prev) => [newLog, ...prev.slice(0, 19)]);
    }
    setUser(null);
  };

  // Project management actions
  const addProject = (projectData) => {
    const newProj = {
      id: `proj-${Date.now()}`,
      title: projectData.title || "New Client Initiative",
      clientEmail: projectData.clientEmail || "client@velox.com",
      clientName: projectData.clientName || "Client Studio",
      service: projectData.service || "Website Building",
      status: projectData.status || "In Production",
      progress: Number(projectData.progress) || 10,
      dueDate: projectData.dueDate || "2026-12-01",
      budget: projectData.budget || "$12,000",
      description: projectData.description || "Custom digital production.",
      deliverables: [
        { id: `d-${Date.now()}-1`, title: "Initial Architecture & Brief", completed: true },
        { id: `d-${Date.now()}-2`, title: "Design Sprint & Motion Hooks", completed: false },
        { id: `d-${Date.now()}-3`, title: "Production Build & QA", completed: false },
      ],
      files: [],
      updates: [
        { id: `u-${Date.now()}`, date: "Today", author: "Admin", text: "Project initialized and assigned to studio schedule." }
      ]
    };

    setProjects((prev) => [newProj, ...prev]);

    // Add audit log
    const log = {
      id: `log-${Date.now()}`,
      timestamp: "Just now",
      type: "PROJECT_CREATED",
      message: `Project created: "${newProj.title}" for ${newProj.clientEmail}.`,
      status: "SUCCESS",
      ip: "127.0.0.1"
    };
    setAuditLogs((prev) => [log, ...prev]);
  };

  const updateProjectStatus = (projectId, newStatus, newProgress) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            status: newStatus !== undefined ? newStatus : p.status,
            progress: newProgress !== undefined ? Number(newProgress) : p.progress,
          };
        }
        return p;
      })
    );
  };

  const addProjectFile = (projectId, fileData) => {
    const newFile = {
      id: `f-${Date.now()}`,
      name: fileData.name || "deliverable-asset.zip",
      size: fileData.size || "12.4 MB",
      date: "Just now",
      type: fileData.type || "file",
    };

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return { ...p, files: [newFile, ...p.files] };
        }
        return p;
      })
    );
  };

  const addProjectUpdate = (projectId, text, author = "404ØX Team") => {
    const updateItem = {
      id: `u-${Date.now()}`,
      date: "Just now",
      author,
      text,
    };

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return { ...p, updates: [updateItem, ...p.updates] };
        }
        return p;
      })
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        projects,
        auditLogs,
        login,
        logout,
        addProject,
        updateProjectStatus,
        addProjectFile,
        addProjectUpdate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
