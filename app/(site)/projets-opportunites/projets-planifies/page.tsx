'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPinIcon, CalendarIcon, CurrencyDollarIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import DarkPageHero from '@/components/ui/DarkPageHero'

const nouvellesZones = [
  {
    nom: 'Zone Énergétique de Kisangani',
    region: 'Province Orientale',
    secteur: 'Énergie / Hydraulique',
    timeline: '2027-2031',
    description: 'Valorisation du potentiel hydroélectrique du fleuve Congo pour créer une zone dédiée aux industries énergivores.',
    couleur: '#2A7A4B',
  },
  {
    nom: 'Zone Touristique du Kivu',
    region: 'Sud-Kivu',
    secteur: 'Tourisme / Hôtellerie',
    timeline: '2028-2033',
    description: 'Développement d\'une zone économique spéciale autour du tourisme écologique et du lac Kivu.',
    couleur: '#1B4F8C',
  },
  {
    nom: 'Zone Pharmaceutique de Kongo Central',
    region: 'Kongo-Central',
    secteur: 'Santé / Pharmacie',
    timeline: '2027-2030',
    description: 'Création d\'un pôle de production pharmaceutique pour réduire la dépendance aux importations médicales.',
    couleur: '#C4894A',
  },
]

const ppp = [
  {
    titre: 'Extension Port de Matadi',
    type: 'Concession portuaire',
    budget: '$320M',
    retour: '12-15 ans',
    desc: 'Extension du terminal à conteneurs et modernisation des équipements portuaires.',
  },
  {
    titre: 'Centrale Solaire ZES Kasaï',
    type: 'Énergie renouvelable',
    budget: '$85M',
    retour: '8-10 ans',
    desc: '200 MW de capacité solaire dédiée à la Zone Agro-Industrielle du Kasaï.',
  },
  {
    titre: 'Réseau de Fibre Optique Inter-ZES',
    type: 'Infrastructure télécoms',
    budget: '$45M',
    retour: '10-12 ans',
    desc: 'Interconnexion des 4 ZES par fibre optique haute capacité.',
  },
]

export default function ProjetsPlanifiesPage() {
  return (
    <div className="bg-[#040810] min-h-screen">
      <DarkPageHero
        eyebrow="Projets & Opportunités"
        title="Projets Planifiés"
        subtitle="Notre vision à l'horizon 2030 : nouvelles zones, infrastructures structurantes et partenariats public-privé."
        variant={4}
        accentColor="#6B48A0"
        backHref="/projets-opportunites"
        backLabel="Projets & Opportunités"
      />

      {/* Nouvelles zones */}
      <section className="py-20 bg-[#040810]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="text-[#6B48A0] text-xs font-semibold uppercase tracking-widest mb-2">Expansion du réseau</div>
            <h2 className="text-2xl font-bold text-white">Nouvelles Zones à Créer</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {nouvellesZones.map((zone, i) => (
              <motion.div
                key={zone.nom}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/15 transition-all"
              >
                <div className="h-1" style={{ backgroundColor: zone.couleur }} />
                <div className="p-6">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full mb-4 inline-block" style={{ color: zone.couleur, backgroundColor: `${zone.couleur}20`, border: `1px solid ${zone.couleur}40` }}>
                    {zone.secteur}
                  </span>
                  <h3 className="font-bold text-white text-base mb-2">{zone.nom}</h3>
                  <div className="flex items-center gap-1.5 text-sm text-white/50 mb-2">
                    <MapPinIcon className="w-4 h-4" /> {zone.region}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-white/50 mb-4">
                    <CalendarIcon className="w-4 h-4" /> Timeline : {zone.timeline}
                  </div>
                  <p className="text-sm text-white/40 leading-relaxed">{zone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunités PPP */}
      <section className="py-20 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="text-[#6B48A0] text-xs font-semibold uppercase tracking-widest mb-2">Financement</div>
            <h2 className="text-2xl font-bold text-white">Opportunités PPP</h2>
            <p className="text-white/40 mt-2 max-w-2xl text-sm">Partenariats public-privé pour le financement et la gestion des infrastructures structurantes.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ppp.map((p, i) => (
              <motion.div
                key={p.titre}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 hover:border-white/15 transition-all"
              >
                <div className="w-10 h-10 bg-[#6B48A0]/20 rounded-xl flex items-center justify-center mb-4">
                  <CurrencyDollarIcon className="w-5 h-5 text-[#6B48A0]" />
                </div>
                <div className="text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-2">{p.type}</div>
                <h3 className="font-bold text-white mb-2">{p.titre}</h3>
                <p className="text-sm text-white/40 mb-5 leading-relaxed">{p.desc}</p>
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/[0.06]">
                  <div className="text-center">
                    <div className="font-bold text-white">{p.budget}</div>
                    <div className="text-xs text-white/30 mt-0.5">Budget</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-white">{p.retour}</div>
                    <div className="text-xs text-white/30 mt-0.5">Retour sur invest.</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Aménageurs */}
      <section className="py-20 bg-[#040810]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto px-4 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Vous êtes aménageur ?</h2>
          <p className="text-white/50 mb-8 text-lg">L'AZES recherche des partenaires qualifiés pour développer les futures zones économiques spéciales.</p>
          <Link
            href="/demarches"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#6B48A0] text-white font-semibold rounded-xl hover:bg-[#5a3b8a] transition-all hover:scale-105 active:scale-95"
          >
            Déposer ma candidature <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
