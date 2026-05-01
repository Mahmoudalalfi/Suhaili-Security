import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

function ContactIcon({ type }) {
  const common = {
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: 'rgba(192,57,43,0.22)',
    border: '1px solid rgba(231,76,60,0.45)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  }
  if (type === 'mail') {
    return (
      <span style={common} aria-hidden>
        <svg width="14" height="11" viewBox="0 0 14 11" fill="none"><path d="M1 1h12v9H1V1z" stroke="var(--silver-lt)" strokeWidth="1.2" /><path d="M1 1l6 5 6-5" stroke="var(--silver-lt)" strokeWidth="1.2" /></svg>
      </span>
    )
  }
  if (type === 'phone') {
    return (
      <span style={common} aria-hidden>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.2 2.5h2.4l1.1 2.7-1.5.9c.6 1.1 1.5 2.1 2.6 2.8l1-1.5 2.7 1.1v2.4c0 .4-.4.8-.8.9-4.2 1.3-8.6-3.1-7.3-7.3.1-.4.4-.7.8-.8z" stroke="var(--silver-lt)" strokeWidth="1.1" strokeLinejoin="round" /></svg>
      </span>
    )
  }
  if (type === 'web') {
    return (
      <span style={common} aria-hidden>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="6" stroke="var(--silver-lt)" strokeWidth="1.1" />
          <path d="M1 7h12M7 1c2 2.5 2 9.5 0 12M7 1c-2 2.5-2 9.5 0 12" stroke="var(--silver-lt)" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      </span>
    )
  }
  return null
}

export default function ImprintPage() {
  const { t, lang } = useLanguage()
  const rootRef = useRef(null)
  const cardsRef = useRef([])
  const sectionsRef = useRef([])
  const legalBoxRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.imprint-hero-line',
        { yPercent: 108 },
        { yPercent: 0, duration: 1, ease: 'power4.out', stagger: 0.08 },
      )
      gsap.fromTo(
        '.imprint-hero-sub',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', delay: 0.2 },
      )

      cardsRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0, y: 28, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: 'power3.out',
            delay: i * 0.08,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        )
      })

      sectionsRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0, x: lang === 'de' ? -20 : 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.55,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 89%', once: true },
          },
        )
      })

      if (legalBoxRef.current) {
        gsap.fromTo(
          legalBoxRef.current.querySelectorAll('.imprint-legal-card'),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: legalBoxRef.current, start: 'top 88%', once: true },
          },
        )
      }
    }, rootRef)
    return () => ctx.revert()
  }, [lang])

  const labelStyle = {
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'var(--red-light)',
    marginBottom: 12,
  }

  const cardBase = {
    position: 'relative',
    borderRadius: 14,
    overflow: 'hidden',
    width: '100%',
    aspectRatio: '16 / 10',
    minHeight: 220,
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
    cursor: 'default',
    transition: 'transform 0.45s cubic-bezier(0.33,1,0.68,1), border-color 0.35s ease, box-shadow 0.35s ease',
  }

  const cardImgPosition = ['50% 42%', '50% 48%', '50% 40%']

  const CDN = 'https://res.cloudinary.com/dfc0qnh88/image/upload'
  const cards = [
    { key: 'imprint.card1', src: `${CDN}/v1777655766/card-professional_rniqlc.png` },
    { key: 'imprint.card2', src: `${CDN}/v1777655766/card-discreet_t2owxi.png` },
    { key: 'imprint.card3', src: `${CDN}/v1777655774/card-reliable_h85uke.png` },
  ]

  return (
    <div ref={rootRef} style={{ background: 'var(--bg)', color: 'var(--silver-lt)' }}>
      <header
        className="imprint-hero"
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
            backgroundImage:
              'linear-gradient(rgba(192,57,43,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(192,57,43,0.03) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            opacity: 0.9,
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 720 }}>
          <p
            className="imprint-hero-sub"
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--red-light)',
              marginBottom: 14,
            }}
          >
            {t('imprint.eyebrow')}
          </p>
          <div className="clip-wrap" style={{ marginBottom: '0.06em' }}>
            <h1
              className="imprint-hero-line"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                textTransform: 'lowercase',
                color: '#fff',
                lineHeight: 1.02,
              }}
            >
              {t('imprint.title')}
            </h1>
          </div>
          <p
            className="imprint-hero-sub"
            style={{
              marginTop: 20,
              fontSize: 15,
              color: 'var(--muted)',
              lineHeight: 1.7,
              maxWidth: '36em',
            }}
          >
            {t('imprint.lead')}
          </p>
        </div>
      </header>

      <main
        style={{
          maxWidth: 1160,
          margin: '0 auto',
          padding: 'clamp(40px, 5vw, 72px) clamp(20px, 4vw, 48px) clamp(32px, 5vh, 52px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.35fr)',
            gap: 'clamp(28px, 4vw, 48px)',
            width: '100%',
          }}
          className="imprint-main-grid"
        >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
          {cards.map((c, i) => (
            <div
              key={c.key}
              ref={(el) => { cardsRef.current[i] = el }}
              data-imprint-card
              style={cardBase}
              role="group"
              aria-label={t(c.key)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.borderColor = 'rgba(231,76,60,0.35)'
                e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(231,76,60,0.12)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.35)'
              }}
            >
              <img
                src={c.src}
                alt=""
                loading="lazy"
                decoding="async"
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: cardImgPosition[i] ?? '50% 45%',
                }}
              />
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.75) 100%),' +
                    'radial-gradient(ellipse 85% 70% at 15% 85%, rgba(192,57,43,0.2) 0%, transparent 55%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 1,
                  padding: '18px 18px 16px',
                  background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.82) 100%)',
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(13px, 1.5vw, 15px)',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: '#fff',
                    lineHeight: 1.35,
                    textShadow: '0 2px 14px rgba(0,0,0,0.75)',
                  }}
                >
                  {t(c.key)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
            minWidth: 0,
          }}
        >
          {[
            { label: 'imprint.sectionCompany', lines: true },
            { label: 'imprint.sectionContact', body: null, contact: true },
            { label: 'imprint.sectionPrivacy', body: 'imprint.sectionPrivacyBody', link: '/datenschutz', linkText: 'imprint.privacyLink' },
            { label: 'imprint.sectionNote', note: true },
          ].map((block, i, arr) => {
            const isLastSection = i === arr.length - 1
            return (
            <section
              key={block.label}
              ref={(el) => { sectionsRef.current[i] = el }}
              style={{
                padding: isLastSection ? '28px 0 0' : '28px 0',
                borderBottom: isLastSection ? 'none' : '1px solid var(--border-lt)',
              }}
            >
              <h2 style={{ ...labelStyle, marginTop: 0 }}>{t(block.label)}</h2>
              {block.lines && (
                <div style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--silver-lt)' }}>
                  <p
                    style={{
                      margin: '0 0 22px',
                      paddingBottom: 22,
                      borderBottom: '1px solid rgba(255,255,255,0.09)',
                      fontWeight: 600,
                      color: 'var(--silver-lt)',
                      fontSize: 'clamp(15px, 1.6vw, 17px)',
                      lineHeight: 1.65,
                    }}
                  >
                    {t('imprint.companyIntro')}
                  </p>
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--red-light)',
                      margin: '0 0 10px',
                    }}
                  >
                    {t('imprint.locationLabel')}
                  </p>
                  {t('imprint.addressLines').split('\n').map((line) => (
                    <p key={line} style={{ margin: 0, color: 'var(--silver-lt)', fontSize: 16 }}>{line}</p>
                  ))}
                </div>
              )}
              {block.body && !block.lines && !block.mono && !block.contact && !block.link && (
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.75, color: 'var(--silver-lt)' }}>{t(block.body)}</p>
              )}
              {block.mono && (
                <p
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    color: '#fff',
                  }}
                >
                  {t(block.body)}
                </p>
              )}
              {block.contact && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <a
                    href={`mailto:${t('imprint.email')}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      color: 'var(--red-light)',
                      textDecoration: 'none',
                      fontSize: 15,
                      fontWeight: 600,
                      transition: 'color 0.2s ease, gap 0.3s cubic-bezier(0.33,1,0.68,1)',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#ff7a6a'; e.currentTarget.style.gap = '18px' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--red-light)'; e.currentTarget.style.gap = '14px' }}
                  >
                    <ContactIcon type="mail" />
                    {t('imprint.email')}
                  </a>
                  {t('imprint.phones').split('\n').filter(Boolean).map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        color: 'var(--silver-lt)',
                        textDecoration: 'none',
                        fontSize: 15,
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#fff' }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--silver-lt)' }}
                    >
                      <ContactIcon type="phone" />
                      {phone}
                    </a>
                  ))}
                  <a
                    href={`https://${t('imprint.website').replace(/^https?:\/\//, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      color: 'var(--silver-lt)',
                      textDecoration: 'none',
                      fontSize: 15,
                      fontWeight: 600,
                      transition: 'color 0.2s ease, gap 0.3s cubic-bezier(0.33,1,0.68,1)',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--red-light)'; e.currentTarget.style.gap = '18px' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--silver-lt)'; e.currentTarget.style.gap = '14px' }}
                  >
                    <ContactIcon type="web" />
                    {t('imprint.website')}
                  </a>
                </div>
              )}
              {block.link && (
                <div>
                  <p style={{ margin: '0 0 14px', fontSize: 15, lineHeight: 1.75, color: 'var(--muted)' }}>
                    {t(block.body)}
                  </p>
                  <Link to={block.link} className="imprint-privacy-link">
                    {t(block.linkText)} →
                  </Link>
                </div>
              )}
              {block.note && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {['imprint.noteP1', 'imprint.noteP2'].map((key) => (
                    <p
                      key={key}
                      style={{
                        margin: 0,
                        fontSize: 15,
                        lineHeight: 1.75,
                        color: 'var(--muted)',
                        maxWidth: '36em',
                      }}
                    >
                      {t(key)}
                    </p>
                  ))}
                </div>
              )}
            </section>
            )
          })}
        </div>
        </div>

        <div
          ref={legalBoxRef}
          className="imprint-legal-grid imprint-legal-fullwidth"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 'clamp(20px, 3vw, 32px)',
            alignItems: 'stretch',
            width: '100%',
            marginTop: 'clamp(28px, 4vw, 48px)',
          }}
        >
          <div className="imprint-legal-card">
            <h3 className="imprint-legal-title">{t('imprint.disclaimerTitle')}</h3>
            <p className="imprint-legal-body">{t('imprint.disclaimerBody')}</p>
          </div>
          <div className="imprint-legal-card">
            <h3 className="imprint-legal-title">{t('imprint.copyrightTitle')}</h3>
            <p className="imprint-legal-body">{t('imprint.copyrightBody')}</p>
          </div>
        </div>
      </main>

      <style>{`
        .clip-wrap {
          overflow: hidden;
          display: block;
          padding-top: 0.06em;
          margin-top: -0.06em;
        }
        .imprint-privacy-link {
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--red-light);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding-bottom: 3px;
          border-bottom: 2px solid rgba(231, 76, 60, 0.55);
          transition: color 0.2s ease, gap 0.3s ease, border-color 0.2s ease;
        }
        .imprint-privacy-link:hover {
          color: #ff9a8a;
          gap: 12px;
          border-bottom-color: rgba(255, 154, 138, 0.9);
        }
        .imprint-privacy-link:focus-visible {
          outline: 2px solid var(--red-light);
          outline-offset: 4px;
          border-radius: 2px;
        }
        .imprint-legal-card {
          position: relative;
          min-width: 0;
          background: var(--bg-card);
          border: none;
          border-radius: 14px;
          padding: clamp(22px, 3.2vw, 28px) clamp(22px, 3.2vw, 30px);
          text-align: left;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.055),
            0 10px 36px rgba(0, 0, 0, 0.42);
        }
        .imprint-legal-title {
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--red-light);
          margin: 0 0 14px;
          line-height: 1.25;
        }
        .imprint-legal-body {
          margin: 0;
          font-family: var(--font-body);
          font-size: clamp(13px, 1.25vw, 15px);
          font-weight: 400;
          line-height: 1.68;
          color: var(--silver);
        }
        @media (prefers-reduced-motion: reduce) {
          .imprint-privacy-link {
            transition: none;
          }
          .imprint-hero-line { transform: none !important; }
        }
        @media (max-width: 900px) {
          .imprint-main-grid {
            grid-template-columns: 1fr !important;
          }
          .imprint-legal-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
