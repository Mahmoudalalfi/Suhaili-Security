import { useEffect, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useLanguage } from '../i18n/LanguageContext'
import { SERVICE_HERO_BY_ID, SERVICES_ORDER } from '../data/servicesCatalog'

const RED = 'var(--red-light)'
const MUTED = 'rgba(200,200,200,0.55)'

export default function ServiceDetailPage() {
  const { id } = useParams()
  const { t, lang } = useLanguage()
  const navigate = useNavigate()
  const headRef = useRef(null)
  const bodyRef = useRef(null)

  const isValid = SERVICES_ORDER.includes(id)

  useEffect(() => {
    if (!isValid) { navigate('/services', { replace: true }); return }
    gsap.fromTo(headRef.current, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.04 })
    gsap.fromTo(bodyRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.14 })
  }, [id])

  if (!isValid) return null

  const heroImg = SERVICE_HERO_BY_ID[id]
  const tagline = t(`servicesPage.detail.${id}.tagline`) || ''
  const title = t(`servicesPage.detail.${id}.title`) || t(`servicesPage.cards.${id}.title`) || id
  const description = t(`servicesPage.detail.${id}.description`) || ''
  const offerLabel = t('servicesPage.detailOfferTitle') || (lang === 'de' ? 'Was wir anbieten' : 'What we offer')
  const bullets = String(t(`servicesPage.detail.${id}.bullets`) || '').split('|||').map(s => s.trim()).filter(Boolean)

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--silver-lt)', minHeight: '100vh' }}>

      {/* Breadcrumb + Hero image */}
      <div ref={headRef} style={{ opacity: 0 }}>
        <div style={{ padding: 'clamp(100px, 12vw, 140px) clamp(20px, 5vw, 48px) 0', maxWidth: 1160, margin: '0 auto' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: MUTED, marginBottom: 32, flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: 'var(--silver)', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = RED}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--silver)'}
            >{lang === 'de' ? 'Startseite' : 'Home'}</Link>
            <span style={{ opacity: 0.4 }}>›</span>
            <Link to="/services" style={{ color: 'var(--silver)', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = RED}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--silver)'}
            >{lang === 'de' ? 'Leistungen' : 'Services'}</Link>
            <span style={{ opacity: 0.4 }}>›</span>
            <span style={{ color: '#fff', fontWeight: 500 }}>{title}</span>
          </nav>
        </div>

        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 clamp(20px, 5vw, 48px) clamp(40px, 6vw, 64px)' }}>
          <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 24px 64px rgba(0,0,0,0.55)' }}>
            <img src={heroImg} alt={title} style={{ display: 'block', width: '100%', aspectRatio: '21 / 9', objectFit: 'cover' }} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div ref={bodyRef} style={{ opacity: 0, maxWidth: 1160, margin: '0 auto', padding: '0 clamp(20px, 5vw, 48px) clamp(72px, 10vw, 120px)' }}>
        <div style={{ maxWidth: 760 }}>
          {tagline && (
            <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: RED }}>
              {tagline}
            </p>
          )}
          <h1 style={{ margin: '0 0 20px', fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.05 }}>
            {title}
          </h1>
          {description && (
            <p style={{ margin: '0 0 40px', fontSize: 'clamp(15px, 1.6vw, 17px)', lineHeight: 1.78, color: MUTED }}>
              {description}
            </p>
          )}

          {bullets.length > 0 && (
            <>
              <h2 style={{ margin: '0 0 20px', fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: '0.02em' }}>
                {offerLabel}
              </h2>
              <ul style={{ listStyle: 'none', margin: '0 0 48px', padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {bullets.map(line => (
                  <li key={line} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0, marginTop: 6, width: 7, height: 7, borderRadius: '50%', background: RED, boxShadow: '0 0 10px rgba(231,76,60,0.5)', display: 'inline-block' }} />
                    <span style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--silver-lt)' }}>{line}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <Link to="/services" className="btn-glass-red">
            ← {lang === 'de' ? 'Zurück zu Leistungen' : 'Back to Services'}
          </Link>
        </div>
      </div>
    </div>
  )
}
