import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'AZES — Agence des Zones Économiques Spéciales',
    template: '%s | AZES',
  },
  description:
    "L'Agence des Zones Économiques Spéciales accompagne les investisseurs et aménageurs dans le développement des zones économiques spéciales en RDC.",
  keywords: ['zones économiques', 'investissement', 'RDC', 'ZES', 'AZES'],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'AZES',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-azes-cream">
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        {children}
      </body>
    </html>
  )
}
