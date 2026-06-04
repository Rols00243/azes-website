'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { MapPinIcon, BuildingOffice2Icon, UsersIcon, CurrencyDollarIcon, ArrowRightIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import AnimatedCounter from '@/components/AnimatedCounter'
import type { Zone } from '@/lib/data/zones'

export default function StatsParZone({ zones }: { zones: Zone[] }) {
  const [activeSlug, setActiveSlug] = useState(zones[0].slug)
  const zone = zones.find((z) => z.slug === activeSlug)!

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-azes-blue text-sm font-semibold uppercase tracking-wider mb-3">
              <ChartBarIcon className="w-4 h-4" />
              Statistiques par zone
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-azes-blue-dark">Performance des ZES</h2>
            <p className="text-gray-500 mt-2 max-w-lg">
              Sélectionnez une zone pour consulter ses indicateurs clés d'investissement et d'emploi.
            </p>
          </div>
          <Link href="/zones" className="inline-flex items-center gap-2 text-sm font-semibold text-azes-blue hover:text-azes-blue-dark transition-colors">
            Voir toutes les zones <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {zones.map((z) => (
            <button
              key={z.slug}
              onClick={() => setActiveSlug(z.slug)}
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              style={activeSlug === z.slug ? { backgroundColor: z.color, color: '#fff' } : { backgroundColor: '#F3F4F6', color: '#374151' }}
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: activeSlug === z.slug ? 'rgba(255,255,255,0.7)' : z.color }} />
              {z.shortName}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="px-8 py-6 text-white" style={{ backgroundColor: zone.color }}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">{zone.sector}</div>
                    <h3 className="text-2xl font-bold">{zone.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1 text-white/80 text-sm">
                      <MapPinIcon className="w-4 h-4" />
                      {zone.location}
                    </div>
                  </div>
                  <Link href={`/zones/${zone.slug}`} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-semibold text-white transition-colors flex-shrink-0">
                    Voir la zone <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="bg-gray-50 grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-100">
                {[
                  { icon: BuildingOffice2Icon, label: 'Superficie',      value: zone.superficie,  numeric: false },
                  { icon: BuildingOffice2Icon, label: 'Entreprises',     value: zone.entreprises, numeric: true, suffix: '+' },
                  { icon: UsersIcon,           label: 'Emplois créés',   value: zone.emplois,     numeric: true, suffix: '' },
                  { icon: CurrencyDollarIcon,  label: 'Investissements', value: zone.investissement, numeric: false },
                ].map((s) => (
                  <div key={s.label} className="p-6 text-center">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: zone.color + '15' }}>
                      <s.icon className="w-5 h-5" style={{ color: zone.color }} />
                    </div>
                    <div className="text-2xl font-bold text-azes-blue-dark">
                      {s.numeric ? (
                        <AnimatedCounter end={s.value as number} suffix={s.suffix ?? ''} />
                      ) : (
                        s.value
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mt-1 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white px-8 py-6">
                <div className="text-sm font-semibold text-gray-700 mb-4">Atouts principaux</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {zone.advantages.map((a) => (
                    <div key={a} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: zone.color }} />
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
