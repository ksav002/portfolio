import { NavLink } from 'react-router-dom'
import { routes } from '../routes.jsx'
import styles from './Navbar.module.css'

export default function Navbar() {
  const navItems = routes.filter((route) => route.showInNav)

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <nav aria-label="Primary">
          <ul className={styles.list}>
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    isActive ? `${styles.link} ${styles.active}` : styles.link
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
