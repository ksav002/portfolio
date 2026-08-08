import { Mail } from 'lucide-react'
import { profile } from '../data/profile.js'
import { socials } from '../data/socials.js'
import { useSEO } from '../hooks/useSEO.js'
import { useReveal } from '../hooks/useReveal.js'
import styles from './Contact.module.css'

export default function Contact() {
  useSEO({
    title: 'Contact',
    description: `Get in touch with ${profile.name}.`,
    path: '/contact',
  })

  const ref = useReveal()

  return (
    <section ref={ref} aria-labelledby="contact-heading" className={styles.wrap}>
      <p className={styles.kicker}>Contact</p>
      <h1 id="contact-heading" className={styles.heading}>
        Get in touch
      </h1>

      <div className={styles.panel}>
        <a href={`mailto:${profile.email}`} className={styles.email}>
          <Mail size={17} strokeWidth={1.8} />
          {profile.email}
        </a>

        <ul className={styles.socialList}>
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
      </div>
    </section>
  )
}
