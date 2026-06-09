import { requireAuth } from '@/lib/admin-auth'
import { getEmplois, getEntreprisesEmploi, getFormations } from '@/lib/server-data'
import { zones } from '@/lib/data/zones'
import EmploisForm from './EmploisForm'

export default async function EmploisPage() {
  await requireAuth()
  const items = getEmplois()
  const entreprises = getEntreprisesEmploi()
  const formations = getFormations()
  const zoneNames = zones.map((z) => z.shortName)
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Emplois & Compétences</h1>
      <p className="text-gray-400 text-sm mb-8">
        Gérez les offres d'emploi, les entreprises qui recrutent et les programmes de formation.
      </p>
      <EmploisForm
        initialItems={items}
        initialEntreprises={entreprises}
        initialFormations={formations}
        zoneNames={zoneNames}
      />
    </div>
  )
}
