'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { WrenchScrewdriverIcon, ClockIcon, LightBulbIcon, DocumentMagnifyingGlassIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import DarkPageHero from '@/components/ui/DarkPageHero'

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.55 } }

const subPages = [
  {
    href: '/projets-opportunites/projets-en-cours',
    title: 'Projets en cours',
    icon: WrenchScrewdriverIcon,
    desc: "Suivez l'avancement des projets actifs dans les 4 zones économiques spéciales.",
    count: '3 projets',
    color: '#1B4F8C',
  },
  {
    href: '/projets-opportunites/projets-planifies',
    title: 'Projets planifiés',
    icon: ClockIcon,
    desc: "Nouvelles zones, infrastructures à créer et opportunités PPP à l'horizon 2030.",
    count: '8 projets',
    color: '#6B48A0',
  },
  {
    href: '/projets-opportunites/opportunites-investissement',
    title: "Opportunités d'investissement",
    icon: LightBulbIcon,
    desc: "Terrains, secteurs porteurs, projets industriels prioritaires et conditions d'accès.",
    count: '24 opportunités',
    color: '#2A7A4B',
  },
  {
    href: '/projets-opportunites/appels-offres',
    title: "Appels d'offres & AMI",
    icon: DocumentMagnifyingGlassIcon,
    desc: "Consultez les appels d'offres et manifestations d'intérêt ouverts dans les ZES.",
    count: '2 en cours',
    color: '#C4894A',
  },
]

export default function ProjetsOpportunitesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <DarkPageHero
        eyebrow="Hub"
        title="Projets &"
        titleAccent="Opportunités"
        subtitle="Tout ce que vous devez savoir sur les projets de développement et les opportunités d'investissement dans les Zones Économiques Spéciales de la RDC."
        variant={4}
        accentColor="#6B48A0"
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-[#6B48A0] text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-6 h-px bg-[#6B48A0]/60" /> Explorer <span className="w-6 h-px bg-[#6B48A0]/60" />
            </div>
            <h2 className="text-3xl font-bold text-[#0A2342]">Choisissez votre domaine</h2>
            <p className="text-gray-500 mt-3 text-sm max-w-xl mx-auto">Projets en cours, planifiés, opportunités d'investissement et appels d'offres — tout est ici.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subPages.map((page, i) => (
              <motion.div
                key={page.href}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={page.href}
                  className="group block h-full relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ background: `linear-gradient(90deg, ${page.color}, transparent)` }} />

                  <div className="relative p-8">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${page.color}15`, border: `1px solid ${page.color}25` }}>
                      <page.icon className="w-7 h-7" style={{ color: page.color }} />
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: page.color }}>{page.count}</div>
                    <h2 className="text-xl font-bold text-[#0A2342] mb-3 group-hover:text-[#1B4F8C] transition-colors">{page.title}</h2>
                    <p className="text-gray-600 leading-relaxed mb-6 text-sm">{page.desc}</p>
                    <div className="flex items-center gap-2 font-semibold text-sm group-hover:gap-3 transition-all"
                      style={{ color: page.color }}>
                      Explorer <ArrowRightIcon className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
