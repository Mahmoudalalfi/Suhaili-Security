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

function BulletRing({ style = {} }) {
  return <span style={{ flexShrink: 0, width: 14, height: 14, border: `2px solid ${RED}`, borderRadius: '50%', marginTop: 5, display: 'inline-block', ...style }} aria-hidden />
}

function PillarRow({ title, body, index, isLast }) {
  return (
    <RevealBlock delay={index * 0.05}>
      <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', paddingBottom: 'clamp(22px, 3vw, 32px)', marginBottom: 6, borderBottom: isLast ? 'none' : '1px solid var(--border-lt)' }}>
        <BulletRing style={{ marginTop: 4 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontSize: 'clamp(17px, 2vw, 19px)', fontWeight: 700, color: RED, letterSpacing: '-0.02em', margin: '0 0 12px' }}>{title}</h3>
          <p style={{ fontSize: 'clamp(14px, 1.5vw, 15px)', color: MUTED, lineHeight: 1.82, margin: 0 }}>{body}</p>
        </div>
      </div>
    </RevealBlock>
  )
}

export default function PhilosophyCodePage() {
  const { t } = useLanguage()
  const headRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(headRef.current, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', delay: 0.04 })
  }, [])

  const pillars = Array.isArray(t('philosophyPage.pillars')) ? t('philosophyPage.pillars') : []
  const heroImg = t('philosophyPage.heroImage') || 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490768/suhail-services/philosophy-hero-collaboration.png'
  const pdfHref = t('philosophyPage.codePdfHref') || ''

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
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: RED, marginBottom: 20 }}>{t('philosophyPage.eyebrowMuted')}</p>
          <h1 style={{ fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#fff', lineHeight: 1.0, margin: '0 0 24px' }}>{t('philosophyPage.title')}</h1>
        </div>
      </section>

      <section style={{ padding: 'clamp(56px, 9vw, 72px) clamp(24px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gap: 'clamp(36px, 6vw, 56px)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', alignItems: 'center' }}>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 'clamp(15px, 1.65vw, 17px)', color: MUTED, lineHeight: 1.82, margin: '0 0 16px', maxWidth: 560 }}>{t('philosophyPage.introP1')}</p>
            <p style={{ fontSize: 'clamp(15px, 1.65vw, 17px)', color: MUTED, lineHeight: 1.82, margin: 0, maxWidth: 560 }}>{t('philosophyPage.introP2')}</p>
          </div>
          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 8, aspectRatio: '1 / 1', maxWidth: 520, margin: '0 auto', width: '100%', boxShadow: '0 24px 60px rgba(0,0,0,0.5)', background: '#1a1a1a', justifySelf: 'center' }}>
            <img src={heroImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg-2)', padding: 'clamp(36px, 6vw, 72px) clamp(22px, 5vw, 40px) clamp(56px, 9vw, 96px)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <RevealBlock y={18}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 clamp(28px, 4vw, 40px)' }}>{t('philosophyPage.philosophyHeading')}</h2>
          </RevealBlock>
          {pillars.map((p, i) => <PillarRow key={p.title || i} title={p.title} body={p.body} index={i} isLast={i === pillars.length - 1} />)}
        </div>
      </section>

      <section style={{ background: 'var(--bg)', padding: 'clamp(48px, 8vw, 88px) clamp(22px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <RevealBlock>
            <h2 style={{ fontSize: 'clamp(20px, 2.6vw, 26px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.025em', margin: '0 0 18px' }}>{t('philosophyPage.codeHeading')}</h2>
            <p style={{ fontSize: 'clamp(14px, 1.55vw, 16px)', color: MUTED, lineHeight: 1.78, margin: '0 0 28px' }}>{t('philosophyPage.codeBody')}</p>
            {pdfHref ? (
              <a href={pdfHref} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: 48, padding: '12px 28px', borderRadius: 999, fontSize: 15, fontWeight: 600, textDecoration: 'none', border: `2px solid ${RED}`, color: '#fff', background: 'transparent', transition: 'background 0.2s, color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--red)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
              >
                {t('philosophyPage.codePdfLabel')}
              </a>
            ) : null}
          </RevealBlock>
        </div>
      </section>

      <section style={{ background: 'var(--bg-2)', padding: 'clamp(44px, 7vw, 72px) clamp(22px, 5vw, 40px)' }}>
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
