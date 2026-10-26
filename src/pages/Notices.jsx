import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import NoticeCard from '../components/NoticeCard'
import NoticeModal from '../components/NoticeModal'
import EmptyState from '../components/EmptyState'
import { NOTICE_CATEGORIES } from '../data/mockData'
import { useContent } from '../context/ContentContext'
import { useI18n } from '../i18n/I18nContext'
import { byNewest } from '../lib/format'

function Skeleton() {
  return (
    <div className="card animate-pulse p-6" aria-hidden="true">
      <div className="h-5 w-24 rounded-full bg-sand" />
      <div className="mt-5 h-5 w-3/4 rounded bg-sand" />
      <div className="mt-3 h-3 w-full rounded bg-sand" />
      <div className="mt-2 h-3 w-5/6 rounded bg-sand" />
      <div className="mt-8 h-3 w-1/3 rounded bg-sand" />
    </div>
  )
}

export default function Notices() {
  const { notices } = useContent()
  const { t, tr, cat } = useI18n()
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [category, setCategory] = useState(params.get('category') ?? 'All')
  const [sort, setSort] = useState('newest')
  const [loading, setLoading] = useState(true)

  // Brief loading state, as a live site would show while fetching.
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450)
    return () => clearTimeout(t)
  }, [])

  const openId = params.get('notice')
  const openNotice = notices.find((n) => n.id === openId) ?? null
  const setOpen = (n) => {
    const next = new URLSearchParams(params)
    if (n) next.set('notice', n.id)
    else next.delete('notice')
    setParams(next, { replace: true })
  }

  const counts = useMemo(() => {
    const c = { All: notices.length }
    notices.forEach((n) => { c[n.category] = (c[n.category] ?? 0) + 1 })
    return c
  }, [notices])

  // Search matches the English text and the text shown in the chosen language.
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const text = (n) => [n.title, n.excerpt, ...(n.body ?? []), cat(n.category)].join(' ')
    const list = notices.filter(
      (n) =>
        (category === 'All' || n.category === category) &&
        (!q || `${text(n)} ${text(tr('notices', n))}`.toLowerCase().includes(q)),
    )
    list.sort(byNewest)
    if (sort === 'oldest') list.reverse()
    return list
  }, [notices, query, category, sort, tr, cat])

  const clear = () => { setQuery(''); setCategory('All') }

  return (
    <>
      <PageHeader eyebrow={t('notices.eyebrow')} title={t('notices.title')} intro={t('notices.intro')} />

      <section className="py-14 sm:py-20">
        <div className="container-x">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <label htmlFor="notice-search" className="sr-only">{t('notices.searchLabel')}</label>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" aria-hidden="true" />
              <input
                id="notice-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('notices.placeholder')}
                className="field !rounded-full !pl-11 !pr-11"
              />
              {query && (
                <button type="button" onClick={() => setQuery('')} className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-ink-muted hover:bg-sand" aria-label={t('notices.clearSearch')}>
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="notice-sort" className="text-sm text-ink-muted">{t('notices.sort')}</label>
              <select id="notice-sort" value={sort} onChange={(e) => setSort(e.target.value)} className="field !w-auto !rounded-full !py-2.5">
                <option value="newest">{t('notices.newest')}</option>
                <option value="oldest">{t('notices.oldest')}</option>
              </select>
            </div>
          </div>

          <div className="-mx-5 mt-6 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0" role="group" aria-label={t('notices.filterLabel')}>
            <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
              {['All', ...NOTICE_CATEGORIES].map((c) => (
                <button key={c} type="button" onClick={() => setCategory(c)} aria-pressed={category === c} className={`chip whitespace-nowrap ${category === c ? 'chip-active' : ''}`}>
                  {c === 'All' ? t('common.all') : cat(c)} <span className="ml-1 tabular-nums opacity-60">{counts[c] ?? 0}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="mt-6 text-sm text-ink-muted" aria-live="polite">
            {loading ? t('notices.loading') : t('notices.showing', { shown: results.length, total: notices.length })}
          </p>

          <div className="mt-6">
            {loading ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{[0, 1, 2].map((i) => <Skeleton key={i} />)}</div>
            ) : results.length ? (
              <motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {results.map((n) => <NoticeCard key={n.id} notice={n} onOpen={setOpen} layout />)}
                </AnimatePresence>
              </motion.div>
            ) : (
              <EmptyState
                title={t('notices.emptyTitle')}
                text={t('notices.emptyText', {
                  forQuery: query ? t('notices.emptyFor', { query }) : '',
                  inCategory: category !== 'All' ? t('notices.emptyIn', { category: cat(category) }) : '',
                })}
                action={<button type="button" onClick={clear} className="btn-outline">{t('notices.clearFilters')}</button>}
              />
            )}
          </div>
        </div>
      </section>

      <NoticeModal notice={openNotice} onClose={() => setOpen(null)} />
    </>
  )
}
