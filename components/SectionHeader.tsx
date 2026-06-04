'use client'

import { motion } from 'framer-motion'
import clsx from 'clsx'

interface Props {
  eyebrow?: string
  title: string
  description?: string
  center?: boolean
  light?: boolean
}

export default function SectionHeader({ eyebrow, title, description, center = false, light = false }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={clsx('mb-12', center && 'text-center')}
    >
      {eyebrow && (
        <div className={clsx('text-sm font-semibold uppercase tracking-wider mb-3', light ? 'text-azes-brown-light' : 'text-azes-brown')}>
          {eyebrow}
        </div>
      )}
      <h2 className={clsx('text-3xl sm:text-4xl font-bold leading-tight', light ? 'text-white' : 'text-azes-blue-dark')}>
        {title}
      </h2>
      {description && (
        <p className={clsx('mt-4 text-lg max-w-2xl leading-relaxed', center && 'mx-auto', light ? 'text-blue-100' : 'text-gray-600')}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
