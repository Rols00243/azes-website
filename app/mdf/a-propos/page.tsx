import type { Metadata } from 'next'
import PageHero from '@/components/mdf/PageHero'
import Reveal from '@/components/mdf/Reveal'
import SectionHeading from '@/components/mdf/SectionHeading'
import FurnitureArt from '@/components/mdf/FurnitureArt'
import CTABand from '@/components/mdf/CTABand'
import { company, stats } from '@/lib/mdf/data'

export const metadata: Metadata = {
  title: "L'atelier",
  description:
    "2 800 m² d'atelier à Kinshasa : découpe numérique, plaqueuse de chants, cabine de laquage et équipes de pose intégrées. L'histoire et les moyens de Genius Design Pro.",
}

const parcMachine = [
  {
    nom: 'Centre d\'usinage CNC',
    detail: 'Table 3 100 × 2 100 mm, changeur d\'outils 8 positions',
    role: 'Découpe, perçage système 32 et fraisage décoratif en un seul passage.',
  },
  {
    nom: 'Plaqueuse de chants',
    detail: 'Collage EVA et PUR, chants jusqu\'à 3 mm',
    role: 'Joint invisible et étanche sur les quatre faces de chaque panneau.',
  },
  {
    nom: 'Scie à panneaux à format',
    detail: 'Coupe 3 200 mm, chariot à air',
    role: 'Débit des grandes longueurs et recoupe des plans de travail.',
  },
  {
    nom: 'Cabine de laquage ventilée',
    detail: 'Filtration à eau, zone de séchage séparée',
    role: 'Laques mates, satinées et brillantes sans poussière incrustée.',
  },
  {
    nom: 'Calibreuse ponceuse',
    detail: 'Largeur utile 1 300 mm',
    role: 'Surface parfaitement plane avant mise en peinture.',
  },
  {
    nom: 'Poste de montage à blanc',
    detail: 'Deux baies de 6 mètres linéaires',
    role: 'Chaque meuble est monté et contrôlé avant de quitter l\'atelier.',
  },
]

const equipe = [
  { poste: 'Métreurs', nombre: '3', mission: 'Relevés sur site et contrôle des contraintes techniques' },
  { poste: 'Dessinateurs', nombre: '4', mission: 'Conception 3D, plans d\'exécution et débit optimisé' },
  { poste: 'Machinistes', nombre: '6', mission: 'Usinage, placage de chants et calibrage' },
  { poste: 'Finisseurs', nombre: '5', mission: 'Ponçage, laquage et contrôle qualité des surfaces' },
  { poste: 'Monteurs-poseurs', nombre: '8', mission: 'Montage à blanc, pose et réglage sur chantier' },
]

const valeurs = [
  {
    titre: 'Rien ne sort sans avoir été monté',
    texte:
      "Un meuble expédié en kit non vérifié, c'est un problème découvert chez le client. Nous montons chaque commande à l'atelier, façades réglées, avant de la démonter pour le transport.",
  },
  {
    titre: 'Les chutes ne partent pas à la benne',
    texte:
      "Le débit est optimisé par calcul avant découpe. Les chutes exploitables alimentent nos petits modules — tiroirs intérieurs, séparateurs — et le reste part au broyage plutôt qu'à la décharge.",
  },
  {
    titre: 'Le devis est un engagement',
    texte:
      "Le prix signé est le prix payé. Un supplément n'apparaît que si vous demandez vous-même une modification, et il vous est chiffré avant d'être engagé.",
  },
]

export default function AProposPage() {
  return (
    <>
      <PageHero
        eyebrow={`Atelier fondé en ${company.fondation}`}
        titre="Une menuiserie de panneaux, pas un revendeur"
        intro="Nous ne commandons pas des meubles pour les faire poser par d'autres. Tout est fabriqué à Limete, dans notre atelier, par des équipes salariées que vous croiserez lors de la pose."
        fil={[
          { href: '/mdf', label: 'Accueil' },
          { href: '/mdf/a-propos', label: "L'atelier" },
        ]}
      />

      {/* ── Récit ────────────────────────────────────────────────────────── */}
      <section className="bg-mdf-ink py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal>
              <p className="mdf-eyebrow text-mdf-oak">Notre histoire</p>
              <div className="mdf-rule mt-4 w-16" aria-hidden="true" />
              <div className="mt-8 space-y-6 text-sm leading-relaxed text-mdf-sand/65 sm:text-base">
                <p>
                  Genius Design Pro a commencé en {company.fondation} dans un local
                  de 90 m², avec une scie à format, une perceuse à colonne et deux
                  menuisiers. Les premières commandes étaient des placards de
                  chambre, livrés à la brouette dans le quartier.
                </p>
                <p>
                  Le tournant est venu de l&apos;usinage numérique. En passant à la
                  commande numérique, nous avons cessé de tracer à la main : les
                  perçages tombent au même endroit sur chaque caisson, les séries
                  deviennent reproductibles, et une cuisine entière se débite en une
                  journée au lieu d&apos;une semaine.
                </p>
                <p>
                  Aujourd&apos;hui l&apos;atelier occupe {stats[1].valeur} et vingt-six
                  personnes. Nous avons gardé une règle des débuts : celui qui pose
                  chez vous est celui qui a monté le meuble. C&apos;est le meilleur
                  garde-fou qualité que nous connaissions.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mdf-wood mdf-grain relative border border-mdf-sand/12">
                <FurnitureArt kind="bibliotheque" className="relative w-full" />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-px bg-mdf-sand/12">
                {stats.slice(0, 4).map((s) => (
                  <div key={s.label} className="bg-mdf-ink px-6 py-6">
                    <p className="mdf-display text-2xl text-mdf-oak">{s.valeur}</p>
                    <p className="mt-1 text-xs text-mdf-sand/50">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Parc machine ─────────────────────────────────────────────────── */}
      <section className="border-y border-mdf-sand/10 bg-mdf-espresso/40 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <SectionHeading
            eyebrow="Moyens de production"
            titre="Ce qu'il y a derrière la porte de l'atelier"
            intro="Un beau meuble se joue autant sur la machine que sur le dessin. Voici l'outillage qui garantit la régularité de nos fabrications, du panneau brut à la façade laquée."
          />
          <div className="mt-14 grid gap-px border border-mdf-sand/10 bg-mdf-sand/10 sm:grid-cols-2 lg:grid-cols-3">
            {parcMachine.map((m, i) => (
              <Reveal
                key={m.nom}
                delay={(i % 3) * 0.07}
                className="bg-mdf-espresso/70 p-8"
              >
                <h3 className="text-lg text-mdf-cream">{m.nom}</h3>
                <p className="mdf-eyebrow mt-2 text-mdf-oak/75">{m.detail}</p>
                <p className="mt-4 text-sm leading-relaxed text-mdf-sand/55">
                  {m.role}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Équipe ───────────────────────────────────────────────────────── */}
      <section className="bg-mdf-ink py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
            <SectionHeading
              eyebrow="Les équipes"
              titre="Vingt-six personnes, cinq métiers"
              intro="Aucun poste n'est sous-traité. C'est plus lourd à porter qu'un carnet de prestataires, mais c'est ce qui rend un délai tenable et une reprise possible."
            />
            <ul className="divide-y divide-mdf-sand/10 border-y border-mdf-sand/10">
              {equipe.map((e, i) => (
                <Reveal
                  key={e.poste}
                  as="li"
                  delay={i * 0.06}
                  className="flex flex-wrap items-baseline gap-x-8 gap-y-2 py-6"
                >
                  <span className="mdf-display w-10 shrink-0 text-2xl text-mdf-oak">
                    {e.nombre}
                  </span>
                  <span className="w-40 shrink-0 text-lg text-mdf-cream">
                    {e.poste}
                  </span>
                  <span className="min-w-0 flex-1 text-sm text-mdf-sand/55">
                    {e.mission}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Valeurs ──────────────────────────────────────────────────────── */}
      <section className="border-t border-mdf-sand/10 bg-mdf-espresso/30 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <SectionHeading
            eyebrow="Nos règles"
            titre="Trois principes qui n'ont jamais bougé"
            align="center"
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {valeurs.map((v, i) => (
              <Reveal
                key={v.titre}
                delay={i * 0.08}
                className="mdf-glass flex flex-col p-8"
              >
                <span className="mdf-display text-sm text-mdf-oak/60">
                  0{i + 1}
                </span>
                <h3 className="mt-5 text-xl leading-snug text-mdf-cream">
                  {v.titre}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-mdf-sand/60">
                  {v.texte}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        titre="Venez voir l'atelier"
        texte="Le showroom et l'atelier partagent la même adresse : vous choisissez vos finitions à quelques mètres des machines qui fabriqueront votre meuble. Visite libre aux heures d'ouverture."
      />
    </>
  )
}
