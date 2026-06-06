'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import SectionHeader from '@/components/SectionHeader'
import {
  CurrencyDollarIcon,
  WrenchScrewdriverIcon,
  BuildingOfficeIcon,
  BuildingLibraryIcon,
  TruckIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline'

function HandIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  )
}

const publics = [
  { icon: CurrencyDollarIcon,    label: 'Investisseurs',           href: '/projets-opportunites/opportunites-investissement', color: '#1B4F8C' },
  { icon: WrenchScrewdriverIcon, label: 'Aménageurs',              href: '/projets-opportunites/projets-planifies',          color: '#6B48A0' },
  { icon: BuildingOfficeIcon,    label: 'Entreprises',             href: '/zones',                                           color: '#2A7A4B' },
  { icon: GlobeAltIcon,          label: 'Partenaires',             href: '/contact',                                         color: '#1E7A9E' },
  { icon: BuildingLibraryIcon,   label: 'Administrations',         href: '/contact',                                         color: '#1B4F8C' },
  { icon: TruckIcon,             label: 'Fournisseurs',            href: '/projets-opportunites/appels-offres',              color: '#C4894A' },
  { icon: BriefcaseIcon,         label: "Chercheurs d'emploi",     href: '/emplois',                                         color: '#8B5E3C' },
  { icon: AcademicCapIcon,       label: 'Chercheurs & Médias',     href: '/documents',                                       color: '#C4894A' },
  { icon: HandIcon,              label: 'Chambres de commerce',    href: '/contact',                                         color: '#2A7A4B' },
]

export default function PublicsCibles() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" aria-label="Publics cibles">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Nos publics"
          title="À qui s'adresse l'AZES ?"
          description="Des services et ressources adaptés à chaque profil d'acteur."
          center
        />
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-9 gap-3">
          {publics.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link
                href={p.href}
                className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all group text-center"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${p.color}12`, border: `1px solid ${p.color}20` }}>
                  <p.icon className="w-6 h-6" style={{ color: p.color }} />
                </div>
                <span className="text-xs font-semibold text-gray-600 group-hover:text-[#0A2342] leading-tight transition-colors">{p.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
