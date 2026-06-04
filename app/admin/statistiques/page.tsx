import { requireAuth } from '@/lib/admin-auth'
import { getStats } from '@/lib/server-data'
import StatistiquesForm from './StatistiquesForm'

export default async function StatistiquesPage() {
  await requireAuth()
  const stats = getStats()
  return (
    <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Statistiques globales</h1>
      <p className="text-gray-400 text-sm mb-8">Ces chiffres apparaissent sur la page d'accueil du site.</p>
      <StatistiquesForm initialStats={stats} />
    </div>
  )
}
