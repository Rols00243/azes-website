/**
 * Mesure sur un plan matriciel (image ou page PDF rastérisée).
 *
 * Un plan scanné ne porte aucune coordonnée : on ne peut mesurer qu'après avoir
 * donné au logiciel une référence. Deux façons de le faire, l'une comme l'autre
 * courantes en métré :
 *   — la calibration sur une cote connue (on pointe deux extrémités et on saisit
 *     la distance réelle) : la plus fiable, elle absorbe les déformations de
 *     photocopie et de photo ;
 *   — l'échelle du plan (1:50, 1:100…) combinée à la résolution de l'image.
 */

import type { DevisInput, Segment } from '../types'

export type Point = [number, number]

export type RoleTrace = 'perimetre' | 'refend' | 'autre'

export interface Trace {
  id: string
  role: RoleTrace
  points: Point[]
  /** Contour fermé (périmètre d'un bâtiment) plutôt que ligne ouverte. */
  ferme: boolean
}

export const LIBELLE_ROLE: Record<RoleTrace, string> = {
  perimetre: 'Périmètre',
  refend: 'Refend',
  autre: 'Autre linéaire',
}

const distance = (a: Point, b: Point) => Math.hypot(b[0] - a[0], b[1] - a[1])

/** Mètres par pixel à partir d'une cote connue pointée sur le plan. */
export function echelleParReference(pixels: number, metres: number): number {
  if (!(pixels > 0) || !(metres > 0)) return 0
  return metres / pixels
}

/**
 * Mètres par pixel à partir de l'échelle du plan et de la résolution de l'image.
 * À 1:50 et 150 ppp, un pixel vaut 50 × 0,0254 / 150 ≈ 8,5 mm.
 */
export function echelleParPlan(denominateur: number, ppp: number): number {
  if (!(denominateur > 0) || !(ppp > 0)) return 0
  return (denominateur * 0.0254) / ppp
}

/** Longueur développée d'un tracé, en mètres. */
export function longueurTrace(trace: Trace, metresParPixel: number): number {
  const p = trace.points
  let total = 0
  for (let i = 1; i < p.length; i++) total += distance(p[i - 1], p[i])
  if (trace.ferme && p.length > 2) total += distance(p[p.length - 1], p[0])
  return total * metresParPixel
}

/** Aire d'un contour fermé (formule du lacet), en m². */
export function aireTrace(trace: Trace, metresParPixel: number): number {
  const p = trace.points
  if (p.length < 3) return 0
  let somme = 0
  for (let i = 0; i < p.length; i++) {
    const a = p[i]
    const b = p[(i + 1) % p.length]
    somme += a[0] * b[1] - b[0] * a[1]
  }
  return (Math.abs(somme) / 2) * metresParPixel * metresParPixel
}

export interface ReleveTraces {
  parRole: Record<RoleTrace, number>
  total: number
  aire: number
}

export function releverTraces(traces: Trace[], metresParPixel: number): ReleveTraces {
  const parRole: Record<RoleTrace, number> = { perimetre: 0, refend: 0, autre: 0 }
  let aire = 0
  for (const t of traces) {
    parRole[t.role] += longueurTrace(t, metresParPixel)
    if (t.ferme && t.role === 'perimetre') aire += aireTrace(t, metresParPixel)
  }
  return { parRole, total: parRole.perimetre + parRole.refend + parRole.autre, aire }
}

/* ─────────────────  Report du relevé dans la saisie du devis  ───────────────── */

export interface ApportPlan {
  /** Tronçons de fondation relevés, en mètres. */
  segments: { nom: string; longueur: number; nombre: number }[]
  /** Nombre de poteaux repérés (amorces, semelles isolées, puits). */
  poteaux?: number
  /** Surface d'emprise relevée (m²), reportée sur le dallage. */
  emprise?: number
  /** Dimensions hors tout relevées (m). */
  dimensions?: { longueur: number; largeur: number }
  /** Origine du relevé, affichée à l'utilisateur. */
  source: string
}

/**
 * Reporte un relevé de plan dans la saisie : le linéaire passe en mode détaillé
 * (un tronçon par poste relevé), les comptages alimentent les poteaux.
 * Les postes non renseignés par le plan sont laissés intacts.
 */
export function appliquerApport(input: DevisInput, apport: ApportPlan): DevisInput {
  const segments: Segment[] = apport.segments
    .filter((s) => s.longueur > 0)
    .map((s, i) => ({
      id: `plan-${i + 1}`,
      nom: s.nom,
      longueur: Math.round(s.longueur * 100) / 100,
      nombre: s.nombre || 1,
    }))

  const sortie: DevisInput = {
    ...input,
    geometrie: {
      ...input.geometrie,
      mode: segments.length ? 'detaille' : input.geometrie.mode,
      segments: segments.length ? segments : input.geometrie.segments,
      longueur: apport.dimensions ? Math.round(apport.dimensions.longueur * 100) / 100 : input.geometrie.longueur,
      largeur: apport.dimensions ? Math.round(apport.dimensions.largeur * 100) / 100 : input.geometrie.largeur,
    },
  }

  if (apport.poteaux && apport.poteaux > 0) {
    sortie.amorces = { ...input.amorces, nombre: apport.poteaux }
    sortie.semelleIsolee = { ...input.semelleIsolee, nombre: apport.poteaux }
    sortie.fouilles = { ...input.fouilles, puitsNombre: apport.poteaux }
  }

  if (apport.emprise && apport.emprise > 0) {
    sortie.dallage = { ...input.dallage, surface: Math.round(apport.emprise * 100) / 100 }
  }

  return sortie
}
