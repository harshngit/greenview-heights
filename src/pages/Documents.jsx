import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Info, Search } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import DocumentCard from '../components/DocumentCard'
import EmptyState from '../components/EmptyState'
import { DOCUMENT_CATEGORIES } from '../data/mockData'
import { useContent } from '../context/ContentContext'
import { useI18n } from '../i18n/I18nContext'
import { byNewest } from '../lib/format'

export default function Documents() {
  const { documents, getSessionFile } = useContent()
  const { t, tr, cat } = useI18n()
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')

  // Search matches the English title and the title shown in the chosen language.
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return documents
      .filter((d) => (category === 'All' || d.category === category) && (!q || `${d.title} ${tr('documents', d).title}`.toLowerCase().includes(q)))
      .sort(byNewest)
  }, [documents, category, query, tr])

  const grouped = useMemo(() => {
    if (category !== 'All') return [[category, results]]
    return DOCUMENT_CATEGORIES.map((c) => [c, results.filter((d) => d.category === c)]).filter(([, l]) => l.length)
  }, [results, category])

  return (
    <>
      <PageHeader eyebrow={t('documents.eyebrow')} title={t('documents.title')} intro={t('documents.intro')} />

      <section className="py-14 sm:py-20">
        <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr]">
          <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <div className="relative">
              <label htmlFor="doc-search" className="sr-only">{t('documents.searchLabel')}</label>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" aria-hidden="true" />
              <input id="doc-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('documents.placeholder')} className="field !rounded-full !pl-11" />
            </div>
            <nav aria-label={t('documents.catsLabel')} className="mt-6">
              <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible">
                {['All', ...DOCUMENT_CATEGORIES].map((c) => {
                  const n = c === 'All' ? documents.length : documents.filter((d) => d.category === c).length
                  const active = category === c
                  return (
                    <li key={c} className="shrink-0">
                      <button
                        type="button"
                        onClick={() => setCategory(c)}
                        aria-pressed={active}
                        className={`relative isolate flex w-full items-center justify-between gap-4 rounded-full px-4 py-2.5 text-left text-sm font-medium transition-colors lg:rounded-xl ${active ? 'text-forest-800' : 'text-ink-soft hover:bg-sand'}`}
                      >
                        {active && <motion.span layoutId="doc-cat" className="absolute inset-0 -z-10 rounded-full bg-forest-50 lg:rounded-xl" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                        <span className="whitespace-nowrap">{c === 'All' ? t('common.all') : cat(c)}</span>
                        <span className="tabular-nums text-ink-muted">{n}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>
            <p className="mt-6 hidden gap-2 rounded-xl bg-gold-100 p-4 text-xs leading-relaxed text-gold-700 lg:flex">
              <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {t('documents.demoNote')}
            </p>
          </aside>

          <div aria-live="polite" className="min-w-0">
            {grouped.length ? (
              <div className="space-y-12">
                {grouped.map(([group, list]) => (
                  <section key={group} aria-labelledby={`cat-${group}`}>
                    <h2 id={`cat-${group}`} className="flex items-baseline gap-3 font-display text-3xl">
                      {cat(group)} <span className="font-sans text-sm text-ink-muted">{list.length}</span>
                    </h2>
                    <motion.ul layout className="mt-5 space-y-3">
                      <AnimatePresence mode="popLayout">
                        {list.map((d) => <DocumentCard key={d.id} doc={d} sessionFile={getSessionFile(d.id)} />)}
                      </AnimatePresence>
                    </motion.ul>
                  </section>
                ))}
              </div>
            ) : (
              <EmptyState title={t('documents.emptyTitle')} text={t('documents.emptyText')} action={<button type="button" className="btn-outline" onClick={() => { setQuery(''); setCategory('All') }}>{t('documents.showAll')}</button>} />
            )}
          </div>
        </div>
      </section>
    </>
  )
}
