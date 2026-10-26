import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SectionHeading from '../components/SectionHeading'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import Photo from '../components/Photo'
import CommitteeCard from '../components/CommitteeCard'
import Icon from '../components/Icon'
import StatCounter from '../components/StatCounter'
import { COMMITTEE, EXTRA_AMENITIES, MILESTONES, VALUES } from '../data/mockData'
import { IMAGES } from '../data/images'
import { yearsOfCommunity } from '../data/site'
import { useI18n } from '../i18n/I18nContext'

export default function About() {
  const { t, list, site } = useI18n()
  const statLabels = t('about.overview.stats')
  return (
    <>
      <PageHeader
        eyebrow={t('about.eyebrow')}
        title={t('about.title')}
        intro={t('about.intro', { legalName: site.legalName, year: site.established, homes: site.homes })}
        image={IMAGES.towerGreen}
        imageAlt={t('about.imgAlt')}
      />

      <section className="py-24 sm:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <span className="eyebrow">{t('about.history.eyebrow')}</span>
            <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">{t('about.history.title')}</h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-soft">
              <p>{t('about.history.p1', { year: site.established })}</p>
              <p>{t('about.history.p2', { years: yearsOfCommunity() })}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ol className="relative border-l border-line pl-8">
              {list('milestones', MILESTONES).map((m) => (
                <li key={m.year} className="relative pb-8 last:pb-0">
                  <span className="absolute -left-[2.38rem] top-1 h-3 w-3 rounded-full border-2 border-ivory bg-gold-500 ring-4 ring-gold-100" aria-hidden="true" />
                  <p className="font-display text-2xl text-forest-700">{m.year}</p>
                  <p className="mt-1 text-ink-soft">{m.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="bg-forest-800 py-24 text-ivory sm:py-28">
        <div className="container-x">
          <SectionHeading tone="light" eyebrow={t('about.mission.eyebrow')} title={t('about.mission.title')} intro={t('about.mission.intro')} />
          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
            {list('values', VALUES).map((v) => (
              <RevealItem key={v.icon} className="bg-forest-800 p-7">
                <Icon name={v.icon} className="h-7 w-7 text-gold-300" strokeWidth={1.4} />
                <h3 className="mt-6 text-xl font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory/70">{v.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="py-24 sm:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <Photo src={IMAGES.gathering} alt={t('about.overview.imgAlt')} className="aspect-[5/4] rounded-[1.75rem]" />
          </Reveal>
          <div>
            <Reveal>
              <span className="eyebrow">{t('about.overview.eyebrow')}</span>
              <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">{t('about.overview.title')}</h2>
            </Reveal>
            <RevealGroup className="mt-10 grid grid-cols-2 gap-6">
              {[
                { v: site.homes, s: '' },
                { v: site.wings, s: '' },
                { v: 420, s: '+' },
                { v: site.amenitiesCount, s: '+' },
              ].map((x, i) => (
                <RevealItem key={i} className="border-t border-line pt-4">
                  <StatCounter value={x.v} suffix={x.s} className="font-display text-5xl text-forest-700" />
                  <p className="mt-1 text-sm text-ink-soft">{statLabels[i]}</p>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal delay={0.1} className="mt-8">
              <p className="text-sm text-ink-muted">{t('about.overview.also')}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {list('extraAmenities', EXTRA_AMENITIES).map((a) => <li key={a} className="rounded-full bg-sand px-3 py-1.5 text-sm text-ink-soft">{a}</li>)}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-sand/60 py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow={t('about.initiatives.eyebrow')} title={t('about.initiatives.title')} />
          <RevealGroup className="mt-12 grid gap-5 md:grid-cols-2">
            {t('about.initiatives.items').map((x, i) => (
              <RevealItem key={i} className="card flex gap-5 p-7">
                <span className="font-display text-3xl text-gold-500">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-lg font-semibold">{x.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-ink-soft">{x.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow={t('about.committee.eyebrow')}
            title={t('about.committee.title')}
            intro={t('about.committee.intro')}
            action={<Link to="/contact" className="btn-outline">{t('about.committee.cta')} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}
          />
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {list('committee', COMMITTEE).map((m, i) => <CommitteeCard key={m.id} member={m} index={i} />)}
          </RevealGroup>
          <p className="mt-6 text-xs text-ink-muted">{t('common.committeeDisclaimer')}</p>
        </div>
      </section>
    </>
  )
}
