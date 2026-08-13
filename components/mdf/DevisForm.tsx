'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'
import {
  collections,
  company,
  finitions,
  prixLabel,
  zonesIntervention,
} from '@/lib/mdf/data'

type Champs = {
  projet: string
  espace: string
  description: string
  dimensions: string
  budget: string
  echeance: string
  finition: string
  nom: string
  telephone: string
  email: string
  commune: string
}

const vide: Champs = {
  projet: '',
  espace: '',
  description: '',
  dimensions: '',
  budget: '',
  echeance: '',
  finition: 'À définir avec vous',
  nom: '',
  telephone: '',
  email: '',
  commune: '',
}

const budgets = [
  'Moins de 1 000 $',
  '1 000 à 3 000 $',
  '3 000 à 7 000 $',
  '7 000 à 15 000 $',
  'Plus de 15 000 $',
  'Je ne sais pas encore',
]

const echeances = [
  'Dès que possible',
  'Dans le mois',
  'Dans les trois mois',
  'Projet à l’étude',
]

const etapesForm = [
  { titre: 'Le projet', sous: 'Ce que vous voulez faire fabriquer' },
  { titre: 'Le cadre', sous: 'Dimensions, budget et échéance' },
  { titre: 'Vous', sous: 'Pour vous rappeler' },
]

export default function DevisForm() {
  const params = useSearchParams()
  const projetInitial =
    collections.find((c) => c.slug === params.get('projet'))?.nom ?? ''

  const [etape, setEtape] = useState(0)
  const [champs, setChamps] = useState<Champs>({
    ...vide,
    projet: projetInitial,
  })
  const [erreur, setErreur] = useState<string | null>(null)
  const [envoi, setEnvoi] = useState(false)
  const [reference, setReference] = useState<string | null>(null)

  const set = <K extends keyof Champs>(cle: K, valeur: Champs[K]) => {
    setChamps((c) => ({ ...c, [cle]: valeur }))
    setErreur(null)
  }

  const suivant = () => {
    if (etape === 0 && !champs.projet) {
      setErreur('Choisissez le type de projet pour continuer.')
      return
    }
    setErreur(null)
    setEtape((e) => Math.min(e + 1, 2))
  }

  const envoyer = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!champs.nom.trim() || !champs.telephone.trim()) {
      setErreur('Votre nom et votre téléphone sont nécessaires pour vous rappeler.')
      return
    }
    setEnvoi(true)
    setErreur(null)
    try {
      const res = await fetch('/api/mdf/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(champs),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Erreur')
      setReference(data.reference)
    } catch (err) {
      setErreur(
        err instanceof Error
          ? err.message
          : 'Envoi impossible. Appelez-nous, nous prenons la demande par téléphone.'
      )
    } finally {
      setEnvoi(false)
    }
  }

  if (reference) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border border-mdf-oak/40 bg-mdf-espresso/50 p-10 text-center lg:p-14"
      >
        <span className="mdf-edge mx-auto block h-4 w-24" aria-hidden="true" />
        <h2 className="mt-8 text-3xl text-mdf-cream">Demande enregistrée</h2>
        <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-mdf-sand/65 sm:text-base">
          Merci {champs.nom.split(' ')[0]}. Un métreur vous rappelle sous 48 heures
          ouvrées au {champs.telephone} pour fixer le rendez-vous de relevé. Votre
          référence de dossier est <span className="text-mdf-oak">{reference}</span>.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/mdf/realisations"
            className="border border-mdf-sand/25 px-8 py-4 text-xs uppercase tracking-[0.18em] text-mdf-cream transition-colors hover:border-mdf-oak hover:text-mdf-oak"
          >
            Voir nos réalisations
          </Link>
          <a
            href={`tel:${company.telephoneHref}`}
            className="bg-mdf-oak px-8 py-4 text-xs uppercase tracking-[0.18em] text-mdf-ink transition-colors hover:bg-mdf-cream"
          >
            Appeler l&apos;atelier
          </a>
        </div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={envoyer} noValidate>
      {/* progression */}
      <ol className="grid gap-px border border-mdf-sand/12 bg-mdf-sand/12 sm:grid-cols-3">
        {etapesForm.map((e, i) => (
          <li
            key={e.titre}
            aria-current={etape === i ? 'step' : undefined}
            className={clsx(
              'bg-mdf-ink p-5 transition-colors',
              etape === i && 'bg-mdf-espresso/80'
            )}
          >
            <span
              className={clsx(
                'mdf-eyebrow',
                etape >= i ? 'text-mdf-oak' : 'text-mdf-sand/30'
              )}
            >
              Étape {i + 1}
            </span>
            <span
              className={clsx(
                'mt-2 block text-base',
                etape >= i ? 'text-mdf-cream' : 'text-mdf-sand/40'
              )}
            >
              {e.titre}
            </span>
            <span className="mt-1 block text-xs text-mdf-sand/35">{e.sous}</span>
          </li>
        ))}
      </ol>

      <div className="border-x border-b border-mdf-sand/12 p-7 lg:p-10">
        <AnimatePresence mode="wait">
          {/* ── Étape 1 ─────────────────────────────────────────────────── */}
          {etape === 0 && (
            <motion.div
              key="e1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <fieldset>
                <legend className="mdf-eyebrow text-mdf-oak">
                  Type de projet
                </legend>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {collections.map((c) => (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => set('projet', c.nom)}
                      aria-pressed={champs.projet === c.nom}
                      className={clsx(
                        'border px-5 py-4 text-left text-sm transition-colors',
                        champs.projet === c.nom
                          ? 'border-mdf-oak bg-mdf-oak/12 text-mdf-cream'
                          : 'border-mdf-sand/15 text-mdf-sand/65 hover:border-mdf-oak/50 hover:text-mdf-cream'
                      )}
                    >
                      {c.nom}
                      <span className="mt-1 block text-xs text-mdf-sand/35">
                        {prixLabel(c.prix)}
                      </span>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => set('projet', 'Projet particulier')}
                    aria-pressed={champs.projet === 'Projet particulier'}
                    className={clsx(
                      'border px-5 py-4 text-left text-sm transition-colors',
                      champs.projet === 'Projet particulier'
                        ? 'border-mdf-oak bg-mdf-oak/12 text-mdf-cream'
                        : 'border-mdf-sand/15 text-mdf-sand/65 hover:border-mdf-oak/50 hover:text-mdf-cream'
                    )}
                  >
                    Autre projet
                    <span className="mt-1 block text-xs text-mdf-sand/35">
                      décrivez-le ci-dessous
                    </span>
                  </button>
                </div>
              </fieldset>

              <Champ
                className="mt-8"
                label="Dans quelle pièce ou quel local ?"
                exemple="Cuisine du rez-de-chaussée, boutique de 40 m²…"
                valeur={champs.espace}
                onChange={(v) => set('espace', v)}
              />

              <ChampTexte
                label="Décrivez votre besoin"
                exemple="Ce que vous voulez ranger, le style recherché, les contraintes de la pièce…"
                valeur={champs.description}
                onChange={(v) => set('description', v)}
              />
            </motion.div>
          )}

          {/* ── Étape 2 ─────────────────────────────────────────────────── */}
          {etape === 1 && (
            <motion.div
              key="e2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Champ
                label="Dimensions approximatives"
                exemple="Longueur de mur, hauteur sous plafond… même au mètre près"
                valeur={champs.dimensions}
                onChange={(v) => set('dimensions', v)}
              />

              <fieldset className="mt-8">
                <legend className="mdf-eyebrow text-mdf-oak">
                  Budget envisagé
                </legend>
                <div className="mt-4 flex flex-wrap gap-3">
                  {budgets.map((b) => (
                    <Puce
                      key={b}
                      actif={champs.budget === b}
                      onClick={() => set('budget', b)}
                      label={b}
                    />
                  ))}
                </div>
              </fieldset>

              <fieldset className="mt-8">
                <legend className="mdf-eyebrow text-mdf-oak">Échéance</legend>
                <div className="mt-4 flex flex-wrap gap-3">
                  {echeances.map((e) => (
                    <Puce
                      key={e}
                      actif={champs.echeance === e}
                      onClick={() => set('echeance', e)}
                      label={e}
                    />
                  ))}
                </div>
              </fieldset>

              <label className="mt-8 block">
                <span className="mdf-eyebrow text-mdf-oak">
                  Finition qui vous attire
                </span>
                <select
                  value={champs.finition}
                  onChange={(e) => set('finition', e.target.value)}
                  className="mt-4 w-full border border-mdf-sand/18 bg-mdf-espresso/40 px-5 py-4 text-mdf-cream outline-none transition-colors focus:border-mdf-oak"
                >
                  <option>À définir avec vous</option>
                  {finitions.map((f) => (
                    <option key={f.nom}>{f.nom}</option>
                  ))}
                </select>
              </label>
            </motion.div>
          )}

          {/* ── Étape 3 ─────────────────────────────────────────────────── */}
          {etape === 2 && (
            <motion.div
              key="e3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <Champ
                  label="Nom complet *"
                  exemple="Comment devons-nous vous appeler ?"
                  valeur={champs.nom}
                  onChange={(v) => set('nom', v)}
                  requis
                />
                <Champ
                  label="Téléphone *"
                  exemple={company.telephone}
                  valeur={champs.telephone}
                  onChange={(v) => set('telephone', v)}
                  type="tel"
                  requis
                />
                <Champ
                  label="E-mail"
                  exemple="Pour recevoir les vues 3D et le devis"
                  valeur={champs.email}
                  onChange={(v) => set('email', v)}
                  type="email"
                />
                <label className="block">
                  <span className="mdf-eyebrow text-mdf-oak">Commune</span>
                  <select
                    value={champs.commune}
                    onChange={(e) => set('commune', e.target.value)}
                    className="mt-4 w-full border border-mdf-sand/18 bg-mdf-espresso/40 px-5 py-4 text-mdf-cream outline-none transition-colors focus:border-mdf-oak"
                  >
                    <option value="">Sélectionnez…</option>
                    {zonesIntervention.map((z) => (
                      <option key={z}>{z}</option>
                    ))}
                    <option>Hors Kinshasa</option>
                  </select>
                </label>
              </div>

              <div className="mt-8 border border-mdf-sand/12 bg-mdf-espresso/30 p-6">
                <p className="mdf-eyebrow text-mdf-sand/40">Récapitulatif</p>
                <dl className="mt-4 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
                  {[
                    ['Projet', champs.projet],
                    ['Espace', champs.espace],
                    ['Dimensions', champs.dimensions],
                    ['Budget', champs.budget],
                    ['Échéance', champs.echeance],
                    ['Finition', champs.finition],
                  ]
                    .filter(([, v]) => v)
                    .map(([cle, valeur]) => (
                      <div key={cle} className="flex gap-3">
                        <dt className="shrink-0 text-mdf-sand/40">{cle}</dt>
                        <dd className="text-mdf-cream">{valeur}</dd>
                      </div>
                    ))}
                </dl>
              </div>

              <p className="mt-6 text-xs leading-relaxed text-mdf-sand/40">
                Vos coordonnées servent uniquement à traiter cette demande de devis.
                Elles ne sont ni revendues ni utilisées pour de la prospection.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {erreur && (
          <p
            role="alert"
            className="mt-6 border-l-2 border-mdf-oak bg-mdf-oak/10 px-5 py-3 text-sm text-mdf-cream"
          >
            {erreur}
          </p>
        )}

        {/* navigation */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setEtape((e) => Math.max(e - 1, 0))}
            disabled={etape === 0}
            className="text-xs uppercase tracking-[0.18em] text-mdf-sand/50 transition-colors hover:text-mdf-cream disabled:invisible"
          >
            ← Retour
          </button>

          {etape < 2 ? (
            <button
              type="button"
              onClick={suivant}
              className="bg-mdf-oak px-9 py-4 text-xs font-medium uppercase tracking-[0.18em] text-mdf-ink transition-colors hover:bg-mdf-cream"
            >
              Continuer
            </button>
          ) : (
            <button
              type="submit"
              disabled={envoi}
              className="bg-mdf-oak px-9 py-4 text-xs font-medium uppercase tracking-[0.18em] text-mdf-ink transition-colors hover:bg-mdf-cream disabled:opacity-60"
            >
              {envoi ? 'Envoi en cours…' : 'Envoyer ma demande'}
            </button>
          )}
        </div>
      </div>
    </form>
  )
}

function Champ({
  label,
  exemple,
  valeur,
  onChange,
  type = 'text',
  requis = false,
  className = '',
}: {
  label: string
  exemple: string
  valeur: string
  onChange: (v: string) => void
  type?: string
  requis?: boolean
  className?: string
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mdf-eyebrow text-mdf-oak">{label}</span>
      <input
        type={type}
        value={valeur}
        required={requis}
        placeholder={exemple}
        onChange={(e) => onChange(e.target.value)}
        className="mt-4 w-full border border-mdf-sand/18 bg-mdf-espresso/40 px-5 py-4 text-mdf-cream outline-none transition-colors placeholder:text-mdf-sand/25 focus:border-mdf-oak"
      />
    </label>
  )
}

function ChampTexte({
  label,
  exemple,
  valeur,
  onChange,
}: {
  label: string
  exemple: string
  valeur: string
  onChange: (v: string) => void
}) {
  return (
    <label className="mt-8 block">
      <span className="mdf-eyebrow text-mdf-oak">{label}</span>
      <textarea
        rows={5}
        value={valeur}
        placeholder={exemple}
        onChange={(e) => onChange(e.target.value)}
        className="mt-4 w-full resize-y border border-mdf-sand/18 bg-mdf-espresso/40 px-5 py-4 text-mdf-cream outline-none transition-colors placeholder:text-mdf-sand/25 focus:border-mdf-oak"
      />
    </label>
  )
}

function Puce({
  actif,
  onClick,
  label,
}: {
  actif: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={actif}
      className={clsx(
        'border px-5 py-3 text-sm transition-colors',
        actif
          ? 'border-mdf-oak bg-mdf-oak/12 text-mdf-cream'
          : 'border-mdf-sand/15 text-mdf-sand/60 hover:border-mdf-oak/50 hover:text-mdf-cream'
      )}
    >
      {label}
    </button>
  )
}
