import { useEffect, useRef, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { useLanguage } from '../i18n/LanguageContext'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID = 'service_1fpobdj'
const EMAILJS_TEMPLATE_ID = 'template_zq59bre'
const EMAILJS_AUTOREPLY_TEMPLATE_ID = 'template_br8q3v1'
const EMAILJS_PUBLIC_KEY = 'BIboUB7JYHd_Oq1GN'

function FieldIcon({ type }) {
  const box = {
    width: 28,
    height: 28,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 2,
  }
  const stroke = 'var(--muted)'
  if (type === 'pin') {
    return (
      <span style={box} aria-hidden>
        <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
          <path
            d="M9 1.5c3.05 0 5.5 2.3 5.5 5.15 0 3.9-5.5 11.35-5.5 11.35S3.5 10.55 3.5 6.65C3.5 3.8 5.95 1.5 9 1.5z"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="6.5" r="1.6" fill={stroke} />
        </svg>
      </span>
    )
  }
  if (type === 'phone') {
    return (
      <span style={box} aria-hidden>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M3.2 2.5h2.4l1.1 2.7-1.5.9c.6 1.1 1.5 2.1 2.6 2.8l1-1.5 2.7 1.1v2.4c0 .4-.4.8-.8.9-4.2 1.3-8.6-3.1-7.3-7.3.1-.4.4-.7.8-.8z"
            stroke={stroke}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    )
  }
  if (type === 'clock') {
    return (
      <span style={box} aria-hidden>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="6.5" stroke={stroke} strokeWidth="1.3" />
          <path d="M9 5.2V9l2.8 1.6" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    )
  }
  return (
    <span style={box} aria-hidden>
      <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
        <path d="M1 2h16v10H1V2z" stroke={stroke} strokeWidth="1.2" />
        <path d="M1 2l8 6 8-6" stroke={stroke} strokeWidth="1.2" />
      </svg>
    </span>
  )
}

export default function ContactPage() {
  const { t, lang } = useLanguage()
  const rootRef = useRef(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [privacyChecked, setPrivacyChecked] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // null | 'sending' | 'success' | 'error'

  const mailTo = t('imprint.email')
  const addressBlock = useMemo(
    () => [t('imprint.companyName'), ...t('imprint.addressLines').split('\n').filter(Boolean)],
    [lang],
  )

  const socialLinks = useMemo(() => {
    const items = [
      { label: 'Facebook', url: t('contact.socialFacebookUrl') },
      { label: 'TikTok', url: t('contact.socialTiktokUrl') },
      { label: 'Instagram', url: t('contact.socialInstagramUrl') },
    ]
    return items.filter((item) => item.url && item.url.trim())
  }, [lang])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const hero = root.querySelector('.contact-hero-inner')
    const grid = root.querySelector('.contact-grid')
    if (!hero || !grid) return
    const ctx = gsap.context(() => {
      gsap.fromTo(hero, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' })
      gsap.fromTo(
        grid.querySelectorAll('.contact-panel'),
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', stagger: 0.12, delay: 0.08 },
      )
    }, root)
    return () => ctx.revert()
  }, [lang])

  async function submitForm(e) {
    e.preventDefault()
    if (!privacyChecked) return
    setSubmitStatus('sending')
    try {
      const params = {
        name,
        email,
        message,
        title: `${t('contact.mailSubjectPrefix')} — ${name}`,
        time: new Date().toLocaleString(),
      }
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params, EMAILJS_PUBLIC_KEY)
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_AUTOREPLY_TEMPLATE_ID, params, EMAILJS_PUBLIC_KEY)
      setSubmitStatus('success')
      setName('')
      setEmail('')
      setMessage('')
      setPrivacyChecked(false)
    } catch {
      setSubmitStatus('error')
    }
  }

  const req = (
    <abbr title={t('contact.requiredHint')} style={{ color: 'var(--red-light)', textDecoration: 'none' }}>
      *
    </abbr>
  )

  return (
    <div ref={rootRef} style={{ background: 'var(--bg)', color: 'var(--silver-lt)' }}>
      <header
        className="contact-hero"
        style={{
          padding: 'clamp(100px, 14vh, 132px) clamp(20px, 4vw, 48px) clamp(28px, 4vh, 44px)',
          borderBottom: '1px solid var(--border-lt)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'var(--page-grid-lines)',
            backgroundSize: 'var(--page-grid-size)',
            opacity: 0.85,
            pointerEvents: 'none',
          }}
        />
        <div className="contact-hero-inner" style={{ position: 'relative', zIndex: 1, maxWidth: 1160, margin: '0 auto' }}>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--red-light)',
              marginBottom: 14,
            }}
          >
            {t('contact.eyebrow')}
          </p>
          <div className="contact-clip">
            <h1
              style={{
                margin: 0,
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                textTransform: 'capitalize',
                color: '#fff',
                lineHeight: 1.02,
              }}
            >
              {t('contact.title')}
            </h1>
          </div>
        </div>
      </header>

      <main
        className="contact-grid"
        style={{
          maxWidth: 1160,
          margin: '0 auto',
          padding: 'clamp(40px, 5vw, 64px) clamp(20px, 4vw, 48px) clamp(56px, 8vh, 96px)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: 'clamp(28px, 4vw, 48px)',
          alignItems: 'stretch',
        }}
      >
        <section className="contact-panel contact-details">
          <h2 className="contact-section-label">{t('contact.detailsTitle')}</h2>

          <div className="contact-detail-row">
            <FieldIcon type="pin" />
            <div>
              <p className="contact-detail-key">{t('contact.addressLabel')}</p>
              {addressBlock.map((line) => (
                <p key={line} className="contact-detail-val">
                  {line}
                </p>
              ))}
            </div>
          </div>

          {t('imprint.phones')
            .split('\n')
            .filter(Boolean)
            .map((phone) => (
              <div key={phone} className="contact-detail-row">
                <FieldIcon type="phone" />
                <div>
                  <p className="contact-detail-key">{t('contact.phoneLabel')}</p>
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="contact-detail-link">
                    {phone}
                  </a>
                </div>
              </div>
            ))}

          <div className="contact-detail-row">
            <FieldIcon type="mail" />
            <div>
              <p className="contact-detail-key">{t('contact.emailLabel')}</p>
              {[
                'Security@suhaili.de',
                'Info.Security@suhaili.de',
                'Kontakt.Security@suhaili.de',
              ].map((addr) => (
                <a key={addr} href={`mailto:${addr}`} className="contact-detail-link" style={{ display: 'block' }}>
                  {addr}
                </a>
              ))}
            </div>
          </div>

          <div className="contact-details-divider" aria-hidden />

          <h2 className="contact-section-label contact-section-label--sub">{t('contact.availabilityTitle')}</h2>
          <div className="contact-detail-row contact-detail-row--tight">
            <FieldIcon type="clock" />
            <p className="contact-prose">{t('contact.availabilityBody')}</p>
          </div>

          <h2 className="contact-section-label contact-section-label--explore">{t('contact.exploreTitle')}</h2>
          <div className="contact-social-row">
            <Link to="/projects" className="contact-social-pill">
              {t('nav.projects')}
            </Link>
            <Link to="/services" className="contact-social-pill">
              {t('nav.services')}
            </Link>
            <Link to="/impressum" className="contact-social-pill">
              {t('imprint.title')}
            </Link>
          </div>

          <div className="contact-details-divider contact-details-divider--soft" aria-hidden />

          <h2 className="contact-section-label contact-section-label--explore">{t('contact.capabilitiesTitle')}</h2>
          <p className="contact-cap-intro">{t('contact.capabilitiesIntro')}</p>
          <ul className="contact-cap-list">
            {[1, 2, 3, 4].map((n) => (
              <li key={n}>{t(`contact.capLine${n}`)}</li>
            ))}
          </ul>

          <>
            <h2 className="contact-section-label contact-section-label--explore">{lang === 'de' ? 'Social Media' : 'Follow Us'}</h2>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 12 }}>
                <a href="https://www.facebook.com/share/14fCHyzmkdC/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--silver-lt)', opacity: 0.7, transition: 'color 0.2s, transform 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--red-light)'; e.currentTarget.style.transform = 'scale(1.1)' }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--silver-lt)'; e.currentTarget.style.transform = 'scale(1)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.408 0 22.675 0z"/>
                  </svg>
                </a>
                <a href="https://www.tiktok.com/@suhaili_grupp?_r=1&_t=ZG-97JgFHNP5W5" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--silver-lt)', opacity: 0.7, transition: 'color 0.2s, transform 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--red-light)'; e.currentTarget.style.transform = 'scale(1.1)' }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--silver-lt)'; e.currentTarget.style.transform = 'scale(1)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/shuhaili_grupp?igsh=OXl3Mno3YzJ0MHN3&utm_source=qr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--silver-lt)', opacity: 0.7, transition: 'color 0.2s, transform 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--red-light)'; e.currentTarget.style.transform = 'scale(1.1)' }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--silver-lt)'; e.currentTarget.style.transform = 'scale(1)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.07M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              </div>
            </>
        
        </section>

        <section className="contact-panel contact-form-panel">
          <h2 className="contact-section-label">{t('contact.formTitle')}</h2>

          {submitStatus === 'success' && (
            <div className="contact-success-box">
              <div className="contact-success-icon" aria-hidden>✓</div>
              <p className="contact-success-title">
                {lang === 'de' ? 'Nachricht erhalten!' : 'Message Received!'}
              </p>
              <p className="contact-success-body">
                {lang === 'de'
                  ? 'Wir haben Ihre Nachricht erhalten und melden uns in der Regel innerhalb eines Werktages.'
                  : 'We have received your message and will get back to you shortly — usually within one business day.'}
              </p>
              <button className="contact-submit" style={{ marginTop: 20 }} onClick={() => setSubmitStatus(null)}>
                {lang === 'de' ? 'Neue Nachricht' : 'Send Another'} →
              </button>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="contact-error-box">
              <p className="contact-error-title">
                {lang === 'de' ? 'Fehler beim Senden' : 'Failed to send'}
              </p>
              <p className="contact-error-body">
                {lang === 'de'
                  ? 'Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt per E-Mail.'
                  : 'Please try again or reach us directly by email.'}
              </p>
              <button className="contact-submit" style={{ marginTop: 16 }} onClick={() => setSubmitStatus(null)}>
                {lang === 'de' ? 'Erneut versuchen' : 'Try Again'} →
              </button>
            </div>
          )}

          {(submitStatus === null || submitStatus === 'sending') && (
          <form className="contact-form" onSubmit={submitForm} noValidate>
            <label className="contact-label contact-label--fixed">
              {t('contact.nameLabel')} {req}
              <input
                className="contact-input"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('contact.namePlaceholder')}
                required
              />
            </label>
            <label className="contact-label contact-label--fixed">
              {t('contact.emailLabel')} {req}
              <input
                className="contact-input"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('contact.emailPlaceholder')}
                required
              />
            </label>
            <label className="contact-label contact-label--message">
              {t('contact.messageLabel')} {req}
              <textarea
                className="contact-input contact-textarea"
                name="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('contact.messagePlaceholder')}
                required
              />
            </label>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', marginBottom: 4 }}>
              <input
                type="checkbox"
                required
                checked={privacyChecked}
                onChange={e => setPrivacyChecked(e.target.checked)}
                style={{ marginTop: 3, accentColor: 'var(--red-light)', flexShrink: 0, width: 16, height: 16, cursor: 'pointer' }}
              />
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
                {lang === 'de'
                  ? <>Ich habe die <Link to="/datenschutz" className="contact-privacy-link">Datenschutzerklärung</Link> gelesen und akzeptiere sie. {<abbr title="Pflichtfeld" style={{ color: 'var(--red-light)', textDecoration: 'none' }}>*</abbr>}</>
                  : <>I have read and accept the <Link to="/datenschutz" className="contact-privacy-link">Privacy Policy</Link>. {<abbr title="Required" style={{ color: 'var(--red-light)', textDecoration: 'none' }}>*</abbr>}</>
                }
              </span>
            </label>
            <div className="contact-form-footer">
              <button
                type="submit"
                className="contact-submit"
                aria-label={t('contact.submitAria')}
                disabled={!privacyChecked || submitStatus === 'sending'}
                style={{
                  opacity: privacyChecked && submitStatus !== 'sending' ? 1 : 0.45,
                  cursor: privacyChecked && submitStatus !== 'sending' ? 'pointer' : 'not-allowed',
                }}
              >
                {submitStatus === 'sending'
                  ? (lang === 'de' ? 'Wird gesendet…' : 'Sending…')
                  : <>{t('contact.submit')} <span aria-hidden>→</span></>
                }
              </button>
            </div>
          </form>
          )}
        </section>
      </main>

      <style>{`
        .contact-clip { overflow: hidden; display: block; padding-top: 0.06em; margin-top: -0.06em; }
        .contact-section-label {
          margin: 0 0 20px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .contact-section-label--sub { margin-top: 28px; margin-bottom: 14px; }
        .contact-section-label--explore { margin-top: 24px; margin-bottom: 12px; }
        .contact-details-divider {
          height: 1px;
          background: rgba(255,255,255,0.08);
          margin: 24px 0;
        }
        .contact-details-divider--soft { background: rgba(255,255,255,0.05); }
        .contact-detail-row {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          margin-bottom: 20px;
        }
        .contact-detail-row--tight { margin-bottom: 0; align-items: flex-start; }
        .contact-detail-key {
          margin: 0 0 5px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .contact-detail-val { margin: 0; font-size: 15px; line-height: 1.6; color: var(--silver-lt); }
        .contact-detail-link {
          display: block;
          font-size: 14px;
          color: var(--silver-lt);
          text-decoration: none;
          line-height: 1.8;
          transition: color 0.18s;
        }
        .contact-detail-link:hover { color: var(--red-light); }
        .contact-prose { margin: 0; font-size: 14px; line-height: 1.7; color: var(--silver); }
        .contact-cap-intro { margin: 0 0 12px; font-size: 13px; line-height: 1.55; color: var(--muted); }
        .contact-cap-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 9px; }
        .contact-cap-list li { position: relative; padding-left: 18px; font-size: 13px; line-height: 1.5; color: var(--silver-lt); }
        .contact-cap-list li::before { content: ''; position: absolute; left: 0; top: 0.55em; width: 6px; height: 6px; border-radius: 50%; background: var(--red-light); }
        .contact-social-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .contact-social-pill {
          display: inline-flex;
          align-items: center;
          padding: 8px 16px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--silver-lt);
          background: transparent;
          border: 1px solid rgba(255,255,255,0.16);
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .contact-social-pill:hover { border-color: rgba(231,76,60,0.5); color: var(--red-light); }
        .contact-panel { min-width: 0; }
        .contact-details, .contact-form-panel {
          background: transparent;
          border-radius: 0;
          padding: 0;
          border: none;
          box-shadow: none;
          height: 100%;
          box-sizing: border-box;
        }
        .contact-form-panel { display: flex; flex-direction: column; }
        .contact-form { display: flex; flex-direction: column; gap: 16px; }
        .contact-label {
          display: flex;
          flex-direction: column;
          gap: 7px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .contact-input {
          width: 100%;
          box-sizing: border-box;
          padding: 13px 15px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          color: var(--silver-lt);
          font-family: var(--font-body);
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s;
        }
        .contact-input::placeholder { color: rgba(255,255,255,0.25); }
        .contact-input:focus { border-color: rgba(231,76,60,0.5); }
        .contact-textarea { resize: vertical; min-height: 150px; line-height: 1.55; }
        .contact-form-footer { margin-top: 6px; }
        .contact-submit {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 26px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #fff;
          background: linear-gradient(165deg, var(--red-light) 0%, var(--red) 100%);
          transition: opacity 0.2s, transform 0.18s;
        }
        .contact-submit:hover { opacity: 0.88; transform: translateY(-1px); }
        .contact-privacy-note { margin: 8px 0 0; font-size: 12px; line-height: 1.6; color: var(--muted); }
        .contact-privacy-link { color: var(--red-light); text-decoration: underline; text-underline-offset: 3px; }
        .contact-success-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 40px 24px;
          border-radius: 12px;
          border: 1px solid rgba(204,0,0,0.25);
          background: rgba(204,0,0,0.05);
        }
        .contact-success-icon {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--red-light), var(--red));
          color: #fff;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
        }
        .contact-success-title {
          margin: 0 0 10px;
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.01em;
        }
        .contact-success-body {
          margin: 0;
          font-size: 14px;
          line-height: 1.65;
          color: var(--muted);
          max-width: 340px;
        }
        .contact-error-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 32px 24px;
          border-radius: 12px;
          border: 1px solid rgba(255,80,80,0.2);
          background: rgba(255,50,50,0.04);
        }
        .contact-error-title {
          margin: 0 0 8px;
          font-size: 18px;
          font-weight: 700;
          color: var(--red-light);
        }
        .contact-error-body {
          margin: 0;
          font-size: 13px;
          line-height: 1.6;
          color: var(--muted);
        }
        @media (max-width: 820px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .contact-textarea { min-height: 140px; }
        }
      `}</style>
    </div>
  )
}
