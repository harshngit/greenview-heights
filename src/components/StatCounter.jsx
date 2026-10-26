import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

export default function StatCounter({ value, suffix = '', className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? value : 0)
  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, value, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) })
    return () => controls.stop()
  }, [inView, value, reduce])
  return <span ref={ref} className={className}>{n}{suffix}</span>
}
