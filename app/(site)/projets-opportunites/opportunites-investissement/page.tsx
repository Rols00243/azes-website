'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPinIcon, ArrowRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import DarkPageHero from '@/components/ui/DarkPageHero'

const tabs = ['Par Secteur', 'Par Zone', 'Terrains Disponibles', 'Projets Prioritaires', 'Conditions']

const secteurs = [
  { nom: 'Mines & Métallurgie', nb: 8, desc: 'Exploitation, raffinage et transformation des minerais (cuivre, cobalt, or, zinc).' },
  { nom: 'Agriculture & Agro-industrie', nb: 6, desc: 'Transformation agro-alimentaire, cultures d\'exportation, élevage intensif.' },
  { nom: 'Technologie & Digital', nb: 4, desc: 'Startups tech, data centers, e-commerce, services numériques.' },
  { nom: 'Logistique & Transport', nb: 3, desc: 'Entrepôts, plateformes logistiques, services portuaires.' },
  { nom: 'Énergie', nb: 2, desc: 'Énergies renouvelables, distribution d\'électricité, biomasse.' },
  { nom: 'Industrie manufacturière', nb: 5, desc: 'Textiles, plastiques, biens de consommation, chimie industrielle.' },
]

const terrains = [
  { id: 'T001', zone: 'Zone Franche de Matadi', superficie: '12 ha', statut: 'Disponible', prix: '$850 000/ha', localisation: 'Matadi Nord' },
  { id: 'T002', zone: 'Zone Tech de Kinshasa', superficie: '3.5 ha', statut: 'Disponible', prix: '$1 200 000/ha', localisation: 'N\'djili Zone B' },
  { id: 'T003', zone: 'Zone Agro-Industrielle du Kasaï', superficie: '45 ha', statut: 'Disponible', prix: '$320 000/ha', localisation: 'Mbuji-Mayi Est' },
  { id: 'T004', zone: 'Zone Minière de Lubumbashi', superficie: '8 ha', statut: 'Réservé', prix: '$680 000/ha', localisation: 'Haut-Katanga Zone C' },
  { id: 'T005', zone: 'Zone Franche de Matadi', superficie: '25 ha', statut: 'Disponible', prix: '$750 000/ha', localisation: 'Matadi Sud' },
]

const prioritaires = [
  { rang: 1, titre: 'Raffinerie de Cobalt', secteur: 'Mines', investissement: '$450M', rendement: '18%' },
  { rang: 2, titre: 'Usine de Fertilisants', secteur: 'Agro-industrie', investissement: '$120M', rendement: '22%' },
  { rang: 3, titre: 'Centre de Données Régional', secteur: 'Tech', investissement: '$80M', rendement: '28%' },
  { rang: 4, titre: 'Terminal de GNL', secteur: 'Énergie', investissement: '$280M', rendement: '15%' },
  { rang: 5, titre: 'Usine de Ciment', secteur: 'BTP', investissement: '$95M', rendement: '20%' },
]

const conditions = [
  {
    titre: 'Critères de participation',
    contenu: 'Toute entreprise légalement constituée, nationale ou étrangère, peut investir dans les ZES. Les investissements doivent respecter les secteurs autorisés dans chaque zone et atteindre un seuil minimum d\'investissement fixé par zone.',
  },
  {
    titre: 'Étapes du processus',
    contenu: '1. Dépôt de la manifestation d\'intérêt. 2. Évaluation par l\'AZES (15 jours ouvrés). 3. Entretien technique avec l\'équipe AZES. 4. Signature de la convention d\'établissement. 5. Obtention de l\'agrément ZES. 6. Installation et démarrage des activités.',
  },
  {
    titre: 'Documents requis',
    contenu: 'Statuts de la société, plan d\'affaires détaillé (5 ans), capacité financière certifiée, CV des dirigeants, plan d\'emploi local, étude d\'impact environnemental (projets > $10M).',
  },
  {
    titre: 'Avantages fiscaux',
    contenu: 'Exonération d\'impôt sur les bénéfices pendant 10 ans, TVA à 0% sur équipements importés, exonération de droits de douane, taxe foncière réduite de 50%, rapatriement des bénéfices libre.',
  },
]

export default function OpportunitesPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [openAccordion, setOpenAccordion] = useState<number | null>(null)

  return (
    <div className="bg-[#040810] min-h-screen">
      <DarkPageHero
        eyebrow="Investir dans les ZES"
        title="Opportunités d'Investissement"
        subtitle="Explorez les secteurs, terrains et projets disponibles dans les zones économiques spéciales de la RDC."
        variant={1}
        accentColor="#C4894A"
        backHref="/projets-opportunites"
        backLabel="Projets & Opportunités"
      />

      {/* Tabs */}
      <div className="sticky top-20 z-30 bg-[#0a1628] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-2">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === i ? 'bg-[#C4894A] text-white' : 'text-white/50 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="py-16 bg-[#040810]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Par Secteur */}
          {activeTab === 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {secteurs.map((s, i) => (
                <motion.div
                  key={s.nom}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 hover:border-white/15 transition-all"
                >
                  <div className="text-3xl font-bold text-[#C4894A] mb-1">{s.nb}</div>
                  <div className="text-xs text-white/30 mb-3">opportunités</div>
                  <h3 className="font-bold text-white mb-2">{s.nom}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Par Zone */}
          {activeTab === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { zone: 'Zone Franche de Matadi', color: '#2A7A4B', items: ['Terminal logistique', 'Entrepôts frigorifiques', 'Services douaniers', 'Commerce international'] },
                { zone: 'Zone Tech de Kinshasa', color: '#1B4F8C', items: ['Startups digitales', 'Hébergement serveurs', 'Fintech', 'E-commerce'] },
                { zone: 'Zone Agro-Industrielle du Kasaï', color: '#C4894A', items: ['Transformation céréales', 'Huile de palme', 'Élevage industriel', 'Semences'] },
                { zone: 'Zone Minière de Lubumbashi', color: '#8B5E3C', items: ['Raffinage cuivre', 'Cobalt batteries', 'Services miniers', 'Équipements'] },
              ].map((z, i) => (
                <motion.div key={z.zone} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden h-full hover:border-white/15 transition-all">
                    <div className="h-1" style={{ backgroundColor: z.color }} />
                    <div className="p-5">
                      <h3 className="font-bold text-sm text-white mb-4">{z.zone}</h3>
                      <ul className="space-y-2.5">
                        {z.items.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm text-white/50">
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: z.color }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Terrains */}
          {activeTab === 2 && (
            <div className="overflow-x-auto rounded-2xl border border-white/[0.07] bg-white/[0.02]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.03]">
                    {['Réf.', 'Zone', 'Localisation', 'Superficie', 'Statut', 'Prix indicatif', 'Action'].map((h) => (
                      <th key={h} className="px-5 py-4 text-left font-semibold text-white/40 text-xs uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {terrains.map((t) => (
                    <tr key={t.id} className="border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors">
                      <td className="px-5 py-4 font-mono text-xs text-white/30">{t.id}</td>
                      <td className="px-5 py-4">
                        <span className="font-medium text-white/70">{t.zone}</span>
                      </td>
                      <td className="px-5 py-4 text-white/50">
                        <span className="flex items-center gap-1"><MapPinIcon className="w-3.5 h-3.5" />{t.localisation}</span>
                      </td>
                      <td className="px-5 py-4 font-semibold text-white">{t.superficie}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${t.statut === 'Disponible' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                          {t.statut}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-semibold text-[#C4894A]">{t.prix}</td>
                      <td className="px-5 py-4">
                        <Link href="/demarches" className="px-4 py-1.5 bg-[#C4894A] text-white text-xs font-semibold rounded-lg hover:bg-[#a87540] transition-colors">
                          Manifestation
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Projets prioritaires */}
          {activeTab === 3 && (
            <div className="space-y-4">
              {prioritaires.map((p, i) => (
                <motion.div key={p.rang} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-6 bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 hover:border-white/15 transition-all">
                  <div className="w-12 h-12 bg-[#C4894A]/20 text-[#C4894A] border border-[#C4894A]/30 rounded-full flex items-center justify-center font-bold flex-shrink-0">{p.rang}</div>
                  <div className="flex-1">
                    <div className="text-xs text-white/30 font-semibold uppercase tracking-wider mb-1">{p.secteur}</div>
                    <h3 className="font-bold text-white">{p.titre}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div>
                      <div className="font-bold text-white">{p.investissement}</div>
                      <div className="text-xs text-white/30 mt-0.5">Investissement requis</div>
                    </div>
                    <div>
                      <div className="font-bold text-[#2A7A4B]">{p.rendement}</div>
                      <div className="text-xs text-white/30 mt-0.5">Rendement attendu</div>
                    </div>
                  </div>
                  <Link href="/demarches" className="flex-shrink-0 flex items-center gap-1 text-sm font-semibold text-[#C4894A] hover:gap-2 transition-all">
                    Investir <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* Conditions */}
          {activeTab === 4 && (
            <div className="max-w-3xl space-y-3">
              {conditions.map((c, i) => (
                <div key={c.titre} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.03] transition-colors"
                    onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                    aria-expanded={openAccordion === i}
                  >
                    <span className="font-bold text-white">{c.titre}</span>
                    <ChevronDownIcon className={`w-5 h-5 text-white/40 transition-transform ${openAccordion === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openAccordion === i && (
                    <div className="px-6 pb-6 text-white/50 text-sm leading-relaxed border-t border-white/[0.06] pt-4">
                      {c.contenu}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
