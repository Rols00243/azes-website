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
    color: '#1B4F8C',
  },
  {
    icon: BanknotesIcon,
    title: 'Exonérations Fiscales',
    desc: 'Exonération totale d\'impôts pendant 10 ans, TVA réduite, exonération de droits de douane sur équipements.',
    color: '#2A7A4B',
  },
  {
    icon: GlobeAltIcon,
    title: 'Accès aux Marchés',
    desc: 'Zone de libre-échange africaine (ZLECAF), accords préférentiels, accès à 1,4 milliard de consommateurs.',
    color: '#C4894A',
  },
  {
    icon: BoltIcon,
    title: 'Infrastructure',
    desc: 'Énergie électrique dédiée, fibre optique, routes, rails et ports à proximité des zones.',
    color: '#8B5E3C',
  },
  {
    icon: UserGroupIcon,
    title: 'Main-d\'œuvre',
    desc: 'Population jeune et dynamique, programmes de formation professionnelle, coût du travail compétitif.',
    color: '#1E7A9E',
  },
  {
    icon: BuildingOffice2Icon,
    title: 'Guichet Unique',
    desc: 'Administration simplifiée, obtention de licences en 48h, accompagnement personnalisé de A à Z.',
    color: '#6B48A0',
  },
]

export default function WhyInvest() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(150deg, #edf2ff 0%, #ffffff 50%, #e8f4fd 100%)' }} aria-labelledby="pourquoi-investir">

      {/* Atmospheric image — business district / modern infrastructure */}
      <div className="absolute inset-0">
        <img
          src="/images/zone-infra.png"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.055 }}
          loading="lazy"
        />
      </div>

      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -28, 0], x: [0, 10, 0], opacity: [0.2, 0.32, 0.2] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ backgroundColor: '#1B4F8C' }}
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -10, 0], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute -bottom-24 right-0 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: '#6B48A0' }}
        />
        <motion.div
          animate={{ y: [0, 15, 0], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-3xl"
          style={{ backgroundColor: '#2A7A4B' }}
        />
      </div>

      {/* Blueprint grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `
          linear-gradient(rgba(27,79,140,0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(27,79,140,0.5) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Pourquoi choisir les ZES RDC"
          title="Des avantages compétitifs uniques"
          description="La RDC offre un cadre d'investissement parmi les plus attractifs d'Afrique centrale."
          center
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {advantages.map((adv, i) => (
            <motion.div
              key={adv.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-white/90 backdrop-blur-sm border border-white/80 rounded-2xl p-6 hover:border-gray-200 hover:shadow-xl hover:-translate-y-2 transition-all overflow-hidden"
              style={{ boxShadow: `0 2px 16px ${adv.color}08` }}
            >
              {/* Top accent gradient */}
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${adv.color}, ${adv.color}55, transparent)` }} />
              {/* Hover inner glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `radial-gradient(ellipse at top left, ${adv.color}0a 0%, transparent 60%)` }} />

              <div className="relative">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${adv.color}15`, border: `1px solid ${adv.color}30` }}>
                  <adv.icon className="w-6 h-6" style={{ color: adv.color }} />
                </div>
                <h3 className="text-base font-bold text-[#0A2342] mb-2">{adv.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{adv.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
