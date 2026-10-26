import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Check, Mail, MapPin, Phone } from 'lucide-react'
import Hero from '../components/Hero'
import SectionHeading from '../components/SectionHeading'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import Photo from '../components/Photo'
import AmenityCard from '../components/AmenityCard'
import NoticeCard from '../components/NoticeCard'
import NoticeModal from '../components/NoticeModal'
import GalleryGrid from '../components/GalleryGrid'
import Lightbox from '../components/Lightbox'
import CommitteeCard from '../components/CommitteeCard'
import EventCard from '../components/EventCard'
import ContactForm from '../components/ContactForm'
import Icon from '../components/Icon'
import { AMENITIES, COMMITTEE, EVENTS, VALUES } from '../data/mockData'
import { IMAGES } from '../data/images'
import { useContent } from '../context/ContentContext'
import { Rich, useI18n } from '../i18n/I18nContext'
import { byNewest, todayISO } from '../lib/format'

// Text for these cards is in home.resources.items, in the same order.
const RESOURCES = [
  { icon: 'FileText', to: '/documents' },
  { icon: 'BookOpen', to: '/resources#rules' },
  { icon: 'Wallet', to: '/resources#maintenance' },
  { icon: 'Siren', to: '/resources#emergency' },
  { icon: 'MessageSquareText', to: '/contact' },
]

function About() {
  const { t, list, site } = useI18n()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['-4%', '6%'])
  return (
    <section id="about" className="scroll-mt-20 py-24 sm:py-32" aria-labelledby="about-title">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <Reveal className="relative">
          <div className="relative overflow-hidden rounded-[1.75rem]">
            <motion.div style={{ y }} className="scale-110">
              <Photo src={IMAGES.about} alt={t('home.about.imgAlt')} className="aspect-[4/5]" />
            </motion.div>
          </div>
          <div className="absolute -bottom-8 right-4 w-56 rounded-2xl border border-line bg-ivory p-5 shadow-lift sm:-right-8 sm:w-64">
            <p className="font-display text-5xl leading-none text-forest-700">{site.wings}</p>
            <p className="mt-2 text-sm text-ink-soft">{t('home.about.wings')}</p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="eyebrow">{t('home.about.eyebrow')}</span>
            <h2 id="about-title" className="mt-4 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
              <Rich text={t('home.about.title')} />
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              {t('home.about.body', { year: site.established, name: site.name, homes: site.homes })}
            </p>
          </Reveal>
          <RevealGroup className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {list('values', VALUES).map((v) => (
              <RevealItem key={v.icon} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-forest-200 text-forest-700">
                  <Icon name={v.icon} className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{v.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{v.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.1} className="mt-10">
            <Link to="/about" className="link-arrow group text-base">
              {t('home.about.cta')} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const { t, list, site } = useI18n()
  const { notices, gallery } = useContent()
  const [openNotice, setOpenNotice] = useState(null)
  const [photoId, setPhotoId] = useState(null)

  const latest = useMemo(() => {
    const pinned = notices.filter((n) => n.pinned).sort(byNewest)
    const rest = notices.filter((n) => !n.pinned).sort(byNewest)
    return [...pinned, ...rest].slice(0, 4)
  }, [notices])

  const upcoming = useMemo(() => {
    const today = todayISO()
    const future = EVENTS.filter((e) => e.date >= today)
    return (future.length ? future : EVENTS).slice(0, 4)
  }, [])

  const galleryPreview = gallery.slice(0, 8)
  const resourceText = t('home.resources.items')

  return (
    <>
      <Hero />
      <About />

      {/* Facilities */}
      <section className="bg-sand/60 py-24 sm:py-32" aria-labelledby="facilities-title">
        <div className="container-x">
          <SectionHeading
            id="facilities-title"
            eyebrow={t('home.facilities.eyebrow')}
            title={t('home.facilities.title')}
            intro={t('home.facilities.intro')}
            action={<Link to="/facilities" className="btn-outline">{t('home.facilities.cta')} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}
          />
          <RevealGroup className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {list('amenities', AMENITIES).map((a, i) => <AmenityCard key={a.id} amenity={a} index={i} />)}
          </RevealGroup>
        </div>
      </section>

      {/* Notices */}
      <section id="notices" className="py-24 sm:py-32" aria-labelledby="notices-title">
        <div className="container-x">
          <SectionHeading
            id="notices-title"
            eyebrow={t('home.notices.eyebrow')}
            title={t('home.notices.title')}
            intro={t('home.notices.intro')}
            action={<Link to="/notices" className="btn-outline">{t('home.notices.cta')} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}
          />
          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {latest.map((n) => <NoticeCard key={n.id} notice={n} onOpen={setOpenNotice} />)}
          </RevealGroup>
        </div>
      </section>

      {/* Events */}
      <section className="relative overflow-hidden bg-forest-800 py-24 text-ivory sm:py-32" aria-labelledby="events-title">
        <div className="container-x grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              id="events-title"
              tone="light"
              eyebrow={t('home.events.eyebrow')}
              title={t('home.events.title')}
              intro={t('home.events.intro')}
            />
            <Reveal delay={0.15} className="mt-10 hidden lg:block">
              <Photo src={IMAGES.lights} alt={t('home.events.imgAlt')} className="aspect-[4/3] rounded-2xl" />
            </Reveal>
          </div>
          <RevealGroup as="ul" className="border-t border-ivory/12">
            {list('events', upcoming).map((e) => (
              <EventCard key={e.id} event={e} onNotice={(id) => setOpenNotice(notices.find((n) => n.id === id) ?? null)} />
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 sm:py-32" aria-labelledby="gallery-title">
        <div className="container-x">
          <SectionHeading
            id="gallery-title"
            eyebrow={t('home.gallery.eyebrow')}
            title={t('home.gallery.title')}
            intro={t('home.gallery.intro')}
            action={<Link to="/gallery" className="btn-outline">{t('home.gallery.cta')} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}
          />
          <Reveal className="mt-14">
            <GalleryGrid items={galleryPreview} onOpen={setPhotoId} />
          </Reveal>
        </div>
      </section>

      {/* Committee */}
      <section className="bg-sand/60 py-24 sm:py-32" aria-labelledby="committee-title">
        <div className="container-x">
          <SectionHeading
            id="committee-title"
            eyebrow={t('home.committee.eyebrow')}
            title={t('home.committee.title')}
            intro={t('home.committee.intro')}
          />
          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {list('committee', COMMITTEE).map((m, i) => <CommitteeCard key={m.id} member={m} index={i} />)}
          </RevealGroup>
          <p className="mt-6 text-xs text-ink-muted">{t('common.committeeDisclaimer')}</p>
        </div>
      </section>

      {/* Quick resources */}
      <section className="py-24 sm:py-32" aria-labelledby="resources-title">
        <div className="container-x">
          <SectionHeading id="resources-title" eyebrow={t('home.resources.eyebrow')} title={t('home.resources.title')} align="center" />
          <RevealGroup as="ul" className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {RESOURCES.map((r, i) => (
              <RevealItem as="li" key={r.to}>
                <Link
                  to={r.to}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-forest-200 hover:shadow-lift"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-50 text-forest-700 transition-colors duration-500 group-hover:bg-forest-700 group-hover:text-ivory">
                    <Icon name={r.icon} className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-6 font-semibold text-ink">{resourceText[i].title}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-soft">{resourceText[i].text}</p>
                  <ArrowUpRight className="mt-5 h-5 w-5 text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-forest-700" aria-hidden="true" />
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-line bg-white py-24 sm:py-32" aria-labelledby="contact-title">
        <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              id="contact-title"
              eyebrow={t('home.contact.eyebrow')}
              title={t('home.contact.title')}
              intro={t('home.contact.intro')}
            />
            <RevealGroup as="ul" className="mt-10 space-y-5">
              {[
                { icon: MapPin, label: t('home.contact.office'), value: `${site.address.line1}, ${site.address.line2}` },
                { icon: Phone, label: t('home.contact.phone'), value: site.phone },
                { icon: Mail, label: t('home.contact.email'), value: site.email },
              ].map(({ icon: I, label, value }) => (
                <RevealItem as="li" key={label} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-700">
                    <I className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">{label}</span>
                    <span className="mt-0.5 block break-words text-ink">{value}</span>
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal delay={0.1} className="mt-8">
              <ul className="space-y-2 text-sm text-ink-soft">
                {site.officeHours.map((h) => (
                  <li key={h.days} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest-500" aria-hidden="true" />
                    <span><span className="font-medium text-ink">{h.days}:</span> {h.time}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ContactForm compact />
            <button type="button" onClick={() => navigate('/contact')} className="link-arrow mt-5">
              {t('home.contact.more')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </Reveal>
        </div>
      </section>

      <NoticeModal notice={openNotice} onClose={() => setOpenNotice(null)} />
      <Lightbox items={galleryPreview} activeId={photoId} onChange={setPhotoId} onClose={() => setPhotoId(null)} />
    </>
  )
}
