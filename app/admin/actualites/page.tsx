import { requireAuth } from '@/lib/admin-auth'
import { getActualites } from '@/lib/server-data'
import ActualitesForm from './ActualitesForm'

export default async function ActualitesPage() {
  await requireAuth()
  const items = await getActualites()
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Actualités</h1>
      <p className="text-gray-400 text-sm mb-8">Publiez et gérez les articles d'actualité du site.</p>
      <ActualitesForm initialItems={items} />
    </div>
  )
}
