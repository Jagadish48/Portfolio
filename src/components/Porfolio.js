import React, { useEffect, useMemo, useState } from "react";
import cv from "./cv/Jagadish Oram.pdf";
import emailjs from "emailjs-com";
import {ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AOS from "aos";
import "aos/dist/aos.css";


// ✅ Drop this component into src/App.jsx (or any route) and it will just work.
// No external UI libraries required. Fully responsive with plain CSS.
export default function Porfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
  AOS.init({
    duration: 1000, // animation duration
    easing: "ease-in-out",
    once: false, 
     mirror: true,    // whether animation should happen only once
  });

   window.addEventListener("scroll", AOS.refresh);
  window.addEventListener("resize", AOS.refresh);

  return () => {
    window.removeEventListener("scroll", AOS.refresh);
    window.removeEventListener("resize", AOS.refresh);
  };
}, []);



  const handleSubmit =  (e) => {
    e.preventDefault();

    emailjs.sendForm("service_baakkan","template_xgizeen",e.target,"rGyTKzwQYP41DYJ2m"
    ).then(
        () => {
          console.log('SUCCESS!');
          toast.success("Email Send Successfull");
          e.target.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
          toast.error("Failed to send")
          e.target.reset();
        },
      );    
    };
    
  

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300); // show when scrolled 300px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  useEffect(() => {
    document.body.setAttribute("data-theme", darkMode ? "light" : "dark");
  }, [darkMode]);


  //Animate the Text
  const texts = [
    "Java ",
    "Full Stack",
    "Web Developer  "
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length); // loop through texts
    }, 1000); // change every 2.5 seconds

    return () => clearInterval(interval);
  }, [texts.length]);
  // Demo data – swap with your own
  const projects = useMemo(
    () => [
      {
        title: "Career Compass",
        tags: ["Java","Spring Boot","React", "MongoDB"],
        desc:
          "A real‑time dashboard to track stock levels, low‑inventory alerts, and supplier lead times.",
        link: "https://dsaha8598.github.io/carrier-compass-ui/",
        image: require("./project-img/career-path.png")
      },
      {
        title: "Portfolio Website",
        tags: ["React", "CSS Grid"],
        desc:
          "My personal portfolio with smooth scroll, accessible nav, and a11y‑first components.",
        link: "https://jagadish48.github.io/Portfolio/",
        image: require("./project-img/portfolio.png")
      },
      {
        title: "Coming Soon...",
        tags: [],
        desc:
          ".......                   ",
        link: "#",
        image:
          require("./project-img/coming soon.jpg")
      }
    ],
    []
  );
  const skills = useMemo(
        () => [
        { name: "C", image: require("./skill_img/C.png") },
        { name: "Core Java", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
        { name: "MySQL", image: require("./skill_img/MySQL.png")},
        { name: "HTML", image: require("./skill_img/html.png") },
        { name: "CSS", image: require("./skill_img/css.png") },
        { name: "JavaScript", image: require("./skill_img/javascript.png") },
        { name: "Git", image: require("./skill_img/git.png") }
        ],
        []
        );
      
  return (
    <>
      <div className="app-root">
        <style>{baseStyles}</style>

        {/* ===== Header / Nav ===== */}
        <header className="site-header" id="home">
          <a className="brand" href="#hero-hero" onClick={() => setMenuOpen(false)}>
            <img className="logo-img" src={require("./image/logo1.png")} alt="logo"/>
          </a>
          <button
            className={"hamburger" + (menuOpen ? " is-active" : "")}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
          <nav className={"nav" + (menuOpen ? " open" : "")}
            onClick={() => setMenuOpen(false)}>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
            <a className="btn primary" href={cv} target="_blank" rel="noreferrer">
              Download CV
            </a>
            <button className="btn ghost small text-center" type="button" onClick={() => setDarkMode((d) => !d)}>
              {darkMode ? (<><i className="fa-solid fa-moon"></i> Dark</>) : (<><i className="fa-solid fa-lightbulb"></i> Light</>)}
            </button>
          </nav>
        </header>
        {/* ===== Hero ===== */}
        <section id="hero-hero" className="hero">
          <div className="hero__content">
            <p className="eyebrow">Hello, I'm</p>
            <h1>
              Jagadish Oram
             
            </h1>
             <p className="sub animated-text">{texts[index]}</p>
              <div className="aspiring">
              <h6 >An Aspiring SOFTWARE ENGINEER</h6>
            </div>
            <div className="cta-row">
              <a href="#projects" className="btn ghost">View Work</a>
              <a href="#contact" className="btn ghost">Let's Talk</a>
            </div>
           
           
          </div>
          <div className="hero__art" aria-hidden>
            <div className="blob" />
            <img data-aos="zoom-in" className="b-5"
              src={require("./image/jaga.png")}
              alt="profile-Image"
              loading="lazy"
            />
          </div>
        </section>

        {/* ===== About ===== */}
        <section id="about" className="section">
          <div className="container  grid">
            <div>
              <h2 data-aos="zoom-out" className="text-center mb-4">About</h2>
              <hr/>
              <p className="container text-center mb-4">
                Hello! I’m <strong>Jagadish Oram</strong>, a passionate software developer with a strong foundation in both front-end and back-end technologies. 
                I hold a Bachelor’s in Computer Science from KIIT and I completed my Master of Computer Applications at Srusti Academy of Management and Technology. 
                I enjoy building scalable, user-focused applications and continuously sharpening my skills.
              </p>
            </div>
            <br/>
            <br/>
            <div>
              <h2 data-aos="zoom-out"  className="text-center mb-4">My Journey</h2>
              <hr/>
              <p className="container text-center  mb-4">
                My journey into technology began with a curiosity for problem-solving and grew into a dedicated pursuit of software development.
                From creating projects like a Result Management System to developing Career Compass, a career guidance platform, I have explored both web and full-stack development.
                My internship at CTTC, Bhubaneswar gave me hands-on experience in Core Java and strengthened my understanding of object-oriented programming.<br/>
                
                I believe in continuous learning and aspire to contribute to innovative solutions that bridge the gap between ideas and real-world impact.
              </p>
            </div>
          </div>
        </section>

        {/* ===== Skills ===== */}
       
        <section id="skills" className="section alt">
          <div className="container">
            <h2 data-aos="zoom-out" className="text-center">Skills</h2>
            <hr/>
            <div className="skills-grid">
              {skills.map((s) => (
                <div  key={s.name} className="skill-card">
                  <img data-aos="flip-left"  src={s.image} alt={s.name} />
                  <p>{s.name}</p>
                </div>
              ))} 
            </div>
          </div>
        </section>


        {/* ===== Projects ===== */}
        <section id="projects" className="section">
          <div className="container">
            <h2 data-aos="zoom-out" className="text-center mb-4">Projects</h2>
            <hr/>
            <div className="project-grid">
              {projects.map((p,i) => (
                <article data-aos="zoom-in" key={i} className="project-card">
                  <div className="project-media">
                    <img src={p.image} alt="Project preview" loading="lazy" />
                  </div>
                  <div data-aos="zoom-in" className="project-body">
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <div className="tags">
                      {p.tags.map((t) => (
                        <span className="tag" key={t}>{t}</span>
                      ))}
                    </div>
                    <div className="actions">
                      <a className="btn small ghost" href={p.link}> Live</a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Contact ===== */}
      <section id="contact" className="section alt">
      <div className="container">
        <h2 className="text-center mb-4">Contact Me</h2>
        <hr />
        <p className="text-center">
          Have a question or want to work together? Send a message:
        </p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row ">
            <label>
              Name
              <input
                required
                name="name"
                // value={formData.name}
                // onChange={handleInputChange}
                placeholder="Your name"
              />
            </label>
            <label>
              Email
              <input
                required
                type="email"
                name="email"
                // value={formData.email}
                // onChange={handleInputChange}
                placeholder="Your Email"
              />
            </label>
          </div>
          <label>
            Message
            <textarea
              required
              name="message"
              rows={5}
              // value={formData.message}
              // onChange={handleInputChange}
              placeholder="Write message here..."
            />
          </label>
          <button
            className="btn btn-outline-primary small center-btn"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </section>

        {/* ===== Footer ===== */}
        <footer className="site-footer">
          <h6 className="text-center ">Thanks For Visiting</h6>
          <div className="container">
            <p className="text-center">© {new Date().getFullYear()} Jagadish Oram. All rights reserved.</p>
             <div className="socials">

              <a href="https://github.com/Jagadish48"><i className="fa-brands fa-github"></i></a>
              <a href="https://www.linkedin.com/in/jagadish-oram-568607299"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="https://github.com/Jagadish48"><i className="fa-brands fa-x-twitter"></i></a>
            </div>
          </div>
        </footer>
      </div>
      {showTopBtn && (
        <button className="scroll-to-top bg-blue" onClick={scrollToTop}>
          ↑
        </button>
      )}

       <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        // closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />
     
    </>
  );

}
// const resumeUrl = "https://filesamples.com/samples/document/pdf/sample3.pdf"; // Replace with your CV link

const baseStyles = `
/* ===== CSS Reset (trimmed) ===== */
* { box-sizing: border-box; overflow: hiden;}
html { scroll-behavior: smooth; }
body { margin: 0; font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color: #0b1021; background: #ffffff; }
img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }

.app-root{
 overflow: hiden;
}
.logo-img{
max-width: 40px
/*filter: drop-shadow(0 0 6px var(--primary)) saturate(1.5);*/
}
.blob img{
size:50px}
/*==== fade animation ====*/

 . animated-text {
  margin-left: 20px;
  font-size: 50%;
  font-weight: 500;
  color: var(text);
  animation: fadeIn 0.8s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ==== Hero Section ==== */



/* ✅ Add overlay so text is readable */
..hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45); /* dark overlay */
  z-index: -1;
}


/*==== Hero Section ====*/
.socials {
  display: flex;
  gap: 20px;          /* spacing between icons */
  margin-top: 20px;   /* space above socials */
  justify-content: left; /* center them */
  margin-left: 50px;
}
.socials a .fa-brands {
  transition: transform 0.3s ease, color 0.3s ease; /* smooth icon animation */
}
.socials a {
  color: var(--text);        /* default text color */
  font-size: 100%;           /* size of icons */
  transition: color 0.3s, transform 0.3s;
}

.socials a:hover {
  color: var(--accent);      /* change color on hover */
  transform: scale(1.2);     /* small zoom effect */
}

.aspiring{
margin-top:40px;
color: #dca735;
}
/* ===== Design tokens ===== */
:root {
  --bg: #ffffff;
  --text: #0b1021;
  --muted: #5b6476;
  --primary: #5b7fff;
  --primary-600: #4a6af2;
  --surface: #f4f6fb;
  --border: #ddd;
  --ring: #c7d2fe;
  --nav-bg: white;  /* light gray */

}

/* ===== Dark Theme ===== */

body[data-them="dark"] .hero{
background: #fff
}
body[data-theme="dark"] .hamburger {
  background: #1a2238;       /* dark surface */
  border-color: var(--border);
}

body[data-theme="dark"] .hamburger span {
  background: #f5f7fa;       /* white lines */
}

body[data-theme="dark"] .btn.ghost {
  background: #1a2238;       /* dark background */
  color: #f5f7fa;            /* light text */
  border-color: var(--border);
}

body[data-theme="dark"] .btn.ghost:hover {
  background: #2c3654;       /* brighter hover */
}
body[data-theme="dark"]  {
  --bg: #0b1021;
  --text: #f5f7fa;
  --muted: #a0abc0;
  --primary: #274653;
  --primary-600: #4a6af2;
  --surface: #1a2238;
  --border: #2c3654;
  --ring: #3c4aa1;

  background: var(--bg);
  color: var(--text);
}

body[data-theme="dark"] .nav a:hover {
  background: rgba(255, 255, 255, 0.08);
}

body[data-theme="dark"] .project-card,
body[data-theme="dark"] .chip,
body[data-theme="dark"] input,
body[data-theme="dark"] textarea {
  background: #111729;
  color: var(--text);
  border-color: var(--border);
}

body[data-theme="dark"] .btn.ghost {
  color: var(--text);
}

body[data-theme="dark"] .site-header {
  background: rgba(11, 16, 33, 0.8);
  border-color: var(--border);
}

body[data-theme="dark"] .site-footer {
  border-color: var(--border);
}

label {
  display: grid;
  gap: 6px;
  font-weight: 600;
  font-size: 14px;
  color: var(--text);  
}
  body[data-theme="dark"] label {
  color: #f5f7fa;
}
body[data-theme="dark"] {
  --nav-bg: #15202dff;  /* dark background */
  --border: #333;
}



/* ===== Layout ===== */
.container { width: min(1100px, 92vw); margin: 0 auto; }
.section { padding: 80px 0; }
.section.alt { background: var(--surface); }
.grid-2 { display: grid; grid-template-columns: 1.2fr 1fr; gap: 36px; align-items: center; }

/* ===== Header ===== */
.site-header { position: sticky; top: 0; z-index: 50; background: rgba(255,255,255,0.8); backdrop-filter: blur(8px); border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; padding: 14px 4vw; }
.brand { font-weight: 800; letter-spacing: 0.2px; display: flex; align-items: center; gap: 10px; }
.brand .dot { width: 10px; height: 10px; border-radius: 999px; background: var(--primary); display: inline-block; }

.nav { display: flex; align-items: center; gap: 18px; }
.nav a { padding: 8px 10px; border-radius: 10px; font-weight: 500; color: var(--muted); }
.nav a:hover { color: var(--text); background: #f3f4f6; }

.hamburger { display: none; width: 40px; height: 40px; border: 1px solid var(--border); background: #fff; border-radius: 12px; align-items: center; justify-content: center; gap: 4px; flex-direction: column; }
.hamburger span { display: block; width: 18px; height: 2px; background: #111; transition: 200ms ease; }
.hamburger.is-active span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
.hamburger.is-active span:nth-child(2) { opacity: 0; }
.hamburger.is-active span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

/* ===== Hero ===== */
.hero { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 42px; align-items: center; width: min(1100px, 92vw); margin: 40px auto 0; padding: 40px 0 10px; }
.hero__content h1 { font-size: clamp(36px, 4.6vw, 58px); line-height: 1.05; }
.eyebrow { color: var(text); text-transform: uppercase; letter-spacing: 1.6px; font-size: 12px; color: blue; }
.sub { color: var(text); font-size: clamp(15px, 2.4vw, 18px); color: blue; }
.cta-row { display: flex; gap: 12px; margin: 22px 0; }
.socials { margin-top: 6px; display: flex; gap: 10px; font-size: 20px; }
.hero__art { position: relative; }
.blob { position: absolute; inset: 10% -10% -10% -10%; background: radial-gradient(600px 300px at 70% 40%, var(--ring), transparent 60%); filter: blur(24px); }
.hero__art img { border-radius: 24px; position: relative;   }

/* ===== Content ===== */
h2 { font-size: clamp(24px, 3.2vw, 34px); margin: 0 0 16px; }
.bullets { padding-left: 18px; color: var(--muted); }
.bullets li { margin: 8px 0; }

.about-card img { border-radius: 18px; box-shadow: 0 10px 30px rgba(0,0,0,.08); }

.chips { display: flex; flex-wrap: wrap; gap: 10px; }
.chip { border: 1px solid var(--border); padding: 8px 12px; border-radius: 999px; background: #fff; }

.project-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.project-card { border: 1px solid var(--border); border-radius: 18px; overflow: hidden; background: #fff; display: flex; flex-direction: column; }
.project-media { aspect-ratio: 16/9; overflow: hidden; }
.project-media img { width: 100%; height: 100%;  object-fit: cover; transition: transform .35s ease; }
.project-card:hover .project-media img { transform: scale(1.06); }
.project-body { padding: 14px 14px 18px; display: grid; gap: 6px; }
.tags { display: flex; gap: 6px; flex-wrap: wrap; }
.tag { background: var(--surface); border: 1px solid var(--border); padding: 4px 8px; border-radius: 8px; font-size: 12px; color: var(--muted); }
.actions { display: flex; gap: 8px; margin-top: 6px; }

.contact-form { display: grid; gap: 12px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
label { display: grid; gap: 6px; font-weight: 600; font-size: 14px; color: #111; }
input, textarea { border: 1px solid var(--border); border-radius: 12px; padding: 10px 12px; font: inherit; background: #fff; }
input:focus, textarea:focus { outline: 3px solid var(--ring); border-color: var(--primary); }

.btn { border: 1px solid var(--border); padding: 10px 14px; border-radius: 12px; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }
.btn.small { padding: 8px 10px; font-size: 14px; text-align: center; }
.btn.primary { background: var(--primary); color: #fff; border-color: var(--primary-600); box-shadow: 0 6px 14px rgba(91,127,255,.25); }
.btn.primary:hover { filter: brightness(0.98); }
.btn.ghost { background: transparent;  }
.btn.ghost:hover { filter: brightness(0.98); }

/* ==== Skills Section ==== */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* always 2 columns */
  gap: 30px;
  justify-items: center;
  margin-top: 30px;
}

.skill-card {
 display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  /* Glassmorphism effect */
  background: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 20px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);


  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%; /* take equal space in grid */
  box-shadow: 0 8px 20px rgba(0,0,0,0.25);
}
.skill-card:hover{
  justify-items: center;
  gap: 10px;
  font-family: Lato, sans-serif;
  /*list-style-type: square;*/
    transform: translateY(-6px) scale(1.05);
  box-shadow: 0 8px 20px rgba(0,0,0,0.25);
  }

.skill-card img {
  width: 70px;
  height: 70px;
  object-fit: contain;
  border-radius: 110%;
  
}

.skill-card p {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  color: var(--text);
}


/*==== contactc ====*/
.contact-form {
  width: 100%;        /* make form full width */
  max-width: 700px;   /* optional: limit width for better readability */
  margin: 0 auto;     /* center the form in section */
}

.contact-form input,
.contact-form textarea {
  width: 100%;        /* inputs/textarea take full form width */
}

/* ===== Footer ===== */
.site-footer { border-top: 1px solid var(--border); padding: 28px 0 42px; color: var(--muted); }
.site-footer .container { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.foot-links { display: flex; gap: 12px; }

/*===Button section === */
.center-btn {
  display: block;
  margin: 20px auto 0; /* center horizontally */
}
.btn.small { 
  padding: 8px 10px; 
  font-size: 14px; 
  justify-content: left;
  
}

/*==== TopScroll Tab ====*/
.scroll-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: none;
  background: var(--primary);
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  transition: background 0.2s ease;
  z-index: 1000;
}
.scroll-to-top:hover {
  background: var(--primary-600);
}
  /* ==== Dark theme for Scroll-to-top button ==== */

  body.dark {
  --nav-bg: #15202dff;  /* your dark color */
  --border: #333;
}


body[data-theme="dark"] .scroll-to-top {
  background: #01024dff;   /* darker background */
  color: #f5f7fa;        /* light text/icon */
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
}

body[data-theme="dark"] .scroll-to-top:hover {
  background: #2c3654;   /* slightly lighter on hover */
}

/* ===== Responsive Breakpoints ===== */

/* Tablets (≤ 1024px) */
@media (max-width: 1024px) {
  .hero {
    grid-template-columns: 1fr 1fr; /* ✅ Keep side by side */
    align-items: center;            /* ✅ Align vertically */
    gap: 20px;
  }
  .hero__art {
    margin-top: 0;                 
    max-width: 300px;              
    margin-left: auto;
    margin-right: auto;
    margin-bottom: auto;
  }
  .project-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .skills-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .site-footer .container {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
}

/* Mobile (≤ 768px) */
@media (max-width: 768px) {
  .site-header {
    padding: 10px 16px;
  }
  .nav {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    flex-direction: column;
    background: var(--nav-bg);
    padding: 20px;
    border-radius: 0 0 12px 12px;
    display: none;
  }
  .nav.open {
    display: flex;
  }
  .hamburger {
    display: flex;

  }

  .hero {
    grid-template-columns: 1fr 1fr; /* ✅ Keep hero + hero__art side by side */
    align-items: center;            /* ✅ Align items properly */
    gap: 10px;
  }
  .hero__art {
    margin-top: 0;                  /* ✅ No extra spacing */
    max-width: 200px;               /* ✅ Smaller image for mobile */
    margin-left: auto;
    margin-right: auto;
    margin-bottom: auto;
  }

  .project-grid {
    grid-template-columns: 1fr;
  }
  .skills-grid {
     grid-template-columns: repeat(2, 1fr); /* ✅ 2 columns on mobile */
  }
  .hero__content h1 {
    font-size: 28px;
  }
  .sub {
    font-size: 16px;
  }
  .cta-row {
    gap: 10px;
    flex-direction: row; /* ✅ Keep buttons side by side */
  }
    .cta-row a {
  flex: 1 1 auto;               /* ✅ buttons auto-resize equally */
          
}
  .scroll-to-top {
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    font-size: 18px;
  }
}

/* Small phones (≤ 480px) */
@media (max-width: 480px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr); /* still 2 columns */
  }
  .hero {
    grid-template-columns: 1fr 1fr; /* ✅ Still side by side, even on small screens */
    gap: 8px;
  }
  .hero__art {
    max-width: 150%;              /* ✅ Scale down image */
    margin-bottom: 70px;
  }
  .hero__content h1 {
    font-size: 22px;
  }
  .sub {
    font-size: 14px;
  }
  .nav a {
    font-size: 14px;
    padding: 6px 0;
  }
  .btn {
    font-size: 14px;
    padding: 8px 12px;
  }
     .cta-row a {
    flex: none;
    
  }
    
}






`;
