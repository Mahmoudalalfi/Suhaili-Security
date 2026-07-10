import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

function MobileServicesAccordion({ servicesList, lang, onOpenDetail, category }) {
  const [openId, setOpenId] = useState(null)
  const expandedItemRef = useRef(null)
  const toggleService = id => setOpenId(current => current === id ? null : id)

  useEffect(() => {
    if (!openId) return

    const closeWhenOutside = (event) => {
      if (expandedItemRef.current && !expandedItemRef.current.contains(event.target)) {
        setOpenId(null)
      }
    }

    document.addEventListener('pointerdown', closeWhenOutside, true)
    return () => document.removeEventListener('pointerdown', closeWhenOutside, true)
  }, [openId])

  const services = category.ids
    .map(id => servicesList.find(service => service.id === id))
    .filter(Boolean)

  return (
    <div className="svc-mobile-accordion">
      <section className="svc-mobile-category">
        <div className="svc-mobile-accordion-list">
              {services.map((service) => {
                const expanded = openId === service.id
                return (
                  <div
                    key={service.id}
                    ref={expanded ? expandedItemRef : null}
                    className={`svc-mobile-accordion-item${expanded ? ' is-expanded' : ''}`}
                  >
                    <button
                      type="button"
                      className="svc-mobile-accordion-summary"
                      aria-expanded={expanded}
                      aria-controls={`mobile-service-${service.id}`}
                      onClick={() => toggleService(service.id)}
                    >
                      <span className="svc-mobile-accordion-name">{service.name}</span>
                      <span className="svc-mobile-accordion-toggle" aria-hidden>
                        <svg viewBox="0 0 20 20" width="15" height="15" fill="none">
                          <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>

                    <button
                      type="button"
                      id={`mobile-service-${service.id}`}
                      className="svc-mobile-accordion-panel"
                      aria-hidden={!expanded}
                      tabIndex={expanded ? 0 : -1}
                      onClick={() => onOpenDetail(service.id)}
                    >
                      <span className="svc-mobile-accordion-media">
                        <img src={service.img} alt="" loading="lazy" />
                        <span className="svc-mobile-accordion-shade" />
                      </span>
                      <span className="svc-mobile-accordion-copy">{service.teaser}</span>
                      <span className="svc-mobile-accordion-action">
                        {lang === 'de' ? 'Servicedetails ansehen' : 'View service details'}
                        <svg viewBox="0 0 20 20" width="17" height="17" fill="none" aria-hidden>
                          <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                  </div>
                )
              })}
        </div>
      </section>
    </div>
  )
}

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
              onClick={(event) => {
                selectCat(i)
                event.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
              }}
              className={`svc-showcase-tab${catIdx === i ? ' svc-showcase-tab--active' : ''}`}
            >
              <span className="svc-tab-label-long">{catLabel(c).toUpperCase()}</span>
              <span className="svc-tab-label-short">{catShort(c).toUpperCase()}</span>
              <span className="svc-tab-count">{pad(c.ids.length)}</span>
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

      <MobileServicesAccordion key={currentCat.key} category={currentCat} servicesList={servicesList} lang={lang} onOpenDetail={onOpenDetail} />

      <style>{`
        .svc-showcase-wrap { background: #0a0a0a; }

        /* ── Tabs ── */
        .svc-showcase-tabs-wrap {
          display: flex;
          align-items: stretch;
          background: #0a0a0a;
          border-bottom: 0;
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
        .svc-tab-count { display: none; }
        .svc-tab-label-short { display: none; }
        .svc-tab-label-long { display: inline; }
        @media (max-width: 768px) {
          .svc-showcase-tabs-wrap {
            padding: 0;
            border-bottom: 0;
            background: #0a0a0a;
            box-shadow: inset 0 -1px 0 rgba(255,255,255,0.07);
          }
          .svc-tab-arrow { display: none !important; }
          .svc-showcase-tabs {
            gap: 24px;
            padding: 0 18px 0 0;
            scroll-padding-inline: 22px;
            scroll-snap-type: x mandatory;
            overscroll-behavior-x: contain;
          }
          .svc-showcase-tab:first-child { margin-left: 22px; }
          .svc-showcase-tab {
            flex: 0 0 auto;
            min-width: max-content;
            min-height: 54px;
            padding: 0;
            display: flex;
            align-items: center;
            gap: 8px;
            border: 0;
            border-radius: 0;
            background: transparent;
            margin-bottom: 0;
            color: rgba(255,255,255,0.55);
            text-align: left;
            white-space: nowrap;
            scroll-snap-align: start;
          }
          .svc-tab-count { display: none; }
          .svc-tab-label-long {
            display: block;
            font-size: 15px;
            font-weight: 500;
            letter-spacing: 0.06em;
            line-height: 1;
          }
          .svc-tab-label-short { display: none; }
          .svc-showcase-tab--active .svc-tab-label-long {
            color: #fff;
          }
          .svc-showcase-tab--active {
            background: transparent;
            color: #fff;
            border-bottom-color: var(--red-light);
            box-shadow: inset 0 -2px 0 var(--red-light);
          }
          /* On mobile hide the desktop split hero — show the accordion below the tabs. */
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

        /* Mobile category accordion */
        .svc-mobile-accordion { display: none; }
        @media (max-width: 768px) {
          .svc-mobile-accordion {
            display: block;
            padding: 4px 20px 28px;
            background: #080808;
          }
          .svc-mobile-category { padding: 8px 0 5px; }
          .svc-mobile-category + .svc-mobile-category {
            border-top: 1px solid rgba(255,255,255,0.08);
            margin-top: 20px;
          }
          .svc-mobile-category-heading {
            display: grid;
            grid-template-columns: 30px minmax(0, 1fr) auto;
            align-items: end;
            gap: 10px;
            margin-bottom: 12px;
          }
          .svc-mobile-category-heading h2 {
            margin: 0;
            color: #fff;
            font-family: var(--font-display);
            font-size: clamp(22px, 7vw, 29px);
            font-weight: 600;
            letter-spacing: 0.01em;
            line-height: 0.95;
            text-transform: uppercase;
          }
          .svc-mobile-category-index,
          .svc-mobile-category-count {
            font-family: var(--font-display);
            font-size: 12px;
            letter-spacing: 0.13em;
          }
          .svc-mobile-category-index { color: var(--red-light); }
          .svc-mobile-category-count { color: rgba(255,255,255,0.28); }
          .svc-mobile-accordion-list {
            display: grid;
            gap: 0;
            border-top: 0;
          }
          .svc-mobile-accordion-item {
            display: block;
            width: 100%;
            padding: 0;
            overflow: hidden;
            border: 0;
            border-bottom: 0;
            border-radius: 0;
            background: transparent;
            color: #fff;
            text-align: left;
            -webkit-tap-highlight-color: transparent;
          }
          .svc-mobile-accordion-summary {
            display: grid;
            grid-template-columns: minmax(0, 1fr) 22px;
            align-items: center;
            gap: 10px;
            width: 100%;
            min-height: 54px;
            padding: 8px 0;
            border: 0;
            background: transparent;
            color: inherit;
            text-align: left;
          }
          .svc-mobile-accordion-name {
            color: rgba(255,255,255,0.78);
            font-family: var(--font-display);
            font-size: clamp(16px, 4.5vw, 18px);
            font-weight: 500;
            letter-spacing: 0.025em;
            line-height: 1.08;
            transition: color 0.25s ease;
          }
          .svc-mobile-accordion-toggle {
            display: grid;
            place-items: center;
            width: 22px;
            height: 22px;
            border: 0;
            border-radius: 0;
            color: rgba(255,255,255,0.62);
            transition: color 0.25s ease, border-color 0.25s ease, background 0.25s ease, transform 0.3s cubic-bezier(0.2, 0.75, 0.2, 1);
          }
          .svc-mobile-accordion-panel {
            display: grid;
            grid-template-rows: 0fr;
            width: 100%;
            padding: 0;
            border: 0;
            background: transparent;
            color: inherit;
            text-align: left;
            opacity: 0;
            visibility: hidden;
            transition: grid-template-rows 0.42s cubic-bezier(0.2, 0.75, 0.2, 1), opacity 0.28s ease, visibility 0.42s;
          }
          .svc-mobile-accordion-panel > * { min-height: 0; }
          .svc-mobile-accordion-media,
          .svc-mobile-accordion-copy,
          .svc-mobile-accordion-action { overflow: hidden; }
          .svc-mobile-accordion-media {
            position: relative;
            display: block;
            height: 0;
            border-radius: 6px;
            transition: height 0.42s cubic-bezier(0.2, 0.75, 0.2, 1);
          }
          .svc-mobile-accordion-media img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .svc-mobile-accordion-shade {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.42), transparent 60%);
          }
          .svc-mobile-accordion-copy {
            display: block;
            max-height: 0;
            color: rgba(232,232,232,0.67);
            font-family: var(--font-body);
            font-size: 13px;
            line-height: 1.55;
            transition: max-height 0.42s cubic-bezier(0.2, 0.75, 0.2, 1), padding 0.3s ease;
          }
          .svc-mobile-accordion-action {
            display: flex;
            align-items: center;
            justify-content: space-between;
            max-height: 0;
            color: var(--red-light);
            font-family: var(--font-body);
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.02em;
            transition: max-height 0.3s ease, padding 0.3s ease;
          }
          .svc-mobile-accordion-item.is-expanded {
            padding: 0 0 15px;
            border-bottom-color: transparent;
            border-radius: 0;
            background: transparent;
          }
          .svc-mobile-accordion-item.is-expanded .svc-mobile-accordion-name { color: #fff; }
          .svc-mobile-accordion-item.is-expanded .svc-mobile-accordion-toggle {
            color: #fff;
            border-color: transparent;
            background: transparent;
            transform: rotate(180deg);
          }
          .svc-mobile-accordion-item.is-expanded .svc-mobile-accordion-panel {
            grid-template-rows: 1fr;
            opacity: 1;
            visibility: visible;
          }
          .svc-mobile-accordion-item.is-expanded .svc-mobile-accordion-media { height: clamp(165px, 48vw, 210px); }
          .svc-mobile-accordion-item.is-expanded .svc-mobile-accordion-copy {
            max-height: 120px;
            padding-top: 13px;
          }
          .svc-mobile-accordion-item.is-expanded .svc-mobile-accordion-action {
            max-height: 42px;
            padding-top: 11px;
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
            <p className="svc-eyebrow-text">{t('servicesPage.processEyebrow')}</p>
          </div>
          <h2 id="svc-process-heading" className="svc-section-title">{t('servicesPage.processTitle')}</h2>
          <div className="svc-process-grid">
            {[
              { title: 'process1Title', body: 'process1Body' },
              { title: 'process2Title', body: 'process2Body' },
              { title: 'process3Title', body: 'process3Body' },
            ].map((step, i) => (
              <div key={step.title} className="svc-process-col">
                <p className="svc-process-step-label">
                  {lang === 'de' ? 'Schritt' : 'Step'} {String(i + 1).padStart(2, '0')}
                </p>
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
          background: #080808;
          border: 0;
        }
        .svc-eyebrow-row { margin-bottom: 14px; }
        .svc-eyebrow-text { margin: 0; font-size: 11px; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: var(--red-light); }
        .svc-section-title { margin: 0 0 clamp(28px, 4vw, 42px); font-family: var(--font-display); font-size: clamp(2rem, 3.8vw, 2.8rem); font-weight: 400; color: #fff; letter-spacing: 0.04em; line-height: 1.05; max-width: 820px; }
        .svc-section--voice { position: relative; padding: clamp(56px, 8vw, 104px) 0 clamp(72px, 11vw, 120px); background: radial-gradient(ellipse 70% 40% at 0% 30%, rgba(192,57,43,0.06), transparent 50%), var(--bg); }
        .svc-section-inner--voice { position: relative; }
        .svc-voice-rule { display: block; width: min(280px, 72vw); height: 2px; margin-bottom: clamp(26px, 4vw, 38px); border-radius: 1px; background: linear-gradient(90deg, rgba(231,76,60,0.85), rgba(231,76,60,0.15) 70%, transparent 100%); }
        .svc-process-grid { display: grid; grid-template-columns: 1fr; gap: clamp(34px, 8vw, 54px); }
        @media (min-width: 720px) {
          .svc-process-grid { grid-template-columns: repeat(3, 1fr); gap: clamp(34px, 5vw, 72px); }
        }
        .svc-process-col { padding: 0; background: none; border: 0; }
        .svc-process-step-label {
          margin: 0 0 10px;
          color: rgba(231,76,60,0.8);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .svc-process-heading {
          margin: 0 0 12px;
          color: #fff;
          font-family: var(--font-display);
          font-size: clamp(22px, 2.3vw, 28px);
          font-weight: 600;
          letter-spacing: 0.01em;
          line-height: 1.05;
          text-transform: none;
        }
        .svc-process-body { margin: 0; max-width: 34em; font-size: 14px; line-height: 1.7; color: rgba(210,210,210,0.72); }
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
