import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { EASE } from '../lib/motion'
import Photo from './Photo'
import { Rich, useI18n } from '../i18n/I18nContext'

// Inner-page header: breadcrumb, title and an optional photo band.
// A string title may mark its accent words with *asterisks*.
export default function PageHeader({ eyebrow, title, intro, image, imageAlt, children }) {
  const { t } = useI18n()
  return (
    <header className="relative overflow-hidden border-b border-line bg-sand/60 pt-32 sm:pt-36">
      <div className="container-x relative pb-14 sm:pb-16">
        <nav aria-label={t('common.breadcrumb')} className="mb-8 flex items-center gap-1.5 text-sm text-ink-muted">
          <Link to="/" className="hover:text-forest-700">{t('common.home')}</Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="text-ink">{eyebrow}</span>
        </nav>
        <div className={`grid gap-10 ${image ? 'lg:grid-cols-[1.1fr_0.9fr] lg:items-end' : ''}`}>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="font-display text-5xl leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl"
            >
              {typeof title === 'string' ? <Rich text={title} /> : title}
            </motion.h1>
            {intro && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
                className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft"
              >
                {intro}
              </motion.p>
            )}
            {children}
          </div>
          {image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97, clipPath: 'inset(12% 0% 0% 0% round 24px)' }}
              animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0% round 24px)' }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
              className="hidden lg:block"
            >
              <Photo src={image} alt={imageAlt} loading="eager" className="aspect-[4/3] rounded-3xl" />
            </motion.div>
          )}
        </div>
      </div>
    </header>
  )
}
