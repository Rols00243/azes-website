import { requireAuth } from '@/lib/admin-auth'
import { getBureaux } from '@/lib/server-data'
import BureauxForm from './BureauxForm'

export default async function ContactAdminPage() {
  await requireAuth()
  const bureaux = await getBureaux()
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Page Contact</h1>
      <p className="text-gray-400 text-sm mb-8">Gérez les bureaux régionaux affichés sur la page Contact du site.</p>
      <BureauxForm initialItems={bureaux} />
    </div>
  )
}
