'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import SectionHeader from '@/components/SectionHeader'
import { ArrowRightIcon, CalendarIcon, NewspaperIcon } from '@heroicons/react/24/outline'
import type { Actualite } from '@/lib/server-data'

const catColor: Record<string, string> = {
  Partenariat:    '#1B4F8C',
  Formation:      '#2A7A4B',
  Projets:        '#C4894A',
  Investissement: '#6B48A0',
  Événement:      '#8B5E3C',
  Annonce:        '#1E7A9E',
}

const cardAccents = ['#1B4F8C', '#2A7A4B', '#C4894A']

export default function ActualitesSection({ items }: { items: Actualite[] }) {
  if (items.length === 0) return null

  return (
    /* ── SECTION ÉCLAIRÉE ⑧ ── lumière bleue-marine depuis la droite */
    <section className="relative py-20 overflow-hidden">

      {/* Base illuminée */}
      <div className="absolute inset-0 bg-[#0a1825]" />

      {/* Photo industrielle — presse / imprimerie / bâtiment */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1400&q=60')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      />

      {/* ── Lumière directionnelle depuis la droite (bleu nuit vif) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Rayon principal — bleu nuit depuis droite */}
        <div className="absolute"
          style={{
            inset: 0,
            background: 'radial-gradient(ellipse 70% 120% at 110% 45%, rgba(27,79,140,0.28) 0%, rgba(27,79,140,0.10) 45%, transparent 68%)',
          }} />
        {/* Halo ambre — bas gauche */}
        <div className="absolute"
          style={{
            inset: 0,
            background: 'radial-gradient(ellipse 50% 50% at -5% 100%, rgba(196,137,74,0.16) 0%, transparent 60%)',
          }} />
        {/* Ligne lumineuse horizontale */}
        <div className="absolute top-1/2 -translate-y-1/2 left-[30%] right-0 h-px opacity-15"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(27,79,140,0.7) 40%, rgba(27,79,140,0.9))' }} />
      </div>

      {/* Lignes de bord */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-[#1B4F8C]/25" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <SectionHeader eyebrow="Actualités" title="Dernières nouvelles de l'AZES" light />
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
                className="group bg-white/[0.07] border border-white/[0.12] rounded-2xl overflow-hidden hover:border-white/25 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image area with industrial industrial overlay */}
                <div className="h-36 relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${accent}cc 0%, rgba(2,5,8,0.9) 100%)` }}>
                  <div className="absolute inset-0 opacity-[0.08]"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=40')`,
                      backgroundSize: 'cover', backgroundPosition: 'center',
                    }} />
                  <div className="absolute inset-0 opacity-[0.06]">
                    <svg width="100%" height="100%">
                      <defs><pattern id={`actu${i}`} width="30" height="30" patternUnits="userSpaceOnUse">
                        <circle cx="15" cy="15" r="5" fill="none" stroke="white" strokeWidth="0.4" />
                      </pattern></defs>
                      <rect width="100%" height="100%" fill={`url(#actu${i})`} />
                    </svg>
                  </div>
                  <div className="absolute bottom-3 left-4">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                      style={{ color: accent, backgroundColor: `${accent}25`, border: `1px solid ${accent}40` }}>
                      {actu.categorie}
                    </span>
                  </div>
                  <NewspaperIcon className="absolute top-3 right-3 w-5 h-5 text-white/20" />
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs text-white/30 mb-3">
                    <CalendarIcon className="w-3.5 h-3.5" />
                    {new Date(actu.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <h3 className="font-bold text-white/80 leading-snug mb-2 group-hover:text-white transition-colors line-clamp-2">
                    {actu.titre}
                  </h3>
                  <p className="text-sm text-white/35 leading-relaxed line-clamp-3 mb-4">{actu.extrait}</p>
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
