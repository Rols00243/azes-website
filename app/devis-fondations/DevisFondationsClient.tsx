'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpTrayIcon,
  BookmarkSquareIcon,
  DocumentPlusIcon,
  FolderOpenIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { calculerDevis } from '@/lib/fondations/calcul'
import { inputParDefaut } from '@/lib/fondations/constants'
import { lireFichierJSON } from '@/lib/fondations/export'
import { formatMontant, formatNombre } from '@/lib/fondations/format'
import {
  chargerBrouillon,
  listerProjets,
  normaliserInput,
  sauvegarderBrouillon,
  sauvegarderProjet,
  supprimerProjet,
  type ProjetEnregistre,
} from '@/lib/fondations/storage'
import { appliquerApport, type ApportPlan } from '@/lib/fondations/plans/mesure'
import type { DevisInput } from '@/lib/fondations/types'
import EtapeArmatures from './EtapeArmatures'
import EtapeCoffrage from './EtapeCoffrage'
import EtapeGeometrie from './EtapeGeometrie'
import EtapeOuvrages from './EtapeOuvrages'
import EtapePlomberie from './EtapePlomberie'
import EtapePrix from './EtapePrix'
import EtapePlan from './EtapePlan'
import EtapeProjet from './EtapeProjet'
import DocumentImprime from './DocumentImprime'
import Resultats from './Resultats'
import type { MajFn } from './ui'

const ETAPES = [
  { cle: 'projet', label: 'Projet' },
  { cle: 'plan', label: 'Plan' },
  { cle: 'geometrie', label: 'Géométrie' },
  { cle: 'ouvrages', label: 'Ouvrages' },
  { cle: 'armatures', label: 'Armatures' },
  { cle: 'coffrage', label: 'Coffrage & maçonnerie' },
  { cle: 'plomberie', label: 'Plomberie' },
  { cle: 'prix', label: 'Prix' },
  { cle: 'devis', label: 'Devis' },
] as const

type CleEtape = (typeof ETAPES)[number]['cle']

export default function DevisFondationsClient() {
  // Le composant n'est monté que côté navigateur : le brouillon est lu dès l'initialisation.
  const [input, setInput] = useState<DevisInput>(() => chargerBrouillon() ?? inputParDefaut())
  const [etape, setEtape] = useState<CleEtape>('projet')
  const [projets, setProjets] = useState<ProjetEnregistre[]>(() => listerProjets())
  const [panneauOuvert, setPanneauOuvert] = useState(false)
  const [projetCourant, setProjetCourant] = useState<string | undefined>()
  const [message, setMessage] = useState('')
  const fichierRef = useRef<HTMLInputElement>(null)
  const hautRef = useRef<HTMLDivElement>(null)

  const resultat = useMemo(() => calculerDevis(input), [input])

  const maj = useCallback<MajFn>((cle, patch) => {
    setInput((precedent) => ({ ...precedent, [cle]: { ...precedent[cle], ...patch } }))
  }, [])

  const notifier = useCallback((texte: string) => {
    setMessage(texte)
    window.setTimeout(() => setMessage(''), 2600)
  }, [])

  // Sauvegarde automatique du brouillon (anti-rebond).
  useEffect(() => {
    const t = window.setTimeout(() => sauvegarderBrouillon(input), 400)
    return () => window.clearTimeout(t)
  }, [input])

  // Mode application installable : le service worker sert la coquille hors ligne.
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return
    if (!('serviceWorker' in navigator)) return
    navigator.serviceWorker.register('/sw.js').catch(() => {
      /* installation hors ligne indisponible — l'outil reste utilisable en ligne */
    })
  }, [])

  const indexEtape = ETAPES.findIndex((e) => e.cle === etape)

  const allerA = (cle: CleEtape) => {
    setEtape(cle)
    hautRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const enregistrer = () => {
    const projet = sauvegarderProjet(input, projetCourant)
    setProjetCourant(projet.id)
    setProjets(listerProjets())
    notifier('Devis enregistré sur cet appareil')
  }

  const charger = (projet: ProjetEnregistre) => {
    setInput(projet.input)
    setProjetCourant(projet.id)
    setPanneauOuvert(false)
    notifier(`« ${projet.nom} » chargé`)
  }

  const nouveau = () => {
    setInput(inputParDefaut())
    setProjetCourant(undefined)
    setPanneauOuvert(false)
    allerA('projet')
    notifier('Nouveau devis')
  }

  const reporterPlan = (apport: ApportPlan) => {
    setInput((precedent) => appliquerApport(precedent, apport))
    notifier(`Relevé reporté (${apport.source})`)
    allerA('geometrie')
  }

  const importer = async (fichier: File) => {
    try {
      const brut = await lireFichierJSON(fichier)
      setInput(normaliserInput(brut))
      setProjetCourant(undefined)
      setPanneauOuvert(false)
      notifier('Dossier importé')
    } catch {
      notifier('Fichier illisible : JSON attendu')
    }
  }

  const contenu = () => {
    switch (etape) {
      case 'projet':
        return <EtapeProjet input={input} maj={maj} />
      case 'plan':
        return <EtapePlan onApport={reporterPlan} />
      case 'geometrie':
        return <EtapeGeometrie input={input} maj={maj} />
      case 'ouvrages':
        return <EtapeOuvrages input={input} maj={maj} />
      case 'armatures':
        return <EtapeArmatures input={input} maj={maj} />
      case 'coffrage':
        return <EtapeCoffrage input={input} maj={maj} />
      case 'plomberie':
        return <EtapePlomberie input={input} maj={maj} />
      case 'prix':
        return <EtapePrix input={input} maj={maj} resultat={resultat} />
      case 'devis':
        return <Resultats input={input} resultat={resultat} />
    }
  }

  return (
    <div className="pb-32 devis-page">
      {/* Toujours monté : Ctrl+P imprime le devis quel que soit l'onglet affiché. */}
      <DocumentImprime input={input} resultat={resultat} />
      <header className="devis-no-print bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-7 sm:py-9">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#C4894A]">
            Outil de métré
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-[#0A2342] leading-tight">
            Devis <span className="text-[#C4894A]">Fondations</span>
          </h1>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed max-w-2xl">
            Analysez un plan (DXF, PDF, photo) ou saisissez les dimensions, puis obtenez les fouilles,
            le béton, les barres de fer, le fil d&apos;attache, les planches, les clous, les blocs et
            les tuyaux d&apos;attente — et le devis chiffré. Application autonome : tout se calcule
            sur votre appareil, hors ligne, sans serveur.
          </p>
        </div>
      </header>

      <div ref={hautRef} className="scroll-mt-24" />

      {/* Barre d'onglets */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-y border-gray-200 devis-no-print">
        <div className="max-w-5xl mx-auto px-3 sm:px-6">
          <div className="flex gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {ETAPES.map((e, i) => (
              <button
                key={e.cle}
                type="button"
                onClick={() => allerA(e.cle)}
                className={clsx(
                  'shrink-0 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap',
                  etape === e.cle
                    ? 'bg-[#1B4F8C] text-white'
                    : 'text-gray-500 hover:text-[#1B4F8C] hover:bg-blue-50'
                )}
              >
                <span className="text-[10px] opacity-60 mr-1.5">{i + 1}</span>
                {e.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* Actions dossier */}
        <div className="flex flex-wrap items-center gap-2 mb-5 devis-no-print">
          <button
            type="button"
            onClick={enregistrer}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#2A7A4B] text-white text-xs sm:text-sm font-semibold hover:bg-[#22633d] transition-colors"
          >
            <BookmarkSquareIcon className="w-4 h-4" /> Enregistrer
          </button>
          <button
            type="button"
            onClick={() => {
              setProjets(listerProjets())
              setPanneauOuvert(true)
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-gray-300 text-gray-600 text-xs sm:text-sm font-semibold hover:border-[#1B4F8C] hover:text-[#1B4F8C] transition-colors"
          >
            <FolderOpenIcon className="w-4 h-4" /> Mes devis
            {projets.length > 0 && (
              <span className="bg-gray-100 text-gray-500 rounded-full px-1.5 text-[10px]">
                {projets.length}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={nouveau}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-gray-300 text-gray-600 text-xs sm:text-sm font-semibold hover:border-[#1B4F8C] hover:text-[#1B4F8C] transition-colors"
          >
            <DocumentPlusIcon className="w-4 h-4" /> Nouveau
          </button>
          <button
            type="button"
            onClick={() => fichierRef.current?.click()}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-gray-300 text-gray-600 text-xs sm:text-sm font-semibold hover:border-[#1B4F8C] hover:text-[#1B4F8C] transition-colors"
          >
            <ArrowUpTrayIcon className="w-4 h-4" /> Importer
          </button>
          <input
            ref={fichierRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) importer(f)
              e.target.value = ''
            }}
          />
          {message && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs font-semibold text-[#2A7A4B]"
            >
              {message}
            </motion.span>
          )}
        </div>

        <div className="devis-no-print">{contenu()}</div>

        {/* Navigation bas de page */}
        <div className="flex gap-3 mt-6 devis-no-print">
          <button
            type="button"
            disabled={indexEtape === 0}
            onClick={() => allerA(ETAPES[Math.max(0, indexEtape - 1)].cle)}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-600 disabled:opacity-40 hover:border-[#1B4F8C] hover:text-[#1B4F8C] transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" /> Précédent
          </button>
          <button
            type="button"
            disabled={indexEtape === ETAPES.length - 1}
            onClick={() => allerA(ETAPES[Math.min(ETAPES.length - 1, indexEtape + 1)].cle)}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#1B4F8C] text-white text-sm font-semibold disabled:opacity-40 hover:bg-[#163f70] transition-colors"
          >
            Suivant <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Récapitulatif permanent */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0A2342] text-white devis-no-print">
        <button
          type="button"
          onClick={() => allerA('devis')}
          className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3 text-left"
        >
          <div className="flex gap-4 sm:gap-6 min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[
              ['Linéaire', `${formatNombre(resultat.metre.lineaireTotal, 1)} ml`],
              ['Béton', `${formatNombre(resultat.metre.totauxBeton.volume, 2)} m³`],
              ['Acier', `${formatNombre(resultat.metre.acier.totalKg, 0)} kg`],
              ['Coffrage', `${formatNombre(resultat.metre.coffrage.surface, 1)} m²`],
            ].map(([label, valeur]) => (
              <div key={label} className="shrink-0">
                <div className="text-[10px] uppercase tracking-wide text-blue-200/70">{label}</div>
                <div className="text-sm font-bold tabular-nums">{valeur}</div>
              </div>
            ))}
          </div>
          <div className="text-right shrink-0">
            <div className="text-[10px] uppercase tracking-wide text-[#C4894A]">Total TTC</div>
            <div className="text-base sm:text-lg font-bold tabular-nums">
              {formatMontant(resultat.totaux.totalTTC, input.projet.devise)}
            </div>
          </div>
        </button>
      </div>

      {/* Panneau « Mes devis » */}
      {panneauOuvert && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center devis-no-print">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setPanneauOuvert(false)}
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl max-h-[80vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-bold text-[#0A2342]">Mes devis enregistrés</h2>
              <button
                type="button"
                onClick={() => setPanneauOuvert(false)}
                aria-label="Fermer"
                className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:bg-gray-100"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-3">
              {projets.length === 0 && (
                <p className="text-sm text-gray-500">
                  Aucun devis enregistré sur cet appareil. Utilisez « Enregistrer » pour conserver le
                  dossier en cours.
                </p>
              )}
              {projets.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 border border-gray-200 rounded-xl px-3.5 py-3"
                >
                  <button
                    type="button"
                    onClick={() => charger(p)}
                    className="flex-1 min-w-0 text-left"
                  >
                    <div className="font-semibold text-sm text-[#0A2342] truncate">{p.nom}</div>
                    <div className="text-[11px] text-gray-400">
                      {p.modifieLe ? new Date(p.modifieLe).toLocaleString('fr-FR') : ''}
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      supprimerProjet(p.id)
                      setProjets(listerProjets())
                      if (projetCourant === p.id) setProjetCourant(undefined)
                    }}
                    aria-label={`Supprimer ${p.nom}`}
                    className="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
