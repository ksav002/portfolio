import { socials } from '../data/socials.js'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} Keshab Poudel
        </p>
        <ul className={styles.links}>
          {socials.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className={styles.iconLink}
                aria-label={label}
                title={label}
              >
                {Icon ? <Icon size={17} strokeWidth={1.8} /> : label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
