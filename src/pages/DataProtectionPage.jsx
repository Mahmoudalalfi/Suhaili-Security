import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { useLanguage } from '../i18n/LanguageContext'
import { privacyMeta, privacyToc } from '../data/privacy/meta'
import { privacySectionsEn } from '../data/privacy/en'
import { privacySectionsDe } from '../data/privacy/de'

const LINK_SPLIT_RE = /(\bhttps?:\/\/[^\s<]+|\b[\w.+%+-]+@[\w.-]+\.[a-z]{2,}\b)/gi

function trimUrlPunct(href) {
  let h = href
  while (/[.,);'\]]$/i.test(h)) h = h.slice(0, -1)
  return h
}

function RichParagraph({ text, style }) {
  const parts = []
  let last = 0
  let m
  const s = String(text)
  LINK_SPLIT_RE.lastIndex = 0
  while ((m = LINK_SPLIT_RE.exec(s)) !== null) {
    if (m.index > last) parts.push({ type: 'text', value: s.slice(last, m.index) })
    let token = m[0]
    let href = token.includes('@') ? `mailto:${token}` : trimUrlPunct(token)
    if (!token.includes('@')) {
      const cut = token.length - href.length
      if (cut > 0) token = token.slice(0, token.length - cut)
    }
    parts.push({ type: 'link', value: token, href })
    last = m.index + m[0].length
  }
  if (last < s.length) parts.push({ type: 'text', value: s.slice(last) })
  if (parts.length === 0) parts.push({ type: 'text', value: s })

  return (
    <p className="privacy-doc-p" style={style}>
      {parts.map((p, i) =>
        p.type === 'link' ? (
          <a key={i} href={p.href} target={p.href.startsWith('http') ? '_blank' : undefined} rel={p.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="privacy-doc-a">
            {p.value}
          </a>
        ) : (
          <span key={i}>{p.value}</span>
        ),
      )}
    </p>
  )
}

function renderBlock(block, i) {
  if (block.type === 'p') {
    return <RichParagraph key={i} text={block.text} />
  }
  if (block.type === 'h3') {
    return (
      <h3 key={i} className="privacy-doc-h3">
        {block.text}
      </h3>
    )
  }
  if (block.type === 'ul') {
    return (
      <ul key={i} className="privacy-doc-ul">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  }
  return null
}

export default function DataProtectionPage() {
  const { t, lang } = useLanguage()
  const rootRef = useRef(null)
  const sectionRefs = useRef({})
  const [activeId, setActiveId] = useState(() => (lang === 'de' ? privacySectionsDe : privacySectionsEn)[0]?.id ?? null)

  const m = privacyMeta[lang]
  const toc = privacyToc[lang]
  const sections = lang === 'de' ? privacySectionsDe : privacySectionsEn

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const hero = el.querySelector('.privacy-hero-inner')
    if (!hero) return
    gsap.fromTo(hero, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' })
  }, [lang])

  const setSectionRef = useCallback((id, el) => {
    if (el) sectionRefs.current[id] = el
    else delete sectionRefs.current[id]
  }, [])

  useEffect(() => {
    setActiveId(sections[0]?.id ?? null)
  }, [sections])

  useEffect(() => {
    const ids = sections.map((s) => s.id)
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-38% 0px -38% 0px', threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    )

    const id = requestAnimationFrame(() => {
      ids.forEach((sectionId) => {
        const el = sectionRefs.current[sectionId]
        if (el) obs.observe(el)
      })
    })
    return () => {
      cancelAnimationFrame(id)
      obs.disconnect()
    }
  }, [sections])

  return (
    <div ref={rootRef} className="privacy-page" style={{ background: 'var(--bg)', color: 'var(--silver-lt)' }}>
      <header
        className="privacy-hero"
        style={{
          padding: 'clamp(100px, 14vh, 132px) clamp(20px, 4vw, 48px) clamp(36px, 5vh, 52px)',
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
        <div className="privacy-hero-inner" style={{ position: 'relative', zIndex: 1, maxWidth: 1160, margin: '0 auto' }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--red-light)',
              marginBottom: 14,
            }}
          >
            {t('imprint.eyebrow')}
          </p>
          <div className="clip-wrap privacy-clip-wrap">
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.25rem, 5.5vw, 3.75rem)',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                textTransform: 'lowercase',
                color: '#fff',
                lineHeight: 1.02,
                marginBottom: 0,
              }}
            >
              {t('pages.privacyTitle')}
            </h1>
          </div>
          <div
            style={{
              marginTop: 28,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '20px 32px',
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 15,
                lineHeight: 1.75,
                color: 'var(--muted)',
                maxWidth: '38em',
                flex: '1 1 280px',
              }}
            >
              {m.heroIntro}
            </p>
            <Link to="/impressum" className="privacy-imprint-pill">
              {m.legalImprintCta}
              <span aria-hidden> →</span>
            </Link>
          </div>
        </div>
      </header>

      <div
        className="privacy-doc-layout"
        style={{
          maxWidth: 1160,
          margin: '0 auto',
          padding: 'clamp(40px, 5vw, 64px) clamp(20px, 4vw, 48px) clamp(56px, 8vh, 96px)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 260px) minmax(0, 1fr)',
          gap: 'clamp(28px, 4vw, 48px)',
          alignItems: 'start',
        }}
      >
        <aside className="privacy-toc-aside">
          <nav className="privacy-toc-card" aria-label={m.docNavLabel}>
            <p className="privacy-toc-label">{m.docNavLabel}</p>
            <p className="privacy-toc-title">{m.onThisPage}</p>
            {toc.map((group) => (
              <div key={group.category} className="privacy-toc-group">
                <p className="privacy-toc-cat">{group.category}</p>
                <div className="privacy-toc-thread">
                  <ul className="privacy-toc-list">
                    {group.items.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className={`privacy-toc-a${activeId === item.id ? ' is-active' : ''}`}
                          onClick={(e) => {
                            e.preventDefault()
                            document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            try {
                              window.history.replaceState(null, '', `#${item.id}`)
                            } catch {
                              /* ignore */
                            }
                          }}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </nav>
        </aside>

        <article className="privacy-article">
          {sections.map((sec) => (
            <section key={sec.id} id={sec.id} ref={(el) => setSectionRef(sec.id, el)} className="privacy-section">
              <h2 className="privacy-section-h2">{sec.title}</h2>
              <div className="privacy-section-body">
                {sec.blocks.map((b, i) => renderBlock(b, i))}
                {sec.id === 'data-protection-statement' && (
                  <>
                    <p className="privacy-effective privacy-effective--in-section">
                      <span className="privacy-effective-label">{m.effectivePrefix}</span>{' '}
                      <time dateTime="2026-04-01">{m.effectiveDate}</time>
                    </p>
                    <div className="privacy-article-rule privacy-article-rule--after-intro" />
                  </>
                )}
              </div>
            </section>
          ))}
        </article>
      </div>

      <style>{`
        .privacy-page .clip-wrap {
          overflow: hidden;
          display: block;
          padding-top: 0.06em;
          margin-top: -0.06em;
        }
        .privacy-imprint-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
          padding: 12px 22px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--silver-lt);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.14);
          text-decoration: none;
          transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease, gap 0.25s ease;
        }
        .privacy-imprint-pill:hover {
          color: #fff;
          border-color: rgba(231, 76, 60, 0.45);
          background: rgba(231, 76, 60, 0.12);
          gap: 12px;
        }
        .privacy-imprint-pill:focus-visible {
          outline: 2px solid var(--red-light);
          outline-offset: 3px;
        }
        .privacy-toc-aside {
          position: sticky;
          top: calc(var(--site-header-min-height) + 16px);
          align-self: start;
        }
        .privacy-toc-card {
          background: var(--bg-card);
          border-radius: 14px;
          padding: clamp(18px, 2.5vw, 22px) clamp(16px, 2.2vw, 20px);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.055),
            0 10px 36px rgba(0, 0, 0, 0.42);
          border: 1px solid rgba(255, 255, 255, 0.06);
          max-height: min(78vh, 900px);
          overflow-y: auto;
        }
        .privacy-toc-label {
          margin: 0 0 6px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--red-light);
        }
        .privacy-toc-title {
          margin: 0 0 18px;
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 800;
          color: #fff;
          line-height: 1.2;
        }
        .privacy-toc-group {
          margin-bottom: 18px;
        }
        .privacy-toc-group:last-child {
          margin-bottom: 0;
        }
        .privacy-toc-cat {
          margin: 0 0 8px;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #7eb8e8;
        }
        .privacy-toc-thread {
          border-left: 2px solid rgba(120, 170, 220, 0.45);
          padding-left: 12px;
          margin-left: 2px;
        }
        .privacy-toc-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .privacy-toc-a {
          font-size: 12px;
          line-height: 1.45;
          color: var(--silver);
          text-decoration: none;
          display: block;
          transition: color 0.15s ease;
        }
        .privacy-toc-a:hover {
          color: var(--red-light);
        }
        .privacy-toc-a.is-active {
          color: var(--silver-lt);
          font-weight: 600;
        }
        .privacy-article {
          min-width: 0;
          border-left: 3px solid rgba(231, 76, 60, 0.55);
          padding-left: clamp(20px, 3vw, 32px);
          margin-left: 0;
        }
        .privacy-effective {
          margin: 0 0 16px;
          font-size: 14px;
          line-height: 1.6;
          color: var(--muted);
        }
        .privacy-effective-label {
          color: var(--silver-lt);
          font-weight: 600;
        }
        .privacy-effective time {
          color: var(--silver-lt);
          font-weight: 700;
        }
        .privacy-effective--in-section {
          margin-top: 6px;
        }
        .privacy-article-rule--after-intro {
          height: 1px;
          background: var(--border-lt);
          margin-top: 22px;
          margin-bottom: 0;
        }
        .privacy-section {
          scroll-margin-top: calc(var(--site-header-min-height) + 20px);
          margin-bottom: clamp(28px, 4vw, 40px);
        }
        .privacy-section:last-child {
          margin-bottom: 0;
        }
        .privacy-section-h2 {
          margin: 0 0 16px;
          font-family: var(--font-display);
          font-size: clamp(0.95rem, 1.6vw, 1.1rem);
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--red-light);
          line-height: 1.35;
        }
        .privacy-section-body {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .privacy-doc-p {
          margin: 0;
          font-size: clamp(13px, 1.25vw, 15px);
          line-height: 1.68;
          color: var(--silver);
          white-space: pre-line;
        }
        .privacy-doc-h3 {
          margin: 18px 0 4px;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 700;
          color: var(--silver-lt);
        }
        .privacy-doc-h3:first-child {
          margin-top: 0;
        }
        .privacy-doc-ul {
          margin: 4px 0 0;
          padding-left: 1.25em;
          color: var(--silver);
          font-size: clamp(13px, 1.25vw, 15px);
          line-height: 1.65;
        }
        .privacy-doc-ul li {
          margin-bottom: 6px;
        }
        .privacy-doc-a {
          color: var(--red-light);
          text-decoration: underline;
          text-underline-offset: 3px;
          word-break: break-word;
        }
        .privacy-doc-a:hover {
          color: #ff9a8a;
        }
        @media (max-width: 900px) {
          .privacy-doc-layout {
            grid-template-columns: 1fr !important;
          }
          .privacy-toc-aside {
            position: relative;
            top: auto;
          }
          .privacy-toc-card {
            max-height: none;
          }
          .privacy-article {
            border-left: none;
            padding-left: 0;
            border-top: 3px solid rgba(231, 76, 60, 0.45);
            padding-top: clamp(28px, 4vw, 40px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .privacy-imprint-pill {
            transition: none;
          }
        }
      `}</style>
    </div>
  )
}
