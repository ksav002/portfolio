import { Globe, Lock, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { profile } from "../data/profile.js";
import { skillGroups } from "../data/skills.js";
import { projects } from "../data/projects.js";
import { socials } from "../data/socials.js";
import { techIcons } from "../data/techIcons.js";
import { useSEO } from "../hooks/useSEO.js";
import { useReveal } from "../hooks/useReveal.js";
import styles from "./Home.module.css";

export default function Home() {
  useSEO({
    title: "Home",
    description: profile.tagline,
    path: "/",
  });

  const featured = projects.filter((project) => project.featured);

  const heroRef = useReveal();
  const heroImgRef = useReveal();
  const featuredRef = useReveal();
  const connectRef = useReveal();

  return (
    <>
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div ref={heroRef} className={styles.heroText}>
          <p className={styles.kicker}>{profile.role}</p>
          <h1 id="hero-heading" className={styles.name}>
            {profile.name}
          </h1>
          <p className={styles.tagline}>{profile.tagline}</p>

          <div className={styles.ctaRow}>
            <Link to="/projects" className={styles.ctaPrimary}>
              View projects <ArrowUpRight size={16} strokeWidth={2.2} />
            </Link>
            <Link to="/contact" className={styles.ctaSecondary}>
              Get in touch
            </Link>
          </div>

          <div className={styles.chipGroups}>
            {skillGroups.map((group, gi) => (
              <ul key={group.category} className={styles.chipRow}>
                {group.items.map((item) => (
                  <li key={item} className={styles.chip}>
                    {item}
                  </li>
                ))}
                {gi < skillGroups.length - 1 && (
                  <li className={styles.chipDivider} aria-hidden="true" />
                )}
              </ul>
            ))}
          </div>
        </div>

        <div ref={heroImgRef} className={styles.heroImage}>
          <img
            src={profile.avatar}
            alt={profile.name}
            width="320"
            height="320"
            fetchPriority="high"
          />
        </div>
      </section>

      <section
        ref={featuredRef}
        aria-labelledby="featured-heading"
        className={styles.section}
      >
        <div className={styles.sectionHead}>
          <h2 id="featured-heading" className={styles.sectionTitle}>
            Featured work
          </h2>
          <Link to="/projects" className={styles.sectionLink}>
            All projects <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
        <div className={styles.projectGrid}>
          {featured.map((project, i) => (
            <article
              key={project.slug}
              className={`${styles.projectCard} fadeUp`}
              style={{ "--delay": `${240 + i * 70}ms` }}
            >
              <div className={styles.cover}>
                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  loading="lazy"
                />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.projectHead}>
                  <div className={styles.projectTitleRow}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    {project.role && (
                      <span className={styles.roleTag}>{project.role}</span>
                    )}
                  </div>
                  <span
                    className={
                      project.status === "public"
                        ? styles.badgePublic
                        : styles.badgePrivate
                    }
                  >
                    {project.status === "public" ? (
                      <Globe size={12} strokeWidth={2} />
                    ) : (
                      <Lock size={12} strokeWidth={2} />
                    )}
                    {project.status === "public" ? "Public" : "Private"}
                  </span>
                </div>
                <p className={styles.projectSummary}>{project.summary}</p>
                <ul className={styles.tagList}>
                  {project.tags.map((tag) => {
                    const Icon = techIcons[tag];
                    return Icon ? (
                      <li
                        key={tag}
                        className={styles.techTag}
                        title={tag}
                        aria-label={tag}
                      >
                        <Icon size={19} />
                        <span className={styles.tooltip} aria-hidden="true">
                          {tag}
                        </span>
                      </li>
                    ) : (
                      <li key={tag} className={styles.tag}>
                        {tag}
                      </li>
                    );
                  })}
                </ul>
                {project.status === "public" && (
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.projectLink}
                  >
                    View code <ArrowRight size={13} strokeWidth={2} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        ref={connectRef}
        aria-labelledby="connect-heading"
        className={styles.connectBanner}
      >
        <h2 id="connect-heading" className={styles.connectTitle}>
          Let's build something.
        </h2>
        <ul className={styles.socialRow}>
          {socials.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
                aria-label={label}
                title={label}
              >
                {Icon && <Icon size={18} strokeWidth={1.8} />}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
