'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'
import FurnitureArt from './FurnitureArt'
import { collections, realisations } from '@/lib/mdf/data'

export default function RealisationsGrid() {
  const [filtre, setFiltre] = useState<string>('tous')

  const familles = useMemo(
    () =>
      collections.filter((c) => realisations.some((r) => r.categorie === c.slug)),
    []
  )

  const visibles = useMemo(
    () =>
      filtre === 'tous'
        ? realisations
        : realisations.filter((r) => r.categorie === filtre),
    [filtre]
  )

  return (
    <div>
      <div className="flex flex-wrap gap-3" role="group" aria-label="Filtrer par famille">
        <FiltreBouton
          actif={filtre === 'tous'}
          onClick={() => setFiltre('tous')}
          label="Tout voir"
          compte={realisations.length}
        />
        {familles.map((f) => (
          <FiltreBouton
            key={f.slug}
            actif={filtre === f.slug}
            onClick={() => setFiltre(f.slug)}
            label={f.nom}
            compte={realisations.filter((r) => r.categorie === f.slug).length}
          />
        ))}
      </div>

      <motion.ul layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visibles.map((r) => (
            <motion.li
              key={r.titre}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="group border border-mdf-sand/10 transition-colors duration-500 hover:border-mdf-oak/40"
            >
              <Link href={`/mdf/collections/${r.categorie}`} className="block">
                <div className="mdf-wood mdf-grain relative overflow-hidden">
                  <FurnitureArt
                    kind={r.art}
                    className="relative w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-6">
                  <p className="mdf-eyebrow text-mdf-oak/70">
                    {r.lieu} · {r.annee}
                  </p>
                  <h3 className="mt-3 text-lg leading-snug text-mdf-cream">
                    {r.titre}
                  </h3>
                  <p className="mt-2 text-sm text-mdf-sand/50">{r.detail}</p>
                </div>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  )
}

function FiltreBouton({
  actif,
  onClick,
  label,
  compte,
}: {
  actif: boolean
  onClick: () => void
  label: string
  compte: number
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={actif}
      className={clsx(
        'flex items-center gap-2 border px-5 py-2.5 text-xs uppercase tracking-[0.14em] transition-colors',
        actif
          ? 'border-mdf-oak bg-mdf-oak text-mdf-ink'
          : 'border-mdf-sand/18 text-mdf-sand/60 hover:border-mdf-oak/50 hover:text-mdf-cream'
      )}
    >
      {label}
      <span className={actif ? 'text-mdf-ink/55' : 'text-mdf-sand/30'}>
        {compte}
      </span>
    </button>
  )
}
