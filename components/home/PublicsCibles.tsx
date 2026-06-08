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
    <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(150deg, #f3eeff 0%, #ffffff 50%, #e8f4fd 100%)' }} aria-label="Publics cibles">

      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 12, 0], opacity: [0.18, 0.3, 0.18] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 -left-20 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: '#6B48A0' }}
        />
        <motion.div
          animate={{ y: [0, 25, 0], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl"
          style={{ backgroundColor: '#1E7A9E' }}
        />
      </div>

      {/* Concentric circles decorative */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {[400, 600, 800].map((size) => (
          <div key={size} className="absolute rounded-full border opacity-[0.025]"
            style={{ width: size, height: size, top: -size/2, left: -size/2, borderColor: '#6B48A0' }} />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-white/80 hover:border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all group text-center"
                style={{ boxShadow: `0 2px 12px ${p.color}08` }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${p.color}15`, border: `1px solid ${p.color}25` }}>
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
