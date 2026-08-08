import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import styles from './MainLayout.module.css'

export default function MainLayout({ children }) {
  return (
    <div className={styles.shell}>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  )
}
