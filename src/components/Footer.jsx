import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import LiquidButton from './ui/LiquidButton'
import { SERVICES_ORDER } from '../data/servicesCatalog'
import logo from '../assets/SuhailSecurityLogo 2.png'

const scrollTop = () => {
  const lenis = /** @type {any} */ (window).__lenis
  if (lenis) lenis.scrollTo(0, { immediate: true })
  else window.scrollTo(0, 0)
}

const FOOTER_IMAGE = 'https://res.cloudinary.com/df7obwqcy/image/upload/v1783329069/SuhailSecurityLogo_2_ovbjup.png'

const LINKS = {
  de: [
    { label: 'Projekte', to: '/projects' },
    { label: 'Über uns', to: '/about' },
    { label: 'Leistungen', to: '/services' },
    { label: 'News', to: '/news' },
    { label: 'Galerie', to: '/gallery' },
    { label: 'Kontakt', to: '/contact' },
  ],
  en: [
    { label: 'Projects', to: '/projects' },
    { label: 'About', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'News', to: '/news' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Contact', to: '/contact' },
  ],
}


const SOCIALS = [
  { name: 'Facebook', href: 'https://www.facebook.com/share/14fCHyzmkdC/?mibextid=wwXIfr' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@suhaili_grupp?_r=1&_t=ZG-97JgFHNP5W5' },
  { name: 'Instagram', href: 'https://www.instagram.com/shuhaili_grupp?igsh=OXl3Mno3YzJ0MHN3&utm_source=qr' },
]

function SocialIcon({ name }) {
  if (name === 'Facebook') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22.7 0H1.3C.6 0 0 .6 0 1.3v21.4c0 .7.6 1.3 1.3 1.3h11.5v-9.3H9.7v-3.6h3.1V8.4c0-3.1 1.9-4.8 4.7-4.8 1.3 0 2.5.1 2.8.1V7h-1.9c-1.5 0-1.8.7-1.8 1.8v2.3h3.6l-.5 3.6h-3.1V24h6.1c.7 0 1.3-.6 1.3-1.3V1.3C24 .6 23.4 0 22.7 0Z"/></svg>
  }
  if (name === 'TikTok') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.5 0h3.9c.1 1.5.6 3.1 1.8 4.2 1.1 1.1 2.7 1.6 4.2 1.8v4a9 9 0 0 1-5.8-1.9v8.7a7.2 7.2 0 0 1-7.3 7.2 7.5 7.5 0 0 1-4.1-1 7.4 7.4 0 0 1-3.6-5.8v-1.5a7.2 7.2 0 0 1 8.7-6.6v4.4a3.2 3.2 0 0 0-3 .4 3.3 3.3 0 0 0-1.6 3.4 3.4 3.4 0 0 0 3.5 2.9 3.3 3.3 0 0 0 3.2-2.7c.1-1.8.1-3.6.1-5.4V0Z"/></svg>
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.2.1 4.7 1.7 4.9 4.9V12c0 3.2 0 3.6-.1 4.9-.1 3.2-1.7 4.7-4.9 4.9H12c-3.2 0-3.6 0-4.9-.1-3.2-.1-4.7-1.7-4.9-4.9V12c0-3.2 0-3.6.1-4.9.1-3.2 1.7-4.7 4.9-4.9H12ZM12 0H7C2.7.2.3 2.7.1 7v10c.2 4.3 2.7 6.7 7 6.9h10c4.3-.2 6.7-2.7 6.9-7V7c-.2-4.3-2.7-6.7-7-6.9H12Zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4Zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-11.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Z"/></svg>
}

export default function Footer() {
  const { lang, t } = useLanguage()
  const isGerman = lang === 'de'

  return (
    <footer className="site-footer">
      <section className="footer-cta">
        <div>
          <h2>
            {isGerman
              ? <>IHR PARTNER FÜR<br /><strong>SICHERHEIT</strong></>
              : <>YOUR PARTNER FOR<br /><strong>SECURITY</strong></>}
          </h2>
        </div>
        <div className="footer-cta-actions">
          <LiquidButton
            as={Link}
            to="/contact"
            tint="rgba(192,57,43,0.9)"
            textColor="#fff"
            onClick={scrollTop}
            style={{ fontFamily: 'var(--font-display)', fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase' }}
          >
            {isGerman ? 'Jetzt Angebot anfordern' : 'Request a Quote Now'} →
          </LiquidButton>
          <LiquidButton
            as={Link}
            to="/services"
            onClick={scrollTop}
            style={{ fontFamily: 'var(--font-display)', fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase' }}
          >
            {isGerman ? 'Leistungen ansehen' : 'View Services'}
          </LiquidButton>
        </div>
      </section>

      <div className="footer-main-grid">
        <div className="footer-brand-column">
          <Link to="/" className="footer-logo-link">
            <img src={logo} alt="Suhaili Security" />
          </Link>
          <p className="footer-description">
            {isGerman
              ? 'Professionelle Sicherheitslösungen für Unternehmen und Privatkunden in Deutschland.'
              : 'Professional security solutions for businesses and private clients across Germany.'}
          </p>
          <div className="footer-emails">
            {['Security@suhaili.de', 'Info.Security@suhaili.de', 'Kontakt.Security@suhaili.de'].map((email) => (
              <a href={`mailto:${email}`} key={email}>{email}</a>
            ))}
          </div>
          <a className="footer-phone" href="tel:+4917641180455">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1A19.5 19.5 0 0 1 3.1 11 19.8 19.8 0 0 1 .1 2.4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L6.1 8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.8.7a2 2 0 0 1 1.7 2v2Z"/></svg>
            +49 176 41180455
          </a>
          <a className="footer-whatsapp" href="https://wa.me/4917641180455" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 32 32" aria-hidden="true" fill="currentColor"><path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.648 4.829 1.781 6.858L2 30l7.338-1.92A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 0 1-5.83-1.594l-.418-.248-4.352 1.14 1.16-4.24-.272-.436A11.453 11.453 0 0 1 4.5 16C4.5 9.649 9.649 4.5 16 4.5S27.5 9.649 27.5 16 22.351 27.5 16 27.5zm6.29-8.61c-.344-.172-2.036-1.004-2.352-1.118-.316-.115-.547-.172-.777.172-.23.344-.892 1.118-1.094 1.348-.2.23-.402.258-.746.086-.344-.172-1.453-.535-2.769-1.707-1.023-.912-1.713-2.039-1.913-2.383-.2-.344-.022-.53.15-.701.155-.155.344-.402.516-.603.172-.2.23-.344.344-.574.115-.23.058-.43-.029-.602-.086-.172-.777-1.875-1.065-2.566-.281-.672-.566-.58-.777-.59l-.66-.011c-.23 0-.603.086-.918.43-.316.344-1.207 1.18-1.207 2.877s1.235 3.338 1.407 3.567c.172.23 2.43 3.712 5.886 5.208.823.355 1.465.567 1.965.726.826.263 1.578.226 2.172.137.663-.099 2.036-.832 2.323-1.636.287-.803.287-1.492.2-1.636-.086-.143-.316-.23-.66-.402z"/></svg>
            WhatsApp
          </a>
          <div className="footer-socials">
            {SOCIALS.map(({ name, href }) => (
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={name} key={name}>
                <SocialIcon name={name} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-link-column footer-links-column">
          <p className="footer-column-title">Links</p>
          {LINKS[lang].map(({ label, to }) => <Link to={to} key={to}>{label}</Link>)}
        </div>

        <div className="footer-link-column footer-services-column">
          <p className="footer-column-title">{isGerman ? 'Unsere Leistungen' : 'Services we offer'}</p>
          {SERVICES_ORDER.map((serviceId) => (
            <Link to={`/services/${serviceId}`} key={serviceId}>
              {t(`servicesPage.cards.${serviceId}.title`) || serviceId}
            </Link>
          ))}
        </div>

        <div className="footer-link-column footer-legal-column">
          <p className="footer-column-title">{isGerman ? 'Rechtliches' : 'Legal'}</p>
          <button
            type="button"
            className="footer-cookie-button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-cookie-settings'))}
          >
            {isGerman ? 'Cookie-Einstellungen' : 'Cookie Settings'}
          </button>
        </div>
      </div>

      <div className="footer-network-panel">
        <img src={FOOTER_IMAGE} alt="" aria-hidden="true" />
        <div className="footer-network-shade" aria-hidden="true" />
        <div className="footer-network-copy">
          <span className="footer-network-line" aria-hidden="true" />
          <h2>
            {isGerman ? <>Ein starkes Netzwerk für <strong>sichere Ergebnisse.</strong></> : <>A strong network for <strong>secure results.</strong></>}
          </h2>
          <p>
            {isGerman
              ? 'Gemeinsam schaffen wir Sicherheit, Vertrauen und nachhaltige Lösungen für unsere Kunden.'
              : 'Together we create security, trust and sustainable solutions for our clients.'}
          </p>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <span>© {new Date().getFullYear()} Suhaili Security. {isGerman ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}</span>
        <div><span>Berlin, Germany</span><span className="footer-bottom-dot" aria-hidden>·</span><Link to="/impressum">{isGerman ? 'Impressum' : 'Imprint'}</Link></div>
      </div>

      <style>{`
        .site-footer {
          position: relative;
          padding: 0 clamp(20px, 4vw, 50px) 34px;
          color: #fff;
          background: #000;
          border-top: 1px solid rgba(255,255,255,.08);
          font-family: var(--font-body);
        }
        .footer-cta {
          max-width: 1820px;
          min-height: 330px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 28px;
          margin: 0 auto;
          padding: clamp(54px, 7vw, 92px) 0;
        }
        .footer-cta h2 {
          max-width: 1100px;
          margin: 0;
          color: #fff;
          font-family: var(--font-display);
          font-size: clamp(68px, 9.2vw, 150px);
          font-weight: 700;
          letter-spacing: .005em;
          line-height: .94;
          text-transform: uppercase;
        }
        .footer-cta h2 strong { color: var(--red-light); font-weight: inherit; }
        .footer-cta-actions { display: flex; flex-direction: row; align-items: center; gap: 14px; flex-wrap: wrap; }
        .footer-main-grid {
          display: grid;
          grid-template-columns: minmax(260px, 1.45fr) minmax(130px, .8fr) minmax(190px, 1fr) minmax(140px, .7fr);
          gap: clamp(34px, 6vw, 110px);
          max-width: 1820px;
          margin: 0 auto;
          padding-top: clamp(66px, 8vw, 104px);
          align-items: start;
        }
        .footer-brand-column { min-width: 0; }
        .footer-logo-link { display: inline-block; }
        .footer-logo-link img {
          width: min(100%, 430px);
          height: auto;
          max-height: 245px;
          object-fit: contain;
          object-position: left center;
        }
        .footer-description {
          max-width: 355px;
          margin: 26px 0 20px;
          color: rgba(255,255,255,.48);
          font-size: 14px;
          line-height: 1.7;
        }
        .footer-emails { display: flex; flex-direction: column; gap: 8px; }
        .footer-emails a,
        .footer-link-column a,
        .footer-cookie-button {
          color: rgba(255,255,255,.55);
          font-size: 14px;
          line-height: 1.45;
          transition: color .2s ease, transform .2s ease;
        }
        .footer-emails a:hover,
        .footer-link-column a:hover,
        .footer-cookie-button:hover { color: #fff; transform: translateX(3px); }
        .footer-cookie-button {
          width: fit-content;
          margin: 0;
          padding: 0;
          border: 0;
          background: transparent;
          text-align: left;
          cursor: pointer;
        }
        .footer-phone {
          display: flex;
          align-items: center;
          gap: 10px;
          width: fit-content;
          margin-top: 24px;
          color: #fff;
          font-size: 18px;
          font-weight: 700;
        }
        .footer-phone svg { width: 19px; height: 19px; fill: none; stroke: currentColor; stroke-width: 1.8; }
        .footer-whatsapp {
          width: fit-content;
          display: flex;
          align-items: center;
          gap: 9px;
          margin-top: 18px;
          padding: 11px 20px;
          border-radius: 999px;
          color: #fff;
          background: #25d366;
          font-size: 14px;
          font-weight: 700;
          transition: transform .2s ease, background .2s ease;
        }
        .footer-whatsapp:hover { transform: translateY(-2px); background: #1fbd5a; }
        .footer-whatsapp svg { width: 19px; height: 19px; fill: currentColor; }
        .footer-socials { display: flex; align-items: center; gap: 18px; margin-top: 34px; }
        .footer-socials a { color: rgba(255,255,255,.43); transition: color .2s ease, transform .2s ease; }
        .footer-socials a:hover { color: var(--red-light); transform: translateY(-2px); }
        .footer-socials svg { display: block; width: 23px; height: 23px; fill: currentColor; }
        .footer-link-column { display: flex; flex-direction: column; gap: 17px; padding-top: 24px; }
        .footer-column-title {
          margin: 0 0 7px;
          color: rgba(255,255,255,.3);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .footer-network-panel {
          position: relative;
          height: clamp(230px, 15vw, 270px);
          max-width: 1820px;
          margin: 96px auto 0;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.06);
          border-radius: 24px;
        }
        .footer-network-panel > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .footer-network-shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(0,0,0,.05) 25%, rgba(0,0,0,.35) 58%, rgba(0,0,0,.88) 100%);
        }
        .footer-network-copy {
          position: absolute;
          z-index: 1;
          top: 50%;
          right: clamp(28px, 5vw, 80px);
          width: min(430px, 42%);
          transform: translateY(-50%);
          text-align: right;
        }
        .footer-network-line { display: block; width: 48px; height: 3px; margin: 0 0 18px auto; background: var(--red-light); }
        .footer-network-copy h2 { margin: 0; font-size: clamp(24px, 2.4vw, 38px); line-height: 1.18; }
        .footer-network-copy h2 strong { color: var(--red-light); }
        .footer-network-copy p { margin: 18px 0 0; color: rgba(255,255,255,.74); font-size: 14px; line-height: 1.7; }
        .footer-bottom-bar {
          max-width: 1820px;
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin: 0 auto;
          padding: 70px 0 8px;
          color: rgba(255,255,255,.25);
          font-size: 12px;
        }
        .footer-bottom-bar > div { display: flex; gap: 10px; align-items: center; }
        .footer-bottom-dot { opacity: 0.3; }
        .footer-bottom-bar a { color: inherit; transition: color .2s ease; }
        .footer-bottom-bar a:hover { color: #fff; }
        @media (max-width: 980px) {
          .footer-main-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 48px 30px; }
          .footer-brand-column { grid-column: 1 / -1; }
          .footer-logo-link img { width: min(100%, 330px); }
        }
        @media (max-width: 620px) {
          .footer-cta { min-height: 0; flex-direction: column; align-items: flex-start; padding: 58px 0; }
          .footer-cta h2 { font-size: clamp(54px, 16vw, 76px); }
          .footer-main-grid { grid-template-columns: 1fr; gap: 42px; }
          .footer-brand-column,
          .footer-links-column,
          .footer-services-column,
          .footer-legal-column { grid-column: 1 / -1; }
          .footer-services-column {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            column-gap: 18px;
            row-gap: 14px;
          }
          .footer-services-column .footer-column-title { grid-column: 1 / -1; }
          .footer-services-column a { font-size: 13px; }
          .footer-logo-link img { width: min(100%, 285px); max-height: 185px; }
          .footer-link-column { padding-top: 0; }
          .footer-network-panel {
            height: auto;
            aspect-ratio: 2.25 / 1;
            margin-top: 66px;
            border-radius: 18px;
          }
          .footer-network-shade { background: linear-gradient(0deg, rgba(0,0,0,.94), rgba(0,0,0,.15) 80%); }
          .footer-network-copy {
            top: 50%;
            right: 20px;
            bottom: auto;
            left: 20px;
            width: auto;
            transform: translateY(-50%);
            text-align: right;
          }
          .footer-network-line { width: 44px; height: 2px; margin: 0 0 12px auto; }
          .footer-network-copy h2 { font-size: 16px; line-height: 1.25; white-space: nowrap; }
          .footer-network-copy p { max-width: 350px; margin: 12px auto 0; font-size: 12px; line-height: 1.55; }
          .footer-bottom-bar { flex-direction: column; align-items: flex-start; padding-top: 42px; }
          .footer-bottom-bar > div { justify-content: flex-start; }
        }
      `}</style>
    </footer>
  )
}
