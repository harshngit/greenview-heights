import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight, MapPin } from 'lucide-react'
import { IMAGES } from '../data/images'
import { yearsOfCommunity } from '../data/site'
import { useI18n } from '../i18n/I18nContext'
import { EASE } from '../lib/motion'
import { scrollToId } from '../lib/scroll'
import StatCounter from './StatCounter'

const line = {
  hidden: { y: '110%' },
  show: (i) => ({ y: '0%', transition: { duration: 1.1, ease: EASE, delay: 0.25 + i * 0.12 } }),
}

export default function Hero() {
  const { t, site } = useI18n()
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '30%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const [homesLabel, yearsLabel, amenitiesLabel] = t('hero.stats')
  const stats = [
    { value: site.homes, suffix: '', label: homesLabel },
    { value: yearsOfCommunity(), suffix: '+', label: yearsLabel },
    { value: site.amenitiesCount, suffix: '+', label: amenitiesLabel },
  ]

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-forest-900 text-ivory" aria-labelledby="hero-title">
      <motion.div style={{ y: imgY }} className="absolute inset-0 -z-10">
        <motion.img
          src={IMAGES.hero}
          alt={t('hero.imgAlt')}
          className="h-full w-full object-cover"
          initial={{ scale: reduce ? 1 : 1.14 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: EASE }}
          fetchpriority="high"
          onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-900/70 via-forest-900/35 to-forest-900/90" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-900/60 to-transparent" aria-hidden="true" />

      <motion.div style={{ y: textY, opacity: fade }} className="container-x flex flex-1 flex-col justify-center pb-10 pt-32 sm:pt-36">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-ivory/25 bg-ivory/10 px-4 py-1.5 text-xs font-medium tracking-wide text-ivory/90 backdrop-blur-md"
        >
          <MapPin className="h-3.5 w-3.5 text-gold-300" aria-hidden="true" />
          {t('hero.badge', { place: site.placeShort, year: site.established })}
        </motion.p>

        <h1 id="hero-title" className="mt-7 max-w-4xl font-display text-[3.4rem] leading-[0.98] tracking-tight sm:text-7xl lg:text-[6.5rem]">
          {t('hero.lines').map((text, i) => (
            <span key={text} className="block overflow-hidden pb-2">
              <motion.span custom={i} variants={line} initial="hidden" animate="show" className={`block ${i === 1 ? 'italic text-gold-300' : ''}`}>
                {text}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.65 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-ivory/80 sm:text-lg"
        >
          {t('hero.intro', { name: site.name, homes: site.homes })}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.8 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <button type="button" onClick={() => scrollToId('about')} className="btn-light group">
            {t('hero.explore')}
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
          </button>
          <Link to="/notices" className="btn-ghost-light group">
            {t('hero.latest')}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 1 }}
        className="container-x pb-8 sm:pb-10"
      >
        <dl className="grid grid-cols-3 divide-x divide-ivory/15 rounded-2xl border border-ivory/15 bg-forest-900/35 backdrop-blur-xl">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse px-3 py-5 sm:px-8 sm:py-6">
              <dt className="mt-1 text-[0.7rem] leading-snug text-ivory/65 sm:text-sm">{s.label}</dt>
              <dd className="font-display text-3xl leading-none text-ivory sm:text-5xl">
                <StatCounter value={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  )
}
