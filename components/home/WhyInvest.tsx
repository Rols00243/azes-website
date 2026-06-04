'use client'

import { motion } from 'framer-motion'
import {
  ScaleIcon,
  BanknotesIcon,
  GlobeAltIcon,
  BoltIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/outline'
import SectionHeader from '@/components/SectionHeader'

const advantages = [
  {
    icon: ScaleIcon,
    title: 'Cadre Juridique',
    desc: 'Loi dédiée aux ZES, stabilité réglementaire garantie sur 25 ans, protection des investissements étrangers.',
  },
  {
    icon: BanknotesIcon,
    title: 'Exonérations Fiscales',
    desc: 'Exonération totale d\'impôts pendant 10 ans, TVA réduite, exonération de droits de douane sur équipements.',
  },
  {
    icon: GlobeAltIcon,
    title: 'Accès aux Marchés',
    desc: 'Zone de libre-échange africaine (ZLECAF), accords préférentiels, accès à 1,4 milliard de consommateurs.',
  },
  {
    icon: BoltIcon,
    title: 'Infrastructure',
    desc: 'Énergie électrique dédiée, fibre optique, routes, rails et ports à proximité des zones.',
  },
  {
    icon: UserGroupIcon,
    title: 'Main-d\'œuvre',
    desc: 'Population jeune et dynamique, programmes de formation professionnelle, coût du travail compétitif.',
  },
  {
    icon: BuildingOffice2Icon,
    title: 'Guichet Unique',
    desc: 'Administration simplifiée, obtention de licences en 48h, accompagnement personnalisé de A à Z.',
  },
]

export default function WhyInvest() {
  return (
    /* ── SECTION ÉCLAIRÉE ⑥ ── lumière ambrée depuis le bas-gauche */
    <section className="relative py-24 overflow-hidden" aria-labelledby="pourquoi-investir">

      {/* Base illuminée */}
      <div className="absolute inset-0 bg-[#071d30]" />

      {/* Photo industrielle — usine / infrastructure */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1565118531796-763e5082d113?w=1400&q=60')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* ── Lumière directionnelle depuis le bas-gauche */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Rayon principal — ambre chaud bas-gauche */}
        <div className="absolute"
          style={{
            inset: 0,
            background: 'radial-gradient(ellipse 80% 100% at -10% 110%, rgba(196,137,74,0.30) 0%, rgba(196,137,74,0.12) 40%, transparent 65%)',
          }} />
        {/* Halo bleu — haut droite */}
        <div className="absolute"
          style={{
            inset: 0,
            background: 'radial-gradient(ellipse 55% 50% at 110% 0%, rgba(27,79,140,0.20) 0%, transparent 65%)',
          }} />
        {/* Ligne de lumière diagonale ascendante */}
        <div className="absolute bottom-0 left-0 right-[40%] h-px opacity-20"
          style={{ background: 'linear-gradient(90deg, rgba(196,137,74,0.9), rgba(196,137,74,0.3) 50%, transparent)' }} />
      </div>

      {/* Separator lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-[#C4894A]/20 via-white/10 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Pourquoi choisir les ZES RDC"
          title="Des avantages compétitifs uniques"
          description="La RDC offre un cadre d'investissement parmi les plus attractifs d'Afrique centrale."
          center
          light
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {advantages.map((adv, i) => (
            <motion.div
              key={adv.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-white/[0.07] border border-white/[0.12] rounded-2xl p-6 hover:bg-white/[0.11] hover:border-white/20 transition-all overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'radial-gradient(circle at 30% 40%, rgba(196,137,74,0.06) 0%, transparent 60%)' }} />
              <div className="relative">
                <div className="w-12 h-12 bg-[#C4894A]/15 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#C4894A]/25 transition-colors">
                  <adv.icon className="w-6 h-6 text-[#C4894A]" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{adv.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{adv.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
