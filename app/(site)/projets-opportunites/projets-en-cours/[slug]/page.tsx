'use client'

import { useParams } from 'next/navigation'
import { projets } from '@/lib/data/projets'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  MapPinIcon, ArrowRightIcon, CalendarIcon, UserGroupIcon,
  DocumentTextIcon, ArrowDownTrayIcon, CheckCircleIcon,
} from '@heroicons/react/24/outline'
import StatusBadge from '@/components/StatusBadge'
import ProgressBar from '@/components/ProgressBar'
import ZoneTag from '@/components/ZoneTag'
import LightPageHero from '@/components/ui/LightPageHero'
import LightSection from '@/components/ui/LightSection'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

export default function ProjetDetailPage() {
  const params = useParams()
  const slug = Array.isArray(params?.slug) ? params.slug[0] : (params?.slug as string)
  const projet = projets.find((p) => p.slug === slug)

  if (!projet) return null

  const accentColor = '#2A7A4B'

  return (
    <div className="min-h-screen">
      <LightPageHero
        backHref="/projets-opportunites/projets-en-cours"
        backLabel="Projets en cours"
        eyebrow={projet.secteur}
        title={projet.titre}
        subtitle={projet.localisation}
        variant={2}
        accentColor={accentColor}
        minHeight="min-h-[50vh]"
        badges={
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={projet.statut} />
            <ZoneTag zone={projet.zone} zoneSlug={projet.zoneSlug} />
          </div>
        }
      />

      {/* Key stats */}
      <LightSection className="py-10" image="aerial">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Avancement', value: `${projet.avancement}%` },
              { label: 'Investissement', value: projet.investissement },
              { label: 'Emplois créés', value: projet.emploisCreés.toLocaleString('fr-FR') },
              { label: 'Début', value: new Date(projet.dateDebut).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-gray-200 rounded-2xl p-5 text-center hover:shadow-sm transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
                <div className="text-xl font-bold text-[#0A2342] mb-1">{s.value}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">{s.label}</div>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp} className="bg-white border border-gray-200 rounded-2xl p-5">
            <ProgressBar value={projet.avancement} label={`Avancement global — ${projet.secteur}`} />
          </motion.div>
        </div>
      </LightSection>

      {/* Description + Timeline */}
      <LightSection className="py-16" alt image="infra">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Description */}
            <motion.div {...fadeUp}>
              <div className="inline-flex items-center gap-2 mb-3" style={{ color: accentColor }}>
                <span className="w-6 h-px" style={{ backgroundColor: accentColor + '80' }} />
                <span className="text-xs font-bold uppercase tracking-widest">Description</span>
              </div>
              <h2 className="text-2xl font-bold text-[#0A2342] mb-6">Présentation du projet</h2>
              <div className="bg-white border border-gray-200 rounded-2xl p-7 mb-6">
                <p className="text-gray-700 leading-relaxed text-sm">{projet.description}</p>
              </div>

              {/* Partenaires */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="font-bold text-[#0A2342] mb-4">Partenaires du projet</h3>
                <div className="flex flex-wrap gap-2">
                  {projet.partenaires.map((p) => (
                    <span key={p} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <div className="inline-flex items-center gap-2 mb-3" style={{ color: accentColor }}>
                <span className="w-6 h-px" style={{ backgroundColor: accentColor + '80' }} />
                <span className="text-xs font-bold uppercase tracking-widest">Calendrier</span>
              </div>
              <h2 className="text-2xl font-bold text-[#0A2342] mb-6">Phases du projet</h2>
              <div className="space-y-3">
                {projet.timeline?.map((phase, i) => (
                  <div key={i} className={`bg-white border rounded-xl p-4 transition-all ${phase.done ? 'border-green-200' : 'border-gray-200'}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${phase.done ? 'bg-green-50 border border-green-200' : 'bg-gray-100 border border-gray-200'}`}>
                        {phase.done
                          ? <CheckCircleIcon className="w-4 h-4 text-green-500" />
                          : <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                        }
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-semibold text-gray-400">{phase.date}</span>
                          {phase.done && <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-green-600 font-semibold border border-green-200">Réalisé</span>}
                        </div>
                        <div className="font-semibold text-sm text-[#0A2342]">{phase.titre}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{phase.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </LightSection>

      {/* Documents */}
      {projet.documents && projet.documents.length > 0 && (
        <LightSection className="py-14" image="aerial">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp} className="mb-8">
              <div className="inline-flex items-center gap-2 mb-3" style={{ color: accentColor }}>
                <span className="w-6 h-px" style={{ backgroundColor: accentColor + '80' }} />
                <span className="text-xs font-bold uppercase tracking-widest">Documents</span>
              </div>
              <h2 className="text-2xl font-bold text-[#0A2342]">Documentation technique</h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {projet.documents.map((doc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition-all flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: accentColor + '15' }}>
                    <DocumentTextIcon className="w-4 h-4" style={{ color: accentColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-xs text-[#0A2342] leading-tight">{doc.titre}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{doc.type} · {doc.taille}</div>
                  </div>
                  <button aria-label="Télécharger" className="text-gray-400 hover:text-gray-600 transition-colors">
                    <ArrowDownTrayIcon className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </LightSection>
      )}

      {/* CTA */}
      <LightSection className="py-16" alt image="infra">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold text-[#0A2342] mb-3">Participer à ce projet</h2>
            <p className="text-gray-500 mb-8 text-sm">Contactez notre équipe pour explorer les opportunités de partenariat ou de sous-traitance.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/guichet-unique"
                className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl text-sm transition-all hover:scale-105"
                style={{ backgroundColor: accentColor }}>
                Contacter le Guichet Unique <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <Link href={`/zones/${projet.zoneSlug}`}
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl text-sm hover:border-gray-300 hover:shadow-sm transition-all">
                Voir la zone {projet.zone}
              </Link>
            </div>
          </motion.div>
        </div>
      </LightSection>
    </div>
  )
}
