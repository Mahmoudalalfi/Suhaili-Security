import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import { TextRotate } from '../components/ui/text-rotate'
import LiquidButton from '../components/ui/LiquidButton'
const logo = 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777654757/SuhailSecurityLogo_jay0jh.png'
import { SERVICE_HERO_BY_ID, SERVICES_ORDER } from '../data/servicesCatalog'
import SERVICES_I18N from '../data/servicesPageI18n'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────── Gyroscope / mouse 3-D tilt card ─────────────── */
function GyroTiltCard({ children, style = {} }) {
  const ref = useRef(null)
  const gyroBase = useRef(null) // calibration baseline {beta, gamma}
  const rafId = useRef(null)
  const current = useRef({ rx: 0, ry: 0 })
  const target = useRef({ rx: 0, ry: 0 })

  const applyTilt = useCallback(() => {
    const el = ref.current
    if (!el) return
    // smooth lerp
    current.current.rx += (target.current.rx - current.current.rx) * 0.12
    current.current.ry += (target.current.ry - current.current.ry) * 0.12
    const { rx, ry } = current.current
    el.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`
    rafId.current = requestAnimationFrame(applyTilt)
  }, [])

  useEffect(() => {
    const isMobile = 'ontouchstart' in window

    if (isMobile) {
      const onOrientation = (e) => {
        // calibrate on first event
        if (!gyroBase.current) {
          gyroBase.current = { beta: e.beta ?? 0, gamma: e.gamma ?? 0 }
        }
        const db = (e.beta  ?? 0) - gyroBase.current.beta
        const dg = (e.gamma ?? 0) - gyroBase.current.gamma
        // clamp to ±20 deg of tilt, map to ±12 rotation degrees
        target.current.rx = Math.max(-12, Math.min(12, -db * 0.5))
        target.current.ry = Math.max(-12, Math.min(12,  dg * 0.5))
      }

      // iOS 13+ requires permission
      if (typeof DeviceOrientationEvent !== 'undefined' &&
          typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
          .then(state => { if (state === 'granted') window.addEventListener('deviceorientation', onOrientation) })
          .catch(() => {})
      } else {
        window.addEventListener('deviceorientation', onOrientation)
      }

      rafId.current = requestAnimationFrame(applyTilt)

      return () => {
        window.removeEventListener('deviceorientation', onOrientation)
        if (rafId.current) cancelAnimationFrame(rafId.current)
        if (ref.current) ref.current.style.transform = ''
      }
    } else {
      // Desktop: mouse hover tilt
      const el = ref.current
      if (!el) return
      const onMove = (e) => {
        const r = el.getBoundingClientRect()
        const cx = r.left + r.width  / 2
        const cy = r.top  + r.height / 2
        target.current.rx = ((e.clientY - cy) / (r.height / 2)) * -8
        target.current.ry = ((e.clientX - cx) / (r.width  / 2)) *  8
      }
      const onLeave = () => { target.current.rx = 0; target.current.ry = 0 }
      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      rafId.current = requestAnimationFrame(applyTilt)
      return () => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
        if (rafId.current) cancelAnimationFrame(rafId.current)
        if (ref.current) ref.current.style.transform = ''
      }
    }
  }, [applyTilt])

  return (
    <div ref={ref} style={{ transformStyle: 'preserve-3d', willChange: 'transform', ...style }}>
      {children}
    </div>
  )
}

/* ─────────────── Hero ping-pong video ─────────────── */
const HERO_SRCS = [
  'https://res.cloudinary.com/dfc0qnh88/video/upload/v1777655195/Hero_kwsbzw.mp4',
  'https://res.cloudinary.com/dfc0qnh88/video/upload/v1777655191/HeroRev_rhnvyd.mp4',
]

const VIDEO_STYLE = {
  position: 'absolute', inset: 0,
  width: '100%', height: '100%',
  objectFit: 'cover',
  opacity: 0.8,
  zIndex: 0,
}

function HeroBgVideo() {
  const refs = [useRef(null), useRef(null)]
  const activeRef = useRef(0)

  useEffect(() => {
    const [a, b] = [refs[0].current, refs[1].current]
    if (!a || !b) return

    // Pre-load both
    a.src = HERO_SRCS[0]
    b.src = HERO_SRCS[1]
    b.style.opacity = '0'

    function onEnded() {
      const next = activeRef.current === 0 ? 1 : 0
      const incoming = refs[next].current
      const outgoing = refs[activeRef.current].current

      // incoming is already fully loaded — play it instantly
      incoming.currentTime = 0
      incoming.style.opacity = '0.8'
      incoming.play()

      // hide outgoing after one frame so there's no gap
      requestAnimationFrame(() => { outgoing.style.opacity = '0' })

      activeRef.current = next
    }

    a.addEventListener('ended', onEnded)
    b.addEventListener('ended', onEnded)
    a.play()

    return () => {
      a.removeEventListener('ended', onEnded)
      b.removeEventListener('ended', onEnded)
    }
  }, [])

  return (
    <>
      <video ref={refs[0]} muted playsInline preload="auto" aria-hidden style={{ ...VIDEO_STYLE }} />
      <video ref={refs[1]} muted playsInline preload="auto" aria-hidden style={{ ...VIDEO_STYLE }} />
    </>
  )
}

/* ─────────────── FlickerGrid ─────────────── */
const ALL_SQUARES = [
  [2, 2], [5, 1], [8, 3], [12, 2], [16, 4], [20, 1], [24, 3], [28, 2], [32, 4], [36, 1],
  [3, 8], [7, 6], [11, 9], [15, 7], [19, 8], [23, 6], [27, 9], [31, 7],
  [1, 14], [5, 12], [9, 15], [13, 13], [17, 14], [21, 12], [25, 15], [29, 13],
  [4, 18], [8, 17], [12, 19], [16, 18], [20, 17], [24, 19], [28, 18],
  [2, 22], [6, 21], [10, 23], [14, 22], [18, 21], [22, 23], [26, 22],
  [3, 5], [9, 4], [15, 3], [21, 5], [27, 4], [33, 3],
  [6, 10], [12, 11], [18, 10], [24, 11], [30, 10],
  [1, 16], [7, 17], [13, 16], [19, 17], [25, 16], [31, 17],
]

function FlickerGrid({ width = 44, height = 44, x = -1, y = -1 }) {
  const id = useId()
  const svgRef = useRef(null)

  useEffect(() => {
    const rects = svgRef.current?.querySelectorAll('rect[data-sq]')
    if (!rects || rects.length === 0) return
    rects.forEach(r => { r.style.opacity = Math.random() < 0.3 ? '1' : '0.3' })
    const tick = () => {
      const count = 2 + Math.floor(Math.random() * 4)
      for (let i = 0; i < count; i++) {
        const r = rects[Math.floor(Math.random() * rects.length)]
        r.style.opacity = r.style.opacity === '1' ? '0.3' : '1'
      }
    }
    const intervalId = setInterval(tick, 320)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      style={{
        pointerEvents: 'none', position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        stroke: 'rgba(192,57,43,0.08)',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, white 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, white 30%, transparent 100%)',
      }}
    >
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" strokeDasharray="0" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      <svg x={x} y={y} style={{ overflow: 'visible' }}>
        {ALL_SQUARES.map(([sx, sy], i) => (
          <rect
            key={i}
            data-sq="1"
            strokeWidth="0"
            width={width - 1}
            height={height - 1}
            x={sx * width + 1}
            y={sy * height + 1}
            fill="rgba(192,57,43,0.10)"
            style={{ opacity: 0.3, transition: 'opacity 0.6s ease' }}
          />
        ))}
      </svg>
    </svg>
  )
}

/* ─────────────── Services ─────────────── */
const CAROUSEL_SERVICES = {
  de: [
    { icon: <CctvIcon />,       title: 'CCTV Überwachung',     desc: 'Modernste Videoüberwachung für Gebäude und Außenbereiche.' },
    { icon: <ShieldIcon />,     title: 'Objektschutz',         desc: 'Schutz von Gebäuden, Lagern und Anlagen rund um die Uhr.' },
    { icon: <UserShieldIcon />, title: 'VIP-Schutz',           desc: 'Diskreter Personenschutz für Führungskräfte und Privatpersonen.' },
    { icon: <EventIcon />,      title: 'Veranstaltungsschutz', desc: 'Professionelle Sicherheit für Events, Messen und Konzerte.' },
    { icon: <PatrolIcon />,     title: 'Streifendienst',       desc: 'Regelmäßige Kontrollgänge und mobile Einsatzbereitschaft.' },
    { icon: <BuildingIcon />,   title: 'Werkschutz',           desc: 'Industrieschutz für Produktionsanlagen und Werksgelände.' },
    { icon: <DeskIcon />,       title: 'Empfangsdienst',       desc: 'Professioneller Empfang und Zugangskontrolle.' },
    { icon: <ShieldIcon />,     title: 'Sicherheitsdienst',    desc: 'Allgemeine Sicherheitslösungen für Unternehmen und Privatkunden.' },
  ],
  en: [
    { icon: <CctvIcon />,       title: 'CCTV SURVEILLANCE',    desc: 'Modern video surveillance for buildings and outdoor areas.' },
    { icon: <ShieldIcon />,     title: 'OBJECT PROTECTION',    desc: 'Protection of buildings, warehouses and facilities around the clock.' },
    { icon: <UserShieldIcon />, title: 'VIP SECURITY',         desc: 'Discreet personal protection for executives and private clients.' },
    { icon: <EventIcon />,      title: 'EVENT SECURITY',       desc: 'Professional security for events, trade fairs and concerts.' },
    { icon: <PatrolIcon />,     title: 'PATROL SERVICE',       desc: 'Regular inspection rounds and mobile rapid response.' },
    { icon: <BuildingIcon />,   title: 'INDUSTRIAL SECURITY',  desc: 'Industrial protection for production facilities and factory grounds.' },
    { icon: <DeskIcon />,       title: 'RECEPTION SERVICE',    desc: 'Professional reception management and access control.' },
    { icon: <ShieldIcon />,     title: 'SECURITY SERVICE',     desc: 'General security solutions for businesses and private clients.' },
  ],
}

/* ─────────────── Service Carousel ─────────────── */
function ServicesCarousel({ lang }) {
  const services = CAROUSEL_SERVICES[lang] ?? CAROUSEL_SERVICES.en
  const doubled = [...services, ...services]

  return (
    <div style={{
      background: '#060606',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      padding: 'clamp(28px, 4vw, 48px) 0',
      overflow: 'hidden',
    }}>
      <div className="svc-track-right" style={{ display: 'flex', gap: 16, width: 'max-content' }}>
        {doubled.map((s, i) => <ServiceCard2 key={i} icon={s.icon} title={s.title} desc={s.desc} />)}
      </div>
    </div>
  )
}

function ServiceCard2({ icon, title, desc }) {
  const cardRef = useRef(null)

  const handleEnter = () => {
    gsap.to(cardRef.current, { y: -4, scale: 1.02, duration: 0.28, ease: 'power2.out' })
    gsap.to(cardRef.current.querySelector('.svc2-icon'), {
      background: 'rgba(192,57,43,0.18)',
      borderColor: 'rgba(192,57,43,0.45)',
      color: 'var(--red-light)',
      duration: 0.25,
    })
    gsap.to(cardRef.current, {
      borderColor: 'rgba(192,57,43,0.3)',
      boxShadow: '0 12px 40px rgba(192,57,43,0.12)',
      duration: 0.28,
    })
  }
  const handleLeave = () => {
    gsap.to(cardRef.current, { y: 0, scale: 1, duration: 0.5, ease: 'elastic.out(1,0.55)' })
    gsap.to(cardRef.current.querySelector('.svc2-icon'), {
      background: 'rgba(255,255,255,0.05)',
      borderColor: 'rgba(255,255,255,0.1)',
      color: 'rgba(255,255,255,0.5)',
      duration: 0.3,
    })
    gsap.to(cardRef.current, {
      borderColor: 'rgba(255,255,255,0.07)',
      boxShadow: 'none',
      duration: 0.3,
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        flexShrink: 0,
        width: 'clamp(220px, 22vw, 280px)',
        height: 180,
        background: '#0f0f0f',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 16,
        padding: 'clamp(18px, 2.5vw, 28px)',
        display: 'flex', flexDirection: 'column', gap: 14,
        cursor: 'default', willChange: 'transform',
        transition: 'border-color 0.28s ease, box-shadow 0.28s ease',
      }}
    >
      <div className="svc2-icon" style={{
        width: 52, height: 52,
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 12,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(255,255,255,0.5)', flexShrink: 0,
        padding: 16,
        transition: 'background 0.25s, border-color 0.25s, color 0.25s',
      }}>
        {icon}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(13px, 1.4vw, 16px)', fontWeight: 800,
          letterSpacing: '0.06em', color: '#fff', textTransform: 'uppercase',
          lineHeight: 1.2, margin: 0,
        }}>
          {title}
        </p>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', lineHeight: 1.6, margin: 0 }}>
          {desc}
        </p>
      </div>
    </div>
  )
}

/* ─────────────── Ticker ─────────────── */
function Ticker() {
  const { t } = useLanguage()
  const words = t('home.ticker')
  const items = [...words, ...words]
  return (
    <div style={{
      overflow: 'hidden',
      background: 'var(--bg-card)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      padding: '16px 0',
      userSelect: 'none',
    }}>
      <div className="ticker-track">
        {items.map((w, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex', alignItems: 'center',
              fontFamily: 'var(--font-display)',
              fontWeight: 700, fontSize: 13,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--muted)', padding: '0 24px',
            }}
          >
            {w}
            <span style={{ marginLeft: 24, color: 'var(--red)', opacity: 0.6 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─────────────── CCTV Cameras + Hero 3D tilt ─────────────── */
// desktop: top/left/right %. mobile: smaller, pinned to corners with bottom for lower pair
const CAMERAS = [
  { top: '4%',  left: '0%',  size: 180, delay: 0.55, orbitBase: { theta: -50, phi: 80  },
    mobile: { size: 85, top: '2%',    left: '0%' } },
  { top: '4%',  right: '0%', size: 180, delay: 0.70, orbitBase: { theta:  50, phi: 80  },
    mobile: { size: 85, top: '2%',    right: '0%' } },
  { top: '48%', left: '0%',  size: 160, delay: 0.85, orbitBase: { theta: -20, phi: 120 },
    mobile: { size: 85, bottom: '2%', left: '0%' } },
  { top: '48%', right: '0%', size: 160, delay: 0.95, orbitBase: { theta:  10, phi: 120 },
    mobile: { size: 85, bottom: '2%', right: '0%' } },
]

function CctvCameras({ mvRefs }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return (
    <>
      {CAMERAS.map((cam, i) => {
        const m = cam.mobile
        const style = isMobile
          ? { width: m.size, height: m.size, top: m.top, bottom: m.bottom, left: m.left, right: m.right }
          : { width: cam.size, height: cam.size, top: cam.top, left: cam.left, right: cam.right }
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: cam.delay, duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              zIndex: 10,
              pointerEvents: 'none',
              filter: 'drop-shadow(0 0 20px rgba(192,57,43,0.3)) drop-shadow(0 4px 16px rgba(0,0,0,0.7))',
              ...style,
            }}
          >
            {/* @ts-ignore */}
            <model-viewer
              ref={el => { mvRefs.current[i] = el }}
              src="/cctv-new.glb"
              camera-orbit={`${cam.orbitBase.theta}deg ${cam.orbitBase.phi}deg 2.5m`}
              disable-zoom
              disable-pan
              interaction-prompt="none"
              style={{ width: '100%', height: '100%', background: 'transparent' }}
            />
          </motion.div>
        )
      })}
    </>
  )
}

/* ─────────────── Testimonials ─────────────── */
const TESTIMONIALS = [
  { name: 'Markus Bauer',   handle: '@markus_b', flag: '🇩🇪', img: 'https://randomuser.me/api/portraits/men/32.jpg',  body: 'Absolutely professional — security on point every single shift. We felt safe from day one.' },
  { name: 'Sara Jensen',    handle: '@sara_j',   flag: '🇩🇰', img: 'https://randomuser.me/api/portraits/women/44.jpg', body: 'Response times are incredible. Their alarm response team arrived before we even hung up the phone.' },
  { name: 'Carlos Rey',     handle: '@carl_r',   flag: '🇪🇸', img: 'https://randomuser.me/api/portraits/men/61.jpg',  body: 'Our retail chain runs smoothly thanks to their store detective and access control team.' },
  { name: 'Ana Müller',     handle: '@ana_m',    flag: '🇩🇪', img: 'https://randomuser.me/api/portraits/women/68.jpg', body: 'The VIP protection service was discreet, reliable, and exactly what our executive needed.' },
  { name: 'Emma Lee',       handle: '@emma_l',   flag: '🇨🇦', img: 'https://randomuser.me/api/portraits/women/45.jpg', body: 'CCTV installation was flawless. The team explained everything and the footage quality is superb.' },
  { name: 'Lucas Dubois',   handle: '@luc_d',    flag: '🇫🇷', img: 'https://randomuser.me/api/portraits/men/22.jpg',  body: 'Event security was handled perfectly — large crowd, zero incidents. Highly recommend.' },
  { name: 'Haruto Sato',    handle: '@haru_s',   flag: '🇯🇵', img: 'https://randomuser.me/api/portraits/men/85.jpg',  body: 'Night patrol service gave our warehouse full coverage. Professional team, zero incidents.' },
  { name: 'Maya Patel',     handle: '@maya_p',   flag: '🇮🇳', img: 'https://randomuser.me/api/portraits/women/53.jpg', body: 'From the first consultation to deployment — seamlessly handled. Real security professionals.' },
  { name: 'Liam Walsh',     handle: '@liam_w',   flag: '🇮🇪', img: 'https://randomuser.me/api/portraits/men/41.jpg',  body: 'Reliable, punctual, always professional. The best security partner we have had.' },
  { name: 'Chiara Bianchi', handle: '@chia_b',   flag: '🇮🇹', img: 'https://randomuser.me/api/portraits/women/29.jpg', body: 'Construction site security was outstanding — well ahead of our handover date every time.' },
  { name: 'Noah Smith',     handle: '@noah_s',   flag: '🇺🇸', img: 'https://randomuser.me/api/portraits/men/33.jpg',  body: 'Best facility security partner we have ever worked with. Period.' },
  { name: 'Mateo Rossi',    handle: '@mat_r',    flag: '🇮🇹', img: 'https://randomuser.me/api/portraits/men/51.jpg',  body: 'Guard staff was efficient, careful, and always on time. Our clients noticed the difference.' },
]

const COL_A = TESTIMONIALS.slice(0, 4)
const COL_B = TESTIMONIALS.slice(4, 8)
const COL_C = TESTIMONIALS.slice(8, 12)
const COL_D = [...TESTIMONIALS.slice(6, 12), ...TESTIMONIALS.slice(0, 6)]

function TestiCard({ name, handle, flag, img, body }) {
  return (
    <div style={{
      background: '#141414',
      border: '1px solid rgba(255,255,255,0.09)',
      borderRadius: 16,
      padding: '20px 22px',
      width: 280,
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <img
          src={img}
          alt={name}
          width={44} height={44}
          style={{ borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '2px solid rgba(192,57,43,0.5)' }}
        />
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
            {name} <span style={{ fontSize: 13 }}>{flag}</span>
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{handle}</div>
        </div>
      </div>
      <p style={{ margin: 0, fontSize: 13.5, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>{body}</p>
    </div>
  )
}

function TestiColumn({ items, reverse, duration }) {
  const tripled = [...items, ...items, ...items]
  const anim = reverse ? 'testi-up' : 'testi-down'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, animation: `${anim} ${duration}s linear infinite` }}>
      {tripled.map((r, i) => <TestiCard key={i} {...r} />)}
    </div>
  )
}

function Testimonials({ lang }) {
  return (
    <section style={{ background: '#080808', padding: 'clamp(60px,8vw,100px) 0', overflow: 'hidden' }}>
      <style>{`
        @keyframes testi-down { 0% { transform: translateY(0) } 100% { transform: translateY(-33.333%) } }
        @keyframes testi-up   { 0% { transform: translateY(-33.333%) } 100% { transform: translateY(0) } }
        .testi-wall { transform: translateX(-60px) translateY(0px) translateZ(-60px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg); }
        @media (max-width: 639px) {
          .testi-wall { transform: translateX(-60px) translateY(0px) translateZ(-60px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg) scale(0.62); }
        }
      `}</style>

      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(40px,6vw,64px)', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 16 }}>
          <span style={{ display: 'block', width: 28, height: 2, background: '#c0392b', borderRadius: 2 }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#c0392b', fontFamily: 'var(--font-display)' }}>
            {lang === 'de' ? 'Kundenstimmen' : 'Client Reviews'}
          </span>
          <span style={{ display: 'block', width: 28, height: 2, background: '#c0392b', borderRadius: 2 }} />
        </div>
        <h2 style={{
          margin: 0, fontFamily: 'var(--font-display)', fontWeight: 900,
          fontSize: 'clamp(32px,5vw,64px)', letterSpacing: '-0.03em',
          lineHeight: 1.0, textTransform: 'uppercase', color: '#fff',
        }}>
          {lang === 'de' ? <>Zuverlässigkeit,<br />die man spürt.</> : <>Reliability you<br />can feel.</>}
        </h2>
      </div>

      {/* 3D card wall */}
      <div style={{
        position: 'relative',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        height: 560,
        perspective: '1000px',  /* ← increase = zoom out, decrease = zoom in */
        overflow: 'hidden',
      }}>
        <div className="testi-wall" style={{
          display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16,
        }}>
          <TestiColumn items={COL_A} reverse={false} duration={32} />
          <TestiColumn items={COL_B} reverse={true}  duration={28} />
          <TestiColumn items={COL_C} reverse={false} duration={35} />
          <TestiColumn items={COL_D} reverse={true}  duration={30} />
        </div>

        {/* Edge fades */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, #080808 0%, transparent 25%, transparent 75%, #080808 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(to right, #080808 0%, transparent 20%, transparent 80%, #080808 100%)' }} />
      </div>
    </section>
  )
}

/* ─────────────── Services Showcase (2 featured cards) ─────────────── */
const SHOWCASE_IDS = ['objectProtection', 'eventSecurity']

function ShowcaseCard({ id, lang }) {
  const cardRef = useRef(null)
  const imgRef  = useRef(null)
  const image   = SERVICE_HERO_BY_ID[id]
  const title   = SERVICES_I18N[lang]?.cards?.[id]?.title ?? SERVICES_I18N['en']?.cards?.[id]?.title ?? id
  const teaser  = SERVICES_I18N[lang]?.cards?.[id]?.teaser ?? SERVICES_I18N['en']?.cards?.[id]?.teaser ?? ''
  const category = lang === 'de' ? 'Sicherheitsdienstleistung' : 'Security Service'

  const enter = () => {
    gsap.to(imgRef.current, { scale: 1.06, duration: 0.55, ease: 'power2.out' })
  }
  const leave = () => {
    gsap.to(imgRef.current, { scale: 1, duration: 0.55, ease: 'power2.out' })
  }

  return (
    <Link to={`/services/${id}`} style={{ textDecoration: 'none', display: 'block', flex: '1 1 340px' }}>
      <div
        ref={cardRef}
        onMouseEnter={enter}
        onMouseLeave={leave}
        style={{
          position: 'relative',
          borderRadius: 20,
          overflow: 'hidden',
          aspectRatio: '16/10',
          cursor: 'pointer',
          background: '#111',
        }}
      >
        {/* Image */}
        <img
          ref={imgRef}
          src={image}
          alt={title}
          loading="lazy"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            transformOrigin: 'center',
          }}
        />

        {/* Scrim */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
        }} />

        {/* Arrow button — top right, exactly like reference */}
        <div style={{
          position: 'absolute', top: 16, right: 16,
          width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(255,255,255,0.18)',
          backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 15,
        }}>↗</div>

        {/* Text — bottom left, category + title */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 24px' }}>
          <p style={{
            margin: '0 0 4px',
            fontSize: 10, fontWeight: 600,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.55)',
          }}>{category}</p>
          <h3 style={{
            margin: 0,
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(16px,2vw,22px)', letterSpacing: '-0.01em',
            color: '#fff', lineHeight: 1.2,
          }}>{title}</h3>
        </div>
      </div>
    </Link>
  )
}

function ServicesShowcase({ lang }) {
  return (
    <div style={{
      background: '#060606',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      padding: 'clamp(40px,6vw,80px) clamp(20px,4vw,60px)',
    }}>
      {/* Header row — mirrors reference */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'clamp(24px,3vw,44px)', flexWrap: 'wrap', gap: 12 }}>
        <h2 style={{
          margin: 0,
          fontFamily: 'var(--font-display)', fontWeight: 900,
          fontSize: 'clamp(28px,4vw,52px)', letterSpacing: '-0.03em',
          lineHeight: 1.05, textTransform: 'uppercase', color: '#fff',
        }}>
          {lang === 'de' ? <>Leistungen, die<br />überzeugen</> : <>Services that<br />Convince</>}
        </h2>
        <Link
          to="/services"
          style={{
            fontSize: 13, fontWeight: 500,
            color: 'rgba(255,255,255,0.45)',
            textDecoration: 'underline', textUnderlineOffset: 4,
            letterSpacing: '0.02em', whiteSpace: 'nowrap',
            paddingBottom: 4,
          }}
        >
          {lang === 'de' ? 'Alle Leistungen anzeigen' : 'View all projects'}
        </Link>
      </div>

      {/* 2 cards */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {SHOWCASE_IDS.map(id => <ShowcaseCard key={id} id={id} lang={lang} />)}
      </div>
    </div>
  )
}

/* ─────────────── HomePage ─────────────── */
export default function HomePage() {
  const { t, lang } = useLanguage()
  const darkCtaRef  = useRef(null)
  const heroRef     = useRef(null)
  const contentRef  = useRef(null)
  const mvRefs      = useRef([])

  useEffect(() => {
    const hero = heroRef.current
    const content = contentRef.current
    if (!hero || !content) return

    let raf = null
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0

    const onMove = (e) => {
      const { left, top, width, height } = hero.getBoundingClientRect()
      const nx = (e.clientX - left) / width  - 0.5  // -0.5 to 0.5
      const ny = (e.clientY - top)  / height - 0.5
      targetX = ny * -12   // tilt up/down max ±12deg
      targetY = nx *  12   // tilt left/right max ±12deg
    }

    const onLeave = () => { targetX = 0; targetY = 0 }

    const tick = () => {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      content.style.transform = `translateY(4rem) perspective(900px) rotateX(${currentX}deg) rotateY(${currentY}deg)`

      // nudge each camera orbit slightly with the tilt for parallax feel
      mvRefs.current.forEach((mv, i) => {
        if (!mv) return
        const base = CAMERAS[i].orbitBase
        const theta = base.theta + currentY * 0.6
        const phi   = base.phi   - currentX * 0.6
        mv.setAttribute('camera-orbit', `${theta.toFixed(1)}deg ${phi.toFixed(1)}deg 2.5m`)
      })

      raf = requestAnimationFrame(tick)
    }

    hero.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(tick)
    return () => {
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  /* Rotating service descriptors */
  const rotatingTexts = lang === 'de'
    ? ['Objektschutz', 'VIP-Schutz', 'Veranstaltungen', 'Werkschutz', 'Streifendienst']
    : ['Object Protection', 'VIP Security', 'Event Security', 'Industrial Guard', 'Patrol Service']

  /* Dark CTA stagger reveal */
  useEffect(() => {
    if (!darkCtaRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(darkCtaRef.current.querySelectorAll('.cta-line'),
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: darkCtaRef.current, start: 'top 80%', once: true } }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <div>
      {/* ════ HERO ════ */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: '#000',
        }}
      >
        {/* ── Background video (ping-pong) ── */}
        <HeroBgVideo />

        {/* ── Layer 1: deep vignette all edges ── */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 120% 100% at 60% 50%, transparent 30%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.92) 100%)',
        }} />

        {/* ── Layer 2: left-side content shield ── */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(100deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.72) 38%, rgba(0,0,0,0.18) 62%, transparent 80%)',
        }} />

        {/* ── Layer 3: bottom fade to site bg ── */}
        <div aria-hidden style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '22%', zIndex: 3, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.85))',
        }} />

        {/* ── Layer 4: red accent glow bottom-left ── */}
        <div aria-hidden style={{
          position: 'absolute', bottom: '-10%', left: '-5%',
          width: '45vw', height: '45vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(192,57,43,0.22) 0%, transparent 70%)',
          zIndex: 4, pointerEvents: 'none',
          filter: 'blur(8px)',
        }} />

        {/* ── Thin red top-border accent ── */}
        <div aria-hidden style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2, zIndex: 10,
          background: 'linear-gradient(90deg, transparent 0%, #c0392b 30%, #e74c3c 50%, #c0392b 70%, transparent 100%)',
          opacity: 0.7,
        }} />

        {/* Content */}
        <div
          ref={contentRef}
          style={{
            position: 'relative', zIndex: 20,
            display: 'flex', flexDirection: 'column',
            alignItems: 'flex-start', textAlign: 'left',
            padding: '0 clamp(28px, 9vw, 130px)',
            width: '100%', maxWidth: 820,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          {/* Logo */}
          <motion.img
            src={logo}
            alt="Suhaili Security"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            style={{
              height: 'clamp(100px, 14vw, 160px)',
              width: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 2px 16px rgba(0,0,0,0.9)) drop-shadow(0 0 40px rgba(192,57,43,0.25))',
              marginBottom: 'clamp(12px, 2vh, 22px)',
            }}
          />

          {/* Eyebrow label */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              marginBottom: 'clamp(8px, 1.2vh, 14px)',
            }}
          >
            <span style={{ display: 'block', width: 32, height: 2, background: '#c0392b', borderRadius: 2 }} />
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#c0392b',
            }}>
              {lang === 'de' ? 'Professioneller Schutz' : 'Professional Security'}
            </span>
          </motion.div>

          {/* "Your Partner for" */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6, ease: 'easeOut' }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(26px, 5.5vw, 72px)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              textTransform: 'uppercase',
              color: '#fff',
              textShadow: '0 2px 40px rgba(0,0,0,0.8)',
              marginBottom: 2,
              whiteSpace: 'nowrap',
            }}
          >
            {lang === 'de' ? 'Ihr Partner für' : 'Your Partner for'}
          </motion.div>

          {/* Rotating text — single line, never wraps */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6, ease: 'easeOut' }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(26px, 5.5vw, 72px)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              textTransform: 'uppercase',
              color: '#e8402a',
              marginBottom: 'clamp(12px, 2vh, 22px)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            <TextRotate
              texts={rotatingTexts}
              rotationInterval={2800}
              staggerDuration={0.025}
              staggerFrom="last"
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            />
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6, ease: 'easeOut' }}
            style={{
              width: 'clamp(60px, 8vw, 100px)', height: 1,
              background: 'linear-gradient(90deg, #c0392b, transparent)',
              marginBottom: 'clamp(10px, 1.8vh, 18px)',
              transformOrigin: 'left',
            }}
          />

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.55, ease: 'easeOut' }}
            style={{
              fontSize: 'clamp(12px, 1.5vw, 17px)',
              fontWeight: 300,
              color: 'rgba(210,210,210,0.7)',
              lineHeight: 1.5,
              letterSpacing: '0.01em',
              maxWidth: '24em',
              marginBottom: 'clamp(14px, 2.8vh, 30px)',
            }}
          >
            {t('home.heroSub')}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5, ease: 'easeOut' }}
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}
          >
            <LiquidButton
              as={Link} to="/services"
              tint="rgba(192,57,43,0.85)" textColor="#fff"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              {t('home.heroCta1')}
            </LiquidButton>
            <LiquidButton
              as={Link} to="/contact"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              {t('home.heroCta2')} →
            </LiquidButton>
          </motion.div>

          {/* Trust badges */}
          <GyroTiltCard style={{ marginTop: 'clamp(14px, 2.2vh, 26px)', marginBottom: 'clamp(70px, 12vh, 100px)', borderRadius: 14 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            style={{
              display: 'flex', gap: 0, marginTop: 0,
              alignItems: 'stretch',
              background: 'rgba(255,255,255,0.035)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 14,
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              overflow: 'hidden',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            {[
              { num: '15+', label: lang === 'de' ? 'Jahre Erfahrung' : 'Years Experience' },
              { num: '500+', label: lang === 'de' ? 'Projekte' : 'Projects' },
              { num: '24/7', label: lang === 'de' ? 'Verfügbar' : 'Available' },
            ].map(({ num, label }, i) => (
              <div key={num} style={{
                display: 'flex', flexDirection: 'column', gap: 4,
                padding: '12px 16px',
                flex: '1 1 0',
                minWidth: 0,
                borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: i === 0
                    ? 'linear-gradient(90deg, rgba(192,57,43,0.9) 0%, rgba(192,57,43,0.2) 100%)'
                    : i === 1
                      ? 'linear-gradient(90deg, rgba(192,57,43,0.4) 0%, rgba(192,57,43,0.8) 50%, rgba(192,57,43,0.4) 100%)'
                      : 'linear-gradient(90deg, rgba(192,57,43,0.2) 0%, rgba(192,57,43,0.9) 100%)',
                }} />
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(18px, 5vw, 28px)',
                  fontWeight: 800,
                  color: '#fff',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  textShadow: '0 0 20px rgba(192,57,43,0.4)',
                  whiteSpace: 'nowrap',
                }}>{num}</span>
                <span style={{
                  fontSize: 'clamp(8px, 2vw, 9px)',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.38)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>{label}</span>
              </div>
            ))}
          </motion.div>
          </GyroTiltCard>
        </div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          style={{
            position: 'absolute', bottom: 19, left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          }}
        >
          <span style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>
            {lang === 'de' ? 'Scrollen' : 'Scroll'}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, rgba(192,57,43,0.8), transparent)' }}
          />
        </motion.div>
      </section>

      {/* ════ TICKER ════ */}
      <Ticker />

      {/* ════ SERVICES CAROUSEL ════ */}
      <ServicesCarousel lang={lang} />

      {/* ════ SERVICES SHOWCASE ════ */}
      <ServicesShowcase lang={lang} />

      {/* ════ TESTIMONIALS ════ */}
      <Testimonials lang={lang} />

      {/* ════ DARK CTA ════ */}
      <section
        ref={darkCtaRef}
        style={{
          background: '#000',
          padding: 'clamp(80px, 14vw, 140px) clamp(16px, 4vw, 48px) clamp(80px, 14vw, 140px) clamp(16px, 3vw, 40px)',
          borderTop: '1px solid var(--border)',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div>
            {[t('home.cta1'), t('home.cta2'), t('home.cta3')].map((line, i) => (
              <div
                key={i}
                className="cta-line"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: 'clamp(52px, 10vw, 148px)',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                  lineHeight: 0.9,
                  color: i === 2 ? 'var(--red-light)' : '#fff',
                  display: 'block',
                  marginBottom: i < 2 ? '0.06em' : 0,
                }}
              >
                {line}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a
              href={`mailto:${t('home.ctaEmail')}`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 20px',
                background: 'transparent',
                color: 'rgba(255,255,255,0.72)',
                fontSize: 14, fontWeight: 500, letterSpacing: '0.02em',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: 999, textDecoration: 'none',
                transition: 'color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#fff'
                e.currentTarget.style.borderColor = 'rgba(192,57,43,0.55)'
                e.currentTarget.style.boxShadow = '0 0 24px rgba(192,57,43,0.12)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.72)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {t('home.ctaEmail')} ↗
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes scroll-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .svc-track-right {
          animation: scroll-right 32s linear infinite;
        }
        .svc-track-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}

/* ── Icons ── */
function ShieldIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z"
        stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function BuildingIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="1" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 21V9h6v12" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M3 9h18" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}
function UserShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M16 11c1.5 0 2.7 1.2 2.7 2.7v.3c0 2.6-2 4-4.7 4.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="9" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3 20.5c0-3 2.7-5.5 6-5.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M17.5 8l-2.5 2.5-1-1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function EventIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16 3v4M8 3v4M3 11h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}
function CctvIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M2 8l14 4-2 5H6L4 13" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
      <circle cx="19" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M16.5 5H4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      <path d="M9 17v3M15 17v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  )
}
function PatrolIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      <path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  )
}
function DeskIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="7" width="20" height="11" rx="1" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M2 13h20" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M10 13v5M14 13v5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  )
}
