'use client'

import dynamic from 'next/dynamic'
import { zones } from '@/lib/data/zones'
import Link from 'next/link'
import { MapPinIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import DarkPageHero from '@/components/ui/DarkPageHero'
import LightSection from '@/components/ui/LightSection'

const MapZES = dynamic(() => import('@/components/MapZES'), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 text-sm">
      Chargement de la carte…
    </div>
  ),
})

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55 },
}

export default function ZonesPage() {
  return (
    <div className="min-h-screen">

      {/* ── HERO ── */}
      <DarkPageHero
        eyebrow="Territoires d'opportunités"
        title="Nos 7 Zones"
        titleAccent="Économiques Spéciales"
        subtitle="Sept zones stratégiques couvrant les secteurs clés de l'économie congolaise, de l'industrie minière à l'agro-industrie."
        variant={1}
        accentColor="#1B4F8C"
      />

      {/* ── CARTE INTERACTIVE ── */}
      <LightSection className="py-20" image="aerial">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-[#C4894A] text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-6 h-px bg-[#C4894A]/60" /> Géographie
            </div>
            <h2 className="text-3xl font-bold text-[#0A2342] mb-3">Carte interactive des ZES</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              Survolez les marqueurs pour explorer chaque zone économique spéciale.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <MapZES />
          </motion.div>
        </div>
      </LightSection>

      {/* ── LISTE DES ZONES ── */}
      <LightSection className="py-20" alt image="infra">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <motion.div {...fadeUp} className="mb-8">
            <div className="inline-flex items-center gap-2 text-[#C4894A] text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-6 h-px bg-[#C4894A]/60" /> Toutes les zones
            </div>
            <h2 className="text-3xl font-bold text-[#0A2342]">Les 7 ZES de la RDC</h2>
          </motion.div>
          {zones.map((zone, i) => (
            <motion.div
              key={zone.slug}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 hover:shadow-md transition-all group relative"
            >
              {/* Colored top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${zone.color}, transparent)` }} />
              <div className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white"
                        style={{ backgroundColor: zone.color }}>
                        {zone.sector}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPinIcon className="w-4 h-4" /> {zone.location}
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-[#0A2342] mb-3 group-hover:text-[#1B4F8C] transition-colors">
                      {zone.name}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6 max-w-2xl text-sm">{zone.description}</p>
                    <div className="mb-6">
                      <div className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Avantages principaux</div>
                      <div className="space-y-2">
                        {zone.advantages.slice(0, 3).map((a) => (
                          <div key={a} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: zone.color }} />
                            {a}
                          </div>
                        ))}
                      </div>
                    </div>
                    <Link href={`/zones/${zone.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl transition-all hover:scale-105 active:scale-95 text-sm"
                      style={{ backgroundColor: zone.color }}>
                      Découvrir la zone <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="lg:w-64 grid grid-cols-2 gap-3">
                    {[
                      { label: 'Superficie', value: zone.superficie },
                      { label: 'Entreprises', value: String(zone.entreprises || '—') },
                      { label: 'Emplois', value: zone.emplois ? zone.emplois.toLocaleString('fr-FR') : '—' },
                      { label: 'Investissement', value: zone.investissement },
                    ].map((s) => (
                      <div key={s.label} className="rounded-xl p-4 text-center border border-gray-200 bg-white hover:shadow-sm transition-all"
                        style={{ borderTopColor: zone.color, borderTopWidth: '2px' }}>
                        <div className="font-bold text-[#0A2342] text-base">{s.value}</div>
                        <div className="text-[11px] text-gray-500 mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </LightSection>
    </div>
  )
}
