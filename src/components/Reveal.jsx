import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'

// Fades content up the first time it scrolls into view.
export default function Reveal({ as = 'div', children, delay = 0, className, ...rest }) {
  const Cmp = motion[as]
  return (
    <Cmp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={{ hidden: fadeUp.hidden, show: { ...fadeUp.show, transition: { ...fadeUp.show.transition, delay } } }}
      {...rest}
    >
      {children}
    </Cmp>
  )
}

// Parent that staggers its RevealItem children.
export function RevealGroup({ as = 'div', children, className, gap = 0.08, ...rest }) {
  const Cmp = motion[as]
  return (
    <Cmp className={className} initial="hidden" whileInView="show" viewport={viewportOnce} variants={stagger(gap)} {...rest}>
      {children}
    </Cmp>
  )
}

export function RevealItem({ as = 'div', children, className, ...rest }) {
  const Cmp = motion[as]
  return (
    <Cmp className={className} variants={fadeUp} {...rest}>
      {children}
    </Cmp>
  )
}
