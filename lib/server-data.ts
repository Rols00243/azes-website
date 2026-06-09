import { readFileSync, existsSync, mkdirSync, writeFileSync, readdirSync } from 'fs'
import { join } from 'path'
import { zones as staticZones } from './data/zones'

// ── Répertoire de données ──────────────────────────────────────────────────
// Sur Vercel : /tmp/azes-data (accessible en écriture)
// En local   : ./data (fichiers sources)
const IS_VERCEL  = !!process.env.VERCEL
const SOURCE_DIR = join(process.cwd(), 'data')   // bundled — lecture seule sur Vercel
const DATA_DIR   = IS_VERCEL ? '/tmp/azes-data' : SOURCE_DIR

/**
 * Initialise /tmp/azes-data au premier appel sur Vercel :
 * copie tous les JSON sources dans le répertoire temporaire inscriptible.
 */
function initDataDir(): void {
  if (!IS_VERCEL) return
  if (existsSync(DATA_DIR)) return            // déjà initialisé dans cette instance
  mkdirSync(DATA_DIR, { recursive: true })
  try {
    const files = readdirSync(SOURCE_DIR).filter(f => f.endsWith('.json'))
    for (const f of files) {
      writeFileSync(join(DATA_DIR, f), readFileSync(join(SOURCE_DIR, f)))
    }
  } catch {
    // En cas d'erreur de lecture source, on continue avec des fallbacks
  }
}

function readJSON<T>(filename: string, fallback: T): T {
  initDataDir()
  const filePath = join(DATA_DIR, filename)
  try {
    if (!existsSync(filePath)) return fallback
    return JSON.parse(readFileSync(filePath, 'utf-8')) as T
  } catch {
    return fallback
  }
}

export function writeJSON(filename: string, data: unknown): void {
  initDataDir()
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })
  writeFileSync(join(DATA_DIR, filename), JSON.stringify(data, null, 2), 'utf-8')
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SiteStats {
  zones_actives: number
  entreprises: number
  investissements: string
  emplois: number
}

export interface ZoneStat {
  emplois: number
  entreprises: number
  investissement: string
}

export interface ProjetsCount {
  projets_en_cours: number
  projets_planifies: number
  opportunites: number
  appels_offres: number
}

export interface Actualite {
  id: string
  titre: string
  extrait: string
  date: string
  categorie: string
  slug: string
}

export interface Emploi {
  id: string
  titre: string
  zone: string
  type: string
  description: string
  date: string
}

export interface Slide {
  id: string
  image: string
  tag: string
  headline: string
  accent: string
  description: string
  ctaLabel: string
  ctaHref: string
  ctaSecondLabel: string
  ctaSecondHref: string
}

export interface DocumentAdmin {
  id: string
  titre: string
  categorie: string
  date: string
  type: string
  taille: string
  description: string
  reference: string
  url: string
}

export interface AppelOffreAdmin {
  id: string
  titre: string
  type: 'AO' | 'AMI'
  statut: 'En cours' | 'Clôturé' | 'À venir'
  zone: string
  zoneSlug: string
  budget: string
  datePublication: string
  dateLimite: string
  description: string
  urgent: boolean
}

// ─── Zone detail blocks ──────────────────────────────────────────────────────

export interface ZoneDetailBlock<T> {
  data: T
  updatedAt: string // 'YYYY-MM-DD' — empty string = pas encore renseigné
}

export interface FoncierData {
  superficieTotale: number   // ha
  superficieIndustrielle: number // ha
  superficieEmprises: number // ha
}

export interface ActiviteData {
  secteurs: string[]
  nbIndustries: number
}

export interface InfrastructuresData {
  lineaireRoutier: number   // ml
  energieMW: number          // MW
}

export interface ImpactData {
  emplois: number
  investissement: string
}

export interface ZoneDetail {
  foncier: { superficieTotale: number; superficieIndustrielle: number; superficieEmprises: number; updatedAt: string }
  activite: { secteurs: string[]; nbIndustries: number; updatedAt: string }
  infrastructures: { lineaireRoutier: number; energieMW: number; updatedAt: string }
  impact: { emplois: number; investissement: string; updatedAt: string }
}

export interface Message {
  id: string
  nom: string
  email: string
  telephone: string
  sujet: string
  message: string
  date: string
  lu: boolean
}

// ─── Defaults ────────────────────────────────────────────────────────────────

const DEFAULT_STATS: SiteStats = {
  zones_actives: 7,
  entreprises: 0,
  investissements: '$0',
  emplois: 0,
}

const DEFAULT_ZONES_STATS: Record<string, ZoneStat> = Object.fromEntries(
  staticZones.map((z) => [z.slug, { emplois: 0, entreprises: 0, investissement: '$0' }])
)

const DEFAULT_PROJETS: ProjetsCount = {
  projets_en_cours: 0,
  projets_planifies: 0,
  opportunites: 0,
  appels_offres: 0,
}

// ─── Getters ─────────────────────────────────────────────────────────────────

export function getStats(): SiteStats {
  return readJSON('stats.json', DEFAULT_STATS)
}

export function getZonesStats(): Record<string, ZoneStat> {
  return readJSON('zones-stats.json', DEFAULT_ZONES_STATS)
}

export function getProjetsCount(): ProjetsCount {
  return readJSON('projets-counts.json', DEFAULT_PROJETS)
}

export function getActualites(): Actualite[] {
  return readJSON('actualites.json', [])
}

export function getEmplois(): Emploi[] {
  return readJSON('emplois.json', [])
}

export function getSlides(): Slide[] {
  return readJSON('slides.json', [])
}

export function getDocumentsAdmin(): DocumentAdmin[] {
  return readJSON('documents-data.json', [])
}

export function getAppelsOffresAdmin(): AppelOffreAdmin[] {
  return readJSON('appels-offres-data.json', [])
}

export function getZonesDetail(): Record<string, ZoneDetail> {
  return readJSON('zones-detail.json', {})
}

export function getZoneDetail(slug: string): ZoneDetail | null {
  const all = getZonesDetail()
  return all[slug] ?? null
}

export function getMessages(): Message[] {
  return readJSON('messages.json', [])
}

export function getUnreadCount(): number {
  return getMessages().filter((m) => !m.lu).length
}

// ─── Bureaux de contact ───────────────────────────────────────────────────────

export interface BureauContact {
  id: string
  ville: string
  adresse: string
  tel: string
  email: string
  horaires: string
  color: string
}

const DEFAULT_BUREAUX: BureauContact[] = [
  { id: 'bureau-1', ville: 'Kinshasa (Siège)', adresse: 'Boulevard du 30 Juin, Immeuble AZES, Gombe', tel: '+243 81 234 5678', email: 'info@azes.cd', horaires: 'Lun–Ven 08h–17h', color: '#1B4F8C' },
  { id: 'bureau-2', ville: 'Matadi', adresse: "Avenue de l'Indépendance, Zone Franche", tel: '+243 81 234 5679', email: 'matadi@azes.cd', horaires: 'Lun–Ven 08h–17h', color: '#2A7A4B' },
  { id: 'bureau-3', ville: 'Lubumbashi', adresse: 'Boulevard Moïse Tshombe, Zone Minière', tel: '+243 81 234 5680', email: 'lubumbashi@azes.cd', horaires: 'Lun–Ven 08h–17h', color: '#C4894A' },
]

export function getBureaux(): BureauContact[] {
  return readJSON('bureaux.json', DEFAULT_BUREAUX)
}

// ─── Projets détaillés ───────────────────────────────────────────────────────

export interface ProjetItem {
  id: string
  nom: string
  zone: string
  statut: 'En cours' | 'Planifié' | 'Terminé' | 'Suspendu'
  secteur: string
  description: string
  investissement: string
  dateDebut: string
}

export function getProjetsItems(): ProjetItem[] {
  return readJSON('projets-items.json', [])
}

// ─── Projets par zone (suivi de statut) ──────────────────────────────────────

export interface ZoneProjet {
  id: string
  zoneSlug: string
  nom: string
  niveau: 'Préfaisabilité' | 'Faisabilité' | 'Études' | 'En cours' | 'Réalisé'
  superficie: string        // ex: "450 ha"
  investissements: string   // ex: "$120 M"
  partenaires: string       // free-text, séparés par virgule
  secteursVises: string[]
  dateCreation: string
}

export function getZoneProjets(): ZoneProjet[] {
  return readJSON('zone-projets.json', [])
}

export function getZoneProjetsForSlug(slug: string): ZoneProjet[] {
  return getZoneProjets().filter(p => p.zoneSlug === slug)
}

// ─── Zones dynamiques (créées via admin) ─────────────────────────────────────

export interface CustomZone {
  slug: string
  name: string
  region: string
  color: string
  emplois: number
  entreprises: number
  investissement: string
}

export function getCustomZones(): CustomZone[] {
  return readJSON('custom-zones.json', [])
}

export function writeCustomZones(zones: CustomZone[]): void {
  writeJSON('custom-zones.json', zones)
}

// ─── Comptes email professionnels ─────────────────────────────────────────────

export interface CompteEmail {
  id: string
  prenom: string
  nom: string
  role: 'Agent' | 'Cadre' | 'Directeur' | 'Consultant'
  departement: string
  adresse: string      // ex: prenom.nom@azes.cd
  motDePasse: string   // temporaire — à changer au premier login
  actif: boolean
  dateCreation: string // ISO date
}

export function getCompteEmails(): CompteEmail[] {
  return readJSON('emails.json', [])
}

// ─── Zones masquées (zones statiques supprimées via admin) ───────────────────

export function getHiddenZones(): string[] {
  return readJSON('hidden-zones.json', [])
}

export function writeHiddenZones(slugs: string[]): void {
  writeJSON('hidden-zones.json', slugs)
}

// ─── Zone merging ─────────────────────────────────────────────────────────────

export function getMergedZones() {
  const stats = getZonesStats()
  const hidden = getHiddenZones()
  return staticZones
    .filter((z) => !hidden.includes(z.slug))
    .map((z) => ({
      ...z,
      emplois: stats[z.slug]?.emplois ?? 0,
      entreprises: stats[z.slug]?.entreprises ?? 0,
      investissement: stats[z.slug]?.investissement ?? '$0',
    }))
}

export function getMergedZoneBySlug(slug: string) {
  return getMergedZones().find((z) => z.slug === slug)
}
