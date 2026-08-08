import { Layout as LayoutIcon, Server, Bot } from 'lucide-react'
import { profile } from '../data/profile.js'
import { skillGroups } from '../data/skills.js'
import { useSEO } from '../hooks/useSEO.js'
import { useReveal } from '../hooks/useReveal.js'
import styles from './About.module.css'

const CATEGORY_ICONS = {
  Frontend: LayoutIcon,
  Backend: Server,
  'AI & automation': Bot,
}

export default function About() {
  useSEO({
    title: 'About',
    description: profile.tagline,
    path: '/about',
  })

  const ref = useReveal()

  return (
    <section ref={ref} aria-labelledby="about-heading" className={styles.wrap}>
      <p className={styles.kicker}>About</p>
      <h1 id="about-heading" className={styles.heading}>
        {profile.name}
      </h1>
      <p className={styles.tagline}>{profile.tagline}</p>

      <div className={styles.panel}>
        <p className={styles.panelTitle}>Stack</p>
        <div className={styles.groups}>
          {skillGroups.map((group) => {
            const Icon = CATEGORY_ICONS[group.category]
            return (
              <div key={group.category} className={styles.group}>
                <p className={styles.groupLabel}>
                  {Icon && <Icon size={14} strokeWidth={1.8} />}
                  {group.category}
                </p>
                <ul className={styles.items}>
                  {group.items.map((item) => (
                    <li key={item} className={styles.item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
