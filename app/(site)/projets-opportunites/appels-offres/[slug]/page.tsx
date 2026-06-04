'use client'

import { appelsOffres, getAppelOffreBySlug } from '@/lib/data/appels-offres'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeftIcon, CalendarIcon, ArrowDownTrayIcon, CheckCircleIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import StatusBadge from '@/components/StatusBadge'
import ZoneTag from '@/components/ZoneTag'
import CountdownTimer from '@/components/CountdownTimer'
import FileUpload from '@/components/FileUpload'

interface FormData {
  societe: string
  contact: string
  email: string
  pays: string
  message: string
}

interface Props {
  params: { slug: string }
}

export default function AppelOffrePage({ params }: Props) {
  const ao = getAppelOffreBySlug(params.slug)
  if (!ao) notFound()

  const [success, setSuccess] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit = () => setSuccess(true)

  const statut = ao.statut as 'En cours' | 'Clôturé' | 'À venir'
  const type = ao.type as 'AO' | 'AMI'

  return (
    <div className="pt-20">
      <section className="bg-azes-blue-dark py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/projets-opportunites/appels-offres" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeftIcon className="w-4 h-4" /> Tous les appels d&apos;offres
          </Link>
          <div className="flex flex-wrap gap-3 mb-4">
            <StatusBadge status={type} />
            <StatusBadge status={statut} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{ao.titre}</h1>
          <ZoneTag zone={ao.zone} zoneSlug={ao.zoneSlug} className="mb-4 bg-white/10 text-white border-white/20" />
          <div className="flex flex-wrap gap-6 text-white/80 text-sm">
            <span className="flex items-center gap-1.5"><CalendarIcon className="w-4 h-4" />Publié : {format(new Date(ao.datePublication), 'dd MMMM yyyy', { locale: fr })}</span>
            <span className="flex items-center gap-1.5"><CalendarIcon className="w-4 h-4" />Limite : {format(new Date(ao.dateLimite), 'dd MMMM yyyy', { locale: fr })}</span>
          </div>
          {ao.statut === 'En cours' && (
            <div className="mt-6">
              <div className="text-sm text-white/70 mb-2">Compte à rebours</div>
              <CountdownTimer deadline={ao.dateLimite} />
            </div>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-azes-blue-dark mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed">{ao.description}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-azes-blue-dark mb-6">Critères de participation</h2>
              <div className="space-y-3">
                {ao.criteres.map((c) => (
                  <div key={c} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <CheckCircleIcon className="w-5 h-5 text-azes-green flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{c}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-azes-blue-dark mb-6">Documents à télécharger</h2>
              <div className="space-y-3">
                {ao.documents.map((doc) => (
                  <div key={doc.titre} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-azes-blue/30 transition-colors">
                    <div>
                      <div className="font-medium text-sm text-gray-800">{doc.titre}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{doc.type} · {doc.taille}</div>
                    </div>
                    <button aria-label={`Télécharger ${doc.titre}`} className="flex items-center gap-1.5 py-2 px-4 bg-azes-blue text-white text-xs font-semibold rounded-lg hover:bg-azes-blue-dark transition-colors">
                      <ArrowDownTrayIcon className="w-4 h-4" /> Télécharger
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Formulaire */}
            {ao.statut === 'En cours' && (
              <div>
                <h2 className="text-2xl font-bold text-azes-blue-dark mb-6">
                  {ao.type === 'AMI' ? 'Manifester mon intérêt' : 'Soumettre une offre'}
                </h2>
                {success ? (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                    <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="font-bold text-green-800 text-lg mb-2">Soumission reçue !</h3>
                    <p className="text-green-700 text-sm">Notre équipe vous contactera dans les 5 jours ouvrés.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-gray-100 p-8 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Société *</label>
                        <input {...register('societe', { required: 'Requis' })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-azes-blue" placeholder="Nom de votre société" />
                        {errors.societe && <p className="text-red-500 text-xs mt-1">{errors.societe.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Personne de contact *</label>
                        <input {...register('contact', { required: 'Requis' })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-azes-blue" placeholder="Nom & prénom" />
                        {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
                        <input {...register('email', { required: 'Requis', pattern: { value: /\S+@\S+\.\S+/, message: 'Email invalide' } })} type="email" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-azes-blue" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Pays d&apos;origine</label>
                        <input {...register('pays')} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-azes-blue" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message / Présentation *</label>
                      <textarea {...register('message', { required: 'Requis' })} rows={5} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-azes-blue resize-none" />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                    </div>
                    <FileUpload
                      label="Documents de candidature"
                      hint="Joignez votre offre technique et financière, certifications, références — PDF, ZIP, XLS — Max 10 Mo"
                      onChange={setFiles}
                      multiple
                    />
                    <button type="submit" className="w-full py-3.5 bg-azes-brown text-white font-semibold rounded-xl hover:bg-azes-brown-dark transition-colors active:scale-95">
                      Soumettre ma candidature
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-4">Détails</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: 'Type', value: ao.type },
                  { label: 'Secteur', value: ao.secteur },
                  { label: 'Budget estimé', value: ao.budget },
                  { label: 'Publication', value: format(new Date(ao.datePublication), 'dd/MM/yyyy') },
                  { label: 'Date limite', value: format(new Date(ao.dateLimite), 'dd/MM/yyyy') },
                ].map((info) => (
                  <div key={info.label} className="flex justify-between">
                    <span className="text-gray-500">{info.label}</span>
                    <span className="font-semibold text-gray-800">{info.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-azes-cream rounded-2xl border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-3">Contact</h3>
              <a href={`mailto:${ao.contact}`} className="flex items-center gap-2 text-azes-blue text-sm hover:underline">
                <EnvelopeIcon className="w-4 h-4" /> {ao.contact}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
