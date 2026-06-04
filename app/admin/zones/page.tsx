import { requireAuth } from '@/lib/admin-auth'
import { getZonesStats, getZonesDetail } from '@/lib/server-data'
import { zones } from '@/lib/data/zones'
import ZonesForm from './ZonesForm'

export default async function ZonesPage() {
  await requireAuth()
  const zonesStats = getZonesStats()
  const zonesDetail = getZonesDetail()
  const data = zones.map((z) => ({
    slug: z.slug,
    name: z.name,
    region: z.region,
    color: z.color,
    emplois: zonesStats[z.slug]?.emplois ?? 0,
    entreprises: zonesStats[z.slug]?.entreprises ?? 0,
    investissement: zonesStats[z.slug]?.investissement ?? '$0',
  }))
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Données par zone</h1>
      <p className="text-gray-400 text-sm mb-8">Statistiques globales et fiches détaillées (Foncier · Activité · Infrastructures · Impact) par ZES.</p>
      <ZonesForm initialData={data} initialDetail={zonesDetail} />
    </div>
  )
}
