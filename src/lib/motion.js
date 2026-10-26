// Shared Framer Motion presets so motion stays consistent site-wide.
export const EASE = [0.22, 1, 0.36, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' }

export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: 'easeIn' } },
}
