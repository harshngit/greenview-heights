import { AnimatePresence, motion } from 'framer-motion'
import { Expand } from 'lucide-react'
import Photo from './Photo'
import { useI18n } from '../i18n/I18nContext'

const SPAN = {
  tall: 'row-span-2',
  wide: 'col-span-2',
  square: '',
}

// Editorial grid with mixed tile sizes; animates when filters change.
export default function GalleryGrid({ items, onOpen, limit }) {
  const { t, tr, cat } = useI18n()
  const list = (limit ? items.slice(0, limit) : items).map((g) => tr('gallery', g))
  return (
    <motion.ul layout className="grid auto-rows-[200px] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 lg:grid-cols-4">
      <AnimatePresence mode="popLayout">
        {list.map((item, i) => (
          <motion.li
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, delay: Math.min(i, 8) * 0.04, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
            className={SPAN[item.shape] ?? ''}
          >
            <button
              type="button"
              onClick={() => onOpen(item.id)}
              className="group relative block h-full w-full overflow-hidden rounded-2xl text-left"
              aria-label={t('gallery.openPhoto', { caption: item.caption })}
            >
              <motion.div layoutId={`photo-${item.id}`} className="h-full w-full">
                <Photo src={item.src} alt={item.alt} className="h-full w-full" imgClassName="transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]" />
              </motion.div>
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-900/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-ivory opacity-0 transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span>
                  <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gold-300">{cat(item.category)}</span>
                  <span className="mt-0.5 block text-sm font-medium">{item.caption}</span>
                </span>
                <Expand className="h-4 w-4 shrink-0" aria-hidden="true" />
              </span>
            </button>
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  )
}
