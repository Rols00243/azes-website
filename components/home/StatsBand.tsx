'use client'

import { motion } from 'framer-motion'
import AnimatedCounter from '@/components/AnimatedCounter'
import { BuildingOffice2Icon, BriefcaseIcon, CurrencyDollarIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import type { SiteStats } from '@/lib/server-data'

export default function StatsBand({ stats }: { stats: SiteStats }) {
  const items = [
    { icon: BuildingOffice2Icon, value: stats.zones_actives,   label: 'Zones Actives',           isNum: true,  suffix: '',  color: '#1B4F8C' },
    { icon: BriefcaseIcon,       value: stats.entreprises,     label: 'Entreprises Installées',   isNum: true,  suffix: '+', color: '#2A7A4B' },
    { icon: CurrencyDollarIcon,  value: stats.investissements, label: 'Investissements (USD)',    isNum: false, suffix: '',  color: '#C4894A' },
    { icon: UserGroupIcon,       value: stats.emplois,         label: 'Emplois Créés',            isNum: true,  suffix: '',  color: '#8B5E3C' },
  ]

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #e8f0fe 0%, #ffffff 40%, #f0f7f4 100%)' }} aria-label="Chiffres clés">

      {/* Atmospheric image overlay — aerial industrial zone */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&w=1920&q=60"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.05 }}
          loading="lazy"
        />
      </div>

      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -25, 0], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-24 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: '#1B4F8C' }}
        />
        <motion.div
          animate={{ y: [0, 20, 0], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/3 -right-24 w-80 h-80 rounded-full blur-3xl"
          style={{ backgroundColor: '#2A7A4B' }}
        />
        <motion.div
          animate={{ y: [0, -18, 0], opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-24 left-1/2 w-72 h-72 rounded-full blur-3xl"
          style={{ backgroundColor: '#C4894A' }}
        />
      </div>

      {/* Dot-grid decorative pattern */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: 'radial-gradient(#1B4F8C 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-[#C4894A] text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-8 h-px bg-[#C4894A]/60" />
            Performances 2025
            <span className="w-8 h-px bg-[#C4894A]/60" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2342]">
            Les ZES de la RDC en chiffres
          </h2>
          <p className="text-gray-500 mt-2 text-sm max-w-xl mx-auto">
            Indicateurs consolidés sur l'ensemble du réseau des Zones Économiques Spéciales.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative group"
            >
              <div className="relative bg-white/90 backdrop-blur-sm border border-white/80 rounded-2xl px-6 py-8 text-center hover:border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden"
                style={{ boxShadow: `0 4px 24px ${stat.color}0d` }}>
                <div className="absolute top-0 left-8 right-8 h-0.5 rounded-full"
                  style={{ backgroundColor: stat.color, opacity: 0.8 }} />
                {/* Card glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `radial-gradient(ellipse at center top, ${stat.color}08 0%, transparent 60%)` }} />

                <div className="relative">
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${stat.color}15`, border: `1px solid ${stat.color}30` }}>
                      <stat.icon className="w-7 h-7" style={{ color: stat.color }} />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-[#0A2342] mb-1 tabular-nums">
                    {stat.isNum
                      ? <AnimatedCounter end={stat.value as number} suffix={stat.suffix} />
                      : <span>{stat.value}</span>}
                  </div>
                  <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
