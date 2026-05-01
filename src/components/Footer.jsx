import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
const logo = 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777654757/SuhailSecurityLogo_jay0jh.png'

const LINKS = {
  de: [
    { label: 'Projekte',   to: '/projects' },
    { label: 'Über uns',   to: '/about' },
    { label: 'Leistungen', to: '/services' },
    { label: 'News',       to: '/news' },
    { label: 'Galerie',    to: '/gallery' },
    { label: 'Kontakt',    to: '/contact' },
  ],
  en: [
    { label: 'Projects', to: '/projects' },
    { label: 'About',    to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'News',     to: '/news' },
    { label: 'Gallery',  to: '/gallery' },
    { label: 'Contact',  to: '/contact' },
  ],
}

const SERVICES = {
  de: [
    'Sicherheitsdienst',
    'Objektschutz',
    'Personenschutz',
    'Veranstaltungsschutz',
    'CCTV Überwachung',
    'Streifendienst',
    'Werkschutz',
    'Empfangsdienst',
  ],
  en: [
    'Security Service',
    'Object Protection',
    'VIP Security',
    'Event Security',
    'CCTV Surveillance',
    'Patrol Service',
    'Industrial Security',
    'Reception Service',
  ],
}

const LEGAL = {
  de: [
    { label: 'Impressum',   to: '/impressum' },
    { label: 'Datenschutz', to: '/datenschutz' },
  ],
  en: [
    { label: 'Imprint',          to: '/impressum' },
    { label: 'Data protection',  to: '/datenschutz' },
  ],
}

const col  = 'rgba(255,255,255,0.5)'
const head = 'rgba(255,255,255,0.35)'

export default function Footer() {
  const { lang } = useLanguage()

  return (
    <footer style={{ background: '#000000', fontFamily: 'var(--font-body)', color: '#fff' }}>

      {/* Main grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
        gap: '0 clamp(28px, 4vw, 60px)',
        padding: 'clamp(40px, 8vw, 72px) clamp(20px, 5vw, 40px) clamp(24px, 5vw, 40px)',
        alignItems: 'start',
      }}
        className="footer-grid"
      >

        {/* Brand col */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Link to="/" style={{ alignSelf: 'flex-start' }}>
            <img
              src={logo}
              alt="Suhaili Security"
              style={{
                height: 'clamp(110px, 18vw, 180px)',
                width: 'auto',
                maxWidth: 'min(100%, 360px)',
                objectFit: 'contain',
                objectPosition: 'left top',
                display: 'block',
                filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.5))',
              }}
            />
          </Link>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 280 }}>
            <p style={{ margin: 0, fontSize: 14, color: col, lineHeight: 1.65 }}>
              {lang === 'de'
                ? 'Professionelle Sicherheitslösungen für Unternehmen und Privatkunden in Deutschland.'
                : 'Professional security solutions for businesses and private clients across Germany.'}
            </p>
            {[
              'info@suhaili.de',
              'contact@suhaili.de',
            ].map((addr, i) => (
              <a
                key={addr}
                href={`mailto:${addr}`}
                style={{ marginTop: i === 0 ? 12 : 4, fontSize: 13, color: col, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.color = col }}
              >
                {addr}
              </a>
            ))}
            <a
              href="tel:+4917641180455"
              style={{ fontSize: 14, color: col, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.color = col }}
            >
              +49 176 41180455
            </a>
          </div>
        </div>

        {/* Links col */}
        <div>
          <p style={{ margin: '0 0 20px', fontSize: 11, fontWeight: 500, color: head, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Links
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
            {LINKS[lang].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                style={{ fontSize: 14, color: col, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.color = col }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Services col */}
        <div>
          <p style={{ margin: '0 0 20px', fontSize: 11, fontWeight: 500, color: head, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            {lang === 'de' ? 'Leistungen' : 'Services'}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
            {SERVICES[lang].map(s => (
              <Link
                key={s}
                to="/services"
                style={{ fontSize: 14, color: col, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.color = col }}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>

        {/* Legal col */}
        <div>
          <p style={{ margin: '0 0 20px', fontSize: 11, fontWeight: 500, color: head, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            {lang === 'de' ? 'Rechtliches' : 'Legal'}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
            {LEGAL[lang].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                style={{ fontSize: 14, color: col, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.color = col }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 6,
        padding: 'clamp(24px, 4vw, 36px) clamp(20px, 5vw, 40px) clamp(32px, 6vw, 56px)',
      }}>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.22)' }}>
          © {new Date().getFullYear()} Suhaili Security.{' '}
          {lang === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}
        </span>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.22)', display: 'inline-block' }} />
          Ritterlandweg 2, 13409 Berlin
        </span>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 36px 24px !important; }
          .footer-grid > div:first-child { grid-column: 1 / -1; }
        }
        @media (max-width: 540px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </footer>
  )
}
