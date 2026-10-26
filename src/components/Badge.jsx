const TONES = {
  Meetings: 'bg-forest-50 text-forest-700 ring-forest-200/70',
  Maintenance: 'bg-sand text-ink-soft ring-stone',
  Events: 'bg-gold-100 text-gold-700 ring-gold-300/60',
  Finance: 'bg-white text-ink-soft ring-line',
  Security: 'bg-forest-700 text-ivory ring-forest-700',
  General: 'bg-ivory text-ink-soft ring-line',
}

export default function Badge({ children, tone }) {
  const cls = TONES[tone ?? children] ?? 'bg-ivory text-ink-soft ring-line'
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.08em] ring-1 ring-inset ${cls}`}>
      {children}
    </span>
  )
}
