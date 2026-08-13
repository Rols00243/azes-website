import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/mdf/PageHero'
import Reveal from '@/components/mdf/Reveal'
import FurnitureArt from '@/components/mdf/FurnitureArt'
import { company, zonesIntervention } from '@/lib/mdf/data'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Atelier et showroom ${company.nom} : ${company.adresse}, ${company.ville}. Téléphone, e-mail et horaires d'ouverture.`,
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Nous joindre"
        titre="L'atelier et le showroom sont au même endroit"
        intro="Vous choisissez vos finitions à quelques mètres des machines qui fabriqueront votre meuble. Visite libre aux heures d'ouverture, sans rendez-vous."
        fil={[
          { href: '/mdf', label: 'Accueil' },
          { href: '/mdf/contact', label: 'Contact' },
        ]}
      />

      <section className="bg-mdf-ink py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid gap-px border border-mdf-sand/12 bg-mdf-sand/12 lg:grid-cols-3">
            <div className="bg-mdf-ink p-8 lg:p-10">
              <h2 className="mdf-eyebrow text-mdf-oak">Téléphone & WhatsApp</h2>
              <a
                href={`tel:${company.telephoneHref}`}
                className="mdf-display mt-6 block text-2xl text-mdf-cream transition-colors hover:text-mdf-oak"
              >
                {company.telephone}
              </a>
              <p className="mt-4 text-sm leading-relaxed text-mdf-sand/55">
                Le plus rapide pour une question technique ou un délai. Envoyez vos
                photos de la pièce par WhatsApp, nous répondons dans la journée.
              </p>
            </div>

            <div className="bg-mdf-ink p-8 lg:p-10">
              <h2 className="mdf-eyebrow text-mdf-oak">E-mail</h2>
              <a
                href={`mailto:${company.email}`}
                className="mdf-display mt-6 block break-all text-xl text-mdf-cream transition-colors hover:text-mdf-oak"
              >
                {company.email}
              </a>
              <a
                href={`mailto:${company.emailDevis}`}
                className="mdf-link mt-3 block break-all text-sm text-mdf-sand/60 hover:text-mdf-cream"
              >
                {company.emailDevis}
              </a>
              <p className="mt-4 text-sm leading-relaxed text-mdf-sand/55">
                Pour transmettre des plans d&apos;architecte ou un cahier des charges.
                Réponse sous 24 heures ouvrées.
              </p>
            </div>

            <div className="bg-mdf-ink p-8 lg:p-10">
              <h2 className="mdf-eyebrow text-mdf-oak">Atelier & showroom</h2>
              <address className="mdf-display mt-6 text-xl not-italic leading-snug text-mdf-cream">
                {company.adresse}
                <span className="block text-base text-mdf-sand/60">
                  {company.ville}
                </span>
              </address>
              <ul className="mt-5 space-y-1 text-sm text-mdf-sand/50">
                {company.horaires.map((h) => (
                  <li key={h.jours}>
                    {h.jours} · {h.heures}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal className="border border-mdf-sand/12 p-8 lg:p-12">
              <h2 className="text-2xl text-mdf-cream lg:text-3xl">
                Pour un projet, passez par le devis
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-mdf-sand/60 sm:text-base">
                Le formulaire de devis nous donne d&apos;emblée le type de meuble,
                les dimensions et votre budget : c&apos;est ce qui nous permet de
                vous rappeler avec une première estimation plutôt qu&apos;avec une
                série de questions.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/mdf/devis"
                  className="bg-mdf-oak px-8 py-4 text-center text-xs font-medium uppercase tracking-[0.18em] text-mdf-ink transition-colors hover:bg-mdf-cream"
                >
                  Remplir le formulaire
                </Link>
                <Link
                  href="/mdf/collections"
                  className="border border-mdf-sand/25 px-8 py-4 text-center text-xs uppercase tracking-[0.18em] text-mdf-cream transition-colors hover:border-mdf-oak hover:text-mdf-oak"
                >
                  Voir les collections
                </Link>
              </div>

              <div className="mt-10 border-t border-mdf-sand/12 pt-8">
                <h3 className="mdf-eyebrow text-mdf-sand/40">
                  Communes desservies sans frais de déplacement
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {zonesIntervention.map((z) => (
                    <li
                      key={z}
                      className="border border-mdf-sand/12 px-4 py-1.5 text-xs text-mdf-sand/60"
                    >
                      {z}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal
              delay={0.12}
              className="mdf-wood mdf-grain relative flex items-center border border-mdf-sand/12"
            >
              <FurnitureArt kind="comptoir" className="relative w-full" />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
