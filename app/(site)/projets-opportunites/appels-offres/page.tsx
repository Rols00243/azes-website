'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { appelsOffres } from '@/lib/data/appels-offres'
import { CalendarIcon, ArrowDownTrayIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { format, differenceInDays } from 'date-fns'
import { fr } from 'date-fns/locale'
import StatusBadge from '@/components/StatusBadge'
import ZoneTag from '@/components/ZoneTag'
import CountdownTimer from '@/components/CountdownTimer'
import DarkPageHero from '@/components/ui/DarkPageHero'

export default function AppelsOffresPage() {
  const [filterStatut, setFilterStatut] = useState('Tous')
  const [filterType, setFilterType] = useState('Tous')
  const [filterZone, setFilterZone] = useState('Toutes')

  const zones = ['Toutes', ...Array.from(new Set(appelsOffres.map(a => a.zone)))]

  const filtered = appelsOffres.filter(a => {
    if (filterStatut !== 'Tous' && a.statut !== filterStatut) return false
    if (filterType !== 'Tous' && a.type !== filterType) return false
    if (filterZone !== 'Toutes' && a.zone !== filterZone) return false
    return true
  })

  const isUrgent = (dateLimite: string) => differenceInDays(new Date(dateLimite), new Date()) <= 7 && differenceInDays(new Date(dateLimite), new Date()) >= 0

  return (
    <div className="bg-[#040810] min-h-screen">
      <DarkPageHero
        eyebrow="Marchés publics"
        title="Appels d'Offres & AMI"
        subtitle="Participez aux marchés publics des Zones Économiques Spéciales de la RDC."
        variant={3}
        accentColor="#1B4F8C"
        backHref="/projets-opportunites"
        backLabel="Projets & Opportunités"
      />

      {/* Filtres */}
      <section className="bg-[#0a1628] border-b border-white/[0.06] sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap gap-4 items-end">
          <div>
            <label className="text-xs font-semibold text-white/40 block mb-1.5">Statut</label>
            <div className="flex gap-2">
              {['Tous', 'En cours', 'Clôturé', 'À venir'].map(s => (
                <button key={s} onClick={() => setFilterStatut(s)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${filterStatut === s ? 'bg-[#1B4F8C] text-white' : 'bg-white/[0.06] text-white/60 hover:bg-white/10'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-white/40 block mb-1.5">Type</label>
            <div className="flex gap-2">
              {['Tous', 'AO', 'AMI'].map(t => (
                <button key={t} onClick={() => setFilterType(t)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${filterType === t ? 'bg-[#1B4F8C] text-white' : 'bg-white/[0.06] text-white/60 hover:bg-white/10'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-white/40 block mb-1.5">Zone</label>
            <select value={filterZone} onChange={e => setFilterZone(e.target.value)}
              className="text-sm bg-white/[0.06] border border-white/10 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-white/30">
              {zones.map(z => <option key={z} className="bg-[#0a1628]">{z}</option>)}
            </select>
          </div>
          <div className="ml-auto text-sm text-white/40 self-end pb-1">{filtered.length} résultat{filtered.length !== 1 ? 's' : ''}</div>
        </div>
      </section>

      <section className="py-12 bg-[#040810]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          {filtered.map((ao, i) => (
            <motion.div
              key={ao.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white/[0.03] border border-white/[0.07] rounded-2xl hover:border-white/15 transition-all overflow-hidden"
            >
              <div className={`h-1 ${ao.statut === 'En cours' ? 'bg-[#1B4F8C]' : ao.statut === 'Clôturé' ? 'bg-white/20' : 'bg-orange-500'}`} />
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <StatusBadge status={ao.type} />
                      <StatusBadge status={ao.statut} />
                      {(ao.urgent || isUrgent(ao.dateLimite)) && <StatusBadge status="Urgent" />}
                    </div>
                    <h2 className="text-lg font-bold text-white mb-2">{ao.titre}</h2>
                    <ZoneTag zone={ao.zone} zoneSlug={ao.zoneSlug} className="mb-3" />
                    <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-2">{ao.description}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-white/40">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="w-3.5 h-3.5" />
                        Publié le {format(new Date(ao.datePublication), 'dd MMM yyyy', { locale: fr })}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="w-3.5 h-3.5" />
                        Limite : <span className="font-semibold text-white/70 ml-1">{format(new Date(ao.dateLimite), 'dd MMMM yyyy', { locale: fr })}</span>
                      </span>
                    </div>
                    {ao.statut === 'En cours' && isUrgent(ao.dateLimite) && (
                      <div className="mt-3">
                        <div className="text-xs text-red-400 font-semibold mb-1">Compte à rebours</div>
                        <CountdownTimer deadline={ao.dateLimite} />
                      </div>
                    )}
                  </div>

                  <div className="flex lg:flex-col gap-3 lg:w-48">
                    <Link
                      href={`/projets-opportunites/appels-offres/${ao.slug}`}
                      className={`flex-1 lg:flex-none py-2.5 px-4 text-sm font-semibold rounded-xl text-center transition-colors flex items-center justify-center gap-1.5 ${
                        ao.statut === 'En cours' ? 'bg-[#1B4F8C] text-white hover:bg-[#163d6e]' : 'bg-white/[0.06] text-white/60 hover:bg-white/10'
                      }`}
                    >
                      {ao.statut === 'En cours' ? (ao.type === 'AMI' ? 'Manifester intérêt' : 'Soumettre une offre') : 'Voir le détail'}
                      <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                    <button
                      aria-label="Télécharger les documents"
                      className="flex items-center justify-center gap-1.5 py-2.5 px-4 border border-white/10 text-sm text-white/50 font-medium rounded-xl hover:bg-white/[0.05] transition-colors"
                    >
                      <ArrowDownTrayIcon className="w-4 h-4" /> Dossier
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-20 text-white/40">Aucun appel d'offres correspondant à vos filtres.</div>
          )}
        </div>
      </section>
    </div>
  )
}
