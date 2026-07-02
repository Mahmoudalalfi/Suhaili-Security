import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'
import { GALLERY_ITEMS } from '../data/galleryCatalog'

gsap.registerPlugin(ScrollTrigger)

const WHY_ICONS = ['shield', 'bolt', 'list', 'users', 'layers', 'pin', 'check', 'handshake']

function WhyIcon({ name }) {
  const s = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  switch (name) {
    case 'shield': // Proven reliability — shield with checkmark
      return (
        <svg {...s}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    case 'bolt': // Rapid alarm response — siren / bell alert
      return (
        <svg {...s}>
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      )
    case 'list': // Clear scopes of work — clipboard checklist
      return (
        <svg {...s}>
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
          <rect x="9" y="3" width="6" height="4" rx="1" />
          <path d="m9 12 2 2 4-4M9 17h4" />
        </svg>
      )
    case 'users': // Qualified security teams — badge / ID card
      return (
        <svg {...s}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <circle cx="9" cy="11" r="2.5" />
          <path d="M5 19c0-2.2 1.8-4 4-4h.5" />
          <path d="M14 10h4M14 14h3" />
        </svg>
      )
    case 'layers': // End-to-end site security — lock
      return (
        <svg {...s}>
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          <circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'pin': // Berlin & region — map pin / location
      return (
        <svg {...s}>
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      )
    case 'check': // Quality & documentation — file with tick
      return (
        <svg {...s}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="m9 15 2 2 4-4" />
        </svg>
      )
    case 'handshake': // Discretion & partnership — eye with slash (privacy)
      return (
        <svg {...s}>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
          <path d="m2 2 20 20" />
        </svg>
      )
    default:
      return null
  }
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
          position: relative;
          overflow: hidden;
          min-height: 230px;
          padding: clamp(24px, 3vw, 30px);
          border-radius: 18px;
          background: linear-gradient(155deg, #181818 0%, #101010 58%, #0b0b0b 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.07),
            0 22px 54px rgba(0, 0, 0, 0.32);
          transition:
            border-color 0.28s ease,
            box-shadow 0.28s ease,
            transform 0.28s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .gallery-why-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 24px;
          right: 24px;
          height: 1px;
          pointer-events: none;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        }
        .gallery-why-card::after {
          content: '';
          position: absolute;
          top: -70px;
          right: -70px;
          width: 170px;
          height: 170px;
          border-radius: 50%;
          pointer-events: none;
          background: radial-gradient(circle, rgba(231,76,60,0.09), transparent 68%);
        }
        .gallery-why-card > * {
          position: relative;
          z-index: 1;
        }
        @media (hover: hover) and (pointer: fine) {
          .gallery-why-card:hover {
            border-color: rgba(231, 76, 60, 0.28);
            box-shadow:
              inset 0 1px 0 rgba(255, 255, 255, 0.09),
              0 28px 64px rgba(0, 0, 0, 0.4);
            transform: translateY(-3px);
          }
          .gallery-why-card:hover .gallery-why-icon {
            background: rgba(231,76,60,0.14);
            border-color: rgba(231,76,60,0.38);
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
          width: 48px;
          height: 48px;
          border-radius: 50%;
          margin-bottom: 22px;
          color: var(--red-light);
          background: rgba(231,76,60,0.08);
          border: 1px solid rgba(231,76,60,0.2);
          transition:
            background 0.28s ease,
            border-color 0.28s ease;
        }
        .gallery-why-card-title {
          margin: 0 0 12px;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: -0.015em;
          text-transform: none;
          color: #fff;
          line-height: 1.35;
          transition: color 0.28s ease;
        }
        .gallery-why-card-body {
          margin: 0;
          font-size: 13.5px;
          line-height: 1.72;
          color: rgba(232,232,232,0.6);
          transition: color 0.28s ease;
        }
        @media (max-width: 639px) { .gallery-why-card { min-height: 0; } }
      `}</style>
    </div>
  )
}
