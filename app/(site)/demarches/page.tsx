'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import {
  HandRaisedIcon, InformationCircleIcon, DocumentArrowDownIcon,
  FolderOpenIcon, MagnifyingGlassIcon, PhoneIcon, CalendarDaysIcon,
  CheckCircleIcon, ArrowRightIcon, ArrowLeftIcon,
} from '@heroicons/react/24/outline'
import FileUpload from '@/components/FileUpload'
import DarkPageHero from '@/components/ui/DarkPageHero'
import LightSection from '@/components/ui/LightSection'

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.55 } }

const zones = [
  'ZES de Maluku', 'ZES de Kin-Malebo', 'ZES de Kinsevere',
  'ZES de Kiswishi', 'ZES de Musompo', 'ZES Agro Nganda-Jika', 'ZES de Kalamba-Mbuji',
]

const demarches = [
  { id: 'interet',     icon: HandRaisedIcon,           title: "Manifestation d'intérêt",  desc: 'Signaler votre intérêt pour investir dans une ZES',            color: '#C4894A' },
  { id: 'info',        icon: InformationCircleIcon,     title: "Demande d'informations",   desc: 'Obtenir des informations ciblées sur les ZES',                 color: '#1E7A9E' },
  { id: 'formulaires', icon: DocumentArrowDownIcon,     title: 'Télécharger les formulaires', desc: "Accéder aux formulaires officiels de l'AZES",              color: '#2A7A4B' },
  { id: 'dossier',     icon: FolderOpenIcon,            title: 'Soumettre un dossier',     desc: "Déposer votre dossier d'agrément en ligne",                   color: '#1B4F8C' },
  { id: 'suivi',       icon: MagnifyingGlassIcon,       title: 'Suivi de demande',         desc: "Vérifier l'état d'avancement de votre demande",              color: '#6B48A0' },
  { id: 'guichet',     icon: PhoneIcon,                 title: 'Guichet Unique',           desc: "Contacter directement notre service d'accompagnement",        color: '#8B5E3C' },
  { id: 'rdv',         icon: CalendarDaysIcon,          title: 'Prendre rendez-vous',      desc: 'Planifier un entretien avec nos experts',                     color: '#1B4F8C' },
]

// Light theme styles
const inp = "w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#1B4F8C] focus:bg-white transition-all"
const lbl = "block text-sm font-semibold text-gray-700 mb-1.5"
const errCls = "text-red-500 text-xs mt-1"

interface InteretForm { nom: string; entreprise: string; pays: string; secteur: string; zone: string; message: string }
interface InfoForm { nom: string; email: string; sujet: string; message: string }
interface RdvForm { nom: string; email: string; telephone: string; date: string; heure: string; motif: string }

function SuccessMsg() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      className="bg-[#2A7A4B]/10 border border-[#2A7A4B]/30 rounded-2xl p-10 text-center">
      <CheckCircleIcon className="w-14 h-14 text-[#2A7A4B] mx-auto mb-4" />
      <h3 className="font-bold text-[#0A2342] text-xl mb-2">Envoyé avec succès !</h3>
      <p className="text-gray-500 text-sm">Notre équipe vous répondra dans les 48 heures ouvrées.</p>
    </motion.div>
  )
}

function SubmitBtn({ label }: { label: string }) {
  return (
    <button type="submit" className="w-full py-3.5 bg-[#C4894A] text-white font-semibold rounded-xl hover:bg-[#a87540] transition-all hover:scale-[1.01] active:scale-95 text-sm">
      {label}
    </button>
  )
}

function Field({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) {
  return (
    <div>
      <label className={lbl}>{label}</label>
      {children}
      {error && <p className={errCls}>{error}</p>}
    </div>
  )
}

function ManifestationForm() {
  const [ok, setOk] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const { register, handleSubmit, formState: { errors } } = useForm<InteretForm>()
  if (ok) return <SuccessMsg />
  return (
    <form onSubmit={handleSubmit(() => setOk(true))} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Nom complet *" error={errors.nom?.message}><input {...register('nom', { required: 'Requis' })} className={inp} placeholder="Jean Dupont" /></Field>
        <Field label="Entreprise *" error={errors.entreprise?.message}><input {...register('entreprise', { required: 'Requis' })} className={inp} placeholder="Ma Société SARL" /></Field>
        <Field label="Pays d'origine *" error={errors.pays?.message}><input {...register('pays', { required: 'Requis' })} className={inp} placeholder="France" /></Field>
        <Field label="Secteur d'activité *" error={errors.secteur?.message}>
          <select {...register('secteur', { required: 'Requis' })} className={inp}>
            <option value="">Choisir un secteur</option>
            {['Mines', 'Agriculture', 'Technologie', 'Logistique', 'Énergie', 'Industrie', 'Tourisme', 'Autre'].map(s => <option key={s}>{s}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Zone d'intérêt">
        <select {...register('zone')} className={inp}>
          <option value="">Toutes les zones</option>
          {zones.map(z => <option key={z}>{z}</option>)}
        </select>
      </Field>
      <Field label="Message / Présentation du projet *" error={errors.message?.message}>
        <textarea {...register('message', { required: 'Requis' })} rows={5} className={inp} placeholder="Décrivez votre projet d'investissement..." />
      </Field>
      <FileUpload label="Pièces jointes" hint="Plan d'affaires, statuts d'entreprise, références — PDF, DOC, XLS, ZIP — Max 10 Mo" onChange={setFiles} />
      <SubmitBtn label="Soumettre ma manifestation d'intérêt" />
    </form>
  )
}

function DemandeInfoForm() {
  const [ok, setOk] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const { register, handleSubmit, formState: { errors } } = useForm<InfoForm>()
  if (ok) return <SuccessMsg />
  return (
    <form onSubmit={handleSubmit(() => setOk(true))} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Nom *" error={errors.nom?.message}><input {...register('nom', { required: 'Requis' })} className={inp} /></Field>
        <Field label="Email *" error={errors.email?.message}><input {...register('email', { required: 'Requis', pattern: { value: /\S+@\S+\.\S+/, message: 'Email invalide' } })} type="email" className={inp} /></Field>
      </div>
      <Field label="Sujet de votre demande *" error={errors.sujet?.message}><input {...register('sujet', { required: 'Requis' })} className={inp} placeholder="Ex : Avantages fiscaux ZES Kinsevere" /></Field>
      <Field label="Votre question *" error={errors.message?.message}><textarea {...register('message', { required: 'Requis' })} rows={5} className={inp} /></Field>
      <FileUpload label="Documents joints (optionnel)" hint="Joignez tout document pertinent — PDF, DOC, images — Max 10 Mo" onChange={setFiles} />
      <SubmitBtn label="Envoyer ma demande" />
    </form>
  )
}

function SuiviForm() {
  const [ref, setRef] = useState('')
  const [result, setResult] = useState<null | 'found' | 'notfound'>(null)
  return (
    <div className="space-y-5">
      <div className="flex gap-3">
        <input value={ref} onChange={e => setRef(e.target.value)} className={`${inp} flex-1`} placeholder="Ex : AZES-2026-00123" />
        <button onClick={() => setResult(ref.length > 5 ? 'found' : 'notfound')}
          className="px-6 py-3 bg-[#6B48A0] text-white font-semibold rounded-xl hover:bg-[#5a3d88] transition-colors text-sm">
          Vérifier
        </button>
      </div>
      <AnimatePresence>
        {result === 'found' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="bg-[#2A7A4B]/10 border border-[#2A7A4B]/30 rounded-xl p-5">
            <div className="font-bold text-[#2A7A4B] mb-2">Dossier trouvé ✓</div>
            <div className="text-sm text-gray-700 space-y-1">
              <div>Référence : <strong className="text-[#0A2342]">{ref}</strong></div>
              <div>Statut : <strong className="text-[#0A2342]">En cours d'instruction</strong></div>
              <div>Étape actuelle : Vérification des documents (étape 2/4)</div>
              <div>Prochaine action : Entretien technique prévu le 15 juin 2026</div>
            </div>
          </motion.div>
        )}
        {result === 'notfound' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="bg-red-50 border border-red-200 rounded-xl p-5 text-sm text-red-600">
            Aucun dossier trouvé. Vérifiez votre numéro ou contactez le Guichet Unique.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DossierStepper() {
  const [step, setStep] = useState(0)
  const [files, setFiles] = useState<File[]>([])
  const steps = ['Informations', 'Documents', 'Vérification', 'Confirmation']

  return (
    <div>
      {/* Progress steps */}
      <div className="flex gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex-1 text-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1.5 text-sm font-bold transition-all ${
              i < step ? 'bg-[#2A7A4B] text-white' : i === step ? 'bg-[#C4894A] text-white' : 'bg-gray-200 text-gray-400'
            }`}>
              {i < step ? <CheckCircleIcon className="w-5 h-5" /> : i + 1}
            </div>
            <div className={`text-xs font-medium transition-colors ${i <= step ? 'text-gray-700' : 'text-gray-400'}`}>{s}</div>
          </div>
        ))}
      </div>

      <div className="mb-6">
        {step === 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Nom de la société *"><input className={inp} placeholder="Ma Société SARL" /></Field>
              <Field label="Secteur d'activité *">
                <select className={inp}>
                  <option value="">Choisir...</option>
                  {['Mines', 'Agriculture', 'Industrie', 'Logistique', 'Technologie'].map(s => <option key={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="Zone souhaitée *">
                <select className={inp}>
                  <option value="">Choisir...</option>
                  {zones.map(z => <option key={z}>{z}</option>)}
                </select>
              </Field>
              <Field label="Capital social"><input className={inp} placeholder="Ex : $5 000 000" /></Field>
            </div>
            <Field label="Description du projet *">
              <textarea rows={4} className={inp} placeholder="Décrivez votre projet d'investissement, vos objectifs et votre plan de développement..." />
            </Field>
          </div>
        )}
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">Veuillez joindre tous les documents requis pour l'instruction de votre dossier.</p>
            <FileUpload label="Documents du dossier" hint="Statuts d'entreprise, plan d'affaires, bilans financiers — PDF, DOC, XLS, ZIP — Max 10 Mo" onChange={setFiles} multiple />
            <div className="bg-[#1B4F8C]/10 border border-[#1B4F8C]/20 rounded-xl p-4 text-sm text-gray-700">
              <strong className="text-[#0A2342]">Documents requis :</strong>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-600">
                <li>Statuts de la société (PDF)</li>
                <li>Plan d'affaires (PDF ou DOCX)</li>
                <li>Bilans financiers des 3 dernières années</li>
                <li>Références professionnelles</li>
              </ul>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-sm text-gray-700 space-y-3">
            <h3 className="font-semibold text-[#0A2342] mb-4">Résumé de votre dossier</h3>
            <div className="grid grid-cols-2 gap-3">
              <div><span className="text-gray-500">Fichiers joints :</span> <strong className="text-[#0A2342]">{files.length} fichier(s)</strong></div>
              <div><span className="text-gray-500">Statut :</span> <strong className="text-[#2A7A4B]">Prêt à soumettre</strong></div>
            </div>
            <p className="text-gray-400 text-xs pt-2">Vérifiez vos informations avant de soumettre définitivement votre dossier.</p>
          </div>
        )}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-[#2A7A4B]/10 border border-[#2A7A4B]/30 rounded-xl p-8 text-center">
            <CheckCircleIcon className="w-14 h-14 text-[#2A7A4B] mx-auto mb-4" />
            <h3 className="font-bold text-[#0A2342] text-lg mb-2">Dossier soumis avec succès !</h3>
            <p className="text-gray-600 text-sm mb-3">Référence : <strong className="text-[#0A2342]">AZES-2026-{Math.floor(Math.random() * 90000) + 10000}</strong></p>
            <p className="text-gray-400 text-xs">Notre équipe reviendra vers vous dans les 5 jours ouvrés.</p>
          </motion.div>
        )}
      </div>

      <div className="flex justify-between">
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0 || step === 3}
          className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-xl text-sm font-medium disabled:opacity-30 hover:bg-gray-50 text-gray-600 transition-colors">
          <ArrowLeftIcon className="w-4 h-4" /> Précédent
        </button>
        {step < 3 ? (
          <button onClick={() => setStep(s => s + 1)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#1B4F8C] text-white rounded-xl text-sm font-semibold hover:bg-[#163d6e] transition-colors">
            {step === 2 ? 'Soumettre' : 'Suivant'} <ArrowRightIcon className="w-4 h-4" />
          </button>
        ) : (
          <Link href="/" className="flex items-center gap-2 px-5 py-2.5 bg-[#2A7A4B] text-white rounded-xl text-sm font-semibold">
            <CheckCircleIcon className="w-4 h-4" /> Terminer
          </Link>
        )}
      </div>
    </div>
  )
}

function RdvForm() {
  const [ok, setOk] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<RdvForm>()
  if (ok) return <SuccessMsg />
  return (
    <form onSubmit={handleSubmit(() => setOk(true))} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Nom complet *" error={errors.nom?.message}><input {...register('nom', { required: 'Requis' })} className={inp} /></Field>
        <Field label="Email *" error={errors.email?.message}><input {...register('email', { required: 'Requis' })} type="email" className={inp} /></Field>
        <Field label="Téléphone"><input {...register('telephone')} type="tel" className={inp} /></Field>
        <Field label="Date souhaitée *" error={errors.date?.message}><input {...register('date', { required: 'Requis' })} type="date" className={inp} min={new Date().toISOString().split('T')[0]} /></Field>
        <Field label="Heure souhaitée">
          <select {...register('heure')} className={inp}>
            {['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'].map(h => <option key={h}>{h}</option>)}
          </select>
        </Field>
        <Field label="Motif du rendez-vous *" error={errors.motif?.message}>
          <select {...register('motif', { required: 'Requis' })} className={inp}>
            <option value="">Choisir...</option>
            {["Information générale", "Demande d'agrément", 'Suivi de dossier', 'Partenariat', 'Recrutement'].map(m => <option key={m}>{m}</option>)}
          </select>
        </Field>
      </div>
      <SubmitBtn label="Confirmer mon rendez-vous" />
    </form>
  )
}

export default function DemarchesPage() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeDemarche = demarches.find(d => d.id === activeId)

  return (
    <div className="min-h-screen">
      <DarkPageHero
        eyebrow="Services en ligne"
        title="Démarches"
        titleAccent="en ligne"
        subtitle="Effectuez toutes vos démarches administratives directement en ligne. Soumettez vos documents, suivez vos dossiers et prenez rendez-vous en quelques clics."
        variant={2}
        accentColor="#1B4F8C"
      />

      <LightSection className="py-20" image="infra">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {!activeId ? (
              <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.div {...fadeUp} className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 text-[#1B4F8C] text-xs font-bold uppercase tracking-widest mb-3">
                    <span className="w-6 h-px bg-[#1B4F8C]/60" /> Choisissez votre démarche <span className="w-6 h-px bg-[#1B4F8C]/60" />
                  </div>
                  <h2 className="text-3xl font-bold text-[#0A2342]">Que souhaitez-vous faire ?</h2>
                  <p className="text-gray-500 mt-3 text-sm">Cliquez sur la démarche correspondant à votre besoin.</p>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {demarches.map((d, i) => (
                    <motion.button
                      key={d.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      onClick={() => d.id === 'formulaires' ? window.open('/documents', '_self') : setActiveId(d.id)}
                      className="group text-left relative bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${d.color}, transparent)` }} />
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: `${d.color}15`, border: `1px solid ${d.color}25` }}>
                        <d.icon className="w-6 h-6" style={{ color: d.color }} />
                      </div>
                      <h3 className="font-bold text-[#0A2342] mb-2 group-hover:text-[#1B4F8C] transition-colors text-sm">{d.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{d.desc}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="detail" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="max-w-2xl mx-auto">
                <button onClick={() => setActiveId(null)}
                  className="flex items-center gap-2 text-gray-500 hover:text-[#0A2342] text-sm font-medium mb-8 transition-colors">
                  <ArrowLeftIcon className="w-4 h-4" /> Retour aux démarches
                </button>
                <div className="relative bg-white border border-gray-200 rounded-2xl p-8 overflow-hidden shadow-sm">
                  <div className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ background: `linear-gradient(90deg, ${activeDemarche?.color ?? '#C4894A'}, transparent)` }} />
                  <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                    {activeDemarche && (
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${activeDemarche.color}15`, border: `1px solid ${activeDemarche.color}25` }}>
                        <activeDemarche.icon className="w-6 h-6" style={{ color: activeDemarche.color }} />
                      </div>
                    )}
                    <div>
                      <h2 className="text-xl font-bold text-[#0A2342]">{activeDemarche?.title}</h2>
                      <p className="text-sm text-gray-500">{activeDemarche?.desc}</p>
                    </div>
                  </div>
                  {activeId === 'interet' && <ManifestationForm />}
                  {activeId === 'info' && <DemandeInfoForm />}
                  {activeId === 'dossier' && <DossierStepper />}
                  {activeId === 'suivi' && <SuiviForm />}
                  {activeId === 'guichet' && (
                    <div className="space-y-4 text-sm">
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-3 text-gray-700">
                        <div><span className="font-semibold text-[#0A2342]">Téléphone :</span> <a href="tel:+243812345678" className="text-[#C4894A] hover:underline">+243 81 234 5678</a></div>
                        <div><span className="font-semibold text-[#0A2342]">Email :</span> <a href="mailto:guichet@azes.cd" className="text-[#C4894A] hover:underline">guichet@azes.cd</a></div>
                        <div><span className="font-semibold text-[#0A2342]">Horaires :</span> Lun–Ven 08h00–17h00</div>
                        <div><span className="font-semibold text-[#0A2342]">Adresse :</span> Boulevard du 30 Juin, Gombe, Kinshasa</div>
                      </div>
                      <Link href="/guichet-unique" className="block w-full py-3 bg-[#8B5E3C] text-white text-sm font-semibold rounded-xl text-center hover:bg-[#7a5133] transition-colors">
                        Voir la page Guichet Unique →
                      </Link>
                    </div>
                  )}
                  {activeId === 'rdv' && <RdvForm />}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </LightSection>
    </div>
  )
}
