import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import { EASE } from '../lib/motion'

export default function Lightbox({ items, activeId, onChange, onClose }) {
  const { t, tr, cat } = useI18n()
  const index = items.findIndex((i) => i.id === activeId)
  const item = index >= 0 ? tr('gallery', items[index]) : null
  const closeRef = useRef(null)
  const direction = useRef(0)

  const go = useCallback(
    (step) => {
      if (!items.length) return
      direction.current = step
      onChange(items[(index + step + items.length) % items.length].id)
    },
    [index, items, onChange],
  )

  const itemId = item?.id
  useEffect(() => {
    if (!itemId) return
    const prev = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      prev?.focus?.()
    }
  }, [itemId, go, onClose])

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t('lightbox.aria', { i: index + 1, n: items.length, caption: item.caption })}
          className="fixed inset-0 z-[70] flex flex-col bg-forest-900/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
        >
          <div className="flex items-center justify-between px-4 py-4 text-ivory sm:px-8">
            <p className="text-sm tabular-nums text-ivory/70">{index + 1} / {items.length}</p>
            <button ref={closeRef} type="button" onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-full bg-ivory/10 transition-colors hover:bg-ivory/20" aria-label={t('lightbox.close')}>
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20" onClick={onClose}>
            <AnimatePresence mode="popLayout" initial={false} custom={direction.current}>
              <motion.figure
                key={item.id}
                custom={direction.current}
                variants={{
                  enter: (d) => ({ opacity: 0, x: d * 60 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d) => ({ opacity: 0, x: d * -60 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: EASE }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1)
                  else if (info.offset.x > 80) go(-1)
                }}
                className="flex max-h-full max-w-5xl flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.img
                  layoutId={`photo-${item.id}`}
                  src={item.src}
                  alt={item.alt}
                  draggable={false}
                  className="max-h-[72vh] w-auto max-w-full rounded-xl object-contain shadow-lift"
                />
                <figcaption className="mt-4 text-center text-ivory">
                  <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold-300">{cat(item.category)}</span>
                  <span className="mt-1 block text-base">{item.caption}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            <button type="button" onClick={(e) => { e.stopPropagation(); go(-1) }} className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/10 text-ivory transition-colors hover:bg-ivory/20 sm:left-6" aria-label={t('lightbox.prev')}>
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); go(1) }} className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/10 text-ivory transition-colors hover:bg-ivory/20 sm:right-6" aria-label={t('lightbox.next')}>
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <p className="pb-5 text-center text-xs text-ivory/45">{t('lightbox.hint')}</p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
