'use client'

import { useState } from 'react'
import type { Emploi, EntrepriseEmploi, Formation } from '@/lib/server-data'
import { TrashIcon, PlusIcon, PencilSquareIcon, CheckIcon, XMarkIcon, BriefcaseIcon, BuildingOfficeIcon, AcademicCapIcon } from '@heroicons/react/24/outline'

const TYPES = ['CDI', 'CDD', 'Stage', 'Consultant', 'Freelance']
const ACCENT_COLORS = ['#1B4F8C', '#2A7A4B', '#C4894A', '#8B5E3C', '#6B48A0', '#1E7A9E', '#B44B3C', '#4A7A3C']

const LABEL = 'block text-xs font-semibold text-gray-500 mb-1.5'
const INPUT = 'w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 focus:border-[#0A2342] focus:outline-none transition-colors text-sm'

interface Props {
  initialItems: Emploi[]
  initialEntreprises: EntrepriseEmploi[]
  initialFormations: Formation[]
  zoneNames: string[]
}

// ── TAB NAVIGATION ─────────────────────────────────────────────────────────────

type Tab = 'offres' | 'entreprises' | 'formations'

export default function EmploisForm({ initialItems, initialEntreprises, initialFormations, zoneNames }: Props) {
  const [tab, setTab] = useState<Tab>('offres')
  const [msg, setMsg] = useState('')

  function flash(m: string) { setMsg(m); setTimeout(() => setMsg(''), 3000) }

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count: number }[] = [
    { id: 'offres', label: 'Offres d\'emploi', icon: <BriefcaseIcon className="w-4 h-4" />, count: initialItems.length },
    { id: 'entreprises', label: 'Entreprises', icon: <BuildingOfficeIcon className="w-4 h-4" />, count: initialEntreprises.length },
    { id: 'formations', label: 'Formations', icon: <AcademicCapIcon className="w-4 h-4" />, count: initialFormations.length },
  ]

  return (
    <div className="space-y-4">
      {msg && (
        <div className={`rounded-xl px-4 py-3 text-sm font-medium border ${
          msg.startsWith('⚠') ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-green-50 border-green-200 text-green-800'
        }`}>{msg}</div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-2xl p-1">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              tab === t.id ? 'bg-white text-[#0A2342] shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}>
            {t.icon}
            <span className="hidden sm:inline">{t.label}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
              tab === t.id ? 'bg-[#0A2342] text-white' : 'bg-gray-200 text-gray-600'
            }`}>{t.count}</span>
          </button>
        ))}
      </div>

      {/* Panels */}
      {tab === 'offres' && <OffresPanel initialItems={initialItems} zoneNames={zoneNames} flash={flash} />}
      {tab === 'entreprises' && <EntreprisesPanel initialItems={initialEntreprises} flash={flash} />}
      {tab === 'formations' && <FormationsPanel initialItems={initialFormations} flash={flash} />}
    </div>
  )
}

// ── OFFRES D'EMPLOI ────────────────────────────────────────────────────────────

function OffresPanel({ initialItems, zoneNames, flash }: { initialItems: Emploi[]; zoneNames: string[]; flash: (m: string) => void }) {
  const emptyForm = { titre: '', zone: zoneNames[0] || '', type: TYPES[0], description: '', date: new Date().toISOString().split('T')[0] }
  const [items, setItems] = useState(initialItems)
  const [form, setForm] = useState(emptyForm)
  const [adding, setAdding] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Emploi | null>(null)
  const [saving, setSaving] = useState(false)

  function setField(k: string, v: string) { setForm(f => ({ ...f, [k]: v })) }
  function setEditField(k: string, v: string) { setEditForm(f => f ? ({ ...f, [k]: v }) : f) }

  async function publish() {
    if (!form.titre || !form.description) return
    setSaving(true)
    const res = await fetch('/api/admin/emplois', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    const data = await res.json()
    setItems([data.item, ...items]); setForm(emptyForm); setAdding(false)
    flash('✓ Offre publiée !')
    setSaving(false)
  }

  async function saveEdit() {
    if (!editForm) return
    setSaving(true)
    await fetch('/api/admin/emplois', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editForm) })
    setItems(items.map(e => e.id === editForm.id ? editForm : e)); setEditId(null); setEditForm(null)
    flash('✓ Offre mise à jour !')
    setSaving(false)
  }

  async function remove(id: string) {
    if (!confirm('Supprimer cette offre ?')) return
    await fetch('/api/admin/emplois', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setItems(items.filter(e => e.id !== id))
    flash('✓ Offre supprimée')
  }

  return (
    <div className="space-y-4">
      {!adding ? (
        <button onClick={() => setAdding(true)}
          className="w-full flex items-center justify-center gap-2 bg-[#0A2342] text-white rounded-xl py-3.5 font-semibold hover:bg-[#1B4F8C] transition-colors">
          <PlusIcon className="w-5 h-5" /> Publier une nouvelle offre
        </button>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Nouvelle offre d'emploi</h2>
          <div className="space-y-4">
            <div><label className={LABEL}>Intitulé du poste *</label>
              <input type="text" value={form.titre} onChange={e => setField('titre', e.target.value)} className={INPUT} placeholder="Ex : Ingénieur Géologue Senior" /></div>
            <div><label className={LABEL}>Description *</label>
              <textarea value={form.description} onChange={e => setField('description', e.target.value)} className={INPUT + ' resize-none'} rows={3} placeholder="Missions, profil recherché…" /></div>
            <div className="grid grid-cols-3 gap-3">
              <div><label className={LABEL}>Zone</label>
                <select value={form.zone} onChange={e => setField('zone', e.target.value)} className={INPUT}>
                  {zoneNames.map(z => <option key={z}>{z}</option>)}</select></div>
              <div><label className={LABEL}>Type</label>
                <select value={form.type} onChange={e => setField('type', e.target.value)} className={INPUT}>
                  {TYPES.map(t => <option key={t}>{t}</option>)}</select></div>
              <div><label className={LABEL}>Date</label>
                <input type="date" value={form.date} onChange={e => setField('date', e.target.value)} className={INPUT} /></div>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={publish} disabled={saving || !form.titre || !form.description}
              className="flex-1 bg-[#0A2342] text-white rounded-xl py-3 font-semibold hover:bg-[#1B4F8C] transition-colors disabled:opacity-50">
              {saving ? 'Publication…' : 'Publier'}</button>
            <button onClick={() => { setAdding(false); setForm(emptyForm) }}
              className="px-5 rounded-xl border-2 border-gray-200 text-gray-600 hover:border-gray-300 transition-colors font-medium">Annuler</button>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400">Aucune offre publiée pour l'instant.</div>
      ) : items.map(item => (
        <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {editId === item.id && editForm ? (
            <div className="p-5 space-y-4">
              <h3 className="font-semibold text-gray-900">Modifier l'offre</h3>
              <div className="space-y-4">
                <div><label className={LABEL}>Intitulé *</label>
                  <input type="text" value={editForm.titre} onChange={e => setEditField('titre', e.target.value)} className={INPUT} /></div>
                <div><label className={LABEL}>Description *</label>
                  <textarea value={editForm.description} onChange={e => setEditField('description', e.target.value)} className={INPUT + ' resize-none'} rows={3} /></div>
                <div className="grid grid-cols-3 gap-3">
                  <div><label className={LABEL}>Zone</label>
                    <select value={editForm.zone} onChange={e => setEditField('zone', e.target.value)} className={INPUT}>
                      {zoneNames.map(z => <option key={z}>{z}</option>)}</select></div>
                  <div><label className={LABEL}>Type</label>
                    <select value={editForm.type} onChange={e => setEditField('type', e.target.value)} className={INPUT}>
                      {TYPES.map(t => <option key={t}>{t}</option>)}</select></div>
                  <div><label className={LABEL}>Date</label>
                    <input type="date" value={editForm.date} onChange={e => setEditField('date', e.target.value)} className={INPUT} /></div>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={saveEdit} disabled={saving}
                  className="flex-1 bg-[#0A2342] text-white rounded-xl py-2.5 font-semibold hover:bg-[#1B4F8C] transition-colors flex items-center justify-center gap-2">
                  <CheckIcon className="w-4 h-4" /> {saving ? 'Sauvegarde…' : 'Enregistrer'}</button>
                <button onClick={() => { setEditId(null); setEditForm(null) }}
                  className="px-4 rounded-xl border-2 border-gray-200 text-gray-600 flex items-center gap-1 hover:border-gray-300 transition-colors">
                  <XMarkIcon className="w-4 h-4" /> Annuler</button>
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
                  <PencilSquareIcon className="w-4 h-4" /></button>
                <button onClick={() => remove(item.id)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors">
                  <TrashIcon className="w-4 h-4" /></button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ── ENTREPRISES QUI RECRUTENT ─────────────────────────────────────────────────

function EntreprisesPanel({ initialItems, flash }: { initialItems: EntrepriseEmploi[]; flash: (m: string) => void }) {
  const emptyForm = { nom: '', zone: '', emplois: 0, color: '#1B4F8C' }
  const [items, setItems] = useState(initialItems)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<EntrepriseEmploi | null>(null)
  const [saving, setSaving] = useState(false)

  async function create() {
    if (!form.nom.trim()) return
    setSaving(true)
    const res = await fetch('/api/admin/emplois/entreprises', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    const data = await res.json()
    setItems(prev => [...prev, data.item]); setForm(emptyForm); setAdding(false)
    flash('✓ Entreprise ajoutée !')
    setSaving(false)
  }

  async function save() {
    if (!editForm) return
    setSaving(true)
    await fetch('/api/admin/emplois/entreprises', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editForm) })
    setItems(prev => prev.map(e => e.id === editForm.id ? editForm : e)); setEditId(null); setEditForm(null)
    flash('✓ Entreprise mise à jour !')
    setSaving(false)
  }

  async function remove(id: string) {
    if (!confirm('Supprimer cette entreprise ?')) return
    await fetch('/api/admin/emplois/entreprises', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setItems(prev => prev.filter(e => e.id !== id))
    flash('✓ Entreprise supprimée')
  }

  return (
    <div className="space-y-4">
      {!adding ? (
        <button onClick={() => setAdding(true)}
          className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-2xl py-3.5 text-sm font-semibold text-gray-500 hover:border-[#0A2342] hover:text-[#0A2342] transition-colors">
          <PlusIcon className="w-4 h-4" /> Ajouter une entreprise
        </button>
      ) : (
        <div className="bg-white rounded-2xl border border-[#0A2342]/20 shadow-sm p-5 space-y-4">
          <h3 className="font-bold text-gray-900 text-sm">Nouvelle entreprise</h3>
          <EntrepriseFields form={form} set={(k, v) => setForm(f => ({ ...f, [k]: v }))} />
          <div className="flex gap-3">
            <button onClick={create} disabled={saving || !form.nom.trim()}
              className="flex-1 bg-[#0A2342] text-white rounded-xl py-3 font-semibold hover:bg-[#1B4F8C] transition-colors disabled:opacity-50 text-sm">
              {saving ? 'Création…' : 'Ajouter'}</button>
            <button onClick={() => { setAdding(false); setForm(emptyForm) }}
              className="px-5 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:border-gray-300 transition-colors text-sm">Annuler</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {editId === item.id && editForm ? (
              <div className="p-4 space-y-3">
                <EntrepriseFields form={editForm} set={(k, v) => setEditForm(f => f ? ({ ...f, [k]: v }) : f)} />
                <div className="flex gap-2">
                  <button onClick={save} disabled={saving}
                    className="flex-1 bg-[#0A2342] text-white rounded-lg py-2 font-semibold hover:bg-[#1B4F8C] transition-colors flex items-center justify-center gap-1.5 text-sm">
                    <CheckIcon className="w-4 h-4" /> {saving ? '…' : 'Enregistrer'}</button>
                  <button onClick={() => { setEditId(null); setEditForm(null) }}
                    className="px-3 rounded-lg border border-gray-200 text-gray-500 text-sm hover:border-gray-300">Annuler</button>
                </div>
              </div>
            ) : (
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${item.color}20`, border: `2px solid ${item.color}40` }}>
                    <span className="text-xs font-bold" style={{ color: item.color }}>
                      {item.nom.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-[#0A2342] truncate">{item.nom}</div>
                    <div className="text-xs text-gray-400">{item.zone}</div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => { setEditId(item.id); setEditForm(item) }}
                      className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-colors">
                      <PencilSquareIcon className="w-3.5 h-3.5" /></button>
                    <button onClick={() => remove(item.id)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors">
                      <TrashIcon className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
                <div className="text-center pt-2 border-t border-gray-100">
                  <span className="text-lg font-bold" style={{ color: item.color }}>{item.emplois.toLocaleString('fr-FR')}</span>
                  <span className="text-xs text-gray-400 ml-1">emplois</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function EntrepriseFields({ form, set }: { form: { nom: string; zone: string; emplois: number; color: string }; set: (k: string, v: string | number) => void }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div><label className={LABEL}>Nom *</label>
          <input type="text" value={form.nom} onChange={e => set('nom', e.target.value)} className={INPUT} placeholder="MTN Group" /></div>
        <div><label className={LABEL}>Ville / Zone</label>
          <input type="text" value={form.zone} onChange={e => set('zone', e.target.value)} className={INPUT} placeholder="Kinshasa" /></div>
      </div>
      <div><label className={LABEL}>Nombre d'emplois</label>
        <input type="number" min={0} value={form.emplois} onChange={e => set('emplois', parseInt(e.target.value) || 0)} className={INPUT} /></div>
      <div><label className={LABEL}>Couleur</label>
        <div className="flex flex-wrap gap-2">
          {ACCENT_COLORS.map(c => (
            <button key={c} type="button" onClick={() => set('color', c)}
              className={`w-8 h-8 rounded-lg border-2 transition-all ${form.color === c ? 'border-gray-900 scale-110' : 'border-transparent'}`}
              style={{ backgroundColor: c }} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── PROGRAMMES DE FORMATION ────────────────────────────────────────────────────

function FormationsPanel({ initialItems, flash }: { initialItems: Formation[]; flash: (m: string) => void }) {
  const emptyForm = { titre: '', duree: '', zone: '', places: 0, color: '#1B4F8C' }
  const [items, setItems] = useState(initialItems)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Formation | null>(null)
  const [saving, setSaving] = useState(false)

  async function create() {
    if (!form.titre.trim()) return
    setSaving(true)
    const res = await fetch('/api/admin/emplois/formations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    const data = await res.json()
    setItems(prev => [...prev, data.item]); setForm(emptyForm); setAdding(false)
    flash('✓ Formation ajoutée !')
    setSaving(false)
  }

  async function save() {
    if (!editForm) return
    setSaving(true)
    await fetch('/api/admin/emplois/formations', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editForm) })
    setItems(prev => prev.map(f => f.id === editForm.id ? editForm : f)); setEditId(null); setEditForm(null)
    flash('✓ Formation mise à jour !')
    setSaving(false)
  }

  async function remove(id: string) {
    if (!confirm('Supprimer cette formation ?')) return
    await fetch('/api/admin/emplois/formations', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setItems(prev => prev.filter(f => f.id !== id))
    flash('✓ Formation supprimée')
  }

  return (
    <div className="space-y-4">
      {!adding ? (
        <button onClick={() => setAdding(true)}
          className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-2xl py-3.5 text-sm font-semibold text-gray-500 hover:border-[#0A2342] hover:text-[#0A2342] transition-colors">
          <PlusIcon className="w-4 h-4" /> Ajouter une formation
        </button>
      ) : (
        <div className="bg-white rounded-2xl border border-[#0A2342]/20 shadow-sm p-5 space-y-4">
          <h3 className="font-bold text-gray-900 text-sm">Nouveau programme de formation</h3>
          <FormationFields form={form} set={(k, v) => setForm(f => ({ ...f, [k]: v }))} />
          <div className="flex gap-3">
            <button onClick={create} disabled={saving || !form.titre.trim()}
              className="flex-1 bg-[#0A2342] text-white rounded-xl py-3 font-semibold hover:bg-[#1B4F8C] transition-colors disabled:opacity-50 text-sm">
              {saving ? 'Création…' : 'Ajouter'}</button>
            <button onClick={() => { setAdding(false); setForm(emptyForm) }}
              className="px-5 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:border-gray-300 transition-colors text-sm">Annuler</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {editId === item.id && editForm ? (
              <div className="p-4 space-y-3">
                <FormationFields form={editForm} set={(k, v) => setEditForm(f => f ? ({ ...f, [k]: v }) : f)} />
                <div className="flex gap-2">
                  <button onClick={save} disabled={saving}
                    className="flex-1 bg-[#0A2342] text-white rounded-lg py-2 font-semibold hover:bg-[#1B4F8C] transition-colors flex items-center justify-center gap-1.5 text-sm">
                    <CheckIcon className="w-4 h-4" /> {saving ? '…' : 'Enregistrer'}</button>
                  <button onClick={() => { setEditId(null); setEditForm(null) }}
                    className="px-3 rounded-lg border border-gray-200 text-gray-500 text-sm hover:border-gray-300">Annuler</button>
                </div>
              </div>
            ) : (
              <div className="p-4 relative">
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }} />
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-bold text-sm text-[#0A2342] leading-snug flex-1">{item.titre}</h4>
                  <div className="flex gap-1 flex-shrink-0">
                    <button onClick={() => { setEditId(item.id); setEditForm(item) }}
                      className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-colors">
                      <PencilSquareIcon className="w-3.5 h-3.5" /></button>
                    <button onClick={() => remove(item.id)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors">
                      <TrashIcon className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mb-3">{item.zone}</div>
                <div className="flex justify-between text-xs pt-3 border-t border-gray-100">
                  <span className="text-gray-500">Durée : <span className="font-semibold text-gray-700">{item.duree}</span></span>
                  <span className="font-bold" style={{ color: item.color }}>{item.places} places</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function FormationFields({ form, set }: {
  form: { titre: string; duree: string; zone: string; places: number; color: string }
  set: (k: string, v: string | number) => void
}) {
  return (
    <div className="space-y-3">
      <div><label className={LABEL}>Titre *</label>
        <input type="text" value={form.titre} onChange={e => set('titre', e.target.value)} className={INPUT} placeholder="Formation Logistique & Supply Chain" /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className={LABEL}>Zone / Lieu</label>
          <input type="text" value={form.zone} onChange={e => set('zone', e.target.value)} className={INPUT} placeholder="Zone Franche de Matadi" /></div>
        <div><label className={LABEL}>Durée</label>
          <input type="text" value={form.duree} onChange={e => set('duree', e.target.value)} className={INPUT} placeholder="6 mois" /></div>
      </div>
      <div><label className={LABEL}>Nombre de places</label>
        <input type="number" min={0} value={form.places} onChange={e => set('places', parseInt(e.target.value) || 0)} className={INPUT} /></div>
      <div><label className={LABEL}>Couleur</label>
        <div className="flex flex-wrap gap-2">
          {ACCENT_COLORS.map(c => (
            <button key={c} type="button" onClick={() => set('color', c)}
              className={`w-8 h-8 rounded-lg border-2 transition-all ${form.color === c ? 'border-gray-900 scale-110' : 'border-transparent'}`}
              style={{ backgroundColor: c }} />
          ))}
        </div>
      </div>
    </div>
  )
}
