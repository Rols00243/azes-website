/**
 * Moteur de calcul du devis de fondations.
 *
 * Le calcul est une fonction pure : `calculerDevis(input)` renvoie le métré
 * (quantités) puis le devis (quantités × prix unitaires). Aucun accès au DOM,
 * ce qui permet de le tester et de le réutiliser côté serveur.
 */

import {
  DIAMETRES,
  GRAVIER_PAR_M3_BETON,
  LONGUEUR_BARRE_ACIER,
  LONGUEUR_CROCHET,
  MASSE_ACIER,
  POIDS_SAC_CIMENT,
  PRIX_KEYS,
  RATIO_EAU_CIMENT,
  SABLE_PAR_M3_BETON,
  SABLE_PAR_M3_MORTIER,
  prixKeyBarre,
  prixKeyCoude,
  prixKeyManchon,
  prixKeyPvc,
  prixKeyTe,
} from './constants'
import type {
  AcierDetail,
  AcierParDiametre,
  BetonElement,
  DevisInput,
  DevisResultat,
  Diametre,
  LigneDevis,
  Lot,
  Metre,
} from './types'

const num = (v: unknown): number => {
  const n = typeof v === 'number' ? v : Number(v)
  return Number.isFinite(n) && n > 0 ? n : 0
}
const r = (v: number, d = 2) => Math.round(v * 10 ** d) / 10 ** d
const ceil = (v: number) => (v > 0 ? Math.ceil(v - 1e-9) : 0)
/** Nombre destiné à un libellé : virgule décimale, entiers sans décimales. */
const fr = (v: number, d = 2) =>
  Number.isInteger(v)
    ? v.toLocaleString('fr-FR')
    : v.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d })

/** Linéaire total des fondations (ml). */
export function lineaireFondations(g: DevisInput['geometrie']): number {
  if (g.mode === 'detaille') {
    return g.segments.reduce((s, seg) => s + num(seg.longueur) * num(seg.nombre), 0)
  }
  return 2 * (num(g.longueur) + num(g.largeur)) + num(g.refends)
}

/** Composition d'un volume de béton pour un dosage donné. */
function composerBeton(nom: string, volume: number, dosage: number): BetonElement {
  const cimentKg = volume * dosage
  return {
    nom,
    volume,
    dosage,
    cimentKg,
    cimentSacs: cimentKg / POIDS_SAC_CIMENT,
    sable: volume * SABLE_PAR_M3_BETON,
    gravier: volume * GRAVIER_PAR_M3_BETON,
    eau: cimentKg * RATIO_EAU_CIMENT,
  }
}

/** Développé d'un cadre rectangulaire, crochets compris (m). */
function developpeCadre(largeur: number, hauteur: number, enrobage: number): number {
  const b = Math.max(0.05, largeur - 2 * enrobage)
  const h = Math.max(0.05, hauteur - 2 * enrobage)
  return 2 * (b + h) + 2 * LONGUEUR_CROCHET
}

/** Nombre de cadres répartis sur une longueur donnée. */
function nombreCadres(longueur: number, espacement: number): number {
  if (longueur <= 0) return 0
  const e = espacement > 0 ? espacement : 0.2
  return Math.floor(longueur / e) + 1
}

export function calculerDevis(input: DevisInput): DevisResultat {
  const {
    geometrie,
    fouilles,
    proprete,
    semelleFilante,
    semelleIsolee,
    longrine,
    amorces,
    armSemelle,
    armLongrine,
    armNappe,
    armAmorce,
    coffrage,
    maconnerie,
    dallage,
    plomberie,
    mainOeuvre,
    projet,
    prix,
  } = input

  const alertes: string[] = []
  const lineaire = lineaireFondations(geometrie)
  const emprise = geometrie.mode === 'simple' ? num(geometrie.longueur) * num(geometrie.largeur) : 0

  /* ─────────────────────────  1. Terrassement  ───────────────────────── */

  const volumeRigole = lineaire * num(fouilles.largeurRigole) * num(fouilles.profondeurRigole)
  const volumePuits = fouilles.puitsActif
    ? num(fouilles.puitsNombre) *
      num(fouilles.puitsLongueur) *
      num(fouilles.puitsLargeur) *
      num(fouilles.puitsProfondeur)
    : 0
  const volumeFouille = volumeRigole + volumePuits
  const remblai = (volumeFouille * Math.min(100, num(fouilles.remblaiPourcentage))) / 100
  const evacuation = fouilles.evacuation
    ? Math.max(0, volumeFouille - remblai) * (num(fouilles.foisonnement) || 1)
    : 0

  /* ────────────────────────────  2. Bétons  ──────────────────────────── */

  const betons: BetonElement[] = []

  const largeurAssise = semelleFilante.actif ? num(semelleFilante.largeur) : num(fouilles.largeurRigole)
  let surfaceProprete = 0
  if (proprete.actif) {
    if (semelleFilante.actif) surfaceProprete += lineaire * (largeurAssise + 2 * num(proprete.debord))
    if (semelleIsolee.actif) {
      surfaceProprete +=
        num(semelleIsolee.nombre) *
        (num(semelleIsolee.longueur) + 2 * num(proprete.debord)) *
        (num(semelleIsolee.largeur) + 2 * num(proprete.debord))
    }
    const v = surfaceProprete * num(proprete.epaisseur)
    if (v > 0) betons.push(composerBeton('Béton de propreté', v, num(proprete.dosage)))
  }

  const volSemelleFilante = semelleFilante.actif
    ? lineaire * num(semelleFilante.largeur) * num(semelleFilante.hauteur)
    : 0
  if (volSemelleFilante > 0) {
    betons.push(composerBeton('Semelle filante', volSemelleFilante, num(semelleFilante.dosage)))
  }

  const volSemelleIsolee = semelleIsolee.actif
    ? num(semelleIsolee.nombre) *
      num(semelleIsolee.longueur) *
      num(semelleIsolee.largeur) *
      num(semelleIsolee.hauteur)
    : 0
  if (volSemelleIsolee > 0) {
    betons.push(composerBeton('Semelles isolées', volSemelleIsolee, num(semelleIsolee.dosage)))
  }

  const volLongrine = longrine.actif ? lineaire * num(longrine.largeur) * num(longrine.hauteur) : 0
  if (volLongrine > 0) {
    betons.push(composerBeton('Longrine / chaînage bas', volLongrine, num(longrine.dosage)))
  }

  const volAmorces = amorces.actif
    ? num(amorces.nombre) * num(amorces.largeur) * num(amorces.epaisseur) * num(amorces.hauteur)
    : 0
  if (volAmorces > 0) {
    betons.push(composerBeton('Amorces de poteaux', volAmorces, num(amorces.dosage)))
  }

  const volArase =
    maconnerie.actif && maconnerie.arase
      ? lineaire * num(maconnerie.blocEpaisseur) * num(maconnerie.araseHauteur)
      : 0
  if (volArase > 0) {
    betons.push(composerBeton("Chaînage d'arase", volArase, num(maconnerie.araseDosage)))
  }

  const surfaceDallage = dallage.actif ? num(dallage.surface) : 0
  const volDallage = surfaceDallage * num(dallage.dallageEpaisseur)
  if (volDallage > 0) {
    betons.push(composerBeton('Dallage', volDallage, num(dallage.dallageDosage)))
  }

  const totauxBeton = betons.reduce(
    (acc, b) => ({
      volume: acc.volume + b.volume,
      cimentKg: acc.cimentKg + b.cimentKg,
      cimentSacs: acc.cimentSacs + b.cimentSacs,
      sable: acc.sable + b.sable,
      gravier: acc.gravier + b.gravier,
      eau: acc.eau + b.eau,
    }),
    { volume: 0, cimentKg: 0, cimentSacs: 0, sable: 0, gravier: 0, eau: 0 }
  )

  /* ───────────────────────────  3. Armatures  ─────────────────────────── */

  const detailAcier: AcierDetail[] = []
  const pousserAcier = (element: string, designation: string, diametre: Diametre, ml: number) => {
    if (ml <= 0) return
    detailAcier.push({ element, designation, diametre, ml, kg: ml * MASSE_ACIER[diametre] })
  }

  // Semelle filante
  if (semelleFilante.actif && armSemelle.actif && lineaire > 0) {
    const maj = 1 + num(armSemelle.recouvrement) / 100
    pousserAcier(
      'Semelle filante',
      `Aciers longitudinaux — ${armSemelle.nombreBarres} HA${armSemelle.diametreLong}`,
      armSemelle.diametreLong,
      num(armSemelle.nombreBarres) * lineaire * maj
    )
    const nb = nombreCadres(lineaire, num(armSemelle.espacementCadre))
    const dev = developpeCadre(
      num(semelleFilante.largeur),
      num(semelleFilante.hauteur),
      num(armSemelle.enrobage)
    )
    pousserAcier(
      'Semelle filante',
      `Cadres HA${armSemelle.diametreCadre} — ${nb} u. tous les ${fr(Math.round(num(armSemelle.espacementCadre) * 100))} cm`,
      armSemelle.diametreCadre,
      nb * dev * maj
    )
  }

  // Semelles isolées — nappe croisée
  if (semelleIsolee.actif && armNappe.actif) {
    const maj = 1 + num(armNappe.recouvrement) / 100
    const L = num(semelleIsolee.longueur)
    const l = num(semelleIsolee.largeur)
    const c = num(armNappe.enrobage)
    const e = num(armNappe.espacement) || 0.15
    const nX = Math.floor(Math.max(0, l - 2 * c) / e) + 1
    const nY = Math.floor(Math.max(0, L - 2 * c) / e) + 1
    const lgX = Math.max(0, L - 2 * c) + 2 * LONGUEUR_CROCHET
    const lgY = Math.max(0, l - 2 * c) + 2 * LONGUEUR_CROCHET
    const nappes = armNappe.doubleNappe ? 2 : 1
    const ml = num(semelleIsolee.nombre) * nappes * (nX * lgX + nY * lgY) * maj
    pousserAcier(
      'Semelles isolées',
      `Nappe${nappes > 1 ? 's' : ''} HA${armNappe.diametre} — ${nX}×${nY} barres par semelle`,
      armNappe.diametre,
      ml
    )
  }

  // Longrine
  if (longrine.actif && armLongrine.actif && lineaire > 0) {
    const maj = 1 + num(armLongrine.recouvrement) / 100
    pousserAcier(
      'Longrine',
      `Aciers longitudinaux — ${armLongrine.nombreBarres} HA${armLongrine.diametreLong}`,
      armLongrine.diametreLong,
      num(armLongrine.nombreBarres) * lineaire * maj
    )
    const nb = nombreCadres(lineaire, num(armLongrine.espacementCadre))
    const dev = developpeCadre(num(longrine.largeur), num(longrine.hauteur), num(armLongrine.enrobage))
    pousserAcier(
      'Longrine',
      `Cadres HA${armLongrine.diametreCadre} — ${nb} u. tous les ${fr(Math.round(num(armLongrine.espacementCadre) * 100))} cm`,
      armLongrine.diametreCadre,
      nb * dev * maj
    )
  }

  // Amorces de poteaux (avec longueur d'attente)
  if (amorces.actif && armAmorce.actif) {
    const maj = 1 + num(armAmorce.recouvrement) / 100
    const n = num(amorces.nombre)
    const hauteurBarre = num(amorces.hauteur) + num(armAmorce.longueurAttente)
    pousserAcier(
      'Amorces de poteaux',
      `Attentes verticales — ${armAmorce.nombreBarres} HA${armAmorce.diametreLong} × ${fr(hauteurBarre)} m`,
      armAmorce.diametreLong,
      n * num(armAmorce.nombreBarres) * hauteurBarre * maj
    )
    const nb = nombreCadres(num(amorces.hauteur), num(armAmorce.espacementCadre))
    const dev = developpeCadre(num(amorces.largeur), num(amorces.epaisseur), num(armAmorce.enrobage))
    pousserAcier(
      'Amorces de poteaux',
      `Cadres HA${armAmorce.diametreCadre} — ${nb} u. par amorce`,
      armAmorce.diametreCadre,
      n * nb * dev * maj
    )
  }

  const parDiametre: AcierParDiametre[] = DIAMETRES.map((d) => {
    const ml = detailAcier.filter((a) => a.diametre === d).reduce((s, a) => s + a.ml, 0)
    return { diametre: d, ml, kg: ml * MASSE_ACIER[d], barres: ceil(ml / LONGUEUR_BARRE_ACIER) }
  }).filter((a) => a.ml > 0)

  const totalAcierKg = parDiametre.reduce((s, a) => s + a.kg, 0)
  const filAttacheKg = (totalAcierKg / 1000) * num(coffrage.filAttacheKgParTonne)

  /* ───────────────────────────  4. Coffrage  ──────────────────────────── */

  let surfaceCoffrage = 0
  if (coffrage.actif) {
    if (semelleFilante.actif && semelleFilante.coffree) {
      surfaceCoffrage += 2 * num(semelleFilante.hauteur) * lineaire
    }
    if (semelleIsolee.actif && semelleIsolee.coffree) {
      surfaceCoffrage +=
        num(semelleIsolee.nombre) *
        2 *
        (num(semelleIsolee.longueur) + num(semelleIsolee.largeur)) *
        num(semelleIsolee.hauteur)
    }
    if (longrine.actif && longrine.coffree) {
      surfaceCoffrage += 2 * num(longrine.hauteur) * lineaire
    }
    if (amorces.actif && amorces.coffree) {
      surfaceCoffrage +=
        num(amorces.nombre) * 2 * (num(amorces.largeur) + num(amorces.epaisseur)) * num(amorces.hauteur)
    }
  }

  const reemplois = Math.max(1, num(coffrage.reutilisations) || 1)
  const airePanneau =
    coffrage.type === 'planches'
      ? num(coffrage.plancheLongueur) * num(coffrage.plancheLargeur)
      : num(coffrage.contreplaqueLongueur) * num(coffrage.contreplaqueLargeur)
  const surfaceAAcheter = (surfaceCoffrage * (1 + num(coffrage.chutes) / 100)) / reemplois
  const panneaux = airePanneau > 0 ? ceil(surfaceAAcheter / airePanneau) : 0
  const chevronsMl = (surfaceCoffrage * num(coffrage.chevronsMlParM2)) / reemplois
  const chevrons = num(coffrage.chevronLongueur) > 0 ? ceil(chevronsMl / num(coffrage.chevronLongueur)) : 0
  const clousKg = surfaceCoffrage * num(coffrage.clousKgParM2)
  const panneauLabel =
    coffrage.type === 'planches'
      ? `Planches ${fr(num(coffrage.plancheLongueur))} m × ${fr(Math.round(num(coffrage.plancheLargeur) * 100))} cm`
      : `Contreplaqué ${fr(num(coffrage.contreplaqueLongueur))} × ${fr(num(coffrage.contreplaqueLargeur))} m`

  /* ──────────────────────────  5. Maçonnerie  ─────────────────────────── */

  const surfaceMaconnerie = maconnerie.actif ? lineaire * num(maconnerie.hauteur) : 0
  const aireBlocPose =
    (num(maconnerie.blocLongueur) + num(maconnerie.joint)) *
    (num(maconnerie.blocHauteur) + num(maconnerie.joint))
  const blocs =
    aireBlocPose > 0
      ? ceil((surfaceMaconnerie / aireBlocPose) * (1 + num(maconnerie.pertes) / 100))
      : 0
  const mortierVolume = surfaceMaconnerie * num(maconnerie.mortierParM2)
  const mortierCimentKg = mortierVolume * num(maconnerie.dosageMortier)
  const mortierSable = mortierVolume * SABLE_PAR_M3_MORTIER

  /* ────────────────────────────  6. Dallage  ─────────────────────────── */

  const herisson = surfaceDallage * num(dallage.herissonEpaisseur)
  const sableDallage = surfaceDallage * num(dallage.sableEpaisseur)
  const polyane = dallage.actif && dallage.polyane ? surfaceDallage * 1.1 : 0
  const airePanneauTS = num(dallage.treillisPanneauLongueur) * num(dallage.treillisPanneauLargeur)
  const treillisPanneaux =
    dallage.actif && dallage.treillis && airePanneauTS > 0
      ? ceil((surfaceDallage * (1 + num(dallage.treillisRecouvrement) / 100)) / airePanneauTS)
      : 0

  /* ───────────────────────────  7. Plomberie  ─────────────────────────── */

  const lignesPlomberie = plomberie.actif
    ? plomberie.lignes.map((l) => {
        const lgBarre = num(l.longueurBarre) || 6
        return {
          designation: l.designation || `Tuyau PVC Ø${l.diametre}`,
          diametre: l.diametre,
          longueur: num(l.longueur),
          barres: ceil((num(l.longueur) * (1 + num(plomberie.chutes) / 100)) / lgBarre),
          coudes: num(l.coudes),
          tes: num(l.tes),
          manchons: num(l.manchons),
        }
      })
    : []

  const totalJoints = lignesPlomberie.reduce(
    (s, l) => s + l.coudes + l.tes + l.manchons + l.barres,
    0
  )
  const collePots = plomberie.actif
    ? ceil(totalJoints / (num(plomberie.joinsParPot) || 25))
    : 0
  const totalMlPlomberie = lignesPlomberie.reduce((s, l) => s + l.longueur, 0)

  const metre: Metre = {
    lineaireTotal: lineaire,
    empriseSol: emprise,
    fouilles: {
      volumeRigole,
      volumePuits,
      volumeTotal: volumeFouille,
      remblai,
      evacuation,
    },
    betons,
    totauxBeton,
    acier: { detail: detailAcier, parDiametre, totalKg: totalAcierKg, filAttacheKg },
    coffrage: {
      surface: surfaceCoffrage,
      panneaux,
      panneauLabel,
      chevrons,
      chevronsMl,
      clousKg,
    },
    maconnerie: {
      surface: surfaceMaconnerie,
      blocs,
      mortierVolume,
      cimentSacs: mortierCimentKg / POIDS_SAC_CIMENT,
      sable: mortierSable,
    },
    dallage: {
      surface: surfaceDallage,
      herisson,
      sable: sableDallage,
      polyane,
      betonVolume: volDallage,
      treillisPanneaux,
    },
    plomberie: { lignes: lignesPlomberie, collePots, fourreaux: plomberie.actif ? num(plomberie.fourreaux) : 0 },
  }

  /* ────────────────────────────  8. Devis  ───────────────────────────── */

  const lignes: LigneDevis[] = []
  let compteur = 0
  const ajouter = (
    lot: Lot,
    designation: string,
    unite: string,
    quantite: number,
    prixKey: string
  ) => {
    if (quantite <= 0) return
    const pu = num(prix[prixKey])
    lignes.push({
      id: `l-${++compteur}`,
      lot,
      designation,
      unite,
      quantite: r(quantite, 2),
      pu,
      montant: r(quantite, 2) * pu,
      prixKey,
    })
  }

  // Terrassement
  ajouter('Terrassement', 'Évacuation des terres excédentaires (foisonnées)', 'm³', evacuation, PRIX_KEYS.evacuation)

  // Béton & agrégats — ciment, sable et gravier consolidés (bétons + mortier)
  const cimentSacsTotal = ceil(totauxBeton.cimentSacs + mortierCimentKg / POIDS_SAC_CIMENT)
  const sableTotal = totauxBeton.sable + mortierSable + sableDallage
  ajouter('Béton & agrégats', 'Ciment CPJ 42,5 — tous bétons et mortiers', 'sac 50 kg', cimentSacsTotal, PRIX_KEYS.ciment)
  ajouter('Béton & agrégats', 'Sable — bétons, mortiers et lit de sable', 'm³', sableTotal, PRIX_KEYS.sable)
  ajouter('Béton & agrégats', 'Gravier / caillasse', 'm³', totauxBeton.gravier, PRIX_KEYS.gravier)

  // Acier
  for (const a of parDiametre) {
    ajouter(
      'Acier & ferraillage',
      `Acier HA ${a.diametre} — barre de ${LONGUEUR_BARRE_ACIER} m (${fr(Math.round(a.kg))} kg)`,
      'barre',
      a.barres,
      prixKeyBarre(a.diametre)
    )
  }
  ajouter('Acier & ferraillage', "Fil d'attache recuit", 'kg', ceil(filAttacheKg), PRIX_KEYS.filAttache)

  // Coffrage
  if (coffrage.actif && surfaceCoffrage > 0) {
    ajouter(
      'Coffrage',
      `${panneauLabel} — ${reemplois} réemploi${reemplois > 1 ? 's' : ''}`,
      coffrage.type === 'planches' ? 'pièce' : 'panneau',
      panneaux,
      coffrage.type === 'planches' ? PRIX_KEYS.planche : PRIX_KEYS.contreplaque
    )
    ajouter(
      'Coffrage',
      `Chevrons de raidissement (${fr(chevronsMl)} ml)`,
      'pièce',
      chevrons,
      PRIX_KEYS.chevron
    )
    ajouter('Coffrage', 'Clous', 'kg', ceil(clousKg), PRIX_KEYS.clous)
  }

  // Maçonnerie
  ajouter(
    'Maçonnerie',
    `Blocs ${fr(Math.round(num(maconnerie.blocLongueur) * 100))}×${fr(Math.round(num(maconnerie.blocHauteur) * 100))}×${fr(Math.round(num(maconnerie.blocEpaisseur) * 100))} cm — soubassement`,
    'pièce',
    blocs,
    PRIX_KEYS.bloc
  )

  // Dallage
  ajouter('Dallage', 'Moellons pour hérisson', 'm³', herisson, PRIX_KEYS.moellons)
  ajouter('Dallage', 'Film polyane 200 µm', 'm²', polyane, PRIX_KEYS.polyane)
  ajouter('Dallage', 'Treillis soudé', 'panneau', treillisPanneaux, PRIX_KEYS.treillis)

  // Plomberie
  for (const l of lignesPlomberie) {
    ajouter(
      'Plomberie',
      `${l.designation} — tuyau PVC Ø${l.diametre} (${fr(l.longueur)} ml)`,
      'barre',
      l.barres,
      prixKeyPvc(l.diametre)
    )
    ajouter('Plomberie', `Coudes PVC Ø${l.diametre}`, 'pièce', l.coudes, prixKeyCoude(l.diametre))
    ajouter('Plomberie', `Tés PVC Ø${l.diametre}`, 'pièce', l.tes, prixKeyTe(l.diametre))
    ajouter('Plomberie', `Manchons PVC Ø${l.diametre}`, 'pièce', l.manchons, prixKeyManchon(l.diametre))
  }
  ajouter('Plomberie', 'Colle PVC', 'pot', collePots, PRIX_KEYS.colle)
  ajouter('Plomberie', 'Fourreaux et réservations', 'pièce', metre.plomberie.fourreaux, PRIX_KEYS.fourreau)

  // Main d'œuvre
  if (mainOeuvre.actif) {
    ajouter("Main d'œuvre", 'Fouilles en rigole et en puits', 'm³', volumeFouille, PRIX_KEYS.moFouille)
    ajouter("Main d'œuvre", 'Remblai et compactage', 'm³', remblai, PRIX_KEYS.moRemblai)
    ajouter("Main d'œuvre", 'Fabrication et mise en œuvre du béton', 'm³', totauxBeton.volume, PRIX_KEYS.moBeton)
    ajouter("Main d'œuvre", 'Façonnage et pose des armatures', 'kg', totalAcierKg, PRIX_KEYS.moAcier)
    ajouter("Main d'œuvre", 'Pose et dépose du coffrage', 'm²', surfaceCoffrage, PRIX_KEYS.moCoffrage)
    ajouter("Main d'œuvre", 'Maçonnerie de soubassement', 'm²', surfaceMaconnerie, PRIX_KEYS.moMaconnerie)
    ajouter("Main d'œuvre", 'Pose des attentes de plomberie', 'ml', totalMlPlomberie, PRIX_KEYS.moPlomberie)
  }

  const ordreLots: Lot[] = [
    'Terrassement',
    'Béton & agrégats',
    'Acier & ferraillage',
    'Coffrage',
    'Maçonnerie',
    'Dallage',
    'Plomberie',
    "Main d'œuvre",
  ]
  const lots = ordreLots
    .map((lot) => ({
      lot,
      montant: lignes.filter((l) => l.lot === lot).reduce((s, l) => s + l.montant, 0),
    }))
    .filter((l) => l.montant > 0)

  const sousTotal = lignes.reduce((s, l) => s + l.montant, 0)
  const montantAleas = (sousTotal * num(projet.aleas)) / 100
  const montantMarge = ((sousTotal + montantAleas) * num(projet.marge)) / 100
  const totalHT = sousTotal + montantAleas + montantMarge
  const montantTVA = (totalHT * num(projet.tva)) / 100
  const totalTTC = totalHT + montantTVA

  /* ──────────────────────  9. Contrôles de cohérence  ─────────────────── */

  if (lineaire <= 0) {
    alertes.push("Le linéaire de fondation est nul : renseignez les dimensions du bâtiment ou les tronçons.")
  }
  if (semelleFilante.actif && num(semelleFilante.largeur) > num(fouilles.largeurRigole)) {
    alertes.push(
      `La semelle (${fr(num(semelleFilante.largeur))} m) est plus large que la fouille (${fr(num(fouilles.largeurRigole))} m) : élargissez la rigole.`
    )
  }
  const hauteurEnterree =
    (proprete.actif ? num(proprete.epaisseur) : 0) +
    (semelleFilante.actif ? num(semelleFilante.hauteur) : 0) +
    (longrine.actif ? num(longrine.hauteur) : 0)
  if (hauteurEnterree > num(fouilles.profondeurRigole)) {
    alertes.push(
      `La hauteur cumulée propreté + semelle + longrine (${fr(r(hauteurEnterree, 2))} m) dépasse la profondeur de fouille (${fr(num(fouilles.profondeurRigole))} m).`
    )
  }
  if (semelleIsolee.actif && !fouilles.puitsActif) {
    alertes.push("Des semelles isolées sont prévues mais aucune fouille en puits n'est activée.")
  }
  if (amorces.actif && maconnerie.actif && num(amorces.hauteur) < num(maconnerie.hauteur)) {
    alertes.push(
      "Les amorces de poteaux sont plus basses que le soubassement : vérifiez la hauteur d'arase."
    )
  }
  const sansPrix = lignes.filter((l) => l.pu <= 0)
  if (sansPrix.length > 0) {
    alertes.push(
      `${sansPrix.length} ligne${sansPrix.length > 1 ? 's' : ''} sans prix unitaire : le total est sous-estimé.`
    )
  }

  return { metre, lignes, totaux: { lots, sousTotal, montantAleas, montantMarge, totalHT, montantTVA, totalTTC }, alertes }
}
