import type { Metadata } from 'next'
import PageHero from '@/components/mdf/PageHero'
import CollectionCard from '@/components/mdf/CollectionCard'
import Reveal from '@/components/mdf/Reveal'
import CTABand from '@/components/mdf/CTABand'
import { collections } from '@/lib/mdf/data'

export const metadata: Metadata = {
  title: 'Collections',
  description:
    "Cuisines, dressings, meubles TV, bibliothèques, mobilier de bureau, chambres, agencement commercial et habillage mural : huit familles de meubles en MDF fabriqués sur mesure.",
}

export default function CollectionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Catalogue"
        titre="Huit familles, une même exigence de fabrication"
        intro="Chaque collection répond à une contrainte dominante — l'humidité en cuisine, la charge en bibliothèque, l'usure en agencement commercial. Les prix indiqués sont des points de départ réels, pas des accroches."
        fil={[
          { href: '/mdf', label: 'Accueil' },
          { href: '/mdf/collections', label: 'Collections' },
        ]}
      />

      <section className="bg-mdf-ink py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 3) * 0.07} className="h-full">
                <CollectionCard collection={c} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-16 border border-mdf-sand/12 p-8 lg:p-12">
            <h2 className="text-2xl text-mdf-cream lg:text-3xl">
              Votre projet n&apos;entre dans aucune case ?
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mdf-sand/60 sm:text-base">
              Une banque d&apos;accueil d&apos;hôtel, un meuble de laboratoire, un
              bar, des casiers de vestiaire : tout ce qui se dessine en panneaux se
              fabrique chez nous. Décrivez le besoin, nous étudions la faisabilité
              avant de chiffrer.
            </p>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  )
}
