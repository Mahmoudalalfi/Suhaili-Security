import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
const logo = 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777654757/SuhailSecurityLogo_jay0jh.png'

const NAV_LINKS = [
  { key: 'nav.projects', to: '/projects' },
  { key: 'nav.about',    to: '/about'    },
  { key: 'nav.services', to: '/services' },
  { key: 'nav.news',     to: '/news'     },
  { key: 'nav.gallery',  to: '/gallery'  },
  { key: 'nav.contact',  to: '/contact'  },
]

/* Dark glass pill — matches site's dark theme */
const DARK_PILL = 'linear-gradient(160deg, rgba(30,30,30,0.96) 0%, rgba(20,20,20,0.94) 45%, rgba(15,15,15,0.97) 100%)'

function useIsMobile() {
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return mobile
}

function navLinkIsActive(to, pathname) {
  return pathname === to || pathname.startsWith(`${to}/`)
}

function getActivePageName(pathname, t) {
  if (pathname === '/') return 'Home'
  const link = NAV_LINKS.find(({ to }) => navLinkIsActive(to, pathname))
  return link ? t(link.key) : 'Home'
}

export default function Nav() {
  const { pathname } = useLocation()
  const { lang, toggleLanguage, t } = useLanguage()
  const isMobile = useIsMobile()

  const [collapsed, setCollapsed]   = useState(false)
  const [hovered,   setHovered]     = useState(false)
  const [menuOpen,  setMenuOpen]    = useState(false)
  const isMinimized = collapsed && !hovered

  const pillRef      = useRef(null)
  const navRailRef   = useRef(null)
  const highlightRef = useRef(null)
  const homeLinkRef  = useRef(null)
  const linkRefs     = useRef([])

  const lastY  = useRef(0)
  const raf    = useRef(null)
  const timer  = useRef(null)

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    lastY.current = window.scrollY
    const onScroll = () => {
      if (raf.current) return
      raf.current = requestAnimationFrame(() => {
        raf.current = null
        const y  = window.scrollY
        const dy = y - lastY.current
        lastY.current = y
        clearTimeout(timer.current)
        timer.current = setTimeout(() => {
          if (dy > 0 && y > 40) setCollapsed(true)
          if (dy < 0)           setCollapsed(false)
        }, 30)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer.current)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  function moveActiveHighlight() {
    const nav = navRailRef.current
    const hi  = highlightRef.current
    if (!nav || !hi) return
    let el = pathname === '/' ? homeLinkRef.current : null
    if (!el) {
      const ix = NAV_LINKS.findIndex(({ to }) => navLinkIsActive(to, pathname))
      if (ix >= 0) el = linkRefs.current[ix]
    }
    gsap.killTweensOf(hi)
    if (!el) {
      gsap.to(hi, { opacity: 0, duration: 0.16, ease: 'power2.in' })
      return
    }
    const nr = nav.getBoundingClientRect()
    const er = el.getBoundingClientRect()
    const next = { left: er.left - nr.left, top: er.top - nr.top, width: er.width, height: er.height }
    gsap.set(hi, { opacity: 0 })
    gsap.to(hi, { ...next, opacity: 1, duration: 0.35, ease: 'power2.out' })
  }

  useLayoutEffect(() => {
    if (!isMinimized && !isMobile) {
      const id = setTimeout(moveActiveHighlight, 120)
      return () => clearTimeout(id)
    }
  }, [pathname, lang, isMinimized, isMobile])

  const activePageName = getActivePageName(pathname, t)

  /* ── MOBILE ── */
  if (isMobile) {
    return (
      <>
        <div style={{
          position: 'fixed', top: 10, left: 12, right: 12, zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 10px', height: 60, boxSizing: 'border-box',
          background: DARK_PILL,
          backdropFilter: 'blur(20px) saturate(130%)',
          WebkitBackdropFilter: 'blur(20px) saturate(130%)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 999,
          boxShadow: [
            '0 4px 24px rgba(0,0,0,0.5)',
            'inset 0 1px 0 rgba(255,255,255,0.08)',
            'inset 0 -1px 0 rgba(0,0,0,0.3)',
          ].join(', '),
        }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <img src={logo} alt="Suhaili Security"
              style={{ height: 80, width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.6))' }} />
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <LangButton lang={lang} onToggle={toggleLanguage} />
            <button
              onClick={() => setMenuOpen(o => !o)}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <svg className={`nav-ham hamRotate${menuOpen ? ' active' : ''}`} viewBox="0 0 100 100" width="36" height="36">
                <path className="line top" d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20" />
                <path className="line middle" d="m 70,50 h -40" />
                <path className="line bottom" d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20" />
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'fixed', top: 80, left: 12, right: 12, zIndex: 999,
                background: DARK_PILL,
                backdropFilter: 'blur(24px) saturate(130%)',
                WebkitBackdropFilter: 'blur(24px) saturate(130%)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 24,
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                padding: '8px 0 12px',
                overflow: 'hidden',
              }}
            >
              <Link to="/" onClick={() => setMenuOpen(false)} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '12px 20px', textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}>
                <HomeIcon />
                <span style={{ fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.85)', letterSpacing: '-0.01em' }}>Home</span>
              </Link>
              {NAV_LINKS.map(({ key, to }) => {
                const active = navLinkIsActive(to, pathname)
                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'block', padding: '12px 20px',
                      fontSize: 15, fontWeight: active ? 600 : 400,
                      color: active ? 'var(--red-light)' : 'rgba(255,255,255,0.75)',
                      textDecoration: 'none', letterSpacing: '-0.01em',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                      background: active ? 'rgba(192,57,43,0.08)' : 'transparent',
                    }}
                  >
                    {t(key)}
                    {active && <span style={{ marginLeft: 8, color: 'var(--red-light)' }}>●</span>}
                  </Link>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }

  /* ── DESKTOP ── */
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      padding: '0 28px', height: 80, boxSizing: 'border-box', pointerEvents: 'none',
    }}>

      {/* Logo — fades in when not on home page and not minimized */}
      <motion.div
        style={{ position: 'absolute', left: 28, top: '50%', translateY: '-50%', pointerEvents: 'auto' }}
        animate={{
          opacity: (isMinimized || pathname === '/') ? 0 : 1,
          scale: isMinimized ? 0.9 : 1,
          pointerEvents: (isMinimized || pathname === '/') ? 'none' : 'auto',
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Suhaili Security"
            style={{ height: 135, width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.7))' }} />
        </Link>
      </motion.div>

      {/* Pill nav */}
      <motion.div
        ref={pillRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{ maxWidth: isMinimized ? (pathname === '/' ? 60 : Math.max(80, activePageName.length * 11 + 48)) : 720 }}
        transition={{ type: 'spring', damping: 32, stiffness: 300, mass: 0.75 }}
        style={{
          pointerEvents: 'auto',
          background: DARK_PILL,
          backdropFilter: 'blur(28px) saturate(130%) brightness(1.04)',
          WebkitBackdropFilter: 'blur(28px) saturate(130%) brightness(1.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: [
            '0 4px 24px rgba(0,0,0,0.5)',
            '0 1px 4px rgba(0,0,0,0.4)',
            'inset 0 1px 0 rgba(255,255,255,0.08)',
            'inset 0 -1px 0 rgba(0,0,0,0.3)',
          ].join(', '),
          borderRadius: 999,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: isMinimized ? 'pointer' : 'default',
          position: 'relative',
          height: 52,
        }}
        onClick={() => { if (isMinimized) setCollapsed(false) }}
      >
        {/* Minimized label */}
        <motion.div
          animate={{ opacity: isMinimized ? 1 : 0, pointerEvents: isMinimized ? 'auto' : 'none' }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2,
          }}
        >
          {pathname === '/' ? (
            <HomeIcon color="rgba(255,255,255,0.82)" />
          ) : (
            <span style={{
              fontFamily: 'var(--font-body)', fontWeight: 500,
              fontSize: 13, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.82)',
              textTransform: 'uppercase', whiteSpace: 'nowrap',
            }}>
              {activePageName}
            </span>
          )}
        </motion.div>

        {/* Full nav rail */}
        <motion.nav
          ref={navRailRef}
          animate={{ opacity: isMinimized ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'relative',
            display: 'flex', alignItems: 'center',
            gap: 0, padding: '5px 6px', whiteSpace: 'nowrap',
            pointerEvents: isMinimized ? 'none' : 'auto', zIndex: 1,
          }}
        >
          {/* Sliding active highlight */}
          <div
            ref={highlightRef}
            aria-hidden
            style={{
              position: 'absolute', left: 0, top: 0,
              width: 0, height: 0, opacity: 0,
              borderRadius: 999,
              background: 'rgba(192,57,43,0.22)',
              border: '1px solid rgba(192,57,43,0.35)',
              pointerEvents: 'none', zIndex: 0, boxSizing: 'border-box',
            }}
          />
          <Link
            ref={homeLinkRef}
            to="/"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 36, height: 36, borderRadius: 999,
              background: 'transparent', textDecoration: 'none',
              position: 'relative', zIndex: 1, flexShrink: 0,
            }}
            onMouseEnter={e => { if (pathname !== '/') e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
            onMouseLeave={e => { if (pathname !== '/') e.currentTarget.style.background = 'transparent' }}
          >
            <HomeIcon color="rgba(255,255,255,0.72)" />
          </Link>
          {NAV_LINKS.map(({ key, to }, i) => {
            const active = navLinkIsActive(to, pathname)
            return (
              <Link
                key={to}
                ref={node => { linkRefs.current[i] = node }}
                to={to}
                style={{
                  padding: '8px 14px', borderRadius: 999,
                  fontSize: 12, fontWeight: 600,
                  color: active ? '#fff' : 'rgba(255,255,255,0.72)',
                  letterSpacing: '0.06em', lineHeight: 1,
                  whiteSpace: 'nowrap', background: 'transparent',
                  textTransform: 'uppercase', textDecoration: 'none',
                  position: 'relative', zIndex: 1,
                  transition: 'color 0.18s ease',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                    e.currentTarget.style.color = '#fff'
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.72)'
                  }
                }}
              >
                {t(key)}
              </Link>
            )
          })}
        </motion.nav>
      </motion.div>

      {/* Language button */}
      <motion.div
        style={{ position: 'absolute', right: 28, top: '50%', translateY: '-50%', pointerEvents: 'auto' }}
        animate={{ opacity: isMinimized ? 0 : 1, scale: isMinimized ? 0.9 : 1 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <LangButton lang={lang} onToggle={toggleLanguage} />
      </motion.div>
    </header>
  )
}

function LangButton({ lang, onToggle }) {
  const btnRef = useRef(null)

  const handleClick = () => {
    const btn = btnRef.current
    if (!btn) return
    gsap.timeline()
      .to(btn, { scaleX: 0.35, opacity: 0.55, duration: 0.13, ease: 'power3.in' })
      .call(onToggle)
      .to(btn, { scaleX: 1, opacity: 1, duration: 0.42, ease: 'elastic.out(1, 0.55)' })
  }

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={handleClick}
      style={{
        position: 'relative',
        display: 'inline-flex', alignItems: 'center', gap: 7,
        padding: '7px 14px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.12)',
        fontSize: 13, fontWeight: 700, letterSpacing: '0.08em',
        whiteSpace: 'nowrap', cursor: 'pointer', color: 'var(--silver-lt)',
        background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
        backdropFilter: 'blur(14px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(14px) saturate(1.4)',
        boxShadow: [
          '0 3px 12px rgba(0,0,0,0.35)',
          'inset 0 1px 0 rgba(255,255,255,0.1)',
          'inset 0 -1px 0 rgba(0,0,0,0.2)',
        ].join(', '),
        transformOrigin: 'center center', willChange: 'transform',
        transition: 'box-shadow 0.2s, border-color 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 0 0 2px rgba(192,57,43,0.5), 0 4px 16px rgba(192,57,43,0.15), inset 0 1px 0 rgba(255,255,255,0.1)'
        e.currentTarget.style.borderColor = 'rgba(192,57,43,0.4)'
        gsap.to(e.currentTarget, { scale: 1.06, duration: 0.18, ease: 'power2.out' })
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 3px 12px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.2)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
        gsap.to(e.currentTarget, { scale: 1, duration: 0.22, ease: 'power2.out' })
      }}
    >
      <span aria-hidden style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: '40%',
        borderRadius: '0 0 50% 50%',
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />
      {lang === 'en' ? <FlagUS /> : <FlagDE />}
      <span style={{ lineHeight: 1, position: 'relative' }}>{lang.toUpperCase()}</span>
    </button>
  )
}

function FlagUS() {
  return (
    <svg width="22" height="15" viewBox="0 0 22 15"
      style={{ borderRadius: 3, flexShrink: 0, display: 'block', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.4))' }}>
      <defs>
        <linearGradient id="sec-us-sheen" gradientUnits="userSpaceOnUse" x1="-15" y1="0" x2="-5" y2="0">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="50%" stopColor="white" stopOpacity="0.5" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
          <animate attributeName="x1" values="-15;25" dur="3.8s" begin="0.6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="-5;35" dur="3.8s" begin="0.6s" repeatCount="indefinite" />
        </linearGradient>
      </defs>
      {Array.from({ length: 13 }, (_, i) => (
        <rect key={i} x={0} y={i*(15/13)} width={22} height={15/13+0.15} fill={i%2===0?'#B22234':'#FFFFFF'} />
      ))}
      <rect x={0} y={0} width={9} height={15*7/13} fill="#3C3B6E" />
      {[0,1,2,3,4,5,6,7,8].map(r =>
        Array.from({ length: r%2===0?6:5 }, (_,c) => (
          <circle key={`${r}-${c}`} cx={(r%2===0?0.65:1.3)+c*1.4} cy={0.65+r*0.85} r={0.28} fill="white" />
        ))
      )}
      <rect x={0} y={0} width={22} height={15} fill="url(#sec-us-sheen)" style={{ mixBlendMode:'screen' }} />
    </svg>
  )
}

function FlagDE() {
  return (
    <svg width="22" height="15" viewBox="0 0 22 15"
      style={{ borderRadius: 3, flexShrink: 0, display: 'block', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.4))' }}>
      <defs>
        <linearGradient id="sec-de-sheen" gradientUnits="userSpaceOnUse" x1="-15" y1="0" x2="-5" y2="0">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="50%" stopColor="white" stopOpacity="0.5" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
          <animate attributeName="x1" values="-15;25" dur="3.8s" begin="1.8s" repeatCount="indefinite" />
          <animate attributeName="x2" values="-5;35" dur="3.8s" begin="1.8s" repeatCount="indefinite" />
        </linearGradient>
      </defs>
      <rect x={0} y={0}  width={22} height={5} fill="#000000" />
      <rect x={0} y={5}  width={22} height={5} fill="#DD0000" />
      <rect x={0} y={10} width={22} height={5} fill="#FFCE00" />
      <rect x={0} y={0}  width={22} height={15} fill="url(#sec-de-sheen)" style={{ mixBlendMode:'screen' }} />
    </svg>
  )
}

function HomeIcon({ color = 'rgba(255,255,255,0.72)' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path d="M2.5 8.5L10 2.5l7.5 6V17a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5V8.5z"
        stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M7.5 17.5v-5.25a.25.25 0 01.25-.25h4.5a.25.25 0 01.25.25V17.5"
        stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}
