'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import SectionHeader from '@/components/SectionHeader'
import { ArrowRightIcon, WrenchScrewdriverIcon, ClockIcon, LightBulbIcon, DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline'
import type { ProjetsCount } from '@/lib/server-data'

const META = [
  { href: '/projets-opportunites/projets-en-cours',             title: 'Projets en Cours',    icon: WrenchScrewdriverIcon,       descKey: 'projets_en_cours' as const,  descLabel: 'projets actifs',          color: '#1B4F8C' },
  { href: '/projets-opportunites/projets-planifies',            title: 'Projets Planifiés',   icon: ClockIcon,                   descKey: 'projets_planifies' as const, descLabel: 'en préparation',          color: '#6B48A0' },
  { href: '/projets-opportunites/opportunites-investissement',  title: 'Opportunités',         icon: LightBulbIcon,               descKey: 'opportunites' as const,      descLabel: 'opportunités dispo',      color: '#2A7A4B' },
  { href: '/projets-opportunites/appels-offres',                title: "Appels d'Offres",     icon: DocumentMagnifyingGlassIcon, descKey: 'appels_offres' as const,     descLabel: 'appels en cours',         color: '#C4894A' },
]

export default function ProjetsRubrique({ counts }: { counts: ProjetsCount }) {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50" aria-label="Projets et opportunités">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Rubrique"
          title="Projets & Opportunités"
          description="Découvrez nos projets en cours, les opportunités d'investissement et les appels d'offres ouverts."
          center
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {META.map((item, i) => (
            <motion.div key={item.href} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <Link href={item.href}
                className="block h-full group relative overflow-hidden rounded-2xl border border-gray-200 bg-white hover:border-gray-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }} />
                <div className="p-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${item.color}15`, border: `1px solid ${item.color}25` }}>
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <div className="text-3xl font-bold text-[#0A2342] mb-1">{counts[item.descKey]}</div>
                  <div className="text-xs text-gray-400 mb-3">{item.descLabel}</div>
                  <h3 className="font-semibold text-gray-700 mb-4">{item.title}</h3>
                  <div className="flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all" style={{ color: item.color }}>
                    Voir tout <ArrowRightIcon className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
