import { useLanguage } from '../i18n/LanguageContext'

/** Simple stand-in until each section gets a real page (we add routes one by one). */
export default function PlaceholderPage({ titleKey }) {
  const { t } = useLanguage()
  return (
    <main style={{
      paddingTop: 'clamp(100px, 14vh, 140px)',
      paddingLeft: 'clamp(16px, 4vw, 48px)',
      paddingRight: 'clamp(16px, 4vw, 48px)',
      paddingBottom: 80,
      minHeight: '55vh',
      maxWidth: 960,
      margin: '0 auto',
    }}
    >
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        fontWeight: 900,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: 'var(--silver-lt)',
      }}
      >
        {t(titleKey)}
      </h1>
      <p style={{ marginTop: 20, fontSize: 15, color: 'var(--muted)', lineHeight: 1.7 }}>
        {t('pages.wip')}
      </p>
    </main>
  )
}
