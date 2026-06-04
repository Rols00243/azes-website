import { requireAuth } from '@/lib/admin-auth'
import { getDocumentsAdmin } from '@/lib/server-data'
import DocumentsForm from './DocumentsForm'

export default async function DocumentsAdminPage() {
  await requireAuth()
  const items = getDocumentsAdmin()
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Documents officiels</h1>
      <p className="text-gray-400 text-sm mb-8">
        Publiez et gérez les documents officiels (lois, décrets, rapports, guides, formulaires…).
      </p>
      <DocumentsForm initialItems={items} />
    </div>
  )
}
