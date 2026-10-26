import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, intro, align = 'left', action, tone = 'dark', id }) {
  const center = align === 'center'
  const titleColor = tone === 'dark' ? 'text-ink' : 'text-ivory'
  const introColor = tone === 'dark' ? 'text-ink-soft' : 'text-ivory/75'
  return (
    <div className={`flex flex-col gap-6 ${center ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'}`}>
      <Reveal className={center ? 'max-w-2xl' : 'max-w-2xl'}>
        {eyebrow && <span className={`eyebrow ${tone === 'light' ? 'text-gold-300' : ''}`}>{eyebrow}</span>}
        <h2 id={id} className={`mt-4 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl ${titleColor}`}>{title}</h2>
        {intro && <p className={`mt-4 text-base leading-relaxed sm:text-lg ${introColor}`}>{intro}</p>}
      </Reveal>
      {action && <Reveal delay={0.1} className="shrink-0">{action}</Reveal>}
    </div>
  )
}
