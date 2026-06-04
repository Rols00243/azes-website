'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { zones } from '@/lib/data/zones'
import { MapPinIcon, BuildingOfficeIcon, UsersIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import SectionHeader from '@/components/SectionHeader'

export default function ZonesGrid() {
  return (
    <section className="relative py-24 overflow-hidden bg-[#0a1628]">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px]"
          style={{ background: 'radial-gradient(ellipse, rgba(196,137,74,0.09) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px]"
          style={{ background: 'radial-gradient(circle at right bottom, rgba(42,122,75,0.07) 0%, transparent 70%)' }} />
      </div>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Nos Zones"
          title="Sept zones stratégiques"
          description="Des zones économiques spéciales conçues pour maximiser votre potentiel d'investissement à travers toute la RDC."
          center
          light
        />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {zones.map((zone, i) => (
            <motion.div
              key={zone.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Link
                href={`/zones/${zone.slug}`}
                className="group block bg-white/[0.03] rounded-2xl overflow-hidden border border-white/[0.07] hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
                aria-label={`Voir la ${zone.name}`}
              >
                <div className="h-1" style={{ backgroundColor: zone.color }} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-1">{zone.sector}</div>
                      <h3 className="text-base font-bold text-white/90 group-hover:text-white transition-colors">{zone.name}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: zone.color + '25' }}>
                      <MapPinIcon className="w-5 h-5" style={{ color: zone.color }} />
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-sm text-white/40 mb-3">
                    <MapPinIcon className="w-4 h-4" />{zone.location}
                  </div>

                  <p className="text-sm text-white/35 leading-relaxed mb-5 line-clamp-2">{zone.description}</p>

                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {[
                      { val: zone.superficie, label: 'Superficie' },
                      { val: String(zone.entreprises), label: 'Entreprises' },
                      { val: zone.investissement, label: 'Investi' },
                    ].map((s) => (
                      <div key={s.label} className="text-center p-2.5 bg-white/[0.04] rounded-xl border border-white/[0.06]">
                        <div className="font-bold text-white/80 text-xs">{s.val}</div>
                        <div className="text-[10px] text-white/25 mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    <div className="flex items-center gap-1.5 text-xs text-white/40">
                      <UsersIcon className="w-4 h-4" />
                      {zone.emplois.toLocaleString('fr-FR')} emplois
                    </div>
                    <span className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all"
                      style={{ color: zone.color }}>
                      Découvrir <ArrowRightIcon className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }} className="mt-10 text-center">
          <Link href="/zones"
            className="inline-flex items-center gap-2 px-8 py-3 border border-[#C4894A]/40 text-[#C4894A] font-semibold rounded-xl hover:bg-[#C4894A]/10 transition-all hover:scale-105 active:scale-95">
            Voir toutes les zones <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
