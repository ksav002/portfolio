import { Loader2 } from 'lucide-react'
import styles from './LoadingIndicator.module.css'

export default function LoadingIndicator({ label = 'Loading' }) {
  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <Loader2 size={16} strokeWidth={2} className={styles.spinner} />
      <span className={styles.label}>{label}</span>
    </div>
  )
}
