import Link from 'next/link'
import Reveal from './Reveal'

export default function PageHero({
  eyebrow,
  titre,
  intro,
  fil,
}: {
  eyebrow: string
  titre: React.ReactNode
  intro?: string
  fil?: { href: string; label: string }[]
}) {
  return (
    <section className="mdf-grain relative overflow-hidden border-b border-mdf-sand/10 bg-mdf-ink pb-16 pt-36 lg:pb-20 lg:pt-44">
      <div
        className="pointer-events-none absolute -left-52 -top-40 h-[34rem] w-[34rem] rounded-full opacity-40"
        style={{
          background:
            'radial-gradient(circle, rgba(201,153,95,0.28) 0%, rgba(20,16,12,0) 68%)',
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
        {fil && (
          <Reveal>
            <nav aria-label="Fil d'Ariane">
              <ol className="mdf-eyebrow flex flex-wrap items-center gap-2 text-mdf-sand/35">
                {fil.map((f, i) => (
                  <li key={f.href} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden="true">/</span>}
                    <Link href={f.href} className="hover:text-mdf-oak">
                      {f.label}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        )}

        <Reveal delay={0.06}>
          <p className="mdf-eyebrow mt-8 flex items-center gap-3 text-mdf-oak">
            <span className="mdf-edge block h-3 w-9" aria-hidden="true" />
            {eyebrow}
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <h1 className="mt-6 max-w-4xl text-[2.4rem] leading-[1.06] text-mdf-cream sm:text-5xl lg:text-[3.75rem]">
            {titre}
          </h1>
        </Reveal>

        {intro && (
          <Reveal delay={0.18}>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-mdf-sand/65 sm:text-lg">
              {intro}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
