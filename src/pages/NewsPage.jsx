import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'
import { NEWS_ORDER, NEWS_IMAGE_BY_ID } from '../data/newsCatalog'

gsap.registerPlugin(ScrollTrigger)

export default function NewsPage() {
  const { t, lang } = useLanguage()
  const rootRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const hero = root.querySelector('.news-page-hero-inner')
    if (hero) {
      gsap.fromTo(hero, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    }
  }, [lang])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            delay: i * 0.06,
          },
        )
      })
    }, rootRef)
    return () => ctx.revert()
  }, [lang])

  return (
    <div ref={rootRef} style={{ background: 'var(--bg)', color: 'var(--silver-lt)' }}>
      <header
        className="news-page-hero"
        style={{
          padding: 'clamp(100px, 14vh, 132px) clamp(20px, 4vw, 48px) clamp(32px, 4vh, 48px)',
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
        <div className="news-page-hero-inner" style={{ position: 'relative', zIndex: 1, maxWidth: 1160, margin: '0 auto' }}>
          <div className="news-hero-eyebrow">
            <span className="news-hero-mark" aria-hidden />
            <p className="news-hero-eyebrow-text">{t('newsPage.eyebrow')}</p>
          </div>
          <div className="news-clip">
            <h1 className="news-hero-title">{t('newsPage.title')}</h1>
          </div>
          <p className="news-hero-lead">{t('newsPage.lead')}</p>
        </div>
      </header>

      <section className="news-section-band" aria-labelledby="news-grid-heading">
        <div className="news-section-inner">
          <p id="news-grid-heading" className="news-grid-label">
            {t('newsPage.gridLabel')}
          </p>
          <div className="news-grid">
            {NEWS_ORDER.map((id, index) => (
              <article
                key={id}
                ref={(el) => {
                  cardsRef.current[index] = el
                }}
                className="news-card"
              >
                <div className="news-card-image-wrap">
                  <img src={NEWS_IMAGE_BY_ID[id]} alt="" className="news-card-img" loading={index < 2 ? 'eager' : 'lazy'} decoding="async" />
                </div>
                <div className="news-card-body">
                  <p className="news-meta">{t(`newsPage.articles.${id}.meta`)}</p>
                  <h2 className="news-card-title">{t(`newsPage.articles.${id}.title`)}</h2>
                  <p className="news-excerpt">{t(`newsPage.articles.${id}.excerpt`)}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="news-footnote">
            {lang === 'de' ? (
              <>
                Rückfragen zu Beiträgen?{' '}
                <Link to="/contact" className="news-footnote-link">
                  Kontakt
                </Link>
                .
              </>
            ) : (
              <>
                Questions about these topics?{' '}
                <Link to="/contact" className="news-footnote-link">
                  Contact us
                </Link>
                .
              </>
            )}
          </p>
        </div>
      </section>

      <style>{`
        .news-clip {
          overflow: hidden;
          display: block;
          padding-top: 0.06em;
          margin-top: -0.06em;
        }
        .news-hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 14px;
        }
        .news-hero-mark {
          width: 4px;
          height: 28px;
          border-radius: 2px;
          background: linear-gradient(180deg, var(--red-light), var(--red));
          box-shadow: 0 0 18px rgba(231, 76, 60, 0.35);
          flex-shrink: 0;
        }
        .news-hero-eyebrow-text {
          margin: 0;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--red-light);
        }
        .news-hero-title {
          margin: 0;
          font-family: var(--font-body);
          font-size: clamp(2.2rem, 4.5vw, 3.75rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          text-transform: capitalize;
          color: #fff;
          line-height: 1.1;
        }
        .news-hero-lead {
          margin: clamp(18px, 2.5vw, 26px) 0 0;
          max-width: 540px;
          font-size: 15px;
          line-height: 1.66;
          color: var(--silver);
        }
        .news-section-band {
          position: relative;
          padding: clamp(48px, 7vw, 88px) 0 clamp(72px, 10vw, 112px);
          background:
            radial-gradient(ellipse 80% 50% at 100% 0%, rgba(192, 57, 43, 0.09), transparent 55%),
            linear-gradient(180deg, #0c0c0c 0%, var(--bg) 55%);
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }
        .news-section-inner {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 48px);
        }
        .news-grid-label {
          margin: 0 0 clamp(22px, 3vw, 32px);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .news-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(34px, 5vw, 56px) clamp(24px, 4vw, 42px);
          align-items: stretch;
        }
        @media (min-width: 720px) {
          .news-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .news-card {
          display: flex;
          flex-direction: column;
          min-width: 0;
          height: 100%;
          padding-bottom: clamp(24px, 3vw, 34px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          background: transparent;
          -webkit-tap-highlight-color: transparent;
          scroll-margin-top: calc(var(--site-header-min-height, 132px) + 16px);
        }
        @media (hover: hover) and (pointer: fine) {
          .news-card:hover .news-card-img {
            transform: scale(1.018);
          }
          .news-card:hover .news-card-title { color: var(--red-light); }
        }
        .news-card-image-wrap {
          position: relative;
          flex-shrink: 0;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          background: #0a0a0a;
        }
        .news-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.65s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .news-card-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: clamp(20px, 2.5vw, 26px) 2px 0;
        }
        .news-meta {
          margin: 0;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(231,76,60,0.78);
        }
        .news-card-title {
          margin: 0;
          font-family: var(--font-body);
          font-size: clamp(1.15rem, 2.2vw, 1.35rem);
          font-weight: 700;
          letter-spacing: -0.025em;
          color: #fff;
          line-height: 1.3;
          transition: color 0.2s ease;
        }
        .news-excerpt {
          margin: 0;
          flex: 1 1 auto;
          font-size: 14px;
          line-height: 1.65;
          color: rgba(232,232,232,0.62);
        }
        .news-footnote {
          margin: clamp(36px, 5vw, 48px) 0 0;
          font-size: 13px;
          color: var(--muted);
          line-height: 1.55;
        }
        .news-footnote-link {
          color: var(--red-light);
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .news-footnote-link:hover {
          color: #ff9a8a;
        }
      `}</style>
    </div>
  )
}
