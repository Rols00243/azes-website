export const dynamic = 'force-dynamic'

import dynamicImport from 'next/dynamic'
import { getStats, getMergedZones, getProjetsCount, getActualites, getSlides, getAppelsOffresAdmin } from '@/lib/server-data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AZES — Agence des Zones Économiques Spéciales de la RDC',
  description:
    'Investissez dans les Zones Économiques Spéciales de la République Démocratique du Congo. Cadre juridique favorable, avantages fiscaux et infrastructure de classe mondiale.',
  openGraph: {
    title: 'AZES — Zones Économiques Spéciales RDC',
    description: 'Votre partenaire pour investir en RDC via les Zones Économiques Spéciales',
  },
}

const HomeContentClient = dynamicImport(() => import('./HomeContentClient'), { ssr: false })

export default async function HomePage() {
  const stats = await getStats()
  const zones = await getMergedZones()
  const projets = await getProjetsCount()
  const actualites = await getActualites()
  const slides = await getSlides()
  const appels = await getAppelsOffresAdmin()

  return (
    <HomeContentClient
      stats={stats}
      zones={zones}
      projets={projets}
      actualites={actualites}
      slides={slides}
      appels={appels}
    />
  )
}
