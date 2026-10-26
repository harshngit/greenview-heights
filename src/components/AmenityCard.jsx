import { motion } from 'framer-motion'
import Icon from './Icon'
import Photo from './Photo'
import { fadeUp } from '../lib/motion'

export default function AmenityCard({ amenity, index, variant = 'photo' }) {
  if (variant === 'compact') {
    return (
      <motion.article variants={fadeUp} className="group card flex gap-4 p-5 transition-shadow duration-500 hover:shadow-lift">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest-50 text-forest-700 transition-colors duration-500 group-hover:bg-forest-700 group-hover:text-ivory">
          <Icon name={amenity.icon} className="h-5 w-5" strokeWidth={1.6} />
        </span>
        <div>
          <h3 className="font-semibold text-ink">{amenity.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-ink-soft">{amenity.text}</p>
        </div>
      </motion.article>
    )
  }
  return (
    <motion.article variants={fadeUp} className="group relative overflow-hidden rounded-2xl bg-forest-900">
      <Photo
        src={amenity.image}
        alt={amenity.title}
        className="aspect-[4/5] sm:aspect-[3/4]"
        imgClassName="transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/25 to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-ivory sm:p-5">
        <div className="flex items-center justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ivory/15 backdrop-blur-md">
            <Icon name={amenity.icon} className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.6} />
          </span>
          <span className="font-display text-lg text-ivory/50">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <h3 className="mt-3 text-[0.95rem] font-semibold leading-snug sm:mt-4 sm:text-lg">{amenity.title}</h3>
        <p className="mt-1.5 hidden max-h-0 overflow-hidden text-sm leading-relaxed text-ivory/80 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100 group-focus-within:max-h-32 group-focus-within:opacity-100 [@media(hover:none)]:max-h-32 [@media(hover:none)]:opacity-100 sm:block">
          {amenity.text}
        </p>
      </div>
    </motion.article>
  )
}
