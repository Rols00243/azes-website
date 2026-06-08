'use client'

import { useState } from 'react'
import type { BureauContact } from '@/lib/server-data'
import { PlusIcon, TrashIcon, PencilSquareIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'

const COLORS = ['#1B4F8C', '#2A7A4B', '#C4894A', '#8B5E3C', '#6B48A0', '#1E7A9E']

const EMPTY: Omit<BureauContact, 'id'> = {
  ville: '', adresse: '', tel: '', email: '', horaires: 'Lun–Ven 08h–17h', color: '#1B4F8C',
}

const L = 'block text-xs font-semibold text-gray-500 mb-1.5'
const I = 'w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 focus:border-[#0A2342] focus:outline-none transition-colors text-sm'

export default function BureauxForm({ initialItems }: { initialItems: BureauContact[] }) {
  const [items, setItems] = useState(initialItems)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [editId, setEditId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<BureauContact | null>(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  function flash(m: string) { setMsg(m); setTimeout(() => setMsg(''), 3000) }
  function set(k: keyof typeof EMPTY, v: string) { setForm(f => ({ ...f, [k]: v })) }
  function setE(k: keyof BureauContact, v: string) { setEditForm(f => f ? ({ ...f, [k]: v }) : f) }

  async function create() {
    if (!form.ville) return
    setSaving(true)
    const res = await fetch('/api/admin/bureaux', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
    })
    const data = await res.json()
    setItems([...items, data.item])
    setForm(EMPTY); setAdding(false)
    flash('✓ Bureau ajouté !')
    setSaving(false)
  }

  async function saveEdit() {
    if (!editForm) return
    setSaving(true)
    await fetch('/api/admin/bureaux', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editForm),
    })
    setItems(items.map(b => b.id === editForm.id ? editForm : b))
    setEditId(null); setEditForm(null)
    flash('✓ Bureau mis à jour !')
    setSaving(false)
  }

  async function remove(id: string) {
    if (!confirm('Supprimer ce bureau ?')) return
    await fetch('/api/admin/bureaux', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }),
    })
    setItems(items.filter(b => b.id !== id))
    flash('✓ Bureau supprimé')
  }

  return (
    <div className="space-y-4">
      {msg && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl px-4 py-3 text-sm font-medium">{msg}</div>
      )}

      {!adding ? (
        <button onClick={() => setAdding(true)}
          className="w-full flex items-center justify-center gap-2 bg-[#0A2342] text-white rounded-xl py-3.5 font-semibold hover:bg-[#1B4F8C] transition-colors">
          <PlusIcon className="w-5 h-5" /> Ajouter un bureau
        </button>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Nouveau bureau</h2>
          <BureauFields form={form} set={set} />
          <div className="flex gap-3">
            <button onClick={create} disabled={saving || !form.ville}
              className="flex-1 bg-[#0A2342] text-white rounded-xl py-3 font-semibold hover:bg-[#1B4F8C] transition-colors disabled:opacity-50">
              {saving ? 'Création…' : 'Ajouter'}
            </button>
            <button onClick={() => { setAdding(false); setForm(EMPTY) }}
              className="px-5 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:border-gray-300 transition-colors">
              Annuler
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map(b => (
          <div key={b.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {editId === b.id && editForm ? (
              <div className="p-5 space-y-4">
                <h3 className="font-semibold text-gray-900">Modifier le bureau</h3>
                <BureauFields form={editForm} set={(k, v) => setE(k, v)} />
                <div className="flex gap-3">
                  <button onClick={saveEdit} disabled={saving}
                    className="flex-1 bg-[#0A2342] text-white rounded-xl py-2.5 font-semibold hover:bg-[#1B4F8C] flex items-center justify-center gap-2">
                    <CheckIcon className="w-4 h-4" /> {saving ? '…' : 'Enregistrer'}
                  </button>
                  <button onClick={() => { setEditId(null); setEditForm(null) }}
                    className="px-4 rounded-xl border-2 border-gray-200 text-gray-600 flex items-center gap-1 hover:border-gray-300">
                    <XMarkIcon className="w-4 h-4" /> Annuler
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4 px-5 py-4">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: b.color }} />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 text-sm">{b.ville}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{b.adresse}</div>
                  <div className="text-xs text-gray-400">{b.tel} · {b.email}</div>
                </div>
                <button onClick={() => { setEditId(b.id); setEditForm(b) }}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-colors">
                  <PencilSquareIcon className="w-4 h-4" />
                </button>
                <button onClick={() => remove(b.id)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors">
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function BureauFields({
  form, set,
}: {
  form: Omit<BureauContact, 'id'> | BureauContact
  set: (k: keyof Omit<BureauContact, 'id'>, v: string) => void
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={L}>Ville *</label>
          <input type="text" value={form.ville} onChange={e => set('ville', e.target.value)} className={I} placeholder="Kinshasa (Siège)" />
        </div>
        <div>
          <label className={L}>Horaires</label>
          <input type="text" value={form.horaires} onChange={e => set('horaires', e.target.value)} className={I} placeholder="Lun–Ven 08h–17h" />
        </div>
      </div>
      <div>
        <label className={L}>Adresse</label>
        <input type="text" value={form.adresse} onChange={e => set('adresse', e.target.value)} className={I} placeholder="Boulevard du 30 Juin, Immeuble AZES" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={L}>Téléphone</label>
          <input type="text" value={form.tel} onChange={e => set('tel', e.target.value)} className={I} placeholder="+243 81 234 5678" />
        </div>
        <div>
          <label className={L}>Email</label>
          <input type="email" value={form.email} onChange={e => set('email', e.target.value)} className={I} placeholder="info@azes.cd" />
        </div>
      </div>
      <div>
        <label className={L}>Couleur d'accent</label>
        <div className="flex gap-2">
          {COLORS.map(c => (
            <button key={c} type="button"
              onClick={() => set('color', c)}
              className={`w-8 h-8 rounded-lg border-2 transition-all ${form.color === c ? 'border-gray-900 scale-110' : 'border-transparent'}`}
              style={{ backgroundColor: c }} />
          ))}
        </div>
      </div>
    </div>
  )
}
