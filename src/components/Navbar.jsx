import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import Logo from './Logo'
import LanguageSwitcher from './LanguageSwitcher'
import { NAV_LINKS } from '../data/site'
import { useI18n } from '../i18n/I18nContext'
import { EASE } from '../lib/motion'

export default function Navbar() {
  const { t, site } = useI18n()
  const { pathname } = useLocation()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  // Transparent over the home hero, solid once the page scrolls.
  const overHero = pathname === '/' && !scrolled && !open
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > 480 && y > prev && !open)
  })

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const linkBase = 'relative isolate rounded-full px-3.5 py-2 text-[0.9rem] font-medium transition-colors duration-300'

  return (
    <motion.header
      animate={{ y: hidden ? '-110%' : '0%' }}
      transition={{ duration: 0.45, ease: EASE }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`transition-[background-color,border-color,backdrop-filter] duration-500 ${
          overHero ? 'border-b border-transparent bg-transparent' : open ? 'border-b border-line/80 bg-ivory' : 'border-b border-line/80 bg-ivory/85 backdrop-blur-xl'
        }`}
      >
        <nav className="container-x flex h-20 items-center justify-between gap-6" aria-label={t('common.mainNav')}>
          <Logo tone={overHero ? 'light' : 'dark'} />

          <ul className="hidden items-center gap-0.5 xl:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `${linkBase} ${overHero ? 'text-white/85 hover:text-white' : isActive ? 'text-forest-800' : 'text-ink-soft hover:text-ink'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className={`absolute inset-0 -z-10 rounded-full ${overHero ? 'bg-white/15' : 'bg-forest-50'}`}
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      {t(`nav.${l.key}`)}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LanguageSwitcher tone={overHero ? 'light' : 'dark'} className="hidden sm:block" />
            <Link to="/resources" className={`hidden whitespace-nowrap sm:inline-flex ${overHero ? 'btn-light' : 'btn-primary'} !px-5 !py-2.5`}>
              {t('nav.resources')} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className={`flex h-11 w-11 items-center justify-center rounded-full xl:hidden ${overHero ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-sand'}`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t('common.closeMenu') : t('common.openMenu')}
            >
              {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100dvh - 5rem)', transition: { duration: 0.5, ease: EASE } }}
            exit={{ opacity: 0, height: 0, transition: { duration: 0.3, ease: EASE } }}
            className="overflow-y-auto bg-ivory xl:hidden"
          >
            <motion.ul
              className="container-x flex flex-col py-6"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
            >
              <motion.li variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="pb-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">{t('lang.label')}</p>
                <LanguageSwitcher variant="inline" />
              </motion.li>
              {[...NAV_LINKS, { key: 'resources', to: '/resources' }].map((l) => (
                <motion.li key={l.to} variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0, transition: { ease: EASE, duration: 0.5 } } }}>
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    className={({ isActive }) =>
                      `flex items-center justify-between border-b border-line py-4 font-display text-3xl ${isActive ? 'text-forest-700' : 'text-ink'}`
                    }
                  >
                    {t(`nav.${l.key}`)}
                    <ArrowUpRight className="h-5 w-5 text-ink-muted" aria-hidden="true" />
                  </NavLink>
                </motion.li>
              ))}
              <motion.li variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="mt-8 text-sm text-ink-soft">
                <p className="font-semibold text-ink">{site.legalName}</p>
                <p className="mt-1">{site.address.line2}</p>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
