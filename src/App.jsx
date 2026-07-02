import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { LanguageProvider } from './i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)
import Nav from './components/Nav'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import HomePage from './pages/HomePage'
import PlaceholderPage from './pages/PlaceholderPage'
import ImprintPage from './pages/ImprintPage'
import DataProtectionPage from './pages/DataProtectionPage'
import ContactPage from './pages/ContactPage'
import ProjectsPage from './pages/ProjectsPage'
import ServicesPage from './pages/ServicesPage'
import NewsPage from './pages/NewsPage'
import GalleryPage from './pages/GalleryPage'
import AboutPage from './pages/AboutPage'
import HistoryFactsPage from './pages/HistoryFactsPage'
import ReferencesPage from './pages/ReferencesPage'
import QualityCertificatesPage from './pages/QualityCertificatesPage'
import CsrEsgPage from './pages/CsrEsgPage'
import PhilosophyCodePage from './pages/PhilosophyCodePage'
import ComplianceLksgPage from './pages/ComplianceLksgPage'
import AssociationWorkPage from './pages/AssociationWorkPage'
import OtherCompaniesPage from './pages/OtherCompaniesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'

function PageTransition({ children }) {
  const location = useLocation()
  const el = useRef(null)

  useEffect(() => {
    if (!el.current) return

    // Stop Lenis so it doesn't fight native scroll
    if (window.__lenis) window.__lenis.stop()

    // Force scroll to top via every available method
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })

    // Run page-in animation
    gsap.fromTo(el.current,
      { opacity: 0, y: 16 },
      {
        opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', clearProps: 'all',
        onComplete: () => {
          // Re-enable Lenis after animation finishes
          if (window.__lenis) window.__lenis.start()
          ScrollTrigger.refresh()
        }
      }
    )
  }, [location.pathname])

  return <div ref={el} className="page-wrapper">{children}</div>
}

function AppRoutes() {
  return (
    <PageTransition>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/impressum" element={<ImprintPage />} />
        <Route path="/datenschutz" element={<DataProtectionPage />} />
        <Route path="/about/history-facts" element={<HistoryFactsPage />} />
        <Route path="/about/references" element={<ReferencesPage />} />
        <Route path="/about/quality-certificates" element={<QualityCertificatesPage />} />
        <Route path="/about/csr-esg" element={<CsrEsgPage />} />
        <Route path="/about/philosophy-code" element={<PhilosophyCodePage />} />
        <Route path="/about/compliance-lksg" element={<ComplianceLksgPage />} />
        <Route path="/about/association-work" element={<AssociationWorkPage />} />
        <Route path="/about/other-companies" element={<OtherCompaniesPage />} />
        <Route path="/services/:id" element={<ServiceDetailPage />} />
      </Routes>
    </PageTransition>
  )
}

function LenisProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.2,
    })

    // Expose globally so PageTransition can reset scroll position
    window.__lenis = lenis

    const onTick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])

  return null
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <LenisProvider />
        <Nav />
        <AppRoutes />
        <Footer />
        <CookieBanner />
      </BrowserRouter>
    </LanguageProvider>
  )
}
