import Link from 'next/link'
import Logo from './Logo'
import { collections, company, zonesIntervention } from '@/lib/mdf/data'

export default function SiteFooter() {
  return (
    <footer className="mdf-grain relative overflow-hidden border-t border-mdf-sand/10 bg-mdf-espresso">
      <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3 text-mdf-oak">
              <Logo className="h-10 w-10" />
              <span className="leading-tight">
                <span className="mdf-display block tracking-[0.18em] text-mdf-cream">
                  GENIUS
                </span>
                <span className="mdf-eyebrow block text-[0.58rem] text-mdf-oak/80">
                  Design Pro
                </span>
              </span>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-mdf-sand/55">
              {company.signature} depuis {company.fondation}. Conception, usinage
              numérique, laquage et pose assurés par nos propres équipes.
            </p>
            <div className="mdf-edge mt-8 h-4 w-40" aria-hidden="true" />
          </div>

          <nav aria-label="Collections">
            <h3 className="mdf-eyebrow text-mdf-oak/80">Collections</h3>
            <ul className="mt-6 space-y-3">
              {collections.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/mdf/collections/${c.slug}`}
                    className="mdf-link text-sm text-mdf-sand/65 hover:text-mdf-cream"
                  >
                    {c.nom}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Le studio">
            <h3 className="mdf-eyebrow text-mdf-oak/80">Le studio</h3>
            <ul className="mt-6 space-y-3">
              {[
                { href: '/mdf/sur-mesure', label: 'Le sur-mesure' },
                { href: '/mdf/realisations', label: 'Réalisations' },
                { href: '/mdf/a-propos', label: "L'atelier" },
                { href: '/mdf/devis', label: 'Demander un devis' },
                { href: '/mdf/contact', label: 'Nous écrire' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="mdf-link text-sm text-mdf-sand/65 hover:text-mdf-cream"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mdf-eyebrow text-mdf-oak/80">Atelier & showroom</h3>
            <address className="mt-6 space-y-4 text-sm not-italic leading-relaxed text-mdf-sand/65">
              <p>
                {company.adresse}
                <br />
                {company.ville}
              </p>
              <p>
                <a
                  href={`tel:${company.telephoneHref}`}
                  className="mdf-link block text-mdf-cream"
                >
                  {company.telephone}
                </a>
                <a
                  href={`mailto:${company.email}`}
                  className="mdf-link block text-mdf-cream"
                >
                  {company.email}
                </a>
              </p>
              <ul className="space-y-1 text-mdf-sand/45">
                {company.horaires.map((h) => (
                  <li key={h.jours}>
                    {h.jours} · {h.heures}
                  </li>
                ))}
              </ul>
            </address>
          </div>
        </div>

        <div className="mt-16 border-t border-mdf-sand/10 pt-8">
          <p className="text-xs leading-relaxed text-mdf-sand/35">
            <span className="text-mdf-sand/55">Zones d&apos;intervention — </span>
            {zonesIntervention.join(' · ')}
          </p>
          <div className="mt-6 flex flex-col gap-3 text-xs text-mdf-sand/35 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {company.fondation}—{new Date().getFullYear()} {company.nom}. Tous
              droits réservés.
            </p>
            <p>Fabrication en MDF certifié E1 · Garantie 10 ans sur la structure</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
