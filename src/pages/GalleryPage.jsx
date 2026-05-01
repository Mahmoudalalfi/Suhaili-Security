import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'
import { GALLERY_ITEMS } from '../data/galleryCatalog'

gsap.registerPlugin(ScrollTrigger)

const WHY_ICONS = ['shield', 'bolt', 'list', 'users', 'layers', 'pin', 'check', 'handshake']

function WhyIcon({ name }) {
  const common = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  switch (name) {
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z" />
        </svg>
      )
    case 'bolt':
      return (
        <svg {...common}>
          <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
        </svg>
      )
    case 'list':
      return (
        <svg {...common}>
          <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
        </svg>
      )
    case 'users':
      return (
        <svg {...common}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    case 'layers':
      return (
        <svg {...common}>
          <path d="m12.83 2.18 8.58 4.52a1 1 0 0 1 0 1.78l-8.58 4.52a2 2 0 0 1-1.66 0L2.59 8.48a1 1 0 0 1 0-1.78l8.58-4.52a2 2 0 0 1 1.66 0Z" />
          <path d="m2.6 15.49 8.6 4.52a2 2 0 0 0 1.66 0l8.54-4.52M2.6 11.51l8.6 4.52a2 2 0 0 0 1.66 0l8.54-4.52" />
        </svg>
      )
    case 'pin':
      return (
        <svg {...common}>
          <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      )
    case 'check':
      return (
        <svg {...common}>
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <path d="m22 4-10 10-3-3" />
        </svg>
      )
    case 'handshake':
      return (
        <svg {...common}>
          <path d="M11 14h2a2 2 0 0 0 0-4h-2a1 1 0 0 1-1-1 1 1 0 0 1 1-1h7" />
          <path d="M17.5 5.5 21 10M3 10l3.5-4.5M7 14h2a2 2 0 0 1 0 4h-2a1 1 0 0 0-1 1 1 1 0 0 0 1 1h7" />
        </svg>
      )
    default:
      return null
  }
}

function whyCardSpotlightAllowed() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

/** Cursor-driven radial glow + conic border highlight (red palette). */
function whyCardSpotPointerEnter(e) {
  if (!whyCardSpotlightAllowed()) return
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const cx = r.width / 2
  const cy = r.height / 2
  el.style.setProperty('--spot-x', `${cx}px`)
  el.style.setProperty('--spot-y', `${cy}px`)
  el.style.setProperty('--beam-angle', '0deg')
  el.style.setProperty('--spot-opacity', '1')
}

function whyCardSpotPointerMove(e) {
  if (!whyCardSpotlightAllowed()) return
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = e.clientX - r.left
  const y = e.clientY - r.top
  const cx = r.width / 2
  const cy = r.height / 2
  const angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI)
  el.style.setProperty('--spot-x', `${x}px`)
  el.style.setProperty('--spot-y', `${y}px`)
  el.style.setProperty('--beam-angle', `${angle + 90}deg`)
  el.style.setProperty('--spot-opacity', '1')
}

function whyCardSpotPointerLeave(e) {
  e.currentTarget.style.setProperty('--spot-opacity', '0')
}

function GalleryRibbon({ items, direction, rowKey, style, t }) {
  const [activeItem, setActiveItem] = useState(null)
  const [visible, setVisible] = useState(false)
  const leaveTimer = useRef(null)

  const open = useCallback((item) => {
    clearTimeout(leaveTimer.current)
    setActiveItem(item)
    requestAnimationFrame(() => setVisible(true))
  }, [])

  const close = useCallback(() => {
    clearTimeout(leaveTimer.current)
    leaveTimer.current = setTimeout(() => {
      setVisible(false)
      setTimeout(() => setActiveItem(null), 320)
    }, 60)
  }, [])

  return (
    <div className="gallery-ribbon-track" style={style}>
      {activeItem && createPortal(
        <div
          className={`gallery-hover-overlay${visible ? ' gallery-hover-overlay--visible' : ''}`}
          style={{ pointerEvents: 'none' }}
        >
          <div className="gallery-hover-card">
            <img src={activeItem.image} alt="" className="gallery-hover-img" decoding="async" />
            <div className="gallery-hover-scrim" aria-hidden />
            <p className="gallery-hover-caption">{t(`galleryPage.items.${activeItem.id}.label`)}</p>
          </div>
        </div>,
        document.body
      )}

      <div
        className={`gallery-ribbon gallery-ribbon--${direction}`}
        style={{ animationPlayState: activeItem ? 'paused' : 'running' }}
      >
        {items.map((item, i) => (
          <figure
            key={`${rowKey}-${i}`}
            className={`gallery-ribbon-tile${activeItem?.id === item.id ? ' gallery-ribbon-tile--active' : ''}`}
            onMouseEnter={() => open(item)}
            onMouseLeave={close}
          >
            <div className="gallery-ribbon-inner">
              <img src={item.image} alt="" className="gallery-ribbon-img" loading="lazy" decoding="async" />
              <div className="gallery-ribbon-scrim" aria-hidden />
            </div>
            <figcaption className="gallery-ribbon-caption">{t(`galleryPage.items.${item.id}.label`)}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

export default function GalleryPage() {
  const { t, lang } = useLanguage()
  const rootRef = useRef(null)
  const whyRef = useRef([])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const hero = root.querySelector('.gallery-hero-inner')
    if (hero) {
      gsap.fromTo(hero, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    }
  }, [lang])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (!reduceMotion) {
        whyRef.current.forEach((el, i) => {
          if (!el) return
          gsap.fromTo(
            el,
            { opacity: 0, y: 22 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 92%', once: true },
              delay: i * 0.05,
            },
          )
        })
      }
    }, rootRef)

    return () => ctx.revert()
  }, [lang])

  const whyIds = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8']

  return (
    <div ref={rootRef} style={{ background: 'var(--bg)', color: 'var(--silver-lt)' }}>
      <header
        className="gallery-page-hero"
        style={{
          padding: 'clamp(100px, 14vh, 132px) clamp(20px, 4vw, 48px) clamp(40px, 5vh, 56px)',
          borderBottom: '1px solid var(--border-lt)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'var(--page-grid-lines)',
            backgroundSize: 'var(--page-grid-size)',
            opacity: 0.85,
            pointerEvents: 'none',
          }}
        />
        <div className="gallery-hero-inner" style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div className="gallery-pill-wrap">
            <span className="gallery-pill">{t('galleryPage.eyebrow')}</span>
          </div>
          <h1 className="gallery-hero-title">{t('galleryPage.title')}</h1>
          <div className="gallery-title-accent" aria-hidden />
          <p className="gallery-hero-lead">{t('galleryPage.lead')}</p>
        </div>
      </header>

      <section className="gallery-ribbons-section" aria-labelledby="gallery-grid-heading">
        <h2 id="gallery-grid-heading" className="visually-hidden">{t('galleryPage.title')}</h2>

        {/* Ribbon 1 — scrolls left */}
        <GalleryRibbon
          items={[...GALLERY_ITEMS, ...GALLERY_ITEMS]}
          direction="left"
          duration={38}
          rowKey="r1"
          t={t}
        />

        {/* Ribbon 2 — scrolls right */}
        <GalleryRibbon
          items={[...GALLERY_ITEMS.slice().reverse(), ...GALLERY_ITEMS.slice().reverse()]}
          direction="right"
          duration={44}
          rowKey="r2"
          style={{ marginTop: 16 }}
          t={t}
        />
      </section>

      <section className="gallery-why" aria-labelledby="gallery-why-heading">
        <div className="gallery-why-inner">
          <p className="gallery-why-kicker">{t('galleryPage.whyEyebrow')}</p>
          <h2 id="gallery-why-heading" className="gallery-why-title">
            {t('galleryPage.whyTitle')}
          </h2>
          <div className="gallery-why-accent" aria-hidden />
          <p className="gallery-why-lead">{t('galleryPage.whyLead')}</p>
          <div className="gallery-why-grid">
            {whyIds.map((cid, index) => (
              <article
                key={cid}
                ref={(el) => {
                  whyRef.current[index] = el
                }}
                className="gallery-why-card"
                onPointerEnter={whyCardSpotPointerEnter}
                onPointerMove={whyCardSpotPointerMove}
                onPointerLeave={whyCardSpotPointerLeave}
              >
                <div className="gallery-why-icon" aria-hidden>
                  <WhyIcon name={WHY_ICONS[index]} />
                </div>
                <h3 className="gallery-why-card-title">{t(`galleryPage.why.${cid}.title`)}</h3>
                <p className="gallery-why-card-body">{t(`galleryPage.why.${cid}.body`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        .gallery-pill-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 16px;
        }
        .gallery-pill {
          display: inline-block;
          padding: 10px 20px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--red-light);
          background: rgba(231, 76, 60, 0.12);
          border: 1px solid rgba(231, 76, 60, 0.35);
          box-shadow: 0 0 24px rgba(192, 57, 43, 0.12);
        }
        .gallery-hero-title {
          margin: 0;
          font-family: var(--font-body);
          font-size: clamp(2.2rem, 4.5vw, 3.75rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          text-transform: capitalize;
          color: #fff;
          line-height: 1.05;
        }
        .gallery-title-accent {
          width: 56px;
          height: 4px;
          margin: 18px auto 0;
          border-radius: 2px;
          background: linear-gradient(90deg, var(--red), var(--red-light));
          box-shadow: 0 0 18px rgba(231, 76, 60, 0.35);
        }
        .gallery-hero-lead {
          margin: clamp(20px, 3vw, 28px) auto 0;
          max-width: 560px;
          font-size: 15px;
          line-height: 1.66;
          color: var(--silver);
        }
        /* ── Ribbon layout ── */
        @keyframes scroll-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }

        .gallery-ribbons-section {
          padding: clamp(40px, 6vw, 72px) 0 clamp(56px, 8vw, 96px);
          background: var(--bg);
          border-top: 1px solid rgba(255,255,255,0.06);
          overflow: hidden;
          position: relative;
        }

        .gallery-ribbon-track {
          overflow: hidden;
          width: 100%;
          position: relative;
        }

        .gallery-ribbon {
          display: flex;
          gap: 14px;
          width: max-content;
          will-change: transform;
          padding: 14px 0;
        }
        .gallery-ribbon--left {
          animation: scroll-left 38s linear infinite;
        }
        .gallery-ribbon--right {
          animation: scroll-right 44s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .gallery-ribbon { animation: none; }
        }

        /* ── Tile (thumbnail in strip) ── */
        .gallery-ribbon-tile {
          position: relative;
          flex-shrink: 0;
          width: clamp(220px, 22vw, 340px);
          height: clamp(180px, 18vw, 260px);
          border-radius: 18px;
          overflow: hidden;
          margin: 0;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.1);
          background: #111;
          transition: opacity 0.3s ease, border-color 0.3s ease;
          box-shadow: 0 4px 20px rgba(0,0,0,0.4);
        }
        .gallery-ribbon-tile--active {
          border-color: rgba(231,76,60,0.5);
          opacity: 0.7;
        }

        .gallery-ribbon-inner {
          position: absolute;
          inset: 0;
        }

        .gallery-ribbon-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .gallery-ribbon-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.78) 100%);
          pointer-events: none;
        }

        .gallery-ribbon-caption {
          position: absolute;
          left: 14px;
          right: 14px;
          bottom: 13px;
          margin: 0;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #fff;
          text-shadow: 0 2px 10px rgba(0,0,0,0.8);
        }

        /* ── Hover overlay (big centred card) ── */
        .gallery-hover-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.68);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .gallery-hover-overlay--visible {
          opacity: 1;
        }

        .gallery-hover-card {
          position: relative;
          width: min(820px, 86vw);
          aspect-ratio: 16 / 10;
          border-radius: 22px;
          overflow: hidden;
          box-shadow:
            0 48px 120px rgba(0,0,0,0.9),
            0 0 0 1px rgba(255,255,255,0.12);
          transform: scale(0.9) translateY(20px);
          transition:
            transform 0.35s cubic-bezier(0.25,0.46,0.45,1),
            opacity 0.25s ease;
        }
        .gallery-hover-overlay--visible .gallery-hover-card {
          transform: scale(1) translateY(0);
        }

        .gallery-hover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .gallery-hover-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.85) 100%);
          pointer-events: none;
        }

        .gallery-hover-caption {
          position: absolute;
          left: 28px;
          right: 28px;
          bottom: 28px;
          margin: 0;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #fff;
          text-shadow: 0 2px 14px rgba(0,0,0,0.9);
        }
        .gallery-why {
          position: relative;
          padding: clamp(56px, 9vw, 96px) 0 clamp(72px, 11vw, 120px);
          background:
            radial-gradient(ellipse 70% 45% at 0% 0%, rgba(192, 57, 43, 0.08), transparent 55%),
            linear-gradient(180deg, #0c0c0c 0%, var(--bg) 45%);
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }
        .gallery-why-inner {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 48px);
          text-align: center;
        }
        .gallery-why-kicker {
          margin: 0 0 10px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .gallery-why-title {
          margin: 0;
          font-family: var(--font-display);
          font-size: clamp(1.85rem, 3.8vw, 2.75rem);
          font-weight: 900;
          letter-spacing: -0.02em;
          color: #fff;
          line-height: 1.1;
        }
        .gallery-why-accent {
          width: 56px;
          height: 4px;
          margin: 16px auto 0;
          border-radius: 2px;
          background: linear-gradient(90deg, var(--red), var(--red-light));
        }
        .gallery-why-lead {
          margin: clamp(18px, 3vw, 26px) auto 0;
          max-width: 640px;
          font-size: 15px;
          line-height: 1.65;
          color: var(--silver);
        }
        .gallery-why-grid {
          margin-top: clamp(36px, 5vw, 52px);
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(18px, 2.5vw, 22px);
          text-align: left;
        }
        @media (min-width: 640px) {
          .gallery-why-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .gallery-why-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .gallery-why-card {
          --spot-opacity: 0;
          --spot-x: 50%;
          --spot-y: 50%;
          --beam-angle: 0deg;
          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding: clamp(20px, 2.5vw, 24px) clamp(18px, 2.2vw, 22px) clamp(22px, 2.8vw, 26px);
          border-radius: 16px;
          background: var(--bg-card);
          border: 1px solid rgba(255, 255, 255, 0.09);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            0 16px 40px rgba(0, 0, 0, 0.38);
          transition:
            border-color 0.34s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.34s cubic-bezier(0.4, 0, 0.2, 1),
            transform 0.34s cubic-bezier(0.4, 0, 0.2, 1);
          -webkit-tap-highlight-color: transparent;
        }
        .gallery-why-card::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          border-radius: inherit;
          pointer-events: none;
          opacity: var(--spot-opacity);
          transition: opacity 0.35s ease;
          background: radial-gradient(
            520px circle at var(--spot-x, 50%) var(--spot-y, 50%),
            rgba(231, 76, 60, 0.26) 0%,
            rgba(231, 76, 60, 0.08) 32%,
            transparent 56%
          );
        }
        .gallery-why-card::after {
          content: '';
          position: absolute;
          inset: -1px;
          z-index: 0;
          border-radius: 17px;
          pointer-events: none;
          opacity: var(--spot-opacity);
          transition: opacity 0.3s ease;
          padding: 1px;
          background: conic-gradient(
            from var(--beam-angle),
            rgba(255, 255, 255, 0.04) 0%,
            rgba(231, 76, 60, 0.12) 12%,
            rgba(231, 76, 60, 0.95) 19%,
            rgba(231, 76, 60, 0.45) 26%,
            rgba(255, 255, 255, 0.05) 38%,
            transparent 52%
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
        .gallery-why-card > * {
          position: relative;
          z-index: 1;
        }
        @media (prefers-reduced-motion: reduce) {
          .gallery-why-card::before,
          .gallery-why-card::after {
            display: none;
          }
        }
        @media (hover: hover) and (pointer: fine) {
          .gallery-why-card:hover {
            border-color: rgba(231, 76, 60, 0.38);
            box-shadow:
              inset 0 1px 0 rgba(255, 255, 255, 0.05),
              0 20px 48px rgba(0, 0, 0, 0.46),
              0 0 28px rgba(192, 57, 43, 0.1);
            transform: translateY(-4px);
          }
          .gallery-why-card:hover .gallery-why-icon {
            background: #121212;
            color: var(--red-light);
            box-shadow:
              inset 0 0 0 1px rgba(231, 76, 60, 0.35),
              0 0 18px rgba(231, 76, 60, 0.12);
          }
          .gallery-why-card:hover .gallery-why-card-title {
            color: var(--red-light);
          }
          .gallery-why-card:hover .gallery-why-card-body {
            color: var(--silver-lt);
          }
        }
        .gallery-why-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          margin-bottom: 14px;
          color: #1a1a1a;
          background: linear-gradient(145deg, var(--silver-lt), #a8a8a8);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35);
          transition:
            background 0.34s cubic-bezier(0.4, 0, 0.2, 1),
            color 0.34s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.34s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .gallery-why-card-title {
          margin: 0 0 10px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #fff;
          line-height: 1.25;
          transition: color 0.34s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .gallery-why-card-body {
          margin: 0;
          font-size: 14px;
          line-height: 1.62;
          color: var(--silver);
          transition: color 0.34s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  )
}
