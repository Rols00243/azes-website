import { requireAuth } from '@/lib/admin-auth'
import { getProjetsCount, getProjetsItems } from '@/lib/server-data'
import ProjetsForm from './ProjetsForm'

export default async function ProjetsPage() {
  await requireAuth()
  const counts = await getProjetsCount()
  const items = await getProjetsItems()
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Projets & Opportunités</h1>
      <p className="text-gray-400 text-sm mb-8">
        Gérez les compteurs affichés sur la page d'accueil et la liste détaillée des projets.
      </p>
      <ProjetsForm initialCounts={counts} initialItems={items} />
    </div>
  )
}
