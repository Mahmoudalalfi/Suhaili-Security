import { useEffect, useRef, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { useLanguage } from '../i18n/LanguageContext'

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

  function submitForm(e) {
    e.preventDefault()
    const subject = encodeURIComponent(`${t('contact.mailSubjectPrefix')} — ${name || '—'}`)
    const body = encodeURIComponent(
      `${message}\n\n—\n${t('contact.nameLabel')}: ${name}\n${t('contact.emailLabel')}: ${email}`,
    )
    window.location.href = `mailto:${mailTo}?subject=${subject}&body=${body}`
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
                'kontact@suhaili.de',
                'hussein@suhaili.de',
                'hasan@suhaili.de',
                'service.plan@suhaili.de',
                'service@suhaili.de',
                'buero@suhaili.de',
                'security@suhaili.de',
                'security.plan@suhaili.de',
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

          {socialLinks.length > 0 && (
            <>
              <h2 className="contact-section-label contact-section-label--explore">{t('contact.socialTitle')}</h2>
              <div className="contact-social-row">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-pill"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </>
          )}
        </section>

        <section className="contact-panel contact-form-panel">
          <h2 className="contact-section-label">{t('contact.formTitle')}</h2>
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
            <div className="contact-form-footer">
              <button type="submit" className="contact-submit" aria-label={t('contact.submitAria')}>
                {t('contact.submit')} <span aria-hidden>→</span>
              </button>
            </div>
            <p className="contact-privacy-note">
              {t('contact.formPrivacy')}{' '}
              <Link to="/datenschutz" className="contact-privacy-link">
                {t('contact.formPrivacyLink')}
              </Link>
              .
            </p>
          </form>
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
        @media (max-width: 820px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .contact-textarea { min-height: 140px; }
        }
      `}</style>
    </div>
  )
}
