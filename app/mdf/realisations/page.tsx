import type { Metadata } from 'next'
import PageHero from '@/components/mdf/PageHero'
import Reveal from '@/components/mdf/Reveal'
import RealisationsGrid from '@/components/mdf/RealisationsGrid'
import CTABand from '@/components/mdf/CTABand'
import { stats, temoignages } from '@/lib/mdf/data'

export const metadata: Metadata = {
  title: 'Réalisations',
  description:
    "Cuisines, dressings, murs TV, bibliothèques, plateaux de bureaux et agencements commerciaux réalisés par notre atelier à Kinshasa.",
}

export default function RealisationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Chantiers livrés"
        titre="Des projets, pas des photos de catalogue"
        intro="Chaque chantier ci-dessous a été relevé, dessiné, fabriqué et posé par nos équipes. Les surfaces et les finitions indiquées sont celles réellement mises en œuvre."
        fil={[
          { href: '/mdf', label: 'Accueil' },
          { href: '/mdf/realisations', label: 'Réalisations' },
        ]}
      />

      <section className="bg-mdf-ink py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <RealisationsGrid />
        </div>
      </section>

      <section className="border-y border-mdf-sand/10 bg-mdf-espresso/40 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 lg:grid-cols-4 lg:px-10">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07}>
              <p className="mdf-display text-3xl text-mdf-oak lg:text-4xl">
                {s.valeur}
              </p>
              <p className="mt-2 text-sm text-mdf-cream">{s.label}</p>
              <p className="mt-1 text-xs text-mdf-sand/40">{s.detail}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-mdf-ink py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal>
            <h2 className="mdf-eyebrow text-mdf-oak">Retours de clients</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {temoignages.map((t, i) => (
              <Reveal
                key={t.auteur}
                delay={i * 0.07}
                className="mdf-glass flex flex-col justify-between p-8"
              >
                <p className="mdf-display text-lg leading-relaxed text-mdf-cream">
                  <span className="text-mdf-oak">«&nbsp;</span>
                  {t.texte}
                  <span className="text-mdf-oak">&nbsp;»</span>
                </p>
                <footer className="mt-8 border-t border-mdf-sand/10 pt-5">
                  <p className="text-sm text-mdf-cream">{t.auteur}</p>
                  <p className="mt-0.5 text-xs text-mdf-sand/45">{t.role}</p>
                </footer>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        titre="Le prochain chantier est peut-être le vôtre"
        texte="Envoyez-nous les dimensions approximatives de la pièce et quelques photos : nous vous dirons sous 48 heures ce qui est réalisable et dans quel ordre de budget."
      />
    </>
  )
}
