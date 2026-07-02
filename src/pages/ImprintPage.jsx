import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const HERO_IMAGE = 'https://res.cloudinary.com/df7obwqcy/image/upload/v1782965651/Imprint_1_ukdkvt.png'
const FEATURE_IMAGE = 'https://res.cloudinary.com/df7obwqcy/image/upload/v1782965710/Imprint_2_fclgq6.png'

const GROUP_COMPANIES = [
  {
    name: 'Suhaili Service GmbH',
    logo: 'https://res.cloudinary.com/df7obwqcy/image/upload/v1782963162/new-logo_xgbypc.png',
    href: 'https://www.suhaili-services.de',
    website: 'suhaili-services.de',
  },
  {
    name: 'Crystal DBC Real Estate L.L.C',
    logo: 'https://res.cloudinary.com/df7aiznm6/image/upload/v1782404563/crystaldbclogo_sip4su.png',
    href: 'https://www.crystaldbc.com',
    website: 'crystaldbc.com',
  },
  {
    name: 'AT Aufsteig Technik GmbH',
    logo: 'https://res.cloudinary.com/df7aiznm6/image/upload/v1782404393/aufsteig-logo_t8sygm.png',
    href: 'https://www.aufsteigtechnik.de',
    website: 'aufsteigtechnik.de',
  },
]

const PAGE_COPY = {
  de: {
    details: 'Rechtliche Angaben',
    company: 'Unternehmen',
    address: 'Anschrift',
    email: 'E-Mail',
    phone: 'Telefon',
    website: 'Webseite',
    director: 'Geschäftsführer',
    register: 'Handelsregister',
    vat: 'Umsatzsteuer-Identifikationsnummer',
    responsible: 'Verantwortlich für den Inhalt (§ 55 Abs. 2 RStV)',
    contact: 'Kontaktieren Sie uns',
    contactLead: 'Sie haben Fragen zu unseren Leistungen oder benötigen ein individuelles Sicherheitskonzept?',
    groupEyebrow: 'Die Suhaili Gruppe',
    groupTitle: 'Gemeinsam stärker. Für eine sichere Zukunft.',
    visit: 'Webseite besuchen',
  },
  en: {
    details: 'Legal details',
    company: 'Company name',
    address: 'Address',
    email: 'E-mail',
    phone: 'Phone',
    website: 'Website',
    director: 'Managing Director',
    register: 'Commercial Register',
    vat: 'VAT Identification Number',
    responsible: 'Responsible for content (§ 55 Abs. 2 RStV)',
    contact: 'Contact us',
    contactLead: 'Do you have questions about our services or need a tailored security concept?',
    groupEyebrow: 'The Suhaili Group',
    groupTitle: 'Stronger together. For a safer future.',
    visit: 'Visit website',
  },
}

function DetailIcon({ type }) {
  const paths = {
    company: <><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h6M9 11h6M9 15h4"/></>,
    address: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    email: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    phone: <path d="M5 3h4l2 5-2.5 1.5a15 15 0 0 0 6 6L16 13l5 2v4c0 1.1-.9 2-2 2C10.2 20.5 3.5 13.8 3 5a2 2 0 0 1 2-2Z"/>,
    website: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/></>,
    director: <><circle cx="12" cy="7" r="4"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/></>,
    register: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 5V3h8v2M8 10h8M8 14h8M8 18h5"/></>,
    vat: <><path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6M9 13h8M9 17h6"/></>,
    responsible: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></>,
  }

  return (
    <span className="imprint-detail-icon" aria-hidden="true">
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {paths[type]}
      </svg>
    </span>
  )
}

function DetailRow({ icon, label, children }) {
  return (
    <div className="imprint-detail-row">
      <DetailIcon type={icon} />
      <div>
        <p className="imprint-detail-label">{label}</p>
        <div className="imprint-detail-value">{children}</div>
      </div>
    </div>
  )
}

export default function ImprintPage() {
  const { t, lang } = useLanguage()
  const rootRef = useRef(null)
  const c = PAGE_COPY[lang] ?? PAGE_COPY.de
  const phone = '+49 176 41180455'
  const cleanPhone = phone?.replace(/[^+\d]/g, '')
  const securityEmails = ['Security@suhaili.de', 'Info.Security@suhaili.de', 'Kontakt.Security@suhaili.de']

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.imprint-hero-copy > *',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.12 },
      )
      gsap.utils.toArray('.imprint-reveal').forEach((element) => {
        gsap.fromTo(element,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 88%', once: true },
          },
        )
      })
    }, rootRef)

    return () => ctx.revert()
  }, [lang])

  return (
    <div ref={rootRef} className="imprint-page">
      <header className="imprint-hero">
        <img className="imprint-hero-image" src={FEATURE_IMAGE} alt="" aria-hidden="true" />
        <div className="imprint-hero-shade" aria-hidden="true" />
        <div className="imprint-hero-copy">
          <p className="imprint-eyebrow">{t('imprint.eyebrow')}</p>
          <h1>{t('imprint.title')}</h1>
          <p className="imprint-lead">{t('imprint.lead')}</p>
        </div>
      </header>

      <main className="imprint-content">
        <div className="imprint-layout">
          <section className="imprint-details-card imprint-reveal">
            <p className="imprint-section-kicker">{c.details}</p>

            <DetailRow icon="company" label={c.company}>
              <strong>Suhaili Service GmbH</strong>
            </DetailRow>

            <DetailRow icon="address" label={c.address}>
              <span>Ritterlandweg 2</span>
              <span>13409 Berlin</span>
              <span>Deutschland</span>
            </DetailRow>

            <DetailRow icon="director" label={c.director}>
              <span>Al-Suhaili</span>
            </DetailRow>

            <DetailRow icon="register" label={c.register}>
              <span>Amtsgericht Charlottenburg (Berlin)</span>
              <span>HRB 271848 B</span>
            </DetailRow>

            <DetailRow icon="vat" label={c.vat}>
              <strong>11 30 202 51939</strong>
            </DetailRow>

            <DetailRow icon="phone" label={c.phone}>
              <a href={`tel:${cleanPhone}`}>{phone}</a>
            </DetailRow>

            <DetailRow icon="email" label={c.email}>
              {securityEmails.map((email) => <a href={`mailto:${email}`} key={email}>{email}</a>)}
            </DetailRow>

            <DetailRow icon="website" label={c.website}>
              <a href="https://www.suhaili-security.de/" target="_blank" rel="noopener noreferrer">
                suhaili-security.de
              </a>
            </DetailRow>

            <DetailRow icon="responsible" label={c.responsible}>
              <span>Al-Suhaili</span>
              <span>Ritterlandweg 2</span>
              <span>13409 Berlin</span>
              <span>Deutschland</span>
            </DetailRow>
          </section>

          <div className="imprint-visual-column">
            <figure className="imprint-feature-image imprint-reveal">
              <img src={HERO_IMAGE} alt="Suhaili Service workspace" />
            </figure>

            <div className="imprint-contact-row">
              <div className="imprint-map-card imprint-reveal">
                <iframe
                  title="Ritterlandweg 2, 13409 Berlin"
                  src="https://www.google.com/maps?q=Ritterlandweg%202%2C%2013409%20Berlin%2C%20Germany&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                  className="imprint-map-link"
                  href="https://www.google.com/maps/search/?api=1&query=Ritterlandweg+2%2C+13409+Berlin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Maps <span aria-hidden="true">↗</span>
                </a>
                <div className="imprint-map-address"><DetailIcon type="address" />Ritterlandweg 2, 13409 Berlin</div>
              </div>

              <figure className="imprint-secondary-image imprint-reveal">
                <img src={FEATURE_IMAGE} alt="Suhaili Service office building" />
              </figure>
            </div>

            <section className="imprint-contact-card imprint-reveal">
              <p className="imprint-section-kicker">{c.contact}</p>
              <p className="imprint-contact-lead">{c.contactLead}</p>
              <a href={`tel:${cleanPhone}`}><DetailIcon type="phone" />{phone}</a>
              <a href="mailto:Security@suhaili.de"><DetailIcon type="email" />Security@suhaili.de</a>
              <a href="https://www.suhaili-security.de/" target="_blank" rel="noopener noreferrer">
                <DetailIcon type="website" />suhaili-security.de
              </a>
            </section>
          </div>
        </div>

        <section className="imprint-group-section">
          <div className="imprint-group-heading imprint-reveal">
            <p className="imprint-section-kicker">{c.groupEyebrow}</p>
            <h2>{c.groupTitle}</h2>
          </div>
          <div className="imprint-group-grid">
            {GROUP_COMPANIES.map((company) => (
              <a className="imprint-group-card imprint-reveal" href={company.href} target="_blank" rel="noopener noreferrer" key={company.name}>
                <div className="imprint-group-logo"><img src={company.logo} alt="" /></div>
                <span className="imprint-group-line" aria-hidden="true" />
                <h3>{company.name}</h3>
                <p>{company.website}</p>
                <span className="imprint-group-link">{c.visit} <span aria-hidden="true">↗</span></span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <style>{`
        .imprint-page {
          --imprint-accent: var(--red-light);
          background: #080808;
          color: var(--silver-lt);
          overflow: hidden;
        }
        .imprint-hero {
          min-height: clamp(500px, 72vh, 720px);
          position: relative;
          display: flex;
          align-items: flex-end;
          padding: clamp(130px, 18vh, 190px) clamp(20px, 8vw, 150px) clamp(58px, 9vw, 100px);
          overflow: hidden;
        }
        .imprint-hero-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .imprint-hero-shade {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(0,0,0,.92) 0%, rgba(0,0,0,.66) 43%, rgba(0,0,0,.18) 78%),
            linear-gradient(0deg, rgba(0,0,0,.85) 0%, transparent 55%);
        }
        .imprint-hero-copy {
          position: relative;
          z-index: 1;
          width: min(680px, 100%);
        }
        .imprint-eyebrow,
        .imprint-section-kicker {
          margin: 0;
          color: var(--imprint-accent);
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: .16em;
          text-transform: uppercase;
        }
        .imprint-hero h1 {
          margin: 16px 0 18px;
          color: #fff;
          font-family: var(--font-display);
          font-size: clamp(64px, 10vw, 132px);
          font-weight: 400;
          letter-spacing: -.025em;
          line-height: .84;
          text-transform: uppercase;
        }
        .imprint-lead {
          max-width: 580px;
          margin: 0;
          color: rgba(255,255,255,.74);
          font-size: clamp(16px, 1.7vw, 20px);
          line-height: 1.65;
        }
        .imprint-content {
          width: min(1400px, 100%);
          margin: 0 auto;
          padding: clamp(58px, 8vw, 110px) clamp(20px, 5vw, 64px) clamp(80px, 10vw, 130px);
        }
        .imprint-layout {
          display: grid;
          grid-template-columns: minmax(320px, .82fr) minmax(0, 1.35fr);
          gap: clamp(24px, 3vw, 44px);
          align-items: start;
        }
        .imprint-details-card,
        .imprint-contact-card {
          background: #111113;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 24px;
        }
        .imprint-details-card {
          padding: clamp(28px, 4vw, 48px);
        }
        .imprint-details-card > .imprint-section-kicker {
          margin-bottom: 28px;
        }
        .imprint-detail-row {
          display: grid;
          grid-template-columns: 44px minmax(0, 1fr);
          gap: 16px;
          padding: 22px 0;
          border-bottom: 1px solid rgba(255,255,255,.08);
        }
        .imprint-detail-row:last-child { border-bottom: 0; padding-bottom: 0; }
        .imprint-detail-icon {
          width: 42px;
          height: 42px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 42px;
          border-radius: 12px;
          color: var(--imprint-accent);
          background: rgba(231,76,60,.09);
          border: 1px solid rgba(231,76,60,.16);
        }
        .imprint-detail-label {
          margin: 0 0 6px;
          color: var(--imprint-accent);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .09em;
          text-transform: uppercase;
        }
        .imprint-detail-value {
          display: flex;
          flex-direction: column;
          gap: 3px;
          color: rgba(255,255,255,.72);
          font-size: 14px;
          line-height: 1.55;
          overflow-wrap: anywhere;
        }
        .imprint-detail-value strong { color: #fff; font-weight: 600; }
        .imprint-detail-value a { color: inherit; transition: color .2s ease; }
        .imprint-detail-value a:hover { color: #fff; }
        .imprint-visual-column { display: flex; flex-direction: column; gap: 24px; min-width: 0; }
        .imprint-feature-image,
        .imprint-secondary-image,
        .imprint-map-card {
          position: relative;
          margin: 0;
          overflow: hidden;
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,.08);
        }
        .imprint-feature-image { aspect-ratio: 16 / 10; }
        .imprint-secondary-image,
        .imprint-map-card { min-height: 310px; }
        .imprint-feature-image img,
        .imprint-secondary-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .7s cubic-bezier(.2,.7,.2,1);
        }
        .imprint-feature-image:hover img,
        .imprint-secondary-image:hover img { transform: scale(1.025); }
        .imprint-map-card iframe {
          width: 100%;
          height: 100%;
          min-height: 310px;
          display: block;
          border: 0;
          filter: grayscale(.15) contrast(1.02);
          pointer-events: none;
        }
        .imprint-map-link {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 2;
          padding: 9px 13px;
          border-radius: 6px;
          color: #1769d2;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,.24);
          font-size: 13px;
          font-weight: 700;
        }
        .imprint-map-address {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          min-height: 62px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 18px;
          color: #fff;
          background: linear-gradient(0deg, rgba(0,0,0,.94), rgba(0,0,0,.68));
          font-size: 12px;
          font-weight: 600;
          pointer-events: none;
        }
        .imprint-map-address .imprint-detail-icon {
          width: 32px;
          height: 32px;
          flex-basis: 32px;
          border: 0;
          background: rgba(231,76,60,.16);
        }
        .imprint-contact-row {
          display: grid;
          grid-template-columns: minmax(0, .9fr) minmax(280px, 1.1fr);
          gap: 24px;
        }
        .imprint-contact-card {
          display: flex;
          flex-direction: column;
          padding: clamp(26px, 3vw, 38px);
        }
        .imprint-contact-lead {
          margin: 18px 0 26px;
          color: rgba(255,255,255,.58);
          font-size: 14px;
          line-height: 1.7;
        }
        .imprint-contact-card > a {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-top: 13px;
          color: rgba(255,255,255,.76);
          font-size: 13px;
          overflow-wrap: anywhere;
          transition: color .2s ease, transform .2s ease;
        }
        .imprint-contact-card > a:hover { color: #fff; transform: translateX(3px); }
        .imprint-contact-card .imprint-detail-icon { width: 36px; height: 36px; flex-basis: 36px; border-radius: 10px; }
        .imprint-group-section {
          margin-top: clamp(80px, 11vw, 150px);
          padding-top: clamp(64px, 8vw, 100px);
          border-top: 1px solid rgba(255,255,255,.1);
        }
        .imprint-group-heading { text-align: center; }
        .imprint-group-heading h2 {
          max-width: 850px;
          margin: 18px auto 0;
          color: #fff;
          font-family: var(--font-display);
          font-size: clamp(36px, 5vw, 66px);
          font-weight: 400;
          line-height: 1;
          letter-spacing: .01em;
          text-transform: uppercase;
        }
        .imprint-group-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
          margin-top: clamp(40px, 6vw, 70px);
        }
        .imprint-group-card {
          min-height: 410px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 38px 28px;
          color: #fff;
          text-align: center;
          background: #111113;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 24px;
          transition: transform .3s ease, border-color .3s ease, box-shadow .3s ease;
        }
        .imprint-group-card:hover {
          transform: translateY(-7px);
          border-color: rgba(231,76,60,.4);
          box-shadow: 0 26px 60px rgba(0,0,0,.42);
        }
        .imprint-group-logo {
          height: 120px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .imprint-group-logo img { max-width: 70%; max-height: 92px; object-fit: contain; }
        .imprint-group-line { width: 38px; height: 2px; margin: 26px 0 22px; background: var(--imprint-accent); }
        .imprint-group-card h3 { margin: 0; font-size: 18px; line-height: 1.35; }
        .imprint-group-card p { margin: 14px 0 22px; color: rgba(255,255,255,.46); font-size: 13px; }
        .imprint-group-link { color: var(--imprint-accent); font-size: 12px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; }
        @media (max-width: 980px) {
          .imprint-layout { grid-template-columns: 1fr; }
          .imprint-group-grid { grid-template-columns: 1fr; }
          .imprint-group-card { min-height: 330px; }
        }
        @media (max-width: 680px) {
          .imprint-hero { min-height: 540px; align-items: flex-end; }
          .imprint-hero-shade {
            background: linear-gradient(0deg, rgba(0,0,0,.94) 0%, rgba(0,0,0,.58) 65%, rgba(0,0,0,.28) 100%);
          }
          .imprint-hero h1 { font-size: clamp(58px, 21vw, 92px); }
          .imprint-contact-row {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }
          .imprint-feature-image { aspect-ratio: 4 / 3; }
          .imprint-secondary-image { min-height: 300px; }
          .imprint-map-card,
          .imprint-map-card iframe { min-height: 300px; }
          .imprint-map-address {
            min-height: 54px;
            padding: 8px 10px;
            font-size: 10px;
            line-height: 1.3;
          }
          .imprint-map-address .imprint-detail-icon { display: none; }
          .imprint-map-link { top: 9px; left: 9px; padding: 8px 10px; font-size: 12px; }
          .imprint-details-card,
          .imprint-contact-card,
          .imprint-feature-image,
          .imprint-secondary-image,
          .imprint-map-card,
          .imprint-group-card { border-radius: 18px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .imprint-feature-image img,
          .imprint-secondary-image img,
          .imprint-group-card,
          .imprint-contact-card > a { transition: none; }
        }
      `}</style>
    </div>
  )
}
