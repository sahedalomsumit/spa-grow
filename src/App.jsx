import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  EyeOff,
  NavigationOff,
  LayoutTemplate,
  Smartphone,
  MousePointerClick,
  ShieldCheck,
  Zap,
  Link,
  Search,
  CheckCircle,
  Palette,
  Star,
  ChevronDown,
  ChevronUp,
  Send,
  XCircle,
  Mail,
  Phone,
  Plus,
  Menu,
  X,
} from "lucide-react";
import heroImg from "./assets/hero_spa_sage.png";
import profileImg from "./assets/sahedalomsumit-profile-removebg-preview.png";
import blobSvg from "./assets/blob.svg";
import auraBernImg from "./assets/Aura Bern.png";
import jenniImg from "./assets/jenni-wellbeing.png";
import logoImg from "./assets/favicon-sahed-alom-sumit.png";

/* ─────────────────── Scroll Reveal Hook ─────────────────── */
function Reveal({ children, delay = 0, className = "", style = {} }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{
        duration: 0.7,
        ease: [0.23, 1, 0.32, 1],
        delay: delay ? delay / 1000 : 0,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────── Header ─────────────────── */
const navLinks = [
  { name: "PROJECTS", href: "#projects" },
  { name: "PROCESS", href: "#process" },
  { name: "PROBLEM", href: "#problem" },
  { name: "SOLUTION", href: "#solution" },
  { name: "FORM", href: "#audit" },
  { name: "ABOUT", href: "#about" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section tracking
      const sections = navLinks.map((link) => link.href.substring(1));
      let currentSection = "";

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is near the top of the viewport
          if (rect.top <= 150) {
            currentSection = sectionId;
          }
        }
      }
      setActiveSection(currentSection);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setIsOpen(false);

    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      // Small timeout to allow the menu to start closing and body overflow to reset
      setTimeout(() => {
        // Get individual scroll-margin-top from CSS to allow section-specific offsets
        const computedStyle = window.getComputedStyle(element);
        const scrollMarginTop = parseInt(computedStyle.scrollMarginTop) || 70;
        
        const rect = element.getBoundingClientRect();
        const scrollPosition = rect.top + window.pageYOffset - scrollMarginTop;

        window.scrollTo({
          top: scrollPosition,
          behavior: "smooth"
        });
      }, 100);
    }
  };

  return (
    <header
      className={`header ${scrolled ? "scrolled" : ""}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          padding: "14px 5vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Logo */}
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
          }}
        >
          <img
            src={logoImg}
            alt="SpaGrow Logo"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "var(--bg-tint)",
              padding: "4px",
            }}
          />
          <span
            style={{
              fontFamily: "var(--serif)",
              fontSize: "1.4rem",
              fontWeight: 700,
              color: "var(--primary)",
              letterSpacing: "-0.02em",
            }}
          >
            SpaGrow
          </span>
        </a>

        {/* Desktop Menu */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <nav className="desktop-nav" style={{ display: "flex", gap: "32px" }}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`nav-link ${
                  activeSection === link.href.substring(1) ? "active" : ""
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-toggle"
            style={{
              display: "none",
              background: "none",
              border: "none",
              color: "var(--primary)",
              cursor: "pointer",
              padding: "8px",
            }}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              overflow: "hidden",
              background: "var(--bg)",
              borderBottom: "1px solid var(--stone)",
              boxShadow: "var(--shadow-lg)",
            }}
            className="mobile-nav"
          >
            <div
              style={{
                padding: "20px 5vw 40px",
                display: "flex",
                flexDirection: "column",
                gap: "0px",
              }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`nav-link ${
                    activeSection === link.href.substring(1) ? "active" : ""
                  }`}
                  onClick={(e) => scrollToSection(e, link.href)}
                  style={{
                    fontSize: "1.2rem",
                    width: "100%",
                    display: "block",
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

/* ─────────────────── Hero ─────────────────── */
const Hero = () => (
  <section
    id="hero"
    className="section"
    style={{
      paddingTop: "140px",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <Reveal>
      <div className="badge">Based in Helsinki, Finland</div>
    </Reveal>

    <Reveal delay={100}>
      <h1 style={{ marginTop: "16px", maxWidth: "900px" }}>
        Get More Spa Bookings{" "}
        <span className="text-italic" style={{ color: "var(--primary)" }}>
          Without Paying for Ads
        </span>
      </h1>
    </Reveal>

    <Reveal delay={200}>
      <p
        style={{
          marginTop: "32px",
          fontSize: "1.4rem",
          lineHeight: 1.5,
          maxWidth: "700px",
        }}
      >
        I redesign spa and wellness websites so visitors instantly{" "}
        <strong style={{ color: "var(--text)" }}>trust your brand</strong>, feel
        the calm before they arrive, and book — instead of browsing and leaving.
      </p>
    </Reveal>

    <Reveal delay={300}>
      <div
        style={{
          marginTop: "48px",
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <a
          href="#audit"
          className="btn btn-primary"
          id="hero-cta"
          aria-label="Get a free homepage redesign"
        >
          Get a Free Homepage Redesign{" "}
          <ArrowRight size={20} style={{ marginLeft: "10px" }} />
        </a>
        <div className="offer-pill">
          <Star size={16} style={{ color: "var(--secondary)" }} />
          <span>25% off your first project — only a few spots left</span>
        </div>
      </div>
    </Reveal>

    {/* Hero Image */}
    <Reveal delay={400}>
      <div
        style={{
          marginTop: "80px",
          borderRadius: "40px",
          overflow: "hidden",
          height: "520px",
          width: "100%",
          position: "relative",
        }}
      >
        <img
          src={heroImg}
          alt="Premium spa interior showcasing a calm, minimalist design aesthetic"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {/* Glass overlay card */}
        <div
          className="glass"
          style={{
            position: "absolute",
            bottom: "40px",
            right: "40px",
            padding: "32px",
            borderRadius: "24px",
            maxWidth: "280px",
          }}
        >
          <h3 style={{ fontSize: "1.3rem", marginBottom: "8px" }}>
            Working With Spas Worldwide
          </h3>
          <p style={{ fontSize: "0.95rem", margin: 0, maxWidth: "none" }}>
            Conversion-focused design tailored to the wellness industry.
          </p>
        </div>
      </div>
    </Reveal>
  </section>
);

/* ─────────────────── Problem ─────────────────── */
const Problem = () => (
  <section id="problem" className="section">
    <Reveal>
      <h2 style={{ maxWidth: "720px" }}>
        Your spa website might look fine…{" "}
        <span className="text-italic" style={{ color: "var(--secondary)" }}>
          but it's silently losing you bookings.
        </span>
      </h2>
    </Reveal>

    {/* Big bento grid */}
    <div className="grid-bento" style={{ marginTop: "56px" }}>
      <Reveal
        delay={0}
        className="bento-card"
        style={{
          gridColumn: "span 8",
          background: "var(--primary)",
          color: "white",
        }}
      >
        <EyeOff
          size={40}
          style={{ marginBottom: "24px", color: "var(--secondary)" }}
        />
        <h3 style={{ color: "white", fontSize: "2rem", marginBottom: "16px" }}>
          Nothing Sets You Apart
        </h3>
        <p
          style={{
            color: "rgba(255,255,255,0.82)",
            fontSize: "1.15rem",
            maxWidth: "none",
          }}
        >
          Your website doesn't communicate what makes your spa unique.
          Visitors can't tell why they should choose you over a competitor — so they
          leave and book somewhere else.
        </p>
      </Reveal>

      <Reveal
        delay={80}
        className="bento-card"
        style={{ gridColumn: "span 4" }}
      >
        <Smartphone
          size={32}
          style={{ marginBottom: "24px", color: "var(--primary)" }}
        />
        <h3 style={{ fontSize: "1.5rem", marginBottom: "12px" }}>
          Broken Mobile Experience
        </h3>
        <p>
          Over 70% of spa clients browse on their phone. If your site is slow,
          cluttered, or hard to navigate on mobile — you're losing them.
        </p>
      </Reveal>

      <Reveal
        delay={160}
        className="bento-card"
        style={{ gridColumn: "span 4" }}
      >
        <NavigationOff
          size={32}
          style={{ marginBottom: "24px", color: "var(--primary)" }}
        />
        <h3 style={{ fontSize: "1.5rem", marginBottom: "12px" }}>
          Buried Booking Flow
        </h3>
        <p>
          Your booking button is buried, unclear, or takes too many steps —
          so interested visitors give up before they ever make an appointment.
        </p>
      </Reveal>

      <Reveal
        delay={240}
        className="bento-card"
        style={{ gridColumn: "span 8", borderColor: "var(--secondary)" }}
      >
        <LayoutTemplate
          size={32}
          style={{ marginBottom: "24px", color: "var(--primary)" }}
        />
        <h3 style={{ fontSize: "1.5rem", marginBottom: "12px" }}>
          Design That Undermines Your Brand
        </h3>
        <p style={{ fontSize: "1.1rem" }}>
          Your website doesn't feel like your spa. Visitors expect calm,
          premium, and professional — but the design tells a different story.
        </p>
      </Reveal>
    </div>

    <Reveal delay={200}>
      <div className="callout-bar" style={{ marginTop: "48px" }}>
        <p
          style={{
            margin: 0,
            color: "var(--primary)",
            fontWeight: 600,
            fontSize: "1.15rem",
            maxWidth: "none",
          }}
        >
          The result? Potential clients leave your site and book with a competitor.
        </p>
      </div>
    </Reveal>
  </section>
);


/* ─────────────────── Limited Offer ─────────────────── */
const LimitedOffer = () => (
  <section className="section">
    <Reveal>
      <div className="offer-card">
        <div
          className="badge"
          style={{ background: "var(--secondary)", color: "white" }}
        >
          Limited Offer
        </div>
        <h2 style={{ marginTop: "16px", maxWidth: "700px" }}>
          25% Off Your First{" "}
          <span className="text-italic" style={{ color: "var(--primary)" }}>
            Website Project
          </span>
        </h2>
        <p style={{ fontSize: "1.2rem", marginTop: "24px" }}>
          I want to make it easy to get started — with zero risk:
        </p>
        <ul className="offer-list">
          <li>
            <CheckCircle
              size={20}
              style={{ color: "var(--primary)", flexShrink: 0 }}
            />
            <span>25% discount on your first website redesign</span>
          </li>
          <li>
            <CheckCircle
              size={20}
              style={{ color: "var(--primary)", flexShrink: 0 }}
            />
            <span>Open to spa and wellness businesses worldwide</span>
          </li>
          <li>
            <CheckCircle
              size={20}
              style={{ color: "var(--primary)", flexShrink: 0 }}
            />
            <span>See the redesign concept before you commit</span>
          </li>
        </ul>
        <a
          href="#audit"
          className="btn btn-primary"
          style={{ marginTop: "40px" }}
        >
          Claim Your Spot <ArrowRight size={18} style={{ marginLeft: "8px" }} />
        </a>
      </div>
    </Reveal>
  </section>
);

/* ─────────────────── Solution ─────────────────── */
const Solution = () => (
  <section id="solution" className="section">
    <Reveal>
      <div style={{ textAlign: "center", marginBottom: "64px" }}>
        <h2>
          What your new website{" "}
          <span className="text-italic" style={{ color: "var(--primary)" }}>
            actually delivers.
          </span>
        </h2>
        <p style={{ margin: "16px auto 0", textAlign: "center" }}>
          Not just a prettier design — real, measurable business outcomes.
        </p>
      </div>
    </Reveal>

    <div className="grid-bento">
      {[
        {
          icon: <MousePointerClick size={36} />,
          title: "Higher Booking Conversion",
          text: "Every element is designed to guide visitors from browsing to booking. Clear calls-to-action, streamlined flow, zero friction.",
          size: "span 6",
          accent: true,
        },
        {
          icon: <ShieldCheck size={36} />,
          title: "Instant Client Trust",
          text: "Professional design, real testimonials, and a calming visual identity that reflects the quality of your spa — before they even visit.",
          size: "span 6",
        },
        {
          icon: <Smartphone size={36} />,
          title: "Flawless Mobile Booking",
          text: "A fast, beautiful experience on every phone. One-tap booking, easy navigation, no pinching or zooming.",
          size: "span 4",
        },
        {
          icon: <Zap size={36} />,
          title: "Own Your Client Relationship",
          text: "Stop depending on third-party platforms that take your margins. Your website becomes your primary booking channel.",
          size: "span 4",
        },
        {
          icon: <Link size={36} />,
          title: "Stand Out in Your Market",
          text: "A website that positions your spa as the premium choice — whether clients find you on Google, social media, or word of mouth.",
          size: "span 4",
        },
      ].map((item, i) => (
        <Reveal
          key={i}
          delay={i * 80}
          className="bento-card outcome-card"
          style={{
            gridColumn: item.size,
            background: item.accent ? "var(--primary)" : undefined,
            color: item.accent ? "white" : undefined,
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: item.accent ? "var(--secondary)" : "var(--primary)",
              marginBottom: "20px",
            }}
          >
            {item.icon}
          </div>
          <h3
            style={{
              fontSize: "1.25rem",
              marginBottom: "12px",
              color: item.accent ? "white" : undefined,
            }}
          >
            {item.title}
          </h3>
          <p
            style={{
              fontSize: "0.95rem",
              margin: 0,
              maxWidth: "none",
              color: item.accent ? "rgba(255,255,255,0.8)" : undefined,
            }}
          >
            {item.text}
          </p>
        </Reveal>
      ))}
    </div>
  </section>
);

/* ─────────────────── Free Audit Section ─────────────────── */
const FreeAudit = () => (
  <section id="audit" className="section">
    <Reveal>
      <div
        style={{
          background:
            "linear-gradient(135deg, var(--bg-card) 0%, #fef0f6 100%)",
          border: "1px solid var(--stone)",
          borderRadius: "40px",
          padding: "80px 5vw",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "64px",
          alignItems: "center",
        }}
      >
        <div>
          <div className="badge">Free — No Strings Attached</div>
          <h2 style={{ marginTop: "16px", maxWidth: "580px" }}>
            I'll personally redesign your homepage and send you a{" "}
            <span className="text-italic" style={{ color: "var(--primary)" }}>
              complete visual concept.
            </span>
          </h2>
          <div style={{ marginTop: "40px", display: "grid", gap: "24px" }}>
            {[
              {
                icon: <Search size={20} />,
                text: "Exactly what's costing you bookings right now",
              },
              {
                icon: <Palette size={20} />,
                text: "A redesigned homepage concept tailored to your spa",
              },
              { icon: <Zap size={20} />, text: "A clear breakdown of why the new version converts better" },
            ].map((item, i) => (
              <div
                key={i}
                style={{ display: "flex", gap: "16px", alignItems: "center" }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "var(--stone)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--primary)",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    color: "var(--text)",
                    maxWidth: "none",
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          <p
            style={{
              marginTop: "32px",
              fontSize: "1rem",
              fontStyle: "italic",
              color: "var(--text-muted)",
            }}
          >
            Concise, actionable, and delivered within 48 hours.
          </p>
        </div>

        <div>
          <div
            className="badge"
            style={{ background: "var(--secondary)", color: "white" }}
          >
            Limited Spots Available
          </div>
          <h3
            style={{
              fontSize: "1.8rem",
              marginTop: "16px",
              marginBottom: "8px",
            }}
          >
            Get Your Free Redesign Concept
          </h3>
          <p style={{ marginBottom: "32px", fontSize: "1rem" }}>
            Share your website URL and I'll send you a redesigned homepage with a full breakdown.
          </p>
          <AuditForm />
        </div>
      </div>
    </Reveal>
  </section>
);

/* ─────────────────── Audit Form ─────────────────── */
const AuditForm = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    url: "",
    phone: "",
    notes: "",
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateField = (name, value) => {
    let error = "";
    if (name === "name" && !value) {
      error = "Name is required";
    } else if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        error = "Email is required";
      } else if (!emailRegex.test(value)) {
        error = "Please enter a valid email address";
      }
    } else if (name === "url") {
      const urlRegex =
        /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/.*)?$/;
      if (!value) {
        error = "Website URL is required";
      } else if (!urlRegex.test(value)) {
        error = "Please enter a valid URL (e.g. www.example.com)";
      }
    } else if (name === "phone" && !value) {
      error = "WhatsApp number is required";
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  const validate = () => {
    const isNameValid = validateField("name", state.name);
    const isEmailValid = validateField("email", state.email);
    const isUrlValid = validateField("url", state.url);
    const isPhoneValid = validateField("phone", state.phone);
    return isNameValid && isEmailValid && isUrlValid && isPhoneValid;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const SHEETDB_URL = import.meta.env.VITE_SHEETDB_URL;

    try {
      const response = await fetch(SHEETDB_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [
            {
              ...state,
              date: new Date().toLocaleString("en-GB"),
            },
          ],
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
      alert("Something went wrong. Please try again or contact me directly.");
    } finally {
      setLoading(false);
    }
  };

  const clearField = (field) => {
    setState({ ...state, [field]: "" });
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  if (submitted) {
    return (
      <div
        style={{
          padding: "48px",
          background: "var(--primary)",
          borderRadius: "24px",
          textAlign: "center",
          color: "white",
        }}
      >
        <CheckCircle
          size={48}
          style={{ color: "var(--secondary)", marginBottom: "16px" }}
        />
        <h3 style={{ color: "white", fontSize: "1.5rem", marginBottom: "8px" }}>
          You're on the list!
        </h3>
        <p
          style={{
            color: "rgba(255,255,255,0.8)",
            margin: 0,
            maxWidth: "none",
          }}
        >
          I'm based in Helsinki, so I'll review your site during my morning
          hours and get back to you within 48 hours with a complete redesign concept.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{ display: "flex", flexDirection: "column", gap: "4px" }}
    >
      <div className="form-field">
        <fieldset className={errors.name ? "has-error" : ""}>
          <legend>
            First Name <span className="required">*</span>
          </legend>
          <div className="input-wrapper">
            <input
              type="text"
              name="name"
              placeholder="e.g. Anna"
              value={state.name}
              onBlur={handleBlur}
              onChange={(e) => {
                setState({ ...state, name: e.target.value });
                if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
              }}
            />
            {state.name && (
              <button
                type="button"
                className="clear-btn"
                onClick={() => clearField("name")}
              >
                <XCircle size={16} />
              </button>
            )}
          </div>
        </fieldset>
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

            <div className="form-field">
        <fieldset className={errors.url ? "has-error" : ""}>
          <legend>
            Website URL <span className="required">*</span>
          </legend>
          <div className="input-wrapper">
            <input
              type="text"
              name="url"
              placeholder="e.g. www.yourspa.com"
              value={state.url}
              onBlur={handleBlur}
              onChange={(e) => {
                setState({ ...state, url: e.target.value });
                if (errors.url) setErrors((prev) => ({ ...prev, url: null }));
              }}
            />
            {state.url && (
              <button
                type="button"
                className="clear-btn"
                onClick={() => clearField("url")}
              >
                <XCircle size={16} />
              </button>
            )}
          </div>
        </fieldset>
        {errors.url && <span className="form-error">{errors.url}</span>}
      </div>

      <div className="form-field">
        <fieldset className={errors.email ? "has-error" : ""}>
          <legend>
            Email <span className="required">*</span>
          </legend>
          <div className="input-wrapper">
            <input
              type="email"
              name="email"
              placeholder="e.g. anna@yourspa.com"
              value={state.email}
              onBlur={handleBlur}
              onChange={(e) => {
                setState({ ...state, email: e.target.value });
                if (errors.email)
                  setErrors((prev) => ({ ...prev, email: null }));
              }}
            />
            {state.email && (
              <button
                type="button"
                className="clear-btn"
                onClick={() => clearField("email")}
              >
                <XCircle size={16} />
              </button>
            )}
          </div>
        </fieldset>
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>

          <div className="form-field">
            <fieldset className={errors.phone ? "has-error" : ""}>
              <legend>
                WhatsApp Number <span className="required">*</span>
              </legend>
              <div className="input-wrapper">
                <input
                  type="tel"
                  name="phone"
                  placeholder="e.g. +358 41 234 5678"
                  value={state.phone}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setState({ ...state, phone: e.target.value });
                    if (errors.phone)
                      setErrors((prev) => ({ ...prev, phone: null }));
                  }}
                />
                {state.phone && (
                  <button
                    type="button"
                    className="clear-btn"
                    onClick={() => clearField("phone")}
                  >
                    <XCircle size={16} />
                  </button>
                )}
              </div>
            </fieldset>
            {errors.phone && (
              <span className="form-error">{errors.phone}</span>
            )}
          </div>

      {!isExpanded ? (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="expand-btn"
        >
          <Plus size={16} /> Add specific notes
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          style={{ overflow: "hidden" }}
        >

          <div className="form-field">
            <fieldset>
              <legend>Any specific notes?</legend>
              <div className="input-wrapper">
                <textarea
                  name="notes"
                  placeholder="Tell me about your spa, your goals, or anything specific you'd like improved..."
                  value={state.notes}
                  onChange={(e) =>
                    setState({ ...state, notes: e.target.value })
                  }
                />
              </div>
            </fieldset>
          </div>
        </motion.div>
      )}

      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading}
        style={{ width: "100%", marginTop: "16px", opacity: loading ? 0.7 : 1 }}
        aria-label="Request your free homepage redesign"
      >
        {loading ? (
          "Sending…"
        ) : (
          <>
            Get Your Free Redesign Concept{" "}
            <Send size={18} style={{ marginLeft: "10px" }} />
          </>
        )}
      </button>
      <p
        style={{
          fontSize: "0.82rem",
          color: "var(--text-muted)",
          textAlign: "center",
          marginTop: "12px",
          maxWidth: "none",
        }}
      >
        No spam. No sales pressure. Just a redesign concept you can use.
      </p>
    </form>
  );
};

/* ─────────────────── How It Works ─────────────────── */
const Process = () => (
  <section id="process" className="section">
    <Reveal>
      <div style={{ textAlign: "center", marginBottom: "64px" }}>
        <h2>
          How it{" "}
          <span className="text-italic" style={{ color: "var(--primary)" }}>
            works.
          </span>
        </h2>
        <p style={{ margin: "16px auto 0", textAlign: "center" }}>
          A transparent, step-by-step process. No commitment until you're ready.
        </p>
      </div>
    </Reveal>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "24px",
      }}
      className="process-grid"
    >
      {[
        {
          step: "01",
          title: "Share Your Spa",
          badge: "Free",
          text: (
            <>
              Send me your spa website link by{" "}
              <strong style={{ color: "var(--primary)" }}>
                submitting the form
              </strong>{" "}
              below. It takes less than two minutes, and there's absolutely no
              commitment.
            </>
          ),
        },
        {
          step: "02",
          title: "Custom Redesign Concept",
          text: "I’ll analyze your current site and create a custom homepage concept designed to convert visitors into clients—showing you exactly what I'd improve and why.",
        },
        {
          step: "03",
          title: "Scope & Strategy Call",
          text: "If you like the concept, we’ll jump on a quick call to discuss the project scope, feature requirements, timelines, and how to reach your growth goals.",
        },
        {
          step: "04",
          title: "Kickoff & Development",
          badge: "Initial Payment",
          text: "Once we’re aligned, I begin development. I’ll provide you with a private, live design preview so you can see your site coming to life in real-time.",
        },
        {
          step: "05",
          title: "Refinement & Launch",
          text: "We’ll iterate based on your feedback. Once it's polished to perfection, we'll go live, and I’ll provide a full handover and training.",
        },
        {
          step: "06",
          title: "Final Delivery",
          badge: "Completion",
          text: "With final payment, the site is yours. No lock-in, no hidden proprietary software. You own your code, your content, and your success.",
        },
        {
          step: "07",
          title: "Ongoing Wellness Care",
          badge: "€99/mo (Optional)",
          text: "I offer optional support—handling updates, fixes, and performance tuning—so you can focus entirely on your guests. Cancel anytime.",
        },
      ].map((item, i) => (
        <Reveal key={i} delay={i * 100} style={{ gridColumn: i === 1 ? "span 2" : undefined }}>
          <div
            className="bento-card process-card"
            style={{ textAlign: "left", alignItems: "flex-start", height: "100%", display: "flex", flexDirection: "column" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "16px" }}>
               <div className="step-number" style={{ margin: 0 }}>{item.step}</div>
               {item.badge && <div className="badge" style={{ margin: 0, padding: "4px 8px", fontSize: "0.75rem" }}>{item.badge}</div>}
            </div>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
              {item.title}
            </h3>
            <p style={{ fontSize: "0.95rem", margin: 0, maxWidth: "none" }}>
              {item.text}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

/* ─────────────────── Recent Projects ─────────────────── */
const RecentProjects = () => (
  <section className="section" id="projects">
    <Reveal>
      <div style={{ textAlign: "center", marginBottom: "64px" }}>
        <div className="badge">Portfolio</div>
        <h2 style={{ marginTop: "16px" }}>
          Recent{" "}
          <span className="text-italic" style={{ color: "var(--primary)" }}>
            Spa Success Stories.
          </span>
        </h2>
        <p style={{ margin: "16px auto 0", textAlign: "center" }}>
          Websites designed to build trust, elevate brand image, and maximize bookings.
        </p>
      </div>
    </Reveal>

    <div className="grid-bento">
      {[
        {
          title: "Aura Bern",
          category: "Medical Spa • Bern, Switzerland",
          image: auraBernImg,
          link: "https://sahedalomsumit.github.io/aurabern.ch/",
          description:
            "A high-end medical spa site built to convey clinical precision and comfort. Featuring streamlined treatment menus and an frictionless path to booking consultations.",
        },
        {
          title: "Jenni Wellbeing",
          category: "Wellness Studio • Bern, Switzerland",
          image: jenniImg,
          link: "https://sahedalomsumit.github.io/jenni-wellbeing.ch/",
          description:
            "A serene, inviting design for a local wellness studio. The focus here was on creating an atmosphere of calm that makes choosing a service feel easy and natural.",
        },
      ].map((project, i) => (
        <Reveal key={i} delay={i * 100} style={{ gridColumn: "span 6" }}>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card"
            style={{
              padding: 0,
              overflow: "hidden",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              textDecoration: "none",
            }}
          >
            <div className="portfolio-image-wrapper">
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div
                className="glass"
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  padding: "6px 12px",
                  borderRadius: "100px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--primary)",
                }}
              >
                View Live Site{" "}
                <ArrowRight
                  size={14}
                  style={{ verticalAlign: "middle", marginLeft: "4px" }}
                />
              </div>
            </div>
            <div style={{ padding: "32px" }}>
              <div
                style={{
                  fontSize: "0.85rem",
                  color: "var(--secondary)",
                  fontWeight: 700,
                  marginBottom: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {project.category}
              </div>
              <h3 style={{ marginBottom: "12px", fontSize: "1.6rem" }}>
                {project.title}
              </h3>
              <p
                style={{
                  fontSize: "1rem",
                  color: "var(--text-muted)",
                  maxWidth: "none",
                }}
              >
                {project.description}
              </p>
            </div>
          </a>
        </Reveal>
      ))}
    </div>
  </section>
);

/* ─────────────────── About ─────────────────── */
const About = () => (
  <section id="about" className="section">
    <div className="grid-bento">
      <div
        style={{
          gridColumn: "span 5",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <Reveal
          delay={0}
          className="bento-card"
          style={{
            overflow: "hidden",
            padding: 0,
            minHeight: "420px",
            background: "var(--bg-tint)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <img
            src={blobSvg}
            style={{
              position: "absolute",
              width: "120%",
              height: "120%",
              opacity: 0.15,
              transform: "scale(1.2)",
              filter: "blur(40px)",
            }}
            alt=""
          />
          <img
            src={blobSvg}
            style={{
              position: "absolute",
              width: "130%",
              height: "130%",
              opacity: 0.8,
              zIndex: 1,
            }}
            alt=""
          />
          <img
            src={profileImg}
            alt="Sahed Alom Sumit, web designer for spas and wellness businesses"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              position: "relative",
              zIndex: 2,
              marginTop: "20px",
            }}
          />
        </Reveal>

        <Reveal delay={100}>
          <div
            className="contact-card bento-card"
            style={{ padding: "24px", gap: "16px", cursor: "default" }}
          >
            <div
              className="badge"
              style={{
                marginBottom: "8px",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              Direct Contact
            </div>
            <a href="mailto:sahedalomsumit@gmail.com" className="contact-item">
              <div className="contact-icon">
                <Mail size={18} />
              </div>
              sahedalomsumit@gmail.com
            </a>
            <a
              href="https://wa.me/358415765539"
              className="contact-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="contact-icon">
                <Phone size={18} />
              </div>
              +358 41 576 5539 (WhatsApp)
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal
        delay={150}
        className="bento-card"
        style={{
          gridColumn: "span 7",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div className="badge">About</div>
        <h2 style={{ marginTop: "16px", marginBottom: "16px" }}>
          Hi, I'm Sahed.
        </h2>
        <p
          style={{
            maxWidth: "none",
            fontSize: "1.3rem",
            lineHeight: 1.4,
            fontWeight: 600,
            color: "var(--primary)",
            marginBottom: "24px",
          }}
        >
          High-conversion web design for spas. <br />
          Modern, clean, and reliable.
        </p>

        <p style={{ maxWidth: "none", fontSize: "1.1rem", lineHeight: 1.7 }}>
          When you share your website with me, your problem becomes my
          problem. I don't stop until it's solved — that's what drives my work
          and why I treat every project as a craft, not a task.
        </p>

        <p
          style={{
            maxWidth: "none",
            fontSize: "1.1rem",
            lineHeight: 1.7,
            marginTop: "16px",
          }}
        >
          For over 5 years, I've partnered with founders, spa owners, and
          agencies worldwide — turning rough ideas into websites that load fast,
          feel right, and actually convert visitors into clients. I work at the
          intersection of design and full-stack development, caring as much
          about the visual experience as the code powering it.
        </p>

        <p
          style={{
            maxWidth: "none",
            fontSize: "1.1rem",
            lineHeight: 1.7,
            marginTop: "16px",
          }}
        >
          With a bachelor's in Business IT, I understand both the technical
          and commercial sides of your website. Based in Helsinki, I work with
          spa and wellness businesses worldwide to ensure every site I build
          isn't just beautiful — it's built to grow your bookings.
        </p>
        <a
          href="#audit"
          className="btn btn-primary"
          style={{ marginTop: "32px", alignSelf: "flex-start" }}
        >
          Work with Me <ArrowRight size={18} style={{ marginLeft: "8px" }} />
        </a>
      </Reveal>
    </div>
  </section>
);

/* ─────────────────── Final CTA ─────────────────── */
const FinalCTA = () => (
  <section
    className="section"
    style={{
      textAlign: "center",
      background: "var(--primary)",
      borderRadius: "60px 60px 0 0",
      color: "white",
      paddingBottom: "160px",
    }}
  >
    <Reveal>
      <h2 style={{ color: "white", maxWidth: "700px", margin: "0 auto" }}>
        See the improvement{" "}
        <span className="text-italic" style={{ color: "var(--secondary)" }}>
          before you commit.
        </span>
      </h2>
      <p
        style={{
          color: "rgba(255,255,255,0.8)",
          textAlign: "center",
          margin: "24px auto 0",
        }}
      >
        Get a free redesign concept — plus 25% off when you're ready to move forward.
      </p>
    </Reveal>

    {/* Mock preview cards */}
    <Reveal delay={200}>
      <div
        className="preview-cards-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          maxWidth: "900px",
          margin: "40px auto 64px",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.08)",
            borderRadius: "24px",
            padding: "32px",
            border: "1px solid rgba(255,255,255,0.15)",
            textAlign: "left",
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.8rem",
              margin: "0 0 12px",
              maxWidth: "none",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Before
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              "Template-based design with no personality",
              "Booking button buried three clicks deep",
              "Services listed without clear value or pricing",
              "No reviews, certifications, or trust elements",
            ].map((t, i) => (
              <div
                key={i}
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "rgba(255,100,100,0.6)",
                    flexShrink: 0,
                  }}
                />
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.95rem",
                    color: "rgba(255,255,255,0.65)",
                    maxWidth: "none",
                  }}
                >
                  {t}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            background: "rgba(194, 159, 109, 0.15)",
            borderRadius: "24px",
            padding: "32px",
            border: "1px solid var(--secondary)",
            textAlign: "left",
          }}
        >
          <p
            style={{
              color: "var(--secondary)",
              fontSize: "0.8rem",
              margin: "0 0 12px",
              maxWidth: "none",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            After
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              "Calm, premium design that matches your spa",
              "Prominent one-tap booking from any page",
              "Services presented with clear benefits and pricing",
              "Client reviews and trust signals front and center",
            ].map((t, i) => (
              <div
                key={i}
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <CheckCircle
                  size={16}
                  style={{ color: "var(--secondary)", flexShrink: 0 }}
                />
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.95rem",
                    color: "rgba(255,255,255,0.9)",
                    maxWidth: "none",
                  }}
                >
                  {t}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>

    <Reveal delay={300}>
      <div
        style={{
          marginTop: "0px",
          display: "flex",
          gap: "16px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <a
          href="#audit"
          className="btn"
          style={{ background: "var(--secondary)", color: "var(--text)" }}
        >
          Get Your Free Redesign Concept{" "}
          <ArrowRight size={20} style={{ marginLeft: "10px" }} />
        </a>
      </div>
      <p
        style={{
          margin: "24px auto 0",
          fontSize: "0.9rem",
          color: "rgba(255,255,255,0.5)",
          maxWidth: "none",
        }}
      >
        No credit card. No commitment. Just a clear path to more bookings.
      </p>
    </Reveal>
  </section>
);

/* ─────────────────── App ─────────────────── */
export default function App() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Header />
      <Hero />
      <RecentProjects />
      <Process />
      <Problem />
      <Solution />
      <LimitedOffer />
      <FreeAudit />
      <About />
      <FinalCTA />

      {/* ─────────────────── Floating Audit Button ─────────────────── */}
      <FloatingAuditButton />
    </div>
  );
}

/* ─────────────────── Floating Audit Button Component ─────────────────── */
const FloatingAuditButton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 1.5,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="floating-audit-badge"
      style={{
        position: "fixed",
        bottom: "40px",
        right: "40px",
        zIndex: 100,
      }}
    >
      <motion.a
        href="#audit"
        className="glass"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "16px 24px",
          borderRadius: "100px",
          textDecoration: "none",
          boxShadow: "var(--shadow-lg)",
          border: "1.5px solid var(--secondary)",
          color: "var(--text)",
          fontWeight: 600,
          whiteSpace: "nowrap",
          cursor: "pointer",
          willChange: "transform",
          transform: "translateZ(0)",
          WebkitFontSmoothing: "antialiased",
          backfaceVisibility: "hidden",
        }}
        whileHover={{
          scale: 1.05,
          borderColor: "var(--primary)",
        }}
        whileTap={{ scale: 0.98 }}
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <div
          style={{
            width: "44px",
            height: "44px",
            background: "var(--primary)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            boxShadow: "0 4px 12px rgba(75, 99, 68, 0.2)",
          }}
        >
          <Search size={22} />
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}
        >
          <span
            style={{
              fontSize: "0.850rem",
              display: "block",
              color: "var(--text-muted)",
              fontWeight: 500,
            }}
          >
            Get Your
          </span>
          <span
            style={{
              fontSize: "1.05rem",
              color: "var(--primary)",
              fontWeight: 700,
            }}
          >
            Free Redesign
          </span>
        </div>
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "var(--bg-tint)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "4px",
          }}
        >
          <ArrowRight size={18} style={{ color: "var(--secondary)" }} />
        </div>
      </motion.a>
    </motion.div>
  );
};
