'use client'

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
import type { SiteStats, ProjetsCount, Actualite, Slide, AppelOffreAdmin } from '@/lib/server-data'
import type { Zone } from '@/lib/data/zones'

interface Props {
  stats: SiteStats
  zones: Zone[]
  projets: ProjetsCount
  actualites: Actualite[]
  slides: Slide[]
  appels: AppelOffreAdmin[]
}

export default function HomeContentClient({ stats, zones, projets, actualites, slides, appels }: Props) {
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
