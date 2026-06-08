import { requireAuth } from '@/lib/admin-auth'
import { getZonesStats, getZonesDetail, getCustomZones, getZoneProjets } from '@/lib/server-data'
import { zones } from '@/lib/data/zones'
import ZonesForm from './ZonesForm'

export default async function ZonesPage() {
  await requireAuth()
  const zonesStats = getZonesStats()
  const zonesDetail = getZonesDetail()
  const customZones = getCustomZones()
  const zoneProjets = getZoneProjets()

  const staticData = zones.map((z) => ({
    slug: z.slug,
    name: z.name,
    region: z.region,
    color: z.color,
    emplois: zonesStats[z.slug]?.emplois ?? 0,
    entreprises: zonesStats[z.slug]?.entreprises ?? 0,
    investissement: zonesStats[z.slug]?.investissement ?? '$0',
    custom: false,
  }))

  const customData = customZones.map((z) => ({
    slug: z.slug,
    name: z.name,
    region: z.region,
    color: z.color,
    emplois: zonesStats[z.slug]?.emplois ?? z.emplois,
    entreprises: zonesStats[z.slug]?.entreprises ?? z.entreprises,
    investissement: zonesStats[z.slug]?.investissement ?? z.investissement,
    custom: true,
  }))

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Données par zone</h1>
      <p className="text-gray-400 text-sm mb-8">
        Statistiques globales et fiches détaillées (Foncier · Activité · Infrastructures · Impact) par ZES.
        Vous pouvez aussi créer de nouvelles zones ou en supprimer.
      </p>
      <ZonesForm initialData={[...staticData, ...customData]} initialDetail={zonesDetail} initialZoneProjets={zoneProjets} />
    </div>
  )
}
