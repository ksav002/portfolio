import { Compass } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO.js'
import { useReveal } from '../hooks/useReveal.js'
import styles from './NotFound.module.css'

export default function NotFound() {
  useSEO({
    title: 'Page not found',
    description: 'This page does not exist.',
    path: '/404',
  })

  const ref = useReveal()

  return (
    <section ref={ref} className={styles.wrap}>
      <p className="eyebrow">
        <Compass size={13} strokeWidth={2} />
        404
      </p>
      <h1 className={styles.heading}>Page not found</h1>
      <p className={styles.text}>
        Nothing lives at this address. <Link to="/">Back to home →</Link>
      </p>
    </section>
  )
}
