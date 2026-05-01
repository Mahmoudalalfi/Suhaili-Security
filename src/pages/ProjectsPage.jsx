import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const CDN = 'https://res.cloudinary.com/dfc0qnh88/image/upload'

const PROJECT_ITEMS = [
  { id: 'p1', image: `${CDN}/v1777654837/project-retail-security_qfziil.png` },
  { id: 'p2', image: `${CDN}/v1777654834/project-logistics-cctv_nqt4ml.png` },
  { id: 'p3', image: `${CDN}/v1777654836/project-vip-protection_aoqpin.png` },
  { id: 'p4', image: `${CDN}/v1777654840/project-cctv-monitoring_xv7nh1.png` },
  { id: 'p5', image: `${CDN}/v1777654833/project-event-security_eyhkbo.png` },
  { id: 'p6', image: `${CDN}/v1777654845/project-hotel-lobby_qz7n64.png` },
  { id: 'p7', image: `${CDN}/v1777654833/project-alarm-response_bg9r45.png` },
  { id: 'p8', image: `${CDN}/v1777654844/project-patrol-night_mphxnx.png` },
]

function ProjectArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 7h10v10M17 7L7 17"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ProjectsPage() {
  const { t, lang } = useLanguage()
  const rootRef = useRef(null)
  const cardsRef = useRef([])
  const prevLightboxRef = useRef(null)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const hero = root.querySelector('.projects-hero-inner')
    if (hero) {
      gsap.fromTo(hero, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    }
  }, [lang])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            delay: i * 0.04,
          },
        )
      })
    }, rootRef)
    return () => ctx.revert()
  }, [lang])

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [lightbox])

  useEffect(() => {
    const wasOpen = prevLightboxRef.current != null
    prevLightboxRef.current = lightbox
    if (!wasOpen || lightbox != null) return
    const id = requestAnimationFrame(() => {
      const ae = document.activeElement
      if (ae && ae.matches('button.project-card')) {
        ae.blur()
      }
    })
    return () => cancelAnimationFrame(id)
  }, [lightbox])

  function openLightbox(item, title) {
    setLightbox({ src: item.image, title })
  }

  const lightboxNode =
    lightbox &&
    createPortal(
      <div
        className="project-lightbox-backdrop"
        role="dialog"
        aria-modal="true"
        aria-label={lightbox.title}
        onClick={() => setLightbox(null)}
        onKeyDown={(e) => e.key === 'Escape' && setLightbox(null)}
      >
        <button
          type="button"
          className="project-lightbox-close"
          aria-label={t('projects.closeLightbox')}
          onClick={(e) => {
            e.stopPropagation()
            setLightbox(null)
          }}
        >
          ×
        </button>
        <div className="project-lightbox-inner" onClick={(e) => e.stopPropagation()}>
          <img
            src={lightbox.src}
            alt=""
            className="project-lightbox-img"
            decoding="async"
          />
        </div>
      </div>,
      document.body,
    )

  return (
    <div ref={rootRef} className="projects-page" style={{ background: 'var(--bg)', color: 'var(--silver-lt)' }}>
      {lightboxNode}

      <header
        className="projects-hero"
        style={{
          padding: 'clamp(100px, 14vh, 132px) clamp(20px, 4vw, 48px) clamp(28px, 4vh, 48px)',
          textAlign: 'center',
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
        <div className="projects-hero-inner" style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto' }}>
          <p
            style={{
              margin: '0 0 14px',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
            {t('projects.eyebrow')}
          </p>
          <h1
            style={{
              margin: '0 0 20px',
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#fff',
              textTransform: 'capitalize',
            }}
          >
            <span style={{ display: 'block' }}>{t('projects.titleLine1')}</span>
            <span style={{ display: 'block' }}>{t('projects.titleLine2')}</span>
          </h1>
          <div
            aria-hidden
            style={{
              width: 72,
              height: 4,
              margin: '0 auto',
              borderRadius: 2,
              background: 'linear-gradient(90deg, transparent, var(--red-light) 20%, var(--red) 80%, transparent)',
              boxShadow: '0 0 24px rgba(231, 76, 60, 0.35)',
            }}
          />
        </div>
      </header>

      <section
        className="projects-section"
        style={{
          position: 'relative',
          padding: 'clamp(48px, 7vw, 88px) clamp(20px, 4vw, 48px) clamp(64px, 10vh, 120px)',
        }}
      >
        <div
          className="projects-badge-floating"
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            transform: 'translate(-50%, -50%)',
            zIndex: 3,
          }}
        >
          <span
            className="projects-badge"
            style={{
              display: 'inline-block',
              padding: '11px 24px',
              borderRadius: 999,
              fontFamily: 'var(--font-display)',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#fff',
              background: 'linear-gradient(165deg, var(--red-light) 0%, var(--red) 100%)',
              boxShadow:
                '0 6px 28px rgba(192, 57, 43, 0.45), inset 0 1px 0 rgba(255,255,255,0.22)',
            }}
          >
            {t('projects.badge')}
          </span>
        </div>

        <div
          className="projects-grid"
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 'clamp(18px, 2.5vw, 28px)',
            paddingTop: 28,
          }}
        >
          {PROJECT_ITEMS.map((item, i) => {
            const title = t(`projects.${item.id}.title`)
            const meta = t(`projects.${item.id}.meta`)
            return (
              <article
                key={item.id}
                ref={(el) => { cardsRef.current[i] = el }}
                className="project-card-wrap"
                style={{ minWidth: 0 }}
              >
                <button
                  type="button"
                  className="project-card"
                  aria-label={`${t('projects.openImage')}: ${title}`}
                  onClick={() => openLightbox(item, title)}
                >
                  <img
                    src={item.image}
                    alt=""
                    loading={i < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: '50% 45%',
                      transition: 'transform 0.55s cubic-bezier(0.33, 1, 0.68, 1)',
                    }}
                  />
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.82) 100%)',
                      pointerEvents: 'none',
                    }}
                  />
                  <div
                    className="project-card-arrow-wrap"
                    aria-hidden
                    style={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.96)',
                      color: '#111',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 18px rgba(0,0,0,0.25)',
                      transition: 'transform 0.3s ease, background 0.25s ease',
                      pointerEvents: 'none',
                    }}
                  >
                    <ProjectArrowIcon />
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 1,
                      padding: '22px 22px 20px',
                      pointerEvents: 'none',
                    }}
                  >
                    <p
                      style={{
                        margin: '0 0 6px',
                        fontSize: 10,
                        fontWeight: 800,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.75)',
                      }}
                    >
                      {meta}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.15rem, 2.2vw, 1.45rem)',
                        fontWeight: 800,
                        letterSpacing: '0.02em',
                        color: '#fff',
                        lineHeight: 1.2,
                        textShadow: '0 2px 16px rgba(0,0,0,0.5)',
                      }}
                    >
                      {title}
                    </p>
                  </div>
                </button>
              </article>
            )
          })}
        </div>
      </section>

      <style>{`
        .project-card {
          display: block;
          position: relative;
          width: 100%;
          margin: 0;
          padding: 0;
          border-radius: 16px;
          overflow: hidden;
          aspect-ratio: 16 / 10;
          min-height: 240px;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 16px 48px rgba(0,0,0,0.45);
          color: inherit;
          font: inherit;
          text-align: left;
          background: transparent;
          -webkit-tap-highlight-color: transparent;
        }
        @media (hover: hover) and (pointer: fine) {
          .project-card:hover img {
            transform: scale(1.04);
          }
          .project-card:hover .project-card-arrow-wrap {
            transform: scale(1.06);
            background: rgba(255, 255, 255, 1);
            color: var(--red);
          }
        }
        .project-card:focus-visible {
          outline: 2px solid var(--red-light);
          outline-offset: 4px;
        }
        .project-lightbox-backdrop {
          position: fixed;
          inset: 0;
          z-index: 100000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(16px, 4vw, 40px);
          background: rgba(0, 0, 0, 0.88);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          cursor: pointer;
        }
        .project-lightbox-inner {
          max-width: min(96vw, 1400px);
          max-height: 92vh;
          cursor: default;
        }
        .project-lightbox-img {
          display: block;
          max-width: 100%;
          max-height: 92vh;
          width: auto;
          height: auto;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.65);
        }
        .project-lightbox-close {
          position: fixed;
          top: clamp(12px, 3vh, 24px);
          right: clamp(12px, 3vw, 24px);
          z-index: 100001;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(20, 20, 20, 0.85);
          color: #fff;
          font-size: 28px;
          line-height: 1;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          transition: background 0.2s ease, border-color 0.2s ease;
          -webkit-tap-highlight-color: transparent;
        }
        @media (hover: hover) and (pointer: fine) {
          .project-lightbox-close:hover {
            background: rgba(231, 76, 60, 0.25);
            border-color: rgba(231, 76, 60, 0.55);
          }
        }
        .project-lightbox-close:focus-visible {
          outline: 2px solid var(--red-light);
          outline-offset: 3px;
        }
        @media (max-width: 720px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: reduce) {
          .project-card:hover img {
            transform: none;
          }
          .project-card:hover .project-card-arrow-wrap {
            transform: none;
          }
        }
      `}</style>
    </div>
  )
}
