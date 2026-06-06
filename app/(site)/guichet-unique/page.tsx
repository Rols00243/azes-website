'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import {
  UserCircleIcon, DocumentCheckIcon, ClipboardDocumentListIcon,
  CheckBadgeIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon,
  CalendarDaysIcon, CheckCircleIcon, ChevronDownIcon,
} from '@heroicons/react/24/outline'
import DarkPageHero from '@/components/ui/DarkPageHero'

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.55 } }

const etapes = [
  { icon: UserCircleIcon, num: '01', titre: 'Prise de contact', desc: "Contactez notre guichet ou soumettez votre manifestation d'intérêt en ligne. Un expert vous est assigné.", color: '#C4894A' },
  { icon: DocumentCheckIcon, num: '02', titre: 'Dépôt du dossier', desc: 'Préparez et déposez votre dossier complet selon la checklist fournie par votre expert dédié.', color: '#1B4F8C' },
  { icon: ClipboardDocumentListIcon, num: '03', titre: 'Instruction', desc: 'Votre dossier est instruit par les services compétents. Délai : 15 jours ouvrés maximum.', color: '#2A7A4B' },
  { icon: CheckBadgeIcon, num: '04', titre: 'Agrément & Installation', desc: "Obtention de votre agrément ZES et accompagnement dans les démarches d'installation.", color: '#8B5E3C' },
]

const faqs = [
  { q: "Quels sont les délais d'obtention d'un agrément ZES ?", r: "Le délai légal est de 15 jours ouvrés à compter du dépôt du dossier complet. En pratique, les dossiers sont traités en 10 jours ouvrés en moyenne." },
  { q: "Quels documents sont nécessaires pour une manifestation d'intérêt ?", r: "Pour une première prise de contact : lettre de présentation, statuts de la société, plan d'affaires sommaire (2-3 pages). Le dossier complet est demandé uniquement après validation de la faisabilité." },
  { q: "Le Guichet Unique gère-t-il toutes les démarches administratives ?", r: "Oui, le Guichet Unique est votre interlocuteur unique pour l'ensemble des démarches : agrément AZES, registre de commerce, douanes, fiscalité ZES, travail et sécurité sociale." },
  { q: "Y a-t-il des frais pour les services du Guichet Unique ?", r: "L'accompagnement initial et les consultations sont gratuits. Des frais d'instruction sont appliqués lors du dépôt formel du dossier d'agrément (tarifs disponibles sur demande)." },
  { q: "Puis-je investir dans plusieurs zones simultanément ?", r: "Oui, il est possible d'obtenir des agréments dans plusieurs ZES. Chaque zone fait l'objet d'une convention distincte mais les démarches peuvent être initiées simultanément." },
]

interface ContactForm { nom: string; email: string; message: string }
const inp = "w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#8B5E3C] focus:bg-white transition-all"
const lbl = "block text-sm font-semibold text-gray-700 mb-1.5"

export default function GuichetUniquePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [success, setSuccess] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<ContactForm>()

  return (
    <div className="bg-gray-50 min-h-screen">
      <DarkPageHero
        eyebrow="Service prioritaire"
        title="Le Guichet"
        titleAccent="Unique"
        subtitle="Votre porte d'entrée unique pour toutes les démarches d'investissement dans les Zones Économiques Spéciales de la RDC. Un interlocuteur. Toutes vos démarches."
        variant={1}
        accentColor="#8B5E3C"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/demarches#rdv" className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#8B5E3C] text-white font-semibold rounded-xl hover:bg-[#7a5133] transition-all hover:scale-105 active:scale-95">
            <CalendarDaysIcon className="w-5 h-5" /> Prendre RDV
          </Link>
          <Link href="/demarches#interet" className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all hover:scale-105">
            Manifester mon intérêt
          </Link>
        </div>
      </DarkPageHero>

      {/* ── Coordonnées ── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: PhoneIcon, label: 'Téléphone', value: '+243 81 234 5678', href: 'tel:+243812345678' },
              { icon: EnvelopeIcon, label: 'Email', value: 'guichet@azes.cd', href: 'mailto:guichet@azes.cd' },
              { icon: MapPinIcon, label: 'Adresse', value: 'Bvd du 30 Juin, Gombe, Kinshasa', href: '#' },
              { icon: ClockIcon, label: 'Horaires', value: 'Lun–Ven : 08h–17h', href: '#' },
            ].map((c, i) => (
              <motion.a key={c.label} href={c.href}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-md transition-all group">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: '#8B5E3C15', border: '1px solid #8B5E3C25' }}>
                  <c.icon className="w-5 h-5 text-[#8B5E3C]" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{c.label}</div>
                  <div className="font-semibold text-gray-800 text-sm mt-0.5">{c.value}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Processus en 4 étapes ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-[#8B5E3C] text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-6 h-px bg-[#8B5E3C]/60" /> Comment ça marche <span className="w-6 h-px bg-[#8B5E3C]/60" />
            </div>
            <h2 className="text-3xl font-bold text-[#0A2342]">Processus en 4 étapes</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(139,94,60,0.25) 20%, rgba(139,94,60,0.25) 80%, transparent)' }} />
            {etapes.map((e, i) => (
              <motion.div
                key={e.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative group bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-300 hover:shadow-md transition-all overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${e.color}, transparent)` }} />
                <div className="text-5xl font-bold mb-4 leading-none" style={{ color: `${e.color}25` }}>{e.num}</div>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${e.color}15`, border: `1px solid ${e.color}25` }}>
                  <e.icon className="w-5 h-5" style={{ color: e.color }} />
                </div>
                <h3 className="font-bold text-[#0A2342] mb-2">{e.titre}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{e.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ + Formulaire ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* FAQ */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 text-[#8B5E3C] text-xs font-bold uppercase tracking-widest mb-3">
                <span className="w-6 h-px bg-[#8B5E3C]/60" /> FAQ
              </div>
              <h2 className="text-3xl font-bold text-[#0A2342] mb-8">Questions fréquentes</h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-all">
                    <button
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                    >
                      <span className="font-semibold text-gray-800 text-sm pr-4">{faq.q}</span>
                      <ChevronDownIcon className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                            {faq.r}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Formulaire */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 text-[#8B5E3C] text-xs font-bold uppercase tracking-widest mb-3">
                <span className="w-6 h-px bg-[#8B5E3C]/60" /> Contact direct
              </div>
              <h2 className="text-3xl font-bold text-[#0A2342] mb-4">Contactez-nous</h2>
              <p className="text-gray-500 mb-8 text-sm">Réponse garantie dans les 48 heures ouvrées.</p>

              {success ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#2A7A4B]/10 border border-[#2A7A4B]/30 rounded-2xl p-10 text-center">
                  <CheckCircleIcon className="w-12 h-12 text-[#2A7A4B] mx-auto mb-3" />
                  <div className="font-bold text-[#0A2342] mb-1">Message envoyé !</div>
                  <div className="text-sm text-gray-500">Réponse sous 48h ouvrées.</div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(() => setSuccess(true))} className="bg-white border border-gray-200 rounded-2xl p-8 space-y-5">
                  <div>
                    <label className={lbl}>Nom *</label>
                    <input {...register('nom', { required: 'Requis' })} className={inp} placeholder="Votre nom" />
                    {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom.message}</p>}
                  </div>
                  <div>
                    <label className={lbl}>Email *</label>
                    <input {...register('email', { required: 'Requis', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalide' } })} type="email" className={inp} placeholder="votre@email.com" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className={lbl}>Votre question *</label>
                    <textarea {...register('message', { required: 'Requis' })} rows={5} className={inp + ' resize-none'} placeholder="Comment pouvons-nous vous aider ?" />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>
                  <button type="submit" className="w-full py-3.5 bg-[#8B5E3C] text-white font-semibold rounded-xl hover:bg-[#7a5133] transition-all hover:scale-[1.01] active:scale-95">
                    Envoyer ma question
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
