import Link from 'next/link'
import FurnitureArt from './FurnitureArt'
import { prixLabel, type Collection } from '@/lib/mdf/data'

export default function CollectionCard({
  collection,
  compact = false,
}: {
  collection: Collection
  compact?: boolean
}) {
  return (
    <article className="group relative h-full border border-mdf-sand/10 bg-mdf-espresso/40 transition-colors duration-500 hover:border-mdf-oak/45">
      <Link
        href={`/mdf/collections/${collection.slug}`}
        className="flex h-full flex-col"
      >
        <div className="mdf-wood mdf-grain relative overflow-hidden">
          <FurnitureArt
            kind={collection.art}
            className="relative w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
          />
          <span className="absolute left-0 top-0 h-full w-1 bg-mdf-oak/0 transition-colors duration-500 group-hover:bg-mdf-oak" />
        </div>

        <div className={`flex flex-1 flex-col ${compact ? 'p-6' : 'p-7'}`}>
          <h3 className="text-xl leading-snug text-mdf-cream">{collection.nom}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-mdf-sand/55">
            {collection.resume}
          </p>
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-mdf-sand/10 pt-4">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-mdf-sand/60 transition-colors group-hover:text-mdf-oak">
              Découvrir
              <svg width="22" height="6" viewBox="0 0 22 6" aria-hidden="true">
                <path
                  d="M0 3h20M17 1l3 2-3 2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            </span>
            <span className="shrink-0 whitespace-nowrap text-xs uppercase tracking-[0.14em] text-mdf-oak">
              {prixLabel(collection.prix)}
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
