'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface Props {
  end: number
  prefix?: string
  suffix?: string
  duration?: number
}

export default function AnimatedCounter({ end, prefix = '', suffix = '', duration = 2000 }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = Date.now()
    const step = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(end)
    }
    requestAnimationFrame(step)
  }, [inView, end, duration])

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString('fr-FR')}{suffix}
    </span>
  )
}
