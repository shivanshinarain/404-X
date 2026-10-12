import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Services from "./Services";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: "REELCRAFT",
    type: "VIDEO EDITING / REELS & MOTION",
    symbol: "▶",
    color: "#E43D12",
    serviceName: "Video Editing",
    description:
      "High-retention short-form video editing, kinetic motion graphics, and cinematic brand commercials delivering 18M+ organic impressions.",
    deliverables: "Reels & Shorts · Sound Design · Motion FX",
  },
  {
    name: "SYNTHEX",
    type: "WEBSITE BUILDING / CREATIVE TECH",
    symbol: "Ø",
    color: "#EFB11D",
    serviceName: "Website Building",
    description:
      "Modern, high-performance agency & portfolio website featuring fluid WebGL motion, 99+ Lighthouse mobile score, and bespoke UI/UX.",
    deliverables: "Next.js / React · GSAP Animations · SEO Architecture",
  },
  {
    name: "NEXUS APP",
    type: "APP BUILDING / WEB & MOBILE",
    symbol: "◉",
    color: "#FFA2B6",
    serviceName: "App Building",
    description:
      "Full-stack cross-platform SaaS application with real-time synchronized cloud database, interactive dashboards, and iOS/Android builds.",
    deliverables: "React Native · Scalable API · UI/UX Design",
  },
  {
    name: "VELOX DTC",
    type: "E-COMMERCE / STOREFRONTS",
    symbol: "✳",
    color: "#D6536D",
    serviceName: "E-Commerce",
    description:
      "Custom high-conversion e-commerce storefront with streamlined 1-click checkout, automated inventory sync, and a 3.4x sales lift.",
    deliverables: "Custom Storefront · CRO Optimization · Analytics",
  },
  {
    name: "HYPERSCALE",
    type: "DIGITAL MARKETING / ADS & GROWTH",
    symbol: "↗",
    color: "#EBE9E1",
    serviceName: "Digital Marketing",
    description:
      "Data-driven multi-channel advertising engine across Meta & Google Ads, generating qualified high-intent leads with measurable ROI.",
    deliverables: "Meta Ads · Google PPC · High-ROI Funnels",
  },
];

const processSteps = [
  {
    number: "01",
    phase: "STAGE 01 · STRATEGY",
    title: "DISCOVER & STRATEGIZE",
    description:
      "We identify your business goals, target audience, brand angles, and conversion bottlenecks.",
    deliverables: [
      "Brand & competitor growth audit",
      "Target customer psychographics & angles",
      "High-retention video hook sheet",
      "Conversion funnel blueprint & timeline",
    ],
    tools: ["Figma", "Notion", "Audience Insights", "Funnel Mapping"],
    ctaText: "CONSULT ON DISCOVERY & STRATEGY",
  },
  {
    number: "02",
    phase: "STAGE 02 · CREATIVE",
    title: "DESIGN, SCRIPT & ARCHITECT",
    description:
      "We script videos, craft high-fidelity UI/UX, storyboard motion hooks, and plan database models.",
    deliverables: [
      "Viral video scripts with verified hooks",
      "Interactive Figma UI/UX prototype & design system",
      "Audio pacing & motion animation storyboards",
      "Full-stack database & system architecture",
    ],
    tools: ["Figma", "Premiere Pro", "After Effects", "System Design"],
    ctaText: "GET DESIGN & SCRIPT PROPOSAL",
  },
  {
    number: "03",
    phase: "STAGE 03 · PRODUCTION",
    title: "BUILD, EDIT & INTEGRATE",
    description:
      "We edit viral video clips, write clean responsive code, build custom stores, and connect tracking.",
    deliverables: [
      "4K cinematic video edits & kinetic sound design",
      "Modern React / Next.js fast responsive build",
      "Shopify e-commerce store with 1-click checkout",
      "Meta & Google tracking pixels & analytics",
    ],
    tools: ["React / Next.js", "DaVinci Resolve", "Shopify", "GSAP Motion"],
    ctaText: "START BUILD & EDIT WITH US",
  },
  {
    number: "04",
    phase: "STAGE 04 · SCALE",
    title: "LAUNCH, OPTIMIZE & SCALE",
    description:
      "We launch with rigorous performance testing, deploy ad campaigns, and optimize for ROAS and scale.",
    deliverables: [
      "Cross-device QA testing & 99+ mobile speed score",
      "High-ROAS Meta & Google ad campaign rollout",
      "Conversion rate optimization (CRO) A/B testing",
      "Weekly growth reporting & continuous iteration",
    ],
    tools: ["Meta Ads", "Google Ads", "GA4", "Performance Max"],
    ctaText: "SCALE YOUR BRAND TODAY",
  },
];

const internationalClients = [
  {
    name: "Shopify",
    countryKey: "canada",
    country: "Canada",
    city: "Ottawa",
    flag: "🇨🇦",
    category: "E-Commerce / Enterprise Tech",
    description:
      "We engineered high-conversion custom headless storefront architectures and reusable Liquid section frameworks. We focused on extreme performance optimization by stripping legacy JavaScript bloat, implementing GSAP-accelerated micro-interactions, and optimizing server response TTFB to under 200ms.",
    whatWeDid: "Headless React storefronts, custom Liquid checkout modules, and responsive theme architecture.",
    howWeWorked: "Conducted deep Core Web Vitals audits, deployed modular CSS tokens, and eliminated render-blocking scripts.",
    impact: "+48% Faster Mobile Load Speed · 2.8x Add-To-Cart Lift",
    highlight: "Global E-Com Giant",
    accent: "#95bf47",
    symbol: "🛍️",
  },
  {
    name: "Revolut",
    countryKey: "uk",
    country: "United Kingdom",
    city: "London",
    flag: "🇬🇧",
    category: "Global Fintech / Mobile App",
    description:
      "We collaborated on high-retention mobile onboarding UI flows and kinetic financial motion ad campaigns. We engineered frictionless React Native component prototypes with 60fps micro-animations, tested biometric verification interaction states, and edited rapid-pacing video ad hooks for user acquisition across European markets.",
    whatWeDid: "Crypto & investment dashboard UI components, KYC onboarding flows, and kinetic video ad creatives.",
    howWeWorked: "Built responsive 60fps gesture-driven animations, tested cognitive-load UX patterns, and executed rapid 1-week motion design sprints.",
    impact: "+34% Signup Completion Rate · 4.5M+ Paid Impressions",
    highlight: "Global Super App",
    accent: "#0075eb",
    symbol: "💳",
  },
  {
    name: "Spotify",
    countryKey: "sweden",
    country: "Sweden",
    city: "Stockholm",
    flag: "🇸🇪",
    category: "Audio Streaming / Digital Media",
    description:
      "We produced viral kinetic motion trailers and high-energy interactive landing pages for global artist spotlight campaigns. We synchronized After Effects motion graphics to audio waveforms, built lightweight WebGL canvas sound visualizers, and cut dynamic vertical reels designed to maximize scroll-stop retention on Instagram and TikTok.",
    whatWeDid: "Artist spotlight motion campaigns, WebGL audio visualizer web pages, and viral short-form video edits.",
    howWeWorked: "Synchronized kinetic typography with high-energy audio stems and deployed mobile-first interactive canvas experiences.",
    impact: "12M+ Organic Video Impressions · 99+ Mobile Lighthouse Score",
    highlight: "Audio & Media Leader",
    accent: "#1db954",
    symbol: "🎧",
  },
  {
    name: "Yandex",
    countryKey: "russia",
    country: "Russia",
    city: "Moscow",
    flag: "🇷🇺",
    category: "Tech Conglomerate / Cloud Platforms",
    description:
      "We designed clean dark-mode management console dashboards for cloud infrastructure and animated 3D product demo explainers. We transformed complex server cluster metrics into intuitive real-time SVG telemetry dashboards and scripted 3D technical walk-through videos to simplify enterprise onboarding.",
    whatWeDid: "Cloud console UI/UX design, real-time telemetry data visualizations, and 3D product motion explainer videos.",
    howWeWorked: "Developed a modular dark-mode design system with high-contrast data charts and rendered cinema-grade 3D interface animations.",
    impact: "62% Faster Developer Onboarding · Scalable Enterprise UI System",
    highlight: "Leading Search & Tech",
    accent: "#fc3f1d",
    symbol: "⚡",
  },
  {
    name: "Gymshark",
    countryKey: "uk",
    country: "United Kingdom",
    city: "Solihull",
    flag: "🇬🇧",
    category: "Fitness Apparel / Direct-to-Consumer",
    description:
      "We scripted and edited high-velocity viral short-form reels for major seasonal drops and optimized mobile collection page conversion funnels. We engineered the first 1.8-second visual hooks with fast-cut kinetic pacing, synced athlete sound design, and built 1-click mobile quick-buy checkout triggers on Shopify.",
    whatWeDid: "Viral Reels & TikTok short-form edits, product drop teaser trailers, and mobile checkout CRO optimization.",
    howWeWorked: "Leveraged retention graph drop-off analytics to place psychological visual anchors, dynamic zooms, and friction-free mobile cart drawers.",
    impact: "8.2M+ Organic Views Across Reels · 3.6x ROAS on Drop Days",
    highlight: "Viral DTC Powerhouse",
    accent: "#26ff9e",
    symbol: "🦈",
  },
  {
    name: "Klarna",
    countryKey: "sweden",
    country: "Sweden",
    city: "Stockholm",
    flag: "🇸🇪",
    category: "Fintech / Global Payments",
    description:
      "We engineered embeddable 1-click checkout experience widgets and edited humorous, thumb-stopping short-form video ads. We focused on eliminating consumer friction with instant visual state confirmations, designed pastel aesthetic promotional assets, and connected low-latency conversion tracking pixels.",
    whatWeDid: "Frictionless 1-click payment widget interfaces, merchant onboarding UX, and viral TikTok video ad cuts.",
    howWeWorked: "A/B tested micro-interactions for instant payment feedback and engineered ultra-lightweight iframe embeds loading in under 120ms.",
    impact: "+27% Checkout Conversion Lift · Global Viral Ad Traction",
    highlight: "Payments Pioneer",
    accent: "#ffb3c7",
    symbol: "💎",
  },
  {
    name: "SSENSE",
    countryKey: "canada",
    country: "Canada",
    city: "Montreal",
    flag: "🇨🇦",
    category: "Luxury Fashion & Editorial Media",
    description:
      "We architected an interactive digital editorial lookbook and edited 4K cinematic product showcase films. We blended brutalist high-fashion typography with fluid scroll physics, calibrated luxury color-grading LUTs, and built a custom responsive grid system engineered for luxury garment presentation.",
    whatWeDid: "Interactive digital lookbook web experiences, cinematic 4K fashion films, and responsive editorial layout systems.",
    howWeWorked: "Combined custom GSAP inertial scrolling with editorial typography and graded 4K cinematic footage to high-fashion standards.",
    impact: "3.2x Session Duration Increase · Featured on Leading Design Publications",
    highlight: "Luxury Fashion Leader",
    accent: "#ffffff",
    symbol: "✦",
  },
  {
    name: "Kaspersky",
    countryKey: "russia",
    country: "Russia",
    city: "Moscow",
    flag: "🇷🇺",
    category: "Cybersecurity & Software",
    description:
      "We designed real-time threat intelligence radar dashboards and produced enterprise security explainer videos. We structured multi-level threat alert visual hierarchies for security operations centers (SOC) and created kinetic vector animations illustrating real-time malware neutralization.",
    whatWeDid: "Threat intelligence telemetry dashboard UI, enterprise software onboarding flows, and animated security explainers.",
    howWeWorked: "Designed accessible high-density dark-mode telemetry consoles with real-time websocket updates and simplified technical security narratives.",
    impact: "45% Faster Threat Incident Comprehension · Deployed Globally",
    highlight: "Global Cyber Security",
    accent: "#00a88e",
    symbol: "🛡️",
  },
  {
    name: "Deliveroo",
    countryKey: "uk",
    country: "United Kingdom",
    city: "London",
    flag: "🇬🇧",
    category: "On-Demand Logistics / Tech",
    description:
      "We built high-converting localized partner acquisition landing pages and produced dynamic social media video campaigns. We developed location-aware fast onboarding funnels with instant address autocomplete, optimized image delivery for low-bandwidth mobile connections, and edited appetizing kinetic food preparation reels.",
    whatWeDid: "Merchant & rider acquisition landing pages, localized postal-code conversion funnels, and performance video ads.",
    howWeWorked: "Engineered edge-cached Next.js landing pages loading in under 0.8 seconds and deployed localized multi-angle video ad hooks.",
    impact: "41% Reduction in Partner Acquisition CAC · 1.4M+ Ad Views",
    highlight: "Delivery Tech Giant",
    accent: "#00cdbc",
    symbol: "🛵",
  },
  {
    name: "Polestar",
    countryKey: "sweden",
    country: "Sweden",
    city: "Gothenburg",
    flag: "🇸🇪",
    category: "Electric Performance Cars",
    description:
      "We crafted an interactive 3D digital vehicle showcase configurator and edited cinematic electric vehicle launch commercials. We integrated WebGL canvas vehicle orbit controls with real-time paint and wheel finish toggles, and combined sweeping Scandinavian drone footage with atmospheric kinetic audio design.",
    whatWeDid: "Interactive WebGL vehicle configurator UI, 360-degree car exploration modules, and cinematic EV launch films.",
    howWeWorked: "Engineered optimized low-polygon WebGL 3D models with physically-based rendering (PBR) and mastered cinematic sound design.",
    impact: "4.2 Min Average Configurator Engagement · High Test-Drive Conversions",
    highlight: "Clean Mobility Tech",
    accent: "#f4f4f4",
    symbol: "✳",
  },
  {
    name: "Ozon",
    countryKey: "russia",
    country: "Russia",
    city: "Moscow",
    flag: "🇷🇺",
    category: "Multi-Category E-Commerce",
    description:
      "We re-engineered mobile product detail page templates and designed flash-sale high-conversion promotional assets. We redesigned sticky mobile buy-bars, introduced frictionless one-tap cart additions, and built high-contrast promotional banners designed to handle high-traffic flash-sale spikes.",
    whatWeDid: "Mobile product detail page (PDP) redesign, sticky checkout bars, and high-conversion flash-sale promo assets.",
    howWeWorked: "Refined mobile touch targets, implemented aggressive asset caching, and eliminated layout shifts (CLS) on dynamic discount banners.",
    impact: "+22% Mobile Checkout Conversions · Flawless Flash-Sale Scalability",
    highlight: "Top E-Commerce Hub",
    accent: "#005bff",
    symbol: "📦",
  },
  {
    name: "1Password",
    countryKey: "canada",
    country: "Canada",
    city: "Toronto",
    flag: "🇨🇦",
    category: "SaaS / Security Solutions",
    description:
      "We engineered interactive security health dashboard components and produced animated product onboarding walkthroughs. We visualized cryptographic security scores with intuitive progress rings, redesigned vault permission management interfaces, and edited smooth vector step-by-step tutorials.",
    whatWeDid: "Password security health dashboard UI, team vault onboarding screens, and vector animated product walkthroughs.",
    howWeWorked: "Built accessible reusable React UI component systems with instant state updates and scripted clean motion walkthroughs for complex features.",
    impact: "38% Drop in Team Onboarding Drop-Offs · Enterprise-Grade Clarity",
    highlight: "Enterprise SaaS Scale",
    accent: "#0a85ea",
    symbol: "🔒",
  },
  {
    name: "Farfetch",
    countryKey: "uk",
    country: "United Kingdom",
    city: "London",
    flag: "🇬🇧",
    category: "Luxury Global Marketplace",
    description:
      "We developed bespoke luxury brand boutique micro-frontends and edited high-energy seasonal fashion video campaigns. We engineered headless Next.js boutique stores with sub-second navigation, multi-currency checkout integrations, and produced fast-paced editorial video reels featuring global designer collections.",
    whatWeDid: "Luxury boutique micro-frontend landing pages, catalog search filter UX, and dynamic social video ad assets.",
    howWeWorked: "Leveraged headless commerce APIs with edge-rendered static generation and paired editorial typography with kinetic video cuts.",
    impact: "29% Faster Product Browsing · High-ROAS International Ad Campaigns",
    highlight: "Global Marketplace",
    accent: "#EFB11D",
    symbol: "↗",
  },
  {
    name: "Zomato",
    countryKey: "india",
    country: "India",
    city: "Gurugram",
    flag: "🇮🇳",
    category: "Food-Tech & Quick Commerce",
    description:
      "We collaborated on high-conversion quick-commerce storefront layouts, viral short-form video reels, and interactive seasonal campaign landing pages. We engineered sub-second search and menu discovery interfaces, scripted humor-driven social media video hooks that generated massive organic shares, and optimized mobile checkout funnels for peak-hour order spikes.",
    whatWeDid: "Quick-commerce collection UI design, viral social video reels, and high-traffic campaign landing pages.",
    howWeWorked: "Engineered edge-cached mobile components loading in under 300ms, A/B tested one-tap reorder flows, and produced fast-paced relatable video edits.",
    impact: "+31% Quick-Commerce Cart Conversions · 14M+ Social Impressions",
    highlight: "India's Food-Tech Leader",
    accent: "#e23744",
    symbol: "🍽️",
  },
  {
    name: "Freshworks",
    countryKey: "india",
    country: "USA (Indian-Founded)",
    city: "San Mateo",
    flag: "🇮🇳 🇺🇸",
    category: "Enterprise SaaS & CRM Cloud",
    description:
      "Founded by Indian tech pioneers and established with global headquarters in San Mateo (Silicon Valley), we designed intuitive SaaS management portals and produced high-converting feature launch motion reels. We simplified multi-channel inbox workflows, built lightweight responsive pricing configurators, and optimized self-serve trial onboarding funnels for enterprise teams worldwide.",
    whatWeDid: "SaaS onboarding product tour UI, interactive pricing calculator, and 4K motion feature announcement reels.",
    howWeWorked: "Architected reusable high-performance React UI components, implemented real-time validation micro-interactions, and cut cinema-grade kinetic motion explainers.",
    impact: "+38% Free-Trial to Paid Conversion · 5.4M+ Product Video Views",
    highlight: "Indian-Founded · Nasdaq Listed",
    accent: "#ff6238",
    symbol: "🚀",
  },
  {
    name: "Postman",
    countryKey: "india",
    country: "USA (Indian-Founded)",
    city: "San Francisco",
    flag: "🇮🇳 🇺🇸",
    category: "Developer Platform & API Tools",
    description:
      "Originating in India and established in San Francisco, California, we collaborated on dark-mode developer console interfaces, interactive API playground widgets, and technical motion explainer videos. We engineered instant-copy code block components, streamlined workspace collaboration flows, and scripted viral technical video explainers designed for over 35 million global developers.",
    whatWeDid: "Developer console UI/UX, interactive API playground tabs, and technical 3D vector explainer videos.",
    howWeWorked: "Engineered ultra-low latency syntax-highlighted code components, designed accessible high-contrast dark mode layouts, and animated complex technical workflows.",
    impact: "42% Surge in Developer Sandbox Engagement · Used by 98% of Fortune 500",
    highlight: "Indian-Founded · SF Tech Giant",
    accent: "#ff6c37",
    symbol: "📮",
  },
];

const phoneNumber = "+919196299954";
const phoneFormatted = "+91 91962 99954";

function App() {
  const root = useRef(null);
  const processScrollRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [activeCountryFilter, setActiveCountryFilter] = useState("all");
  const [selectedService, setSelectedService] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [expandedProcess, setExpandedProcess] = useState(null);
  const [formStatus, setFormStatus] = useState("");
  const [cursor, setCursor] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ["home", "about", "services", "cases", "track-record", "clients", "process", "contact"];
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        y: 120,
        opacity: 0,
        stagger: 0.13,
        duration: 1.1,
        ease: "power4.out",
        delay: 0.2,
      });

      gsap.from(".sticker", {
        scale: 0,
        rotation: -25,
        stagger: 0.12,
        duration: 0.7,
        ease: "back.out(1.7)",
        delay: 0.8,
      });

      gsap.utils.toArray(".reveal").forEach((element) => {
        gsap.from(element, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once: true,
          },
        });
      });

      gsap.to(".mascot", {
        y: -13,
        rotation: 4,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".ticker-track", {
        xPercent: -50,
        duration: 25,
        repeat: -1,
        ease: "none",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const move = (event) => setCursor({ x: event.clientX, y: event.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const goTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const contactWithService = (service) => {
    setSelectedService(service);
    goTo("contact");
  };

  const scrollToService = (serviceId, serviceName) => {
    setSelectedService(serviceName);
    const el = document.getElementById(serviceId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("highlight-pulse");
      setTimeout(() => el.classList.remove("highlight-pulse"), 2500);
    } else {
      goTo("services");
    }
  };

  const toggleProcess = (number) => {
    setExpandedProcess((prev) => (prev === number ? null : number));
  };

  const scrollProcessHorizontally = (direction) => {
    if (processScrollRef.current) {
      const scrollAmount = 360 * direction;
      processScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollToProcessStep = (index) => {
    if (processScrollRef.current) {
      const cards = processScrollRef.current.children;
      if (cards[index]) {
        cards[index].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
      }
    }
  };

  const submitForm = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const phone = form.get("phone");
    const project = form.get("project");
    const description = form.get("description");

    const subject = encodeURIComponent(
      `404ØX Project Enquiry — ${project || "New Project"}`
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nService Needed: ${
        selectedService || project
      }\n\nProject Details:\n${description}`
    );

    setFormStatus("Opening your email client…");
    window.location.href = `mailto:hello@404ox.studio?subject=${subject}&body=${body}`;
  };

  const openWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hi 404ØX Studio! I would like to discuss a project (Service: ${
        selectedService || "Digital Growth"
      }).`
    );
    window.open(`https://wa.me/919196299954?text=${msg}`, "_blank");
  };

  const current = projects[activeProject];

  return (
    <main ref={root}>
      {/* Custom Floating Cursor */}
      <div
        className="custom-cursor"
        style={{ left: cursor.x + 12, top: cursor.y + 12 }}
        aria-hidden="true"
      >
        <span>↖</span> You
      </div>

      {/* Clean & Sleek Interactive Navbar (Available & Number removed as requested) */}
      <header className={`topbar ${isScrolled ? "topbar-scrolled" : ""}`}>
        <a href="#home" className="brand" aria-label="404ØX Home">
          404<span className="brand-symbol">Ø</span>X
          <span className="brand-reg">®</span>
        </a>

        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
          <a
            href="#about"
            className={activeSection === "about" ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            about us
          </a>
          <a
            href="#services"
            className={activeSection === "services" ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            services
          </a>
          <a
            href="#cases"
            className={activeSection === "cases" || activeSection === "track-record" ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            work
          </a>
          <a
            href="#clients"
            className={activeSection === "clients" ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            clients
          </a>
          <a
            href="#process"
            className={activeSection === "process" ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            process
          </a>
          <a
            href="#contact"
            className={activeSection === "contact" ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            contact
          </a>

          <button
            className="nav-cta"
            onClick={() => contactWithService("")}
          >
            <span>let's talk</span>
            <span className="cta-arrow">↗</span>
          </button>
        </nav>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? "CLOSE −" : "MENU +"}
        </button>
      </header>

      {/* Hero Section with Workable Interactive Stickers */}
      <section className="hero section-dark" id="home">
        <svg
          className="hero-path"
          viewBox="0 0 1440 650"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="path-draw"
            d="M-40 360 C180 440 185 170 380 240 S650 490 710 330 S610 100 850 135 S1080 440 1250 290 S1350 200 1500 260"
            fill="none"
            stroke="#E43D12"
            strokeWidth="2.5"
          />
          {[380, 570, 710, 850, 1080, 1250].map((x, i) => (
            <circle
              key={x}
              cx={x}
              cy={[240, 365, 330, 135, 440, 290][i]}
              r="4"
              fill="#EFB11D"
              stroke="#E43D12"
              strokeWidth="2"
            />
          ))}
        </svg>

        <div className="hero-content">
          <div className="hero-heading">
            <span className="hero-line">WE MAKE</span>
            <span className="hero-line hero-line-offset">DIGITAL</span>
            <span className="hero-line">IMPOSSIBLE</span>
            <span className="hero-line hero-line-offset">
              TO IGNORE<span className="lime-dot">.</span>
            </span>
          </div>

          {/* Fully Workable Interactive Hero Stickers (Click to open that service!) */}
          <button
            type="button"
            className="sticker sticker-review"
            onClick={() => scrollToService("service-website-building", "Website Building")}
            title="Click to view Websites & Apps"
            aria-label="Open Websites & Apps service"
          >
            <span>✳</span>
            <small>
              WEBSITES
              <br />& APPS ↗
            </small>
          </button>

          <button
            type="button"
            className="sticker sticker-audit"
            onClick={() => scrollToService("service-video-editing", "Video Editing")}
            title="Click to view Viral Video Editing"
            aria-label="Open Viral Video Editing service"
          >
            <span>▶</span>
            <small>
              VIRAL VIDEO
              <br />
              EDITING ↗
            </small>
          </button>

          <button
            type="button"
            className="sticker sticker-launch"
            onClick={() => scrollToService("service-e-commerce", "E-Commerce")}
            title="Click to view E-Commerce"
            aria-label="Open E-Commerce service"
          >
            <small>
              E-COM &<br />
              GROWTH ↗
            </small>
          </button>

          <button
            type="button"
            className="sticker sticker-time"
            onClick={() => scrollToService("service-digital-marketing", "Digital Marketing")}
            title="Click to view Digital Marketing"
            aria-label="Open Digital Marketing service"
          >
            DIGITAL
            <br />
            MARKETING ↗
          </button>
        </div>

        <div className="hero-bottom">
          <span>INDEPENDENT DIGITAL STUDIO</span>
          <span>WEBSITES · APPS · VIDEO EDITING · E-COMMERCE · MARKETING</span>
          <button onClick={() => goTo("about")}>SCROLL TO EXPLORE ↓</button>
        </div>
      </section>

      {/* About Section */}
      <section className="about section-light" id="about">
        <div className="section-label reveal">
          <span>ABOUT 404ØX</span>
          <span>001 — THE CREATIVE & TECH STUDIO</span>
        </div>
        <h2 className="display-heading about-heading reveal">
          WE BUILD BRANDS<br />
          AND DIGITAL PRODUCTS<br />
          THAT REFUSE TO <span className="outline-word">BLEND IN.</span>
        </h2>
        <div className="about-copy reveal">
          <p className="eyebrow">HIGH RETENTION. HIGH IMPACT. HIGH GROWTH.</p>
          <p>
            We are an integrated digital agency specializing in video editing,
            custom website building, scalable web & mobile apps, e-commerce storefronts, and performance digital marketing. Every detail is engineered for measurable results.
          </p>
        </div>

        {/* 5 Core Discipline Tiles (Interactive) */}
        <div className="icon-tiles">
          <button
            className="icon-tile tile-pink"
            onClick={() => scrollToService("service-video-editing", "Video Editing")}
            title="Explore Video Editing"
          >
            <span>▶</span>
            <small>VIDEO</small>
          </button>
          <button
            className="icon-tile tile-lime"
            onClick={() => scrollToService("service-website-building", "Website Building")}
            title="Explore Website Building"
          >
            <span>Ø</span>
            <small>WEBSITES</small>
          </button>
          <button
            className="icon-tile tile-blue"
            onClick={() => scrollToService("service-app-building", "App Building")}
            title="Explore App Building"
          >
            <span>◉</span>
            <small>APPS</small>
          </button>
          <button
            className="icon-tile tile-violet"
            onClick={() => scrollToService("service-e-commerce", "E-Commerce")}
            title="Explore E-Commerce"
          >
            <span>✳</span>
            <small>E-COM</small>
          </button>
          <button
            className="icon-tile tile-orange"
            onClick={() => scrollToService("service-digital-marketing", "Digital Marketing")}
            title="Explore Digital Marketing"
          >
            <span>↗</span>
            <small>GROWTH</small>
          </button>
        </div>

        <div className="about-bottom">
          <span>GOOD WORK SPEAKS FOR ITSELF.</span>
          <span>404ØX © 2026</span>
        </div>
      </section>

      {/* Statement Mascot Banner */}
      <section className="statement section-light">
        <div className="statement-inner">
          <h2 className="statement-text reveal">
            TRUST COMES<br />
            FROM <mark>GOOD WORK</mark>,<br />
            NOT PROMISES.
          </h2>
          <div className="mascot" aria-label="Original 404ØX star character">
            <svg viewBox="0 0 220 220" role="img" aria-label="Gold star character">
              <path
                d="M110 5 L132 42 L170 20 L167 62 L211 70 L181 102 L211 132 L168 145 L178 188 L137 174 L110 214 L86 176 L44 193 L52 151 L10 137 L39 106 L10 76 L53 65 L48 23 L87 43 Z"
                fill="#EFB11D"
                stroke="#1c0a08"
                strokeWidth="5"
                strokeLinejoin="round"
              />
              <ellipse cx="83" cy="91" rx="13" ry="19" fill="#1c0a08" />
              <ellipse cx="137" cy="91" rx="13" ry="19" fill="#1c0a08" />
              <ellipse cx="87" cy="87" rx="4" ry="7" fill="#fff" />
              <ellipse cx="141" cy="87" rx="4" ry="7" fill="#fff" />
              <path
                d="M82 126 Q110 153 140 124"
                fill="none"
                stroke="#1c0a08"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M48 135 L20 157 M172 128 L198 105"
                stroke="#1c0a08"
                strokeWidth="9"
                strokeLinecap="round"
              />
              <path
                d="M77 178 L65 207 M143 176 L160 203"
                stroke="#1c0a08"
                strokeWidth="10"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <button
            className="statement-cta"
            onClick={() => goTo("services")}
          >
            explore services <span>↗</span>
          </button>
        </div>
      </section>

      {/* 5 Core Services Section */}
      <Services onSelectService={contactWithService} />

      {/* Selected Work Portfolio (De-duplicated & Focused) */}
      <section className="portfolio section-dark" id="cases">
        <div className="section-label reveal">
          <span>003 — SELECTED CASE STUDIES</span>
          <span>VIDEO · WEB · APPS · COMMERCE · MARKETING</span>
        </div>
        <h2 className="portfolio-heading reveal">
          LESS TALK.<br />
          <span>PROVEN RESULTS.</span>
        </h2>

        <div className="portfolio-stage">
          <div className="burst" aria-hidden="true" />
          <div className="card-stack" style={{ "--active-color": current.color }}>
            {projects.map((project, index) => {
              const distance = index - activeProject;
              return (
                <button
                  key={project.name}
                  className={`project-card ${distance === 0 ? "project-active" : ""}`}
                  style={{
                    "--project-color": project.color,
                    "--distance": distance,
                    zIndex: projects.length - Math.abs(distance),
                  }}
                  onClick={() => setActiveProject(index)}
                  aria-label={`Select ${project.name}`}
                >
                  <span className="project-card-label">404ØX / PORTFOLIO</span>
                  <span className="project-symbol">{project.symbol}</span>
                  <span className="project-card-name">{project.name}</span>
                  <span className="project-card-type">{project.type}</span>
                </button>
              );
            })}
          </div>

          {/* Unified Project Info Panel */}
          <div className="project-info">
            <span className="eyebrow">
              FEATURED CASE STUDY / 0{activeProject + 1}
            </span>
            <h3>{current.name}</h3>
            <span className="project-category">{current.type}</span>
            <p>{current.description}</p>
            <div className="project-deliverables">
              <strong>DELIVERABLES:</strong> {current.deliverables}
            </div>
            <button
              className="project-action-btn"
              onClick={() => contactWithService(current.serviceName)}
            >
              START A {current.serviceName.toUpperCase()} PROJECT <span>↗</span>
            </button>
          </div>
        </div>

        <div className="portfolio-controls">
          <button
            onClick={() =>
              setActiveProject(
                (activeProject + projects.length - 1) % projects.length
              )
            }
          >
            ← PREVIOUS
          </button>
          <span>
            0{activeProject + 1} / 0{projects.length}
          </span>
          <button
            onClick={() =>
              setActiveProject((activeProject + 1) % projects.length)
            }
          >
            NEXT →
          </button>
        </div>
      </section>

      {/* 57+ Projects Track Record & Proven Metrics Section */}
      <section className="track-record section-dark" id="track-record">
        <div className="section-label reveal">
          <span>004 — PROVEN TRACK RECORD</span>
          <span>57+ PROJECTS SHIPPED & COUNTING</span>
        </div>

        <div className="track-record-header reveal">
          <div>
            <h2 className="display-heading">
              57+ PROJECTS.<br />
              REAL RESULTS.<br />
              ZERO EXCUSES<span className="lime-dot">.</span>
            </h2>
          </div>
          <div className="track-record-intro">
            <span className="track-record-badge">VERIFIED AGENCY TRACK RECORD</span>
            <p>
              We've partnered with ambitious founders, creator brands, and scaling businesses to design, engineer, and market 57+ high-impact digital projects. Every build is engineered for high conversion, high retention, and tangible ROI.
            </p>
          </div>
        </div>

        {/* Big Grid of Key Metrics */}
        <div className="metrics-grid">
          {/* Main Hero Card: 57 Projects */}
          <div className="metric-card metric-card-hero reveal">
            <div className="metric-card-top">
              <span className="metric-category">COMPLETED PROJECTS</span>
              <span className="metric-pill">ALL 5 CORE PILLARS</span>
            </div>
            <div className="metric-number-wrap">
              <span className="metric-number">
                57<span className="metric-plus">+</span>
              </span>
            </div>
            <h3 className="metric-title">Digital Projects Designed, Engineered & Scaled</h3>
            <p className="metric-desc">
              From viral video edits and high-performance websites to full-stack mobile apps, custom e-commerce storefronts, and performance ad engines.
            </p>

            {/* Breakdown Bars across 5 Pillars */}
            <div className="pillar-breakdown">
              <span className="breakdown-label">PROJECT BREAKDOWN (57 TOTAL DELIVERED):</span>
              <div className="breakdown-grid">
                <div className="breakdown-item">
                  <div className="breakdown-head">
                    <span className="dot dot-lime"></span>
                    <span className="b-name">Websites & Web Apps</span>
                    <span className="b-count">21</span>
                  </div>
                  <div className="breakdown-bar">
                    <div className="bar-fill fill-lime" style={{ width: "37%" }}></div>
                  </div>
                </div>

                <div className="breakdown-item">
                  <div className="breakdown-head">
                    <span className="dot dot-pink"></span>
                    <span className="b-name">Viral Video Editing & Commercials</span>
                    <span className="b-count">16</span>
                  </div>
                  <div className="breakdown-bar">
                    <div className="bar-fill fill-pink" style={{ width: "28%" }}></div>
                  </div>
                </div>

                <div className="breakdown-item">
                  <div className="breakdown-head">
                    <span className="dot dot-violet"></span>
                    <span className="b-name">Custom E-Commerce Storefronts</span>
                    <span className="b-count">9</span>
                  </div>
                  <div className="breakdown-bar">
                    <div className="bar-fill fill-violet" style={{ width: "16%" }}></div>
                  </div>
                </div>

                <div className="breakdown-item">
                  <div className="breakdown-head">
                    <span className="dot dot-cyan"></span>
                    <span className="b-name">Mobile Apps (iOS & Android)</span>
                    <span className="b-count">7</span>
                  </div>
                  <div className="breakdown-bar">
                    <div className="bar-fill fill-cyan" style={{ width: "12%" }}></div>
                  </div>
                </div>

                <div className="breakdown-item">
                  <div className="breakdown-head">
                    <span className="dot dot-orange"></span>
                    <span className="b-name">Digital Marketing & Ad Engines</span>
                    <span className="b-count">4</span>
                  </div>
                  <div className="breakdown-bar">
                    <div className="bar-fill fill-orange" style={{ width: "7%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Metric Cards */}
          <div className="metric-cards-col">
            <div className="metric-card reveal">
              <span className="metric-category">AUDIENCE REACH</span>
              <div className="metric-number-wrap">
                <span className="metric-number">
                  18.5<span className="metric-plus">M+</span>
                </span>
              </div>
              <h3 className="metric-title">Video Views & Ad Impressions</h3>
              <p className="metric-desc">
                Engineered retention hooks, kinetic sound design, and paid acquisition funnels generating massive organic and commercial reach.
              </p>
            </div>

            <div className="metric-card reveal">
              <span className="metric-category">CLIENT TRUST</span>
              <div className="metric-number-wrap">
                <span className="metric-number">
                  99.2<span className="metric-plus">%</span>
                </span>
              </div>
              <h3 className="metric-title">On-Time Delivery & Repeat Rate</h3>
              <p className="metric-desc">
                Transparent weekly sprint milestones, direct WhatsApp access, and rigorous testing with zero ghosting.
              </p>
            </div>

            <div className="metric-card reveal">
              <span className="metric-category">REVENUE MULTIPLE</span>
              <div className="metric-number-wrap">
                <span className="metric-number">
                  3.4<span className="metric-plus">x</span>
                </span>
              </div>
              <h3 className="metric-title">Average ROAS & Conversion Lift</h3>
              <p className="metric-desc">
                Proven business lift across custom storefronts, optimized checkout flows, and high-intent performance ad campaigns.
              </p>
            </div>
          </div>
        </div>

        {/* Shipped Project Roster Ticker / Pill Showcase */}
        <div className="project-roster-box reveal">
          <div className="roster-header">
            <div>
              <span className="roster-title">SAMPLE COMPLETED WORK FROM OUR 57 PROJECTS</span>
              <span className="roster-sub">Delivered across tech SaaS, e-commerce, fitness, creators, and direct-to-consumer</span>
            </div>
            <button
              className="roster-cta-btn"
              onClick={() => contactWithService("Project #58")}
            >
              BECOME PROJECT #58 <span>↗</span>
            </button>
          </div>

          <div className="roster-chips">
            <span className="roster-chip"><span>01</span> Next.js Creative Portfolio</span>
            <span className="roster-chip"><span>02</span> Viral Reels Campaign (4.2M Views)</span>
            <span className="roster-chip"><span>03</span> React Native Mobile App</span>
            <span className="roster-chip"><span>04</span> Shopify Plus Fashion Store</span>
            <span className="roster-chip"><span>05</span> Meta Performance Ad Engine</span>
            <span className="roster-chip"><span>06</span> B2B SaaS Dashboard UI/UX</span>
            <span className="roster-chip"><span>07</span> YouTube Shorts Pacing System</span>
            <span className="roster-chip"><span>08</span> Luxury Jewelry Storefront</span>
            <span className="roster-chip"><span>09</span> Full-Stack Web App & API</span>
            <span className="roster-chip"><span>10</span> Google Search & PMax Funnel</span>
            <span className="roster-chip highlight"><span>+47</span> More Completed Projects</span>
          </div>
        </div>
      </section>

      {/* International Clients & Global Partners Section */}
      <section className="clients section-dark" id="clients">
        <div className="section-label reveal">
          <span>005 — GLOBAL FOOTPRINT</span>
          <span>16 GLOBAL & INDIAN-FOUNDED MARKET LEADERS</span>
        </div>

        <div className="clients-header reveal">
          <div>
            <h2 className="display-heading">
              TRUSTED BY<br />
              GLOBAL BRANDS<span className="lime-dot">.</span>
            </h2>
          </div>
          <div className="clients-intro">
            <span className="clients-badge">WORLDWIDE CLIENT ROSTER</span>
            <p>
              We collaborate with premier international enterprises and Indian-founded global tech leaders across{" "}
              <strong>India, the United States, Canada, the UK, Sweden, and Russia</strong>. From viral video edits and high-speed web apps 
              to custom storefronts and developer platforms.
            </p>
          </div>
        </div>

        {/* Global Marquee Streamer */}
        <div className="clients-marquee" aria-hidden="true">
          <div className="clients-marquee-track">
            {[...internationalClients, ...internationalClients].map((client, idx) => (
              <div className="marquee-client-item" key={idx}>
                <span className="marquee-flag">{client.flag}</span>
                <span className="marquee-name">{client.name}</span>
                <span className="marquee-country">({client.country})</span>
                <span className="marquee-sep">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* Country Filter Tabs */}
        <div className="country-filters reveal">
          <button
            type="button"
            className={`country-filter-btn ${activeCountryFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveCountryFilter("all")}
          >
            <span>ALL REGIONS</span>
            <span className="count-pill">16</span>
          </button>
          <button
            type="button"
            className={`country-filter-btn ${activeCountryFilter === "india" ? "active" : ""}`}
            onClick={() => setActiveCountryFilter("india")}
          >
            <span>🇮🇳 INDIA & ESTABLISHED ABROAD</span>
            <span className="count-pill">3</span>
          </button>
          <button
            type="button"
            className={`country-filter-btn ${activeCountryFilter === "uk" ? "active" : ""}`}
            onClick={() => setActiveCountryFilter("uk")}
          >
            <span>🇬🇧 UNITED KINGDOM</span>
            <span className="count-pill">4</span>
          </button>
          <button
            type="button"
            className={`country-filter-btn ${activeCountryFilter === "canada" ? "active" : ""}`}
            onClick={() => setActiveCountryFilter("canada")}
          >
            <span>🇨🇦 CANADA</span>
            <span className="count-pill">3</span>
          </button>
          <button
            type="button"
            className={`country-filter-btn ${activeCountryFilter === "sweden" ? "active" : ""}`}
            onClick={() => setActiveCountryFilter("sweden")}
          >
            <span>🇸🇪 SWEDEN</span>
            <span className="count-pill">3</span>
          </button>
          <button
            type="button"
            className={`country-filter-btn ${activeCountryFilter === "russia" ? "active" : ""}`}
            onClick={() => setActiveCountryFilter("russia")}
          >
            <span>🇷🇺 RUSSIA</span>
            <span className="count-pill">3</span>
          </button>
        </div>

        {/* 16 Global & Indian Market Leaders Grid */}
        <div className="clients-grid">
          {internationalClients
            .filter((c) => activeCountryFilter === "all" || c.countryKey === activeCountryFilter)
            .map((client) => (
              <div 
                className="client-card reveal" 
                key={client.name}
                style={{ "--client-accent": client.accent }}
              >
                <div className="client-card-top">
                  <span className="client-symbol">{client.symbol}</span>
                  <div className="client-origin">
                    <span className="client-flag">{client.flag}</span>
                    <span className="client-loc">
                      {client.country.toUpperCase()} · {client.city.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="client-card-main">
                  <div className="client-title-row">
                    <h3 className="client-name">{client.name}</h3>
                    <span className="client-highlight-tag">{client.highlight}</span>
                  </div>
                  <span className="client-category">{client.category}</span>
                </div>

                {/* What we worked on & how we worked narrative */}
                <p className="client-narrative-desc">{client.description}</p>

                <div className="client-detail-breakdown">
                  <div className="breakdown-cell">
                    <span className="cell-label">
                      <span className="cell-dot dot-lime"></span> WHAT WE WORKED ON:
                    </span>
                    <p className="cell-text">{client.whatWeDid}</p>
                  </div>

                  <div className="breakdown-cell">
                    <span className="cell-label">
                      <span className="cell-dot dot-cyan"></span> HOW WE EXECUTED:
                    </span>
                    <p className="cell-text">{client.howWeWorked}</p>
                  </div>
                </div>

                <div className="client-card-bottom">
                  <div className="client-impact-badge">
                    <span className="impact-icon">⚡</span>
                    <span className="impact-text">{client.impact}</span>
                  </div>

                  <button 
                    type="button" 
                    className="client-action-btn"
                    onClick={() => contactWithService(`${client.name} tier partnership`)}
                    title={`Discuss a project similar to ${client.name}`}
                  >
                    <span>WORK LIKE THIS</span>
                    <span>↗</span>
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Global Partnership Banner */}
        <div className="clients-trust-banner reveal">
          <div className="trust-banner-info">
            <span className="trust-banner-label">GLOBAL COLLABORATION STANDARD</span>
            <p className="trust-banner-title">
              Working seamlessly across IST, GMT, EST, CET, and MSK time zones with asynchronous sprint updates and direct WhatsApp / Slack channels.
            </p>
          </div>
          <button 
            type="button"
            className="trust-banner-cta"
            onClick={() => contactWithService("International Client Partnership")}
          >
            START AN INTERNATIONAL PROJECT <span>↗</span>
          </button>
        </div>
      </section>

      {/* Process Section - HORIZONTAL PIPELINE WORKFLOW */}
      <section className="process section-dark" id="process">
        <div className="section-label reveal">
          <span>006 — HOW WE DELIVER</span>
          <span>FROM IDEA TO REVENUE</span>
        </div>

        <div className="process-header-row reveal">
          <div>
            <h2 className="display-heading">
              STRATEGY.<br />
              EXECUTION.<br />
              IMPACT<span className="lime-dot">.</span>
            </h2>
          </div>
          <div className="process-pipeline-meta">
            <span className="process-pipeline-badge">THE 404ØX BLUEPRINT</span>
            <p className="process-pipeline-desc">
              A battle-tested 4-stage sprint engineered to transform raw vision into high-converting digital products, viral media, and measurable revenue.
            </p>
          </div>
        </div>

        {/* Stepper progress pipeline track */}
        <div className="process-stepper-track reveal">
          {processSteps.map((item, idx) => (
            <div
              key={item.number}
              className={`process-stepper-node ${expandedProcess === item.number ? "active" : ""}`}
              onClick={() => {
                toggleProcess(item.number);
                scrollToProcessStep(idx);
              }}
              role="button"
              tabIndex={0}
              aria-label={`Select stage ${item.number}`}
            >
              <div className="node-marker">
                <span className="node-num">{item.number}</span>
                <span className="node-dot"></span>
              </div>
              <span className="node-label">{item.title}</span>
              {idx < processSteps.length - 1 && (
                <span className="node-connector" aria-hidden="true">→</span>
              )}
            </div>
          ))}
        </div>

        {/* Horizontal Process Cards Container */}
        <div className="process-horizontal-container" ref={processScrollRef}>
          {processSteps.map((item) => {
            const isExpanded = expandedProcess === item.number;
            return (
              <article
                className={`process-card reveal ${isExpanded ? "process-card-expanded" : ""}`}
                key={item.number}
                onClick={() => toggleProcess(item.number)}
              >
                {/* Top card bar with stage number & workable arrow button */}
                <div className="process-card-top">
                  <div className="process-num-wrap">
                    <span className="process-card-num">{item.number}</span>
                    <span className="process-card-phase">{item.phase}</span>
                  </div>

                  {/* Workable ↗ Arrow Button */}
                  <button
                    type="button"
                    className={`process-arrow-btn ${isExpanded ? "arrow-open" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleProcess(item.number);
                    }}
                    aria-label={`Toggle stage ${item.number} deliverables`}
                    title={isExpanded ? "Collapse stage details" : "Expand stage deliverables"}
                  >
                    <span>{isExpanded ? "✕" : "↗"}</span>
                  </button>
                </div>

                <div className="process-card-body">
                  <h3 className="process-card-title">{item.title}</h3>
                  <p className="process-card-description">{item.description}</p>
                </div>

                {/* Quick Toggle Indicator */}
                <div className="process-card-expand-hint">
                  <span>{isExpanded ? "COLLAPSE DELIVERABLES −" : "VIEW DELIVERABLES & TOOLS ↗"}</span>
                </div>

                {/* Expandable Deliverables & Tools Drawer inside Card */}
                {isExpanded && (
                  <div
                    className="process-card-drawer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="drawer-section">
                      <span className="drawer-subhead">KEY STAGE DELIVERABLES</span>
                      <ul className="drawer-deliverables">
                        {item.deliverables.map((deliv, idx) => (
                          <li key={idx}>
                            <span className="check-bullet">✔</span>
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="drawer-section">
                      <span className="drawer-subhead">TOOLS & STACK</span>
                      <div className="drawer-tools">
                        {item.tools.map((tool, idx) => (
                          <span key={idx} className="tool-tag">{tool}</span>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="process-stage-cta"
                      onClick={() => contactWithService(`Stage ${item.number}: ${item.title}`)}
                    >
                      {item.ctaText} <span>↗</span>
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Mobile / Tablet Horizontal Navigation Controls */}
        <div className="process-nav-controls">
          <div className="process-step-indicators">
            {processSteps.map((step, idx) => (
              <button
                key={step.number}
                className={`step-dot ${expandedProcess === step.number ? "active" : ""}`}
                onClick={() => {
                  toggleProcess(step.number);
                  scrollToProcessStep(idx);
                }}
                aria-label={`Go to stage ${step.number}`}
              >
                <span>{step.number}</span>
              </button>
            ))}
          </div>
          <div className="process-scroll-btns">
            <button
              type="button"
              className="scroll-arrow-btn"
              onClick={() => scrollProcessHorizontally(-1)}
              aria-label="Previous process stage"
            >
              ←
            </button>
            <button
              type="button"
              className="scroll-arrow-btn"
              onClick={() => scrollProcessHorizontally(1)}
              aria-label="Next process stage"
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section with +919196299954 and Quick Channels */}
      <section className="contact section-light" id="contact">
        <div className="section-label reveal">
          <span>007 — LET'S CONNECT</span>
          <span>DIRECT ACCESS & ENQUIRY</span>
        </div>

        <div className="contact-layout">
          <div className="contact-heading">
            <h2 className="display-heading reveal">
              READY TO<br />
              BUILD & GROW?<br />
              <span>LET'S TALK.</span>
            </h2>
            <p>
              Whether you need high-retention video editing, a brand new website or app, an e-commerce store, or digital marketing campaigns that generate real revenue, get in touch with us directly.
            </p>

            {/* Direct Instant Channels with +919196299954 */}
            <div className="direct-channels">
              <a
                href={`tel:${phoneNumber}`}
                className="channel-card phone-channel"
              >
                <div className="channel-icon">📞</div>
                <div className="channel-info">
                  <small>DIRECT PHONE CALL</small>
                  <strong>{phoneFormatted}</strong>
                </div>
                <span className="channel-arrow">↗</span>
              </a>

              <a
                href={`https://wa.me/919196299954?text=${encodeURIComponent(
                  "Hi 404ØX Studio! I would like to discuss a project."
                )}`}
                target="_blank"
                rel="noreferrer"
                className="channel-card whatsapp-channel"
              >
                <div className="channel-icon">💬</div>
                <div className="channel-info">
                  <small>INSTANT WHATSAPP</small>
                  <strong>{phoneFormatted}</strong>
                </div>
                <span className="channel-arrow">↗</span>
              </a>

              <a
                href="mailto:hello@404ox.studio"
                className="channel-card email-channel"
              >
                <div className="channel-icon">✉️</div>
                <div className="channel-info">
                  <small>STUDIO EMAIL</small>
                  <strong>hello@404ox.studio</strong>
                </div>
                <span className="channel-arrow">↗</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form className="contact-form" onSubmit={submitForm}>
            <label>
              Your Name
              <input
                required
                name="name"
                placeholder="What should we call you?"
              />
            </label>

            <label>
              Your Email
              <input
                required
                type="email"
                name="email"
                placeholder="you@company.com"
              />
            </label>

            <label>
              Phone / WhatsApp Number
              <input
                type="tel"
                name="phone"
                placeholder="+91 ... (optional for fast callback)"
              />
            </label>

            <label>
              What are we building?
              <select
                name="project"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
              >
                <option value="">Select a service / focus area</option>
                <option value="Website Building">Website Building</option>
                <option value="App Building">App Building (Web / Mobile)</option>
                <option value="Video Editing">Video Editing (Reels, Shorts, Brand)</option>
                <option value="E-Commerce">E-Commerce Storefront</option>
                <option value="Digital Marketing">Digital Marketing & Ads</option>
                <option value="Complete Studio Retainer">Complete Studio Retainer</option>
              </select>
            </label>

            <label>
              Project Details & Scope
              <textarea
                required
                name="description"
                rows="4"
                placeholder="Tell us about your brand, current timeline, goals, and what you're looking to achieve…"
              />
            </label>

            <input type="hidden" name="service" value={selectedService} />

            <div className="form-submit-row">
              <button className="submit-button" type="submit">
                <span>SEND ENQUIRY</span>
                <span>↗</span>
              </button>
              <button
                type="button"
                className="whatsapp-quick-btn"
                onClick={openWhatsApp}
                title="Chat with us immediately on WhatsApp"
              >
                <span>CHAT ON WHATSAPP</span>
                <span>💬</span>
              </button>
            </div>

            {formStatus && <p className="form-status" role="status">{formStatus}</p>}
            <small>We typically respond within 2 business hours.</small>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i}>
                404ØX <b>✳</b> WEBSITES <b>·</b> APPS <b>·</b> VIDEO EDITING <b>·</b> E-COMMERCE <b>·</b> DIGITAL MARKETING <b>↗</b>{" "}
              </span>
            ))}
          </div>
        </div>

        <div className="footer-main">
          <div className="footer-left">
            <h2>
              LET'S BUILD SOMETHING<br />
              UNFORGETTABLE.
            </h2>
            <div className="footer-links">
              <a href="#home">Home</a>
              <a href="#about">About us</a>
              <a href="#services">Services</a>
              <a href="#cases">Portfolio</a>
              <a href="#process">Process</a>
              <a href="#contact">Contact</a>
            </div>
          </div>

          <div className="footer-right">
            <span className="footer-label">DIRECT PHONE / HOTLINE</span>
            <a className="footer-phone" href={`tel:${phoneNumber}`}>
              {phoneFormatted} ↗
            </a>

            <span className="footer-label">OFFICIAL EMAIL</span>
            <a className="footer-email" href="mailto:hello@404ox.studio">
              hello@404ox.studio ↗
            </a>

            <div className="social-links">
              <a
                href={`https://wa.me/919196299954`}
                target="_blank"
                rel="noreferrer"
                className="social-pill"
              >
                WhatsApp ↗
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="social-pill"
              >
                Instagram ↗
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="social-pill"
              >
                LinkedIn ↗
              </a>
            </div>

            <div className="legal">
              <span>© 2026 404ØX STUDIO. ALL RIGHTS RESERVED.</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
