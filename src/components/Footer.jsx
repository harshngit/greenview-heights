import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import Logo from './Logo'
import LanguageSwitcher from './LanguageSwitcher'
import { NAV_LINKS } from '../data/site'
import { useI18n } from '../i18n/I18nContext'

export default function Footer() {
  const { t, site } = useI18n()
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-hidden bg-forest-900 text-ivory">
      <div className="container-x relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/70">
            {t('footer.about', { legalName: site.legalName, homes: site.homes, locality: site.locality, year: site.established, tagline: site.tagline })}
          </p>
          <p className="mt-6 inline-flex rounded-full border border-ivory/15 px-3 py-1 text-xs text-ivory/60">
            {t('footer.demo')}
          </p>
          <div className="mt-8">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">{t('lang.label')}</h3>
            <LanguageSwitcher variant="inline" tone="light" className="mt-4" />
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">{t('footer.explore')}</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.to}><Link to={l.to} className="text-ivory/75 transition-colors hover:text-white">{t(`nav.${l.key}`)}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">{t('footer.forResidents')}</h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link to="/notices" className="text-ivory/75 hover:text-white">{t('footer.latestNotices')}</Link></li>
            <li><Link to="/documents" className="text-ivory/75 hover:text-white">{t('footer.documentsForms')}</Link></li>
            <li><Link to="/resources" className="text-ivory/75 hover:text-white">{t('footer.maintenanceBills')}</Link></li>
            <li><Link to="/resources#emergency" className="text-ivory/75 hover:text-white">{t('footer.emergency')}</Link></li>
            <li><Link to="/admin" className="text-ivory/75 hover:text-white">{t('footer.admin')}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">{t('footer.office')}</h3>
          <ul className="mt-5 space-y-4 text-sm text-ivory/75">
            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" /><span>{site.address.line1}<br />{site.address.line2}</span></li>
            <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" /><span>{site.phone}<span className="block text-ivory/45">{t('footer.demoNumber')}</span></span></li>
            <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" /><span className="min-w-0 break-words">{site.email}<span className="block text-ivory/45">{t('footer.demoAddress')}</span></span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-ivory/55 sm:flex-row sm:items-center sm:justify-between">
          <p>{t('footer.rights', { year, legalName: site.legalName })}</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-white">{t('footer.privacy')}</Link>
            <Link to="/terms" className="hover:text-white">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>

      <p aria-hidden="true" className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[11.5vw] leading-[0.85] text-ivory/[0.05]">
        Greenview Heights
      </p>
    </footer>
  )
}
