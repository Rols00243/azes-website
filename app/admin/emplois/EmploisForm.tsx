'use client'

import { useState } from 'react'
import type { Emploi } from '@/lib/server-data'
import { TrashIcon, PlusIcon, PencilSquareIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'

const TYPES = ['CDI', 'CDD', 'Stage', 'Consultant', 'Freelance']

export default function EmploisForm({ initialItems, zoneNames }: { initialItems: Emploi[]; zoneNames: string[] }) {
  const emptyForm = { titre: '', zone: zoneNames[0] || '', type: TYPES[0], description: '', date: new Date().toISOString().split('T')[0] }

  const [items, setItems] = useState(initialItems)
  const [form, setForm] = useState(emptyForm)
  const [adding, setAdding] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Emploi | null>(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  function flash(m: string) { setMsg(m); setTimeout(() => setMsg(''), 3000) }
  function setField(k: keyof typeof emptyForm, v: string) { setForm(f => ({ ...f, [k]: v })) }
  function setEditField(k: keyof Emploi, v: string) { setEditForm(f => f ? ({ ...f, [k]: v }) : f) }

  async function publish() {
    if (!form.titre || !form.description) return
    setSaving(true)
    const res = await fetch('/api/admin/emplois', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
    })
    const data = await res.json()
    setItems([data.item, ...items])
    setForm(emptyForm); setAdding(false)
    flash('✓ Offre publiée !')
    setSaving(false)
  }

  async function saveEdit() {
    if (!editForm) return
    setSaving(true)
    await fetch('/api/admin/emplois', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editForm),
    })
    setItems(items.map(e => e.id === editForm.id ? editForm : e))
    setEditId(null); setEditForm(null)
    flash('✓ Offre mise à jour !')
    setSaving(false)
  }

  async function remove(id: string) {
    if (!confirm('Supprimer cette offre ?')) return
    await fetch('/api/admin/emplois', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }),
    })
    setItems(items.filter(e => e.id !== id))
    flash('✓ Offre supprimée')
  }

  return (
    <div className="space-y-4">
      {msg && <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl px-4 py-3 text-sm font-medium">{msg}</div>}

      {/* Bouton ajouter */}
      {!adding ? (
        <button onClick={() => setAdding(true)}
          className="w-full flex items-center justify-center gap-2 bg-[#0A2342] text-white rounded-xl py-3.5 font-semibold hover:bg-[#1B4F8C] transition-colors">
          <PlusIcon className="w-5 h-5" /> Publier une nouvelle offre
        </button>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Nouvelle offre d'emploi</h2>
          <EmploiFields form={form} setField={setField as (k: string, v: string) => void} zoneNames={zoneNames} />
          <div className="flex gap-3 pt-2">
            <button onClick={publish} disabled={saving || !form.titre || !form.description}
              className="flex-1 bg-[#0A2342] text-white rounded-xl py-3 font-semibold hover:bg-[#1B4F8C] transition-colors disabled:opacity-50">
              {saving ? 'Publication…' : 'Publier'}
            </button>
            <button onClick={() => { setAdding(false); setForm(emptyForm) }}
              className="px-5 rounded-xl border-2 border-gray-200 text-gray-600 hover:border-gray-300 transition-colors font-medium">
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Liste */}
      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400">
          Aucune offre publiée pour l'instant.
        </div>
      ) : items.map(item => (
        <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {editId === item.id && editForm ? (
            <div className="p-5 space-y-4">
              <h3 className="font-semibold text-gray-900">Modifier l'offre</h3>
              <EmploiFields
                form={editForm}
                setField={(k, v) => setEditField(k as keyof Emploi, v)}
                zoneNames={zoneNames}
              />
              <div className="flex gap-3 pt-2">
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
            <div className="p-5 flex gap-4 items-start">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">{item.type}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{item.zone}</span>
                  <span className="text-xs text-gray-400">{new Date(item.date).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="font-semibold text-gray-900">{item.titre}</div>
                <div className="text-sm text-gray-400 mt-1 line-clamp-2">{item.description}</div>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={() => { setEditId(item.id); setEditForm(item) }}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-colors">
                  <PencilSquareIcon className="w-4 h-4" />
                </button>
                <button onClick={() => remove(item.id)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors">
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function EmploiFields({
  form, setField, zoneNames
}: {
  form: { titre: string; zone: string; type: string; description: string; date: string }
  setField: (k: string, v: string) => void
  zoneNames: string[]
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className={LABEL}>Intitulé du poste *</label>
        <input type="text" value={form.titre} onChange={e => setField('titre', e.target.value)}
          className={INPUT} placeholder="Ex : Ingénieur Géologue Senior" />
      </div>
      <div>
        <label className={LABEL}>Description *</label>
        <textarea value={form.description} onChange={e => setField('description', e.target.value)}
          className={INPUT + ' resize-none'} rows={3} placeholder="Missions, profil recherché…" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className={LABEL}>Zone</label>
          <select value={form.zone} onChange={e => setField('zone', e.target.value)} className={INPUT}>
            {zoneNames.map(z => <option key={z}>{z}</option>)}
          </select>
        </div>
        <div>
          <label className={LABEL}>Type</label>
          <select value={form.type} onChange={e => setField('type', e.target.value)} className={INPUT}>
            {['CDI', 'CDD', 'Stage', 'Consultant', 'Freelance'].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className={LABEL}>Date</label>
          <input type="date" value={form.date} onChange={e => setField('date', e.target.value)} className={INPUT} />
        </div>
      </div>
    </div>
  )
}

const LABEL = 'block text-xs font-semibold text-gray-500 mb-1.5'
const INPUT = 'w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 focus:border-[#0A2342] focus:outline-none transition-colors text-sm'
