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

function PillPdfLink({ href, label }) {
  if (!href) return null
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: 48, padding: '12px 26px', borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: 'none', border: `2px solid ${RED}`, color: '#fff', background: 'transparent', transition: 'background 0.2s', marginTop: 8, marginRight: 12, marginBottom: 8 }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--red)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
    >
      {label}
    </a>
  )
}

export default function ComplianceLksgPage() {
  const { t } = useLanguage()
  const headRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(headRef.current, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', delay: 0.04 })
  }, [])

  const heroImg = t('complianceLksgPage.heroImage') || 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490347/suhail-services/compliance-hero-integrity.png'

  const sections = [
    { bg: 'var(--bg-2)', heading: 'complianceLksgPage.splitComplianceHeading', body: 'complianceLksgPage.splitComplianceBody' },
    { bg: 'var(--bg)', heading: 'complianceLksgPage.adviceHeading', body: 'complianceLksgPage.adviceBody', note: 'complianceLksgPage.adviceContactNote', link: 'complianceLksgPage.adviceContactLinkLabel' },
  ]

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
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: RED, marginBottom: 20 }}>{t('complianceLksgPage.eyebrowMuted')}</p>
          <h1 style={{ fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#fff', lineHeight: 1.0, margin: '0 0 24px' }}>{t('complianceLksgPage.title')}</h1>
        </div>
      </section>

      <section style={{ padding: 'clamp(56px, 9vw, 56px) clamp(24px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gap: 'clamp(36px, 6vw, 56px)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', alignItems: 'center' }}>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 'clamp(15px, 1.65vw, 17px)', color: MUTED, lineHeight: 1.82, margin: '0 0 16px', maxWidth: 560 }}>{t('complianceLksgPage.heroP1')}</p>
            <p style={{ fontSize: 'clamp(15px, 1.65vw, 17px)', color: MUTED, lineHeight: 1.82, margin: 0, maxWidth: 560 }}>{t('complianceLksgPage.heroP2')}</p>
          </div>
          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 8, aspectRatio: '1 / 1', maxWidth: 520, margin: '0 auto', width: '100%', boxShadow: '0 24px 60px rgba(0,0,0,0.5)', background: '#141414', justifySelf: 'center' }}>
            <img src={heroImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg-2)', padding: 'clamp(40px, 7vw, 80px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <RevealBlock>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 18px' }}>{t('complianceLksgPage.splitComplianceHeading')}</h2>
            <p style={{ fontSize: 'clamp(14px, 1.55vw, 16px)', color: MUTED, lineHeight: 1.78, margin: 0 }}>{t('complianceLksgPage.splitComplianceBody')}</p>
          </RevealBlock>
        </div>
      </section>

      <section style={{ background: 'var(--bg)', padding: 'clamp(44px, 8vw, 88px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <RevealBlock>
            <h2 style={{ fontSize: 'clamp(20px, 2.6vw, 26px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.025em', margin: '0 0 14px' }}>{t('complianceLksgPage.adviceHeading')}</h2>
            <p style={{ fontSize: 'clamp(14px, 1.55vw, 16px)', color: MUTED, lineHeight: 1.78, margin: '0 0 18px' }}>{t('complianceLksgPage.adviceBody')}</p>
            <p style={{ fontSize: 'clamp(13px, 1.45vw, 15px)', color: MUTED, lineHeight: 1.7, margin: '0 0 16px' }}>{t('complianceLksgPage.adviceContactNote')}</p>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: RED, textDecoration: 'underline', textUnderlineOffset: 4 }}>
              {t('complianceLksgPage.adviceContactLinkLabel')}
            </Link>
          </RevealBlock>
        </div>
      </section>

      <section style={{ background: 'var(--bg-2)', padding: 'clamp(44px, 8vw, 88px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <RevealBlock>
            <h2 style={{ fontSize: 'clamp(20px, 2.6vw, 26px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.025em', margin: '0 0 16px' }}>{t('complianceLksgPage.whistleHeading')}</h2>
            <p style={{ fontSize: 'clamp(14px, 1.55vw, 16px)', color: MUTED, lineHeight: 1.78, margin: '0 0 22px' }}>{t('complianceLksgPage.whistleBody')}</p>
            <PillPdfLink href={t('complianceLksgPage.whistleHref')} label={t('complianceLksgPage.whistleLinkLabel')} />
          </RevealBlock>
        </div>
      </section>

      <section style={{ background: 'var(--bg)', padding: 'clamp(44px, 8vw, 88px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <RevealBlock>
            <h2 style={{ fontSize: 'clamp(20px, 2.6vw, 26px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.025em', margin: '0 0 16px' }}>{t('complianceLksgPage.lksgHeading')}</h2>
            <p style={{ fontSize: 'clamp(14px, 1.55vw, 16px)', color: MUTED, lineHeight: 1.78, margin: '0 0 14px' }}>{t('complianceLksgPage.lksgP1')}</p>
            <p style={{ fontSize: 'clamp(14px, 1.55vw, 16px)', color: MUTED, lineHeight: 1.78, margin: 0 }}>{t('complianceLksgPage.lksgP2')}</p>
          </RevealBlock>
        </div>
      </section>

      <section style={{ background: 'var(--bg-2)', padding: 'clamp(44px, 8vw, 88px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <RevealBlock>
            <h2 style={{ fontSize: 'clamp(20px, 2.6vw, 26px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.025em', margin: '0 0 16px' }}>{t('complianceLksgPage.statementHeading')}</h2>
            <p style={{ fontSize: 'clamp(14px, 1.55vw, 16px)', color: MUTED, lineHeight: 1.78, margin: '0 0 14px' }}>{t('complianceLksgPage.statementBody')}</p>
            <p style={{ fontSize: 'clamp(13px, 1.45vw, 15px)', color: MUTED, lineHeight: 1.7, margin: '0 0 18px' }}>{t('complianceLksgPage.statementPdfIntro')}</p>
            <PillPdfLink href={t('complianceLksgPage.statementPdfHref')} label={t('complianceLksgPage.statementPdfLabel')} />
          </RevealBlock>
        </div>
      </section>

      <section style={{ background: 'var(--bg)', padding: 'clamp(44px, 8vw, 88px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <RevealBlock>
            <h2 style={{ fontSize: 'clamp(20px, 2.6vw, 26px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.025em', margin: '0 0 16px' }}>{t('complianceLksgPage.reportsHeading')}</h2>
            <p style={{ fontSize: 'clamp(14px, 1.55vw, 16px)', color: MUTED, lineHeight: 1.78, margin: '0 0 22px' }}>{t('complianceLksgPage.reportsIntro')}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
              <PillPdfLink href={t('complianceLksgPage.report2023Href')} label={t('complianceLksgPage.report2023Label')} />
              <PillPdfLink href={t('complianceLksgPage.report2024Href')} label={t('complianceLksgPage.report2024Label')} />
            </div>
          </RevealBlock>
        </div>
      </section>

      <section style={{ background: 'var(--bg-2)', padding: 'clamp(44px, 8vw, 88px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <RevealBlock>
            <h2 style={{ fontSize: 'clamp(20px, 2.6vw, 26px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.025em', margin: '0 0 16px' }}>{t('complianceLksgPage.supplierHeading')}</h2>
            <p style={{ fontSize: 'clamp(14px, 1.55vw, 16px)', color: MUTED, lineHeight: 1.78, margin: '0 0 14px' }}>{t('complianceLksgPage.supplierBody')}</p>
            <p style={{ fontSize: 'clamp(13px, 1.45vw, 15px)', color: MUTED, lineHeight: 1.7, margin: '0 0 18px' }}>{t('complianceLksgPage.supplierPdfIntro')}</p>
            <PillPdfLink href={t('complianceLksgPage.supplierPdfHref')} label={t('complianceLksgPage.supplierPdfLabel')} />
          </RevealBlock>
        </div>
      </section>

      <section style={{ background: 'var(--bg)', padding: 'clamp(44px, 7vw, 72px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <RevealBlock>
            <Link to="/contact" className="btn-glass-red" style={{ textDecoration: 'none' }}>
              {t('nav.contact')}
            </Link>
          </RevealBlock>
        </div>
      </section>
    </div>
  )
}
