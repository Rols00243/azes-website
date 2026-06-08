'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { zones } from '@/lib/data/zones'
import { MapPinIcon, UsersIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import SectionHeader from '@/components/SectionHeader'

export default function ZonesGrid() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(150deg, #f0faf5 0%, #ffffff 45%, #e8f4fd 100%)' }} aria-label="Zones économiques">

      {/* Atmospheric image — aerial Congo / African industrial zone */}
      <div className="absolute inset-0">
        <img
          src="/images/zone-aerial.png"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.06 }}
          loading="lazy"
        />
      </div>

      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -20, 0], opacity: [0.18, 0.3, 0.18] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ backgroundColor: '#2A7A4B' }}
        />
        <motion.div
          animate={{ x: [0, -15, 0], y: [0, 25, 0], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-0 -left-32 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: '#1E7A9E' }}
        />
        <motion.div
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl"
          style={{ backgroundColor: '#C4894A' }}
        />
      </div>

      {/* Subtle hex grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(#2A7A4B 1.5px, transparent 1.5px)',
        backgroundSize: '40px 40px',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Nos Zones"
          title="Sept zones stratégiques"
          description="Des zones économiques spéciales conçues pour maximiser votre potentiel d'investissement à travers toute la RDC."
          center
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
                className="group block bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/80 hover:border-gray-200 hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
                style={{ boxShadow: `0 2px 16px ${zone.color}0a` }}
                aria-label={`Voir la ${zone.name}`}
              >
                {/* Colored top bar + zone image strip */}
                <div className="h-2 relative overflow-hidden" style={{ backgroundColor: zone.color }}>
                  <div className="absolute inset-0 opacity-50" style={{ background: `linear-gradient(90deg, ${zone.color}, ${zone.color}88, ${zone.color})` }} />
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">{zone.sector}</div>
                      <h3 className="text-base font-bold text-[#0A2342] group-hover:text-[#1B4F8C] transition-colors">{zone.name}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: zone.color + '18', border: `1px solid ${zone.color}30` }}>
                      <MapPinIcon className="w-5 h-5" style={{ color: zone.color }} />
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-3">
                    <MapPinIcon className="w-4 h-4" />{zone.location}
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed mb-5 line-clamp-2">{zone.description}</p>

                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {[
                      { val: zone.superficie, label: 'Superficie' },
                      { val: String(zone.entreprises), label: 'Entreprises' },
                      { val: zone.investissement, label: 'Investi' },
                    ].map((s) => (
                      <div key={s.label} className="text-center p-2.5 rounded-xl border"
                        style={{ backgroundColor: `${zone.color}06`, borderColor: `${zone.color}20` }}>
                        <div className="font-bold text-[#0A2342] text-xs">{s.val}</div>
                        <div className="text-[10px] text-gray-400 mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
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
            className="inline-flex items-center gap-2 px-8 py-3 border border-[#C4894A]/40 text-[#C4894A] font-semibold rounded-xl hover:bg-[#C4894A]/10 transition-all hover:scale-105 active:scale-95 bg-white/80 backdrop-blur-sm">
            Voir toutes les zones <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
