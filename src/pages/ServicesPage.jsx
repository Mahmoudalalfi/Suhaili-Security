import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'
import { SERVICES_ORDER, SERVICE_HERO_BY_ID } from '../data/servicesCatalog'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIAL_KEYS = [
  { org: 'testimonial1Org', quote: 'testimonial1Quote', role: 'testimonial1Role' },
  { org: 'testimonial2Org', quote: 'testimonial2Quote', role: 'testimonial2Role' },
]

function RevealBlock({ children, delay = 0, style = {} }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(ref.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay,
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true } }
    )
  }, [])
  return <div ref={ref} style={{ opacity: 0, ...style }}>{children}</div>
}

// Category groupings — tab = category, each has ordered service IDs
const SERVICE_CATEGORIES = [
  {
    key: 'sicherheitsdienste',
    labelDe: 'Sicherheitsdienste',
    labelEn: 'Security Services',
    shortDe: 'Dienste',
    shortEn: 'Security',
    ids: [
      'objectProtection','plantSecurity','constructionSites','eventSecurity',
      'personalProtection','patrolService','receptionService','doorman',
      'interventionNight','storeDetective','parkingLogistics','clinicSecurity',
    ],
  },
  {
    key: 'sicherheitstechnik',
    labelDe: 'Sicherheitstechnik',
    labelEn: 'Security Technology',
    shortDe: 'Technik',
    shortEn: 'Tech',
    ids: [
      'cctvSurveillance','alarmFireIntrusion','accessTimeBarrierIntercom',
      'securityLighting','controlCenter',
    ],
  },
  {
    key: 'baustellenservice',
    labelDe: 'Baustellenservice',
    labelEn: 'Construction Site Services',
    shortDe: 'Baustelle',
    shortEn: 'Construction',
    ids: [
      'constructionSiteControl','materialTheftDoc',
    ],
  },
  {
    key: 'empfangConcierge',
    labelDe: 'Empfang & Concierge',
    labelEn: 'Reception & Concierge',
    shortDe: 'Empfang',
    shortEn: 'Reception',
    ids: [
      'conciergeService','visitorBadgeReception','communicationsDesk',
    ],
  },
  {
    key: 'besondereLeistungen',
    labelDe: 'Besondere Dienstleistungen',
    labelEn: 'Special Services',
    shortDe: 'Besondere',
    shortEn: 'Special',
    ids: [
      'embassySecurity','criticalInfrastructure','consultingRisk','evacuationPlanning',
    ],
  },
]

/* ── Full-screen split showcase ── */
function ServicesShowcase({ servicesList, lang, onOpenDetail }) {
  const [catIdx, setCatIdx] = useState(0)
  const [svcIdx, setSvcIdx] = useState(0)
  const pausedRef = useRef(false)
  const imgRef = useRef(null)
  const labelRef = useRef(null)
  const teaserRef = useRef(null)
  const touchStartX = useRef(null)

  const currentCat = SERVICE_CATEGORIES[catIdx]
  const catServices = currentCat.ids.map(id => servicesList.find(s => s.id === id)).filter(Boolean)
  const active = catServices[svcIdx] || catServices[0]

  function animateSwitch(fn) {
    const els = [imgRef.current, labelRef.current, teaserRef.current].filter(Boolean)
    gsap.to(els, { opacity: 0, duration: 0.15, ease: 'power2.in', onComplete: fn })
  }

  function selectCat(i) {
    if (i === catIdx) return
    animateSwitch(() => { setCatIdx(i); setSvcIdx(0) })
  }

  function hoverSvc(i) {
    if (i === svcIdx) return
    animateSwitch(() => setSvcIdx(i))
  }

  function goNext() {
    animateSwitch(() => setSvcIdx(prev => (prev + 1) % catServices.length))
  }
  function goPrev() {
    animateSwitch(() => setSvcIdx(prev => (prev - 1 + catServices.length) % catServices.length))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (pausedRef.current) return
      setSvcIdx(prev => {
        const els = [imgRef.current, labelRef.current, teaserRef.current].filter(Boolean)
        const next = (prev + 1) % catServices.length
        gsap.to(els, { opacity: 0, duration: 0.15, ease: 'power2.in', onComplete: () => setSvcIdx(next) })
        return prev
      })
    }, 3500)
    return () => clearInterval(interval)
  }, [catIdx, catServices.length])

  useEffect(() => {
    const els = [imgRef.current, labelRef.current, teaserRef.current].filter(Boolean)
    gsap.fromTo(els, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power3.out' })
  }, [catIdx, svcIdx])

  const total = catServices.length
  const pad = n => String(n).padStart(2, '0')
  const catLabel = c => lang === 'de' ? c.labelDe : c.labelEn
  const catShort = c => lang === 'de' ? c.shortDe : c.shortEn
  const tabsRef = useRef(null)
  const [showArrows, setShowArrows] = useState(false)

  useEffect(() => {
    const el = tabsRef.current
    if (!el) return
    const check = () => setShowArrows(el.scrollWidth > el.clientWidth + 4)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [lang])

  function scrollTabs(dir) {
    if (tabsRef.current) tabsRef.current.scrollBy({ left: dir * 220, behavior: 'smooth' })
  }

  return (
    <div className="svc-showcase-wrap">

      {/* Tab nav — arrows only render when tabs overflow */}
      <div className="svc-showcase-tabs-wrap">
        {showArrows && (
          <button className="svc-tab-arrow svc-tab-arrow--left" aria-label="Scroll left" onClick={() => scrollTabs(-1)}>‹</button>
        )}
        <nav ref={tabsRef} className="svc-showcase-tabs" aria-label="Service categories">
          {SERVICE_CATEGORIES.map((c, i) => (
            <button
              key={c.key}
              onClick={() => selectCat(i)}
              className={`svc-showcase-tab${catIdx === i ? ' svc-showcase-tab--active' : ''}`}
            >
              <span className="svc-tab-label-long">{catLabel(c).toUpperCase()}</span>
              <span className="svc-tab-label-short">{catShort(c).toUpperCase()}</span>
            </button>
          ))}
        </nav>
        {showArrows && (
          <button className="svc-tab-arrow svc-tab-arrow--right" aria-label="Scroll right" onClick={() => scrollTabs(1)}>›</button>
        )}
      </div>

      {/* Split panel */}
      <div className="svc-showcase-split"
        onMouseEnter={() => { pausedRef.current = true }}
        onMouseLeave={() => { pausedRef.current = false }}
        onTouchStart={e => { touchStartX.current = e.touches[0].clientX; pausedRef.current = true }}
        onTouchEnd={e => {
          if (touchStartX.current === null) return
          const dx = e.changedTouches[0].clientX - touchStartX.current
          if (Math.abs(dx) > 40) { dx < 0 ? goNext() : goPrev() }
          touchStartX.current = null; pausedRef.current = false
        }}
      >
        {/* LEFT: hero image */}
        <div className="svc-showcase-img-wrap">
          <img ref={imgRef} src={active?.img} alt={active?.name} className="svc-showcase-img" />
          <div className="svc-showcase-img-overlay" />
          <div className="svc-showcase-img-bottom">
            <span className="svc-showcase-img-tag">{catLabel(currentCat).toUpperCase()}</span>
            <h2 ref={labelRef} className="svc-showcase-img-title">{active?.name}</h2>
            {active?.teaser && (
              <p ref={teaserRef} className="svc-showcase-img-teaser">{active.teaser}</p>
            )}
            <div className="svc-showcase-img-footer">
              <span className="svc-showcase-img-counter">{pad(svcIdx + 1)} / {pad(total)}</span>
              <button className="svc-showcase-img-explore" onClick={() => active && onOpenDetail(active.id)}>EXPLORE →</button>
            </div>
          </div>
        </div>

        {/* RIGHT: numbered list */}
        <div className="svc-showcase-list-wrap">
          <ul className="svc-showcase-list">
            {catServices.map((s, i) => (
              <li
                key={s.id}
                className={`svc-showcase-list-item${svcIdx === i ? ' svc-showcase-list-item--active' : ''}`}
                onMouseEnter={() => hoverSvc(i)}
                onClick={() => onOpenDetail(s.id)}
              >
                <span className="svc-showcase-list-num">{pad(i + 1)}</span>
                <span className="svc-showcase-list-name">{s.name}</span>
                <span className="svc-showcase-list-arrow">→</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile: card grid below image */}
      <div className="svc-mobile-section">
        <div className="svc-mobile-cards">
          {catServices.map((s, i) => (
            <button
              key={s.id}
              className={`svc-mobile-card${svcIdx === i ? ' svc-mobile-card--active' : ''}`}
              onClick={() => onOpenDetail(s.id)}
            >
              <img src={s.img} alt="" className="svc-mobile-card-bg" />
              <div className="svc-mobile-card-overlay" />
              <div className="svc-mobile-card-body">
                <span className="svc-mobile-card-num">{pad(i + 1)}</span>
                <span className="svc-mobile-card-name">{s.name}</span>
                <span className="svc-mobile-card-arrow">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .svc-showcase-wrap { background: #0a0a0a; }

        /* ── Tabs ── */
        .svc-showcase-tabs-wrap {
          display: flex;
          align-items: stretch;
          background: #0a0a0a;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .svc-tab-arrow {
          flex-shrink: 0;
          width: 40px;
          background: #0a0a0a;
          border: none;
          border-bottom: 2px solid transparent;
          color: rgba(255,255,255,0.35);
          font-size: 22px;
          line-height: 1;
          cursor: pointer;
          padding: 0;
          transition: color 0.18s, background 0.18s;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: -1px;
        }
        .svc-tab-arrow--left { box-shadow: 4px 0 12px rgba(0,0,0,0.5); z-index: 1; }
        .svc-tab-arrow--right { box-shadow: -4px 0 12px rgba(0,0,0,0.5); z-index: 1; }
        .svc-tab-arrow:hover { color: #fff; background: rgba(255,255,255,0.04); }
        .svc-showcase-tabs {
          display: flex;
          flex: 1;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .svc-showcase-tabs::-webkit-scrollbar { display: none; }
        .svc-showcase-tab {
          flex: 1;
          min-width: max-content;
          padding: 18px 12px;
          font-family: var(--font-display);
          font-size: clamp(12px, 1.1vw, 14px);
          font-weight: 400;
          letter-spacing: 0.16em;
          color: rgba(255,255,255,0.32);
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          white-space: nowrap;
          transition: color 0.2s, border-color 0.2s;
          margin-bottom: -1px;
          text-transform: uppercase;
        }
        .svc-showcase-tab:hover { color: rgba(255,255,255,0.65); }
        .svc-showcase-tab--active { color: #fff; border-bottom-color: var(--red-light); }
        /* Long label on desktop, short on mobile */
        .svc-tab-label-short { display: none; }
        .svc-tab-label-long { display: inline; }
        @media (max-width: 768px) {
          .svc-tab-label-short { display: inline; }
          .svc-tab-label-long { display: none; }
          .svc-showcase-tabs-wrap {
            padding: 0;
            border-bottom: 1px solid rgba(255,255,255,0.08);
            background: #0a0a0a;
          }
          .svc-showcase-tabs {
            gap: 0;
            padding: 0;
          }
          .svc-showcase-tab {
            flex: 0 0 auto;
            min-width: unset;
            padding: 16px 15px 14px;
            font-size: 11px;
            border-bottom: 2px solid transparent;
            border-radius: 0;
            background: transparent;
            margin-bottom: -1px;
          }
          .svc-showcase-tab--active {
            background: transparent;
            color: #fff;
            border-bottom-color: var(--red-light);
          }
          /* On mobile hide the desktop split hero — show only the card grid */
          .svc-showcase-split { display: none !important; }
        }

        /* ── Split ── */
        .svc-showcase-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: clamp(340px, 42vw, 520px);
        }

        /* LEFT image */
        .svc-showcase-img-wrap { position: relative; overflow: hidden; background: #111; }
        .svc-showcase-img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .svc-showcase-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.05) 100%);
        }
        .svc-showcase-img-bottom { position: absolute; bottom: 0; left: 0; right: 0; padding: clamp(20px, 3vw, 36px); }
        .svc-showcase-img-tag {
          display: inline-block; padding: 5px 12px; background: var(--red); color: #fff;
          font-family: var(--font-display); font-size: 13px; font-weight: 400;
          letter-spacing: 0.18em; border-radius: 4px; margin-bottom: 10px;
        }
        .svc-showcase-img-title {
          font-family: var(--font-display); font-size: clamp(26px, 3.8vw, 52px);
          font-weight: 400; color: #fff; letter-spacing: 0.03em; line-height: 1.0; margin: 0 0 16px;
        }
        .svc-showcase-img-teaser {
          font-size: clamp(12px, 1.3vw, 14px); color: rgba(255,255,255,0.65);
          line-height: 1.55; margin: 0 0 14px; max-width: 400px;
        }
        .svc-showcase-img-footer {
          display: flex; align-items: center; justify-content: space-between;
          border-top: 1px solid rgba(255,255,255,0.2); padding-top: 12px;
        }
        .svc-showcase-img-counter {
          font-family: var(--font-display); font-size: 14px; font-weight: 400;
          letter-spacing: 0.18em; color: rgba(255,255,255,0.55);
        }
        .svc-showcase-img-explore {
          font-family: var(--font-display); font-size: 14px; font-weight: 400;
          letter-spacing: 0.18em; color: var(--red-light); cursor: pointer;
          background: none; border: none; padding: 0; transition: opacity 0.15s;
        }
        .svc-showcase-img-explore:hover { opacity: 0.75; }

        /* RIGHT list */
        .svc-showcase-list-wrap {
          background: #111; overflow-y: auto; scrollbar-width: thin;
          scrollbar-color: rgba(192,57,43,0.3) transparent;
          border-left: 1px solid rgba(255,255,255,0.06);
          display: flex; flex-direction: column;
        }
        .svc-showcase-list-wrap::-webkit-scrollbar { width: 3px; }
        .svc-showcase-list-wrap::-webkit-scrollbar-thumb { background: rgba(192,57,43,0.3); }
        .svc-showcase-list { list-style: none; margin: 0; padding: 0; flex: 1; display: flex; flex-direction: column; }
        .svc-showcase-list-item {
          display: flex; align-items: center; gap: 14px;
          padding: 0 clamp(20px, 3vw, 36px);
          flex: 1;
          min-height: 36px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          cursor: pointer; transition: background 0.18s;
        }
        .svc-showcase-list-item:hover { background: rgba(192,57,43,0.08); }
        .svc-showcase-list-item--active { background: rgba(192,57,43,0.14); }
        .svc-showcase-list-num {
          font-family: var(--font-display); font-size: clamp(15px, 1.5vw, 18px);
          font-weight: 400; color: rgba(192,57,43,0.35); letter-spacing: 0.06em;
          min-width: 30px; flex-shrink: 0; transition: color 0.18s;
        }
        .svc-showcase-list-item--active .svc-showcase-list-num { color: var(--red-light); }
        .svc-showcase-list-name {
          flex: 1; font-family: var(--font-display); font-size: clamp(13px, 1.2vw, 15px);
          font-weight: 400; letter-spacing: 0.08em; color: rgba(255,255,255,0.45); transition: color 0.18s;
        }
        .svc-showcase-list-item:hover .svc-showcase-list-name,
        .svc-showcase-list-item--active .svc-showcase-list-name { color: #fff; }
        .svc-showcase-list-arrow {
          font-size: 13px; color: rgba(255,255,255,0.12);
          transition: color 0.18s, transform 0.18s; display: inline-block;
        }
        .svc-showcase-list-item:hover .svc-showcase-list-arrow,
        .svc-showcase-list-item--active .svc-showcase-list-arrow { color: var(--red-light); transform: translateX(4px); }

        /* Mobile card grid */
        .svc-mobile-section { display: none; background: #0a0a0a; padding: 0 0 4px; }
        @media (max-width: 768px) {
          .svc-mobile-section { display: block; }
        }
        .svc-mobile-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          background: #0a0a0a;
        }
        .svc-mobile-card {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
          border: none;
          padding: 0;
          cursor: pointer;
          background: #111;
          text-align: left;
        }
        .svc-mobile-card:last-child:nth-child(odd) {
          grid-column: 1 / -1;
          aspect-ratio: 16/7;
        }
        .svc-mobile-card-bg {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.4s ease;
        }
        .svc-mobile-card:active .svc-mobile-card-bg { transform: scale(1.04); }
        .svc-mobile-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%);
        }
        .svc-mobile-card-body {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 10px 12px;
          display: flex; align-items: flex-end; gap: 6px;
        }
        .svc-mobile-card-num {
          font-family: var(--font-display); font-size: 13px; font-weight: 400;
          color: rgba(255,255,255,0.45); letter-spacing: 0.1em;
          flex-shrink: 0; margin-bottom: 2px;
        }
        .svc-mobile-card-name {
          flex: 1; font-family: var(--font-display); font-size: 14px;
          font-weight: 400; color: #fff; letter-spacing: 0.06em;
          line-height: 1.15;
        }
        .svc-mobile-card-arrow {
          font-size: 13px; color: rgba(255,255,255,0.45);
          flex-shrink: 0; transition: color 0.15s;
        }
        .svc-mobile-card--active .svc-mobile-card-arrow { color: #fff; }
      `}</style>
    </div>
  )
}

export default function ServicesPage() {
  const { t, lang } = useLanguage()
  const rootRef = useRef(null)
  const navigate = useNavigate()

  const servicesList = SERVICES_ORDER.map((id) => ({
    id,
    name: t(`servicesPage.cards.${id}.title`) || id,
    teaser: t(`servicesPage.cards.${id}.teaser`) || '',
    img: SERVICE_HERO_BY_ID[id],
    bullets: String(t(`servicesPage.detail.${id}.bullets`) || '')
      .split('|||').map(s => s.trim()).filter(Boolean),
  }))

  const openDetail = (id) => navigate(`/services/${id}`)

  return (
    <div ref={rootRef} style={{ background: 'var(--bg)', color: 'var(--silver-lt)' }}>

      {/* ── Hero ── */}
      <header style={{ padding: 'clamp(120px, 16vw, 200px) clamp(20px, 5vw, 48px) clamp(56px, 8vw, 80px)', background: 'var(--bg)', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'var(--page-grid-lines)', backgroundSize: 'var(--page-grid-size)', opacity: 0.6, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1160, margin: '0 auto' }}>
          <p style={{ margin: '0 0 20px', fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--red-light)' }}>
            {t('servicesPage.heroEyebrow')}
          </p>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#fff', lineHeight: 0.95, maxWidth: 900 }}>
            {t('servicesPage.heroTitle')}
          </h1>
        </div>
      </header>

      {/* ── Showcase (full-screen split) ── */}
      <ServicesShowcase servicesList={servicesList} lang={lang} onOpenDetail={openDetail} />

      {/* ── Process ── */}
      <section className="svc-section svc-section--process" aria-labelledby="svc-process-heading">
        <div className="svc-section-inner">
          <div className="svc-eyebrow-row">
            <span className="svc-eyebrow-mark" aria-hidden />
            <p className="svc-eyebrow-text">{t('servicesPage.processEyebrow')}</p>
          </div>
          <h2 id="svc-process-heading" className="svc-section-title">{t('servicesPage.processTitle')}</h2>
          <div className="svc-process-grid">
            {[
              {
                num: 'process1Num', title: 'process1Title', body: 'process1Body',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="1.6"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6"/>
                  </svg>
                ),
              },
              {
                num: 'process2Num', title: 'process2Title', body: 'process2Body',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.6"/>
                  </svg>
                ),
              },
              {
                num: 'process3Num', title: 'process3Title', body: 'process3Body',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="1.6"/>
                  </svg>
                ),
              },
            ].map((step, i) => (
              <div key={step.title} className="svc-process-col">
                <div className="svc-process-icon-wrap">
                  {step.icon}
                  <span className="svc-process-step-num">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="svc-process-connector" aria-hidden />
                <h3 className="svc-process-heading">{t(`servicesPage.${step.title}`)}</h3>
                <p className="svc-process-body">{t(`servicesPage.${step.body}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="svc-section svc-section--voice" aria-labelledby="svc-voice-heading">
        <div className="svc-section-inner svc-section-inner--voice">
          <span className="svc-voice-rule" aria-hidden />
          <div className="svc-testimonial-head">
            <h2 id="svc-voice-heading" className="svc-testimonial-title">{t('servicesPage.testimonialTitle')}</h2>
          </div>
          <div className="svc-testimonial-grid">
            {TESTIMONIAL_KEYS.map((q) => (
              <div key={q.org} className="svc-testimonial-card">
                <svg className="svc-t-mark" viewBox="0 0 32 24" aria-hidden="true">
                  <path d="M4 3h9v9H8c.1 3.1 1.6 5.2 4.4 6.5L10.8 22C5.7 20.1 3 16.2 3 10.8V4a1 1 0 0 1 1-1Zm16 0h9v9h-5c.1 3.1 1.6 5.2 4.4 6.5L26.8 22C21.7 20.1 19 16.2 19 10.8V4a1 1 0 0 1 1-1Z" fill="currentColor"/>
                </svg>
                <p className="svc-t-quote">{t(`servicesPage.${q.quote}`)}</p>
                <div className="svc-t-footer">
                  <svg className="svc-t-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M7 7h3M14 7h3M7 11h3M14 11h3M7 15h3M14 15h3M10 21v-3h4v3" stroke="currentColor" strokeWidth="1.6"/>
                  </svg>
                  <div>
                    <p className="svc-t-org">{t(`servicesPage.${q.org}`)}</p>
                    <p className="svc-t-role">{t(`servicesPage.${q.role}`)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <style>{`
        .svc-section { scroll-margin-top: calc(var(--site-header-min-height, 132px) + 16px); }
        .svc-section-inner { max-width: 1160px; margin: 0 auto; padding-left: clamp(20px, 4vw, 48px); padding-right: clamp(20px, 4vw, 48px); }
        .svc-section--process {
          position: relative;
          padding: clamp(52px, 7vw, 92px) 0 clamp(56px, 7vw, 96px);
          background: radial-gradient(ellipse 85% 55% at 50% 0%, rgba(192,57,43,0.14), transparent 55%), linear-gradient(180deg, #101010 0%, #070707 55%, #060606 100%);
          border-top: 1px solid rgba(231,76,60,0.22);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .svc-section--process::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent 0%, rgba(231,76,60,0.85) 22%, rgba(231,76,60,0.35) 55%, transparent 100%);
          pointer-events: none;
        }
        .svc-eyebrow-row { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
        .svc-eyebrow-mark { width: 4px; height: 28px; border-radius: 2px; background: linear-gradient(180deg, var(--red-light), var(--red)); box-shadow: 0 0 18px rgba(231,76,60,0.35); flex-shrink: 0; }
        .svc-eyebrow-text { margin: 0; font-size: 11px; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: var(--red-light); }
        .svc-section-title { margin: 0 0 clamp(28px, 4vw, 42px); font-family: var(--font-display); font-size: clamp(2rem, 3.8vw, 2.8rem); font-weight: 400; color: #fff; letter-spacing: 0.04em; line-height: 1.05; max-width: 820px; }
        .svc-section--voice { position: relative; padding: clamp(56px, 8vw, 104px) 0 clamp(72px, 11vw, 120px); background: radial-gradient(ellipse 70% 40% at 0% 30%, rgba(192,57,43,0.06), transparent 50%), var(--bg); }
        .svc-section-inner--voice { position: relative; }
        .svc-voice-rule { display: block; width: min(280px, 72vw); height: 2px; margin-bottom: clamp(26px, 4vw, 38px); border-radius: 1px; background: linear-gradient(90deg, rgba(231,76,60,0.85), rgba(231,76,60,0.15) 70%, transparent 100%); }
        .svc-process-grid { display: grid; grid-template-columns: 1fr; gap: 2px; }
        @media (min-width: 720px) { .svc-process-grid { grid-template-columns: repeat(3, 1fr); gap: 2px; } }
        .svc-process-col { position: relative; padding: clamp(28px, 4vw, 40px) clamp(22px, 3vw, 32px) clamp(28px, 4vw, 40px); background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.06); transition: background .25s ease; }
        .svc-process-col:hover { background: rgba(255,255,255,0.045); }
        @media (min-width: 720px) {
          .svc-process-col:first-child { border-radius: 16px 0 0 16px; }
          .svc-process-col:last-child { border-radius: 0 16px 16px 0; }
          .svc-process-col:not(:last-child) { border-right: none; }
        }
        @media (max-width: 719px) {
          .svc-process-col:first-child { border-radius: 16px 16px 0 0; }
          .svc-process-col:last-child { border-radius: 0 0 16px 16px; }
          .svc-process-col:not(:last-child) { border-bottom: none; }
        }
        .svc-process-icon-wrap { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
        .svc-process-icon-wrap > svg { flex-shrink: 0; color: #e74c3c; }
        .svc-process-connector { width: 40px; height: 2px; background: linear-gradient(90deg, rgba(231,76,60,0.8), rgba(231,76,60,0.15)); border-radius: 2px; margin-bottom: 16px; }
        .svc-process-step-num { font-family: var(--font-display); font-size: clamp(2.8rem, 5vw, 4rem); font-weight: 400; color: rgba(255,255,255,0.07); letter-spacing: 0.04em; line-height: 1; }
        .svc-process-heading { margin: 0 0 14px; font-family: var(--font-display); font-size: clamp(15px, 1.8vw, 18px); font-weight: 400; letter-spacing: 0.12em; text-transform: uppercase; color: #fff; }
        .svc-process-body { margin: 0; font-size: 14px; line-height: 1.72; color: var(--silver); }
        .svc-testimonial-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 20px; margin-bottom: 32px; }
        .svc-testimonial-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
        @media (min-width: 780px) { .svc-testimonial-grid { grid-template-columns: 1fr 1fr; gap: 16px; align-items: stretch; } }
        .svc-testimonial-title { margin: 0; font-family: var(--font-display); font-size: clamp(2rem, 3.8vw, 3rem); font-weight: 400; letter-spacing: 0.04em; color: #fff; max-width: min(560px, 100%); line-height: 1.05; }
        .svc-testimonial-card { position: relative; display: flex; flex-direction: column; overflow: hidden; background: linear-gradient(145deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.035) 48%, rgba(255,255,255,0.018) 100%); border: 1px solid rgba(255,255,255,0.14); border-radius: 20px; padding: clamp(24px, 3vw, 36px) clamp(22px, 3vw, 34px); min-width: 0; box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), 0 22px 55px rgba(0,0,0,0.35); backdrop-filter: blur(18px) saturate(135%); -webkit-backdrop-filter: blur(18px) saturate(135%); transition: background .25s ease, border-color .25s ease, transform .25s ease, box-shadow .25s ease; }
        .svc-testimonial-card::before { content: ''; position: absolute; inset: 0; pointer-events: none; background: radial-gradient(circle at 12% 0%, rgba(231,76,60,0.10), transparent 35%); }
        .svc-testimonial-card:hover { background: linear-gradient(145deg, rgba(255,255,255,0.11), rgba(255,255,255,0.035)); border-color: rgba(255,255,255,0.22); transform: translateY(-3px); box-shadow: inset 0 1px 0 rgba(255,255,255,0.16), 0 28px 65px rgba(0,0,0,0.42); }
        .svc-t-mark { display: block; width: 34px; height: 26px; color: rgba(231,76,60,0.55); margin-bottom: 22px; flex-shrink: 0; }
        .svc-t-quote { flex: 1; margin: 0 0 28px; font-size: clamp(14px, 1.5vw, 16px); line-height: 1.75; color: rgba(230,230,230,0.88); }
        .svc-t-footer { display: flex; align-items: center; gap: 16px; }
        .svc-t-icon { flex-shrink: 0; color: #c0392b; }
        .svc-t-org { margin: 0 0 3px; font-size: 11px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: #fff; }
        .svc-t-role { margin: 0; font-size: 12px; color: rgba(200,200,200,0.5); }
      `}</style>
    </div>
  )
}
