'use client'

import { useState } from 'react'
import type { CompteEmail } from '@/lib/server-data'
import {
  TrashIcon, PlusIcon, PencilSquareIcon, CheckIcon, XMarkIcon,
  ClipboardDocumentIcon, EnvelopeIcon, KeyIcon, UserCircleIcon,
} from '@heroicons/react/24/outline'

const ROLES: CompteEmail['role'][] = ['Agent', 'Cadre', 'Directeur', 'Consultant']
const DEPARTEMENTS = [
  'Direction Générale',
  'Direction Juridique',
  'Direction Administrative et Financière',
  'Direction Technique',
  'Cellule Informatique (Direction Technique)',
  'Guichet Unique de Maluku',
  'Guichet Unique de Lubumbashi',
  'Guichet Unique de Matadi',
  'Guichet Unique du Kasaï',
]

const ROLE_COLORS: Record<CompteEmail['role'], string> = {
  Directeur:  'bg-purple-50 text-purple-700 border-purple-200',
  Cadre:      'bg-blue-50 text-blue-700 border-blue-200',
  Agent:      'bg-green-50 text-green-700 border-green-200',
  Consultant: 'bg-amber-50 text-amber-700 border-amber-200',
}

export default function EmailsForm({ initialItems }: { initialItems: CompteEmail[] }) {
  const emptyForm = {
    prenom: '', nom: '', role: 'Agent' as CompteEmail['role'],
    departement: DEPARTEMENTS[0], actif: true, motDePasse: '',
  }

  const [items, setItems] = useState(initialItems)
  const [form, setForm] = useState(emptyForm)
  const [adding, setAdding] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<CompteEmail | null>(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [copied, setCopied] = useState<string | null>(null)
  const [revealed, setRevealed] = useState<Set<string>>(new Set())

  function flash(m: string) { setMsg(m); setTimeout(() => setMsg(''), 3500) }
  function setField(k: keyof typeof emptyForm, v: string | boolean) { setForm(f => ({ ...f, [k]: v })) }
  function setEditField(k: keyof CompteEmail, v: string | boolean) { setEditForm(f => f ? ({ ...f, [k]: v }) : f) }

  function copyText(text: string, key: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  function toggleReveal(id: string) {
    setRevealed(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function copyCredentials(item: CompteEmail) {
    const text = `Adresse : ${item.adresse}\nMot de passe : ${item.motDePasse}\nServeur IMAP : mail.azes.cd:993\nServeur SMTP : mail.azes.cd:587`
    copyText(text, `creds-${item.id}`)
  }

  async function create() {
    if (!form.prenom || !form.nom) return
    setSaving(true)
    const res = await fetch('/api/admin/emails', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
    })
    const data = await res.json()
    setItems([data.item, ...items])
    setForm(emptyForm); setAdding(false)
    flash(`✓ Compte créé : ${data.item.adresse}`)
    setSaving(false)
  }

  async function saveEdit() {
    if (!editForm) return
    setSaving(true)
    await fetch('/api/admin/emails', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editForm),
    })
    setItems(items.map(e => e.id === editForm.id ? editForm : e))
    setEditId(null); setEditForm(null)
    flash('✓ Compte mis à jour !')
    setSaving(false)
  }

  async function toggleActif(item: CompteEmail) {
    const updated = { ...item, actif: !item.actif }
    await fetch('/api/admin/emails', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updated),
    })
    setItems(items.map(e => e.id === item.id ? updated : e))
    flash(updated.actif ? `✓ Compte ${item.adresse} réactivé` : `✓ Compte ${item.adresse} désactivé`)
  }

  async function remove(id: string) {
    if (!confirm('Supprimer définitivement ce compte ?')) return
    await fetch('/api/admin/emails', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }),
    })
    setItems(items.filter(e => e.id !== id))
    flash('✓ Compte supprimé')
  }

  const actifs = items.filter(e => e.actif).length
  const inactifs = items.filter(e => !e.actif).length

  return (
    <div className="space-y-4">
      {msg && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl px-4 py-3 text-sm font-medium">
          {msg}
        </div>
      )}

      {/* Stats band */}
      {items.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Total comptes', val: items.length, color: 'text-gray-700' },
            { label: 'Actifs', val: actifs, color: 'text-green-600' },
            { label: 'Désactivés', val: inactifs, color: 'text-red-500' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <div className={`text-2xl font-bold ${s.color}`}>{s.val}</div>
              <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Bouton créer */}
      {!adding ? (
        <button onClick={() => setAdding(true)}
          className="w-full flex items-center justify-center gap-2 bg-[#0A2342] text-white rounded-xl py-3.5 font-semibold hover:bg-[#1B4F8C] transition-colors">
          <PlusIcon className="w-5 h-5" /> Créer un compte email professionnel
        </button>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <EnvelopeIcon className="w-5 h-5 text-[#1B4F8C]" />
            Nouveau compte @azes.cd
          </h2>
          <EmailFields form={form} setField={setField as (k: string, v: string | boolean) => void} showPassword />
          <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-sm text-blue-700">
            L'adresse sera générée automatiquement : <strong>prenom.nom@azes.cd</strong>
            {!form.motDePasse && <><br/>Si le mot de passe est laissé vide, un mot de passe sécurisé sera généré automatiquement.</>}
          </div>
          <div className="flex gap-3 pt-1">
            <button onClick={create} disabled={saving || !form.prenom || !form.nom}
              className="flex-1 bg-[#0A2342] text-white rounded-xl py-3 font-semibold hover:bg-[#1B4F8C] transition-colors disabled:opacity-50">
              {saving ? 'Création…' : 'Créer le compte'}
            </button>
            <button onClick={() => { setAdding(false); setForm(emptyForm) }}
              className="px-5 rounded-xl border-2 border-gray-200 text-gray-600 hover:border-gray-300 transition-colors font-medium">
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Liste comptes */}
      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <UserCircleIcon className="w-12 h-12 mx-auto text-gray-200 mb-3" />
          <p className="text-gray-400 text-sm">Aucun compte créé pour l'instant.</p>
          <p className="text-gray-300 text-xs mt-1">Cliquez sur le bouton ci-dessus pour commencer.</p>
        </div>
      ) : items.map(item => (
        <div key={item.id}
          className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${
            item.actif ? 'border-gray-100' : 'border-gray-100 opacity-60'
          }`}>
          {editId === item.id && editForm ? (
            <div className="p-5 space-y-4">
              <h3 className="font-semibold text-gray-900">Modifier le compte</h3>
              <EmailFields
                form={{ prenom: editForm.prenom, nom: editForm.nom, role: editForm.role, departement: editForm.departement, actif: editForm.actif }}
                setField={(k, v) => setEditField(k as keyof CompteEmail, v)}
                editMode
              />
              <div className="flex gap-3 pt-1">
                <button onClick={saveEdit} disabled={saving}
                  className="flex-1 bg-[#0A2342] text-white rounded-xl py-2.5 font-semibold hover:bg-[#1B4F8C] transition-colors flex items-center justify-center gap-2">
                  <CheckIcon className="w-4 h-4" /> {saving ? 'Sauvegarde…' : 'Enregistrer'}
                </button>
                <button onClick={() => { setEditId(null); setEditForm(null) }}
                  className="px-4 rounded-xl border-2 border-gray-200 text-gray-600 flex items-center gap-1 hover:border-gray-300 transition-colors">
                  <XMarkIcon className="w-4 h-4" /> Annuler
                </button>
              </div>
            </div>
          ) : (
            <div className="p-5">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-11 h-11 rounded-xl bg-[#0A2342] flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                  {item.prenom[0]}{item.nom[0]}
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{item.prenom} {item.nom}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${ROLE_COLORS[item.role]}`}>
                      {item.role}
                    </span>
                    {!item.actif && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-500 border border-red-200">
                        Désactivé
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 mb-2">{item.departement}</div>

                  {/* Credentials */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                      <EnvelopeIcon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      <span className="text-sm font-mono text-gray-700 flex-1 truncate">{item.adresse}</span>
                      <button onClick={() => copyText(item.adresse, `email-${item.id}`)}
                        className="text-gray-300 hover:text-[#1B4F8C] transition-colors flex-shrink-0"
                        title="Copier l'adresse">
                        <ClipboardDocumentIcon className="w-4 h-4" />
                      </button>
                      {copied === `email-${item.id}` && <span className="text-xs text-green-600 font-medium">Copié!</span>}
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                      <KeyIcon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      <span className="text-sm font-mono text-gray-700 flex-1">
                        {revealed.has(item.id) ? item.motDePasse : '••••••••••••'}
                      </span>
                      <button onClick={() => toggleReveal(item.id)}
                        className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 px-1">
                        {revealed.has(item.id) ? 'Masquer' : 'Afficher'}
                      </button>
                      <button onClick={() => copyText(item.motDePasse, `pwd-${item.id}`)}
                        className="text-gray-300 hover:text-[#1B4F8C] transition-colors flex-shrink-0"
                        title="Copier le mot de passe">
                        <ClipboardDocumentIcon className="w-4 h-4" />
                      </button>
                      {copied === `pwd-${item.id}` && <span className="text-xs text-green-600 font-medium">Copié!</span>}
                    </div>
                  </div>

                  {/* Dates + copy all */}
                  <div className="flex items-center justify-between mt-2.5">
                    <span className="text-xs text-gray-300">
                      Créé le {new Date(item.dateCreation).toLocaleDateString('fr-FR')}
                    </span>
                    <button
                      onClick={() => copyCredentials(item)}
                      className="text-xs font-semibold text-[#C4894A] hover:text-[#a87540] flex items-center gap-1 transition-colors">
                      <ClipboardDocumentIcon className="w-3.5 h-3.5" />
                      {copied === `creds-${item.id}` ? 'Copié !' : 'Copier tout'}
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-1 flex-shrink-0">
                  <button onClick={() => { setEditId(item.id); setEditForm(item) }}
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-colors"
                    title="Modifier">
                    <PencilSquareIcon className="w-4 h-4" />
                  </button>
                  <button onClick={() => toggleActif(item)}
                    className={`w-9 h-9 flex items-center justify-center rounded-xl border transition-colors text-xs font-bold ${
                      item.actif
                        ? 'border-gray-200 text-gray-400 hover:text-amber-600 hover:border-amber-200'
                        : 'border-green-200 text-green-600 hover:bg-green-50'
                    }`}
                    title={item.actif ? 'Désactiver' : 'Réactiver'}>
                    {item.actif ? '⏸' : '▶'}
                  </button>
                  <button onClick={() => remove(item.id)}
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors"
                    title="Supprimer">
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function EmailFields({
  form, setField, editMode = false, showPassword = false,
}: {
  form: { prenom: string; nom: string; role: CompteEmail['role']; departement: string; actif: boolean; motDePasse?: string }
  setField: (k: string, v: string | boolean) => void
  editMode?: boolean
  showPassword?: boolean
}) {
  const [showPwd, setShowPwd] = useState(false)
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={LABEL}>Prénom *</label>
          <input type="text" value={form.prenom} onChange={e => setField('prenom', e.target.value)}
            className={INPUT} placeholder="Jean-Pierre" />
        </div>
        <div>
          <label className={LABEL}>Nom *</label>
          <input type="text" value={form.nom} onChange={e => setField('nom', e.target.value)}
            className={INPUT} placeholder="Mutombo" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={LABEL}>Rôle</label>
          <select value={form.role} onChange={e => setField('role', e.target.value)} className={INPUT}>
            {ROLES.map(r => <option key={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className={LABEL}>Département</label>
          <select value={form.departement} onChange={e => setField('departement', e.target.value)} className={INPUT}>
            {DEPARTEMENTS.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
      </div>
      {showPassword && (
        <div>
          <label className={LABEL}>Mot de passe <span className="font-normal text-gray-400">(laisser vide pour générer automatiquement)</span></label>
          <div className="relative">
            <input
              type={showPwd ? 'text' : 'password'}
              value={form.motDePasse ?? ''}
              onChange={e => setField('motDePasse', e.target.value)}
              className={INPUT + ' pr-20'}
              placeholder="Entrez un mot de passe ou laissez vide"
            />
            <button
              type="button"
              onClick={() => setShowPwd(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 font-medium"
            >
              {showPwd ? 'Masquer' : 'Afficher'}
            </button>
          </div>
        </div>
      )}
      {editMode && (
        <div className="flex items-center gap-3">
          <input type="checkbox" id="actif-check" checked={form.actif}
            onChange={e => setField('actif', e.target.checked)}
            className="w-4 h-4 accent-[#0A2342]" />
          <label htmlFor="actif-check" className="text-sm text-gray-700 font-medium">Compte actif</label>
        </div>
      )}
    </div>
  )
}

const LABEL = 'block text-xs font-semibold text-gray-500 mb-1.5'
const INPUT  = 'w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 focus:border-[#0A2342] focus:outline-none transition-colors text-sm'
