import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import { zones as staticZones } from './data/zones'

// ── Storage backend ────────────────────────────────────────────────────────────
// On Vercel: Upstash Redis (persistent) via KV_REST_API_URL + KV_REST_API_TOKEN
// Locally:   ./data  (JSON files)

const USE_REDIS = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
const SOURCE_DIR = join(process.cwd(), 'data')

// Lazy Redis client — only imported when actually needed (avoids edge-runtime issues)
let _redis: import('@upstash/redis').Redis | null = null
async function getRedis() {
  if (_redis) return _redis
  const { Redis } = await import('@upstash/redis')
  _redis = new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  })
  return _redis
}

// ── Core I/O ──────────────────────────────────────────────────────────────────

async function readJSON<T>(filename: string, fallback: T): Promise<T> {
  if (USE_REDIS) {
    try {
      const redis = await getRedis()
      const val = await redis.get<T>(filename)
      if (val !== null && val !== undefined) return val
      // If nothing in Redis yet, seed from bundled file
      const seeded = readSourceFile<T>(filename)
      if (seeded !== null) {
        await redis.set(filename, seeded)
        return seeded
      }
      return fallback
    } catch {
      return fallback
    }
  }
  // Local file system
  const filePath = join(SOURCE_DIR, filename)
  try {
    if (!existsSync(filePath)) return fallback
    return JSON.parse(readFileSync(filePath, 'utf-8')) as T
  } catch {
    return fallback
  }
}

export async function writeJSON(filename: string, data: unknown): Promise<void> {
  if (USE_REDIS) {
    const redis = await getRedis()
    await redis.set(filename, data)
    return
  }
  // Local file system
  if (!existsSync(SOURCE_DIR)) mkdirSync(SOURCE_DIR, { recursive: true })
  writeFileSync(join(SOURCE_DIR, filename), JSON.stringify(data, null, 2), 'utf-8')
}

function readSourceFile<T>(filename: string): T | null {
  const filePath = join(SOURCE_DIR, filename)
  try {
    if (!existsSync(filePath)) return null
    return JSON.parse(readFileSync(filePath, 'utf-8')) as T
  } catch {
    return null
  }
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

export async function getStats(): Promise<SiteStats> {
  return readJSON('stats.json', DEFAULT_STATS)
}

export async function getZonesStats(): Promise<Record<string, ZoneStat>> {
  return readJSON('zones-stats.json', DEFAULT_ZONES_STATS)
}

export async function getProjetsCount(): Promise<ProjetsCount> {
  return readJSON('projets-counts.json', DEFAULT_PROJETS)
}

export async function getActualites(): Promise<Actualite[]> {
  return readJSON('actualites.json', [])
}

export async function getEmplois(): Promise<Emploi[]> {
  return readJSON('emplois.json', [])
}

export async function getSlides(): Promise<Slide[]> {
  return readJSON('slides.json', [])
}

export async function getDocumentsAdmin(): Promise<DocumentAdmin[]> {
  return readJSON('documents-data.json', [])
}

export async function getAppelsOffresAdmin(): Promise<AppelOffreAdmin[]> {
  return readJSON('appels-offres-data.json', [])
}

export async function getZonesDetail(): Promise<Record<string, ZoneDetail>> {
  return readJSON('zones-detail.json', {})
}

export async function getZoneDetail(slug: string): Promise<ZoneDetail | null> {
  const all = await getZonesDetail()
  return all[slug] ?? null
}

export async function getMessages(): Promise<Message[]> {
  return readJSON('messages.json', [])
}

export async function getUnreadCount(): Promise<number> {
  const msgs = await getMessages()
  return msgs.filter((m) => !m.lu).length
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

export async function getBureaux(): Promise<BureauContact[]> {
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

export async function getProjetsItems(): Promise<ProjetItem[]> {
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

export async function getZoneProjets(): Promise<ZoneProjet[]> {
  return readJSON('zone-projets.json', [])
}

// ─── Entreprises qui recrutent ────────────────────────────────────────────────

export interface EntrepriseEmploi {
  id: string
  nom: string
  zone: string
  emplois: number
  color: string
}

const DEFAULT_ENTREPRISES: EntrepriseEmploi[] = [
  { id: 'e1', nom: 'Bolloré Logistics', zone: 'Matadi', emplois: 450, color: '#C4894A' },
  { id: 'e2', nom: 'MTN Group', zone: 'Kinshasa', emplois: 320, color: '#1B4F8C' },
  { id: 'e3', nom: 'Olam International', zone: 'Kasaï', emplois: 580, color: '#2A7A4B' },
  { id: 'e4', nom: 'Gécamines', zone: 'Lubumbashi', emplois: 2400, color: '#8B5E3C' },
  { id: 'e5', nom: 'Orange Digital', zone: 'Kinshasa', emplois: 180, color: '#6B48A0' },
  { id: 'e6', nom: 'Banque Mondiale', zone: 'Kinshasa', emplois: 45, color: '#1E7A9E' },
]

export async function getEntreprisesEmploi(): Promise<EntrepriseEmploi[]> {
  return readJSON('entreprises-emplois.json', DEFAULT_ENTREPRISES)
}

export async function writeEntreprisesEmploi(data: EntrepriseEmploi[]): Promise<void> {
  return writeJSON('entreprises-emplois.json', data)
}

// ─── Programmes de formation ──────────────────────────────────────────────────

export interface Formation {
  id: string
  titre: string
  duree: string
  zone: string
  places: number
  color: string
}

const DEFAULT_FORMATIONS: Formation[] = [
  { id: 'f1', titre: 'Formation Logistique & Supply Chain', duree: '6 mois', zone: 'Zone Franche de Matadi', places: 40, color: '#C4894A' },
  { id: 'f2', titre: 'Formation Développement Numérique', duree: '3 mois', zone: 'Zone Tech de Kinshasa', places: 60, color: '#1B4F8C' },
  { id: 'f3', titre: 'Formation Transformation Agro-Alimentaire', duree: '4 mois', zone: 'Zone Agro-Industrielle du Kasaï', places: 50, color: '#2A7A4B' },
  { id: 'f4', titre: 'Formation Sécurité Minière', duree: '2 mois', zone: 'Zone Minière de Lubumbashi', places: 35, color: '#8B5E3C' },
]

export async function getFormations(): Promise<Formation[]> {
  return readJSON('formations.json', DEFAULT_FORMATIONS)
}

export async function writeFormations(data: Formation[]): Promise<void> {
  return writeJSON('formations.json', data)
}

export async function getZoneProjetsForSlug(slug: string): Promise<ZoneProjet[]> {
  const all = await getZoneProjets()
  return all.filter(p => p.zoneSlug === slug)
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

export async function getCustomZones(): Promise<CustomZone[]> {
  return readJSON('custom-zones.json', [])
}

export async function writeCustomZones(zones: CustomZone[]): Promise<void> {
  return writeJSON('custom-zones.json', zones)
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

export async function getCompteEmails(): Promise<CompteEmail[]> {
  return readJSON('emails.json', [])
}

// ─── Zones masquées (zones statiques supprimées via admin) ───────────────────

export async function getHiddenZones(): Promise<string[]> {
  return readJSON('hidden-zones.json', [])
}

export async function writeHiddenZones(slugs: string[]): Promise<void> {
  return writeJSON('hidden-zones.json', slugs)
}

// ─── Zone merging ─────────────────────────────────────────────────────────────

export async function getMergedZones() {
  const stats = await getZonesStats()
  const hidden = await getHiddenZones()
  return staticZones
    .filter((z) => !hidden.includes(z.slug))
    .map((z) => ({
      ...z,
      emplois: stats[z.slug]?.emplois ?? 0,
      entreprises: stats[z.slug]?.entreprises ?? 0,
      investissement: stats[z.slug]?.investissement ?? '$0',
    }))
}

export async function getMergedZoneBySlug(slug: string) {
  const zones = await getMergedZones()
  return zones.find((z) => z.slug === slug)
}
