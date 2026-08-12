/**
 * Persistance locale des devis (localStorage) — l'outil fonctionne hors ligne,
 * aucune donnée n'est envoyée au serveur.
 */

import { inputParDefaut } from './constants'
import type { DevisInput } from './types'

const CLE_PROJETS = 'azes.devis-fondations.projets.v1'
const CLE_BROUILLON = 'azes.devis-fondations.brouillon.v1'

export interface ProjetEnregistre {
  id: string
  nom: string
  modifieLe: string
  input: DevisInput
}

const disponible = () => typeof window !== 'undefined' && !!window.localStorage

/** Fusionne une saisie partielle (ancienne version, import) avec les valeurs par défaut. */
export function normaliserInput(brut: unknown): DevisInput {
  const defaut = inputParDefaut()
  if (!brut || typeof brut !== 'object') return defaut
  return fusionner(defaut, brut as Record<string, unknown>) as DevisInput
}

function fusionner(base: unknown, patch: Record<string, unknown>): unknown {
  if (Array.isArray(base)) return Array.isArray(patch) ? patch : base
  if (typeof base !== 'object' || base === null) return patch ?? base
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) }
  for (const [cle, valeur] of Object.entries(patch)) {
    if (!(cle in out)) {
      out[cle] = valeur
      continue
    }
    const actuel = out[cle]
    if (Array.isArray(actuel)) {
      out[cle] = Array.isArray(valeur) ? valeur : actuel
    } else if (actuel && typeof actuel === 'object' && valeur && typeof valeur === 'object') {
      out[cle] = fusionner(actuel, valeur as Record<string, unknown>)
    } else if (valeur !== undefined && valeur !== null) {
      out[cle] = valeur
    }
  }
  return out
}

export function listerProjets(): ProjetEnregistre[] {
  if (!disponible()) return []
  try {
    const brut = window.localStorage.getItem(CLE_PROJETS)
    if (!brut) return []
    const liste = JSON.parse(brut)
    if (!Array.isArray(liste)) return []
    return liste
      .filter((p) => p && typeof p.id === 'string')
      .map((p) => ({
        id: p.id,
        nom: p.nom || 'Sans titre',
        modifieLe: p.modifieLe || '',
        input: normaliserInput(p.input),
      }))
      .sort((a, b) => (a.modifieLe < b.modifieLe ? 1 : -1))
  } catch {
    return []
  }
}

function ecrire(liste: ProjetEnregistre[]) {
  if (!disponible()) return
  try {
    window.localStorage.setItem(CLE_PROJETS, JSON.stringify(liste))
  } catch {
    /* quota dépassé — on ignore silencieusement */
  }
}

export function sauvegarderProjet(input: DevisInput, id?: string): ProjetEnregistre {
  const liste = listerProjets()
  const projet: ProjetEnregistre = {
    id: id || `dv-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    nom: input.projet.nom || 'Devis sans titre',
    modifieLe: new Date().toISOString(),
    input,
  }
  const index = liste.findIndex((p) => p.id === projet.id)
  if (index >= 0) liste[index] = projet
  else liste.unshift(projet)
  ecrire(liste)
  return projet
}

export function supprimerProjet(id: string) {
  ecrire(listerProjets().filter((p) => p.id !== id))
}

export function chargerBrouillon(): DevisInput | null {
  if (!disponible()) return null
  try {
    const brut = window.localStorage.getItem(CLE_BROUILLON)
    return brut ? normaliserInput(JSON.parse(brut)) : null
  } catch {
    return null
  }
}

export function sauvegarderBrouillon(input: DevisInput) {
  if (!disponible()) return
  try {
    window.localStorage.setItem(CLE_BROUILLON, JSON.stringify(input))
  } catch {
    /* quota dépassé */
  }
}
