import Link from 'next/link'
import Reveal from './Reveal'
import { company } from '@/lib/mdf/data'

export default function CTABand({
  titre = 'Parlons de votre projet',
  texte = "Relevé de cotes, plans 3D et devis détaillé : gratuits et sans engagement dans Kinshasa. Comptez cinq jours pour recevoir votre projet chiffré.",
}: {
  titre?: string
  texte?: string
}) {
  return (
    <section className="mdf-wood mdf-grain relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <p className="mdf-eyebrow text-mdf-oak">Premier rendez-vous</p>
            <h2 className="mt-6 text-3xl leading-[1.12] text-mdf-cream sm:text-4xl lg:text-5xl">
              {titre}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-mdf-sand/70">
              {texte}
            </p>
          </Reveal>

          <Reveal delay={0.12} className="flex flex-col gap-4">
            <Link
              href="/mdf/devis"
              className="group flex items-center justify-between bg-mdf-oak px-8 py-6 text-mdf-ink transition-colors hover:bg-mdf-cream"
            >
              <span>
                <span className="block text-xs uppercase tracking-[0.18em] opacity-70">
                  En 2 minutes
                </span>
                <span className="mdf-display mt-1 block text-xl">
                  Demander un devis
                </span>
              </span>
              <svg width="30" height="8" viewBox="0 0 30 8" aria-hidden="true">
                <path
                  d="M0 4h27M24 1l4 3-4 3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </svg>
            </Link>
            <a
              href={`tel:${company.telephoneHref}`}
              className="flex items-center justify-between border border-mdf-sand/25 px-8 py-6 text-mdf-cream transition-colors hover:border-mdf-oak hover:text-mdf-oak"
            >
              <span>
                <span className="block text-xs uppercase tracking-[0.18em] text-mdf-sand/50">
                  Ou appelez l&apos;atelier
                </span>
                <span className="mdf-display mt-1 block text-xl">
                  {company.telephone}
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
