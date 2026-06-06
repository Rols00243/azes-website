'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPinIcon, CalendarIcon, ArrowRightIcon, BriefcaseIcon, AcademicCapIcon } from '@heroicons/react/24/outline'
import DarkPageHero from '@/components/ui/DarkPageHero'

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.55 } }

const offres = [
  { entreprise: 'Bolloré Africa Logistics', poste: 'Superviseur Logistique', zone: 'Zone Franche de Matadi', contrat: 'CDI', date: '2026-05-20', secteur: 'Logistique', color: '#C4894A' },
  { entreprise: 'MTN Group', poste: 'Ingénieur Réseaux Senior', zone: 'Zone Tech de Kinshasa', contrat: 'CDI', date: '2026-05-25', secteur: 'Télécoms', color: '#1B4F8C' },
  { entreprise: 'Olam International', poste: 'Technicien Agro-Alimentaire', zone: 'Zone Agro-Industrielle du Kasaï', contrat: 'CDD 24 mois', date: '2026-06-01', secteur: 'Agro-industrie', color: '#2A7A4B' },
  { entreprise: 'Gécamines', poste: 'Géologue de Terrain', zone: 'Zone Minière de Lubumbashi', contrat: 'CDI', date: '2026-05-18', secteur: 'Mines', color: '#8B5E3C' },
  { entreprise: 'Orange Digital Center', poste: 'Formateur Développement Web', zone: 'Zone Tech de Kinshasa', contrat: 'CDD 12 mois', date: '2026-05-28', secteur: 'Digital', color: '#6B48A0' },
]

const entreprises = [
  { nom: 'Bolloré Logistics', zone: 'Matadi', emplois: 450, color: '#C4894A' },
  { nom: 'MTN Group', zone: 'Kinshasa', emplois: 320, color: '#1B4F8C' },
  { nom: 'Olam International', zone: 'Kasaï', emplois: 580, color: '#2A7A4B' },
  { nom: 'Gécamines', zone: 'Lubumbashi', emplois: 2400, color: '#8B5E3C' },
  { nom: 'Orange Digital', zone: 'Kinshasa', emplois: 180, color: '#6B48A0' },
  { nom: 'Banque Mondiale', zone: 'Kinshasa', emplois: 45, color: '#1E7A9E' },
]

const formations = [
  { titre: 'Formation Logistique & Supply Chain', duree: '6 mois', zone: 'Zone Franche de Matadi', places: 40, color: '#C4894A' },
  { titre: 'Formation Développement Numérique', duree: '3 mois', zone: 'Zone Tech de Kinshasa', places: 60, color: '#1B4F8C' },
  { titre: 'Formation Transformation Agro-Alimentaire', duree: '4 mois', zone: 'Zone Agro-Industrielle du Kasaï', places: 50, color: '#2A7A4B' },
  { titre: 'Formation Sécurité Minière', duree: '2 mois', zone: 'Zone Minière de Lubumbashi', places: 35, color: '#8B5E3C' },
]

export default function EmploisPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <DarkPageHero
        eyebrow="Carrières"
        title="Emplois &"
        titleAccent="Compétences"
        subtitle="Trouvez votre emploi dans les Zones Économiques Spéciales de la RDC. Rejoignez les entreprises qui construisent l'économie de demain."
        variant={1}
        accentColor="#C4894A"
      />

      {/* ── Offres d'emploi ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="flex items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-[#C4894A] text-xs font-bold uppercase tracking-widest mb-3">
                <span className="w-6 h-px bg-[#C4894A]/60" /> Recrutements
              </div>
              <h2 className="text-3xl font-bold text-[#0A2342]">Offres d'emploi actives</h2>
            </div>
            <span className="text-sm text-gray-400 font-medium">{offres.length} offres disponibles</span>
          </motion.div>

          <div className="space-y-4">
            {offres.map((offre, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 hover:shadow-md transition-all duration-300"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ backgroundColor: offre.color }} />
                <div className="p-6 pl-8">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${offre.color}15`, border: `1px solid ${offre.color}30` }}>
                      <BriefcaseIcon className="w-6 h-6" style={{ color: offre.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: offre.color }}>{offre.entreprise}</div>
                      <h3 className="font-bold text-[#0A2342] text-lg mb-1">{offre.poste}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><MapPinIcon className="w-4 h-4" />{offre.zone}</span>
                        <span className="flex items-center gap-1"><CalendarIcon className="w-4 h-4" />Publié le {new Date(offre.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: `${offre.color}15`, color: offre.color, border: `1px solid ${offre.color}30` }}>
                        {offre.contrat}
                      </span>
                      <button className="px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition-all hover:scale-105 flex items-center gap-1.5"
                        style={{ backgroundColor: offre.color }}>
                        Postuler <ArrowRightIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Entreprises qui recrutent ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-10">
            <div className="inline-flex items-center gap-2 text-[#C4894A] text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-6 h-px bg-[#C4894A]/60" /> Recruteurs
            </div>
            <h2 className="text-3xl font-bold text-[#0A2342]">Entreprises qui recrutent</h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {entreprises.map((e, i) => (
              <motion.div
                key={e.nom}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-white border border-gray-200 rounded-2xl p-4 text-center hover:border-gray-300 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${e.color}15`, border: `1px solid ${e.color}30` }}>
                  <span className="text-sm font-bold" style={{ color: e.color }}>{e.nom.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                </div>
                <div className="font-semibold text-xs text-gray-700 leading-tight mb-1">{e.nom}</div>
                <div className="text-xs text-gray-400">{e.zone}</div>
                <div className="text-sm font-bold mt-2" style={{ color: e.color }}>{e.emplois.toLocaleString('fr-FR')}</div>
                <div className="text-xs text-gray-400">emplois</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Formations ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-10">
            <div className="inline-flex items-center gap-2 text-[#2A7A4B] text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-6 h-px bg-[#2A7A4B]/60" /> Compétences
            </div>
            <h2 className="text-3xl font-bold text-[#0A2342]">Programmes de formation</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {formations.map((f, i) => (
              <motion.div
                key={f.titre}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-300 hover:shadow-md transition-all overflow-hidden relative"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${f.color}, transparent)` }} />
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${f.color}15` }}>
                  <AcademicCapIcon className="w-5 h-5" style={{ color: f.color }} />
                </div>
                <h3 className="font-bold text-sm text-[#0A2342] mb-2 leading-snug">{f.titre}</h3>
                <div className="text-xs text-gray-500 mb-1">{f.zone}</div>
                <div className="flex justify-between text-xs mt-4 pt-3 border-t border-gray-100">
                  <span className="text-gray-500">Durée : <span className="font-semibold text-gray-700">{f.duree}</span></span>
                  <span className="font-semibold" style={{ color: f.color }}>{f.places} places</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Dépôt CV ── */}
      <section className="py-20 bg-[#0A2342]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 text-[#C4894A] text-xs font-bold uppercase tracking-widest mb-4">
              <span className="w-6 h-px bg-[#C4894A]/60" /> Rejoindre le vivier
              <span className="w-6 h-px bg-[#C4894A]/60" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Déposez votre CV</h2>
            <p className="text-white/60 mb-10 max-w-xl mx-auto">Rejoignez notre vivier de talents et soyez contacté directement par les entreprises des ZES.</p>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#C4894A] text-white font-semibold rounded-xl hover:bg-[#a87540] transition-all hover:scale-105 active:scale-95">
              Déposer mon CV <ArrowRightIcon className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
