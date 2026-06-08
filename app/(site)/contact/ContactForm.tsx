'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PhoneIcon, EnvelopeIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

interface FormData { nom: string; email: string; telephone: string; sujet: string; message: string }
const EMPTY: FormData = { nom: '', email: '', telephone: '', sujet: '', message: '' }
const SUJETS = ['Investissement', 'Partenariat', 'Emploi', 'Presse & Médias', 'Information générale', 'Autre']

const inp = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#1B4F8C] focus:bg-white transition-all"
const lbl = "block text-sm font-semibold text-gray-700 mb-1.5"
const err = "text-red-500 text-xs mt-1"

export default function ContactForm() {
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

      {/* Formulaire */}
      <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <div className="inline-flex items-center gap-2 text-[#1E7A9E] text-xs font-bold uppercase tracking-widest mb-3">
          <span className="w-6 h-px bg-[#1E7A9E]/60" /> Message
        </div>
        <h2 className="text-3xl font-bold text-[#0A2342] mb-2">Envoyez-nous un message</h2>
        <p className="text-gray-500 mb-8 text-sm">Réponse garantie dans les 48 heures ouvrées.</p>

        {success ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
            <CheckCircleIcon className="w-14 h-14 text-[#2A7A4B] mx-auto mb-4" />
            <h3 className="font-bold text-[#0A2342] text-xl mb-2">Message envoyé !</h3>
            <p className="text-gray-500 text-sm">Nous vous répondrons dans les 48h ouvrées.</p>
            <button onClick={() => setSuccess(false)} className="mt-4 text-sm text-[#2A7A4B] hover:text-[#1a5c35] transition-colors underline underline-offset-2">
              Envoyer un autre message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={submit} className="space-y-5 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
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
              <select value={form.sujet} onChange={e => set('sujet', e.target.value)} className={inp}>
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
        <div className="relative bg-white border border-[#1B4F8C]/20 rounded-2xl p-8 overflow-hidden hover:border-[#1B4F8C]/40 hover:shadow-md transition-all">
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, #1B4F8C, transparent)' }} />
          <h3 className="font-bold text-[#0A2342] text-xl mb-4">Guichet Unique</h3>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">Pour les demandes d'agrément, d'investissement et d'accompagnement, contactez directement notre Guichet Unique.</p>
          <div className="space-y-3 text-sm mb-6">
            <div className="flex gap-2.5 text-gray-600"><PhoneIcon className="w-4 h-4 text-[#C4894A]" /><a href="tel:+243812345678" className="hover:text-[#0A2342] transition-colors">+243 81 234 5678</a></div>
            <div className="flex gap-2.5 text-gray-600"><EnvelopeIcon className="w-4 h-4 text-[#C4894A]" /><a href="mailto:guichet@azes.cd" className="hover:text-[#0A2342] transition-colors">guichet@azes.cd</a></div>
            <div className="flex gap-2.5 text-gray-500"><ClockIcon className="w-4 h-4 text-[#C4894A]" />Lun–Ven 08h00–17h00</div>
          </div>
        </div>
        <div className="relative bg-white border border-gray-200 rounded-2xl p-6 overflow-hidden hover:border-gray-300 hover:shadow-md transition-all">
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, #C4894A, transparent)' }} />
          <h3 className="font-bold text-[#0A2342] mb-3">Presse &amp; Médias</h3>
          <p className="text-sm text-gray-500 mb-4">Pour toute demande presse, interview ou accréditation :</p>
          <a href="mailto:presse@azes.cd" className="flex items-center gap-2 text-[#C4894A] font-semibold text-sm hover:text-[#a87540] transition-colors">
            <EnvelopeIcon className="w-4 h-4" /> presse@azes.cd
          </a>
        </div>
        <div className="relative bg-white border border-gray-200 rounded-2xl p-6 overflow-hidden hover:border-gray-300 hover:shadow-md transition-all">
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, #2A7A4B, transparent)' }} />
          <h3 className="font-bold text-[#0A2342] mb-3">Suivez-nous</h3>
          <p className="text-sm text-gray-500 mb-4">Restez informé de l'actualité des ZES de la RDC.</p>
          <div className="flex gap-3">
            {['Twitter / X', 'LinkedIn', 'Facebook'].map((s) => (
              <span key={s} className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-200 cursor-pointer transition-colors">{s}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
