"use client";

import { useState, useEffect } from "react";
import "./App.css";
import {
  BsGithub,
  BsLinkedin,
  BsFacebook,
  BsInstagram,
  BsEnvelopeFill,
  // BsGeoAltFill,
  BsDatabaseFill,
  BsDiagram3Fill,
  BsRobot,
  BsWhatsapp,
  BsCalendarEvent,
  BsArrowUpRightCircle,
  BsGit,
  BsGlobe,
  BsGraphUpArrow,
  BsShieldLockFill,
  BsCode,
  BsStars,
  // BsLightning,
} from "react-icons/bs";

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleSections, setVisibleSections] = useState({});

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("section").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-container">
      {/* Background Elements */}
      <div className="gradient-blob blob-1"></div>
      <div className="gradient-blob blob-2"></div>
      <div className="gradient-blob blob-3"></div>
      <div className="grain-texture"></div>

      <div
        className="cursor-glow"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 80%)`,
        }}
      ></div>

      {/* Hero Section */}
      <section
        id="hero"
        className={`hero-section ${visibleSections["hero"] ? "visible" : ""}`}
      >
        <div className="hero-content">
          <div className="status-badge">
            <span className="pulse-dot"></span>
            Available for new ideas
          </div>

          <h1 className="hero-title">Keshab Poudel</h1>

          <div className="hero-subtitle">
            <BsCode className="icon" />
            <h2>Full Stack Developer</h2>
            <BsStars className="icon" />
          </div>

          <p className="hero-bio">
            I build scalable web applications with{" "}
            <span className="highlight-blue">Django & React</span>, and engineer
            intelligent workflows using{" "}
            <span className="highlight-orange">n8n & AI Agents</span>.
          </p>

          {/* <div className="location">
            <BsGeoAltFill />
            <span>Nepal</span>
          </div> */}

          <div className="social-links">
            <a
              href="https://github.com/ksav002"
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              <BsGithub />
              <span className="tooltip">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/keshabpoudel/"
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              <BsLinkedin />
              <span className="tooltip">LinkedIn</span>
            </a>
            <a
              href="https://www.facebook.com/ksav.poudel.7/"
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              <BsFacebook />
              <span className="tooltip">Facebook</span>
            </a>
            <a
              href="https://www.instagram.com/poudelksav/"
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              <BsInstagram />
              <span className="tooltip">Instagram</span>
            </a>
            <div className="divider"></div>
            <a href="mailto:ksavpoudel2@gmail.com" className="social-link">
              <BsEnvelopeFill />
              <span className="tooltip">Email</span>
            </a>
          </div>
        </div>
      </section>

      {/* Tech Arsenal */}
      <section
        id="tech"
        className={`tech-section ${visibleSections["tech"] ? "visible" : ""}`}
      >
        <div className="section-header">
          <div className="line"></div>
          <h3>Tech Arsenal</h3>
          <div className="line"></div>
        </div>

        <div className="tech-grid">
          <div className="tech-card blue-card">
            <div className="card-glow"></div>
            <div className="icon-box blue">
              <BsGlobe />
            </div>
            <h4>Frontend</h4>
            <p>Interactive & Responsive Experiences</p>
            <div className="tags">
              <span>React.js</span>
              {/* <span>Tailwind CSS</span> */}
              <span>Redux</span>
              {/* <span>Vite</span> */}
            </div>
          </div>

          <div className="tech-card green-card">
            <div className="card-glow"></div>
            <div className="icon-box green">
              <BsDatabaseFill />
            </div>
            <h4>Backend</h4>
            <p>Robust Logic & Data Architecture</p>
            <div className="tags">
              <span>Python</span>
              <span>Django</span>
              <span>DRF</span>
              <span>PostgreSQL</span>
            </div>
          </div>

          <div className="tech-card featured orange-card">
            <div className="card-glow"></div>
            {/* <div className="specialty-badge">
              <BsLightning /> Specialty
            </div> */}
            <div className="icon-box orange">
              <BsDiagram3Fill />
            </div>
            <h4>AI & Automation</h4>
            <p>Orchestrating Intelligent Workflows</p>
            <div className="workflow-viz">
              <BsWhatsapp className="node-icon green" />
              <div className="flow-line"></div>
              <BsRobot className="node-icon orange pulse" />
              <div className="flow-line"></div>
              <BsCalendarEvent className="node-icon blue" />
            </div>
            <div className="tags">
              <span>n8n</span>
              <span>Pinecone (RAG)</span>
              <span>Webhooks</span>
              <span>AI Agents</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className={`projects-section ${
          visibleSections["projects"] ? "visible" : ""
        }`}
      >
        <div className="section-header">
          <div className="line"></div>
          <h3>Selected Works</h3>
          <div className="line"></div>
        </div>

        <div className="projects-grid">
          <div className="project-card">
            <div className="project-header">
              <div
                className="icon-box blue"
                style={{
                  width: 48,
                  height: 48,
                  fontSize: "1.2rem",
                  marginBottom: 0,
                }}
              >
                <BsGraphUpArrow />
              </div>
              <a
                href="https://github.com/ksav002/stock-prediction-system"
                target="_blank"
                rel="noreferrer"
                className="view-link"
              >
                <span>View Code</span>
                <BsArrowUpRightCircle />
              </a>
            </div>
            <h4>Stock Prediction System</h4>
            <p>
              A financial analysis tool forecasting market trends using ARIMA
              algorithm. Features a{" "}
              <span className="highlight">React dashboard</span> visualizing
              data processed by a{" "}
              <span className="highlight">Django backend</span>.
            </p>
            <div className="tags">
              <span>Python</span>
              <span>Django</span>
              {/* <span>ML/AI</span> */}
              {/* <span>Recharts</span> */}
              <span>ARIMA</span>
            </div>
          </div>

          <div className="project-card">
            <div className="project-header">
              <div
                className="icon-box orange"
                style={{
                  width: 48,
                  height: 48,
                  fontSize: "1.2rem",
                  marginBottom: 0,
                }}
              >
                <BsRobot />
              </div>
              <div className="nda-badge">
                <BsShieldLockFill />
                <span>
                  Private
                  {/* / NDA */}
                </span>
              </div>
            </div>
            <h4>Enterprise AI Support Agent</h4>
            <p>
              Deployed a custom RAG system for a corporate client. Orchestrates
              <span className="highlight"> n8n workflows</span> to securely
              fetch internal knowledge from{" "}
              <span className="highlight">Pinecone</span> and answer queries via
              WhatsApp.
            </p>
            <div className="tags">
              <span>n8n</span>
              <span>Pinecone</span>
              <span>OpenAI API</span>
              <span>Postgres</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-badge">
          <BsGit />
          <span>Version Control active</span>
        </div>
        <p>© {new Date().getFullYear()} Keshab Poudel</p>
      </footer>
    </div>
  );
}
