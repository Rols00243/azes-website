import type { Metadata } from 'next'
import SiteHeader from '@/components/mdf/SiteHeader'
import SiteFooter from '@/components/mdf/SiteFooter'
import { company } from '@/lib/mdf/data'

export const metadata: Metadata = {
  title: {
    default: `${company.nom} — Fabrication de meubles en MDF sur mesure`,
    template: `%s | ${company.nom}`,
  },
  description:
    "Atelier de fabrication de meubles en MDF sur mesure à Kinshasa : cuisines, dressings, meubles TV, bibliothèques, mobilier de bureau et agencement commercial. Conception 3D, usinage CNC, laquage et pose par nos équipes.",
  keywords: [
    'meubles MDF',
    'cuisine sur mesure',
    'dressing sur mesure',
    'menuiserie MDF',
    'agencement intérieur',
    'Kinshasa',
    'mobilier de bureau',
  ],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: company.nom,
    title: `${company.nom} — Meubles en MDF sur mesure`,
    description:
      "Cuisines, dressings, agencements : conçus, usinés et posés par notre atelier. Devis gratuit sous 5 jours.",
  },
}

export default function MdfLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mdf-scope flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
