import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    const lenis = /** @type {any} */ (window).__lenis
    if (lenis) lenis.scrollTo(0, { duration: 1 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`back-to-top${visible ? ' is-visible' : ''}`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>

      <style>{`
        .back-to-top {
          position: fixed;
          right: clamp(16px, 3vw, 32px);
          bottom: clamp(16px, 3vw, 32px);
          z-index: 900;
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.12);
          background: linear-gradient(160deg, rgba(30,30,30,0.96) 0%, rgba(15,15,15,0.97) 100%);
          backdrop-filter: blur(16px) saturate(130%);
          -webkit-backdrop-filter: blur(16px) saturate(130%);
          box-shadow: 0 4px 20px rgba(0,0,0,0.45);
          color: #fff;
          cursor: pointer;
          opacity: 0;
          transform: translateY(12px);
          pointer-events: none;
          transition: opacity 0.25s ease, transform 0.25s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .back-to-top.is-visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .back-to-top:hover {
          border-color: rgba(192,57,43,0.6);
          box-shadow: 0 4px 20px rgba(192,57,43,0.25);
        }
        .back-to-top svg {
          width: 18px;
          height: 18px;
        }
        @media (max-width: 620px) {
          .back-to-top { width: 42px; height: 42px; }
        }
      `}</style>
    </button>
  )
}
