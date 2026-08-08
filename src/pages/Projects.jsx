import { Globe, Lock, ArrowRight } from 'lucide-react'
import { projects } from '../data/projects.js'
import { techIcons } from '../data/techIcons.js'
import { useSEO } from '../hooks/useSEO.js'
import { useReveal } from '../hooks/useReveal.js'
import styles from './Projects.module.css'

export default function Projects() {
  useSEO({
    title: 'Projects',
    description:
      'A list of projects built by Keshab Poudel, spanning Django/React web applications and n8n/AI-agent automation systems.',
    path: '/projects',
  })

  const ref = useReveal()

  return (
    <section ref={ref} aria-labelledby="projects-heading">
      <p className={styles.kicker}>Selected work</p>
      <h1 id="projects-heading" className={styles.heading}>
        Projects
      </h1>

      <div className={styles.list}>
        {projects.map((project, i) => (
          <article
            key={project.slug}
            className={`${styles.card} fadeUp`}
            style={{ '--delay': `${i * 70}ms` }}
          >
            <div className={styles.cover}>
              <img src={project.image} alt={`${project.title} preview`} loading="lazy" />
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardHead}>
                <div className={styles.cardTitleRow}>
                  <h2 className={styles.cardTitle}>{project.title}</h2>
                  {project.role && (
                    <span className={styles.roleTag}>{project.role}</span>
                  )}
                </div>
                <span
                  className={
                    project.status === 'public'
                      ? styles.badgePublic
                      : styles.badgePrivate
                  }
                >
                  {project.status === 'public' ? (
                    <Globe size={12} strokeWidth={2} />
                  ) : (
                    <Lock size={12} strokeWidth={2} />
                  )}
                  {project.status === 'public' ? 'Public' : 'Private'}
                </span>
              </div>
              <p className={styles.summary}>{project.summary}</p>
              <ul className={styles.tagList}>
                {project.tags.map((tag) => {
                  const Icon = techIcons[tag]
                  return Icon ? (
                    <li key={tag} className={styles.techTag} title={tag} aria-label={tag}>
                      <Icon size={20} />
                      <span className={styles.tooltip} aria-hidden="true">{tag}</span>
                    </li>
                  ) : (
                    <li key={tag} className={styles.tag}>
                      {tag}
                    </li>
                  )
                })}
              </ul>
              {project.status === 'public' ? (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.link}
                >
                  View code <ArrowRight size={13} strokeWidth={2} />
                </a>
              ) : (
                <p className={styles.ndaNote}>Code under NDA — not public.</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
