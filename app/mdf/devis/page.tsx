import type { Metadata } from 'next'
import { Suspense } from 'react'
import PageHero from '@/components/mdf/PageHero'
import Reveal from '@/components/mdf/Reveal'
import DevisForm from '@/components/mdf/DevisForm'
import { company, etapes } from '@/lib/mdf/data'

export const metadata: Metadata = {
  title: 'Demander un devis',
  description:
    "Décrivez votre projet de meuble en MDF : relevé de cotes, plans 3D et devis détaillé gratuits sous cinq jours à Kinshasa.",
}

export default function DevisPage() {
  return (
    <>
      <PageHero
        eyebrow="Devis gratuit"
        titre="Deux minutes maintenant, cinq jours pour le chiffrage"
        intro="Plus votre description est précise, plus notre première estimation le sera. Rien ne vous engage : le relevé de cotes et les vues 3D restent gratuits jusqu'à la signature."
        fil={[
          { href: '/mdf', label: 'Accueil' },
          { href: '/mdf/devis', label: 'Devis' },
        ]}
      />

      <section className="bg-mdf-ink py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1.6fr_0.9fr] lg:px-10">
          <Suspense
            fallback={
              <div className="border border-mdf-sand/12 p-10 text-sm text-mdf-sand/50">
                Chargement du formulaire…
              </div>
            }
          >
            <DevisForm />
          </Suspense>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <Reveal className="border border-mdf-sand/12 p-8">
              <h2 className="mdf-eyebrow text-mdf-oak">Ensuite, que se passe-t-il ?</h2>
              <ol className="mt-7 space-y-6">
                {etapes.slice(0, 3).map((e) => (
                  <li key={e.numero} className="flex gap-5">
                    <span className="mdf-display shrink-0 text-sm text-mdf-oak/70">
                      {e.numero}
                    </span>
                    <span>
                      <span className="block text-mdf-cream">{e.titre}</span>
                      <span className="mt-1 block text-xs text-mdf-sand/45">
                        {e.duree}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.1} className="mt-6 border border-mdf-sand/12 p-8">
              <h2 className="mdf-eyebrow text-mdf-oak">Vous préférez parler ?</h2>
              <p className="mt-5 text-sm leading-relaxed text-mdf-sand/60">
                L&apos;atelier répond aux heures d&apos;ouverture. Nous prenons
                volontiers la demande de vive voix.
              </p>
              <a
                href={`tel:${company.telephoneHref}`}
                className="mdf-display mt-6 block text-xl text-mdf-cream hover:text-mdf-oak"
              >
                {company.telephone}
              </a>
              <a
                href={`mailto:${company.emailDevis}`}
                className="mdf-link mt-2 block text-sm text-mdf-sand/60 hover:text-mdf-cream"
              >
                {company.emailDevis}
              </a>
              <ul className="mt-6 space-y-1 text-xs text-mdf-sand/40">
                {company.horaires.map((h) => (
                  <li key={h.jours}>
                    {h.jours} · {h.heures}
                  </li>
                ))}
              </ul>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  )
}
