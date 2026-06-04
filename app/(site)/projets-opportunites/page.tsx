'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { WrenchScrewdriverIcon, ClockIcon, LightBulbIcon, DocumentMagnifyingGlassIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import DarkPageHero from '@/components/ui/DarkPageHero'

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
    <div className="bg-[#040810] min-h-screen">
      <DarkPageHero
        eyebrow="Hub"
        title="Projets &"
        titleAccent="Opportunités"
        subtitle="Tout ce que vous devez savoir sur les projets de développement et les opportunités d'investissement dans les Zones Économiques Spéciales de la RDC."
        variant={4}
        accentColor="#6B48A0"
      />

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#040810]" />
        <div className="absolute inset-0 opacity-[0.09]"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=50')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[400px]"
            style={{ background: 'radial-gradient(ellipse at left top, rgba(107,72,160,0.12) 0%, transparent 65%)' }} />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px]"
            style={{ background: 'radial-gradient(ellipse at right bottom, rgba(42,122,75,0.10) 0%, transparent 65%)' }} />
        </div>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  className="group block h-full relative bg-white/[0.04] border border-white/[0.08] rounded-2xl overflow-hidden hover:border-white/20 hover:bg-white/[0.07] hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ background: `linear-gradient(90deg, ${page.color}, transparent)` }} />
                  {/* Corner glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
                    style={{ background: `radial-gradient(circle at 0% 0%, ${page.color}15 0%, transparent 50%)` }} />

                  <div className="relative p-8">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${page.color}20`, border: `1px solid ${page.color}30` }}>
                      <page.icon className="w-7 h-7" style={{ color: page.color }} />
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: page.color }}>{page.count}</div>
                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors">{page.title}</h2>
                    <p className="text-white/45 leading-relaxed mb-6 text-sm">{page.desc}</p>
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
