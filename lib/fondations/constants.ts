/**
 * Constantes techniques et valeurs par défaut du module « Devis Fondations ».
 * Références : pratiques courantes de métré du bâtiment (RDC / zone CEMAC-SADC).
 */

import type { Devise, Diametre, DevisInput, PrixMap } from './types'

/** Masse linéique des aciers HA / ronds lisses (kg/ml). */
export const MASSE_ACIER: Record<Diametre, number> = {
  6: 0.222,
  8: 0.395,
  10: 0.617,
  12: 0.888,
  14: 1.208,
  16: 1.578,
  20: 2.466,
  25: 3.853,
}

export const DIAMETRES: Diametre[] = [6, 8, 10, 12, 14, 16, 20, 25]

/** Longueur commerciale d'une barre d'acier (m). */
export const LONGUEUR_BARRE_ACIER = 12

/** Retour de crochet d'un cadre, par extrémité (m). */
export const LONGUEUR_CROCHET = 0.1

/** Dosages de béton courants (kg de ciment par m³). */
export const DOSAGES = [150, 200, 250, 300, 350, 400] as const

/**
 * Composition d'un m³ de béton, quel que soit le dosage :
 * sable 400 L, gravier 800 L, eau ≈ 50 % du poids de ciment.
 */
export const SABLE_PAR_M3_BETON = 0.4
export const GRAVIER_PAR_M3_BETON = 0.8
export const RATIO_EAU_CIMENT = 0.5

/** Sable nécessaire pour 1 m³ de mortier. */
export const SABLE_PAR_M3_MORTIER = 1.0

/** Poids d'un sac de ciment (kg). */
export const POIDS_SAC_CIMENT = 50

/** Diamètres PVC d'attente courants (mm). */
export const DIAMETRES_PVC = [32, 40, 50, 63, 75, 90, 110, 125, 160]

export const DEVISES: { code: Devise; symbole: string; label: string }[] = [
  { code: 'USD', symbole: '$', label: 'Dollar américain' },
  { code: 'CDF', symbole: 'FC', label: 'Franc congolais' },
  { code: 'EUR', symbole: '€', label: 'Euro' },
]

/* ──────────────────────────  Prix unitaires  ────────────────────────── */

export const PRIX_KEYS = {
  ciment: 'ciment',
  sable: 'sable',
  gravier: 'gravier',
  moellons: 'moellons',
  filAttache: 'fil_attache',
  planche: 'planche',
  contreplaque: 'contreplaque',
  chevron: 'chevron',
  clous: 'clous',
  bloc: 'bloc',
  treillis: 'treillis',
  polyane: 'polyane',
  colle: 'colle_pvc',
  fourreau: 'fourreau',
  evacuation: 'evacuation_terre',
  moFouille: 'mo_fouille',
  moRemblai: 'mo_remblai',
  moBeton: 'mo_beton',
  moAcier: 'mo_acier',
  moCoffrage: 'mo_coffrage',
  moMaconnerie: 'mo_maconnerie',
  moPlomberie: 'mo_plomberie',
} as const

export const prixKeyBarre = (d: Diametre) => `barre_${d}`
export const prixKeyPvc = (d: number) => `pvc_${d}`
export const prixKeyCoude = (d: number) => `coude_${d}`
export const prixKeyTe = (d: number) => `te_${d}`
export const prixKeyManchon = (d: number) => `manchon_${d}`

/** Libellés lisibles pour l'écran « Prix unitaires ». */
export const LIBELLES_PRIX: Record<string, { label: string; unite: string; groupe: string }> = {
  [PRIX_KEYS.ciment]: { label: 'Ciment CPJ 42,5', unite: 'sac 50 kg', groupe: 'Béton & agrégats' },
  [PRIX_KEYS.sable]: { label: 'Sable de rivière', unite: 'm³', groupe: 'Béton & agrégats' },
  [PRIX_KEYS.gravier]: { label: 'Gravier / caillasse 5-25', unite: 'm³', groupe: 'Béton & agrégats' },
  [PRIX_KEYS.moellons]: { label: 'Moellons (hérisson)', unite: 'm³', groupe: 'Béton & agrégats' },
  [PRIX_KEYS.filAttache]: { label: "Fil d'attache recuit", unite: 'kg', groupe: 'Acier & ferraillage' },
  [PRIX_KEYS.planche]: { label: 'Planche de coffrage', unite: 'pièce', groupe: 'Coffrage' },
  [PRIX_KEYS.contreplaque]: { label: 'Contreplaqué de coffrage', unite: 'panneau', groupe: 'Coffrage' },
  [PRIX_KEYS.chevron]: { label: 'Chevron / bastaing', unite: 'pièce', groupe: 'Coffrage' },
  [PRIX_KEYS.clous]: { label: 'Clous', unite: 'kg', groupe: 'Coffrage' },
  [PRIX_KEYS.bloc]: { label: 'Bloc / parpaing', unite: 'pièce', groupe: 'Maçonnerie' },
  [PRIX_KEYS.treillis]: { label: 'Treillis soudé', unite: 'panneau', groupe: 'Dallage' },
  [PRIX_KEYS.polyane]: { label: 'Film polyane 200 µm', unite: 'm²', groupe: 'Dallage' },
  [PRIX_KEYS.colle]: { label: 'Colle PVC', unite: 'pot', groupe: 'Plomberie' },
  [PRIX_KEYS.fourreau]: { label: 'Fourreau / réservation', unite: 'pièce', groupe: 'Plomberie' },
  [PRIX_KEYS.evacuation]: { label: 'Évacuation des terres', unite: 'm³', groupe: 'Terrassement' },
  [PRIX_KEYS.moFouille]: { label: 'Fouille manuelle', unite: 'm³', groupe: "Main d'œuvre" },
  [PRIX_KEYS.moRemblai]: { label: 'Remblai compacté', unite: 'm³', groupe: "Main d'œuvre" },
  [PRIX_KEYS.moBeton]: { label: 'Béton (fabrication + mise en œuvre)', unite: 'm³', groupe: "Main d'œuvre" },
  [PRIX_KEYS.moAcier]: { label: 'Façonnage et pose des aciers', unite: 'kg', groupe: "Main d'œuvre" },
  [PRIX_KEYS.moCoffrage]: { label: 'Pose et dépose du coffrage', unite: 'm²', groupe: "Main d'œuvre" },
  [PRIX_KEYS.moMaconnerie]: { label: 'Maçonnerie de soubassement', unite: 'm²', groupe: "Main d'œuvre" },
  [PRIX_KEYS.moPlomberie]: { label: 'Pose des attentes plomberie', unite: 'ml', groupe: "Main d'œuvre" },
}

/**
 * Prix indicatifs en USD, marché de Kinshasa/Lubumbashi.
 * À ajuster systématiquement par l'utilisateur avant édition du devis.
 */
export const PRIX_DEFAUT_USD: PrixMap = {
  [PRIX_KEYS.ciment]: 16,
  [PRIX_KEYS.sable]: 25,
  [PRIX_KEYS.gravier]: 35,
  [PRIX_KEYS.moellons]: 30,
  [PRIX_KEYS.filAttache]: 3,
  [PRIX_KEYS.planche]: 5,
  [PRIX_KEYS.contreplaque]: 22,
  [PRIX_KEYS.chevron]: 7,
  [PRIX_KEYS.clous]: 3,
  [PRIX_KEYS.bloc]: 0.8,
  [PRIX_KEYS.treillis]: 45,
  [PRIX_KEYS.polyane]: 1.5,
  [PRIX_KEYS.colle]: 8,
  [PRIX_KEYS.fourreau]: 4,
  [PRIX_KEYS.evacuation]: 8,
  [PRIX_KEYS.moFouille]: 10,
  [PRIX_KEYS.moRemblai]: 5,
  [PRIX_KEYS.moBeton]: 25,
  [PRIX_KEYS.moAcier]: 0.5,
  [PRIX_KEYS.moCoffrage]: 8,
  [PRIX_KEYS.moMaconnerie]: 7,
  [PRIX_KEYS.moPlomberie]: 3,
  // Barres de 12 m
  barre_6: 5,
  barre_8: 8,
  barre_10: 12,
  barre_12: 17,
  barre_14: 23,
  barre_16: 30,
  barre_20: 47,
  barre_25: 73,
  // Tuyauterie PVC (barre de 6 m) et raccords
  pvc_32: 6,
  pvc_40: 7,
  pvc_50: 9,
  pvc_63: 12,
  pvc_75: 15,
  pvc_90: 19,
  pvc_110: 24,
  pvc_125: 31,
  pvc_160: 48,
  coude_32: 1,
  coude_40: 1.2,
  coude_50: 1.5,
  coude_63: 2,
  coude_75: 2.5,
  coude_90: 3.5,
  coude_110: 4.5,
  coude_125: 6,
  coude_160: 9,
  te_32: 1.5,
  te_40: 1.8,
  te_50: 2.2,
  te_63: 3,
  te_75: 3.8,
  te_90: 5,
  te_110: 6.5,
  te_125: 8.5,
  te_160: 13,
  manchon_32: 0.8,
  manchon_40: 1,
  manchon_50: 1.2,
  manchon_63: 1.6,
  manchon_75: 2,
  manchon_90: 2.8,
  manchon_110: 3.5,
  manchon_125: 4.5,
  manchon_160: 7,
}

/** Taux de conversion indicatifs utilisés pour recharger la grille de prix. */
export const TAUX_DEVISE: Record<Devise, number> = {
  USD: 1,
  CDF: 2800,
  EUR: 0.92,
}

export function prixDefaut(devise: Devise): PrixMap {
  const taux = TAUX_DEVISE[devise]
  const out: PrixMap = {}
  for (const [k, v] of Object.entries(PRIX_DEFAUT_USD)) {
    // arrondi lisible : au franc près en CDF, au centime près sinon
    out[k] = devise === 'CDF' ? Math.round(v * taux) : Math.round(v * taux * 100) / 100
  }
  return out
}

/* ────────────────────────  Saisie par défaut  ──────────────────────── */

export function inputParDefaut(): DevisInput {
  return {
    projet: {
      nom: 'Fondations — villa R+0',
      client: '',
      localisation: '',
      reference: '',
      date: new Date().toISOString().slice(0, 10),
      devise: 'USD',
      tva: 16,
      marge: 10,
      aleas: 5,
    },
    geometrie: {
      mode: 'simple',
      longueur: 12,
      largeur: 9,
      refends: 12,
      segments: [
        { id: 'seg-1', nom: 'Façade avant', longueur: 12, nombre: 1 },
        { id: 'seg-2', nom: 'Façade arrière', longueur: 12, nombre: 1 },
        { id: 'seg-3', nom: 'Pignons', longueur: 9, nombre: 2 },
        { id: 'seg-4', nom: 'Refends', longueur: 12, nombre: 1 },
      ],
    },
    fouilles: {
      largeurRigole: 0.6,
      profondeurRigole: 0.8,
      puitsActif: false,
      puitsNombre: 12,
      puitsLongueur: 1,
      puitsLargeur: 1,
      puitsProfondeur: 1.2,
      foisonnement: 1.25,
      remblaiPourcentage: 50,
      evacuation: true,
    },
    proprete: { actif: true, epaisseur: 0.05, debord: 0.05, dosage: 150 },
    semelleFilante: { actif: true, largeur: 0.6, hauteur: 0.25, dosage: 350, coffree: false },
    semelleIsolee: {
      actif: false,
      nombre: 12,
      longueur: 1,
      largeur: 1,
      hauteur: 0.3,
      dosage: 350,
      coffree: true,
    },
    longrine: { actif: true, largeur: 0.2, hauteur: 0.3, dosage: 350, coffree: true },
    amorces: {
      actif: true,
      nombre: 12,
      largeur: 0.2,
      epaisseur: 0.2,
      hauteur: 0.8,
      dosage: 350,
      coffree: true,
    },
    armSemelle: {
      actif: true,
      diametreLong: 12,
      nombreBarres: 4,
      diametreCadre: 8,
      espacementCadre: 0.2,
      enrobage: 0.03,
      recouvrement: 8,
    },
    armLongrine: {
      actif: true,
      diametreLong: 12,
      nombreBarres: 4,
      diametreCadre: 8,
      espacementCadre: 0.15,
      enrobage: 0.03,
      recouvrement: 8,
    },
    armNappe: {
      actif: false,
      diametre: 12,
      espacement: 0.15,
      enrobage: 0.04,
      doubleNappe: false,
      recouvrement: 8,
    },
    armAmorce: {
      actif: true,
      diametreLong: 12,
      nombreBarres: 4,
      diametreCadre: 8,
      espacementCadre: 0.15,
      enrobage: 0.03,
      longueurAttente: 0.6,
      recouvrement: 8,
    },
    coffrage: {
      actif: true,
      type: 'planches',
      plancheLongueur: 4,
      plancheLargeur: 0.3,
      contreplaqueLongueur: 2.44,
      contreplaqueLargeur: 1.22,
      reutilisations: 3,
      chutes: 10,
      chevronsMlParM2: 1.2,
      chevronLongueur: 4,
      clousKgParM2: 0.25,
      filAttacheKgParTonne: 12,
    },
    maconnerie: {
      actif: true,
      hauteur: 0.6,
      blocLongueur: 0.4,
      blocHauteur: 0.2,
      blocEpaisseur: 0.2,
      joint: 0.015,
      pertes: 5,
      dosageMortier: 300,
      mortierParM2: 0.022,
      arase: true,
      araseHauteur: 0.15,
      araseDosage: 350,
    },
    dallage: {
      actif: false,
      surface: 108,
      herissonEpaisseur: 0.15,
      sableEpaisseur: 0.05,
      polyane: true,
      dallageEpaisseur: 0.1,
      dallageDosage: 300,
      treillis: true,
      treillisPanneauLongueur: 6,
      treillisPanneauLargeur: 2.4,
      treillisRecouvrement: 10,
    },
    plomberie: {
      actif: true,
      lignes: [
        {
          id: 'pl-1',
          designation: 'Attente eaux-vannes WC',
          diametre: 110,
          longueur: 18,
          longueurBarre: 6,
          coudes: 6,
          tes: 2,
          manchons: 3,
        },
        {
          id: 'pl-2',
          designation: 'Attente eaux usées (douche, cuisine)',
          diametre: 63,
          longueur: 22,
          longueurBarre: 6,
          coudes: 8,
          tes: 3,
          manchons: 4,
        },
        {
          id: 'pl-3',
          designation: 'Alimentation eau potable',
          diametre: 32,
          longueur: 25,
          longueurBarre: 6,
          coudes: 10,
          tes: 4,
          manchons: 5,
        },
      ],
      chutes: 10,
      joinsParPot: 25,
      fourreaux: 4,
    },
    mainOeuvre: { actif: true },
    prix: prixDefaut('USD'),
  }
}
