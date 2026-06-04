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
    /* ── SECTION ÉCLAIRÉE ② ── lumière ambrée forte depuis la gauche */
    <section className="relative py-20 overflow-hidden" aria-label="Chiffres clés">

      {/* Base légèrement plus claire */}
      <div className="absolute inset-0 bg-[#071d30]" />

      {/* Photo industrielle — plus visible dans sections éclairées */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=60')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
        }}
      />

      {/* ── Lumière directionnelle depuis la gauche (comme un hangar éclairé) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Rayon principal — ambre chaud gauche */}
        <div className="absolute"
          style={{
            inset: 0,
            background: 'radial-gradient(ellipse 75% 130% at -5% 55%, rgba(196,137,74,0.32) 0%, rgba(196,137,74,0.10) 40%, transparent 65%)',
          }} />
        {/* Halo secondaire vert — bas droite */}
        <div className="absolute"
          style={{
            inset: 0,
            background: 'radial-gradient(ellipse 50% 60% at 105% 80%, rgba(42,122,75,0.18) 0%, transparent 60%)',
          }} />
        {/* Ligne de lumière horizontale (effet fenêtre) */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-px opacity-20"
          style={{ background: 'linear-gradient(90deg, rgba(196,137,74,0.8), rgba(196,137,74,0.3) 30%, transparent 60%)' }} />
      </div>

      {/* Lignes de bord */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-[#C4894A]/30 via-white/10 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Titre de section (manquait) ── */}
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Les ZES de la RDC en chiffres
          </h2>
          <p className="text-white/50 mt-2 text-sm max-w-xl mx-auto">
            Indicateurs consolidés sur l'ensemble du réseau des Zones Économiques Spéciales.
          </p>
        </motion.div>

        {/* ── KPI cards ── */}
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
              {/* Card — légèrement translucide sur fond éclairé */}
              <div className="relative bg-white/[0.07] border border-white/[0.12] rounded-2xl px-6 py-8 text-center hover:bg-white/[0.11] hover:border-white/20 transition-all overflow-hidden">
                {/* Top accent */}
                <div className="absolute top-0 left-8 right-8 h-0.5 rounded-full"
                  style={{ backgroundColor: stat.color, opacity: 0.7 }} />
                {/* Inner glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${stat.color}15 0%, transparent 60%)` }} />

                <div className="relative">
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${stat.color}25`, border: `1px solid ${stat.color}30` }}>
                      <stat.icon className="w-7 h-7" style={{ color: stat.color }} />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-white mb-1 tabular-nums">
                    {stat.isNum
                      ? <AnimatedCounter end={stat.value as number} suffix={stat.suffix} />
                      : <span>{stat.value}</span>}
                  </div>
                  <div className="text-xs text-white/50 font-medium">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
