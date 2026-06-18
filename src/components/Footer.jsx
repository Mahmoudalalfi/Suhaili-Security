import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import LiquidButton from './ui/LiquidButton'
const logo = 'https://res.cloudinary.com/df7obwqcy/image/upload/v1777654757/SuhailSecurityLogo_jay0jh.png'

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
    { label: 'Impressum',            to: '/impressum' },
    { label: 'Datenschutz',          to: '/datenschutz' },
    { label: 'Cookie-Einstellungen', to: '/datenschutz' },
  ],
  en: [
    { label: 'Imprint',          to: '/impressum' },
    { label: 'Data protection',  to: '/datenschutz' },
    { label: 'Cookie Settings',  to: '/datenschutz' },
  ],
}

const col  = 'rgba(255,255,255,0.5)'
const head = 'rgba(255,255,255,0.35)'

export default function Footer() {
  const { lang } = useLanguage()

  return (
    <footer style={{ background: '#000000', fontFamily: 'var(--font-body)', color: '#fff' }}>

      {/* CTA strip */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: 'clamp(40px, 7vw, 72px) clamp(20px, 5vw, 40px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
      }}>
        <div>
          <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c0392b', fontFamily: 'var(--font-display)' }}>
            {lang === 'de' ? 'Jetzt handeln' : 'Take Action'}
          </p>
          <h2 style={{
            margin: 0,
            fontFamily: 'var(--font-display)', fontWeight: 900,
            fontSize: 'clamp(32px, 6vw, 72px)',
            letterSpacing: '-0.03em', lineHeight: 0.95,
            textTransform: 'uppercase', color: '#fff',
          }}>
            {lang === 'de' ? <>SICHERN SIE<br />IHR UNTERNEHMEN<br /><span style={{ color: '#c0392b' }}>JETZT.</span></> : <>PROTECT YOUR<br />BUSINESS<br /><span style={{ color: '#c0392b' }}>NOW.</span></>}
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
          <LiquidButton
            as={Link} to="/contact"
            tint="rgba(192,57,43,0.9)" textColor="#fff"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase' }}
          >
            {lang === 'de' ? 'Jetzt Angebot anfordern' : 'Request a Quote Now'} →
          </LiquidButton>
          <LiquidButton
            as={Link} to="/services"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase' }}
          >
            {lang === 'de' ? 'Leistungen ansehen' : 'View Services'}
          </LiquidButton>
        </div>
      </div>

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
            {['Security@suhaili.de', 'Info.Security@suhaili.de', 'Kontakt.Security@suhaili.de'].map((addr, i) => (
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

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: 16, marginTop: 12, alignItems: 'center' }}>
              <a href="https://www.facebook.com/share/14fCHyzmkdC/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" style={{ color: col, transition: 'color 0.2s, transform 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = '#c0392b'; e.currentTarget.style.transform = 'scale(1.1)' }} onMouseLeave={e => { e.currentTarget.style.color = col; e.currentTarget.style.transform = 'scale(1)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.408 0 22.675 0z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@suhaili_grupp?_r=1&_t=ZG-97JgFHNP5W5" target="_blank" rel="noopener noreferrer" style={{ color: col, transition: 'color 0.2s, transform 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = '#c0392b'; e.currentTarget.style.transform = 'scale(1.1)' }} onMouseLeave={e => { e.currentTarget.style.color = col; e.currentTarget.style.transform = 'scale(1)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/shuhaili_grupp?igsh=OXl3Mno3YzJ0MHN3&utm_source=qr" target="_blank" rel="noopener noreferrer" style={{ color: col, transition: 'color 0.2s, transform 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = '#c0392b'; e.currentTarget.style.transform = 'scale(1.1)' }} onMouseLeave={e => { e.currentTarget.style.color = col; e.currentTarget.style.transform = 'scale(1)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.07M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>
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
