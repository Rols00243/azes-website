import type { Metadata } from 'next'
import PageHero from '@/components/mdf/PageHero'
import Reveal from '@/components/mdf/Reveal'
import SectionHeading from '@/components/mdf/SectionHeading'
import FAQAccordion from '@/components/mdf/FAQAccordion'
import CTABand from '@/components/mdf/CTABand'
import { etapes, faq, finitions, materiaux } from '@/lib/mdf/data'

export const metadata: Metadata = {
  title: 'Le sur-mesure',
  description:
    "Relevé de cotes, conception 3D, usinage CNC, placage de chants, montage à blanc et pose : le déroulé complet d'une commande de meubles en MDF sur mesure.",
}

const garanties = [
  {
    duree: '10 ans',
    titre: 'Structure',
    texte:
      "Caissons, assemblages, tenue des fixations et intégrité des panneaux. Si un caisson lâche, nous le refabriquons.",
  },
  {
    duree: '5 ans',
    titre: 'Quincaillerie',
    texte:
      "Coulisses, charnières et vérins. Remplacement à domicile, pièce et main-d'œuvre comprises.",
  },
  {
    duree: '2 ans',
    titre: 'Finitions',
    texte:
      "Décollement de chant, cloque de placage ou défaut de laque : reprise en atelier ou sur site selon l'ampleur.",
  },
]

const engagements = [
  'Deux séries de modifications incluses au stade de la conception',
  'Devis détaillé ligne par ligne, aucun poste « divers »',
  'Prix ferme une fois le devis signé, hors modification demandée',
  'Chantier nettoyé et déchets évacués à la fin de la pose',
  'Un interlocuteur unique du premier appel à la réception',
  'Retouches de réception effectuées sous quinze jours',
]

export default function SurMesurePage() {
  return (
    <>
      <PageHero
        eyebrow="La méthode"
        titre="Du relevé de cotes à la dernière vis"
        intro="Le sur-mesure n'est pas un argument commercial, c'est une contrainte de fabrication : chaque pièce est unique, donc chaque erreur coûte un panneau entier. Voici comment nous travaillons pour qu'il n'y en ait pas."
        fil={[
          { href: '/mdf', label: 'Accueil' },
          { href: '/mdf/sur-mesure', label: 'Le sur-mesure' },
        ]}
      />

      {/* ── Étapes détaillées ────────────────────────────────────────────── */}
      <section className="bg-mdf-ink py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid gap-px border border-mdf-sand/10 bg-mdf-sand/10 lg:grid-cols-2">
            {etapes.map((e, i) => (
              <Reveal
                key={e.numero}
                delay={(i % 2) * 0.08}
                className="group bg-mdf-ink p-8 transition-colors duration-500 hover:bg-mdf-espresso/60 lg:p-12"
              >
                <div className="flex items-baseline justify-between gap-6">
                  <span className="mdf-display text-4xl text-mdf-oak/25 transition-colors duration-500 group-hover:text-mdf-oak/60">
                    {e.numero}
                  </span>
                  <span className="mdf-eyebrow text-mdf-sand/35">{e.duree}</span>
                </div>
                <h2 className="mt-6 text-2xl text-mdf-cream">{e.titre}</h2>
                <p className="mt-4 text-sm leading-relaxed text-mdf-sand/60 sm:text-base">
                  {e.texte}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Matières ─────────────────────────────────────────────────────── */}
      <section className="border-y border-mdf-sand/10 bg-mdf-espresso/40 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <SectionHeading
            eyebrow="Le panneau"
            titre="Quatre qualités de MDF, quatre usages"
            intro="Un panneau mal choisi ne se voit pas à la pose. Il se voit deux saisons plus tard, quand le bas de caisson gonfle sous l'évier."
          />
          <div className="mt-14 overflow-x-auto">
            <table className="w-full min-w-[38rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-mdf-sand/15">
                  <th className="mdf-eyebrow pb-4 text-mdf-oak">Panneau</th>
                  <th className="mdf-eyebrow pb-4 text-mdf-oak">Spécification</th>
                  <th className="mdf-eyebrow pb-4 text-mdf-oak">Où nous l&apos;employons</th>
                </tr>
              </thead>
              <tbody>
                {materiaux.map((m) => (
                  <tr key={m.nom} className="border-b border-mdf-sand/8">
                    <td className="py-5 pr-6">
                      <span className="flex items-center gap-4">
                        <span
                          className="block h-9 w-9 shrink-0"
                          style={{ backgroundColor: m.couleur }}
                          aria-hidden="true"
                        />
                        <span className="text-mdf-cream">{m.nom}</span>
                      </span>
                    </td>
                    <td className="py-5 pr-6 text-sm text-mdf-sand/55">{m.code}</td>
                    <td className="py-5 text-sm text-mdf-sand/70">{m.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Reveal delay={0.1} className="mt-14">
            <h3 className="text-xl text-mdf-cream">Les finitions</h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mdf-sand/60">
              Toutes se voient et se touchent au showroom. Nous déconseillons de
              valider une teinte sur écran : le rendu d&apos;une laque dépend
              entièrement de la lumière de la pièce.
            </p>
            <ul className="mt-8 grid gap-px border border-mdf-sand/10 bg-mdf-sand/10 sm:grid-cols-2 lg:grid-cols-4">
              {finitions.map((f) => (
                <li key={f.nom} className="bg-mdf-espresso/60 p-5">
                  <span
                    className="block h-16 w-full"
                    style={{ backgroundColor: f.teinte }}
                    aria-hidden="true"
                  />
                  <span className="mt-4 block text-sm text-mdf-cream">{f.nom}</span>
                  <span className="mt-1 block text-xs text-mdf-sand/40">
                    {f.note}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Garanties ────────────────────────────────────────────────────── */}
      <section className="bg-mdf-ink py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading
                eyebrow="Après la pose"
                titre="Trois garanties, écrites au devis"
                intro="Elles figurent noir sur blanc sur chaque devis signé, avec leur point de départ : la date de réception, pas la date de commande."
              />
            </div>
            <div className="space-y-px bg-mdf-sand/10">
              {garanties.map((g, i) => (
                <Reveal
                  key={g.titre}
                  delay={i * 0.08}
                  className="flex flex-wrap items-baseline gap-x-8 gap-y-3 bg-mdf-ink p-8"
                >
                  <span className="mdf-display w-24 shrink-0 text-2xl text-mdf-oak">
                    {g.duree}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-lg text-mdf-cream">{g.titre}</span>
                    <span className="mt-2 block text-sm leading-relaxed text-mdf-sand/60">
                      {g.texte}
                    </span>
                  </span>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-20 border-t border-mdf-sand/10 pt-14">
            <Reveal>
              <h3 className="text-xl text-mdf-cream">Nos engagements de chantier</h3>
            </Reveal>
            <ul className="mt-8 grid gap-x-12 gap-y-5 sm:grid-cols-2">
              {engagements.map((e, i) => (
                <Reveal key={e} as="li" delay={(i % 2) * 0.06} className="flex gap-4">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-mdf-oak"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-relaxed text-mdf-sand/70">{e}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── FAQ complète ─────────────────────────────────────────────────── */}
      <section
        id="faq"
        className="scroll-mt-28 border-t border-mdf-sand/10 bg-mdf-espresso/30 py-20 lg:py-28"
      >
        <div className="mx-auto max-w-4xl px-5 lg:px-10">
          <SectionHeading
            eyebrow="Questions fréquentes"
            titre="Tout ce que l'on nous demande"
          />
          <div className="mt-12">
            <FAQAccordion items={faq} />
          </div>
        </div>
      </section>

      <CTABand
        titre="Prêt à faire relever vos cotes ?"
        texte="Un métreur se déplace sous 48 heures. Il repart avec les mesures, les contraintes techniques et vos préférences ; vous recevez le projet chiffré cinq jours plus tard."
      />
    </>
  )
}
