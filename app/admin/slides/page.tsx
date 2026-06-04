import { requireAuth } from '@/lib/admin-auth'
import { getSlides } from '@/lib/server-data'
import SlidesForm from './SlidesForm'

export default async function SlidesPage() {
  await requireAuth()
  const slides = getSlides()
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Slides du hero</h1>
      <p className="text-gray-400 text-sm mb-8">
        Gérez les diapositives du carrousel en haut de la page d'accueil. Vous pouvez modifier, ajouter ou supprimer des slides.
      </p>
      <SlidesForm initialSlides={slides} />
    </div>
  )
}
