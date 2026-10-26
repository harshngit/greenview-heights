import { CalendarDays, Download, FileText } from 'lucide-react'
import Modal from './Modal'
import Badge from './Badge'
import { useI18n } from '../i18n/I18nContext'

export default function NoticeModal({ notice: original, onClose }) {
  const { t, tr, cat, fmt, site } = useI18n()
  const notice = tr('notices', original)
  return (
    <Modal open={!!notice} onClose={onClose} labelledBy="notice-title">
      {notice && (
        <article className="p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-3 pr-12">
            <Badge>{cat(notice.category)}</Badge>
            <span className="inline-flex items-center gap-1.5 text-sm text-ink-muted">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              <time dateTime={notice.date}>{fmt.longDate(notice.date)}</time>
            </span>
          </div>
          <h2 id="notice-title" className="mt-5 font-display text-3xl leading-tight text-ink sm:text-4xl">{notice.title}</h2>
          <div className="mt-6 space-y-4 text-[0.98rem] leading-relaxed text-ink-soft">
            {(notice.body?.length ? notice.body : [notice.excerpt]).map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink-muted">
              {t('noticeModal.byOrder')}<br />
              <span className="font-medium text-ink">{t('noticeModal.secretary', { shortName: site.shortName })}</span>
            </p>
            {notice.attachment ? (
              <a href={notice.attachment.href} download className="btn-primary" data-autofocus>
                <Download className="h-4 w-4" aria-hidden="true" /> {notice.attachment.label}
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 text-sm text-ink-muted">
                <FileText className="h-4 w-4" aria-hidden="true" /> {t('noticeModal.noAttachment')}
              </span>
            )}
          </div>
        </article>
      )}
    </Modal>
  )
}
