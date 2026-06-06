'use client'

import dynamic from 'next/dynamic'
import { zones } from '@/lib/data/zones'
import Link from 'next/link'
import { MapPinIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import DarkPageHero from '@/components/ui/DarkPageHero'

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
    <div className="bg-gray-50 min-h-screen">

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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-10">
            <div className="text-xs font-semibold tracking-widest uppercase text-[#1B4F8C] mb-2">Géographie</div>
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
      </section>

      {/* ── LISTE DES ZONES ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {zones.map((zone, i) => (
            <motion.div
              key={zone.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 hover:shadow-md transition-all group"
              style={{ borderLeft: `3px solid ${zone.color}` }}
            >
              <div className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                  <div className="flex-1">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span
                        className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white"
                        style={{ backgroundColor: zone.color }}
                      >
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
                      <div className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                        Avantages principaux
                      </div>
                      <div className="space-y-2">
                        {zone.advantages.slice(0, 3).map((a) => (
                          <div key={a} className="flex items-start gap-2 text-sm text-gray-600">
                            <span
                              className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ backgroundColor: zone.color }}
                            />
                            {a}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={`/zones/${zone.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl transition-all hover:scale-105 active:scale-95 text-sm"
                      style={{ backgroundColor: zone.color }}
                    >
                      Découvrir la zone <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Chiffres */}
                  <div className="lg:w-64 grid grid-cols-2 gap-3">
                    {[
                      { label: 'Superficie', value: zone.superficie },
                      { label: 'Entreprises', value: String(zone.entreprises || '—') },
                      { label: 'Emplois', value: zone.emplois ? zone.emplois.toLocaleString('fr-FR') : '—' },
                      { label: 'Investissement', value: zone.investissement },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="rounded-xl p-4 text-center border border-gray-100"
                        style={{ background: `${zone.color}0D` }}
                      >
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
      </section>
    </div>
  )
}
