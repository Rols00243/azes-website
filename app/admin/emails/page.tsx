import { requireAuth } from '@/lib/admin-auth'
import { getCompteEmails } from '@/lib/server-data'
import EmailsForm from './EmailsForm'

export default async function EmailsPage() {
  await requireAuth()
  const items = await getCompteEmails()
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Messagerie professionnelle</h1>
      <p className="text-gray-400 text-sm mb-8">
        Créez et gérez les adresses email <strong>@azes.cd</strong> pour les agents et cadres de l'AZES.
      </p>
      <EmailsForm initialItems={items} />
    </div>
  )
}
