import { Link } from 'react-router-dom'
import { SITE } from '../data/site'
import { useI18n } from '../i18n/I18nContext'

// Two offset gables over a shared ground line: homes standing together.
export function LogoMark({ className = 'h-10 w-10', tone = 'dark' }) {
  const roof = tone === 'dark' ? '#1f4a37' : '#faf8f3'
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" fill="none">
      <rect x="0.75" y="0.75" width="46.5" height="46.5" rx="12" stroke={roof} strokeOpacity="0.18" strokeWidth="1.5" />
      <path d="M10 36V22.5l8.5-6 8.5 6V36" stroke={roof} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M22 36V16l8-5.6L38 16v20" stroke="#b8965a" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M16 36v-6h5v6" stroke={roof} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M28.5 21h3M28.5 26h3" stroke="#b8965a" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M7 36h34" stroke={roof} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

// The wordmark stays in English in every language, like a brand logo;
// the line beneath it and the accessible name follow the language.
export default function Logo({ tone = 'dark', onClick }) {
  const { t, site } = useI18n()
  const text = tone === 'dark' ? 'text-ink' : 'text-ivory'
  const sub = tone === 'dark' ? 'text-ink-muted' : 'text-ivory/70'
  return (
    <Link to="/" onClick={onClick} className="group flex items-center gap-3" aria-label={t('logo.aria', { name: site.legalName })}>
      <LogoMark tone={tone} className="h-10 w-10 shrink-0 transition-transform duration-500 group-hover:-translate-y-0.5" />
      <span className="leading-none">
        <span className={`block font-display text-[1.45rem] tracking-tight ${text}`}>{SITE.name}</span>
        <span className={`mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.2em] ${sub}`}>{t('logo.sub')}</span>
      </span>
    </Link>
  )
}
