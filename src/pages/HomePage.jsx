import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import { TextRotate } from '../components/ui/text-rotate'
import LiquidButton from '../components/ui/LiquidButton'
import logo from '../assets/SuhailSecurityLogo 2.png'
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

/* ─────────────── Hero video ─────────────── */
const HERO_VIDEO = 'https://res.cloudinary.com/df7obwqcy/video/upload/v1783330652/HeroMain_ki4fps.mp4'

const VIDEO_STYLE = {
  position: 'absolute', inset: 0,
  width: '100%', height: '100%',
  objectFit: 'cover',
  opacity: 0.8,
  zIndex: 0,
}

function HeroBgVideo() {
  return (
    <video
      className="hero-bg-video"
      src={HERO_VIDEO}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      aria-hidden
      style={VIDEO_STYLE}
    />
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
    { icon: <ShieldIcon />,      title: 'Sicherheitsdienst',    desc: 'Zuverlässige Sicherheitslösungen für Objekte, Unternehmen und Veranstaltungen.' },
    { icon: <BuildingIcon />,    title: 'Objektschutz',         desc: 'Schutz und Überwachung Ihres Objekts durch geschultes Personal – diskret, aufmerksam und professionell.' },
    { icon: <FacilityIcon />,    title: 'Facility Management',  desc: 'Koordination und Verwaltung Ihrer Liegenschaft für einen reibungslosen Alltag.' },
    { icon: <CctvIcon />,        title: 'CCTV Überwachung',     desc: 'Modernste Videoüberwachung für Gebäude und Außenbereiche.' },
    { icon: <UserShieldIcon />,  title: 'VIP-Schutz',           desc: 'Diskreter Personenschutz für Führungskräfte und Privatpersonen.' },
    { icon: <EventIcon />,       title: 'Veranstaltungsschutz', desc: 'Professionelle Sicherheit für Events, Messen und Konzerte.' },
    { icon: <HausmeisterIcon />, title: 'Hausmeisterservice',   desc: 'Wartung, Überwachung und Betreuung von Gebäuden und Außenanlagen.' },
    { icon: <PatrolIcon />,      title: 'Streifendienst',       desc: 'Regelmäßige Kontrollgänge und mobile Einsatzbereitschaft.' },
  ],
  en: [
    { icon: <ShieldIcon />,      title: 'Security Services',    desc: 'Reliable security solutions for properties, businesses, and events.' },
    { icon: <BuildingIcon />,    title: 'Property Protection',  desc: 'Protection and supervision of your property by trained staff – discreet, attentive, and professional.' },
    { icon: <FacilityIcon />,    title: 'Facility Management',  desc: 'Coordination and management of your property for smooth day-to-day operations.' },
    { icon: <CctvIcon />,        title: 'CCTV Surveillance',    desc: 'Modern video surveillance for buildings and outdoor areas.' },
    { icon: <UserShieldIcon />,  title: 'VIP Security',         desc: 'Discreet personal protection for executives and private clients.' },
    { icon: <EventIcon />,       title: 'Event Security',       desc: 'Professional security for events, trade fairs and concerts.' },
    { icon: <HausmeisterIcon />, title: 'Caretaking Service',   desc: 'Maintenance, monitoring, and support services for buildings and outdoor facilities.' },
    { icon: <PatrolIcon />,      title: 'Patrol Service',       desc: 'Regular inspection rounds and mobile rapid response.' },
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
        width: '100%',
        height: 'auto',
        minHeight: 160,
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
          fontFamily: 'var(--font-display)', fontSize: 'clamp(15px, 1.5vw, 18px)', fontWeight: 400,
          letterSpacing: '0.1em', color: '#fff', textTransform: 'uppercase',
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

/* ─────────────── Static 2×4 Service Grid ─────────────── */
function ServiceGridTicker({ lang }) {
  const services = CAROUSEL_SERVICES[lang] ?? CAROUSEL_SERVICES.de

  return (
    <div style={{
      background: '#060606',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      padding: 'clamp(28px, 4vw, 48px) clamp(20px, 5vw, 60px)',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(2, auto)',
        gap: 16,
      }} className="svc-static-grid">
        {services.map((s, i) => <ServiceCard2 key={i} icon={s.icon} title={s.title} desc={s.desc} />)}
      </div>
      <style>{`
        @media (max-width: 960px) { .svc-static-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) {
          .svc-static-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
        }
      `}</style>
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
          <span style={{ fontSize: 13, fontWeight: 400, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#c0392b', fontFamily: 'var(--font-display)' }}>
            {lang === 'de' ? 'Kundenstimmen' : 'Client Reviews'}
          </span>
          <span style={{ display: 'block', width: 28, height: 2, background: '#c0392b', borderRadius: 2 }} />
        </div>
        <h2 style={{
          margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400,
          fontSize: 'clamp(36px,5.5vw,72px)', letterSpacing: '0.04em',
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
            fontFamily: 'var(--font-display)', fontWeight: 400,
            fontSize: 'clamp(17px,2vw,24px)', letterSpacing: '0.06em',
            color: '#fff', lineHeight: 1.15,
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
          fontFamily: 'var(--font-display)', fontWeight: 400,
          fontSize: 'clamp(32px,4.5vw,60px)', letterSpacing: '0.04em',
          lineHeight: 1.0, textTransform: 'uppercase', color: '#fff',
        }}>
          {lang === 'de' ? <>Ausgewählte Projekte<br />& Referenzen</> : <>Selected Projects<br />& References</>}
        </h2>
        <Link
          to="/projects"
          style={{
            fontSize: 13, fontWeight: 500,
            color: 'rgba(255,255,255,0.45)',
            textDecoration: 'underline', textUnderlineOffset: 4,
            letterSpacing: '0.02em', whiteSpace: 'nowrap',
            paddingBottom: 4,
          }}
        >
          {lang === 'de' ? 'Alle Projekte anzeigen' : 'View all projects'}
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
      const isMobile = window.innerWidth < 768
      content.style.transform = isMobile
        ? 'none'
        : `perspective(900px) rotateX(${currentX}deg) rotateY(${currentY}deg)`

      // nudge each camera orbit slightly with the tilt for parallax feel
      if (!isMobile) mvRefs.current.forEach((mv, i) => {
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


  return (
    <div>
      {/* ════ HERO ════ */}
      <section
        ref={heroRef}
        className="home-hero"
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
        <div className="hero-vignette" aria-hidden style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 120% 100% at 60% 50%, transparent 30%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.92) 100%)',
        }} />

        {/* ── Layer 2: left-side content shield ── */}
        <div className="hero-content-shield" aria-hidden style={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(100deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.72) 38%, rgba(0,0,0,0.18) 62%, transparent 80%)',
        }} />

        {/* ── Layer 3: bottom fade to site bg ── */}
        <div className="hero-bottom-fade" aria-hidden style={{
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
          className="hero-content"
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
            className="hero-brand-logo"
            src={logo}
            alt="Suhaili Security"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            style={{
              height: 'clamp(90px, 11vw, 140px)',
              width: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 2px 16px rgba(0,0,0,0.9)) drop-shadow(0 0 40px rgba(192,57,43,0.25))',
              marginBottom: 'clamp(4px, 0.5vh, 8px)',
            }}
          />

          {/* Eyebrow label */}
          <motion.div
            className="hero-eyebrow"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              marginBottom: 'clamp(6px, 0.8vh, 10px)',
            }}
          >
            <span style={{ display: 'block', width: 32, height: 2, background: '#c0392b', borderRadius: 2 }} />
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 13,
              fontWeight: 400,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#c0392b',
            }}>
              {lang === 'de' ? 'Professioneller Sicherheitsdienst — Berlin' : 'Professional Security Service — Berlin'}
            </span>
          </motion.div>

          {/* "Your reliable partner for" */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6, ease: 'easeOut' }}
            className="hero-headline"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 3.2vw, 48px)',
              fontWeight: 700,
              letterSpacing: '0.04em',
              lineHeight: 1.0,
              textTransform: 'uppercase',
              color: '#fff',
              textShadow: '0 2px 40px rgba(0,0,0,0.8)',
              marginBottom: 2,
            }}
          >
            {lang === 'de'
              ? <><span className="hero-line1-de">Ihr zuverlässiger</span><br className="hero-br-mobile" /><span> Partner für</span></>
              : 'Your Reliable Partner for'}
          </motion.div>

          {/* Rotating text — fixed height so layout never shifts */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6, ease: 'easeOut' }}
            className="hero-headline hero-headline-red"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 3.2vw, 48px)',
              fontWeight: 700,
              letterSpacing: '0.04em',
              lineHeight: 1.05,
              textTransform: 'uppercase',
              color: '#e8402a',
              marginBottom: 'clamp(6px, 1vh, 14px)',
              whiteSpace: 'nowrap',
              overflow: 'visible',
              minHeight: '1.1em',
              display: 'flex',
              alignItems: 'center',
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
            className="hero-divider"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6, ease: 'easeOut' }}
            style={{
              width: 'clamp(60px, 8vw, 100px)', height: 1,
              background: 'linear-gradient(90deg, #c0392b, transparent)',
              marginBottom: 'clamp(6px, 1vh, 12px)',
              transformOrigin: 'left',
            }}
          />

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.55, ease: 'easeOut' }}
            className="hero-sub"
            style={{
              fontSize: 'clamp(12px, 1.5vw, 17px)',
              fontWeight: 300,
              color: 'rgba(210,210,210,0.7)',
              lineHeight: 1.5,
              letterSpacing: '0.01em',
              maxWidth: '24em',
              marginBottom: 'clamp(10px, 1.6vh, 20px)',
            }}
          >
            {t('home.heroSub')}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5, ease: 'easeOut' }}
            className="hero-buttons"
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginBottom: 'clamp(28px, 5vh, 56px)' }}
          >
            <LiquidButton
              className="hero-secondary-cta"
              as={Link} to="/services"
              tint="rgba(192,57,43,0.85)" textColor="#fff"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(10px, 2.8vw, 15px)', letterSpacing: '0.12em', textTransform: 'uppercase', padding: 'clamp(7px, 1.8vw, 11px) clamp(13px, 3.5vw, 26px)' }}
            >
              <span className="hero-services-label">{t('home.heroCta1')}</span>
              <span className="hero-services-arrow" aria-hidden>↗</span>
            </LiquidButton>
            <LiquidButton
              className="hero-primary-cta"
              as={Link} to="/contact"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(10px, 2.8vw, 15px)', letterSpacing: '0.12em', textTransform: 'uppercase', padding: 'clamp(7px, 1.8vw, 11px) clamp(13px, 3.5vw, 26px)' }}
            >
              {t('home.heroCta2')} →
            </LiquidButton>
          </motion.div>

        </div>

        {/* ── Scroll indicator ── */}
        <motion.div
          className="hero-scroll-indicator"
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

      {/* ════ SERVICE GRID TICKER ════ */}
      <ServiceGridTicker lang={lang} />

      {/* ════ SERVICES SHOWCASE ════ */}
      <ServicesShowcase lang={lang} />

      {/* ════ TESTIMONIALS ════ */}
      <Testimonials lang={lang} />


      <style>{`
        .hero-br-mobile,
        .hero-services-arrow { display: none; }

        @media (max-width: 767px) {
          .home-hero {
            min-height: 100svh !important;
            justify-content: flex-end !important;
          }

          .hero-bg-video {
            object-position: 60% center !important;
          }

          .hero-vignette {
            background: linear-gradient(to bottom, rgba(0,0,0,0.08) 8%, rgba(0,0,0,0.1) 34%, rgba(0,0,0,0.66) 64%, #030303 100%) !important;
          }

          .hero-content-shield {
            background: linear-gradient(100deg, rgba(0,0,0,0.35) 0%, transparent 72%) !important;
          }

          .hero-bottom-fade { height: 48% !important; }

          .hero-content {
            position: absolute !important;
            inset: auto 0 max(30px, env(safe-area-inset-bottom)) 0 !important;
            width: 100% !important;
            max-width: none !important;
            padding: 0 clamp(22px, 6.5vw, 32px) !important;
            overflow: visible !important;
            transform: none !important;
          }

          .hero-brand-logo {
            display: block !important;
            height: clamp(104px, 31vw, 148px) !important;
            width: auto !important;
            max-width: min(86vw, 380px) !important;
            margin-bottom: -18px !important;
            object-fit: contain !important;
          }

          .hero-eyebrow {
            gap: 0 !important;
            margin-bottom: 14px !important;
          }

          .hero-eyebrow > span:first-child {
            display: none !important;
          }

          .hero-eyebrow > span:last-child {
            color: rgba(232,232,232,0.72) !important;
            font-family: var(--font-body) !important;
            font-size: clamp(10px, 2.8vw, 12px) !important;
            font-weight: 700 !important;
            letter-spacing: 0.09em !important;
          }

          .hero-headline {
            width: 100% !important;
            max-width: 11em !important;
            font-size: clamp(32px, 9.7vw, 44px) !important;
            line-height: 0.98 !important;
            letter-spacing: -0.015em !important;
            white-space: normal !important;
            text-wrap: balance;
          }

          .hero-headline-red {
            max-width: 100% !important;
            min-height: 1.12em !important;
            margin-top: 7px !important;
            margin-bottom: 17px !important;
            color: #ef4935 !important;
            font-size: clamp(34px, 10.4vw, 47px) !important;
            line-height: 1 !important;
            white-space: nowrap !important;
            text-wrap: nowrap;
          }

          .hero-br-mobile { display: block !important; }
          .hero-divider { display: none !important; }

          .hero-sub {
            max-width: 32em !important;
            margin-bottom: 19px !important;
            color: rgba(232,232,232,0.68) !important;
            font-size: clamp(12px, 3.45vw, 14px) !important;
            font-weight: 400 !important;
            line-height: 1.55 !important;
          }

          .hero-buttons {
            width: 100% !important;
            gap: 10px !important;
            margin-bottom: 0 !important;
            flex-wrap: nowrap !important;
          }

          .hero-primary-cta {
            order: 1;
            flex: 1 1 auto !important;
            min-width: 0 !important;
            min-height: 58px !important;
            padding: 16px 20px !important;
            border: 1px solid rgba(255,126,112,0.38) !important;
            background: linear-gradient(135deg, rgba(255,255,255,0.18), rgba(231,76,60,0.08) 42%, rgba(95,12,8,0.16)), rgba(156,35,26,0.46) !important;
            backdrop-filter: blur(18px) saturate(185%) brightness(1.08) !important;
            -webkit-backdrop-filter: blur(18px) saturate(185%) brightness(1.08) !important;
            box-shadow: 0 10px 30px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(80,8,5,0.34) !important;
            font-family: var(--font-body) !important;
            font-size: clamp(12px, 3.5vw, 14px) !important;
            font-weight: 700 !important;
            letter-spacing: 0 !important;
            text-transform: none !important;
          }

          .hero-secondary-cta {
            order: 2;
            width: 58px !important;
            height: 58px !important;
            min-width: 58px !important;
            min-height: 58px !important;
            padding: 0 !important;
            border: 1px solid rgba(255,255,255,0.25) !important;
            background: linear-gradient(145deg, rgba(255,255,255,0.17), rgba(255,255,255,0.045)), rgba(12,12,12,0.38) !important;
            backdrop-filter: blur(18px) saturate(170%) brightness(1.1) !important;
            -webkit-backdrop-filter: blur(18px) saturate(170%) brightness(1.1) !important;
            box-shadow: 0 8px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.32) !important;
          }

          .hero-services-label { display: none; }
          .hero-services-arrow {
            position: relative;
            display: grid !important;
            place-items: center;
            width: 100%;
            height: 100%;
            color: #fff;
            font-size: 0;
            line-height: 0;
          }

          .hero-services-arrow::before {
            content: '';
            position: absolute;
            left: 16px;
            top: 28px;
            width: 25px;
            height: 2px;
            border-radius: 999px;
            background: currentColor;
            transform: rotate(-45deg);
            transform-origin: center;
          }

          .hero-services-arrow::after {
            content: '';
            position: absolute;
            right: 16px;
            top: 17px;
            width: 12px;
            height: 12px;
            border-top: 2px solid currentColor;
            border-right: 2px solid currentColor;
            border-radius: 1px;
          }

          .hero-scroll-indicator { display: none !important; }
        }

        @media (max-width: 380px), (max-height: 700px) and (max-width: 767px) {
          .hero-content { bottom: max(22px, env(safe-area-inset-bottom)) !important; }
          .hero-brand-logo { height: clamp(78px, 25vw, 110px) !important; margin-bottom: -14px !important; }
          .hero-eyebrow { margin-bottom: 10px !important; }
          .hero-headline { font-size: clamp(29px, 9vw, 36px) !important; }
          .hero-headline-red { font-size: clamp(31px, 9.6vw, 39px) !important; margin-bottom: 12px !important; }
          .hero-sub { margin-bottom: 14px !important; line-height: 1.45 !important; }
          .hero-primary-cta, .hero-secondary-cta { min-height: 52px !important; height: 52px !important; }
          .hero-secondary-cta { width: 52px !important; min-width: 52px !important; }
        }
      `}</style>
    </div>
  )
}

/* ── Icons ── */
function ShieldIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.75"/>
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.75"/>
    </svg>
  )
}
function BuildingIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18" stroke="currentColor" strokeWidth="1.75"/>
      <path d="M2 22h20" stroke="currentColor" strokeWidth="1.75"/>
      <path d="M15 22v-4a3 3 0 00-6 0v4" stroke="currentColor" strokeWidth="1.75"/>
      <path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01" stroke="currentColor" strokeWidth="2.2"/>
    </svg>
  )
}
function UserShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 01-.68-.01C7.5 20.5 4 18 4 13V6l8-3 8 3v7z" stroke="currentColor" strokeWidth="1.75"/>
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.75"/>
    </svg>
  )
}
function EventIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.75"/>
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.75"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87" stroke="currentColor" strokeWidth="1.75"/>
      <path d="M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.75"/>
    </svg>
  )
}
function CctvIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 7l-7 5 7 5V7z" stroke="currentColor" strokeWidth="1.75"/>
      <rect x="1" y="5" width="15" height="14" rx="2" stroke="currentColor" strokeWidth="1.75"/>
    </svg>
  )
}
function PatrolIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.75"/>
      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.75"/>
      <path d="M11 8v3l2 2" stroke="currentColor" strokeWidth="1.75"/>
    </svg>
  )
}
function FacilityIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.75"/>
      <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.75"/>
      <path d="M7 8h.01M12 8h.01M17 8h.01" stroke="currentColor" strokeWidth="2.5"/>
      <path d="M7 12h10" stroke="currentColor" strokeWidth="1.75"/>
    </svg>
  )
}
function HausmeisterIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" stroke="currentColor" strokeWidth="1.75"/>
      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" strokeWidth="1.75"/>
    </svg>
  )
}
function DeskIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="11" rx="1" stroke="currentColor" strokeWidth="1.75"/>
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.75"/>
      <path d="M2 13h20" stroke="currentColor" strokeWidth="1.75"/>
      <path d="M10 13v5M14 13v5" stroke="currentColor" strokeWidth="1.75"/>
    </svg>
  )
}
