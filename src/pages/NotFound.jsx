import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { LogoMark } from '../components/Logo'
import { useI18n } from '../i18n/I18nContext'

export default function NotFound() {
  const { t } = useI18n()
  return (
    <section className="flex min-h-[80vh] items-center pt-24">
      <div className="container-x flex flex-col items-center text-center">
        <motion.div initial={{ rotate: -8, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 12 }}>
          <LogoMark className="h-20 w-20" />
        </motion.div>
        <p className="mt-8 font-display text-8xl text-forest-700">404</p>
        <h1 className="mt-2 text-2xl font-semibold">{t('notFound.title')}</h1>
        <p className="mt-2 text-ink-soft">{t('notFound.text')}</p>
        <Link to="/" className="btn-primary mt-8"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> {t('notFound.back')}</Link>
      </div>
    </section>
  )
}
