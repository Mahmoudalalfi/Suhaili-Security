import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const RED = 'var(--red-light)'
const MUTED = 'rgba(200,200,200,0.55)'

function useScrollReveal(ref, opts = {}) {
  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(ref.current,
      { opacity: 0, y: opts.y ?? 26 },
      { opacity: 1, y: 0, duration: opts.duration ?? 0.72, ease: 'power3.out', delay: opts.delay ?? 0,
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true } }
    )
  }, [])
}

function RevealBlock({ children, y = 26, delay = 0, style = {} }) {
  const ref = useRef(null)
  useScrollReveal(ref, { y, delay })
  return <div ref={ref} style={{ opacity: 0, ...style }}>{children}</div>
}

function RingBulletParagraph({ children, index, isLast }) {
  return (
    <RevealBlock delay={index * 0.04}>
      <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', paddingBottom: 'clamp(18px, 2.5vw, 26px)', marginBottom: 4, borderBottom: isLast ? 'none' : '1px solid var(--border-lt)' }}>
        <span style={{ flexShrink: 0, width: 14, height: 14, border: `2px solid ${RED}`, borderRadius: '50%', marginTop: 4, display: 'inline-block' }} aria-hidden />
        <p style={{ flex: 1, fontSize: 'clamp(14px, 1.55vw, 16px)', color: MUTED, lineHeight: 1.78, margin: 0 }}>{children}</p>
      </div>
    </RevealBlock>
  )
}

function GraphicSocial() {
  return (
    <svg width={220} height={160} viewBox="0 0 220 160" aria-hidden>
      <ellipse cx="110" cy="148" rx="90" ry="8" fill="rgba(192,57,43,0.08)" />
      {/* Person left */}
      <circle cx="58" cy="46" r="11" fill="#c0392b" opacity="0.7" />
      <path d="M40 100 Q58 82 76 100" fill="#c0392b" opacity="0.5" />
      <line x1="58" y1="100" x2="58" y2="135" stroke="#c0392b" strokeWidth="4" strokeLinecap="round" />
      <line x1="58" y1="108" x2="44" y2="122" stroke="#c0392b" strokeWidth="3" strokeLinecap="round" />
      <line x1="58" y1="108" x2="72" y2="118" stroke="#c0392b" strokeWidth="3" strokeLinecap="round" />
      {/* Person center */}
      <circle cx="110" cy="44" r="13" fill="#e74c3c" />
      <path d="M90 96 Q110 76 130 96" fill="#e74c3c" opacity="0.9" />
      <line x1="110" y1="96" x2="110" y2="135" stroke="#e74c3c" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="110" y1="106" x2="93" y2="118" stroke="#e74c3c" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="110" y1="106" x2="127" y2="118" stroke="#e74c3c" strokeWidth="3.5" strokeLinecap="round" />
      {/* Person right */}
      <circle cx="162" cy="46" r="11" fill="#c0392b" opacity="0.7" />
      <path d="M144 100 Q162 82 180 100" fill="#c0392b" opacity="0.5" />
      <line x1="162" y1="100" x2="162" y2="135" stroke="#c0392b" strokeWidth="4" strokeLinecap="round" />
      <line x1="162" y1="108" x2="148" y2="118" stroke="#c0392b" strokeWidth="3" strokeLinecap="round" />
      <line x1="162" y1="108" x2="176" y2="122" stroke="#c0392b" strokeWidth="3" strokeLinecap="round" />
      {/* Connecting arcs */}
      <path d="M72 118 Q91 126 93 118" fill="none" stroke="#e74c3c" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M127 118 Q146 126 148 118" fill="none" stroke="#e74c3c" strokeWidth="2.5" strokeLinecap="round" />
      {/* Heart */}
      <path d="M104 22 C104 18 110 14 110 20 C110 14 116 18 116 22 C116 27 110 32 110 32 C110 32 104 27 104 22Z" fill="#e74c3c" opacity="0.9" />
    </svg>
  )
}

function GraphicShield() {
  return (
    <svg width={200} height={160} viewBox="0 0 200 160" aria-hidden>
      <path d="M100 18 L162 42 L162 88 C162 118 100 148 100 148 C100 148 38 118 38 88 L38 42 Z" fill="rgba(192,57,43,0.12)" />
      <path d="M100 26 L154 46 L154 88 C154 114 100 140 100 140 C100 140 46 114 46 88 L46 46 Z" fill="rgba(192,57,43,0.18)" />
      <path d="M100 36 L146 52 L146 88 C146 110 100 132 100 132 C100 132 54 110 54 88 L54 52 Z" fill="#c0392b" />
      <path d="M74 88 L92 106 L126 70" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="152" cy="32" r="5" fill="#e74c3c" />
      <circle cx="48" cy="28" r="3.5" fill="#e74c3c" opacity="0.6" />
    </svg>
  )
}

function GraphicDoor() {
  return (
    <svg width={200} height={160} viewBox="0 0 200 160" aria-hidden>
      <ellipse cx="100" cy="148" rx="80" ry="7" fill="rgba(192,57,43,0.08)" />
      <rect x="60" y="30" width="80" height="110" rx="6" fill="rgba(192,57,43,0.1)" stroke="#c0392b" strokeWidth="2.5" opacity="0.5" />
      <path d="M68 38 L68 132 Q68 136 72 136 L116 124 L116 46 Z" fill="rgba(40,10,10,0.6)" stroke="#c0392b" strokeWidth="2" />
      <line x1="78" y1="55" x2="78" y2="115" stroke="rgba(192,57,43,0.3)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="110" cy="88" r="5" fill="#e74c3c" />
      <path d="M130 140 Q155 110 168 80" fill="none" stroke="#e74c3c" strokeWidth="3" strokeDasharray="5 4" strokeLinecap="round" />
      <circle cx="168" cy="78" r="6" fill="#e74c3c" />
      <path d="M165 75 L168 72 L171 75" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function GraphicHealth() {
  return (
    <svg width={220} height={140} viewBox="0 0 220 140" aria-hidden>
      <circle cx="110" cy="70" r="52" fill="rgba(192,57,43,0.12)" />
      <rect x="96" y="38" width="28" height="64" rx="6" fill="#c0392b" />
      <rect x="74" y="58" width="72" height="24" rx="6" fill="#c0392b" />
      <path d="M46 70 L68 70 L76 52 L86 88 L96 70 L124 70 L134 52 L144 88 L154 70 L174 70" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      <circle cx="174" cy="70" r="5" fill="#e74c3c" />
      <circle cx="46" cy="70" r="4" fill="#e74c3c" opacity="0.6" />
    </svg>
  )
}

function SplitSpotlight({ graphic, title, body }) {
  return (
    <RevealBlock>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          {graphic}
        </div>
        <div style={{ minWidth: 0 }}>
          <h3 style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700, color: RED, letterSpacing: '-0.02em', margin: '0 0 10px' }}>
            {title}
          </h3>
          <p style={{ fontSize: 'clamp(13px, 1.4vw, 15px)', color: MUTED, lineHeight: 1.75, margin: 0 }}>
            {body}
          </p>
        </div>
      </div>
    </RevealBlock>
  )
}

export default function CsrEsgPage() {
  const { t } = useLanguage()
  const headRef = useRef(null)
  const heroClipRef = useRef(null)
  const heroParallaxRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(headRef.current, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', delay: 0.04 })
  }, [])

  useEffect(() => {
    const inner = heroParallaxRef.current, outer = heroClipRef.current
    if (!inner || !outer) return
    const ctx = gsap.context(() => {
      gsap.to(inner, { yPercent: -5, ease: 'none', scrollTrigger: { trigger: outer, start: 'top bottom', end: 'bottom top', scrub: 1.2 } })
    }, outer)
    return () => ctx.revert()
  }, [])

  const economicBullets = Array.isArray(t('csrPage.economicBullets')) ? t('csrPage.economicBullets') : []
  const ecologicalBullets = Array.isArray(t('csrPage.ecologicalBullets')) ? t('csrPage.ecologicalBullets') : []
  const heroImg = t('csrPage.heroImage') || 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490363/suhail-services/csr-hero-forest.png'
  const ecoImg = t('csrPage.ecologicalImage') || 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490351/suhail-services/csr-ecological-photo.png'
  const contactLabel = t('csrPage.reportLinkContactLabel')
  const contactHref = t('csrPage.reportLinkContactHref')

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--silver-lt)' }}>

      <section style={{ padding: 'clamp(100px, 14vw, 160px) clamp(20px, 5vw, 40px) clamp(48px, 8vw, 80px)', background: 'var(--bg)', borderBottom: '1px solid var(--border-lt)' }}>
        <div ref={headRef} style={{ opacity: 0, maxWidth: 1180, margin: '0 auto' }}>
          <Link to="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: MUTED, textDecoration: 'none', letterSpacing: '0.02em', marginBottom: 28 }}
            onMouseEnter={e => { e.currentTarget.style.color = RED }}
            onMouseLeave={e => { e.currentTarget.style.color = MUTED }}
          >
            ← {t('common.backTo')} {t('nav.about')}
          </Link>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: RED, marginBottom: 20 }}>{t('csrPage.eyebrowMuted')}</p>
          <h1 style={{ fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#fff', lineHeight: 1.0, margin: '0 0 24px' }}>{t('csrPage.title')}</h1>
        </div>
      </section>

      <section style={{ padding: 'clamp(56px, 9vw, 72px) clamp(24px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gap: 'clamp(36px, 6vw, 64px)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', alignItems: 'center' }}>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 'clamp(15px, 1.65vw, 17px)', color: MUTED, lineHeight: 1.82, margin: '0 0 18px' }}>{t('csrPage.introP1')}</p>
            <p style={{ fontSize: 'clamp(15px, 1.65vw, 17px)', color: MUTED, lineHeight: 1.82, margin: 0 }}>{t('csrPage.introP2')}</p>
          </div>
          <div ref={heroClipRef} style={{ position: 'relative', overflow: 'hidden', borderRadius: 8, maxWidth: 520, width: '100%', margin: '0 auto', aspectRatio: '1 / 1', boxShadow: '0 24px 60px rgba(0,0,0,0.5)', background: '#0a1a0a' }}>
            <div ref={heroParallaxRef} style={{ position: 'absolute', left: 0, width: '100%', height: '118%', top: '-9%', willChange: 'transform' }}>
              <img src={heroImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg-2)', padding: 'clamp(28px, 5vw, 48px) clamp(22px, 5vw, 40px) clamp(56px, 9vw, 88px)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <RevealBlock y={18}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 clamp(24px, 4vw, 36px)' }}>{t('csrPage.economicHeading')}</h2>
          </RevealBlock>
          {economicBullets.map((text, i) => <RingBulletParagraph key={i} index={i} isLast={i === economicBullets.length - 1}>{text}</RingBulletParagraph>)}
        </div>
      </section>

      <section style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #141414 50%, #0f0f0f 100%)', borderTop: '1px solid rgba(192,57,43,0.22)', padding: 'clamp(44px, 8vw, 72px) clamp(22px, 5vw, 40px)' }}>
        <RevealBlock>
          <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(20px, 2.8vw, 28px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 16px', lineHeight: 1.25 }}>{t('csrPage.reportTitle')}</h2>
            <p style={{ fontSize: 'clamp(14px, 1.55vw, 16px)', color: MUTED, lineHeight: 1.75, margin: '0 0 22px' }}>{t('csrPage.reportBody')}</p>
            {contactLabel && contactHref && (
              <Link to={contactHref} style={{ color: RED, fontWeight: 500, fontSize: 15, textDecoration: 'underline', textUnderlineOffset: 4 }}>{contactLabel}</Link>
            )}
          </div>
        </RevealBlock>
      </section>

      <section style={{ background: 'var(--bg)', padding: 'clamp(52px, 9vw, 96px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <RevealBlock>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 14px' }}>{t('csrPage.ecologicalHeading')}</h2>
            <p style={{ fontSize: 'clamp(14px, 1.55vw, 16px)', color: MUTED, lineHeight: 1.78, margin: '0 0 clamp(22px, 3vw, 32px)', maxWidth: 720 }}>{t('csrPage.ecologicalIntro')}</p>
          </RevealBlock>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(28px, 5vw, 48px)', alignItems: 'start' }}>
            <div>
              {ecologicalBullets.map((text, i) => <RingBulletParagraph key={i} index={i} isLast={i === ecologicalBullets.length - 1}>{text}</RingBulletParagraph>)}
            </div>
            <RevealBlock delay={0.06} style={{ width: '100%', maxWidth: 440, justifySelf: 'center', alignSelf: 'start' }}>
              <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 8, width: '100%', aspectRatio: '1 / 1', margin: '0 auto', boxShadow: '0 18px 48px rgba(0,0,0,0.4)', background: '#1a2a1a' }}>
                <img src={ecoImg} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg)', padding: 'clamp(48px, 8vw, 88px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>
          <RevealBlock>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <GraphicSocial />
              </div>
              <div style={{ minWidth: 0 }}>
                <h2 style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.025em', margin: '0 0 10px' }}>{t('csrPage.socialHeading')}</h2>
                <p style={{ fontSize: 'clamp(13px, 1.4vw, 15px)', color: MUTED, lineHeight: 1.75, margin: 0 }}>{t('csrPage.socialBody')}</p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      <section style={{ background: 'var(--bg)', padding: 'clamp(40px, 7vw, 72px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(48px, 8vw, 72px)' }}>
          <SplitSpotlight graphic={<GraphicShield />} title={t('csrPage.muTigerSpotlightTitle')} body={t('csrPage.muTigerSpotlightBody')} />
          <SplitSpotlight graphic={<GraphicDoor />} title={t('csrPage.joblingeSpotlightTitle')} body={t('csrPage.joblingeSpotlightBody')} />
          <SplitSpotlight graphic={<GraphicHealth />} title={t('csrPage.essenMedicineSpotlightTitle')} body={t('csrPage.essenMedicineSpotlightBody')} />
        </div>
      </section>

      <section style={{ background: 'var(--bg-2)', padding: 'clamp(44px, 8vw, 88px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <RevealBlock>
            <p style={{ fontSize: 'clamp(14px, 1.55vw, 16px)', color: MUTED, lineHeight: 1.78, margin: '0 0 22px' }}>{t('csrPage.closing')}</p>
            <Link to="/contact" className="btn-glass-red" style={{ textDecoration: 'none' }}>
              {t('nav.contact')}
            </Link>
          </RevealBlock>
        </div>
      </section>
    </div>
  )
}
