import Reveal from './Reveal'

export default function SectionHeading({
  eyebrow,
  titre,
  intro,
  align = 'left',
  tone = 'dark',
}: {
  eyebrow: string
  titre: React.ReactNode
  intro?: string
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
}) {
  const centre = align === 'center'
  return (
    <Reveal className={centre ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p
        className={`mdf-eyebrow ${tone === 'dark' ? 'text-mdf-oak' : 'text-mdf-clay'}`}
      >
        {eyebrow}
      </p>
      <div
        className={`mdf-rule mt-4 w-16 ${centre ? 'mx-auto' : ''}`}
        aria-hidden="true"
      />
      <h2
        className={`mt-6 text-3xl leading-[1.15] sm:text-4xl lg:text-[2.75rem] ${
          tone === 'dark' ? 'text-mdf-cream' : 'text-mdf-ink'
        }`}
      >
        {titre}
      </h2>
      {intro && (
        <p
          className={`mt-5 text-base leading-relaxed sm:text-lg ${
            tone === 'dark' ? 'text-mdf-sand/70' : 'text-mdf-clay'
          }`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  )
}
