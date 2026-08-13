'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'

export default function FAQAccordion({
  items,
  tone = 'dark',
}: {
  items: { question: string; reponse: string }[]
  tone?: 'dark' | 'light'
}) {
  const [ouvert, setOuvert] = useState<number | null>(0)
  const sombre = tone === 'dark'

  return (
    <ul
      className={clsx(
        'divide-y border-y',
        sombre ? 'divide-mdf-sand/10 border-mdf-sand/10' : 'divide-mdf-clay/15 border-mdf-clay/15'
      )}
    >
      {items.map((item, i) => {
        const actif = ouvert === i
        return (
          <li key={item.question}>
            <button
              type="button"
              onClick={() => setOuvert(actif ? null : i)}
              aria-expanded={actif}
              className="flex w-full items-start justify-between gap-6 py-6 text-left"
            >
              <span
                className={clsx(
                  'mdf-display text-lg transition-colors sm:text-xl',
                  actif
                    ? 'text-mdf-oak'
                    : sombre
                      ? 'text-mdf-cream'
                      : 'text-mdf-ink'
                )}
              >
                {item.question}
              </span>
              <span
                className={clsx(
                  'relative mt-2 block h-3 w-3 shrink-0',
                  sombre ? 'text-mdf-oak' : 'text-mdf-clay'
                )}
                aria-hidden="true"
              >
                <span className="absolute top-1/2 block h-px w-3 bg-current" />
                <span
                  className={clsx(
                    'absolute left-1/2 block h-3 w-px bg-current transition-transform duration-300',
                    actif && 'scale-y-0'
                  )}
                />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {actif && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p
                    className={clsx(
                      'max-w-3xl pb-7 pr-10 text-sm leading-relaxed sm:text-base',
                      sombre ? 'text-mdf-sand/65' : 'text-mdf-clay'
                    )}
                  >
                    {item.reponse}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}
