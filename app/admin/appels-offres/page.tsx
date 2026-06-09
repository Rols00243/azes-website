import { requireAuth } from '@/lib/admin-auth'
import { getAppelsOffresAdmin } from '@/lib/server-data'
import { zones } from '@/lib/data/zones'
import AppelsOffresForm from './AppelsOffresForm'

export default async function AppelsOffresAdminPage() {
  await requireAuth()
  const items = await getAppelsOffresAdmin()
  const zoneOptions = zones.map(z => ({ slug: z.slug, name: z.name }))
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Appels d'offres</h1>
      <p className="text-gray-400 text-sm mb-8">
        Publiez et gérez les appels d'offres (AO) et avis de manifestation d'intérêt (AMI).
      </p>
      <AppelsOffresForm initialItems={items} zoneOptions={zoneOptions} />
    </div>
  )
}
