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
  { key: 'protection',   labelDe: 'Schutz & Bewachung',      labelEn: 'Protection & Guarding',    ids: ['securityServices','objectProtection','nightSecurity','constructionSites','patrolService'] },
  { key: 'personal',     labelDe: 'Personenschutz & Events',  labelEn: 'Personal & Event Security', ids: ['personalProtection','eventSecurity','doorman','storeDetective','receptionService'] },
  { key: 'technical',    labelDe: 'Technische Sicherheit',    labelEn: 'Technical Security',        ids: ['accessControl','cctvSurveillance','alarmResponse','fireWatch','keyHolding'] },
  { key: 'consulting',   labelDe: 'Beratung & Verkehr',       labelEn: 'Consulting & Traffic',      ids: ['securityConsulting','parkingTraffic'] },
]

/* ── Full-screen split showcase (suhail-services style) ── */
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

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      if (pausedRef.current) return
      setSvcIdx(prev => {
        const next = (prev + 1) % catServices.length
        const els = [imgRef.current, labelRef.current, teaserRef.current].filter(Boolean)
        gsap.to(els, { opacity: 0, duration: 0.15, ease: 'power2.in', onComplete: () => setSvcIdx(next) })
        return prev
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [catIdx, catServices.length])

  useEffect(() => {
    const els = [imgRef.current, labelRef.current, teaserRef.current].filter(Boolean)
    gsap.fromTo(els, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power3.out' })
  }, [catIdx, svcIdx])

  const total = catServices.length
  const pad = n => String(n).padStart(2, '0')
  const catLabel = c => lang === 'de' ? c.labelDe : c.labelEn

  return (
    <div className="svc-showcase-wrap">
      {/* Mobile top bar: counter + scroll hint */}
      <div className="svc-showcase-mobile-bar">
        <span className="svc-showcase-mobile-counter">{pad(svcIdx + 1)} / {pad(total)}</span>
        <span className="svc-showcase-mobile-hint">SWIPE FOR MORE ›</span>
      </div>

      {/* Tab nav — one tab per category */}
      <nav className="svc-showcase-tabs" aria-label="Service categories">
        {SERVICE_CATEGORIES.map((c, i) => (
          <button
            key={c.key}
            onClick={() => selectCat(i)}
            className={`svc-showcase-tab${catIdx === i ? ' svc-showcase-tab--active' : ''}`}
          >
            {catLabel(c).toUpperCase()}
          </button>
        ))}
      </nav>

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
        {/* LEFT: image of active sub-service */}
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

        {/* RIGHT: numbered list of this category's sub-services */}
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

      {/* Mobile: full list below image */}
      <ul className="svc-showcase-mobile-list">
        {catServices.map((s, i) => (
          <li
            key={s.id}
            className={`svc-showcase-mobile-list-item${svcIdx === i ? ' svc-showcase-mobile-list-item--active' : ''}`}
            onClick={() => { animateSwitch(() => setSvcIdx(i)); onOpenDetail(s.id) }}
          >
            <span className="svc-showcase-list-num">{pad(i + 1)}</span>
            <span className="svc-showcase-mobile-active-name">{s.name}</span>
            <span className="svc-showcase-list-arrow">→</span>
          </li>
        ))}
      </ul>

      <style>{`
        .svc-showcase-wrap {
          background: #0a0a0a;
        }

        /* Mobile top bar */
        .svc-showcase-mobile-bar {
          display: none;
        }
        @media (max-width: 768px) {
          .svc-showcase-mobile-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 20px;
            background: #0a0a0a;
          }
          .svc-showcase-mobile-counter {
            font-family: var(--font-display);
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.1em;
            color: rgba(255,255,255,0.4);
          }
          .svc-showcase-mobile-hint {
            font-family: var(--font-display);
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.1em;
            color: rgba(255,255,255,0.3);
          }
        }

        /* Tabs */
        .svc-showcase-tabs {
          display: flex;
          overflow-x: auto;
          scrollbar-width: none;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          background: #0a0a0a;
          padding: 0;
          gap: 0;
        }
        .svc-showcase-tabs::-webkit-scrollbar { display: none; }

        .svc-showcase-tab {
          flex: 1;
          padding: 18px 12px;
          font-family: var(--font-display);
          font-size: clamp(10px, 1.1vw, 12px);
          font-weight: 700;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.35);
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          white-space: nowrap;
          transition: color 0.2s ease, border-color 0.2s ease;
          margin-bottom: -1px;
        }
        .svc-showcase-tab:hover { color: rgba(255,255,255,0.7); }
        .svc-showcase-tab--active {
          color: #fff;
          border-bottom-color: var(--red-light);
        }

        /* Split */
        .svc-showcase-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: clamp(340px, 42vw, 520px);
        }
        @media (max-width: 768px) {
          .svc-showcase-split {
            grid-template-columns: 1fr;
            height: auto;
          }
          .svc-showcase-list-wrap {
            display: none !important;
          }
          .svc-showcase-img-wrap {
            min-height: 360px;
          }
        }

        /* Left image */
        .svc-showcase-img-wrap {
          position: relative;
          overflow: hidden;
          background: #111;
        }
        .svc-showcase-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .svc-showcase-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.05) 100%);
        }
        .svc-showcase-img-bottom {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: clamp(20px, 3vw, 36px);
        }
        .svc-showcase-img-tag {
          display: inline-block;
          padding: 5px 12px;
          background: var(--red);
          color: #fff;
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
          border-radius: 4px;
          margin-bottom: 10px;
        }
        .svc-showcase-img-title {
          font-family: var(--font-display);
          font-size: clamp(22px, 3.5vw, 44px);
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.02em;
          line-height: 1.05;
          margin: 0 0 16px;
        }
        .svc-showcase-img-teaser {
          font-size: clamp(12px, 1.3vw, 14px);
          color: rgba(255,255,255,0.65);
          line-height: 1.55;
          margin: 0 0 14px;
          max-width: 400px;
        }
        .svc-showcase-img-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(255,255,255,0.2);
          padding-top: 12px;
        }
        .svc-showcase-img-counter {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.55);
        }
        .svc-showcase-img-explore {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: var(--red-light);
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          transition: opacity 0.15s ease;
        }
        .svc-showcase-img-explore:hover { opacity: 0.75; }

        /* Right list (desktop only) */
        .svc-showcase-list-wrap {
          background: #111111;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(192,57,43,0.3) transparent;
          border-left: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
        }
        .svc-showcase-list-wrap::-webkit-scrollbar { width: 3px; }
        .svc-showcase-list-wrap::-webkit-scrollbar-thumb { background: rgba(192,57,43,0.3); }
        .svc-showcase-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .svc-showcase-list-item {
          display: flex;
          align-items: center;
          gap: 14px;
          flex: 1;
          padding: 0 clamp(20px, 3vw, 36px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          cursor: pointer;
          transition: background 0.18s ease;
        }
        .svc-showcase-list-item:hover {
          background: rgba(192,57,43,0.08);
        }
        .svc-showcase-list-item--active {
          background: rgba(192,57,43,0.14);
        }
        .svc-showcase-list-num {
          font-family: var(--font-display);
          font-size: clamp(16px, 1.8vw, 20px);
          font-weight: 900;
          color: rgba(192,57,43,0.35);
          letter-spacing: -0.02em;
          min-width: 36px;
          flex-shrink: 0;
          transition: color 0.18s ease;
        }
        .svc-showcase-list-item--active .svc-showcase-list-num {
          color: var(--red-light);
        }
        .svc-showcase-list-name {
          flex: 1;
          font-family: var(--font-display);
          font-size: clamp(12px, 1.2vw, 14px);
          font-weight: 700;
          letter-spacing: 0.01em;
          color: rgba(255,255,255,0.45);
          transition: color 0.18s ease;
        }
        .svc-showcase-list-item:hover .svc-showcase-list-name,
        .svc-showcase-list-item--active .svc-showcase-list-name {
          color: #fff;
        }
        .svc-showcase-list-arrow {
          font-size: 14px;
          color: rgba(255,255,255,0.15);
          transition: color 0.18s ease, transform 0.18s ease;
          display: inline-block;
        }
        .svc-showcase-list-item:hover .svc-showcase-list-arrow,
        .svc-showcase-list-item--active .svc-showcase-list-arrow {
          color: var(--red-light);
          transform: translateX(4px);
        }

        /* Mobile list below image */
        .svc-showcase-mobile-list {
          display: none;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        @media (max-width: 768px) {
          .svc-showcase-mobile-list {
            display: flex;
            flex-direction: column;
            background: #111;
          }
          .svc-showcase-mobile-list-item {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 16px 20px;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            cursor: pointer;
            transition: background 0.15s ease;
          }
          .svc-showcase-mobile-list-item--active {
            background: rgba(192,57,43,0.14);
            border-left: 3px solid var(--red-light);
          }
          .svc-showcase-mobile-list-item--active .svc-showcase-list-num {
            color: var(--red-light);
          }
          .svc-showcase-mobile-list-item--active .svc-showcase-list-arrow {
            color: var(--red-light);
          }
          .svc-showcase-mobile-active-name {
            flex: 1;
            font-family: var(--font-display);
            font-size: 14px;
            font-weight: 700;
            color: #fff;
            letter-spacing: 0.01em;
          }
        }
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
              { num: 'process1Num', title: 'process1Title', body: 'process1Body' },
              { num: 'process2Num', title: 'process2Title', body: 'process2Body' },
              { num: 'process3Num', title: 'process3Title', body: 'process3Body' },
            ].map((step) => (
              <div key={step.title} className="svc-process-col">
                <p className="svc-process-num">{t(`servicesPage.${step.num}`)}<span className="svc-process-dot">.</span></p>
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
                <p className="svc-t-org">{t(`servicesPage.${q.org}`)}</p>
                <p className="svc-t-quote">&ldquo;{t(`servicesPage.${q.quote}`)}&rdquo;</p>
                <p className="svc-t-role">{t(`servicesPage.${q.role}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: '#000', padding: 'clamp(64px, 10vw, 100px) clamp(20px, 5vw, 40px)', display: 'flex', flexDirection: 'column', gap: 36, borderTop: '1px solid rgba(231,76,60,0.2)' }}>
        <RevealBlock>
          <p style={{ fontSize: 'clamp(32px, 5.5vw, 82px)', fontWeight: 300, fontFamily: 'var(--font-display)', color: '#fff', letterSpacing: '-0.035em', lineHeight: 1.05, maxWidth: 800 }}>
            {lang === 'de' ? <>Sichern Sie Ihr<br />Unternehmen.</> : <>Protect your<br />business.</>}
          </p>
        </RevealBlock>
        <RevealBlock delay={0.1}>
          <Link to="/contact" className="btn-glass-red">
            {lang === 'de' ? 'Jetzt anfragen' : 'Get in touch'}
          </Link>
        </RevealBlock>
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
        .svc-section-title { margin: 0 0 clamp(28px, 4vw, 42px); font-family: var(--font-display); font-size: clamp(1.55rem, 3.2vw, 2.15rem); font-weight: 800; color: #fff; letter-spacing: -0.02em; line-height: 1.12; max-width: 820px; }
        .svc-section--voice { position: relative; padding: clamp(56px, 8vw, 104px) 0 clamp(72px, 11vw, 120px); background: radial-gradient(ellipse 70% 40% at 0% 30%, rgba(192,57,43,0.06), transparent 50%), var(--bg); }
        .svc-section-inner--voice { position: relative; }
        .svc-voice-rule { display: block; width: min(280px, 72vw); height: 2px; margin-bottom: clamp(26px, 4vw, 38px); border-radius: 1px; background: linear-gradient(90deg, rgba(231,76,60,0.85), rgba(231,76,60,0.15) 70%, transparent 100%); }
        .svc-process-grid { display: grid; grid-template-columns: 1fr; gap: clamp(20px, 3vw, 28px); align-items: stretch; }
        @media (min-width: 720px) { .svc-process-grid { grid-template-columns: repeat(3, 1fr); gap: clamp(18px, 2.5vw, 24px); } }
        .svc-process-col { position: relative; height: 100%; padding: clamp(22px, 3vw, 28px) clamp(18px, 2.5vw, 22px); border-radius: 14px; border: 1px solid rgba(255,255,255,0.09); border-left: 3px solid rgba(231,76,60,0.55); background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 42%), rgba(8,8,8,0.72); box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 18px 44px rgba(0,0,0,0.42); }
        .svc-process-num { margin: 0 0 10px; font-family: var(--font-display); font-size: clamp(2.25rem, 4vw, 3rem); font-weight: 900; letter-spacing: -0.03em; color: rgba(255,255,255,0.12); line-height: 1; }
        .svc-process-dot { color: var(--red-light); margin-left: 2px; }
        .svc-process-heading { margin: 0 0 12px; font-family: var(--font-display); font-size: 18px; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: #fff; }
        .svc-process-body { margin: 0; font-size: 14px; line-height: 1.65; color: var(--silver); }
        .svc-testimonial-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 20px; margin-bottom: 22px; }
        .svc-testimonial-grid { display: grid; grid-template-columns: 1fr; gap: 18px; }
        @media (min-width: 780px) { .svc-testimonial-grid { grid-template-columns: 1fr 1fr; gap: 22px; align-items: stretch; } }
        .svc-testimonial-title { margin: 0; font-family: var(--font-display); font-size: clamp(1.75rem, 3.5vw, 2.5rem); font-weight: 900; letter-spacing: -0.02em; color: #fff; max-width: min(560px, 100%); line-height: 1.1; }
        .svc-testimonial-card { position: relative; height: 100%; background: linear-gradient(165deg, rgba(255,255,255,0.045) 0%, transparent 45%), var(--bg-card); border: 1px solid rgba(255,255,255,0.1); border-top: 2px solid rgba(231,76,60,0.5); border-radius: 14px; padding: clamp(22px, 3vw, 28px) clamp(22px, 3vw, 32px); box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 14px 48px rgba(0,0,0,0.4); min-width: 0; }
        .svc-t-org { margin: 0 0 14px; font-size: 11px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; color: var(--red-light); }
        .svc-t-quote { margin: 0 0 14px; font-size: 15px; line-height: 1.65; color: var(--silver-lt); }
        .svc-t-role { margin: 0; font-size: 12px; color: var(--muted); }
      `}</style>
    </div>
  )
}
