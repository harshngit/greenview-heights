import { Clock, ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import ContactForm from '../components/ContactForm'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import { useI18n } from '../i18n/I18nContext'

export default function Contact() {
  const { t, site } = useI18n()
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`
  return (
    <>
      <PageHeader eyebrow={t('contact.eyebrow')} title={t('contact.title')} intro={t('contact.intro')} />
      <section className="py-14 sm:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-6">
            <RevealGroup className="grid gap-4">
              {[
                { icon: MapPin, label: t('contact.address'), lines: [site.address.line1, site.address.line2, site.address.state] },
                { icon: Phone, label: t('contact.phone'), lines: [site.phone, t('contact.demoNumber')] },
                { icon: Mail, label: t('contact.email'), lines: [site.email, t('contact.demoAddress')] },
              ].map(({ icon: I, label, lines }) => (
                <RevealItem key={label} className="card flex gap-4 p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-700"><I className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" /></span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">{label}</p>
                    {lines.map((l, i) => <p key={l} className={`break-words ${i ? 'text-sm text-ink-muted' : 'mt-1 text-ink'}`}>{l}</p>)}
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal className="card p-5">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted"><Clock className="h-4 w-4" aria-hidden="true" /> {t('contact.officeHours')}</p>
              <dl className="mt-3 divide-y divide-line">
                {site.officeHours.map((h) => (
                  <div key={h.days} className="flex flex-col gap-0.5 py-2.5 text-sm sm:flex-row sm:justify-between">
                    <dt className="font-medium text-ink">{h.days}</dt>
                    <dd className="text-ink-soft">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal className="relative overflow-hidden rounded-2xl border border-line bg-forest-50">
              <svg viewBox="0 0 400 220" className="h-56 w-full" role="img" aria-label={t('contact.mapAria')}>
                <rect width="400" height="220" fill="#eef3ef" />
                <path d="M-10 160 C 80 120, 140 190, 230 140 S 360 90, 420 120" stroke="#dbe7df" strokeWidth="26" fill="none" />
                <ellipse cx="300" cy="70" rx="70" ry="38" fill="#b5cdbd" opacity=".55" />
                <text x="300" y="74" textAnchor="middle" fontSize="11" fill="#275a44" fontFamily="Manrope, 'Noto Sans Devanagari', sans-serif">{t('contact.lake')}</text>
                <path d="M0 60 H400 M0 110 H400 M90 0 V220 M200 0 V220" stroke="#fff" strokeWidth="6" />
                <g transform="translate(170 98)">
                  <circle r="26" fill="#1f4a37" opacity=".12" />
                  <path d="M0 -20 C 11 -20 18 -12 18 -3 C 18 10 0 24 0 24 C 0 24 -18 10 -18 -3 C -18 -12 -11 -20 0 -20 Z" fill="#1f4a37" />
                  <circle cy="-4" r="6" fill="#faf8f3" />
                </g>
              </svg>
              <div className="flex flex-col gap-3 border-t border-line bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-ink-soft">{t('contact.mapNote')}</p>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline !px-4 !py-2 shrink-0">
                  {t('contact.openMaps')} <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl">{t('contact.formTitle')}</h2>
            <p className="mt-2 mb-6 text-ink-soft">{t('contact.formIntro')}</p>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}
