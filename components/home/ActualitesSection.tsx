'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import SectionHeader from '@/components/SectionHeader'
import { ArrowRightIcon, CalendarIcon, NewspaperIcon } from '@heroicons/react/24/outline'
import type { Actualite } from '@/lib/server-data'

const cardAccents = ['#1B4F8C', '#2A7A4B', '#C4894A']

export default function ActualitesSection({ items }: { items: Actualite[] }) {
  if (items.length === 0) return null

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #fffbf5 0%, #ffffff 45%, #f5f9ff 100%)' }} aria-label="Actualités">

      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -22, 0], opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ backgroundColor: '#C4894A' }}
        />
        <motion.div
          animate={{ y: [0, 18, 0], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl"
          style={{ backgroundColor: '#1B4F8C' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <SectionHeader eyebrow="Actualités" title="Dernières nouvelles de l'AZES" />
          <Link href="#" className="flex-shrink-0 flex items-center gap-2 text-sm font-semibold text-[#C4894A] hover:text-[#a87540] transition-colors">
            Toutes les actualités <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.slice(0, 3).map((actu, i) => {
            const accent = cardAccents[i % 3]
            return (
              <motion.article
                key={actu.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white/90 backdrop-blur-sm border border-white/80 rounded-2xl overflow-hidden hover:border-gray-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                style={{ boxShadow: `0 2px 16px ${accent}08` }}
              >
                {/* Image area */}
                <div className="h-40 relative overflow-hidden flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${accent}20 0%, ${accent}08 100%)`, borderBottom: `1px solid ${accent}20` }}>
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}55, transparent)` }} />
                  {/* Subtle background image in card */}
                  <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(ellipse at center, ${accent} 0%, transparent 70%)` }} />
                  <NewspaperIcon className="w-12 h-12 opacity-25 relative z-10" style={{ color: accent }} />
                  <div className="absolute bottom-3 left-4">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                      style={{ color: accent, backgroundColor: `${accent}18`, border: `1px solid ${accent}30` }}>
                      {actu.categorie}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
                    <CalendarIcon className="w-3.5 h-3.5" />
                    {new Date(actu.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <h3 className="font-bold text-[#0A2342] leading-snug mb-2 group-hover:text-[#1B4F8C] transition-colors line-clamp-2">
                    {actu.titre}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">{actu.extrait}</p>
                  <Link href={`/actualites/${actu.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all"
                    style={{ color: accent }}>
                    Lire la suite <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
