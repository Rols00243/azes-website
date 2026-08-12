import { DEVISES } from './constants'
import type { Devise } from './types'

export function symboleDevise(devise: Devise): string {
  return DEVISES.find((d) => d.code === devise)?.symbole ?? devise
}

/** Formate un nombre avec séparateurs de milliers (espace insécable fine). */
export function formatNombre(valeur: number, decimales = 2): string {
  if (!Number.isFinite(valeur)) return '—'
  return valeur.toLocaleString('fr-FR', {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  })
}

/** Formate un montant : « 1 250,00 $ » ou « 3 500 000 FC ». */
export function formatMontant(valeur: number, devise: Devise): string {
  const decimales = devise === 'CDF' ? 0 : 2
  return `${formatNombre(valeur, decimales)} ${symboleDevise(devise)}`
}

/** Quantité affichée : entier si la valeur est entière, sinon 2 décimales. */
export function formatQuantite(valeur: number, decimales = 2): string {
  if (!Number.isFinite(valeur)) return '—'
  return Number.isInteger(valeur) ? formatNombre(valeur, 0) : formatNombre(valeur, decimales)
}

export function formatDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
}
