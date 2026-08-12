/**
 * Types du module « Devis Fondations ».
 * Toutes les longueurs sont en mètres, les volumes en m³, les masses en kg.
 */

export type Devise = 'USD' | 'CDF' | 'EUR'

/** Diamètres d'acier à béton courants (mm). */
export type Diametre = 6 | 8 | 10 | 12 | 14 | 16 | 20 | 25

export interface ProjetInfo {
  nom: string
  client: string
  localisation: string
  reference: string
  date: string // yyyy-mm-dd
  devise: Devise
  /** Taux de TVA en % (16 % en RDC). */
  tva: number
  /** Marge / bénéfice entreprise en %. */
  marge: number
  /** Provision pour aléas et imprévus en %. */
  aleas: number
}

export interface Segment {
  id: string
  nom: string
  /** Longueur d'un tronçon (m). */
  longueur: number
  /** Nombre de tronçons identiques. */
  nombre: number
}

export interface Geometrie {
  /** simple = périmètre calculé depuis L × l ; detaille = somme des tronçons saisis. */
  mode: 'simple' | 'detaille'
  longueur: number
  largeur: number
  /** Linéaire des murs de refend (murs intérieurs porteurs). */
  refends: number
  segments: Segment[]
}

export interface Fouilles {
  /** Fouilles en rigole (tranchées continues). */
  largeurRigole: number
  profondeurRigole: number
  /** Fouilles en puits (semelles isolées). */
  puitsActif: boolean
  puitsNombre: number
  puitsLongueur: number
  puitsLargeur: number
  puitsProfondeur: number
  /** Coefficient de foisonnement des terres évacuées (≈ 1,25). */
  foisonnement: number
  /** Part du déblai réutilisée en remblai (%). */
  remblaiPourcentage: number
  /** Évacuer les terres excédentaires (poste transport). */
  evacuation: boolean
}

export interface BetonProprete {
  actif: boolean
  epaisseur: number
  /** Débord de part et d'autre de la semelle (m). */
  debord: number
  dosage: number
}

export interface SemelleFilante {
  actif: boolean
  largeur: number
  hauteur: number
  dosage: number
  coffree: boolean
}

export interface SemelleIsolee {
  actif: boolean
  nombre: number
  longueur: number
  largeur: number
  hauteur: number
  dosage: number
  coffree: boolean
}

export interface Longrine {
  actif: boolean
  largeur: number
  hauteur: number
  dosage: number
  coffree: boolean
}

export interface Amorces {
  actif: boolean
  nombre: number
  largeur: number
  epaisseur: number
  hauteur: number
  dosage: number
  coffree: boolean
}

/** Ferraillage d'un élément linéaire (semelle filante, longrine). */
export interface ArmatureLineaire {
  actif: boolean
  diametreLong: Diametre
  nombreBarres: number
  diametreCadre: Diametre
  /** Espacement des cadres / étriers (m). */
  espacementCadre: number
  enrobage: number
  /** Majoration pour recouvrements et chutes (%). */
  recouvrement: number
}

/** Ferraillage d'une semelle isolée (nappe inférieure croisée). */
export interface ArmatureNappe {
  actif: boolean
  diametre: Diametre
  espacement: number
  enrobage: number
  /** Nappe supérieure identique à la nappe inférieure. */
  doubleNappe: boolean
  recouvrement: number
}

/** Ferraillage des amorces de poteaux (attentes). */
export interface ArmatureAmorce {
  actif: boolean
  diametreLong: Diametre
  nombreBarres: number
  diametreCadre: Diametre
  espacementCadre: number
  enrobage: number
  /** Longueur d'attente au-dessus de l'amorce, en attente du poteau (m). */
  longueurAttente: number
  recouvrement: number
}

export interface Coffrage {
  actif: boolean
  type: 'planches' | 'contreplaque'
  plancheLongueur: number
  plancheLargeur: number
  contreplaqueLongueur: number
  contreplaqueLargeur: number
  /** Nombre de réemplois du même panneau sur le chantier. */
  reutilisations: number
  /** Chutes et pertes (%). */
  chutes: number
  /** Chevrons / bastaings de raidissement (ml par m² de coffrage). */
  chevronsMlParM2: number
  chevronLongueur: number
  /** Clous (kg par m² de coffrage). */
  clousKgParM2: number
  /** Fil d'attache recuit (kg par tonne d'acier façonné). */
  filAttacheKgParTonne: number
}

export interface Maconnerie {
  actif: boolean
  /** Hauteur de l'élévation de soubassement (m). */
  hauteur: number
  blocLongueur: number
  blocHauteur: number
  blocEpaisseur: number
  joint: number
  /** Casse et pertes (%). */
  pertes: number
  dosageMortier: number
  /** Volume de mortier par m² de maçonnerie (m³/m²). */
  mortierParM2: number
  /** Chaînage d'arase en tête de soubassement. */
  arase: boolean
  araseHauteur: number
  araseDosage: number
}

export interface Dallage {
  actif: boolean
  /** Surface du dallage (m²) — par défaut l'emprise au sol. */
  surface: number
  herissonEpaisseur: number
  sableEpaisseur: number
  polyane: boolean
  dallageEpaisseur: number
  dallageDosage: number
  treillis: boolean
  treillisPanneauLongueur: number
  treillisPanneauLargeur: number
  treillisRecouvrement: number
}

export interface TuyauLigne {
  id: string
  designation: string
  /** Diamètre nominal PVC (mm). */
  diametre: number
  /** Longueur totale développée (m). */
  longueur: number
  /** Longueur commerciale d'une barre (m). */
  longueurBarre: number
  coudes: number
  tes: number
  manchons: number
}

export interface Plomberie {
  actif: boolean
  lignes: TuyauLigne[]
  /** Chutes de découpe (%). */
  chutes: number
  /** Nombre de collages assurés par un pot de colle PVC. */
  joinsParPot: number
  /** Fourreaux / réservations de traversée. */
  fourreaux: number
}

/**
 * La main d'œuvre est chiffrée au ratio, à partir des quantités du métré ;
 * ses prix unitaires vivent dans la grille de prix (clés `mo_*`).
 */
export interface MainOeuvre {
  actif: boolean
}

/** Prix unitaires indexés par clé matériau (voir constants.ts). */
export type PrixMap = Record<string, number>

export interface DevisInput {
  projet: ProjetInfo
  geometrie: Geometrie
  fouilles: Fouilles
  proprete: BetonProprete
  semelleFilante: SemelleFilante
  semelleIsolee: SemelleIsolee
  longrine: Longrine
  amorces: Amorces
  armSemelle: ArmatureLineaire
  armLongrine: ArmatureLineaire
  armNappe: ArmatureNappe
  armAmorce: ArmatureAmorce
  coffrage: Coffrage
  maconnerie: Maconnerie
  dallage: Dallage
  plomberie: Plomberie
  mainOeuvre: MainOeuvre
  prix: PrixMap
}

/* ────────────────────────────  Résultats  ──────────────────────────── */

export interface BetonElement {
  nom: string
  volume: number
  dosage: number
  cimentKg: number
  cimentSacs: number
  sable: number
  gravier: number
  eau: number
}

export interface AcierParDiametre {
  diametre: Diametre
  /** Longueur cumulée développée (m), recouvrements inclus. */
  ml: number
  kg: number
  /** Nombre de barres commerciales. */
  barres: number
}

export interface AcierDetail {
  element: string
  diametre: Diametre
  designation: string
  ml: number
  kg: number
}

export interface Metre {
  lineaireTotal: number
  empriseSol: number
  fouilles: {
    volumeRigole: number
    volumePuits: number
    volumeTotal: number
    remblai: number
    evacuation: number
  }
  betons: BetonElement[]
  totauxBeton: {
    volume: number
    cimentKg: number
    cimentSacs: number
    sable: number
    gravier: number
    eau: number
  }
  acier: {
    detail: AcierDetail[]
    parDiametre: AcierParDiametre[]
    totalKg: number
    filAttacheKg: number
  }
  coffrage: {
    surface: number
    panneaux: number
    panneauLabel: string
    chevrons: number
    chevronsMl: number
    clousKg: number
  }
  maconnerie: {
    surface: number
    blocs: number
    mortierVolume: number
    cimentSacs: number
    sable: number
  }
  dallage: {
    surface: number
    herisson: number
    sable: number
    polyane: number
    betonVolume: number
    treillisPanneaux: number
  }
  plomberie: {
    lignes: {
      designation: string
      diametre: number
      longueur: number
      barres: number
      coudes: number
      tes: number
      manchons: number
    }[]
    collePots: number
    fourreaux: number
  }
}

export type Lot =
  | 'Terrassement'
  | 'Béton & agrégats'
  | 'Acier & ferraillage'
  | 'Coffrage'
  | 'Maçonnerie'
  | 'Dallage'
  | 'Plomberie'
  | "Main d'œuvre"

export interface LigneDevis {
  id: string
  lot: Lot
  designation: string
  unite: string
  quantite: number
  pu: number
  montant: number
  /** Clé de prix éditable (absente pour les lignes calculées). */
  prixKey?: string
}

export interface TotauxDevis {
  lots: { lot: Lot; montant: number }[]
  sousTotal: number
  montantAleas: number
  montantMarge: number
  totalHT: number
  montantTVA: number
  totalTTC: number
}

export interface DevisResultat {
  metre: Metre
  lignes: LigneDevis[]
  totaux: TotauxDevis
  /** Contrôles de cohérence à afficher à l'utilisateur. */
  alertes: string[]
}
