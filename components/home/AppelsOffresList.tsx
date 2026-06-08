'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { AppelOffreAdmin } from '@/lib/server-data'
import { ArrowDownTrayIcon, ArrowRightIcon, CalendarIcon } from '@heroicons/react/24/outline'
import StatusBadge from '@/components/StatusBadge'
import ZoneTag from '@/components/ZoneTag'
import SectionHeader from '@/components/SectionHeader'

const IMG = '/images/zone-aerial.png'

export default function AppelsOffresList({ appels }: { appels: AppelOffreAdmin[] }) {
  const displayed = appels.slice(0, 3)

  if (appels.length === 0) return null

  return (
    <section className="relative py-20 overflow-hidden bg-gray-50">
      {/* Atmospheric image — construction / infrastructure */}
      <div
        className="absolute inset-0 pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: `url('${IMG}')`, opacity: 0.05 }}
      />
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 60%, rgba(255,255,255,0.4) 100%)' }} />

      {/* Ambient orbs */}
      <motion.div aria-hidden
        className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(27,79,140,0.05) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <SectionHeader
            eyebrow="Marchés publics"
            title="Derniers Appels d'Offres"
            description="Participez aux opportunités de marché dans les zones économiques."
          />
          {appels.length > 3 && (
            <Link href="/projets-opportunites/appels-offres"
              className="flex-shrink-0 flex items-center gap-2 text-sm font-semibold text-[#C4894A] hover:text-[#a87540] transition-colors">
              Voir tous les appels <ArrowRightIcon className="w-4 h-4" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {displayed.map((ao, i) => (
            <motion.div key={ao.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <div className={`h-1 ${ao.statut === 'En cours' ? 'bg-[#1B4F8C]' : ao.statut === 'Clôturé' ? 'bg-gray-300' : 'bg-[#C4894A]'}`} />
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  <StatusBadge status={ao.type} />
                  <StatusBadge status={ao.statut} />
                  {ao.urgent && <StatusBadge status="Urgent" />}
                </div>
                <h3 className="font-bold text-[#0A2342] mb-2 leading-snug">{ao.titre}</h3>
                <ZoneTag zone={ao.zone} zoneSlug={ao.zoneSlug} className="mb-3" />
                {ao.dateLimite && (
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                    <CalendarIcon className="w-4 h-4" />
                    Date limite :{' '}
                    <span className="font-semibold text-gray-700">
                      {new Date(ao.dateLimite).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                )}
                <p className="text-sm text-gray-500 line-clamp-2 mb-5">{ao.description}</p>
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <Link href="/projets-opportunites/appels-offres"
                    className="flex-1 py-2 bg-[#1B4F8C] text-white text-xs font-semibold rounded-lg text-center hover:bg-[#163d6e] transition-colors">
                    {ao.statut === 'En cours' ? 'Soumettre une offre' : 'Voir le détail'}
                  </Link>
                  <button aria-label="Télécharger le dossier"
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <ArrowDownTrayIcon className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
