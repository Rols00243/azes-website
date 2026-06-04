'use client'

import { useState } from 'react'
import type { AppelOffreAdmin } from '@/lib/server-data'
import { TrashIcon, PlusIcon, PencilSquareIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'

const STATUTS = ['En cours', 'À venir', 'Clôturé'] as const
const TYPES = ['AO', 'AMI'] as const

type ZoneOption = { slug: string; name: string }

const EMPTY = (zoneOptions: ZoneOption[]): Omit<AppelOffreAdmin, 'id'> => ({
  titre: '',
  type: 'AO',
  statut: 'En cours',
  zone: zoneOptions[0]?.name || '',
  zoneSlug: zoneOptions[0]?.slug || '',
  budget: '',
  datePublication: new Date().toISOString().split('T')[0],
  dateLimite: '',
  description: '',
  urgent: false,
})

const STATUT_COLORS: Record<string, string> = {
  'En cours': 'bg-blue-50 text-blue-700 border-blue-200',
  'À venir':  'bg-amber-50 text-amber-700 border-amber-200',
  'Clôturé':  'bg-gray-100 text-gray-500 border-gray-200',
}

export default function AppelsOffresForm({ initialItems, zoneOptions }: { initialItems: AppelOffreAdmin[]; zoneOptions: ZoneOption[] }) {
  const [items, setItems] = useState(initialItems)
  const [form, setForm] = useState(EMPTY(zoneOptions))
  const [adding, setAdding] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<AppelOffreAdmin | null>(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  function flash(m: string) { setMsg(m); setTimeout(() => setMsg(''), 3000) }

  function setField(k: string, v: string | boolean) { setForm(f => ({ ...f, [k]: v })) }
  function setEditField(k: string, v: string | boolean) { setEditForm(f => f ? ({ ...f, [k]: v }) : f) }

  function handleZoneChange(slug: string, forEdit = false) {
    const z = zoneOptions.find(o => o.slug === slug)
    if (!z) return
    if (forEdit) {
      setEditForm(f => f ? ({ ...f, zone: z.name, zoneSlug: z.slug }) : f)
    } else {
      setForm(f => ({ ...f, zone: z.name, zoneSlug: z.slug }))
    }
  }

  async function publish() {
    if (!form.titre || !form.dateLimite) return
    setSaving(true)
    const res = await fetch('/api/admin/appels-offres', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    setItems([data.item, ...items])
    setForm(EMPTY(zoneOptions)); setAdding(false)
    flash('✓ Appel d\'offres publié !')
    setSaving(false)
  }

  async function saveEdit() {
    if (!editForm) return
    setSaving(true)
    await fetch('/api/admin/appels-offres', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    })
    setItems(items.map(i => i.id === editForm.id ? editForm : i))
    setEditId(null); setEditForm(null)
    flash('✓ Mis à jour !')
    setSaving(false)
  }

  async function remove(id: string) {
    if (!confirm('Supprimer cet appel d\'offres ?')) return
    await fetch('/api/admin/appels-offres', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setItems(items.filter(i => i.id !== id))
    flash('✓ Supprimé')
  }

  return (
    <div className="space-y-4">
      {msg && <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl px-4 py-3 text-sm font-medium">{msg}</div>}

      {!adding ? (
        <button onClick={() => setAdding(true)}
          className="w-full flex items-center justify-center gap-2 bg-[#0A2342] text-white rounded-xl py-3.5 font-semibold hover:bg-[#1B4F8C] transition-colors">
          <PlusIcon className="w-5 h-5" /> Publier un appel d'offres
        </button>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Nouvel appel d'offres</h2>
          <AOFields form={form} setField={setField} zoneOptions={zoneOptions} onZoneChange={slug => handleZoneChange(slug, false)} />
          <div className="flex gap-3 pt-2">
            <button onClick={publish} disabled={saving || !form.titre || !form.dateLimite}
              className="flex-1 bg-[#0A2342] text-white rounded-xl py-3 font-semibold hover:bg-[#1B4F8C] transition-colors disabled:opacity-50">
              {saving ? 'Publication…' : 'Publier'}
            </button>
            <button onClick={() => { setAdding(false); setForm(EMPTY(zoneOptions)) }}
              className="px-5 rounded-xl border-2 border-gray-200 text-gray-600 font-medium">
              Annuler
            </button>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400">
          Aucun appel d'offres publié.
        </div>
      ) : (
        items.map(item => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {editId === item.id && editForm ? (
              <div className="p-5 space-y-4">
                <h3 className="font-semibold text-gray-900">Modifier</h3>
                <AOFields form={editForm} setField={setEditField} zoneOptions={zoneOptions} onZoneChange={slug => handleZoneChange(slug, true)} />
                <div className="flex gap-3 pt-2">
                  <button onClick={saveEdit} disabled={saving}
                    className="flex-1 bg-[#0A2342] text-white rounded-xl py-2.5 font-semibold hover:bg-[#1B4F8C] transition-colors flex items-center justify-center gap-2">
                    <CheckIcon className="w-4 h-4" /> {saving ? 'Sauvegarde…' : 'Enregistrer'}
                  </button>
                  <button onClick={() => { setEditId(null); setEditForm(null) }}
                    className="px-4 rounded-xl border-2 border-gray-200 text-gray-600 flex items-center gap-1">
                    <XMarkIcon className="w-4 h-4" /> Annuler
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs font-bold px-2 py-0.5 bg-[#0A2342] text-white rounded">{item.type}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${STATUT_COLORS[item.statut]}`}>{item.statut}</span>
                      {item.urgent && <span className="text-xs font-bold px-2 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded">URGENT</span>}
                      <span className="text-xs text-gray-400">{item.zone}</span>
                      {item.budget && <span className="text-xs font-semibold text-gray-600">{item.budget}</span>}
                    </div>
                    <div className="font-semibold text-gray-900 line-clamp-2">{item.titre}</div>
                    {item.dateLimite && (
                      <div className="text-xs text-gray-400 mt-1">
                        Date limite : <strong>{new Date(item.dateLimite).toLocaleDateString('fr-FR')}</strong>
                      </div>
                    )}
                    <div className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button onClick={() => { setEditId(item.id); setEditForm(item) }}
                      className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-colors">
                      <PencilSquareIcon className="w-4 h-4" />
                    </button>
                    <button onClick={() => remove(item.id)}
                      className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors">
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )
}

function AOFields({ form, setField, zoneOptions, onZoneChange }: {
  form: Omit<AppelOffreAdmin, 'id'>
  setField: (k: string, v: string | boolean) => void
  zoneOptions: ZoneOption[]
  onZoneChange: (slug: string) => void
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className={L}>Titre de l'appel d'offres *</label>
        <input type="text" value={form.titre} onChange={e => setField('titre', e.target.value)}
          className={I} placeholder="Construction unités industrielles…" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className={L}>Type</label>
          <select value={form.type} onChange={e => setField('type', e.target.value)} className={I}>
            {TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className={L}>Statut</label>
          <select value={form.statut} onChange={e => setField('statut', e.target.value)} className={I}>
            {STATUTS.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="col-span-2">
          <label className={L}>Zone concernée</label>
          <select value={form.zoneSlug} onChange={e => onZoneChange(e.target.value)} className={I}>
            {zoneOptions.map(z => <option key={z.slug} value={z.slug}>{z.name}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className={L}>Budget estimé</label>
          <input type="text" value={form.budget} onChange={e => setField('budget', e.target.value)}
            className={I} placeholder="$65M" />
        </div>
        <div>
          <label className={L}>Date de publication</label>
          <input type="date" value={form.datePublication} onChange={e => setField('datePublication', e.target.value)} className={I} />
        </div>
        <div>
          <label className={L}>Date limite *</label>
          <input type="date" value={form.dateLimite} onChange={e => setField('dateLimite', e.target.value)} className={I} />
        </div>
      </div>
      <div>
        <label className={L}>Description</label>
        <textarea value={form.description} onChange={e => setField('description', e.target.value)}
          className={I + ' resize-none'} rows={3} placeholder="Détails de l'appel d'offres…" />
      </div>
      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" checked={form.urgent} onChange={e => setField('urgent', e.target.checked)}
          className="w-4 h-4 rounded accent-red-600" />
        <span className="text-sm font-medium text-gray-700">Marquer comme <span className="text-red-600 font-bold">URGENT</span></span>
      </label>
    </div>
  )
}

const L = 'block text-xs font-semibold text-gray-500 mb-1.5'
const I = 'w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 focus:border-[#0A2342] focus:outline-none transition-colors text-sm'
