import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CalendarCheck, Clock } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Reveal, { RevealGroup } from '../components/Reveal'
import Photo from '../components/Photo'
import Icon from '../components/Icon'
import AmenityCard from '../components/AmenityCard'
import { AMENITIES, EXTRA_AMENITIES } from '../data/mockData'
import { IMAGES } from '../data/images'
import { useI18n } from '../i18n/I18nContext'

export default function Facilities() {
  const { t, list } = useI18n()
  const [first, ...rest] = list('amenities', AMENITIES)
  return (
    <>
      <PageHeader
        eyebrow={t('facilities.eyebrow')}
        title={t('facilities.title')}
        intro={t('facilities.intro')}
        image={IMAGES.garden}
        imageAlt={t('facilities.imgAlt')}
      />

      <section className="py-20 sm:py-24">
        <div className="container-x space-y-20">
          {[first, rest[0], rest[1]].map((a, i) => (
            <div key={a.id} className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              <Reveal>
                <motion.div whileHover={{ scale: 0.99 }} transition={{ duration: 0.5 }}>
                  <Photo src={a.image} alt={a.title} className="aspect-[4/3] rounded-[1.75rem]" />
                </motion.div>
              </Reveal>
              <Reveal delay={0.1}>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-50 text-forest-700">
                  <Icon name={a.icon} className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">{a.title}</h2>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-soft">{a.text}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sand/60 py-20 sm:py-24">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow">{t('facilities.more.eyebrow')}</span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">{t('facilities.more.title')}</h2>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.slice(2).map((a, i) => <AmenityCard key={a.id} amenity={a} index={i + 3} variant="compact" />)}
          </RevealGroup>
          <Reveal className="mt-8 flex flex-wrap gap-2">
            {list('extraAmenities', EXTRA_AMENITIES).map((x) => <span key={x} className="rounded-full border border-line bg-white px-3 py-1.5 text-sm text-ink-soft">{x}</span>)}
          </Reveal>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <span className="eyebrow">{t('facilities.timings.eyebrow')}</span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">{t('facilities.timings.title')}</h2>
            <p className="mt-4 text-ink-soft">{t('facilities.timings.text')}</p>
            <Link to="/contact" className="btn-primary mt-8"><CalendarCheck className="h-4 w-4" aria-hidden="true" /> {t('facilities.timings.cta')}</Link>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="divide-y divide-line rounded-2xl border border-line bg-white">
              {t('facilities.timings.items').map((x) => (
                <li key={x.place} className="flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold">{x.place}</p>
                    <p className="text-sm text-ink-muted">{x.note}</p>
                  </div>
                  <p className="inline-flex items-center gap-2 text-sm font-medium text-forest-700"><Clock className="h-4 w-4" aria-hidden="true" />{x.time}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  )
}
