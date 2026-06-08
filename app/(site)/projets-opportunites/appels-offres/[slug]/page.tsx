'use client'

import { useParams } from 'next/navigation'
import { appelsOffres } from '@/lib/data/appels-offres'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CalendarIcon, ArrowDownTrayIcon, ArrowRightIcon,
  MapPinIcon, BanknotesIcon, DocumentTextIcon,
} from '@heroicons/react/24/outline'
import { format, differenceInDays } from 'date-fns'
import { fr } from 'date-fns/locale'
import StatusBadge from '@/components/StatusBadge'
import CountdownTimer from '@/components/CountdownTimer'
import LightPageHero from '@/components/ui/LightPageHero'
import LightSection from '@/components/ui/LightSection'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

export default function AppelOffreDetailPage() {
  const params = useParams()
  const slug = Array.isArray(params?.slug) ? params.slug[0] : (params?.slug as string)
  const ao = appelsOffres.find((a) => a.slug === slug)

  if (!ao) return null

  const isUrgent = differenceInDays(new Date(ao.dateLimite), new Date()) <= 7 && differenceInDays(new Date(ao.dateLimite), new Date()) >= 0
  const isEnCours = ao.statut === 'En cours'

  const accentColor = ao.type === 'AO' ? '#1B4F8C' : '#C4894A'

  return (
    <div className="min-h-screen">
      <LightPageHero
        backHref="/projets-opportunites/appels-offres"
        backLabel="Appels d'offres"
        eyebrow={ao.type === 'AO' ? 'Appel d\'offres' : 'Appel à Manifestation d\'Intérêt'}
        title={ao.titre}
        subtitle={ao.zone}
        variant={3}
        accentColor={accentColor}
        minHeight="min-h-[50vh]"
        badges={
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={ao.type} />
            <StatusBadge status={ao.statut} />
            {(ao.urgent || isUrgent) && <StatusBadge status="Urgent" />}
          </div>
        }
      />

      {/* Key info bar */}
      <LightSection className="py-10" image="aerial">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: MapPinIcon, label: 'Zone', value: ao.zone },
              { icon: BanknotesIcon, label: 'Budget estimé', value: ao.budget },
              { icon: CalendarIcon, label: 'Date limite', value: format(new Date(ao.dateLimite), 'dd MMMM yyyy', { locale: fr }) },
              { icon: CalendarIcon, label: 'Publication', value: format(new Date(ao.datePublication), 'dd MMMM yyyy', { locale: fr }) },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-sm transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
                <item.icon className="w-4 h-4 text-gray-400 mb-2" />
                <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider">{item.label}</div>
                <div className="font-semibold text-sm text-[#0A2342]">{item.value}</div>
              </motion.div>
            ))}
          </div>

          {isEnCours && isUrgent && (
            <motion.div {...fadeUp} className="mt-4 bg-red-50 border border-red-200 rounded-2xl p-5">
              <div className="text-sm font-bold text-red-600 mb-2">⚠ Clôture imminente — Compte à rebours</div>
              <CountdownTimer deadline={ao.dateLimite} />
            </motion.div>
          )}
        </div>
      </LightSection>

      {/* Description + Documents */}
      <LightSection className="py-16" alt image="infra">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Description */}
            <div className="lg:col-span-2">
              <motion.div {...fadeUp}>
                <div className="inline-flex items-center gap-2 mb-3" style={{ color: accentColor }}>
                  <span className="w-6 h-px" style={{ backgroundColor: accentColor + '80' }} />
                  <span className="text-xs font-bold uppercase tracking-widest">Description</span>
                </div>
                <h2 className="text-2xl font-bold text-[#0A2342] mb-6">Objet du marché</h2>
                <div className="bg-white border border-gray-200 rounded-2xl p-7">
                  <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">{ao.description}</p>
                </div>
              </motion.div>

              {isEnCours && (
                <motion.div {...fadeUp} className="mt-8">
                  <div className="bg-white border border-gray-200 rounded-2xl p-7">
                    <h3 className="font-bold text-[#0A2342] mb-4">Soumettre votre {ao.type === 'AMI' ? 'manifestation d\'intérêt' : 'offre'}</h3>
                    <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                      Pour soumettre votre dossier, contactez notre Guichet Unique ou déposez votre manifestation en ligne.
                      Nos experts vous accompagnent dans la préparation de votre dossier.
                    </p>
                    <div className="flex gap-3">
                      <Link
                        href="/guichet-unique"
                        className="inline-flex items-center gap-2 px-5 py-3 text-white font-semibold rounded-xl text-sm transition-all hover:scale-105"
                        style={{ backgroundColor: accentColor }}
                      >
                        {ao.type === 'AMI' ? 'Manifester mon intérêt' : 'Soumettre une offre'} <ArrowRightIcon className="w-4 h-4" />
                      </Link>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-5 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl text-sm hover:border-gray-300 hover:shadow-sm transition-all"
                      >
                        Nous contacter
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Documents */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <div className="inline-flex items-center gap-2 mb-3" style={{ color: accentColor }}>
                <span className="w-6 h-px" style={{ backgroundColor: accentColor + '80' }} />
                <span className="text-xs font-bold uppercase tracking-widest">Documents</span>
              </div>
              <h2 className="text-2xl font-bold text-[#0A2342] mb-6">Dossier de l'appel</h2>
              <div className="space-y-3">
                {ao.documents?.map((doc, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition-all flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: accentColor + '15' }}>
                      <DocumentTextIcon className="w-4 h-4" style={{ color: accentColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-[#0A2342] truncate">{doc.titre}</div>
                      <div className="text-xs text-gray-400">{doc.type} · {doc.taille}</div>
                    </div>
                    <button aria-label="Télécharger" className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
                      <ArrowDownTrayIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Link to zone */}
              <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-5">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Zone concernée</div>
                <div className="font-semibold text-[#0A2342] mb-3">{ao.zone}</div>
                <Link href={`/zones/${ao.zoneSlug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold hover:opacity-75 transition-opacity"
                  style={{ color: accentColor }}>
                  Voir la zone <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </LightSection>
    </div>
  )
}
