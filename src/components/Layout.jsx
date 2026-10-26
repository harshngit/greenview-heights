import { Outlet, useLocation } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import { useI18n } from '../i18n/I18nContext'
import { pageTransition } from '../lib/motion'

export default function Layout() {
  const { t } = useI18n()
  const { pathname } = useLocation()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  return (
    <>
      <button
        type="button"
        onClick={() => document.getElementById('main')?.focus()}
        className="sr-only z-[80] rounded-full bg-forest-700 px-4 py-2 text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {t('common.skip')}
      </button>
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[55] h-[3px] origin-left bg-gold-500" aria-hidden="true" />
      <ScrollToTop />
      <Navbar />
      {/* Each page fades in on arrival; keyed by path so the animation replays on navigation. */}
      <motion.main id="main" tabIndex={-1} key={pathname} initial={pageTransition.initial} animate={pageTransition.animate} className="min-h-[70vh] outline-none">
        <Outlet />
      </motion.main>
      <Footer />
    </>
  )
}
