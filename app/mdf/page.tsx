import Link from 'next/link'
import Reveal from '@/components/mdf/Reveal'
import SectionHeading from '@/components/mdf/SectionHeading'
import CollectionCard from '@/components/mdf/CollectionCard'
import FurnitureArt from '@/components/mdf/FurnitureArt'
import CTABand from '@/components/mdf/CTABand'
import FAQAccordion from '@/components/mdf/FAQAccordion'
import {
  collections,
  etapes,
  faq,
  finitions,
  materiaux,
  promesses,
  realisations,
  savoirFaire,
  stats,
  temoignages,
} from '@/lib/mdf/data'

export default function AccueilMdf() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="mdf-grain relative overflow-hidden bg-mdf-ink pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[38rem] w-[38rem] rounded-full opacity-45"
          style={{
            background:
              'radial-gradient(circle, rgba(201,153,95,0.30) 0%, rgba(20,16,12,0) 68%)',
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <Reveal>
                <p className="mdf-eyebrow flex items-center gap-3 text-mdf-oak">
                  <span className="mdf-edge block h-3 w-9" aria-hidden="true" />
                  Atelier de meubles en MDF · Kinshasa
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="mt-8 text-[2.6rem] leading-[1.04] text-mdf-cream sm:text-6xl lg:text-[4.25rem]">
                  L&apos;art du sur-mesure,
                  <span className="block italic text-mdf-oak">
                    panneau par panneau.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mt-8 max-w-xl text-base leading-relaxed text-mdf-sand/70 sm:text-lg">
                  Nous dessinons, usinons et posons des meubles en MDF taillés à la
                  cote exacte de vos murs. Pas de meuble standard rattrapé à la
                  baguette : un relevé sérieux, une découpe numérique au dixième,
                  et des monteurs qui repartent quand chaque façade est réglée.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/mdf/devis"
                    className="group flex items-center justify-center gap-3 whitespace-nowrap bg-mdf-oak px-8 py-4 text-xs font-medium uppercase tracking-[0.18em] text-mdf-ink transition-colors hover:bg-mdf-cream"
                  >
                    Devis gratuit sous 5 jours
                    <svg width="24" height="7" viewBox="0 0 24 7" aria-hidden="true">
                      <path
                        d="M0 3.5h21M18 1l3 2.5-3 2.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                    </svg>
                  </Link>
                  <Link
                    href="/mdf/realisations"
                    className="flex items-center justify-center whitespace-nowrap border border-mdf-sand/25 px-8 py-4 text-xs font-medium uppercase tracking-[0.18em] text-mdf-cream transition-colors hover:border-mdf-oak hover:text-mdf-oak"
                  >
                    Voir nos réalisations
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={0.32}>
                <p className="mt-8 text-xs leading-relaxed text-mdf-sand/40">
                  MDF certifié E1 · Chants ABS collés sur 4 faces · Garantie 10 ans
                  sur la structure
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.2} className="relative">
              <div className="mdf-wood mdf-grain relative border border-mdf-sand/12">
                <FurnitureArt kind="cuisine" className="relative w-full" />
              </div>
              {/* étiquettes techniques */}
              <div className="mdf-glass absolute -bottom-6 -left-4 px-5 py-4 sm:-left-8">
                <p className="mdf-eyebrow text-mdf-oak">Caisson</p>
                <p className="mdf-display mt-1 text-lg text-mdf-cream">
                  MDF hydrofuge 18 mm
                </p>
              </div>
              <div className="mdf-glass absolute -right-3 top-8 px-5 py-4 sm:-right-6">
                <p className="mdf-eyebrow text-mdf-oak">Tolérance</p>
                <p className="mdf-display mt-1 text-lg text-mdf-cream">± 0,2 mm</p>
              </div>
            </Reveal>
          </div>

          {/* chiffres */}
          <div className="mt-24 grid grid-cols-2 gap-px border border-mdf-sand/10 bg-mdf-sand/10 lg:mt-28 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 0.07}
                className="bg-mdf-ink px-6 py-8 text-center lg:px-8"
              >
                <p className="mdf-display text-3xl text-mdf-oak lg:text-4xl">
                  {s.valeur}
                </p>
                <p className="mt-2 text-sm text-mdf-cream">{s.label}</p>
                <p className="mt-1 text-xs text-mdf-sand/40">{s.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bandeau savoir-faire ─────────────────────────────────────────── */}
      <section
        className="overflow-hidden border-y border-mdf-sand/10 bg-mdf-espresso py-5"
        aria-label="Savoir-faire de l'atelier"
      >
        <div className="flex w-max mdf-marquee">
          {[0, 1].map((copie) => (
            <ul
              key={copie}
              className="flex items-center gap-10 pr-10"
              aria-hidden={copie === 1}
            >
              {savoirFaire.map((s) => (
                <li
                  key={s}
                  className="mdf-eyebrow flex items-center gap-10 whitespace-nowrap text-mdf-sand/45"
                >
                  {s}
                  <span className="h-1 w-1 rotate-45 bg-mdf-oak" aria-hidden="true" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* ── Promesses ────────────────────────────────────────────────────── */}
      <section className="bg-mdf-ink py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <SectionHeading
            eyebrow="Ce qui ne se voit pas"
            titre={
              <>
                Un meuble se juge après trois ans,
                <br className="hidden sm:block" /> pas le jour de la pose.
              </>
            }
            intro="La différence entre un meuble qui tient et un meuble qui fatigue se joue sur quatre points que personne ne regarde en showroom. Nous les traitons comme des non-négociables."
          />

          <div className="mt-16 grid gap-px border border-mdf-sand/10 bg-mdf-sand/10 sm:grid-cols-2 lg:grid-cols-4">
            {promesses.map((p, i) => (
              <Reveal
                key={p.titre}
                delay={i * 0.08}
                className="group bg-mdf-ink p-8 transition-colors duration-500 hover:bg-mdf-espresso/60"
              >
                <span className="mdf-display block text-sm text-mdf-oak/60">
                  0{i + 1}
                </span>
                <h3 className="mt-5 text-xl text-mdf-cream">{p.titre}</h3>
                <p className="mt-4 text-sm leading-relaxed text-mdf-sand/55">
                  {p.texte}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Collections ──────────────────────────────────────────────────── */}
      <section className="border-t border-mdf-sand/10 bg-mdf-espresso/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="Nos collections"
              titre="Huit familles de meubles, un seul atelier"
              intro="Du meuble unique à l'équipement complet d'un plateau de bureaux. Chaque famille a ses contraintes propres — humidité, charge, usage intensif — et sa réponse technique."
            />
            <Reveal delay={0.1}>
              <Link
                href="/mdf/collections"
                className="mdf-link text-xs uppercase tracking-[0.18em] text-mdf-oak"
              >
                Tout le catalogue
              </Link>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {collections.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 4) * 0.07} className="h-full">
                <CollectionCard collection={c} compact />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Méthode ──────────────────────────────────────────────────────── */}
      <section className="bg-mdf-ink py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionHeading
                eyebrow="La méthode"
                titre="Six étapes, vingt-et-un jours"
                intro="Un projet domestique classique suit ce parcours. Vous savez à chaque instant où en est votre commande, et vous validez avant chaque passage à l'étape suivante."
              />
              <Reveal delay={0.12}>
                <Link
                  href="/mdf/sur-mesure"
                  className="mt-10 inline-flex items-center gap-3 border border-mdf-sand/25 px-7 py-4 text-xs uppercase tracking-[0.18em] text-mdf-cream transition-colors hover:border-mdf-oak hover:text-mdf-oak"
                >
                  Le sur-mesure en détail
                </Link>
              </Reveal>
            </div>

            <ol className="relative border-l border-mdf-sand/12 pl-8 lg:pl-12">
              {etapes.map((e, i) => (
                <Reveal
                  key={e.numero}
                  as="li"
                  delay={i * 0.06}
                  className="relative pb-12 last:pb-0"
                >
                  <span
                    className="absolute -left-[2.06rem] top-2 h-2 w-2 rotate-45 bg-mdf-oak lg:-left-[3.31rem]"
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="mdf-display text-sm text-mdf-oak/70">
                      {e.numero}
                    </span>
                    <h3 className="text-xl text-mdf-cream">{e.titre}</h3>
                    <span className="mdf-eyebrow text-mdf-sand/35">{e.duree}</span>
                  </div>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-mdf-sand/55">
                    {e.texte}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Matières ─────────────────────────────────────────────────────── */}
      <section className="border-y border-mdf-sand/10 bg-mdf-espresso/40 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <SectionHeading
            eyebrow="Matières & finitions"
            titre="Le bon panneau au bon endroit"
            intro="Le MDF n'est pas un matériau unique : quatre qualités, quatre usages. Se tromper de panneau sous un évier se paie en deux saisons."
          />

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {materiaux.map((m, i) => (
              <Reveal
                key={m.nom}
                delay={i * 0.07}
                className="border border-mdf-sand/10 bg-mdf-ink/60 p-7"
              >
                <span
                  className="block h-14 w-full"
                  style={{
                    background: `linear-gradient(180deg, ${m.couleur} 0%, ${m.couleur}cc 45%, #2b2018 46%, #2b2018 100%)`,
                  }}
                  aria-hidden="true"
                />
                <h3 className="mt-6 text-lg text-mdf-cream">{m.nom}</h3>
                <p className="mdf-eyebrow mt-2 text-mdf-oak/80">{m.code}</p>
                <p className="mt-4 text-sm leading-relaxed text-mdf-sand/55">
                  {m.usage}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-14">
            <p className="mdf-eyebrow text-mdf-sand/40">
              Finitions disponibles au showroom
            </p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {finitions.map((f) => (
                <li
                  key={f.nom}
                  className="group flex items-center gap-3 border border-mdf-sand/12 py-2 pl-2 pr-5 transition-colors hover:border-mdf-oak/50"
                >
                  <span
                    className="block h-8 w-8"
                    style={{ backgroundColor: f.teinte }}
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block text-sm text-mdf-cream">{f.nom}</span>
                    <span className="block text-xs text-mdf-sand/40">{f.note}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Réalisations ─────────────────────────────────────────────────── */}
      <section className="bg-mdf-ink py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="Chantiers récents"
              titre="Ce que nous avons livré cette année"
            />
            <Reveal delay={0.1}>
              <Link
                href="/mdf/realisations"
                className="mdf-link text-xs uppercase tracking-[0.18em] text-mdf-oak"
              >
                Toutes les réalisations
              </Link>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {realisations.slice(0, 3).map((r, i) => (
              <Reveal
                key={r.titre}
                delay={i * 0.08}
                className="border border-mdf-sand/10"
              >
                <div className="mdf-wood mdf-grain relative">
                  <FurnitureArt kind={r.art} className="relative w-full" />
                </div>
                <div className="p-6">
                  <p className="mdf-eyebrow text-mdf-oak/70">
                    {r.lieu} · {r.annee}
                  </p>
                  <h3 className="mt-3 text-lg leading-snug text-mdf-cream">
                    {r.titre}
                  </h3>
                  <p className="mt-2 text-sm text-mdf-sand/50">{r.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Témoignages ──────────────────────────────────────────────────── */}
      <section className="border-t border-mdf-sand/10 bg-mdf-espresso/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <SectionHeading
            eyebrow="Ils nous ont fait confiance"
            titre="Quatre clients, quatre chantiers"
            align="center"
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
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

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-mdf-ink py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-5 lg:px-10">
          <SectionHeading
            eyebrow="Questions fréquentes"
            titre="Ce que l'on nous demande avant de signer"
          />
          <div className="mt-14">
            <FAQAccordion items={faq.slice(0, 5)} />
          </div>
          <Reveal delay={0.1} className="mt-10">
            <Link
              href="/mdf/sur-mesure#faq"
              className="mdf-link text-xs uppercase tracking-[0.18em] text-mdf-oak"
            >
              Toutes les questions
            </Link>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  )
}
