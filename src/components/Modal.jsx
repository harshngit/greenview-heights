import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import { EASE } from '../lib/motion'

// Accessible dialog: Escape closes, focus moves in and is restored, page scroll is locked.
export default function Modal({ open, onClose, labelledBy, children, size = 'max-w-2xl' }) {
  const { t } = useI18n()
  const panel = useRef(null)
  const lastFocus = useRef(null)

  useEffect(() => {
    if (!open) return
    lastFocus.current = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => panel.current?.querySelector('[data-autofocus], button, a, input')?.focus(), 50)
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && panel.current) {
        const items = panel.current.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])')
        if (!items.length) return
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      lastFocus.current?.focus?.()
    }
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="absolute inset-0 bg-forest-900/55 backdrop-blur-[2px]" onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE } }}
            exit={{ opacity: 0, y: 24, scale: 0.98, transition: { duration: 0.2 } }}
            className={`relative max-h-[92vh] w-full ${size} overflow-y-auto rounded-t-3xl bg-ivory shadow-lift sm:rounded-3xl`}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink shadow-soft transition-colors hover:bg-sand"
              aria-label={t('common.close')}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
