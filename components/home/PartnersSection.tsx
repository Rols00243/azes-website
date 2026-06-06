'use client'

import { motion } from 'framer-motion'
import { GlobeAltIcon } from '@heroicons/react/24/outline'

const partners = [
  { name: 'Banque Mondiale', short: 'WB',   category: 'Financement',    color: '#1B4F8C', desc: 'Institution financière multilatérale' },
  { name: 'IFC',             short: 'IFC',  category: 'Financement',    color: '#2A7A4B', desc: 'Secteur privé — Groupe BM' },
  { name: 'BAD',             short: 'AfDB', category: 'Financement',    color: '#C4894A', desc: 'Banque Africaine de Développement' },
  { name: 'AFD',             short: 'AFD',  category: 'Coopération',    color: '#8B5E3C', desc: 'Agence Française de Développement' },
  { name: 'PROPARCO',        short: 'PRO',  category: 'Financement',    color: '#1E7A9E', desc: 'Filiale de l\'AFD' },
  { name: 'GIZ',             short: 'GIZ',  category: 'Coopération',    color: '#6B48A0', desc: 'Coopération allemande' },
  { name: 'ONUDI',           short: 'UNIDO',category: 'Développement',  color: '#2A7A4B', desc: 'Nations Unies — Industrie' },
  { name: 'DFC',             short: 'DFC',  category: 'Financement',    color: '#1B4F8C', desc: 'U.S. Development Finance Corp.' },
  { name: 'JICA',            short: 'JICA', category: 'Coopération',    color: '#C4894A', desc: 'Coopération japonaise' },
  { name: 'Glencore',        short: 'GLN',  category: 'Minier',         color: '#8B5E3C', desc: 'Leader mondial des matières premières' },
  { name: 'Ivanhoe Mines',   short: 'IVN',  category: 'Minier',         color: '#1E7A9E', desc: 'Mines — Kamoa-Kakula' },
  { name: 'China CAMC',      short: 'CAMC', category: 'Infrastructures', color: '#6B48A0', desc: 'Ingénierie & construction' },
]

const categoryColors: Record<string, string> = {
  Financement:    '#1B4F8C',
  Coopération:    '#2A7A4B',
  Développement:  '#2A7A4B',
  Minier:         '#8B5E3C',
  Infrastructures:'#6B48A0',
}

export default function PartnersSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white" aria-label="Partenaires">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 text-[#C4894A] text-xs font-bold uppercase tracking-widest mb-3">
            <GlobeAltIcon className="w-4 h-4" />
            Écosystème partenarial
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2342] mb-3">
            Nos Partenaires & Investisseurs
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            Un réseau d'institutions financières, d'organisations de coopération et d'acteurs du secteur privé engagés dans le développement des ZES de la RDC.
          </p>
        </motion.div>

        {/* Partner grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 mb-10">
          {partners.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative bg-white border border-gray-200 rounded-2xl p-4 hover:border-gray-300 hover:shadow-md transition-all cursor-default text-center overflow-hidden"
            >
              {/* Corner accent on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }} />

              {/* Logo monogram */}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all group-hover:scale-110"
                style={{ backgroundColor: `${p.color}12`, border: `1px solid ${p.color}25` }}>
                <span className="text-xs font-black tracking-tighter" style={{ color: p.color }}>{p.short}</span>
              </div>

              <div className="font-bold text-[#0A2342] text-xs mb-1 leading-tight">{p.name}</div>
              <div className="text-[10px] text-gray-400 leading-tight">{p.desc}</div>

              {/* Category badge */}
              <div className="mt-2.5 inline-block px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                style={{ color: categoryColors[p.category] ?? p.color, backgroundColor: `${categoryColors[p.category] ?? p.color}12`, border: `1px solid ${categoryColors[p.category] ?? p.color}25` }}>
                {p.category}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-xs text-gray-400 italic">
            +40 partenaires techniques et financiers accompagnent le développement des ZES
          </p>
        </motion.div>
      </div>
    </section>
  )
}
