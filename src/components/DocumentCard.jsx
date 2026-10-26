import { motion } from 'framer-motion'
import { Download, Eye, FileText, FileX } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'

export default function DocumentCard({ doc: original, sessionFile }) {
  const { t, tr, cat, fmt } = useI18n()
  const doc = tr('documents', original)
  const href = doc.file || sessionFile?.url
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35 }}
      className="group flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 transition-shadow duration-500 hover:shadow-soft sm:flex-row sm:items-center"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest-50 text-forest-700">
        <FileText className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold leading-snug text-ink">{doc.title}</h3>
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted">
          <span>{cat(doc.category)}</span>
          <span aria-hidden="true">·</span>
          <span>{t('documents.uploaded')} <time dateTime={doc.date}>{fmt.date(doc.date)}</time></span>
          <span aria-hidden="true">·</span>
          <span className="rounded bg-sand px-1.5 py-0.5 font-semibold text-ink-soft">{doc.type ?? 'PDF'}</span>
          {sessionFile && !doc.file && <span className="text-gold-700">{t('documents.sessionOnly')}</span>}
        </p>
      </div>
      {href ? (
        <div className="flex gap-2">
          <a href={href} target="_blank" rel="noopener noreferrer" className="btn-outline !px-4 !py-2" aria-label={t('documents.previewAria', { title: doc.title })}>
            <Eye className="h-4 w-4" aria-hidden="true" /> {t('documents.preview')}
          </a>
          <a href={href} download={sessionFile?.name ?? true} className="btn-primary !px-4 !py-2" aria-label={t('documents.downloadAria', { title: doc.title })}>
            <Download className="h-4 w-4" aria-hidden="true" /> {t('documents.download')}
          </a>
        </div>
      ) : (
        <span className="inline-flex items-center gap-2 rounded-full bg-sand px-4 py-2 text-xs font-medium text-ink-muted">
          <FileX className="h-4 w-4" aria-hidden="true" /> {t('documents.noFile')}
        </span>
      )}
    </motion.li>
  )
}
