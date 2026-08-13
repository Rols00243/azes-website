'use client'

import { motion } from 'framer-motion'

/**
 * Apparition à l'entrée dans le viewport. Volontairement discrète :
 * 24 px de translation, jamais de zoom ni de rebond.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className = '',
  as = 'div',
}: {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'article'
}) {
  const Motion = motion[as]
  return (
    <Motion
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Motion>
  )
}
