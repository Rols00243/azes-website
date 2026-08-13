import Link from 'next/link'
import { collections } from '@/lib/mdf/data'

export default function NotFoundMdf() {
  return (
    <section className="mdf-grain relative flex min-h-[70vh] items-center bg-mdf-ink py-32">
      <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-10">
        <span className="mdf-edge mx-auto block h-4 w-28" aria-hidden="true" />
        <h1 className="mt-10 text-4xl text-mdf-cream lg:text-5xl">
          Cette page n&apos;existe pas
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-mdf-sand/60 sm:text-base">
          Le lien est peut-être ancien, ou la collection a changé de nom. Voici où
          reprendre.
        </p>
        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          {collections.slice(0, 5).map((c) => (
            <li key={c.slug}>
              <Link
                href={`/mdf/collections/${c.slug}`}
                className="block border border-mdf-sand/15 px-5 py-2.5 text-xs uppercase tracking-[0.14em] text-mdf-sand/60 transition-colors hover:border-mdf-oak hover:text-mdf-cream"
              >
                {c.nom}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/mdf"
          className="mt-10 inline-block bg-mdf-oak px-8 py-4 text-xs font-medium uppercase tracking-[0.18em] text-mdf-ink transition-colors hover:bg-mdf-cream"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  )
}
