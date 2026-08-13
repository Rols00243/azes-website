'use client'

/**
 * Briques d'interface partagées par les écrans du devis de fondations.
 * Pensées mobile d'abord : cibles tactiles ≥ 44 px, clavier numérique sur mobile.
 */

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import type { DevisInput } from '@/lib/fondations/types'

/** Met à jour un groupe de la saisie (fusion partielle). */
export type MajFn = <K extends keyof DevisInput>(cle: K, patch: Partial<DevisInput[K]>) => void

export interface EtapeProps {
  input: DevisInput
  maj: MajFn
}

/* ─────────────────────────────  Conteneurs  ───────────────────────────── */

export function Carte({
  titre,
  description,
  icone: Icone,
  actif,
  onToggle,
  children,
  accent = '#1B4F8C',
}: {
  titre: string
  description?: string
  icone?: React.ComponentType<{ className?: string }>
  /** Si défini, la carte devient activable/désactivable. */
  actif?: boolean
  onToggle?: (v: boolean) => void
  children: React.ReactNode
  accent?: string
}) {
  const desactive = actif === false
  return (
    <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <header className="flex items-start gap-3 px-4 sm:px-5 py-4 border-b border-gray-100">
        {Icone && (
          <span
            className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${accent}14`, color: accent }}
          >
            <Icone className="w-5 h-5" />
          </span>
        )}
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-[#0A2342] text-base leading-tight">{titre}</h2>
          {description && <p className="text-xs text-gray-500 mt-1 leading-relaxed">{description}</p>}
        </div>
        {onToggle && <Interrupteur valeur={actif !== false} onChange={onToggle} label={titre} />}
      </header>
      {!desactive && <div className="px-4 sm:px-5 py-5 space-y-5">{children}</div>}
    </section>
  )
}

/** Grille responsive : 1 colonne sur mobile, 2 à partir de sm. */
export function Grille({ children, colonnes = 2 }: { children: React.ReactNode; colonnes?: 2 | 3 }) {
  return (
    <div
      className={clsx(
        'grid grid-cols-1 gap-4',
        colonnes === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'
      )}
    >
      {children}
    </div>
  )
}

/* ──────────────────────────────  Champs  ─────────────────────────────── */

const labelCls = 'block text-xs font-semibold text-gray-600 mb-1.5'
const inputCls =
  'w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-3 text-sm text-gray-900 tabular-nums placeholder:text-gray-400 focus:outline-none focus:border-[#1B4F8C] focus:bg-white transition-colors'

/**
 * Saisie numérique tolérante : accepte la virgule décimale et le champ vide
 * pendant la frappe, sans jamais réécrire ce que l'utilisateur est en train de taper.
 */
export function ChampNombre({
  label,
  valeur,
  onChange,
  unite,
  aide,
  pas = 'any',
  min = 0,
}: {
  label: string
  valeur: number
  onChange: (v: number) => void
  unite?: string
  aide?: string
  pas?: string
  min?: number
}) {
  const [texte, setTexte] = useState(() => String(valeur))
  const enFrappe = useRef(false)

  useEffect(() => {
    if (!enFrappe.current) setTexte(String(valeur))
  }, [valeur])

  return (
    <div>
      <label className={labelCls}>{label}</label>
      <div className="relative">
        <input
          type="text"
          inputMode="decimal"
          step={pas}
          min={min}
          value={texte}
          onFocus={() => {
            enFrappe.current = true
          }}
          onChange={(e) => {
            const v = e.target.value
            if (!/^[0-9]*[.,]?[0-9]*$/.test(v)) return
            setTexte(v)
            const n = Number(v.replace(',', '.'))
            onChange(Number.isFinite(n) ? n : 0)
          }}
          onBlur={() => {
            enFrappe.current = false
            const n = Number(texte.replace(',', '.'))
            const propre = Number.isFinite(n) ? Math.max(min, n) : min
            setTexte(String(propre))
            onChange(propre)
          }}
          className={clsx(inputCls, unite && 'pr-14')}
        />
        {unite && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400 pointer-events-none">
            {unite}
          </span>
        )}
      </div>
      {aide && <p className="text-[11px] text-gray-400 mt-1 leading-snug">{aide}</p>}
    </div>
  )
}

export function ChampTexte({
  label,
  valeur,
  onChange,
  placeholder,
  aide,
}: {
  label: string
  valeur: string
  onChange: (v: string) => void
  placeholder?: string
  aide?: string
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <input
        type="text"
        value={valeur}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      />
      {aide && <p className="text-[11px] text-gray-400 mt-1 leading-snug">{aide}</p>}
    </div>
  )
}

export function ChampSelect<T extends string | number>({
  label,
  valeur,
  options,
  onChange,
  aide,
}: {
  label: string
  valeur: T
  options: { valeur: T; label: string }[]
  onChange: (v: T) => void
  aide?: string
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <select
        value={String(valeur)}
        onChange={(e) => {
          const brut = e.target.value
          const option = options.find((o) => String(o.valeur) === brut)
          if (option) onChange(option.valeur)
        }}
        className={inputCls}
      >
        {options.map((o) => (
          <option key={String(o.valeur)} value={String(o.valeur)}>
            {o.label}
          </option>
        ))}
      </select>
      {aide && <p className="text-[11px] text-gray-400 mt-1 leading-snug">{aide}</p>}
    </div>
  )
}

export function Interrupteur({
  valeur,
  onChange,
  label,
}: {
  valeur: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={valeur}
      aria-label={`Activer ${label}`}
      onClick={() => onChange(!valeur)}
      className={clsx(
        'relative shrink-0 w-12 h-7 rounded-full transition-colors',
        valeur ? 'bg-[#2A7A4B]' : 'bg-gray-300'
      )}
    >
      <span
        className={clsx(
          'absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform',
          valeur ? 'translate-x-6' : 'translate-x-1'
        )}
      />
    </button>
  )
}

/** Case à cocher pleine largeur — utilisée pour les options d'un ouvrage. */
export function CaseOption({
  label,
  valeur,
  onChange,
  aide,
}: {
  label: string
  valeur: boolean
  onChange: (v: boolean) => void
  aide?: string
}) {
  return (
    <label className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 cursor-pointer hover:border-gray-300 transition-colors">
      <input
        type="checkbox"
        checked={valeur}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 w-5 h-5 accent-[#1B4F8C]"
      />
      <span className="min-w-0">
        <span className="block text-sm font-medium text-gray-800">{label}</span>
        {aide && <span className="block text-[11px] text-gray-400 leading-snug mt-0.5">{aide}</span>}
      </span>
    </label>
  )
}

export function Segmente<T extends string>({
  valeur,
  options,
  onChange,
}: {
  valeur: T
  options: { valeur: T; label: string }[]
  onChange: (v: T) => void
}) {
  return (
    <div className="inline-flex bg-gray-100 rounded-xl p-1 w-full">
      {options.map((o) => (
        <button
          key={o.valeur}
          type="button"
          onClick={() => onChange(o.valeur)}
          className={clsx(
            'flex-1 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all',
            valeur === o.valeur ? 'bg-white text-[#1B4F8C] shadow-sm' : 'text-gray-500 hover:text-gray-700'
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

/* ──────────────────────────────  Divers  ─────────────────────────────── */

export function Statistique({
  label,
  valeur,
  unite,
  accent = '#1B4F8C',
}: {
  label: string
  valeur: string
  unite?: string
  accent?: string
}) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-3">
      <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide leading-tight">
        {label}
      </div>
      <div className="mt-1 font-bold tabular-nums leading-none" style={{ color: accent }}>
        <span className="text-lg">{valeur}</span>
        {unite && <span className="text-xs font-semibold text-gray-400 ml-1">{unite}</span>}
      </div>
    </div>
  )
}

export function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-gray-500 bg-blue-50/60 border border-blue-100 rounded-xl px-3.5 py-3 leading-relaxed">
      {children}
    </p>
  )
}
