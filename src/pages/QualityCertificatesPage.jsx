import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'
import CertBadge from '../components/ui/CertBadge'

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

function BulletRing({ style = {} }) {
  return <span style={{ flexShrink: 0, width: 14, height: 14, border: `2px solid ${RED}`, borderRadius: '50%', marginTop: 5, display: 'inline-block', ...style }} aria-hidden />
}

function PillarBulletRow({ title, body, index, isLast }) {
  return (
    <RevealBlock delay={index * 0.05}>
      <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', paddingBottom: 'clamp(22px, 3vw, 32px)', marginBottom: 6, borderBottom: isLast ? 'none' : '1px solid var(--border-lt)' }}>
        <BulletRing />
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontSize: 'clamp(17px, 2vw, 19px)', fontWeight: 700, color: RED, letterSpacing: '-0.02em', margin: '0 0 12px' }}>{title}</h3>
          <p style={{ fontSize: 'clamp(14px, 1.5vw, 15px)', color: MUTED, lineHeight: 1.78, margin: 0 }}>{body}</p>
        </div>
      </div>
    </RevealBlock>
  )
}

export default function QualityCertificatesPage() {
  const { t } = useLanguage()
  const headRef = useRef(null)
  const clipRef = useRef(null)
  const parallaxRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(headRef.current, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', delay: 0.04 })
  }, [])

  useEffect(() => {
    const inner = parallaxRef.current, outer = clipRef.current
    if (!inner || !outer) return
    const ctx = gsap.context(() => {
      gsap.to(inner, { yPercent: -5, ease: 'none', scrollTrigger: { trigger: outer, start: 'top bottom', end: 'bottom top', scrub: 1.2 } })
    }, outer)
    return () => ctx.revert()
  }, [])

  const pillarsTop = Array.isArray(t('qualityPage.pillarsTop')) ? t('qualityPage.pillarsTop') : []
  const heroImg = t('qualityPage.heroImage') || 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490771/suhail-services/quality-hero-certified.png'

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
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: RED, marginBottom: 20 }}>
            {t('qualityPage.eyebrowMuted')}
          </p>
          <h1 style={{ fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#fff', lineHeight: 1.0, margin: '0 0 24px' }}>
            {t('qualityPage.title')}
          </h1>
        </div>
      </section>

      <section style={{ padding: 'clamp(56px, 9vw, 96px) clamp(24px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gap: 'clamp(36px, 6vw, 64px)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 'clamp(15px, 1.65vw, 17px)', color: MUTED, lineHeight: 1.82, margin: '0 0 18px' }}>{t('qualityPage.introP1')}</p>
            <p style={{ fontSize: 'clamp(15px, 1.65vw, 17px)', color: MUTED, lineHeight: 1.82, margin: 0 }}>{t('qualityPage.introP2')}</p>
          </div>
          <div ref={clipRef} style={{ position: 'relative', overflow: 'hidden', borderRadius: 8, aspectRatio: '1 / 1', maxWidth: 520, margin: '0 auto', width: '100%', boxShadow: '0 24px 60px rgba(0,0,0,0.5)', background: '#1a1a1a' }}>
            <div ref={parallaxRef} style={{ position: 'absolute', left: 0, width: '100%', height: '118%', top: '-9%', willChange: 'transform' }}>
              <img src={heroImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg-2)', padding: 'clamp(32px, 6vw, 56px) clamp(22px, 5vw, 40px) clamp(56px, 9vw, 88px)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <RevealBlock y={18}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 clamp(28px, 4vw, 40px)' }}>
              {t('qualityPage.pillarsHeading')}
            </h2>
          </RevealBlock>
          {pillarsTop.map((p, i) => <PillarBulletRow key={p.title || i} title={p.title} body={p.body} index={i} isLast={i === pillarsTop.length - 1} />)}
        </div>
      </section>

      <section style={{ background: 'var(--bg)', padding: 'clamp(52px, 9vw, 96px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <RevealBlock>
            <h2 style={{ fontSize: 'clamp(20px, 2.6vw, 26px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.025em', margin: '0 0 14px' }}>
              {t('qualityPage.communicationTitle')}
            </h2>
            <p style={{ fontSize: 'clamp(14px, 1.55vw, 16px)', color: MUTED, lineHeight: 1.82, margin: 0, whiteSpace: 'pre-line' }}>
              {t('qualityPage.communicationBody')}
            </p>
          </RevealBlock>
        </div>
      </section>

      <section style={{ background: 'var(--bg-2)', padding: 'clamp(44px, 7vw, 72px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <RevealBlock>
            <h2 style={{ fontSize: 'clamp(20px, 2.6vw, 26px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 16px' }}>{t('qualityPage.infoSecurityTitle')}</h2>
            <p style={{ fontSize: 'clamp(14px, 1.55vw, 16px)', color: MUTED, lineHeight: 1.82, margin: 0, whiteSpace: 'pre-line' }}>{t('qualityPage.infoSecurityBody')}</p>
          </RevealBlock>
        </div>
      </section>

      <section style={{ background: 'var(--bg)', padding: 'clamp(52px, 9vw, 96px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <RevealBlock>
            <h2 style={{ fontSize: 'clamp(20px, 2.6vw, 26px)', fontWeight: 700, color: RED, letterSpacing: '-0.025em', margin: '0 0 14px' }}>{t('qualityPage.frontLineTitle')}</h2>
            <p style={{ fontSize: 'clamp(14px, 1.55vw, 16px)', color: MUTED, lineHeight: 1.82, margin: 0 }}>{t('qualityPage.frontLineBody')}</p>
          </RevealBlock>
        </div>
      </section>

      <section style={{ background: 'var(--bg-2)', padding: 'clamp(44px, 7vw, 72px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <RevealBlock>
            <h2 style={{ fontSize: 'clamp(20px, 2.6vw, 26px)', fontWeight: 700, color: RED, letterSpacing: '-0.025em', margin: '0 0 14px' }}>{t('qualityPage.onsiteQualityTitle')}</h2>
            <p style={{ fontSize: 'clamp(14px, 1.55vw, 16px)', color: MUTED, lineHeight: 1.82, margin: 0 }}>{t('qualityPage.onsiteQualityBody')}</p>
          </RevealBlock>
        </div>
      </section>

      <section style={{ background: 'var(--bg)', padding: 'clamp(52px, 9vw, 96px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <RevealBlock>
            <h2 style={{ fontSize: 'clamp(20px, 2.6vw, 26px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 16px' }}>{t('qualityPage.securityTitle')}</h2>
            <p style={{ fontSize: 'clamp(14px, 1.55vw, 16px)', color: MUTED, lineHeight: 1.82, margin: 0, whiteSpace: 'pre-line' }}>{t('qualityPage.securityBody')}</p>
          </RevealBlock>
        </div>
      </section>

      <section style={{ background: 'var(--bg)', padding: 'clamp(52px, 9vw, 96px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <RevealBlock>
            <h2 style={{ fontSize: 'clamp(20px, 2.6vw, 26px)', fontWeight: 700, color: RED, letterSpacing: '-0.025em', margin: '0 0 14px' }}>{t('qualityPage.ideaTitle')}</h2>
            <p style={{ fontSize: 'clamp(14px, 1.55vw, 16px)', color: MUTED, lineHeight: 1.82, margin: 0, whiteSpace: 'pre-line' }}>{t('qualityPage.ideaBody')}</p>
          </RevealBlock>
        </div>
      </section>

      <section style={{ background: 'var(--bg-2)', padding: 'clamp(44px, 7vw, 80px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <RevealBlock>
            <h2 style={{ fontSize: 'clamp(19px, 2.4vw, 24px)', fontWeight: 700, color: RED, letterSpacing: '-0.025em', margin: '0 0 14px' }}>{t('qualityPage.mqsTitle')}</h2>
            <p style={{ fontSize: 'clamp(14px, 1.55vw, 16px)', color: MUTED, lineHeight: 1.82, margin: 0 }}>{t('qualityPage.mqsBody')}</p>
          </RevealBlock>
        </div>
      </section>

      <section style={{ background: 'var(--bg)', padding: 'clamp(52px, 10vw, 104px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 14px' }}>{t('qualityPage.standardsHeading')}</h2>
          <p style={{ fontSize: 'clamp(14px, 1.55vw, 16px)', color: MUTED, lineHeight: 1.75, margin: '0 0 clamp(28px, 4vw, 40px)', whiteSpace: 'pre-line' }}>{t('qualityPage.standardsIntro')}</p>
          <div style={{ display: 'flex', flexWrap: 'nowrap', gap: 12, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }}>
            <CertBadge label="ISO 9001" title="Quality Management" place={1} />
            <CertBadge label="ISO 14001" title="Environmental Mgmt" place={2} />
            <CertBadge label="ISO 45001" title="Health & Safety" place={3} />
            <CertBadge label="ISO/IEC 27001" title="Information Security" place={2} />
            <CertBadge label="SECTOR COMPLIANCE" title="Healthcare · Public Sector" place={3} />
          </div>
          <p style={{ textAlign: 'center', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', color: MUTED, margin: '14px 0 0' }}>{t('qualityPage.standardsSwipeHint')}</p>
          {t('qualityPage.standardsFootnote') && (
            <p style={{ fontSize: 13, color: MUTED, fontStyle: 'italic', lineHeight: 1.65, margin: 'clamp(22px, 3vw, 32px) 0' }}>{t('qualityPage.standardsFootnote')}</p>
          )}
          <p style={{ fontSize: 'clamp(14px, 1.55vw, 16px)', color: MUTED, lineHeight: 1.78, margin: '0 0 22px' }}>{t('qualityPage.closing')}</p>
          <Link to="/contact" className="btn-glass-red" style={{ textDecoration: 'none' }}>
            {t('nav.contact')}
          </Link>
        </div>
      </section>
    </div>
  )
}
