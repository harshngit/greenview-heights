import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowUpRight, BookOpenText, Menu, X } from 'lucide-react'
import Logo from './Logo'
import LanguageSwitcher from './LanguageSwitcher'
import { NAV_LINKS } from '../data/site'
import { useI18n } from '../i18n/I18nContext'
import { EASE } from '../lib/motion'

// Three zones: logo | links in a centred pill | language + resources.
// The header is a little wider than page content (max 90rem) so the links
// never have to wrap; labels are no-wrap in every language. Between xl and
// 2xl the "Resident Resources" button shrinks to an icon to save room.
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

  const resourcesLabel = t('nav.resources')

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
        <nav
          className={`mx-auto flex w-full max-w-[90rem] items-center justify-between gap-4 px-5 transition-[height] duration-500 sm:px-8 lg:px-10 ${scrolled ? 'h-[4.5rem]' : 'h-20'}`}
          aria-label={t('common.mainNav')}
        >
          <Logo tone={overHero ? 'light' : 'dark'} />

          <ul
            className={`hidden items-center gap-0.5 rounded-full border p-1 transition-colors duration-500 xl:flex ${
              overHero ? 'border-white/15 bg-white/[0.08] backdrop-blur-md' : 'border-line bg-white/70'
            }`}
          >
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `relative isolate block whitespace-nowrap rounded-full px-3.5 py-2 text-[0.875rem] font-medium transition-colors duration-300 ${
                      overHero
                        ? isActive ? 'text-forest-900' : 'text-white/85 hover:text-white'
                        : isActive ? 'text-ivory' : 'text-ink-soft hover:text-ink'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className={`absolute inset-0 -z-10 rounded-full ${overHero ? 'bg-ivory' : 'bg-forest-700'}`}
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

          <div className="flex shrink-0 items-center gap-2">
            <LanguageSwitcher tone={overHero ? 'light' : 'dark'} className="hidden sm:block" />
            <Link
              to="/resources"
              title={resourcesLabel}
              className={`hidden h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 text-sm font-semibold transition-colors duration-300 sm:inline-flex xl:max-2xl:w-11 xl:max-2xl:px-0 ${
                overHero ? 'bg-ivory text-forest-800 hover:bg-white' : 'bg-forest-700 text-ivory hover:bg-forest-800'
              }`}
            >
              <BookOpenText className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="xl:max-2xl:sr-only">{resourcesLabel}</span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors xl:hidden ${
                overHero ? 'border-white/30 text-white hover:bg-white/10' : 'border-line text-ink hover:bg-sand'
              }`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t('common.closeMenu') : t('common.openMenu')}
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: `calc(100dvh - ${scrolled ? '4.5rem' : '5rem'})`, transition: { duration: 0.5, ease: EASE } }}
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
              {NAV_LINKS.map((l) => (
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
              <motion.li variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { ease: EASE, duration: 0.5 } } }} className="mt-6">
                <Link to="/resources" className="flex items-center justify-between rounded-2xl bg-forest-700 px-5 py-4 text-ivory">
                  <span className="inline-flex items-center gap-3 text-lg font-semibold">
                    <BookOpenText className="h-5 w-5" aria-hidden="true" /> {resourcesLabel}
                  </span>
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </motion.li>
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
