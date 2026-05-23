import React, { useEffect, useState, lazy, Suspense } from "react";
import cv from "./cv/Jagadish Oram.pdf";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

import BlurText       from "./ui/BlurText";
import DecryptedText  from "./ui/DecryptedText";
import SpotlightCard  from "./ui/SpotlightCard";
import MagneticButton from "./ui/MagneticButton";
import AnimatedCounter from "./ui/AnimatedCounter";
import ScrollReveal   from "./ui/ScrollReveal";
import GlitchText     from "./ui/GlitchText";

const HeroScene = lazy(() => import("./three/HeroScene"));

/* ─────────────────────────────────────────────────────────────
   STATIC DATA
───────────────────────────────────────────────────────────── */
const NAV  = [
  { label: "About",    href: "#about"    },
  { label: "Skills",   href: "#skills"   },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact"  },
];

const SKILLS = [
  { name: "C",           image: require("./skill_img/C.png"),             color: "#00599C" },
  { name: "Core Java",   image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", color: "#f89820" },
  { name: "MySQL",       image: require("./skill_img/MySQL.png"),          color: "#4479A1" },
  { name: "HTML5",       image: require("./skill_img/html.png"),           color: "#E34F26" },
  { name: "CSS3",        image: require("./skill_img/css.png"),            color: "#1572B6" },
  { name: "JavaScript",  image: require("./skill_img/javascript.png"),     color: "#F7DF1E" },
  { name: "React",       image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "#61DAFB" },
  { name: "Git",         image: require("./skill_img/git.png"),            color: "#F05032" },
];

const PROJECTS = [
  {
    title:  "Career Compass",
    tags:   ["Java", "Spring Boot", "React", "MongoDB"],
    desc:   "A full-stack career guidance platform with real-time dashboards, smart tracking, and intelligent supplier management.",
    link:   "https://dsaha8598.github.io/carrier-compass-ui/",
    image:  require("./project-img/career-path.png"),
    accent: "#6366f1",
  },
  {
    title:  "Portfolio Website",
    tags:   ["React", "Three.js", "Tailwind CSS"],
    desc:   "My personal portfolio with immersive 3D scenes, React Bits animations, and a premium dark-neon design system.",
    link:   "https://jagadish48.github.io/Portfolio/",
    image:  require("./project-img/portfolio.png"),
    accent: "#22d3ee",
  },
  {
    title:  "Coming Soon...",
    tags:   [],
    desc:   "The next project is in the works. Stay tuned for something exciting!",
    link:   "#",
    image:  require("./project-img/coming soon.jpg"),
    accent: "#f59e0b",
  },
];

const STATS = [
  { label: "Projects Built",    value: 3, suffix: "+" },
  { label: "Months Internship", value: 3, suffix: ""  },
  { label: "Technologies",      value: 8, suffix: "+" },
  { label: "Years of Learning", value: 4, suffix: "+" },
];

const TIMELINE = [
  {
    year: "2024",
    title: "Master of Computer Applications",
    org: "Srusti Academy of Management & Technology",
    icon: "fa-solid fa-graduation-cap",
    color: "#6366f1",
    desc: "Specialised in software engineering, full-stack development and system design.",
  },
  {
    year: "2023",
    title: "Java Developer Internship",
    org: "CTTC, Bhubaneswar",
    icon: "fa-solid fa-laptop-code",
    color: "#22d3ee",
    desc: "Hands-on Core Java & OOP — developed mini-projects and strengthened backend fundamentals.",
  },
  {
    year: "2022",
    title: "Bachelor of Computer Science",
    org: "KIIT University",
    icon: "fa-solid fa-university",
    color: "#8b5cf6",
    desc: "Foundation in algorithms, data structures, databases and software design principles.",
  },
];

/* ─────────────────────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────────────────────── */
function Navbar({ darkMode, setDarkMode, scrolled }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      className={`navbar${scrolled ? " scrolled" : ""}`}
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="navbar-inner">
        {/* Brand */}
        <a href="#hero" className="brand" onClick={() => setOpen(false)}>
          <div className="brand-dot">J</div>
          <span className="brand-name">Jagadish<span>.</span></span>
        </a>

        {/* Desktop links */}
        <ul className="nav-links">
          {NAV.map(n => (
            <li key={n.href}>
              <a href={n.href} className="nav-link">{n.label}</a>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="nav-actions">
          <MagneticButton magnetStrength={0.3}>
            <a href={cv} target="_blank" rel="noreferrer" className="btn-pri" style={{ padding: "9px 20px", fontSize: 13 }}>
              <i className="fa-solid fa-download" style={{ fontSize: 11 }} />
              Resume
            </a>
          </MagneticButton>
          <button className="icon-btn" onClick={() => setDarkMode(d => !d)} title="Toggle theme">
            <i className={`fa-solid fa-${darkMode ? "sun" : "moon"}`} />
          </button>
        </div>

        {/* Hamburger */}
        <button className={`hamburger${open ? " open" : ""}`} onClick={() => setOpen(v => !v)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {NAV.map(n => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <a href={cv} target="_blank" rel="noreferrer" className="btn-pri" style={{ flex: 1, justifyContent: "center", fontSize: 13 }}>
                <i className="fa-solid fa-download" /> Resume
              </a>
              <button className="icon-btn" onClick={() => setDarkMode(d => !d)}>
                <i className={`fa-solid fa-${darkMode ? "sun" : "moon"}`} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────── */
const ROLES = ["Full Stack Developer", "Java Engineer", "Web Developer", "Software Engineer"];

function HeroSection() {
  const [roleIdx, setRoleIdx] = useState(0);
  const rolesLen = ROLES.length;

  useEffect(() => {
    const t = setInterval(() => setRoleIdx(i => (i + 1) % rolesLen), 3000);
    return () => clearInterval(t);
  }, [rolesLen]);

  return (
    <section id="hero" className="hero-section">
      {/* Background 3D Canvas */}
      <div className="hero-canvas-bg">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Ambient blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className="wrap">
        <div className="hero-grid">
          {/* ── Content ── */}
          <div className="hero-content">
            {/* Eyebrow */}
            <motion.div
              className="hero-tag"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="hero-tag-line" />
              <span className="hero-tag-text">
                <GlitchText speed="slow" enableOnHover>Hello, I'm</GlitchText>
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              className="hero-name"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.32 }}
            >
              <DecryptedText
                text="Jagadish Oram"
                speed={38}
                maxIterations={10}
                animateOn="view"
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
              />
            </motion.h1>

            {/* Animated role */}
            <motion.div
              className="hero-role-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="hero-role-dot" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIdx}
                  className="hero-role"
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -18, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {ROLES[roleIdx]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              <p className="hero-bio">
                <BlurText
                  text="An aspiring Software Engineer passionate about building scalable, user-focused applications. MCA graduate with hands-on experience in Java, React & Spring Boot."
                  delay={25}
                  animateBy="words"
                />
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="hero-cta"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <MagneticButton magnetStrength={0.3}>
                <a href="#projects" className="btn-pri">
                  View My Work <i className="fa-solid fa-arrow-right" style={{ fontSize: 12 }} />
                </a>
              </MagneticButton>
              <MagneticButton magnetStrength={0.3}>
                <a href="#contact" className="btn-ghost">
                  Let's Talk <i className="fa-solid fa-message" style={{ fontSize: 12 }} />
                </a>
              </MagneticButton>
            </motion.div>

            {/* Socials */}
            <motion.div
              className="hero-socials"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.95 }}
            >
              <a href="https://github.com/Jagadish48"  target="_blank" rel="noreferrer" className="social-link" aria-label="GitHub">
                <i className="fa-brands fa-github" />
              </a>
              <a href="https://www.linkedin.com/in/jagadish-oram-568607299" target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn">
                <i className="fa-brands fa-linkedin-in" />
              </a>
              <span style={{ fontSize: 12, color: "var(--c-faint)", fontFamily: "JetBrains Mono, monospace" }}>
                @Jagadish48
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-ind">
        <span className="scroll-ind-text">Scroll</span>
        <div className="scroll-ind-bar" />
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────────────────────── */
function AboutSection() {
  return (
    <section id="about" className="sec sec-alt">
      <div className="wrap">
        {/* Header */}
        <ScrollReveal animation="fadeUp" className="text-center" style={{ textAlign: "center", marginBottom: 60 }}>
          <span className="sec-label">01. About Me</span>
          <h2 className="sec-title">Who Am I?</h2>
          <div className="sec-rule" style={{ margin: "14px auto 0" }} />
        </ScrollReveal>

        <div className="about-grid">
          {/* Left – bio & stats */}
          <ScrollReveal animation="fadeLeft">
            <p className="about-bio">
              Hello! I'm <strong>Jagadish Oram</strong>, a passionate software developer with a strong
              foundation in both front-end and back-end technologies. I enjoy building scalable,
              user-focused applications and continuously sharpening my skills.
            </p>
            <p className="about-bio">
              My journey began with curiosity for problem-solving and grew into a dedicated pursuit of
              software development — from a <strong>Result Management System</strong> to{" "}
              <strong>Career Compass</strong>, a full-stack career guidance platform. My internship at
              CTTC, Bhubaneswar gave me hands-on experience in Core Java and OOP.
            </p>

            {/* Open to work badge */}
            <div className="avail-badge">
              <div className="avail-dot" />
              <span className="avail-text">Open to Opportunities</span>
            </div>

            {/* Stats */}
            <div className="stats-grid">
              {STATS.map((s, i) => (
                <div key={i} className="stat-card">
                  <div className="stat-num">
                    <AnimatedCounter to={s.value} suffix={s.suffix} duration={2} />
                  </div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Right – timeline */}
          <ScrollReveal animation="fadeRight" delay={0.15}>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18, color: "var(--c-text)", marginBottom: 20 }}>
              My Journey
            </h3>
            <div className="timeline">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={i}
                  className="tl-item"
                  whileHover={{ borderColor: `${item.color}50`, x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="tl-icon" style={{ background: `${item.color}18` }}>
                    <i className={item.icon} style={{ color: item.color, fontSize: 15 }} />
                  </div>
                  <div className="tl-body">
                    <div className="tl-title">{item.title}</div>
                    <div className="tl-org" style={{ color: item.color }}>{item.org}</div>
                    <div className="tl-desc">{item.desc}</div>
                  </div>
                  <div className="tl-year" style={{ background: `${item.color}18`, color: item.color }}>
                    {item.year}
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SKILLS
───────────────────────────────────────────────────────────── */
function SkillsSection() {
  return (
    <section id="skills" className="sec">
      {/* subtle glow */}
      <div className="blob" style={{ width: 500, height: 500, top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "rgba(139,92,246,0.08)" }} />

      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <ScrollReveal animation="fadeUp" style={{ textAlign: "center", marginBottom: 52 }}>
          <span className="sec-label">02. Skills</span>
          <h2 className="sec-title">Tech Stack</h2>
          <div className="sec-rule" style={{ margin: "14px auto 0" }} />
          <p style={{ marginTop: 14, fontSize: 14, color: "var(--c-muted)", maxWidth: 400, margin: "14px auto 0" }}>
            Technologies I work with to bring ideas to life.
          </p>
        </ScrollReveal>

        <div className="skills-grid">
          {SKILLS.map((skill, i) => (
            <ScrollReveal key={skill.name} animation="scaleIn" delay={i * 0.06}>
              <SpotlightCard
                spotlightColor={`${skill.color}22`}
                glowColor={`${skill.color}44`}
                borderColor="rgba(255,255,255,0.07)"
              >
                <div className="skill-card" style={{ border: "none", background: "transparent" }}>
                  <div className="skill-icon-wrap" style={{ background: `${skill.color}18` }}>
                    <motion.img
                      src={skill.image}
                      alt={skill.name}
                      whileHover={{ rotate: [0, -8, 8, 0], scale: 1.12 }}
                      transition={{ duration: 0.45 }}
                    />
                  </div>
                  <span className="skill-name">{skill.name}</span>
                  <div className="skill-line" style={{ background: skill.color }} />
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Also working with */}
        <ScrollReveal animation="fadeUp" delay={0.3}>
          <div className="also-know">
            <p className="also-know-label">Also working with</p>
            <div className="tech-chips">
              {["Spring Boot", "MongoDB", "REST APIs", "OOP", "Data Structures", "Linux", "Postman"].map(t => (
                <span key={t} className="tech-chip">{t}</span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   PROJECTS
───────────────────────────────────────────────────────────── */
function ProjectsSection() {
  return (
    <section id="projects" className="sec sec-alt">
      <div className="blob" style={{ width: 400, height: 400, bottom: 0, left: 0, background: "rgba(99,102,241,0.09)" }} />

      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <ScrollReveal animation="fadeUp" style={{ textAlign: "center", marginBottom: 52 }}>
          <span className="sec-label">03. Projects</span>
          <h2 className="sec-title">Featured Work</h2>
          <div className="sec-rule" style={{ margin: "14px auto 0" }} />
        </ScrollReveal>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <ScrollReveal key={i} animation="fadeUp" delay={i * 0.1}>
              <SpotlightCard
                spotlightColor={`${p.accent}18`}
                glowColor={`${p.accent}38`}
                borderColor="rgba(255,255,255,0.07)"
              >
                <div className="project-card" style={{ border: "none", background: "transparent", borderRadius: 20, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                  {/* Image */}
                  <div className="project-img">
                    <img src={p.image} alt={p.title} />
                    <div className="project-img-overlay" />
                    <div className="project-accent-line" style={{ background: p.accent, boxShadow: `0 0 14px ${p.accent}` }} />
                  </div>

                  {/* Body */}
                  <div className="project-body">
                    <h3 className="project-title">{p.title}</h3>
                    <p className="project-desc">{p.desc}</p>
                    {p.tags.length > 0 && (
                      <div className="project-tags">
                        {p.tags.map(t => (
                          <span key={t} className="project-tag" style={{ borderColor: `${p.accent}30`, color: p.accent, background: `${p.accent}12` }}>{t}</span>
                        ))}
                      </div>
                    )}
                    <a href={p.link} target="_blank" rel="noreferrer" className="project-link" style={{ color: p.accent }}>
                      View Live <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: 11 }} />
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────────────────────── */
function ContactSection() {
  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm("service_baakkan", "template_xgizeen", e.target, "rGyTKzwQYP41DYJ2m")
      .then(() => { toast.success("Message sent! 🚀"); e.target.reset(); })
      .catch(() => toast.error("Failed to send. Try again."));
  };

  return (
    <section id="contact" className="sec">
      <div className="blob" style={{ width: 400, height: 400, top: 0, right: 0, background: "rgba(34,211,238,0.07)" }} />
      <div className="blob" style={{ width: 350, height: 350, bottom: 0, left: 0, background: "rgba(139,92,246,0.08)" }} />

      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <ScrollReveal animation="fadeUp" style={{ textAlign: "center", marginBottom: 52 }}>
          <span className="sec-label">04. Contact</span>
          <h2 className="sec-title">Let's Work Together</h2>
          <div className="sec-rule" style={{ margin: "14px auto 0" }} />
        </ScrollReveal>

        <div className="contact-layout">
          {/* Left – info */}
          <ScrollReveal animation="fadeLeft">
            <h3 className="contact-info-title">Get In Touch</h3>
            <p className="contact-info-sub">
              Have a project in mind, a question, or just want to say hello?
              My inbox is always open — I'll respond as soon as I can.
            </p>

            {[
              { icon: "fa-solid fa-envelope", label: "Email", value: "jagadishoram48@gmail.com", color: "#6366f1" },
              { icon: "fa-brands fa-github",  label: "GitHub", value: "github.com/Jagadish48",   color: "#8b5cf6" },
              { icon: "fa-brands fa-linkedin-in", label: "LinkedIn", value: "jagadish-oram-568607299", color: "#22d3ee" },
            ].map((item, i) => (
              <div key={i} className="contact-item">
                <div className="contact-icon" style={{ background: `${item.color}18` }}>
                  <i className={item.icon} style={{ color: item.color, fontSize: 15 }} />
                </div>
                <div>
                  <div className="contact-item-label">{item.label}</div>
                  <div className="contact-item-value">{item.value}</div>
                </div>
              </div>
            ))}
          </ScrollReveal>

          {/* Right – form */}
          <ScrollReveal animation="fadeRight" delay={0.15}>
            <div className="contact-form-wrap">
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div className="form-row">
                  <label>
                    <span className="field-label">Your Name</span>
                    <input required name="name" placeholder="Jagadish Oram" className="form-input" />
                  </label>
                  <label>
                    <span className="field-label">Email Address</span>
                    <input required type="email" name="email" placeholder="you@example.com" className="form-input" />
                  </label>
                </div>
                <label>
                  <span className="field-label">Message</span>
                  <textarea required name="message" rows={5} placeholder="Tell me about your project..." className="form-input" />
                </label>
                <MagneticButton magnetStrength={0.2}>
                  <motion.button type="submit" className="btn-pri" style={{ width: "100%", justifyContent: "center" }} whileTap={{ scale: 0.97 }}>
                    <i className="fa-solid fa-paper-plane" style={{ fontSize: 13 }} />
                    Send Message
                  </motion.button>
                </MagneticButton>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <p className="footer-copy">
        © {new Date().getFullYear()} <span>Jagadish Oram</span>. All rights reserved.
      </p>
      <p className="footer-built">Built with React · Three.js · Tailwind CSS · React Bits ✨</p>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────
   SCROLL TO TOP
───────────────────────────────────────────────────────────── */
function ScrollToTop({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          className="scroll-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Back to top"
        >
          <i className="fa-solid fa-chevron-up" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────
   ROOT
───────────────────────────────────────────────────────────── */
export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop,  setShowTop]  = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "light" : "dark");
  }, [darkMode]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} scrolled={scrolled} />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop show={showTop} />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme={darkMode ? "light" : "dark"}
      />
    </>
  );
}
