import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown, Languages } from 'lucide-react'
import { LANGUAGES, useI18n } from '../i18n/I18nContext'
import { EASE } from '../lib/motion'

// variant="menu": compact dropdown for the header.
// variant="inline": every language visible at once (mobile menu, footer).
export default function LanguageSwitcher({ variant = 'menu', tone = 'dark', className = '' }) {
  const { lang, setLang, t } = useI18n()
  const [open, setOpen] = useState(false)
  const root = useRef(null)
  const current = LANGUAGES.find((l) => l.code === lang)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (!root.current?.contains(e.target)) setOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (variant === 'inline') {
    const light = tone === 'light'
    return (
      <div role="group" aria-label={t('lang.choose')} className={`flex flex-wrap gap-2 ${className}`}>
        {LANGUAGES.map((l) => {
          const active = l.code === lang
          return (
            <button
              key={l.code}
              type="button"
              lang={l.code}
              onClick={() => setLang(l.code)}
              aria-pressed={active}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? light ? 'border-ivory bg-ivory text-forest-900' : 'border-forest-700 bg-forest-700 text-ivory'
                  : light ? 'border-ivory/25 text-ivory/80 hover:border-ivory/60 hover:text-white' : 'border-line bg-white text-ink-soft hover:border-forest-200 hover:text-forest-800'
              }`}
            >
              {l.name}
            </button>
          )
        })}
      </div>
    )
  }

  const light = tone === 'light'
  return (
    <div ref={root} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`${t('lang.label')}: ${current.name}`}
        className={`inline-flex h-11 items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium transition-colors ${
          light ? 'border-white/30 text-white hover:bg-white/10' : 'border-line bg-white/60 text-ink hover:border-forest-200 hover:bg-white'
        }`}
      >
        <Languages className="h-4 w-4" aria-hidden="true" />
        <span lang={current.code}>{current.short}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.25, ease: EASE } }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
            className="absolute right-0 top-full z-10 mt-2 w-44 origin-top-right overflow-hidden rounded-2xl border border-line bg-white p-1.5 shadow-lift"
          >
            {LANGUAGES.map((l) => {
              const active = l.code === lang
              return (
                <li key={l.code}>
                  <button
                    type="button"
                    lang={l.code}
                    onClick={() => { setLang(l.code); setOpen(false) }}
                    aria-pressed={active}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                      active ? 'bg-forest-50 font-semibold text-forest-800' : 'text-ink-soft hover:bg-sand hover:text-ink'
                    }`}
                  >
                    {l.name}
                    {active && <Check className="h-4 w-4" aria-hidden="true" />}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
