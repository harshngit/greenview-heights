import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, BookOpen, FileText, MessageSquareText, Phone, Siren, Wallet } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import { EMERGENCY_CONTACTS, HOUSE_RULES, MAINTENANCE_INFO } from '../data/mockData'
import { useI18n } from '../i18n/I18nContext'
import { scrollToId } from '../lib/scroll'

const JUMP = [
  { id: 'maintenance', icon: Wallet },
  { id: 'emergency', icon: Siren },
  { id: 'rules', icon: BookOpen },
]

export default function Resources() {
  const { t, list } = useI18n()
  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    const timer = setTimeout(() => scrollToId(hash.slice(1)), 350)
    return () => clearTimeout(timer)
  }, [hash])

  return (
    <>
      <PageHeader eyebrow={t('resources.eyebrow')} title={t('resources.title')} intro={t('resources.intro')}>
        <div className="mt-8 flex flex-wrap gap-2">
          {JUMP.map(({ id, icon: I }) => (
            <button key={id} type="button" onClick={() => scrollToId(id)} className="chip inline-flex items-center gap-2">
              <I className="h-4 w-4" aria-hidden="true" /> {t(`resources.jump.${id}`)}
            </button>
          ))}
        </div>
      </PageHeader>

      <section id="maintenance" className="scroll-mt-24 py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <span className="eyebrow">{t('resources.maintenance.eyebrow')}</span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">{t('resources.maintenance.title')}</h2>
            <p className="mt-4 text-ink-soft">{t('resources.maintenance.text')}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="divide-y divide-line rounded-2xl border border-line bg-white">
              {list('maintenance', MAINTENANCE_INFO).map((m) => (
                <div key={m.label} className="grid gap-1 p-5 sm:grid-cols-[180px_1fr]">
                  <dt className="text-sm font-semibold text-ink">{m.label}</dt>
                  <dd className="text-ink-soft">{m.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section id="emergency" className="scroll-mt-24 bg-forest-800 py-16 text-ivory sm:py-20">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow text-gold-300">{t('resources.emergency.eyebrow')}</span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">{t('resources.emergency.title')}</h2>
            <p className="mt-3 text-ivory/70">{t('resources.emergency.text')}</p>
          </Reveal>
          <RevealGroup as="ul" className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {list('emergency', EMERGENCY_CONTACTS).map((c) => (
              <RevealItem as="li" key={c.label} className="flex items-center gap-4 rounded-2xl border border-ivory/12 bg-ivory/5 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ivory/10 text-gold-300"><Phone className="h-5 w-5" aria-hidden="true" /></span>
                <div>
                  <p className="text-sm text-ivory/70">{c.label}</p>
                  <p className="font-display text-2xl">{c.value}</p>
                  <p className="text-xs text-ivory/50">{c.note}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section id="rules" className="scroll-mt-24 py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <span className="eyebrow">{t('resources.rules.eyebrow')}</span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">{t('resources.rules.title')}</h2>
            <p className="mt-4 text-ink-soft">{t('resources.rules.text')}</p>
            <Link to="/documents" className="btn-primary mt-8"><FileText className="h-4 w-4" aria-hidden="true" /> {t('resources.rules.cta')}</Link>
          </Reveal>
          <RevealGroup as="ol" className="space-y-3">
            {list('houseRules', HOUSE_RULES).map((r, i) => (
              <RevealItem as="li" key={i} className="card flex gap-4 p-5">
                <span className="font-display text-2xl text-gold-500">{i + 1}</span>
                <p className="text-ink-soft">{r}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          <Reveal className="flex flex-col items-start gap-6 rounded-3xl bg-sand p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl">{t('resources.help.title')}</h2>
              <p className="mt-2 text-ink-soft">{t('resources.help.text')}</p>
            </div>
            <Link to="/contact" className="btn-primary"><MessageSquareText className="h-4 w-4" aria-hidden="true" /> {t('resources.help.cta')} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
