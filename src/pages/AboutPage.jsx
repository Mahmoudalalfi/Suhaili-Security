import { useEffect, useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'
import LiquidButton from '../components/ui/LiquidButton'

gsap.registerPlugin(ScrollTrigger)

const RED = 'var(--red-light)'

const PILLAR_ICONS = {
  guard: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  ),
  cctv: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 7l-7 5 7 5V7z"/>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
    </svg>
  ),
  patrol: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  event: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  tech: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
}

const VALUE_ICONS = {
  reliable: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  personal: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  trust: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  quality: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
}

const PILLARS = {
  de: [
    { id: 'guard',  icon: 'guard',  title: 'Objektschutz',      desc: 'Professioneller Schutz für Gebäude, Industrieanlagen und öffentliche Einrichtungen – rund um die Uhr.' },
    { id: 'cctv',   icon: 'cctv',   title: 'Videoüberwachung',  desc: 'Modernste CCTV-Systeme und Leitstellen-Überwachung für lückenlosen Schutz.' },
    { id: 'patrol', icon: 'patrol', title: 'Revierdienst',       desc: 'Mobile Streifen- und Kontrolldienste für maximale Präsenz und Abschreckung.' },
    { id: 'event',  icon: 'event',  title: 'Veranstaltungsschutz', desc: 'Erfahrene Sicherheitsteams für Events jeder Größe – diskret, professionell, verlässlich.' },
    { id: 'tech',   icon: 'tech',   title: 'Sicherheitstechnik', desc: 'Alarm-, Zutrittskontroll- und Interkomsysteme aus einer Hand installiert und betreut.' },
  ],
  en: [
    { id: 'guard',  icon: 'guard',  title: 'Object Protection',  desc: 'Professional security for buildings, industrial plants and public facilities – around the clock.' },
    { id: 'cctv',   icon: 'cctv',   title: 'CCTV Surveillance',  desc: 'State-of-the-art CCTV systems and control-room monitoring for seamless protection.' },
    { id: 'patrol', icon: 'patrol', title: 'Patrol Service',      desc: 'Mobile patrol and inspection services for maximum presence and deterrence.' },
    { id: 'event',  icon: 'event',  title: 'Event Security',      desc: 'Experienced security teams for events of any size – discreet, professional, dependable.' },
    { id: 'tech',   icon: 'tech',   title: 'Security Technology', desc: 'Alarm, access-control and intercom systems — installed and serviced from a single source.' },
  ],
}

const VALUES = {
  de: [
    { icon: 'reliable', label: 'Zuverlässig' },
    { icon: 'personal', label: 'Persönlich' },
    { icon: 'trust',    label: 'Vertrauensvoll' },
    { icon: 'quality',  label: 'Qualitätsorientiert' },
  ],
  en: [
    { icon: 'reliable', label: 'Reliable' },
    { icon: 'personal', label: 'Personal' },
    { icon: 'trust',    label: 'Trustworthy' },
    { icon: 'quality',  label: 'Quality-driven' },
  ],
}

const TICKER_ITEMS = {
  de: ['Objektschutz', 'Videoüberwachung', 'Revierdienst', 'Veranstaltungsschutz', 'Personenschutz', 'Sicherheitstechnik', 'Interventionsdienst', 'Empfang & Concierge'],
  en: ['Object Protection', 'CCTV Surveillance', 'Patrol Service', 'Event Security', 'Personal Protection', 'Security Technology', 'Alarm Response', 'Reception & Concierge'],
}

const QUALITY_IMAGE = 'https://res.cloudinary.com/df7obwqcy/image/upload/v1782963066/About1_ysug5a.png'

function useScrollReveal(ref, opts = {}) {
  useLayoutEffect(() => {
    if (!ref.current) return
    gsap.set(ref.current, { opacity: 0, y: opts.y ?? 40 })
  }, [])
  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const rect = el.getBoundingClientRect()
    if (rect.bottom < 0) { gsap.set(el, { opacity: 1, y: 0 }); return }
    gsap.fromTo(el,
      { opacity: 0, y: opts.y ?? 40 },
      {
        opacity: 1, y: 0,
        duration: opts.duration ?? 0.85,
        ease: opts.ease ?? 'power3.out',
        delay: opts.delay ?? 0,
        scrollTrigger: { trigger: el, start: 'top 70%', once: true },
      }
    )
  }, [])
}

function RevealBlock({ children, y = 40, delay = 0, style = {} }) {
  const ref = useRef(null)
  useScrollReveal(ref, { y, delay })
  return <div ref={ref} style={style}>{children}</div>
}

export default function AboutPage() {
  const { t, lang } = useLanguage()
  const heroRef = useRef(null)

  const pillars = PILLARS[lang] ?? PILLARS.de
  const values  = VALUES[lang]  ?? VALUES.de
  const ticker  = TICKER_ITEMS[lang] ?? TICKER_ITEMS.de

  const copy = {
    de: {
      heroTitleLead:   'Ihr Partner für',
      heroTitleAccent: 'Sicherheit und Schutz.',
      heroSub:         'Professionelle Sicherheitsdienstleistungen in Berlin und Umgebung – zuverlässig, diskret und rund um die Uhr für Sie im Einsatz.',
      learnMoreLabel:  'Mehr erfahren',
      aboutEyebrow:    'Über uns',
      aboutHeading:    'Gemeinsam für Sicherheit, Vertrauen und professionellen Schutz.',
      aboutIntro:      'Als Suhaili Security UG stehen wir für zuverlässige und diskrete Sicherheitsdienstleistungen in Berlin und Umgebung – für Unternehmen, öffentliche Einrichtungen und private Auftraggeber.',
      qualityTitle:    'Qualität, auf die Sie sich verlassen können',
      qualityP1:       'Wir arbeiten mit klaren Prozessen, modernster Technik und einem hohen Qualitätsanspruch. Diskretion, Pünktlichkeit und Transparenz sind für uns selbstverständlich.',
      qualityP2:       'Jeder Auftrag ist für uns eine neue Verantwortung, die wir mit Engagement und Sorgfalt erfüllen.',
      tickerLabel:     'Unsere Leistungen',
      partnerHeading:  'Vertrauen aus Wirtschaft, Verwaltung und Kultur',
    },
    en: {
      heroTitleLead:   'Your partner for',
      heroTitleAccent: 'Security and Protection.',
      heroSub:         'Professional security services in Berlin and the surrounding region – reliable, discreet and available around the clock.',
      learnMoreLabel:  'Learn more',
      aboutEyebrow:    'About us',
      aboutHeading:    'Together for security, trust and professional protection.',
      aboutIntro:      'As Suhaili Security UG we stand for reliable and discreet security services in Berlin and the surrounding area – for businesses, public institutions and private clients.',
      qualityTitle:    'Quality you can count on',
      qualityP1:       'We operate with clear processes, state-of-the-art technology and uncompromising quality standards. Discretion, punctuality and transparency are non-negotiable.',
      qualityP2:       'Every assignment is a new responsibility – one we fulfil with commitment and care.',
      tickerLabel:     'Our Services',
      partnerHeading:  'Trusted by business, government and culture',
    },
  }
  const c = copy[lang] ?? copy.de

  useLayoutEffect(() => {
    if (!heroRef.current) return
    gsap.set(heroRef.current, { opacity: 0, y: 36 })
  }, [])

  useEffect(() => {
    if (!heroRef.current) return
    gsap.fromTo(heroRef.current,
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 }
    )
  }, [])

  const learnMoreHref = t('about.learnMoreHref') || '/contact'

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--silver-lt)' }}>

      <style>{`
        @media (max-width: 768px) { .about-hero-img { object-position: 75% center !important; } }

        .about-pillars-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: clamp(20px, 3vw, 32px); }
        @media (min-width: 380px) and (max-width: 560px) {
          .about-pillars-grid > :last-child {
            grid-column: 1 / -1;
            width: calc((100% - 20px) / 2);
            justify-self: center;
          }
        }

        .about-values-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        @media (max-width: 560px) { .about-values-row { grid-template-columns: repeat(2, 1fr); gap: 16px; } }

        .about-partner-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(20px, 3vw, 32px); }
        @media (max-width: 860px) { .about-partner-cards { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 520px) { .about-partner-cards { grid-template-columns: 1fr; } }

        .partner-card { transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; }
      `}</style>

      {/* ── Hero ── */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
      }}>
        <img
          src="https://res.cloudinary.com/df7obwqcy/image/upload/v1782962343/AboutHero_q0nkmz.png"
          alt="Suhaili Security — Professional Security Services Berlin"
          className="about-hero-img"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(4,4,4,0.12) 0%, rgba(4,4,4,0.52) 50%, rgba(4,4,4,0.86) 100%)',
        }} />
        <div
          ref={heroRef}
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            maxWidth: 1200,
            margin: '0 auto',
            padding: 'clamp(100px, 14vw, 140px) clamp(20px, 5vw, 40px) clamp(56px, 8vw, 80px)',
          }}
        >
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(38px, 6vw, 76px)',
            fontWeight: 400,
            letterSpacing: '0.04em',
            color: '#fff',
            lineHeight: 1.0,
            margin: '0 0 20px',
            maxWidth: 900,
            textTransform: 'uppercase',
          }}>
            {c.heroTitleLead}{' '}
            <span style={{ color: RED }}>{c.heroTitleAccent}</span>
          </h1>
          <p style={{
            fontSize: 'clamp(15px, 1.7vw, 19px)',
            color: 'rgba(255,255,255,0.82)',
            lineHeight: 1.65,
            maxWidth: 600,
            margin: '0 0 32px',
          }}>
            {c.heroSub}
          </p>
          <LiquidButton as={Link} to={learnMoreHref} tint="rgba(192,57,43,0.9)" textColor="#fff"
            style={{ fontFamily: 'var(--font-display)', fontSize: 15, letterSpacing: '0.14em', textTransform: 'uppercase' }}
          >
            {c.learnMoreLabel} →
          </LiquidButton>
        </div>
      </section>

      {/* ── Intro ── */}
      <section style={{ padding: 'clamp(64px, 9vw, 96px) clamp(20px, 5vw, 40px)' }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(28px, 4vw, 64px)',
          alignItems: 'start',
        }}>
          <RevealBlock>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 13,
              fontWeight: 400,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: RED,
              marginBottom: 16,
            }}>
              {c.aboutEyebrow}
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 3.8vw, 48px)',
              fontWeight: 400,
              color: '#fff',
              letterSpacing: '0.03em',
              lineHeight: 1.1,
              margin: 0,
              textTransform: 'uppercase',
            }}>
              {c.aboutHeading}
            </h2>
          </RevealBlock>
          <RevealBlock delay={0.1}>
            <p style={{
              fontSize: 'clamp(15px, 1.6vw, 17px)',
              color: 'var(--silver)',
              lineHeight: 1.75,
              margin: 0,
            }}>
              {c.aboutIntro}
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* ── Service pillars ── */}
      <section style={{ padding: '0 clamp(20px, 5vw, 40px) clamp(72px, 10vw, 96px)' }}>
        <div className="about-pillars-grid" style={{ maxWidth: 1200, margin: '0 auto' }}>
          {pillars.map((pillar) => (
            <div key={pillar.id} style={{ textAlign: 'center', padding: '0 8px' }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                border: `1.5px solid rgba(192,57,43,0.5)`,
                background: 'rgba(192,57,43,0.07)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 18px',
                color: RED,
              }}>
                {PILLAR_ICONS[pillar.icon] || PILLAR_ICONS.guard}
              </div>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(14px, 1.4vw, 16px)',
                fontWeight: 400,
                color: '#fff',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                margin: '0 0 10px',
              }}>
                {pillar.title}
              </p>
              <p style={{
                fontSize: 13,
                color: 'var(--silver)',
                lineHeight: 1.65,
                margin: 0,
              }}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Quality section ── */}
      <section style={{
        background: '#0a0a0a',
        padding: 'clamp(48px, 7vw, 80px) clamp(20px, 6vw, 80px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(32px, 5vw, 64px)',
          alignItems: 'center',
        }}>
          <RevealBlock>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(24px, 3vw, 40px)',
              fontWeight: 400,
              color: RED,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              lineHeight: 1.15,
              margin: '0 0 12px',
            }}>
              {c.qualityTitle}
            </h2>
            <div style={{ width: 36, height: 3, borderRadius: 2, background: RED, margin: '0 0 20px' }} />
            <p style={{
              fontSize: 'clamp(14px, 1.4vw, 15px)',
              color: 'var(--silver)',
              lineHeight: 1.7,
              margin: '0 0 14px',
            }}>
              {c.qualityP1}
            </p>
            <p style={{
              fontSize: 'clamp(14px, 1.4vw, 15px)',
              color: 'var(--silver)',
              lineHeight: 1.7,
              margin: '0 0 28px',
            }}>
              {c.qualityP2}
            </p>
            <div className="about-values-row">
              {values.map((v, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 10px',
                    color: RED,
                  }}>
                    {VALUE_ICONS[v.icon] || VALUE_ICONS.reliable}
                  </div>
                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 12,
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.85)',
                    margin: 0,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}>
                    {v.label}
                  </p>
                </div>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.12}>
            <div style={{
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 24px 64px rgba(0,0,0,0.65)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <img
                src={QUALITY_IMAGE}
                alt="Suhaili Security team"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── Service ticker ── */}
      <div style={{
        background: 'linear-gradient(90deg, #8b1a1a 0%, #c0392b 35%, #e74c3c 55%, #b03020 100%)',
        overflow: 'hidden',
        position: 'relative',
        height: 56,
        display: 'flex',
        alignItems: 'center',
      }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to right, #8b1a1a, transparent)', zIndex: 2 }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, #b03020, transparent)', zIndex: 2 }} />
        <div className="ticker-track">
          {[1, 2].map(copy => (
            <div key={copy} style={{ display: 'flex', alignItems: 'center' }} aria-hidden={copy === 2}>
              {ticker.map((label, i) => (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '0 20px', whiteSpace: 'nowrap' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
                  </svg>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 400, letterSpacing: '0.12em', color: '#fff', textTransform: 'uppercase' }}>{label}</span>
                  {i < ticker.length - 1 && <span style={{ color: 'rgba(255,255,255,0.4)', marginLeft: 10 }}>◆</span>}
                </span>
              ))}
              <span style={{ color: 'rgba(255,255,255,0.4)', padding: '0 20px' }}>◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Partner companies ── */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(56px, 10vw, 96px) clamp(24px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <RevealBlock>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 3.6vw, 48px)',
              fontWeight: 400,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: '#fff',
              lineHeight: 1.1,
              margin: '0 0 clamp(36px, 5vw, 52px)',
              maxWidth: 720,
            }}>
              {lang === 'de' ? 'Vertrauen aus Wirtschaft, Verwaltung und Kultur' : 'Trusted across industry, public sector, and culture'}
            </h2>
          </RevealBlock>

          <div className="about-partner-cards">
            {[
              {
                slug: 'suhaili-services',
                name: 'Suhaili Service GmbH',
                logo: 'https://res.cloudinary.com/df7obwqcy/image/upload/v1782963162/new-logo_xgbypc.png',
                body: lang === 'de'
                  ? 'Professionelle Gebäudedienstleistungen in Berlin und Umgebung – Reinigung, Facility Management, Logistik und mehr aus einer Hand.'
                  : 'Professional facility services in Berlin and the surrounding area – cleaning, facility management, logistics and more from a single source.',
                website: 'www.suhaili-services.de',
                websiteHref: 'https://www.suhaili-services.de',
                color: '#C9A84C',
              },
              {
                slug: 'crystal-dbc',
                name: 'Crystal DBC Real Estate L.L.C',
                logo: 'https://res.cloudinary.com/df7aiznm6/image/upload/v1782404563/crystaldbclogo_sip4su.png',
                body: lang === 'de'
                  ? 'Internationale Immobilien- und Investmentlösungen in Dubai, Ägypten und weiteren Märkten. Spezialisiert auf hochwertige Immobilien und Kapitalanlagen.'
                  : 'International real estate and investment solutions in Dubai, Egypt and other markets. Specialised in high-quality properties and capital investments.',
                website: 'www.crystaldbc.com',
                websiteHref: 'https://www.crystaldbc.com',
                color: '#3b8beb',
              },
              {
                slug: 'aufsteig',
                name: 'AT Aufsteig Technik GmbH',
                logo: 'https://res.cloudinary.com/df7aiznm6/image/upload/v1782404393/aufsteig-logo_t8sygm.png',
                body: lang === 'de'
                  ? 'Spezialisiert auf Aufzugs-, Rolltreppen- und technische Gebäudelösungen sowie Montage-, Service- und Wartungsarbeiten.'
                  : 'Specialised in elevator, escalator and technical building solutions as well as assembly, service and maintenance work.',
                website: 'www.aufsteigtechnik.de',
                websiteHref: 'https://www.aufsteigtechnik.de',
                color: '#a8b8c8',
              },
            ].map((client, i) => (
              <RevealBlock key={client.slug} delay={i * 0.08} style={{ height: '100%' }}>
                <a
                  href={client.websiteHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="partner-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'linear-gradient(160deg, #1a1a1f 0%, #0d0d10 100%)',
                    borderRadius: 24,
                    border: `1px solid ${client.color}30`,
                    boxShadow: `0 2px 0 0 ${client.color}18 inset, 0 24px 48px rgba(0,0,0,0.45)`,
                    padding: 'clamp(28px, 4vw, 40px)',
                    boxSizing: 'border-box',
                    height: '100%',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-6px)'
                    e.currentTarget.style.boxShadow = `0 2px 0 0 ${client.color}40 inset, 0 32px 64px rgba(0,0,0,0.55), 0 0 0 1px ${client.color}55`
                    e.currentTarget.style.borderColor = `${client.color}70`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = `0 2px 0 0 ${client.color}18 inset, 0 24px 48px rgba(0,0,0,0.45)`
                    e.currentTarget.style.borderColor = `${client.color}30`
                  }}
                >
                  {/* brand radial glow */}
                  <div style={{
                    position: 'absolute', top: -40, right: -40, width: 180, height: 180,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${client.color}14 0%, transparent 70%)`,
                    pointerEvents: 'none',
                  }} />

                  {/* logo */}
                  <div style={{
                    height: 120,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 28,
                  }}>
                    <img src={client.logo} alt={client.name} style={{ maxWidth: '80%', maxHeight: 100, objectFit: 'contain' }} />
                  </div>

                  <h3 style={{
                    fontSize: 'clamp(17px, 1.8vw, 21px)', fontWeight: 600,
                    color: '#fff', lineHeight: 1.25, margin: '0 0 12px', letterSpacing: '-0.01em',
                  }}>
                    {client.name}
                  </h3>

                  <p style={{
                    fontSize: 13.5, color: 'rgba(255,255,255,0.52)',
                    lineHeight: 1.75, margin: '0 0 auto', paddingBottom: 24, flexGrow: 1,
                  }}>
                    {client.body}
                  </p>

                  {/* footer */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: 4,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={client.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                      </svg>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{client.website}</span>
                    </div>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      background: `${client.color}18`,
                      border: `1px solid ${client.color}40`,
                      borderRadius: 999,
                      padding: '5px 14px',
                      fontSize: 12, fontWeight: 600, color: client.color,
                      letterSpacing: '0.02em',
                      whiteSpace: 'nowrap', flexShrink: 0,
                    }}>
                      {lang === 'de' ? 'Mehr erfahren' : 'Learn more'}
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={client.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>
                </a>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
