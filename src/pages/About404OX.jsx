import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSound } from "../context/SoundContext";
import "../styles/About404OX.css";

export default function About404OX() {
  const { playClick, playBrandSound, playContactSound } = useSound();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openWhatsApp = (customMsg) => {
    const text =
      customMsg ||
      "Hi 404ØX Studio! I read your story and would like to discuss building something together.";
    const msg = encodeURIComponent(text);
    window.open(`https://wa.me/919196299954?text=${msg}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="about-page-wrapper">
      {/* Sleek Dedicated Sticky Topbar */}
      <header className="about-topbar">
        <div className="about-brand-group">
          <Link
            to="/"
            className="brand"
            aria-label="404ØX Home"
            onClick={() => {
              playBrandSound();
            }}
          >
            404<span className="brand-symbol">Ø</span>X
            <span className="brand-reg">®</span>
          </Link>
          <span className="about-badge">BEYOND BOUNDARIES</span>
        </div>

        <div className="about-header-actions">
          <Link
            to="/"
            className="about-back-btn"
            onClick={playClick}
            title="Return to main 404ØX studio website"
          >
            <span>←</span>
            <span>BACK TO STUDIO</span>
          </Link>
          <button
            type="button"
            className="about-cta-btn"
            onClick={() => {
              playContactSound();
              openWhatsApp();
            }}
            title="Chat directly on WhatsApp (+91 91962 99954)"
          >
            <span>WHATSAPP</span>
            <span>↗</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="about-hero">
        <h1 className="about-hero-title">
          <span className="hero-title-prefix">THE UNFILTERED TRUTH ABOUT</span>{" "}
          <span className="highlight-red">404ØX<span className="hero-title-dot">.</span></span>
        </h1>

        <p className="about-hero-subtitle">
          Everything you need to know about our identity, global operating footprint,
          engineering craftsmanship, and why we refuse to build average digital products.
        </p>

        {/* Quick Section Jump Navigation */}
        <div className="about-jump-nav" aria-label="Quick jump section navigation">
          <a href="#what-is-404ox" onClick={playClick}>
            01. WHAT IS 404ØX ↓
          </a>
          <a href="#where-is-404ox" onClick={playClick}>
            02. WHERE IS 404ØX ↓
          </a>
          <a href="#why-choose-404ox" onClick={playClick}>
            03. WHY CHOOSE 404ØX ↓
          </a>
          <a href="#what-we-do" onClick={playClick}>
            04. WHAT WE DO ↓
          </a>
          <a href="#why-we-do" onClick={playClick}>
            05. WHY WE DO ↓
          </a>
        </div>
      </section>

      {/* 5 In-Depth Manifesto Sections Container */}
      <main className="about-content-container">
        {/* ==========================================================
            SECTION 1: WHAT IS 404ØX?
            ========================================================== */}
        <section className="manifesto-section" id="what-is-404ox">
          <div className="manifesto-header">
            <div>
              <span className="manifesto-num">01 / IDENTITY</span>
              <h2 className="manifesto-title">WHAT IS 404ØX?</h2>
            </div>
            <span className="about-badge">HIGH-VELOCITY CREATIVE TECH</span>
          </div>

          <p className="manifesto-lead">
            <strong>404ØX</strong> is an elite, high-velocity digital creative & engineering studio.
            We are neither a bloated legacy agency nor a disconnected freelance collective. We are a
            hybrid laboratory that fuses high-end cinematic visual aesthetics with sub-second
            software engineering to make visionary founders and market leaders impossible to ignore.
          </p>

          {/* Meaning of the Name */}
          <div className="name-breakdown-grid">
            <div className="name-breakdown-card">
              <span className="breakdown-symbol">404</span>
              <span className="breakdown-label">THE BROKEN ERROR REIMAGINED</span>
              <p>
                In standard computing, <em>404</em> signifies a missing destination. To us, it
                represents diagnosing the missing 90% of business growth that conventional marketing
                and generic agency templates fail to capture. We turn missing potential into market
                dominance.
              </p>
            </div>

            <div className="name-breakdown-card">
              <span className="breakdown-symbol">Ø</span>
              <span className="breakdown-label">GROUND ZERO & ZERO FLUFF</span>
              <p>
                The slashed zero (<em>Ø</em>) represents our zero-compromise operating dogma: zero
                vanity metrics, zero middle-management bureaucracy, zero ghosting, and building from
                first principles without bloated overhead.
              </p>
            </div>

            <div className="name-breakdown-card">
              <span className="breakdown-symbol">X</span>
              <span className="breakdown-label">THE 10X MULTIPLIER</span>
              <p>
                <em>X</em> is the leverage factor. We engineer 10x speed in deployment, 10x retention
                in motion design, and compound conversions through hyper-optimized code and
                psychological storytelling.
              </p>
            </div>
          </div>

          {/* Key Metrics Counter Strip */}
          <div className="stats-strip">
            <div className="stat-item">
              <span className="stat-number">57+</span>
              <span className="stat-label">HIGH-IMPACT BUILDS</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">18M+</span>
              <span className="stat-label">ORGANIC VIDEO VIEWS</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">99+</span>
              <span className="stat-label">MOBILE LIGHTHOUSE SPEED</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">12+</span>
              <span className="stat-label">GLOBAL MARKETS SERVED</span>
            </div>
          </div>
        </section>

        {/* ==========================================================
            SECTION 2: WHERE IS 404ØX?
            ========================================================== */}
        <section className="manifesto-section" id="where-is-404ox">
          <div className="manifesto-header">
            <div>
              <span className="manifesto-num">02 / GEOGRAPHY & FOOTPRINT</span>
              <h2 className="manifesto-title">WHERE IS 404ØX?</h2>
            </div>
            <span className="about-badge">GLOBAL REACH · INDIAN COMMAND</span>
          </div>

          <p className="manifesto-lead">
            404ØX operates on a borderless, global delivery model. Our central engineering command
            is anchored in India, while our creative directors, strategic collaborators, and client
            partners span the tech capitals of Europe, North America, and beyond.
          </p>

          <div className="locations-grid">
            {/* Primary Command Hub */}
            <div className="location-primary-card">
              <span className="location-badge-top">
                <span>🇮🇳</span> CENTRAL COMMAND & ENGINEERING HQ
              </span>
              <h3>INDIA (NCR TECH CORRIDOR)</h3>
              <p>
                Our central core development, video post-production infrastructure, and operational
                command operate out of India. From here, our elite engineering sprint teams build
                sub-second React/Next.js architectures and execute fast-turnaround video editing
                pipelines with 24/7 technical precision.
              </p>

              <div className="location-contact-box">
                <div className="contact-row">
                  <span>DIRECT HOTLINE / WHATSAPP:</span>
                  <a href="tel:+919196299954">+91 91962 99954 ↗</a>
                </div>
                <div className="contact-row">
                  <span>OFFICIAL INBOX:</span>
                  <a href="mailto:hello@404ox.studio">hello@404ox.studio ↗</a>
                </div>
              </div>
            </div>

            {/* Distributed Global Nodes */}
            <div className="global-nodes-card">
              <span className="breakdown-label">GLOBAL COLLABORATION HUBS</span>

              <div className="node-item">
                <span className="node-flag">🇬🇧</span>
                <div className="node-info">
                  <span className="node-city">LONDON, UNITED KINGDOM</span>
                  <span className="node-spec">Luxury Fashion Tech & On-Demand Logistics</span>
                </div>
              </div>

              <div className="node-item">
                <span className="node-flag">🇸🇪</span>
                <div className="node-info">
                  <span className="node-city">GOTHENBURG & STOCKHOLM, SWEDEN</span>
                  <span className="node-spec">Clean EV Mobility WebGL & Fintech Checkouts</span>
                </div>
              </div>

              <div className="node-item">
                <span className="node-flag">🇨🇦</span>
                <div className="node-info">
                  <span className="node-city">MONTREAL & TORONTO, CANADA</span>
                  <span className="node-spec">Editorial Lookbooks & SaaS Security Dashboards</span>
                </div>
              </div>

              <div className="node-item">
                <span className="node-flag">🇺🇸</span>
                <div className="node-info">
                  <span className="node-city">SAN FRANCISCO & SAN MATEO, USA</span>
                  <span className="node-spec">Developer Tooling & Cloud Enterprise Consoles</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================
            SECTION 3: WHY CHOOSE 404ØX?
            ========================================================== */}
        <section className="manifesto-section" id="why-choose-404ox">
          <div className="manifesto-header">
            <div>
              <span className="manifesto-num">03 / DIFFERENTIATION</span>
              <h2 className="manifesto-title">WHY CHOOSE 404ØX?</h2>
            </div>
            <span className="about-badge">THE ANTI-AGENCY MODEL</span>
          </div>

          <p className="manifesto-lead">
            Traditional design and marketing agencies are built on bloated overhead, endless vanity
            meetings, junior handoffs, and outdated templates. We engineered 404ØX to be the exact
            antidote to the legacy agency experience.
          </p>

          {/* Comparison Matrix */}
          <div className="comparison-container">
            <div className="comparison-col comparison-old">
              <span className="comp-header">❌ THE TRADITIONAL AGENCY</span>
              <div className="comp-list">
                <div className="comp-item">
                  <span>✕</span>
                  <span>Takes 3 weeks just to coordinate a scoping meeting and invoice a retainer.</span>
                </div>
                <div className="comp-item">
                  <span>✕</span>
                  <span>Senior partners pitch you; junior unpaid interns actually write your code.</span>
                </div>
                <div className="comp-item">
                  <span>✕</span>
                  <span>Forces slow, bloated WordPress/Wix stacks that score 40% on mobile performance.</span>
                </div>
                <div className="comp-item">
                  <span>✕</span>
                  <span>Reports on soft "impressions" without measuring actual checkout conversion ROI.</span>
                </div>
              </div>
            </div>

            <div className="comparison-col comparison-new">
              <span className="comp-header">⚡ THE 404ØX STANDARD</span>
              <div className="comp-list">
                <div className="comp-item">
                  <span>✓</span>
                  <span>Direct WhatsApp access to the principal engineers and creative leads.</span>
                </div>
                <div className="comp-item">
                  <span>✓</span>
                  <span>Every frame and line of code is produced by battle-tested master specialists.</span>
                </div>
                <div className="comp-item">
                  <span>✓</span>
                  <span>Sub-second edge-rendered Next.js/React loading in &lt; 300ms with 60fps micro-physics.</span>
                </div>
                <div className="comp-item">
                  <span>✓</span>
                  <span>Commercial obsession: Every single asset is designed to retain, convert, and scale revenue.</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Pillars of Excellence */}
          <div className="pillars-grid">
            <div className="pillar-card">
              <span className="pillar-icon">⚡</span>
              <span className="pillar-title">UNMATCHED VELOCITY</span>
              <p>We deploy in rapid 5 to 14 day sprints. What takes traditional agencies a fiscal quarter, we execute in days.</p>
            </div>

            <div className="pillar-card">
              <span className="pillar-icon">🎬</span>
              <span className="pillar-title">CODE + CINEMA</span>
              <p>No more hiring one agency for code and another for video ads. We execute software engineering and video post-production simultaneously under one roof.</p>
            </div>

            <div className="pillar-card">
              <span className="pillar-icon">🛡️</span>
              <span className="pillar-title">ZERO GHOSTING</span>
              <p>Transparent weekly milestone demos, asynchronous Loom/WhatsApp updates, and direct founder accountability from kickoff to launch.</p>
            </div>

            <div className="pillar-card">
              <span className="pillar-icon">📈</span>
              <span className="pillar-title">HIGH ROI OBSESSION</span>
              <p>Aesthetics are non-negotiable, but conversion is king. Every build is architected to lower your CAC and lift customer retention.</p>
            </div>
          </div>
        </section>

        {/* ==========================================================
            SECTION 4: WHAT WE DO?
            ========================================================== */}
        <section className="manifesto-section" id="what-we-do">
          <div className="manifesto-header">
            <div>
              <span className="manifesto-num">04 / CAPABILITIES</span>
              <h2 className="manifesto-title">WHAT WE DO?</h2>
            </div>
            <span className="about-badge">5 CORE SPECIALIZATIONS</span>
          </div>

          <p className="manifesto-lead">
            We focus exclusively on the five high-leverage digital pillars that drive consumer attention,
            brand authority, and online transaction volume.
          </p>

          <div className="disciplines-list">
            {/* Discipline 1 */}
            <div className="discipline-card">
              <span className="discipline-idx">01</span>
              <div className="discipline-main">
                <span className="discipline-name">VIDEO EDITING & KINETIC MOTION DESIGN</span>
                <p className="discipline-desc">
                  Viral short-form Reels & TikToks, 3D product motion reveals, atmospheric sound
                  design, and cinematic commercial trailers engineered for the first 1.8-second
                  hook retention.
                </p>
              </div>
              <div className="discipline-tags">
                <span className="discipline-tag">Short-Form Reels</span>
                <span className="discipline-tag">3D Motion Graphics</span>
                <span className="discipline-tag">Sound Design</span>
                <span className="discipline-tag">4K Color Grading</span>
              </div>
            </div>

            {/* Discipline 2 */}
            <div className="discipline-card">
              <span className="discipline-idx">02</span>
              <div className="discipline-main">
                <span className="discipline-name">BESPOKE WEBSITE BUILDING & WEBGL EXPERIENCES</span>
                <p className="discipline-desc">
                  Headless Next.js, interactive 3D WebGL configurators, GSAP kinetic scroll physics,
                  and sub-second mobile micro-frontends with perfect 99+ Core Web Vitals scores.
                </p>
              </div>
              <div className="discipline-tags">
                <span className="discipline-tag">Next.js / React</span>
                <span className="discipline-tag">WebGL 3D Canvases</span>
                <span className="discipline-tag">GSAP Physics</span>
                <span className="discipline-tag">Edge Caching</span>
              </div>
            </div>

            {/* Discipline 3 */}
            <div className="discipline-card">
              <span className="discipline-idx">03</span>
              <div className="discipline-main">
                <span className="discipline-name">NATIVE & CROSS-PLATFORM MOBILE APPLICATIONS</span>
                <p className="discipline-desc">
                  Intuitive React Native mobile apps, real-time client dashboards, biometric auth
                  flows, and scalable cloud APIs built for seamless user onboarding and retention.
                </p>
              </div>
              <div className="discipline-tags">
                <span className="discipline-tag">React Native</span>
                <span className="discipline-tag">Client Portals</span>
                <span className="discipline-tag">WebSocket Real-Time</span>
                <span className="discipline-tag">Frictionless UX</span>
              </div>
            </div>

            {/* Discipline 4 */}
            <div className="discipline-card">
              <span className="discipline-idx">04</span>
              <div className="discipline-main">
                <span className="discipline-name">HIGH-CONVERSION E-COMMERCE & DTC STORES</span>
                <p className="discipline-desc">
                  Custom Shopify Liquid architectures, sticky mobile buy-drawers, flash-sale
                  resilience, and multi-currency international checkouts built for high cart value.
                </p>
              </div>
              <div className="discipline-tags">
                <span className="discipline-tag">Shopify Plus</span>
                <span className="discipline-tag">Headless Storefronts</span>
                <span className="discipline-tag">1-Click Checkouts</span>
                <span className="discipline-tag">CRO Architecture</span>
              </div>
            </div>

            {/* Discipline 5 */}
            <div className="discipline-card">
              <span className="discipline-idx">05</span>
              <div className="discipline-main">
                <span className="discipline-name">DIGITAL MARKETING & REVENUE GROWTH ENGINES</span>
                <p className="discipline-desc">
                  High-converting landing page funnels, multi-angle paid video ad hooks, organic
                  social distribution strategies, and comprehensive competitor growth audits.
                </p>
              </div>
              <div className="discipline-tags">
                <span className="discipline-tag">Performance Funnels</span>
                <span className="discipline-tag">Paid Ad Creative</span>
                <span className="discipline-tag">Conversion Audits</span>
                <span className="discipline-tag">Growth Analytics</span>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================
            SECTION 5: WHY WE DO?
            ========================================================== */}
        <section className="manifesto-section manifesto-section-dark" id="why-we-do">
          <div className="manifesto-header">
            <div>
              <span className="manifesto-num" style={{ color: "var(--gold)" }}>05 / CREED & PURPOSE</span>
              <h2 className="manifesto-title" style={{ color: "var(--gold, #EFB11D)" }}>WHY WE DO?</h2>
            </div>
            <span className="about-badge" style={{ background: "rgba(239, 177, 29, 0.15)", color: "var(--gold)", borderColor: "rgba(239, 177, 29, 0.4)" }}>
              THE MANIFESTO
            </span>
          </div>

          <div className="manifesto-creed-box">
            <blockquote className="manifesto-quote">
              "THE INTERNET IS POLLUTED WITH THE <mark>ORDINARY</mark>. WE EXIST TO BUILD THE <mark>UNFORGETTABLE</mark>."
            </blockquote>

            <div className="manifesto-paragraphs">
              <p>
                In today's hyper-saturated digital economy, attention is the most scarce and ruthless
                currency on earth. You have fewer than 2.4 seconds to convince an executive or
                customer that your business matters. Template websites, cookie-cutter video edits,
                and sluggish interfaces are digital poison—they drain your advertising dollars and
                erode customer trust.
              </p>
              <p>
                We do what we do because we believe ambitious founders and visionary creators
                deserve partners who take pride in the craft. When code is sub-second fast, when motion
                design stops the infinite scroll, and when brand identity exudes unapologetic
                authority—businesses win. Good work speaks for itself, and that is why 404ØX exists.
              </p>
            </div>
          </div>

          <div className="stats-strip" style={{ background: "rgba(255, 255, 255, 0.05)", borderColor: "rgba(255, 255, 255, 0.15)" }}>
            <div className="stat-item">
              <span className="stat-number" style={{ color: "var(--gold)" }}>0%</span>
              <span className="stat-label">OUTSOURCING OR TEMPLATES</span>
            </div>
            <div className="stat-item">
              <span className="stat-number" style={{ color: "#ffffff" }}>100%</span>
              <span className="stat-label">BESPOKE CUSTOM CRAFT</span>
            </div>
            <div className="stat-item">
              <span className="stat-number" style={{ color: "var(--gold)" }}>&lt; 2 HR</span>
              <span className="stat-label">AVERAGE RESPONSE TIME</span>
            </div>
            <div className="stat-item">
              <span className="stat-number" style={{ color: "#ffffff" }}>FOREVER</span>
              <span className="stat-label">OBSESSED WITH EXCELLENCE</span>
            </div>
          </div>
        </section>
      </main>

      {/* High-Impact Closing Banner */}
      <section className="about-closing-banner">
        <span className="closing-tagline-badge">
          404ØX · BEYOND BOUNDARIES. BUILT FOR WHAT'S NEXT.
        </span>
        <h2>LET'S BUILD SOMETHING UNFORGETTABLE.</h2>
        <p>
          Whether you need viral short-form video editing, a high-converting bespoke website, an
          e-commerce storefront, or a digital marketing growth engine—get in touch with us directly.
        </p>

        <div className="closing-actions">
          <button
            type="button"
            className="closing-whatsapp-btn"
            onClick={() => {
              playContactSound();
              openWhatsApp("Hi 404ØX Studio! I just finished reading your manifesto and want to build something unforgettable.");
            }}
            title="Chat directly on WhatsApp (+91 91962 99954)"
          >
            <span>💬 CHAT ON WHATSAPP</span>
            <span>↗</span>
          </button>

          <Link
            to="/"
            className="closing-home-btn"
            onClick={playClick}
            title="Return to the public 404ØX studio website"
          >
            <span>← RETURN TO 404ØX STUDIO</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
