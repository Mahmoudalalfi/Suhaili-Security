import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

/* ── Animated counter stat ── */
function CounterStat({ s, delay }) {
  const numRef = useRef(null)
  useEffect(() => {
    const el = numRef.current
    if (!el) return
    const raw = String(s.num).replace(/\s/g, '')
    const match = raw.match(/^([\d.,]+)(.*)$/)
    if (!match) return
    const numStr = match[1]
    const suffix = match[2] || ''
    const normalised = numStr.replace(/\./g, '').replace(',', '.')
    const target = parseFloat(normalised)
    if (isNaN(target)) return
    const fmt = (v) => Math.round(v).toLocaleString('de-DE').replace(/,.*/, '') + suffix
    const obj = { val: 0 }
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          delay,
          ease: 'power2.out',
          onUpdate: () => { el.textContent = fmt(obj.val) },
          onComplete: () => { el.textContent = fmt(target) },
        })
      },
    })
  }, [])

  return (
    <div style={{ borderTop: '2px solid rgba(231,76,60,0.4)', paddingTop: 22 }}>
      <p ref={numRef} style={{
        fontSize: 'clamp(38px, 4.5vw, 58px)',
        fontWeight: 700,
        fontFamily: 'var(--font-display)',
        color: '#fff',
        letterSpacing: '-0.04em',
        lineHeight: 1,
        margin: '0 0 12px',
      }}>
        0
      </p>
      <p style={{
        fontSize: 13,
        color: 'var(--silver)',
        letterSpacing: '0.01em',
        lineHeight: 1.45,
        margin: 0,
      }}>
        {s.label}
      </p>
    </div>
  )
}

function useScrollReveal(ref, opts = {}) {
  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    gsap.fromTo(el,
      { opacity: 0, y: opts.y ?? 40 },
      {
        opacity: 1, y: 0,
        duration: opts.duration ?? 0.85,
        ease: opts.ease ?? 'power3.out',
        delay: opts.delay ?? 0,
        scrollTrigger: { trigger: el, start: opts.start ?? 'top 82%', once: true },
      }
    )
  }, [])
}

function RevealBlock({ children, y = 40, delay = 0, style = {} }) {
  const ref = useRef(null)
  useScrollReveal(ref, { y, delay })
  return <div ref={ref} style={{ opacity: 0, ...style }}>{children}</div>
}

/* Images per bento cell id — exact same mapping as suhail-services-main */
const BENTO_IMGS = {
  'history-facts':           'https://images.unsplash.com/photo-1580983218765-f663bec07b37?w=800&q=80',
  'references':              'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
  'quality-certificates':    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
  'csr-esg':                 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80',
  'philosophy-code':         'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
  'compliance-lksg':         'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
  'security-advisory-board': 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80',
  'association-work':        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
  'other-companies':         'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
}

export default function AboutPage() {
  const { t } = useLanguage()

  const headRef = useRef(null)
  const imgRef  = useRef(null)

  useEffect(() => {
    gsap.fromTo(headRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.05 }
    )
  }, [])

  useEffect(() => {
    if (!imgRef.current) return
    gsap.to(imgRef.current, {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: imgRef.current.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    })
  }, [])

  const learnMorePath   = t('about.learnMoreHref') || '/contact'
  const stats           = Array.isArray(t('about.stats'))         ? t('about.stats')         : []
  const aboutSections   = Array.isArray(t('about.aboutSections')) ? t('about.aboutSections') : []

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--silver-lt)' }}>

      {/* ── Hero ── */}
      <section style={{
        padding: 'clamp(80px, 14vw, 160px) clamp(20px, 5vw, 40px) clamp(32px, 10vw, 100px)',
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border-lt)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'var(--page-grid-lines)',
          backgroundSize: 'var(--page-grid-size)',
          opacity: 0.85, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'relative', zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(20px, 5vw, 56px)',
          alignItems: 'center',
          maxWidth: 1200,
          margin: '0 auto',
        }}>
          {/* Image */}
          <div className="about-hero-image-wrap" style={{ overflow: 'hidden', borderRadius: 8, aspectRatio: '4/3', position: 'relative', width: '100%' }}>
            <img
              ref={imgRef}
              src={t('about.aboutImage')}
              alt={t('about.aboutImgAlt')}
              style={{
                position: 'absolute', inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                willChange: 'transform',
                display: 'block',
              }}
            />
          </div>

          {/* Text */}
          <div ref={headRef} style={{ opacity: 0 }}>
            {/* pill badge */}
            <div style={{ marginBottom: 20 }}>
              <span style={{
                display: 'inline-block',
                padding: '8px 20px',
                borderRadius: 999,
                background: 'rgba(231,76,60,0.12)',
                border: '1px solid rgba(231,76,60,0.35)',
                color: 'var(--red-light)',
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}>
                ABOUT
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 700,
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em',
              color: '#fff',
              lineHeight: 1.15,
              margin: '0 0 28px',
            }}>
              {t('about.hero1')}
              {t('about.hero2') ? <><br />{t('about.hero2')}</> : null}
            </h1>

            {t('about.mission2') && (
              <p style={{
                fontSize: 17,
                color: 'var(--silver)',
                lineHeight: 1.75,
                maxWidth: 560,
                letterSpacing: '-0.01em',
                margin: '0 0 36px',
              }}>
                {t('about.mission2')}
              </p>
            )}

            <Link to={learnMorePath} className="btn-glass-red">
              {t('about.learnMoreLabel')}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{
        background: 'linear-gradient(180deg, #101010 0%, #070707 100%)',
        borderTop: '1px solid rgba(231,76,60,0.22)',
        borderBottom: '1px solid var(--border-lt)',
        padding: 'clamp(64px, 9vw, 96px) clamp(24px, 5vw, 40px)',
        position: 'relative',
      }}>
        <div aria-hidden style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent 0%, rgba(231,76,60,0.85) 22%, rgba(231,76,60,0.35) 55%, transparent 100%)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {t('about.statsTitle') && (
            <RevealBlock>
              <p style={{
                fontSize: 'clamp(11px, 1.2vw, 13px)',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: 'var(--red-light)',
                textTransform: 'uppercase',
                margin: '0 0 48px',
              }}>
                {t('about.statsTitle')}
              </p>
            </RevealBlock>
          )}

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 'clamp(32px, 5vw, 56px)',
          }}>
            {stats.map((s, i) => (
              <RevealBlock key={i} delay={i * 0.07}>
                <CounterStat s={s} delay={i * 0.12} />
              </RevealBlock>
            ))}
          </div>

          {t('about.statsBody') && (
            <RevealBlock delay={0.25}>
              <p style={{
                fontSize: 'clamp(15px, 1.7vw, 18px)',
                color: 'var(--silver)',
                lineHeight: 1.75,
                maxWidth: 720,
                margin: 'clamp(40px, 6vw, 64px) 0 0',
                letterSpacing: '-0.015em',
              }}>
                {t('about.statsBody')}
              </p>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ── Solutions two-col ── */}
      {(t('about.solutionsTitle') || t('about.solutionsDesc')) && (
        <section style={{ background: 'var(--bg)', padding: 'clamp(64px, 9vw, 96px) clamp(24px, 5vw, 40px)', borderBottom: '1px solid var(--border-lt)' }}>
          <div style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(24px, 4vw, 64px)',
            alignItems: 'start',
          }}>
            <RevealBlock>
              <h2 style={{
                fontSize: 'clamp(26px, 3.5vw, 42px)',
                fontWeight: 700,
                fontFamily: 'var(--font-display)',
                color: '#fff',
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                margin: 0,
              }}>
                {t('about.solutionsTitle')}
              </h2>
            </RevealBlock>
            <RevealBlock delay={0.1}>
              <p style={{
                fontSize: 'clamp(15px, 1.6vw, 17px)',
                color: 'var(--silver)',
                lineHeight: 1.75,
                letterSpacing: '-0.01em',
                margin: 0,
              }}>
                {t('about.solutionsDesc')}
              </p>
            </RevealBlock>
          </div>
        </section>
      )}

      {/* ── Bento collage ── */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(56px, 10vw, 96px) clamp(24px, 5vw, 40px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <RevealBlock>
            <div className="about-bento-grid">
              {aboutSections.map((item, i) => (
                <Link
                  key={item.id}
                  to={`/about/${item.id}`}
                  className={`about-bento-cell about-bento-cell--${i}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="about-bento-bg"
                    style={{ backgroundImage: `url(${BENTO_IMGS[item.id] || ''})` }}
                  />
                  <div className="about-bento-overlay" />
                  <div className="about-bento-content">
                    <span className="about-bento-index">0{i + 1}</span>
                    <h2 className="about-bento-title">{item.title}</h2>
                    <span className="about-bento-arrow">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

    </div>
  )
}
