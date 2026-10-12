import React from "react";
import "./Services.css";

const services = [
  {
    id: "service-website-building",
    number: "01",
    title: "Website Building",
    tagline: "Fast, striking, high-converting websites.",
    description:
      "We design and engineer modern, responsive websites built for speed and engagement. From business landing pages to interactive creative experiences, every pixel is crafted to turn visitors into paying clients.",
    features: [
      "Business & brand websites",
      "High-converting landing pages",
      "Interactive portfolio websites",
      "Custom UI/UX interface design",
      "Modern React / Next.js builds",
      "Smooth GSAP & WebGL animations",
      "Performance & SEO optimization",
      "Mobile-first responsive design",
    ],
    color: "lime",
    symbol: "Ø",
  },
  {
    id: "service-app-building",
    number: "02",
    title: "App Building",
    tagline: "Custom mobile & web apps built to scale.",
    description:
      "From initial UI/UX architecture to production deployment, we build high-performance iOS, Android and web applications. Scalable backends, real-time sync, and intuitive touch interactions.",
    features: [
      "iOS & Android mobile apps",
      "Cross-platform React Native",
      "Full-stack web applications",
      "SaaS product development",
      "Custom API & database design",
      "Cloud backend & authentication",
      "Push notifications & real-time sync",
      "App Store & Play Store deployment",
    ],
    color: "cyan",
    symbol: "◉",
  },
  {
    id: "service-video-editing",
    number: "03",
    title: "Video Editing",
    tagline: "Viral short-form & cinematic brand stories.",
    description:
      "We transform raw footage into high-retention visual content engineered to stop the scroll. From Instagram Reels and YouTube Shorts to cinematic corporate films, product commercials and YouTube videos.",
    features: [
      "Instagram Reels & TikToks",
      "YouTube Shorts & viral clips",
      "Long-form YouTube video editing",
      "Commercial brand films",
      "Motion graphics & animated titles",
      "Cinematic color grading & LUTs",
      "Professional sound design & SFX",
      "High-converting video ad creatives",
    ],
    color: "pink",
    symbol: "▶",
  },
  {
    id: "service-e-commerce",
    number: "04",
    title: "E-Commerce",
    tagline: "High-growth online storefronts that sell.",
    description:
      "We build modern online stores that turn casual browsers into loyal buyers. Clean product presentation, frictionless 1-click checkout, payment integrations and robust automated order management.",
    features: [
      "Shopify & Shopify Plus stores",
      "WooCommerce & custom shops",
      "High-converting checkout flows",
      "Payment gateway integration",
      "Inventory & order automation",
      "Product catalogue setup & design",
      "Mobile-first shopping experience",
      "Speed, CRO & cart recovery",
    ],
    color: "violet",
    symbol: "✳",
  },
  {
    id: "service-digital-marketing",
    number: "05",
    title: "Digital Marketing",
    tagline: "Targeted campaigns that drive real revenue.",
    description:
      "We connect your brand with high-intent buyers through data-driven campaigns and creative advertising. Performance ads, search visibility, high-ROI funnels and strategic content engines.",
    features: [
      "Meta (Instagram & Facebook) Ads",
      "Google Search & Performance Max",
      "Search Engine Optimisation (SEO)",
      "Content strategy & planning",
      "High-intent lead generation",
      "High-ROI email marketing funnels",
      "Conversion tracking & analytics",
      "Audience scaling & retargeting",
    ],
    color: "blue",
    symbol: "✦",
  },
];

export default function Services({ onSelectService }) {
  const handleServiceClick = (e, title) => {
    if (onSelectService) {
      e.preventDefault();
      onSelectService(title);
    }
  };

  return (
    <section className="ox-services" id="services">
      <div className="ox-services-intro">
        <span className="ox-eyebrow">
          404ØX STUDIO / OUR CORE PILLARS
        </span>

        <h2>
          WHAT ARE WE
          <br />
          BUILDING FOR <span>YOU?</span>
        </h2>

        <p>
          Specialized in video editing, website building, app building,
          e-commerce storefronts, and performance digital marketing. Everything you need to scale, all under one roof.
        </p>
      </div>

      <div className="ox-services-grid">
        {services.map((service) => (
          <article
            className={`ox-service-card ${service.color}`}
            id={service.id}
            key={service.number}
          >
            <div className="ox-service-meta">
              <span>SERVICE / {service.number}</span>
              <span className="ox-service-symbol">
                {service.symbol}
              </span>
            </div>

            <h3>{service.title}</h3>
            <h4>{service.tagline}</h4>

            <p className="ox-service-description">
              {service.description}
            </p>

            <div className="ox-feature-heading">
              WHAT'S INCLUDED
            </div>

            <ul className="ox-service-features">
              {service.features.map((feature) => (
                <li key={feature}>
                  <span aria-hidden="true">↗</span>
                  {feature}
                </li>
              ))}
            </ul>

            <a
              className="ox-service-button"
              href="#contact"
              onClick={(e) => handleServiceClick(e, service.title)}
            >
              DISCUSS YOUR PROJECT
              <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>

      <div className="ox-services-bottom">
        <span>ONE STUDIO. FIVE WAYS TO SCALE YOUR BRAND.</span>
        <div className="ox-services-bottom-links">
          <a href="tel:+919196299954" className="ox-call-link">
            CALL US: +91 91962 99954 ↗
          </a>
          <a 
            href="#contact"
            onClick={(e) => handleServiceClick(e, "Custom Strategy")}
          >
            LET'S TALK ABOUT YOUR PROJECT ↗
          </a>
        </div>
      </div>
    </section>
  );
}
