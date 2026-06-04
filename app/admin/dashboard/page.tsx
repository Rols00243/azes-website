import { requireAuth } from '@/lib/admin-auth'
import { getStats, getProjetsCount, getActualites, getEmplois, getSlides, getDocumentsAdmin, getAppelsOffresAdmin, getMessages } from '@/lib/server-data'
import Link from 'next/link'
import {
  ChartBarIcon, MapIcon, BriefcaseIcon, NewspaperIcon,
  UserGroupIcon, PhotoIcon, DocumentTextIcon, MegaphoneIcon, InboxIcon, ArrowRightIcon,
} from '@heroicons/react/24/outline'

export default async function DashboardPage() {
  await requireAuth()
  const stats      = getStats()
  const projets    = getProjetsCount()
  const actualites = getActualites()
  const emplois    = getEmplois()
  const slides     = getSlides()
  const docs       = getDocumentsAdmin()
  const appels     = getAppelsOffresAdmin()
  const messages   = getMessages()
  const unread     = messages.filter(m => !m.lu).length

  const sections = [
    {
      href: '/admin/slides',
      icon: PhotoIcon,
      label: 'Slides du hero',
      desc: 'Images et textes du carrousel principal',
      color: 'bg-indigo-50 text-indigo-700',
      badge: `${slides.length} slide(s)`,
    },
    {
      href: '/admin/statistiques',
      icon: ChartBarIcon,
      label: 'Statistiques globales',
      desc: 'Zones actives, emplois, investissements',
      color: 'bg-blue-50 text-blue-700',
      badge: `${stats.zones_actives} zones · ${stats.emplois.toLocaleString('fr-FR')} emplois`,
    },
    {
      href: '/admin/zones',
      icon: MapIcon,
      label: 'Données par zone',
      desc: 'Chiffres réels pour chacune des 7 ZES',
      color: 'bg-green-50 text-green-700',
      badge: '7 zones',
    },
    {
      href: '/admin/projets',
      icon: BriefcaseIcon,
      label: 'Projets & Opportunités',
      desc: 'Compteurs projets, opportunités',
      color: 'bg-purple-50 text-purple-700',
      badge: `${projets.projets_en_cours} projet(s) en cours`,
    },
    {
      href: '/admin/appels-offres',
      icon: MegaphoneIcon,
      label: "Appels d'offres",
      desc: 'AO et AMI publiés sur le site',
      color: 'bg-orange-50 text-orange-700',
      badge: `${appels.length} appel(s) · ${appels.filter(a => a.statut === 'En cours').length} en cours`,
    },
    {
      href: '/admin/actualites',
      icon: NewspaperIcon,
      label: 'Actualités',
      desc: 'Articles et communiqués de presse',
      color: 'bg-amber-50 text-amber-700',
      badge: `${actualites.length} article(s)`,
    },
    {
      href: '/admin/documents',
      icon: DocumentTextIcon,
      label: 'Documents officiels',
      desc: 'Lois, décrets, rapports, guides…',
      color: 'bg-teal-50 text-teal-700',
      badge: `${docs.length} document(s)`,
    },
    {
      href: '/admin/emplois',
      icon: UserGroupIcon,
      label: "Offres d'emploi",
      desc: 'Postes ouverts dans les ZES',
      color: 'bg-rose-50 text-rose-700',
      badge: `${emplois.length} offre(s)`,
    },
    {
      href: '/admin/messages',
      icon: InboxIcon,
      label: 'Messages reçus',
      desc: 'Demandes et sollicitations des visiteurs',
      color: 'bg-sky-50 text-sky-700',
      badge: unread > 0 ? `${unread} non lu(s) · ${messages.length} total` : `${messages.length} message(s)`,
      highlight: unread > 0,
    },
  ]

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Tableau de bord</h1>
      <p className="text-gray-500 mb-8 text-sm">
        Tout le contenu du site AZES est géré ici. Cliquez sur une section pour modifier, ajouter ou supprimer des données.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sections.map((s) => (
          <Link key={s.href} href={s.href}
            className={`group flex items-start gap-4 bg-white rounded-2xl border p-5 hover:shadow-md transition-all ${
              'highlight' in s && s.highlight
                ? 'border-sky-200 shadow-sky-50 hover:border-sky-300'
                : 'border-gray-100 hover:border-gray-200'
            }`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${s.color}`}>
              <s.icon className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 group-hover:text-[#0A2342] transition-colors">{s.label}</span>
                {'highlight' in s && s.highlight && (
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                )}
              </div>
              <div className="text-sm text-gray-400 mt-0.5">{s.desc}</div>
              <div className={`text-xs font-medium mt-2 rounded-lg px-2.5 py-1 inline-block ${
                'highlight' in s && s.highlight
                  ? 'bg-sky-50 text-sky-700'
                  : 'bg-gray-50 text-gray-500'
              }`}>{s.badge}</div>
            </div>
            <ArrowRightIcon className="w-5 h-5 text-gray-300 group-hover:text-gray-500 flex-shrink-0 mt-1 transition-colors" />
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-5 text-sm text-blue-800">
        <strong>Comment publier ?</strong> Sélectionnez une section → modifiez les données → cliquez sur <strong>Sauvegarder</strong>.<br/>
        Le site se met à jour <strong>immédiatement</strong>. Aucune compétence technique requise.
      </div>
    </div>
  )
}
