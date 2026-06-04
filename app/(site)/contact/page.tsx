'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import DarkPageHero from '@/components/ui/DarkPageHero'

interface FormData { nom: string; email: string; telephone: string; sujet: string; message: string }
const EMPTY: FormData = { nom: '', email: '', telephone: '', sujet: '', message: '' }
const SUJETS = ['Investissement', 'Partenariat', 'Emploi', 'Presse & Médias', 'Information générale', 'Autre']

const bureaux = [
  { ville: 'Kinshasa (Siège)', adresse: 'Boulevard du 30 Juin, Immeuble AZES, Gombe', tel: '+243 81 234 5678', email: 'info@azes.cd', horaires: 'Lun–Ven 08h–17h', color: '#1B4F8C' },
  { ville: 'Matadi', adresse: "Avenue de l'Indépendance, Zone Franche", tel: '+243 81 234 5679', email: 'matadi@azes.cd', horaires: 'Lun–Ven 08h–17h', color: '#2A7A4B' },
  { ville: 'Lubumbashi', adresse: 'Boulevard Moïse Tshombe, Zone Minière', tel: '+243 81 234 5680', email: 'lubumbashi@azes.cd', horaires: 'Lun–Ven 08h–17h', color: '#C4894A' },
]

const inp = "w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#1E7A9E]/60 focus:bg-white/[0.09] transition-all"
const lbl = "block text-sm font-semibold text-white/60 mb-1.5"
const err = "text-red-400 text-xs mt-1"

export default function ContactPage() {
  const [form, setForm] = useState<FormData>(EMPTY)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [success, setSuccess] = useState(false)
  const [sending, setSending] = useState(false)

  function set(k: keyof FormData, v: string) {
    setForm((f) => ({ ...f, [k]: v }))
    setErrors((e) => ({ ...e, [k]: '' }))
  }

  function validate(): boolean {
    const e: Partial<FormData> = {}
    if (!form.nom.trim()) e.nom = 'Requis'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email invalide'
    if (!form.sujet) e.sujet = 'Requis'
    if (!form.message.trim()) e.message = 'Requis'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSending(true)
    try {
      await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      setSuccess(true)
      setForm(EMPTY)
    } finally { setSending(false) }
  }

  return (
    <div className="bg-[#040810] min-h-screen">
      <DarkPageHero
        eyebrow="Nous contacter"
        title="Contact &"
        titleAccent="Bureaux"
        subtitle="Notre équipe est à votre disposition pour répondre à toutes vos questions concernant les ZES de la RDC."
        variant={3}
        accentColor="#1E7A9E"
      />

      {/* ── Bureaux ── */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#071d30]" />
        <div className="absolute inset-0 opacity-[0.12]"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1400&q=50')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute" style={{ inset: 0, background: 'radial-gradient(ellipse 75% 110% at -5% 55%, rgba(30,122,158,0.24) 0%, rgba(30,122,158,0.08) 45%, transparent 65%)' }} />
        </div>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-[#1E7A9E]/25 via-white/10 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <div className="inline-flex items-center gap-2 text-[#1E7A9E] text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-6 h-px bg-[#1E7A9E]/60" /> Nos bureaux
            </div>
            <h2 className="text-3xl font-bold text-white">Où nous trouver</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bureaux.map((b, i) => (
              <motion.div
                key={b.ville}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-white/[0.07] border border-white/[0.12] rounded-2xl p-6 hover:border-white/25 hover:bg-white/[0.10] transition-all overflow-hidden group"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${b.color}, transparent)` }} />
                <h3 className="font-bold text-white mb-4">{b.ville}</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-2.5 text-white/50"><MapPinIcon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: b.color }} />{b.adresse}</div>
                  <div className="flex gap-2.5"><PhoneIcon className="w-4 h-4 flex-shrink-0" style={{ color: b.color }} /><a href={`tel:${b.tel}`} className="text-white/50 hover:text-white transition-colors">{b.tel}</a></div>
                  <div className="flex gap-2.5"><EnvelopeIcon className="w-4 h-4 flex-shrink-0" style={{ color: b.color }} /><a href={`mailto:${b.email}`} className="text-white/50 hover:text-white transition-colors">{b.email}</a></div>
                  <div className="flex gap-2.5 text-white/50"><ClockIcon className="w-4 h-4 flex-shrink-0" style={{ color: b.color }} />{b.horaires}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Formulaire + Infos ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#040810]" />
        <div className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=50')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-[500px] h-[400px]"
            style={{ background: 'radial-gradient(ellipse at right bottom, rgba(30,122,158,0.10) 0%, transparent 65%)' }} />
        </div>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Formulaire */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 text-[#1E7A9E] text-xs font-bold uppercase tracking-widest mb-3">
                <span className="w-6 h-px bg-[#1E7A9E]/60" /> Message
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Envoyez-nous un message</h2>
              <p className="text-white/45 mb-8 text-sm">Réponse garantie dans les 48 heures ouvrées.</p>

              {success ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#2A7A4B]/15 border border-[#2A7A4B]/30 rounded-2xl p-10 text-center">
                  <CheckCircleIcon className="w-14 h-14 text-[#2A7A4B] mx-auto mb-4" />
                  <h3 className="font-bold text-white text-xl mb-2">Message envoyé !</h3>
                  <p className="text-white/50 text-sm">Nous vous répondrons dans les 48h ouvrées.</p>
                  <button onClick={() => setSuccess(false)} className="mt-4 text-sm text-[#2A7A4B] hover:text-white transition-colors underline underline-offset-2">
                    Envoyer un autre message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={lbl}>Nom complet *</label>
                      <input value={form.nom} onChange={e => set('nom', e.target.value)} className={inp} placeholder="Jean Dupont" />
                      {errors.nom && <p className={err}>{errors.nom}</p>}
                    </div>
                    <div>
                      <label className={lbl}>Email *</label>
                      <input type="email" value={form.email} onChange={e => set('email', e.target.value)} className={inp} placeholder="vous@exemple.com" />
                      {errors.email && <p className={err}>{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label className={lbl}>Téléphone</label>
                    <input type="tel" value={form.telephone} onChange={e => set('telephone', e.target.value)} className={inp} placeholder="+243 …" />
                  </div>
                  <div>
                    <label className={lbl}>Sujet *</label>
                    <select value={form.sujet} onChange={e => set('sujet', e.target.value)}
                      className={inp + ' [&>option]:bg-[#0a1628]'}>
                      <option value="">Sélectionnez un sujet</option>
                      {SUJETS.map(s => <option key={s}>{s}</option>)}
                    </select>
                    {errors.sujet && <p className={err}>{errors.sujet}</p>}
                  </div>
                  <div>
                    <label className={lbl}>Message *</label>
                    <textarea value={form.message} onChange={e => set('message', e.target.value)} rows={6} className={inp + ' resize-none'} placeholder="Votre message…" />
                    {errors.message && <p className={err}>{errors.message}</p>}
                  </div>
                  <button type="submit" disabled={sending}
                    className="w-full py-3.5 bg-[#1E7A9E] text-white font-semibold rounded-xl hover:bg-[#186a8a] transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-60">
                    {sending ? 'Envoi en cours…' : 'Envoyer le message'}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Infos complémentaires */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-5">
              {/* Guichet Unique */}
              <div className="relative bg-white/[0.06] border border-[#1B4F8C]/30 rounded-2xl p-8 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, #1B4F8C, transparent)' }} />
                <div className="absolute inset-0 opacity-[0.04]" style={{ background: 'radial-gradient(ellipse at 0% 0%, #1B4F8C 0%, transparent 60%)' }} />
                <div className="relative">
                  <h3 className="font-bold text-white text-xl mb-4">Guichet Unique</h3>
                  <p className="text-white/50 text-sm mb-6 leading-relaxed">Pour les demandes d'agrément, d'investissement et d'accompagnement, contactez directement notre Guichet Unique.</p>
                  <div className="space-y-3 text-sm mb-6">
                    <div className="flex gap-2.5 text-white/50"><PhoneIcon className="w-4 h-4 text-[#C4894A]" /><a href="tel:+243812345678" className="hover:text-white transition-colors">+243 81 234 5678</a></div>
                    <div className="flex gap-2.5 text-white/50"><EnvelopeIcon className="w-4 h-4 text-[#C4894A]" /><a href="mailto:guichet@azes.cd" className="hover:text-white transition-colors">guichet@azes.cd</a></div>
                    <div className="flex gap-2.5 text-white/50"><ClockIcon className="w-4 h-4 text-[#C4894A]" />Lun–Ven 08h00–17h00</div>
                  </div>
                </div>
              </div>

              {/* Presse */}
              <div className="relative bg-white/[0.05] border border-white/[0.10] rounded-2xl p-6 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, #C4894A, transparent)' }} />
                <h3 className="font-bold text-white mb-3">Presse &amp; Médias</h3>
                <p className="text-sm text-white/45 mb-4">Pour toute demande presse, interview ou accréditation :</p>
                <a href="mailto:presse@azes.cd" className="flex items-center gap-2 text-[#C4894A] font-semibold text-sm hover:text-[#a87540] transition-colors">
                  <EnvelopeIcon className="w-4 h-4" /> presse@azes.cd
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
