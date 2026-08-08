import { useEffect, useMemo, useRef, useState } from 'react'
import { Briefcase, GraduationCap } from 'lucide-react'
import { createNoise2D } from 'simplex-noise'
import { profile } from '../data/profile.js'
import { timeline } from '../data/timeline.js'
import { useSEO } from '../hooks/useSEO.js'
import styles from './Experience.module.css'

const TYPE_META = {
  work: { icon: Briefcase, label: 'Work' },
  education: { icon: GraduationCap, label: 'Education' },
}

const NODE_SPACING = 440
const BASE_START_X = 150
const OFFCANVAS_OVERSHOOT = 120
const BASE_Y = 360
const WAVE_AMPLITUDE = 58
const SVG_HEIGHT = 720

function getPoints(count, pad) {
  return Array.from({ length: count }, (_, i) => ({
    x: pad + BASE_START_X + i * NODE_SPACING,
    y: BASE_Y + WAVE_AMPLITUDE * Math.sin(i * 1.35 + 0.4),
  }))
}

function buildAnchors(points, pad) {
  if (points.length === 0) return []
  const first = points[0]
  const last = points[points.length - 1]
  const leadLength = pad + BASE_START_X + OFFCANVAS_OVERSHOOT
  const tailLength = pad + OFFCANVAS_OVERSHOOT
  const lead = { x: first.x - leadLength, y: first.y - WAVE_AMPLITUDE * 0.3 }
  const tail = { x: last.x + tailLength, y: last.y + WAVE_AMPLITUDE * 0.32 }
  return [lead, ...points, tail]
}

const WOBBLE_AMPLITUDE = 9
const WOBBLE_SPEED = 0.05

function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}
const wobbleNoise = createNoise2D(seededRandom(11))

function buildRiverPath(anchors, t = 0, wobbleAmp = WOBBLE_AMPLITUDE, lane = 0) {
  if (anchors.length === 0) return ''
  if (anchors.length === 1) return `M ${anchors[0].x} ${anchors[0].y}`
  let d = `M ${anchors[0].x} ${anchors[0].y}`
  for (let i = 0; i < anchors.length - 1; i++) {
    const p0 = anchors[i]
    const p1 = anchors[i + 1]
    const midX = (p0.x + p1.x) / 2
    const wobble = wobbleAmp * wobbleNoise(i * 0.6 + lane * 11, t * WOBBLE_SPEED)
    d += ` C ${midX} ${p0.y + wobble}, ${midX} ${p1.y + wobble}, ${p1.x} ${p1.y}`
  }
  return d
}

const PARTICLE_SEEDS = [
  { t: 0.05, size: 3,   dur: 8    },
  { t: 0.16, size: 5,   dur: 10   },
  { t: 0.27, size: 3.5, dur: 9    },
  { t: 0.38, size: 4,   dur: 11   },
  { t: 0.5,  size: 3,   dur: 8.5  },
  { t: 0.62, size: 5,   dur: 10.5 },
  { t: 0.74, size: 3.5, dur: 9.5  },
  { t: 0.85, size: 4.5, dur: 11.5 },
  { t: 0.94, size: 3,   dur: 8    },
]

const DUST_COUNT = 60

function buildBraidPath(anchors, phase, amplitude, t, lane) {
  const offset = anchors.map((p, i) => ({
    x: p.x,
    y: p.y + amplitude * Math.sin(i * 0.85 + phase),
  }))
  return buildRiverPath(offset, t, WOBBLE_AMPLITUDE * 0.7, lane)
}

export default function Experience() {
  useSEO({
    title: 'Experience',
    description: 'Work experience and education for Keshab Poudel.',
    path: '/experience',
  })

  const entries = useMemo(() => [...timeline].reverse(), [])

  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1280
  )
  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  const scrollPad = Math.max(viewportWidth / 2 + 80, 280)

  const points = useMemo(
    () => getPoints(entries.length, scrollPad),
    [entries.length, scrollPad]
  )
  const anchors = useMemo(() => buildAnchors(points, scrollPad), [points, scrollPad])
  const lastPoint = points[points.length - 1]
  const totalWidth = (lastPoint?.x ?? scrollPad + BASE_START_X) + scrollPad + 60

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const [wobbleT, setWobbleT] = useState(0)
  useEffect(() => {
    if (prefersReducedMotion) return
    let raf
    let lastUpdate = 0
    const tick = (ts) => {
      if (ts - lastUpdate > 120) {
        lastUpdate = ts
        setWobbleT(ts / 1000)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [prefersReducedMotion])

  const pathD = useMemo(
    () => buildRiverPath(anchors, prefersReducedMotion ? 0 : wobbleT),
    [anchors, wobbleT, prefersReducedMotion]
  )

  const braidA = useMemo(
    () => buildBraidPath(anchors, 1.2, 20, prefersReducedMotion ? 0 : wobbleT, 1),
    [anchors, wobbleT, prefersReducedMotion]
  )
  const braidB = useMemo(
    () => buildBraidPath(anchors, 3.4, -17, prefersReducedMotion ? 0 : wobbleT, 2),
    [anchors, wobbleT, prefersReducedMotion]
  )
  const braidC = useMemo(
    () => buildBraidPath(anchors, 5.1, 11, prefersReducedMotion ? 0 : wobbleT, 3),
    [anchors, wobbleT, prefersReducedMotion]
  )

  const ambientDust = useMemo(() => {
    const rand = seededRandom(42)
    return Array.from({ length: DUST_COUNT }, (_, i) => ({
      id: i,
      x: rand() * totalWidth,
      y: rand() * SVG_HEIGHT,
      size: 1 + rand() * 2.4,
      opacity: 0.1 + rand() * 0.35,
      duration: 4 + rand() * 7,
      delay: rand() * 7,
    }))
  }, [totalWidth])

  const particles = useMemo(
    () =>
      PARTICLE_SEEDS.map((seed, i) => {
        const idx = seed.t * (anchors.length - 1)
        const lo = Math.floor(idx)
        const hi = Math.min(lo + 1, anchors.length - 1)
        const frac = idx - lo
        const p0 = anchors[lo] || anchors[0]
        const p1 = anchors[hi] || anchors[0]
        return {
          id: i,
          x: p0.x + (p1.x - p0.x) * frac,
          y: p0.y + (p1.y - p0.y) * frac,
          size: seed.size,
          duration: `${seed.dur}s`,
          delay: `${i * 1.1}s`,
        }
      }),
    [anchors]
  )

  const scrollRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [openIndex, setOpenIndex] = useState(entries.length - 1)

  const toggleOpen = (i) => {
    setActiveIndex(i)
    setOpenIndex((prev) => (prev === i ? null : i))

    const el = scrollRef.current
    const point = points[i]
    if (el && point) {
      el.scrollTo({
        left: point.x - el.clientWidth / 2,
        behavior: 'smooth',
      })
    }
  }

  const hasCenteredInitially = useRef(false)
  useEffect(() => {
    if (hasCenteredInitially.current) return
    const el = scrollRef.current
    const point = points[openIndex]
    if (el && point) {
      el.scrollLeft = point.x - el.clientWidth / 2
      hasCenteredInitially.current = true
    }
  }, [points, openIndex])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let raf = null
    const updateActive = () => {
      raf = null
      const center = el.scrollLeft + el.clientWidth / 2
      let closest = 0
      let closestDist = Infinity
      points.forEach((p, i) => {
        const dist = Math.abs(p.x - center)
        if (dist < closestDist) {
          closestDist = dist
          closest = i
        }
      })
      setActiveIndex(closest)
    }

    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(updateActive)
    }

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        el.scrollLeft += e.deltaY
        e.preventDefault()
      }
    }

    let isDragging = false
    let dragMoved = false
    let dragStartX = 0
    let dragStartScroll = 0
    const onPointerDown = (e) => {
      if (e.pointerType === 'touch') return
      if (e.target.closest('[data-drag-ignore]')) return
      isDragging = true
      dragMoved = false
      dragStartX = e.clientX
      dragStartScroll = el.scrollLeft
      el.classList.add(styles.dragging)
      el.setPointerCapture(e.pointerId)
    }
    const onPointerMove = (e) => {
      if (!isDragging) return
      if (Math.abs(e.clientX - dragStartX) > 3) dragMoved = true
      el.scrollLeft = dragStartScroll - (e.clientX - dragStartX)
    }
    const endDrag = () => {
      isDragging = false
      el.classList.remove(styles.dragging)
    }
    const onClickCapture = (e) => {
      if (dragMoved) {
        e.stopPropagation()
        e.preventDefault()
        dragMoved = false
      }
    }

    updateActive()
    el.addEventListener('scroll', onScroll, { passive: true })
    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerup', endDrag)
    el.addEventListener('pointerleave', endDrag)
    el.addEventListener('click', onClickCapture, true)
    return () => {
      el.removeEventListener('scroll', onScroll)
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', endDrag)
      el.removeEventListener('pointerleave', endDrag)
      el.removeEventListener('click', onClickCapture, true)
      if (raf !== null) cancelAnimationFrame(raf)
    }
  }, [points])

  return (
    <section aria-labelledby="experience-heading" className={styles.wrap}>
      <p className={styles.kicker}>Experience</p>
      <h1 id="experience-heading" className={styles.heading}>
        Experience &amp; education
      </h1>
      <p className={styles.intro}>{profile.tagline}</p>

      <div className={styles.riverPanel}>
        <div className={styles.riverScroll} ref={scrollRef}>
          <div
            className={styles.riverCanvas}
            style={{ width: totalWidth, height: SVG_HEIGHT }}
          >
            {ambientDust.map((d) => (
              <span
                key={d.id}
                className={styles.dust}
                style={{
                  left: d.x,
                  top: d.y,
                  width: d.size,
                  height: d.size,
                  '--dust-opacity': d.opacity,
                  '--dust-duration': `${d.duration}s`,
                  '--dust-delay': `${d.delay}s`,
                }}
              />
            ))}

            <svg
              className={styles.riverSvg}
              width={totalWidth}
              height={SVG_HEIGHT}
              viewBox={`0 0 ${totalWidth} ${SVG_HEIGHT}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <filter id="riverGlowWide" x="-10%" y="-140%" width="120%" height="380%">
                  <feGaussianBlur stdDeviation="22" />
                </filter>
                <filter id="riverGlow" x="-5%" y="-70%" width="110%" height="240%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="riverCore" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ffb46b" />
                  <stop offset="45%" stopColor="var(--accent-strong)" />
                  <stop offset="100%" stopColor="#ff7a2e" />
                </linearGradient>
              </defs>

              <path d={pathD} className={styles.glowWide} filter="url(#riverGlowWide)" />
              <path d={braidA} className={styles.braidPath} />
              <path d={braidB} className={styles.braidPath} />
              <path d={braidC} className={styles.braidPathFaint} />
              <path d={pathD} className={styles.trailPath} />
              <path d={pathD} className={styles.glowPath} filter="url(#riverGlow)" />
              <path d={pathD} className={styles.basePath} stroke="url(#riverCore)" />
              <path d={pathD} className={styles.travelPath} />
              <path d={pathD} className={styles.travelPathSlow} />
            </svg>

            <span
              className={styles.focusGlow}
              style={{
                left: points[activeIndex]?.x ?? 0,
                top: points[activeIndex]?.y ?? BASE_Y,
              }}
              aria-hidden="true"
            />

            {particles.map((p) => (
              <span
                key={p.id}
                className={styles.particle}
                style={{
                  left: p.x,
                  top: p.y,
                  width: p.size,
                  height: p.size,
                  animationDuration: p.duration,
                  animationDelay: p.delay,
                }}
              />
            ))}

            {entries.map((entry, i) => {
              const point = points[i]
              const meta = TYPE_META[entry.type]
              const Icon = meta?.icon
              const above = i % 2 === 0
              const isActive = i === activeIndex
              const isOpen = i === openIndex

              return (
                <div
                  key={entry.id}
                  className={styles.milestone}
                  style={{ left: point.x, top: point.y }}
                >
                  <span
                    className={`${styles.connector} ${
                      above ? styles.connectorUp : styles.connectorDown
                    } ${isActive ? styles.connectorActive : ''}`}
                    aria-hidden="true"
                  />

                  <div
                    className={`${styles.node} ${isActive ? styles.nodeActive : ''} ${
                      isOpen ? styles.nodeOpen : ''
                    }`}
                    tabIndex={0}
                    role="button"
                    data-drag-ignore="true"
                    aria-expanded={isOpen}
                    aria-label={`${entry.title}, ${entry.org}, ${entry.period}`}
                    aria-current={isActive ? 'true' : undefined}
                    onFocus={() => setActiveIndex(i)}
                    onClick={() => toggleOpen(i)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        toggleOpen(i)
                      }
                    }}
                  >
                    <span className={styles.nodeCore} />
                    {Icon && <Icon size={12} strokeWidth={2.25} className={styles.nodeIcon} />}
                  </div>

                  <div
                    className={`${styles.content} ${
                      above ? styles.contentAbove : styles.contentBelow
                    } ${isActive || isOpen ? styles.contentActive : ''}`}
                  >
                    <button
                      type="button"
                      className={styles.contentToggle}
                      data-drag-ignore="true"
                      onClick={() => toggleOpen(i)}
                      aria-expanded={isOpen}
                    >
                      <p className={styles.period}>
                        {entry.period}
                        <span className={styles.typeTag}>{meta?.label}</span>
                      </p>
                      <h2 className={styles.title}>{entry.title}</h2>
                    </button>

                    <div
                      className={`${styles.details} ${isOpen ? styles.detailsOpen : ''}`}
                    >
                      <p className={styles.org}>{entry.org}</p>
                      {entry.description && (
                        <p className={styles.description}>{entry.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className={styles.fadeLeft} aria-hidden="true" />
        <div className={styles.fadeRight} aria-hidden="true" />
      </div>

      <p className={styles.scrollHint}>
        Scroll or drag to travel through time — click a node for details
      </p>
    </section>
  )
}
