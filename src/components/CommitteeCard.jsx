import { motion } from 'framer-motion'
import { useI18n } from '../i18n/I18nContext'
import { fadeUp } from '../lib/motion'

// Monogram portraits keep the demo honest: these are placeholder people.
// `member` arrives already translated (see list('committee', …)).
export default function CommitteeCard({ member, index }) {
  const { t } = useI18n()
  const tones = ['bg-forest-700 text-ivory', 'bg-gold-100 text-gold-700', 'bg-sand text-forest-800', 'bg-forest-100 text-forest-800']
  return (
    <motion.article variants={fadeUp} className="group card overflow-hidden">
      <div className={`relative flex aspect-[5/4] items-end justify-between overflow-hidden p-5 ${tones[index % tones.length]}`}>
        <span className="font-display text-[5.5rem] leading-none tracking-tight transition-transform duration-700 group-hover:-translate-y-1">{member.initials}</span>
        <svg viewBox="0 0 80 80" className="absolute -right-6 -top-6 h-32 w-32 opacity-15" aria-hidden="true">
          <path d="M8 72V38l16-11 16 11v34M40 72V28l16-11 16 11v44" fill="none" stroke="currentColor" strokeWidth="3" />
        </svg>
        <span className="relative text-[0.65rem] font-semibold uppercase tracking-[0.16em] opacity-70">{t('committee.since', { year: member.since })}</span>
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-700">{member.role}</p>
        <h3 className="mt-1.5 text-lg font-semibold text-ink">{member.name}</h3>
        <p className="mt-1 text-sm text-ink-soft">{member.focus}</p>
      </div>
    </motion.article>
  )
}
