import { requireAuth } from '@/lib/admin-auth'
import { getEmplois } from '@/lib/server-data'
import { zones } from '@/lib/data/zones'
import EmploisForm from './EmploisForm'

export default async function EmploisPage() {
  await requireAuth()
  const items = getEmplois()
  const zoneNames = zones.map((z) => z.shortName)
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Offres d'emploi</h1>
      <p className="text-gray-400 text-sm mb-8">Publiez et gérez les offres d'emploi dans les ZES.</p>
      <EmploisForm initialItems={items} zoneNames={zoneNames} />
    </div>
  )
}
