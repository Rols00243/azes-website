import HeroSection from '@/components/home/HeroSection'
import StatsBand from '@/components/home/StatsBand'
import InvestmentDashboard from '@/components/home/InvestmentDashboard'
import ProjetsRubrique from '@/components/home/ProjetsRubrique'
import ZonesGrid from '@/components/home/ZonesGrid'
import WhyInvest from '@/components/home/WhyInvest'
import AppelsOffresList from '@/components/home/AppelsOffresList'
import ActualitesSection from '@/components/home/ActualitesSection'
import PublicsCibles from '@/components/home/PublicsCibles'
import GuichetUniqueCTA from '@/components/home/GuichetUniqueCTA'
import PartnersSection from '@/components/home/PartnersSection'
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

export default function HomePage() {
  const stats = getStats()
  const zones = getMergedZones()
  const projets = getProjetsCount()
  const actualites = getActualites()
  const slides = getSlides()
  const appels = getAppelsOffresAdmin()

  return (
    <>
      <HeroSection stats={stats} slides={slides} />
      <StatsBand stats={stats} />
      <InvestmentDashboard zones={zones} />
      <ProjetsRubrique counts={projets} />
      <ZonesGrid />
      <WhyInvest />
      <AppelsOffresList appels={appels} />
      <ActualitesSection items={actualites} />
      <PartnersSection />
      <PublicsCibles />
      <GuichetUniqueCTA />
    </>
  )
}
