import { motion } from 'framer-motion'
import { ArrowRight, CalendarDays, Paperclip, Pin } from 'lucide-react'
import Badge from './Badge'
import { useI18n } from '../i18n/I18nContext'
import { fadeUp } from '../lib/motion'

export default function NoticeCard({ notice, onOpen, layout = false }) {
  const { t, tr, cat, fmt } = useI18n()
  const n = tr('notices', notice)
  return (
    <motion.article
      layout={layout}
      variants={fadeUp}
      initial={layout ? { opacity: 0, y: 16 } : undefined}
      animate={layout ? { opacity: 1, y: 0 } : undefined}
      exit={layout ? { opacity: 0, scale: 0.97 } : undefined}
      className="group card flex h-full flex-col p-6 transition-[box-shadow,transform] duration-500 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge>{cat(n.category)}</Badge>
        {n.pinned && (
          <span className="inline-flex items-center gap-1 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-gold-700">
            <Pin className="h-3 w-3" aria-hidden="true" /> {t('noticeCard.pinned')}
          </span>
        )}
      </div>
      <h3 className="mt-5 text-lg font-semibold leading-snug text-ink">{n.title}</h3>
      <div className="mt-2.5 flex-1">
        <p className="line-clamp-3 text-sm leading-relaxed text-ink-soft">{n.excerpt}</p>
      </div>
      <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-4">
        <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
          <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
          <time dateTime={n.date}>{fmt.date(n.date)}</time>
          {n.attachment && <Paperclip className="ml-1 h-3.5 w-3.5" aria-label={t('noticeCard.hasAttachment')} />}
        </span>
        <button type="button" onClick={() => onOpen(notice)} className="link-arrow" aria-label={t('noticeCard.readAria', { title: n.title })}>
          {t('noticeCard.read')} <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </button>
      </div>
    </motion.article>
  )
}
