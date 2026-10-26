import PageHeader from '../components/PageHeader'
import { useI18n } from '../i18n/I18nContext'

// kind is "privacy" or "terms"; the text lives in legal.<kind> in src/i18n.
export default function Legal({ kind }) {
  const { t, site } = useI18n()
  const page = t(`legal.${kind}`, { legalName: site.legalName, email: site.email })
  return (
    <>
      <PageHeader eyebrow={page.title} title={page.title} intro={t('legal.updated', { legalName: site.legalName })} />
      <section className="py-14 sm:py-20">
        <div className="container-x max-w-3xl space-y-10">
          {page.sections.map(([h, p]) => (
            <div key={h}>
              <h2 className="font-display text-3xl">{h}</h2>
              <p className="mt-3 text-lg leading-relaxed text-ink-soft">{p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
