/**
 * Lecture d'un plan DXF (AutoCAD ASCII) pour en extraire le métré des fondations.
 *
 * Le DXF est une suite de couples (code de groupe, valeur). On ne cherche pas à
 * tout interpréter : seules les entités qui portent une longueur ou un comptage
 * nous intéressent, regroupées par calque. C'est le calque qui porte le sens
 * métier sur un plan de fondation (SEMELLES, LONGRINES, AXES, POTEAUX…).
 */

export type TypeEntite =
  | 'LINE'
  | 'LWPOLYLINE'
  | 'POLYLINE'
  | 'ARC'
  | 'CIRCLE'
  | 'SPLINE'
  | 'INSERT'
  | 'TEXT'

export interface EntiteDXF {
  type: TypeEntite
  calque: string
  /** Longueur développée en unités du dessin (0 pour les entités ponctuelles). */
  longueur: number
  /** Nom du bloc pour un INSERT, contenu textuel pour un TEXT / MTEXT. */
  valeur?: string
  x?: number
  y?: number
  /** Longueur obtenue par approximation (polygone de contrôle d'une spline). */
  approximatif?: boolean
}

export interface CalqueDXF {
  nom: string
  longueur: number
  entites: number
  inserts: number
  approximatif: boolean
}

export interface AnalyseDXF {
  /** Facteur de conversion vers le mètre, déduit de l'en-tête ($INSUNITS). */
  facteurMetre: number
  uniteDeclaree: string
  calques: CalqueDXF[]
  blocs: { nom: string; nombre: number }[]
  /** Emprise du dessin, en unités du dessin. */
  bbox: { xMin: number; yMin: number; xMax: number; yMax: number } | null
  textes: { valeur: string; calque: string }[]
  entites: number
  /** Calques qui ressemblent à des fondations, par ordre de longueur. */
  calquesSuggeres: string[]
  blocsSuggeres: string[]
}

/** $INSUNITS → facteur vers le mètre. */
const UNITES: Record<number, { facteur: number; nom: string }> = {
  0: { facteur: 1, nom: 'sans unité' },
  1: { facteur: 0.0254, nom: 'pouces' },
  2: { facteur: 0.3048, nom: 'pieds' },
  4: { facteur: 0.001, nom: 'millimètres' },
  5: { facteur: 0.01, nom: 'centimètres' },
  6: { facteur: 1, nom: 'mètres' },
  9: { facteur: 1e-6, nom: 'microns' },
  10: { facteur: 0.9144, nom: 'yards' },
  14: { facteur: 0.1, nom: 'décimètres' },
}

const MOTS_FONDATION = [
  'semelle',
  'fondation',
  'fond',
  'longrine',
  'refend',
  'chainage',
  'chaînage',
  'footing',
  'foundation',
  'massif',
  'radier',
  'axe',
  'mur',
  'wall',
]

const MOTS_POTEAU = ['poteau', 'colonne', 'column', 'pilier', 'amorce', 'pot']

const distance = (x1: number, y1: number, x2: number, y2: number) => Math.hypot(x2 - x1, y2 - y1)

/** Découpe le fichier en couples (code, valeur), fins de ligne mixtes tolérées. */
function couples(texte: string): { code: number; valeur: string }[] {
  const lignes = texte.split(/\r\n|\r|\n/)
  const sortie: { code: number; valeur: string }[] = []
  for (let i = 0; i + 1 < lignes.length; i += 2) {
    const code = Number(lignes[i].trim())
    if (!Number.isFinite(code)) continue
    sortie.push({ code, valeur: lignes[i + 1] })
  }
  return sortie
}

/** Longueur d'une suite de sommets, fermeture éventuelle comprise. */
function longueurSommets(sommets: [number, number][], ferme: boolean): number {
  let total = 0
  for (let i = 1; i < sommets.length; i++) {
    total += distance(sommets[i - 1][0], sommets[i - 1][1], sommets[i][0], sommets[i][1])
  }
  if (ferme && sommets.length > 2) {
    const a = sommets[sommets.length - 1]
    const b = sommets[0]
    total += distance(a[0], a[1], b[0], b[1])
  }
  return total
}

interface EnCours {
  type: string
  calque: string
  codes: Record<number, number[]>
  textes: string[]
  sommets: [number, number][]
  ferme: boolean
}

function neuf(type: string): EnCours {
  return { type: type, calque: '0', codes: {}, textes: [], sommets: [], ferme: false }
}

export function analyserDXF(contenu: string): AnalyseDXF {
  const paires = couples(contenu)
  const entites: EntiteDXF[] = []

  let section = ''
  let insunits = 0
  let bbox: AnalyseDXF['bbox'] = null
  let courant: EnCours = neuf('')
  /** Polyligne « ancienne génération » : ses sommets arrivent en entités VERTEX. */
  let polyligne: { calque: string; sommets: [number, number][]; ferme: boolean } | null = null

  function etendreBbox(x: number, y: number) {
    if (!Number.isFinite(x) || !Number.isFinite(y)) return
    if (!bbox) bbox = { xMin: x, yMin: y, xMax: x, yMax: y }
    else {
      if (x < bbox.xMin) bbox.xMin = x
      if (y < bbox.yMin) bbox.yMin = y
      if (x > bbox.xMax) bbox.xMax = x
      if (y > bbox.yMax) bbox.yMax = y
    }
  }

  function val(e: EnCours, code: number, index = 0): number {
    const liste = e.codes[code]
    return liste && liste.length > index ? liste[index] : NaN
  }

  function fermerPolyligne() {
    if (!polyligne) return
    if (polyligne.sommets.length > 1) {
      polyligne.sommets.forEach((s) => etendreBbox(s[0], s[1]))
      entites.push({
        type: 'POLYLINE',
        calque: polyligne.calque,
        longueur: longueurSommets(polyligne.sommets, polyligne.ferme),
      })
    }
    polyligne = null
  }

  function emettre(e: EnCours) {
    switch (e.type) {
      case 'VERTEX': {
        const x = val(e, 10)
        const y = val(e, 20)
        if (polyligne && Number.isFinite(x) && Number.isFinite(y)) polyligne.sommets.push([x, y])
        break
      }
      case 'LINE': {
        const x1 = val(e, 10)
        const y1 = val(e, 20)
        const x2 = val(e, 11)
        const y2 = val(e, 21)
        etendreBbox(x1, y1)
        etendreBbox(x2, y2)
        entites.push({ type: 'LINE', calque: e.calque, longueur: distance(x1, y1, x2, y2) || 0 })
        break
      }
      case 'LWPOLYLINE': {
        const sommets = e.sommets.filter((s) => Number.isFinite(s[0]) && Number.isFinite(s[1]))
        sommets.forEach((s) => etendreBbox(s[0], s[1]))
        entites.push({
          type: 'LWPOLYLINE',
          calque: e.calque,
          longueur: longueurSommets(sommets, e.ferme),
        })
        break
      }
      case 'SPLINE': {
        const sommets = e.sommets.filter((s) => Number.isFinite(s[0]) && Number.isFinite(s[1]))
        sommets.forEach((s) => etendreBbox(s[0], s[1]))
        entites.push({
          type: 'SPLINE',
          calque: e.calque,
          longueur: longueurSommets(sommets, false),
          approximatif: true,
        })
        break
      }
      case 'ARC': {
        const r = val(e, 40)
        let ouverture = val(e, 51) - val(e, 50)
        while (ouverture < 0) ouverture += 360
        etendreBbox(val(e, 10), val(e, 20))
        entites.push({
          type: 'ARC',
          calque: e.calque,
          longueur: Number.isFinite(r) ? (Math.PI / 180) * ouverture * r : 0,
        })
        break
      }
      case 'CIRCLE': {
        const r = val(e, 40)
        etendreBbox(val(e, 10), val(e, 20))
        entites.push({
          type: 'CIRCLE',
          calque: e.calque,
          longueur: Number.isFinite(r) ? 2 * Math.PI * r : 0,
        })
        break
      }
      case 'INSERT': {
        const x = val(e, 10)
        const y = val(e, 20)
        etendreBbox(x, y)
        entites.push({
          type: 'INSERT',
          calque: e.calque,
          longueur: 0,
          valeur: e.textes[0] || 'BLOC',
          x: x,
          y: y,
        })
        break
      }
      case 'TEXT':
      case 'MTEXT': {
        const texte = e.textes.join(' ').trim()
        if (texte) entites.push({ type: 'TEXT', calque: e.calque, longueur: 0, valeur: texte })
        break
      }
    }
  }

  for (let i = 0; i < paires.length; i++) {
    const { code, valeur } = paires[i]
    const brut = valeur.trim()

    if (code === 0) {
      emettre(courant)
      // Une polyligne se termine sur SEQEND, ou à défaut sur la première entité
      // qui n'est pas un de ses sommets.
      if (polyligne && brut !== 'VERTEX') fermerPolyligne()

      courant = neuf(brut)
      if (brut === 'SECTION') section = ''
      if (brut === 'POLYLINE') polyligne = { calque: '0', sommets: [], ferme: false }
      continue
    }

    if (courant.type === 'SECTION' && code === 2) {
      section = brut
      continue
    }

    if (section === 'HEADER' && code === 9 && brut === '$INSUNITS') {
      const suivant = paires[i + 1]
      if (suivant && suivant.code === 70) insunits = Number(suivant.valeur.trim()) || 0
      continue
    }

    if (code === 8) {
      courant.calque = brut || '0'
      if (polyligne && courant.type === 'POLYLINE') polyligne.calque = courant.calque
      continue
    }

    if (code === 1 || code === 2 || code === 3) {
      courant.textes.push(brut)
      continue
    }

    const nombre = Number(brut)
    if (!Number.isFinite(nombre)) continue

    if (!courant.codes[code]) courant.codes[code] = []
    courant.codes[code].push(nombre)

    if (courant.type === 'LWPOLYLINE' || courant.type === 'SPLINE') {
      if (code === 10) courant.sommets.push([nombre, NaN])
      else if (code === 20 && courant.sommets.length) {
        courant.sommets[courant.sommets.length - 1][1] = nombre
      }
    }
    if (code === 70) {
      if (courant.type === 'LWPOLYLINE') courant.ferme = (nombre & 1) === 1
      if (courant.type === 'POLYLINE' && polyligne) polyligne.ferme = (nombre & 1) === 1
    }
  }

  emettre(courant)
  fermerPolyligne()

  /* ----------------------------- agrégation ----------------------------- */

  const parCalque = new Map<string, CalqueDXF>()
  const parBloc = new Map<string, number>()
  const textes: { valeur: string; calque: string }[] = []

  for (const e of entites) {
    if (e.type === 'TEXT') {
      if (textes.length < 400) textes.push({ valeur: e.valeur || '', calque: e.calque })
      continue
    }
    const c = parCalque.get(e.calque) || {
      nom: e.calque,
      longueur: 0,
      entites: 0,
      inserts: 0,
      approximatif: false,
    }
    c.longueur += e.longueur
    c.entites += 1
    if (e.type === 'INSERT') {
      c.inserts += 1
      const nom = e.valeur || 'BLOC'
      parBloc.set(nom, (parBloc.get(nom) || 0) + 1)
    }
    if (e.approximatif) c.approximatif = true
    parCalque.set(e.calque, c)
  }

  const unite = UNITES[insunits] || UNITES[0]
  const calques = [...parCalque.values()].sort((a, b) => b.longueur - a.longueur)
  const blocs = [...parBloc.entries()]
    .map(([nom, nombre]) => ({ nom, nombre }))
    .sort((a, b) => b.nombre - a.nombre)

  const contient = (nom: string, mots: string[]) => {
    const n = nom.toLowerCase()
    return mots.some((m) => n.includes(m))
  }

  return {
    facteurMetre: unite.facteur,
    uniteDeclaree: unite.nom,
    calques,
    blocs,
    bbox,
    textes,
    entites: entites.length,
    calquesSuggeres: calques
      .filter((c) => c.longueur > 0 && contient(c.nom, MOTS_FONDATION))
      .map((c) => c.nom),
    blocsSuggeres: blocs.filter((b) => contient(b.nom, MOTS_POTEAU)).map((b) => b.nom),
  }
}

/**
 * Facteur vers le mètre quand l'en-tête ne déclare pas d'unité : on se fie à
 * l'ordre de grandeur du dessin, un bâtiment faisant quelques dizaines de mètres.
 */
export function facteurDeduit(analyse: AnalyseDXF): { facteur: number; unite: string } {
  if (analyse.facteurMetre !== 1 || !analyse.bbox) {
    return { facteur: analyse.facteurMetre, unite: analyse.uniteDeclaree }
  }
  const etendue = Math.max(
    analyse.bbox.xMax - analyse.bbox.xMin,
    analyse.bbox.yMax - analyse.bbox.yMin
  )
  if (etendue > 2000) return { facteur: 0.001, unite: 'millimètres (déduit)' }
  if (etendue > 200) return { facteur: 0.01, unite: 'centimètres (déduit)' }
  return { facteur: 1, unite: 'mètres (déduit)' }
}
