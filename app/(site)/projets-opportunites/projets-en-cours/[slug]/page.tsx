import { projets, getProjetBySlug } from '@/lib/data/projets'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeftIcon, MapPinIcon, CalendarIcon, CheckCircleIcon, ArrowDownTrayIcon, UserGroupIcon, ClockIcon } from '@heroicons/react/24/outline'
import type { Metadata } from 'next'
import StatusBadge from '@/components/StatusBadge'
import ProgressBar from '@/components/ProgressBar'
import ZoneTag from '@/components/ZoneTag'
import DarkPageHero from '@/components/ui/DarkPageHero'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return projets.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const projet = getProjetBySlug(params.slug)
  if (!projet) return {}
  return { title: projet.titre, description: projet.description.substring(0, 160) }
}

export default function ProjetDetailPage({ params }: Props) {
  const projet = getProjetBySlug(params.slug)
  if (!projet) notFound()

  const statut = projet.statut as 'Démarrage' | 'En cours' | 'Finalisé'

  return (
    <div className="bg-[#040810] min-h-screen">
      <DarkPageHero
        eyebrow={projet.secteur}
        title={projet.titre}
        subtitle={projet.description.substring(0, 140)}
        variant={2}
        accentColor="#2A7A4B"
        backHref="/projets-opportunites/projets-en-cours"
        backLabel="Projets en cours"
        badges={[projet.statut, projet.zone]}
        minHeight="min-h-[420px]"
      >
        {/* Progress bar */}
        <div className="max-w-lg">
          <div className="flex justify-between text-xs text-white/50 mb-1.5">
            <span>Avancement global</span>
            <span className="font-bold text-white">{projet.avancement}%</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-[#2A7A4B] rounded-full" style={{ width: `${projet.avancement}%` }} />
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-white/60 mt-2">
          <span className="flex items-center gap-1.5"><MapPinIcon className="w-4 h-4" />{projet.localisation}</span>
          <span className="flex items-center gap-1.5"><CalendarIcon className="w-4 h-4" />Fin prévue : {new Date(projet.dateFin).toLocaleDateString('fr-FR', {month:'long',year:'numeric'})}</span>
          <span className="flex items-center gap-1.5"><UserGroupIcon className="w-4 h-4" />{projet.emploisCreés.toLocaleString('fr-FR')} emplois</span>
        </div>
      </DarkPageHero>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-xl font-bold text-white mb-3">Objectif du projet</h2>
              <p className="text-white/50 leading-relaxed">{projet.objectif}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">Description</h2>
              <p className="text-white/50 leading-relaxed">{projet.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-5">Infrastructures prévues</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projet.infrastructures.map((inf) => (
                  <div key={inf} className="flex items-center gap-3 p-4 bg-white/[0.03] border border-white/[0.07] rounded-xl">
                    <CheckCircleIcon className="w-5 h-5 text-[#2A7A4B] flex-shrink-0" />
                    <span className="text-sm text-white/70">{inf}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-5">Timeline d&apos;avancement</h2>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/[0.08]" />
                <div className="space-y-6">
                  {projet.timeline.map((step, i) => (
                    <div key={i} className="flex gap-5 relative">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2 ${step.done ? 'bg-[#2A7A4B] border-[#2A7A4B]' : 'bg-white/[0.05] border-white/10'}`}>
                        {step.done
                          ? <CheckCircleIcon className="w-5 h-5 text-white" />
                          : <ClockIcon className="w-5 h-5 text-white/30" />
                        }
                      </div>
                      <div className="pb-6">
                        <div className="text-xs font-semibold text-white/30 mb-1">{step.date}</div>
                        <div className={`font-semibold mb-1 ${step.done ? 'text-white' : 'text-white/30'}`}>{step.titre}</div>
                        <div className="text-sm text-white/40">{step.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-5">Documents liés</h2>
              <div className="space-y-3">
                {projet.documents.map((doc) => (
                  <div key={doc.titre} className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/[0.07] rounded-xl hover:border-white/15 transition-colors">
                    <div>
                      <div className="font-medium text-sm text-white/80">{doc.titre}</div>
                      <div className="text-xs text-white/30 mt-0.5">{doc.type} · {doc.taille}</div>
                    </div>
                    <button aria-label={`Télécharger ${doc.titre}`} className="p-2 bg-[#2A7A4B] text-white rounded-lg hover:bg-[#225f3b] transition-colors">
                      <ArrowDownTrayIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
              <h3 className="font-bold text-white mb-4">Informations clés</h3>
              <div className="space-y-3">
                {[
                  { label: 'Investissement', value: projet.investissement },
                  { label: 'Emplois créés', value: projet.emploisCreés.toLocaleString('fr-FR') },
                  { label: 'Secteur', value: projet.secteur },
                  { label: 'Début', value: new Date(projet.dateDebut).toLocaleDateString('fr-FR', {month:'long',year:'numeric'}) },
                  { label: 'Fin prévue', value: new Date(projet.dateFin).toLocaleDateString('fr-FR', {month:'long',year:'numeric'}) },
                  { label: 'Mise à jour', value: new Date(projet.dateMAJ).toLocaleDateString('fr-FR') },
                ].map((info) => (
                  <div key={info.label} className="flex justify-between items-center text-sm py-2 border-b border-white/[0.05] last:border-0">
                    <span className="text-white/40">{info.label}</span>
                    <span className="font-semibold text-white/80">{info.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
              <h3 className="font-bold text-white mb-4">Partenaires</h3>
              <div className="space-y-2.5">
                {projet.partenaires.map((p) => (
                  <div key={p} className="text-sm text-white/50 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#2A7A4B] rounded-full flex-shrink-0" />
                    {p}
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/demarches"
              className="block py-4 bg-[#2A7A4B] text-white text-sm font-semibold rounded-xl text-center hover:bg-[#225f3b] transition-colors"
            >
              Investir dans ce projet
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
