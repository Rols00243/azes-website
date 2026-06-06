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
    <section className="py-24 bg-gray-50" aria-labelledby="pourquoi-investir">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              className="group relative bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-300 hover:shadow-md hover:-translate-y-1 transition-all overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${adv.color}, transparent)` }} />
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${adv.color}15`, border: `1px solid ${adv.color}25` }}>
                <adv.icon className="w-6 h-6" style={{ color: adv.color }} />
              </div>
              <h3 className="text-base font-bold text-[#0A2342] mb-2">{adv.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{adv.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
