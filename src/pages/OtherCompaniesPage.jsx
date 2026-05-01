import { useEffect, useRef, useState } from 'react'
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

function BrandRow({ slug, logo, name, body, showDivider }) {
  const [broken, setBroken] = useState(false)

  return (
    <RevealBlock>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: showDivider ? 'clamp(28px, 5vw, 44px)' : 0, marginBottom: showDivider ? 'clamp(28px, 5vw, 44px)' : 0, borderBottom: showDivider ? '1px solid var(--border-lt)' : 'none' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
          {!broken ? (
            <div style={{ width: '100%', maxWidth: 220, height: 72, display: 'block' }}>
              <img src={logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'left center', display: 'block' }} onError={() => setBroken(true)} />
            </div>
          ) : (
            <span style={{ fontSize: 13, fontWeight: 700, color: MUTED, letterSpacing: '0.02em' }}>{(name || '?').slice(0, 12)}</span>
          )}
        </div>
        <div style={{ minWidth: 0 }}>
          <h3 style={{ fontSize: 'clamp(14px, 1.6vw, 16px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', margin: '0 0 8px', lineHeight: 1.25 }}>{name}</h3>
          <p style={{ fontSize: 'clamp(13px, 1.4vw, 15px)', color: MUTED, lineHeight: 1.75, margin: 0 }}>{body}</p>
        </div>
      </div>
    </RevealBlock>
  )
}

export default function OtherCompaniesPage() {
  const { t } = useLanguage()
  const headRef = useRef(null)

  useEffect(() => {
    if (!headRef.current) return
    gsap.fromTo(headRef.current, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', delay: 0.04 })
  }, [])

  const heroImg = t('otherCompaniesPage.heroImage') || 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490547/suhail-services/other-companies-hero.png'
  const activeBrands = Array.isArray(t('otherCompaniesPage.activeBrands')) ? t('otherCompaniesPage.activeBrands') : []
  const portfolioBrands = Array.isArray(t('otherCompaniesPage.portfolioBrands')) ? t('otherCompaniesPage.portfolioBrands') : []
  const integratedBrands = Array.isArray(t('otherCompaniesPage.integratedBrands')) ? t('otherCompaniesPage.integratedBrands') : []

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
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: RED, marginBottom: 20 }}>{t('otherCompaniesPage.eyebrowMuted')}</p>
          <h1 style={{ fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#fff', lineHeight: 1.0, margin: '0 0 24px' }}>{t('otherCompaniesPage.title')}</h1>
        </div>
      </section>

      <section style={{ padding: 'clamp(56px, 9vw, 64px) clamp(24px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gap: 'clamp(36px, 6vw, 56px)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', alignItems: 'center' }}>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 'clamp(15px, 1.65vw, 17px)', color: MUTED, lineHeight: 1.82, margin: '0 0 16px', maxWidth: 560 }}>{t('otherCompaniesPage.heroP1')}</p>
            <p style={{ fontSize: 'clamp(15px, 1.65vw, 17px)', color: MUTED, lineHeight: 1.82, margin: 0, maxWidth: 560 }}>{t('otherCompaniesPage.heroP2')}</p>
          </div>
          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 14, aspectRatio: '4 / 3', maxWidth: 560, margin: '0 auto', width: '100%', boxShadow: '0 24px 60px rgba(0,0,0,0.5)', justifySelf: 'center', background: '#1a1a1a' }}>
            <img src={heroImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div aria-hidden style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '36%', background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent)' }} />
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg-2)', padding: 'clamp(28px, 6vw, 56px) clamp(22px, 5vw, 40px) clamp(56px, 9vw, 88px)' }}>
        <div style={{ maxWidth: 920, margin: '0 auto' }}>
          <RevealBlock>
            <h2 style={{ fontSize: 'clamp(20px, 2.4vw, 24px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', textAlign: 'center', margin: '0 0 clamp(28px, 5vw, 40px)' }}>
              {t('otherCompaniesPage.activeBrandsHeading')}
            </h2>
          </RevealBlock>
          {activeBrands.map((row, i) => <BrandRow key={row.slug || i} slug={row.slug} logo={row.logo} name={row.name} body={row.body} showDivider={i < activeBrands.length - 1} />)}
          <div style={{ height: 'clamp(28px, 5vw, 44px)' }} aria-hidden />
          {portfolioBrands.map((row, i) => <BrandRow key={row.slug || `p-${i}`} slug={row.slug} logo={row.logo} name={row.name} body={row.body} showDivider={i < portfolioBrands.length - 1} />)}
          <RevealBlock>
            <h2 style={{ fontSize: 'clamp(20px, 2.4vw, 24px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', textAlign: 'center', margin: 'clamp(36px, 7vw, 56px) 0 clamp(28px, 5vw, 40px)' }}>
              {t('otherCompaniesPage.integratedBrandsHeading')}
            </h2>
          </RevealBlock>
          {integratedBrands.map((row, i) => <BrandRow key={row.slug || `i-${i}`} slug={row.slug} logo={row.logo} name={row.name} body={row.body} showDivider={i < integratedBrands.length - 1} />)}
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
