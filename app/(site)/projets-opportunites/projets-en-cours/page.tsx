'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { projets } from '@/lib/data/projets'
import { MapPinIcon, ArrowRightIcon, CalendarIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import StatusBadge from '@/components/StatusBadge'
import ProgressBar from '@/components/ProgressBar'
import ZoneTag from '@/components/ZoneTag'
import LightPageHero from '@/components/ui/LightPageHero'
import LightSection from '@/components/ui/LightSection'

const secteurs = ['Tous', ...Array.from(new Set(projets.map((p) => p.secteur)))]
const zones = ['Toutes', ...Array.from(new Set(projets.map((p) => p.zone)))]
const etats = ['Tous', 'Démarrage', 'En cours', 'Finalisé']

export default function ProjetsEnCoursPage() {
  const [selectedZone, setSelectedZone] = useState('Toutes')
  const [selectedSecteur, setSelectedSecteur] = useState('Tous')
  const [selectedEtat, setSelectedEtat] = useState('Tous')

  const filtered = projets.filter((p) => {
    if (selectedZone !== 'Toutes' && p.zone !== selectedZone) return false
    if (selectedSecteur !== 'Tous' && p.secteur !== selectedSecteur) return false
    if (selectedEtat !== 'Tous' && p.statut !== selectedEtat) return false
    return true
  })

  return (
    <div className="bg-white min-h-screen">
      <LightPageHero
        eyebrow="Projets & Opportunités"
        title="Projets en cours"
        subtitle="Suivez l'avancement des projets de développement dans les Zones Économiques Spéciales de la RDC."
        variant={2}
        accentColor="#2A7A4B"
        backHref="/projets-opportunites"
        backLabel="Projets & Opportunités"
      />

      {/* Filtres */}
      <section className="bg-white border-b border-gray-200 sticky top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap gap-4 items-center">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Zone</label>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="text-sm bg-gray-50 border border-gray-300 text-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-[#2A7A4B]"
            >
              {zones.map((z) => <option key={z}>{z}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Secteur</label>
            <select
              value={selectedSecteur}
              onChange={(e) => setSelectedSecteur(e.target.value)}
              className="text-sm bg-gray-50 border border-gray-300 text-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-[#2A7A4B]"
            >
              {secteurs.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">État</label>
            <select
              value={selectedEtat}
              onChange={(e) => setSelectedEtat(e.target.value)}
              className="text-sm bg-gray-50 border border-gray-300 text-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-[#2A7A4B]"
            >
              {etats.map((e) => <option key={e}>{e}</option>)}
            </select>
          </div>
          <div className="ml-auto text-sm text-gray-400 self-end pb-2">{filtered.length} projet{filtered.length !== 1 ? 's' : ''}</div>
        </div>
      </section>

      <LightSection className="py-12" alt image="infra">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">Aucun projet correspondant à vos filtres.</div>
          ) : (
            <div className="space-y-6">
              {filtered.map((projet, i) => (
                <motion.div
                  key={projet.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="bg-white border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-md transition-all overflow-hidden"
                >
                  <div className="h-1 bg-gradient-to-r from-[#2A7A4B] to-[#1B4F8C]" style={{ width: `${projet.avancement}%` }} />
                  <div className="p-7">
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-4">
                          <StatusBadge status={projet.statut} />
                          <ZoneTag zone={projet.zone} zoneSlug={projet.zoneSlug} />
                        </div>
                        <h2 className="text-xl font-bold text-[#0A2342] mb-2">{projet.titre}</h2>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                          <span className="flex items-center gap-1"><MapPinIcon className="w-4 h-4" />{projet.localisation}</span>
                          <span className="flex items-center gap-1"><CalendarIcon className="w-4 h-4" />{new Date(projet.dateDebut).toLocaleDateString('fr-FR', {month: 'long', year: 'numeric'})}</span>
                          <span className="flex items-center gap-1"><UserGroupIcon className="w-4 h-4" />{projet.emploisCreés.toLocaleString('fr-FR')} emplois</span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-2">{projet.description}</p>
                        <div className="mb-5">
                          <ProgressBar value={projet.avancement} label={`Avancement — ${projet.secteur}`} />
                        </div>
                        <div className="text-xs text-gray-400">
                          Partenaires : {projet.partenaires.slice(0, 2).join(', ')}{projet.partenaires.length > 2 ? ` +${projet.partenaires.length - 2}` : ''}
                        </div>
                      </div>

                      <div className="lg:w-52 flex flex-col gap-3">
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                          <div className="text-2xl font-bold text-[#0A2342]">{projet.avancement}%</div>
                          <div className="text-xs text-gray-400 mt-0.5">Avancement</div>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                          <div className="font-bold text-[#2A7A4B]">{projet.investissement}</div>
                          <div className="text-xs text-gray-400 mt-0.5">Investissement</div>
                        </div>
                        <Link
                          href={`/projets-opportunites/projets-en-cours/${projet.slug}`}
                          className="mt-auto py-3 bg-[#2A7A4B] text-white text-sm font-semibold rounded-xl text-center hover:bg-[#225f3b] transition-colors flex items-center justify-center gap-2"
                        >
                          Voir le détail <ArrowRightIcon className="w-4 h-4" />
                        </Link>
                        <div className="text-[10px] text-center text-gray-400">
                          MàJ : {new Date(projet.dateMAJ).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </LightSection>
    </div>
  )
}
