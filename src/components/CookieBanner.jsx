import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'cookie_consent'

export default function CookieBanner() {
  const { lang } = useLanguage()
  const [visible, setVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) setVisible(true)

    function openCookieSettings() {
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
        setAnalytics(Boolean(saved.analytics))
        setMarketing(Boolean(saved.marketing))
      } catch {
        setAnalytics(false)
        setMarketing(false)
      }
      setShowSettings(true)
      setVisible(true)
    }

    window.addEventListener('open-cookie-settings', openCookieSettings)
    return () => window.removeEventListener('open-cookie-settings', openCookieSettings)
  }, [])

  function save(choice) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(choice))
    window.dispatchEvent(new CustomEvent('cookie-consent-changed', { detail: choice }))
    setVisible(false)
    setShowSettings(false)
  }

  const acceptAll  = () => save({ essential: true, analytics: true,  marketing: true  })
  const rejectAll  = () => save({ essential: true, analytics: false, marketing: false })
  const saveCustom = () => save({ essential: true, analytics,        marketing        })

  const c = lang === 'de' ? {
    body:    'Wir verwenden Cookies, um Ihnen die beste Erfahrung auf unserer Website zu bieten. Weitere Informationen finden Sie in unserer',
    privacy: 'Datenschutzerklärung',
    accept:  'Alle akzeptieren',
    reject:  'Ablehnen',
    settings:'Einstellungen',
    back:    'Zurück',
    save:    'Auswahl speichern',
    essential:     'Notwendige Cookies',
    essentialDesc: 'Immer aktiv – für den Betrieb der Website erforderlich.',
    analyticsLabel:'Analyse-Cookies',
    analyticsDesc: 'Helfen uns zu verstehen, wie Besucher die Website nutzen.',
    marketingLabel:'Marketing-Cookies',
    marketingDesc: 'Werden für personalisierte Werbung verwendet.',
  } : {
    body:    'We use cookies to give you the best experience on our website. For more information, please see our',
    privacy: 'Privacy Policy',
    accept:  'Accept All',
    reject:  'Reject',
    settings:'Settings',
    back:    'Back',
    save:    'Save Selection',
    essential:     'Essential Cookies',
    essentialDesc: 'Always active – required for the website to function.',
    analyticsLabel:'Analytics Cookies',
    analyticsDesc: 'Help us understand how visitors use the website.',
    marketingLabel:'Marketing Cookies',
    marketingDesc: 'Used for personalised advertising.',
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'fixed', bottom: 0, left: 0, right: 0,
            zIndex: 9999,
            background: 'rgba(8,8,8,0.97)',
            borderTop: '1px solid rgba(192,57,43,0.3)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: '0 -4px 32px rgba(0,0,0,0.6)',
            fontFamily: 'var(--font-body)',
            color: '#fff',
          }}
        >
          {/* Settings panel — expands above the bar */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  overflow: 'hidden',
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                  padding: '0 clamp(16px, 4vw, 48px)',
                }}
              >
                <div style={{ padding: '20px 0', display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {[
                    { label: c.essential,      desc: c.essentialDesc,  checked: true,     locked: true,  onChange: null },
                    { label: c.analyticsLabel, desc: c.analyticsDesc,  checked: analytics, locked: false, onChange: () => setAnalytics(v => !v) },
                    { label: c.marketingLabel, desc: c.marketingDesc,  checked: marketing, locked: false, onChange: () => setMarketing(v => !v) },
                  ].map(({ label, desc, checked, locked, onChange }) => (
                    <label key={label} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 12,
                      padding: '12px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      cursor: locked ? 'default' : 'pointer',
                    }}>
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={locked}
                        onChange={onChange ?? undefined}
                        style={{ marginTop: 3, accentColor: '#c0392b', flexShrink: 0, width: 16, height: 16, cursor: locked ? 'default' : 'pointer' }}
                      />
                      <div>
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#fff' }}>{label}</p>
                        <p style={{ margin: '2px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px 24px',
            padding: 'clamp(14px, 2vw, 20px) clamp(16px, 4vw, 48px)',
          }}>
            {/* Text */}
            <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, flex: '1 1 280px', maxWidth: 680 }}>
              {c.body}{' '}
              <Link
                to="/datenschutz"
                onClick={() => setVisible(false)}
                style={{ color: '#c0392b', textDecoration: 'underline', textUnderlineOffset: 3, fontWeight: 500 }}
              >
                {c.privacy}
              </Link>.
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 8, flexShrink: 0, flexWrap: 'wrap' }}>
              <button
                onClick={() => setShowSettings(v => !v)}
                style={btnStyle('ghost')}
              >
                {showSettings ? c.back : c.settings}
              </button>
              <button onClick={rejectAll} style={btnStyle('outline')}>
                {c.reject}
              </button>
              {showSettings
                ? <button onClick={saveCustom} style={btnStyle('primary')}>{c.save}</button>
                : <button onClick={acceptAll}  style={btnStyle('primary')}>{c.accept}</button>
              }
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function btnStyle(variant) {
  const base = {
    padding: '10px 20px', borderRadius: 999,
    fontSize: 13, fontWeight: 700,
    letterSpacing: '0.06em', textTransform: 'uppercase',
    cursor: 'pointer', fontFamily: 'var(--font-display)',
    whiteSpace: 'nowrap', transition: 'opacity 0.2s',
  }
  if (variant === 'primary') return { ...base, background: '#c0392b', color: '#fff', border: 'none' }
  if (variant === 'outline') return { ...base, background: 'transparent', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.25)' }
  return { ...base, background: 'transparent', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }
}
