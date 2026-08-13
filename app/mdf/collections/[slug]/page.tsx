import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageHero from '@/components/mdf/PageHero'
import Reveal from '@/components/mdf/Reveal'
import FurnitureArt from '@/components/mdf/FurnitureArt'
import CTABand from '@/components/mdf/CTABand'
import { collections, etapes, realisations } from '@/lib/mdf/data'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const collection = collections.find((c) => c.slug === params.slug)
  if (!collection) return { title: 'Collection introuvable' }
  return {
    title: collection.nom,
    description: collection.resume,
  }
}

export default function CollectionPage({ params }: Props) {
  const collection = collections.find((c) => c.slug === params.slug)
  if (!collection) notFound()

  const index = collections.findIndex((c) => c.slug === collection.slug)
  const suivante = collections[(index + 1) % collections.length]
  const chantiers = realisations.filter((r) => r.categorie === collection.slug)

  return (
    <>
      <PageHero
        eyebrow={collection.accroche}
        titre={collection.nom}
        intro={collection.resume}
        fil={[
          { href: '/mdf', label: 'Accueil' },
          { href: '/mdf/collections', label: 'Collections' },
          { href: `/mdf/collections/${collection.slug}`, label: collection.nom },
        ]}
      />

      {/* ── Visuel + repères ─────────────────────────────────────────────── */}
      <section className="bg-mdf-ink py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal className="mdf-wood mdf-grain relative border border-mdf-sand/12">
              <FurnitureArt kind={collection.art} className="relative w-full" />
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col justify-center">
              <dl className="grid grid-cols-2 gap-px border border-mdf-sand/12 bg-mdf-sand/12">
                <div className="bg-mdf-ink p-6">
                  <dt className="mdf-eyebrow text-mdf-sand/40">À partir de</dt>
                  <dd className="mdf-display mt-2 text-2xl text-mdf-oak">
                    {collection.prix}
                  </dd>
                  <dd className="mt-1 text-xs text-mdf-sand/40">
                    {collection.unite}
                  </dd>
                </div>
                <div className="bg-mdf-ink p-6">
                  <dt className="mdf-eyebrow text-mdf-sand/40">Délai</dt>
                  <dd className="mdf-display mt-2 text-2xl text-mdf-cream">
                    {collection.delai}
                  </dd>
                  <dd className="mt-1 text-xs text-mdf-sand/40">
                    du devis signé à la pose
                  </dd>
                </div>
              </dl>

              <div className="mt-8 space-y-5">
                {collection.description.map((p) => (
                  <p
                    key={p.slice(0, 24)}
                    className="text-sm leading-relaxed text-mdf-sand/65 sm:text-base"
                  >
                    {p}
                  </p>
                ))}
              </div>

              <Link
                href={`/mdf/devis?projet=${collection.slug}`}
                className="mt-9 inline-flex items-center justify-center gap-3 bg-mdf-oak px-8 py-4 text-xs font-medium uppercase tracking-[0.18em] text-mdf-ink transition-colors hover:bg-mdf-cream"
              >
                Chiffrer ce projet
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Détail technique ─────────────────────────────────────────────── */}
      <section className="border-y border-mdf-sand/10 bg-mdf-espresso/40 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-3 lg:px-10">
          {[
            { titre: 'Points techniques', items: collection.atouts, ton: 'oak' },
            { titre: 'Compris dans le prix', items: collection.inclus, ton: 'cream' },
            { titre: 'Options fréquentes', items: collection.options, ton: 'sand' },
          ].map((bloc, i) => (
            <Reveal key={bloc.titre} delay={i * 0.08}>
              <h2 className="mdf-eyebrow text-mdf-oak">{bloc.titre}</h2>
              <div className="mdf-rule mt-4 w-14" aria-hidden="true" />
              <ul className="mt-7 space-y-4">
                {bloc.items.map((item) => (
                  <li key={item} className="flex gap-4">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-mdf-oak"
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-relaxed text-mdf-sand/70">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Chantiers de cette famille ───────────────────────────────────── */}
      {chantiers.length > 0 && (
        <section className="bg-mdf-ink py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <Reveal>
              <h2 className="text-2xl text-mdf-cream lg:text-3xl">
                Déjà livré en {collection.nom.toLowerCase()}
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {chantiers.map((r, i) => (
                <Reveal
                  key={r.titre}
                  delay={i * 0.08}
                  className="border border-mdf-sand/10 p-6"
                >
                  <p className="mdf-eyebrow text-mdf-oak/70">
                    {r.lieu} · {r.annee}
                  </p>
                  <h3 className="mt-3 text-lg leading-snug text-mdf-cream">
                    {r.titre}
                  </h3>
                  <p className="mt-2 text-sm text-mdf-sand/50">{r.detail}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Rappel du parcours ───────────────────────────────────────────── */}
      <section className="border-t border-mdf-sand/10 bg-mdf-espresso/30 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal>
            <h2 className="text-2xl text-mdf-cream lg:text-3xl">
              Comment se déroule la commande
            </h2>
          </Reveal>
          <ol className="mt-10 grid gap-px border border-mdf-sand/10 bg-mdf-sand/10 sm:grid-cols-2 lg:grid-cols-3">
            {etapes.map((e, i) => (
              <Reveal
                key={e.numero}
                as="li"
                delay={(i % 3) * 0.06}
                className="bg-mdf-ink p-7"
              >
                <span className="mdf-display text-sm text-mdf-oak/70">
                  {e.numero}
                </span>
                <h3 className="mt-4 text-lg text-mdf-cream">{e.titre}</h3>
                <p className="mdf-eyebrow mt-2 text-mdf-sand/35">{e.duree}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Collection suivante ──────────────────────────────────────────── */}
      <section className="bg-mdf-ink pb-20 pt-4 lg:pb-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Link
            href={`/mdf/collections/${suivante.slug}`}
            className="group flex flex-wrap items-center justify-between gap-4 border-t border-mdf-sand/12 pt-8"
          >
            <span>
              <span className="mdf-eyebrow block text-mdf-sand/35">
                Collection suivante
              </span>
              <span className="mdf-display mt-2 block text-2xl text-mdf-cream transition-colors group-hover:text-mdf-oak lg:text-3xl">
                {suivante.nom}
              </span>
            </span>
            <svg
              width="46"
              height="10"
              viewBox="0 0 46 10"
              aria-hidden="true"
              className="text-mdf-oak transition-transform duration-500 group-hover:translate-x-2"
            >
              <path
                d="M0 5h43M39 1l5 4-5 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </Link>
        </div>
      </section>

      <CTABand />
    </>
  )
}
