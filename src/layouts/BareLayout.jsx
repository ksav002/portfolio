import styles from './BareLayout.module.css'

export default function BareLayout({ children }) {
  return <div className={styles.shell}>{children}</div>
}
