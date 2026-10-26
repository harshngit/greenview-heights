import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import GalleryGrid from '../components/GalleryGrid'
import Lightbox from '../components/Lightbox'
import EmptyState from '../components/EmptyState'
import { GALLERY_CATEGORIES } from '../data/mockData'
import { useContent } from '../context/ContentContext'
import { useI18n } from '../i18n/I18nContext'

export default function Gallery() {
  const { gallery } = useContent()
  const { t, cat } = useI18n()
  const [category, setCategory] = useState('All')
  const [active, setActive] = useState(null)
  const items = useMemo(() => (category === 'All' ? gallery : gallery.filter((g) => g.category === category)), [gallery, category])

  return (
    <>
      <PageHeader eyebrow={t('gallery.eyebrow')} title={t('gallery.title')} intro={t('gallery.intro')} />
      <section className="py-14 sm:py-20">
        <div className="container-x">
          <div className="flex flex-wrap gap-2" role="group" aria-label={t('gallery.filterLabel')}>
            {['All', ...GALLERY_CATEGORIES].map((c) => (
              <button key={c} type="button" onClick={() => setCategory(c)} aria-pressed={category === c} className="chip relative isolate">
                {category === c && <motion.span layoutId="gallery-chip" className="absolute inset-0 -z-10 rounded-full bg-forest-700" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                <span className={category === c ? 'text-ivory' : ''}>{c === 'All' ? t('common.all') : cat(c)}</span>
              </button>
            ))}
          </div>
          <p className="mt-5 text-sm text-ink-muted" aria-live="polite">{t('gallery.count', { n: items.length })}</p>
          <div className="mt-6">
            {items.length ? <GalleryGrid items={items} onOpen={setActive} /> : <EmptyState title={t('gallery.empty')} />}
          </div>
        </div>
      </section>
      <Lightbox items={items} activeId={active} onChange={setActive} onClose={() => setActive(null)} />
    </>
  )
}
