'use client'

import { useState } from 'react'
import type { ProjetsCount, ProjetItem } from '@/lib/server-data'
import { PlusIcon, TrashIcon, PencilSquareIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'

const STATUTS: ProjetItem['statut'][] = ['En cours', 'Planifié', 'Terminé', 'Suspendu']
const STATUT_COLORS: Record<ProjetItem['statut'], string> = {
  'En cours':  'bg-green-50 text-green-700 border-green-200',
  'Planifié':  'bg-blue-50 text-blue-700 border-blue-200',
  'Terminé':   'bg-gray-50 text-gray-600 border-gray-200',
  'Suspendu':  'bg-amber-50 text-amber-700 border-amber-200',
}

const EMPTY_ITEM: Omit<ProjetItem, 'id'> = {
  nom: '', zone: '', statut: 'Planifié', secteur: '',
  description: '', investissement: '', dateDebut: new Date().toISOString().split('T')[0],
}

const L = 'block text-xs font-semibold text-gray-500 mb-1.5'
const I = 'w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 focus:border-[#0A2342] focus:outline-none transition-colors text-sm'

export default function ProjetsForm({
  initialCounts,
  initialItems,
}: {
  initialCounts: ProjetsCount
  initialItems: ProjetItem[]
}) {
  // ── Counters ──────────────────────────────────────────────────────────────
  const [counts, setCounts] = useState(initialCounts)
  const [savedCounts, setSavedCounts] = useState(false)
  const [loadingCounts, setLoadingCounts] = useState(false)

  function setCount(key: keyof ProjetsCount, value: number) {
    setCounts((c) => ({ ...c, [key]: value }))
    setSavedCounts(false)
  }

  async function saveCounts() {
    setLoadingCounts(true)
    await fetch('/api/admin/projets', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(counts),
    })
    setSavedCounts(true)
    setLoadingCounts(false)
    setTimeout(() => setSavedCounts(false), 4000)
  }

  const counterFields: { key: keyof ProjetsCount; label: string; hint: string }[] = [
    { key: 'projets_en_cours',  label: 'Projets en cours',  hint: 'Nombre de projets actuellement en développement' },
    { key: 'projets_planifies', label: 'Projets planifiés', hint: 'Nombre de projets en préparation' },
    { key: 'opportunites',      label: 'Opportunités',      hint: "Nombre d'opportunités d'investissement disponibles" },
    { key: 'appels_offres',     label: "Appels d'offres",   hint: "Nombre d'appels d'offres en cours" },
  ]

  // ── Project list ──────────────────────────────────────────────────────────
  const [items, setItems] = useState(initialItems)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState(EMPTY_ITEM)
  const [editId, setEditId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<ProjetItem | null>(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  function flash(m: string) { setMsg(m); setTimeout(() => setMsg(''), 3000) }
  function setF(k: keyof Omit<ProjetItem, 'id'>, v: string) { setForm(f => ({ ...f, [k]: v })) }
  function setEF(k: keyof ProjetItem, v: string) { setEditForm(f => f ? ({ ...f, [k]: v }) : f) }

  async function create() {
    if (!form.nom) return
    setSaving(true)
    const res = await fetch('/api/admin/projets-items', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
    })
    const data = await res.json()
    setItems([data.item, ...items])
    setForm(EMPTY_ITEM); setAdding(false)
    flash('✓ Projet ajouté !')
    setSaving(false)
  }

  async function saveEdit() {
    if (!editForm) return
    setSaving(true)
    await fetch('/api/admin/projets-items', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editForm),
    })
    setItems(items.map(p => p.id === editForm.id ? editForm : p))
    setEditId(null); setEditForm(null)
    flash('✓ Projet mis à jour !')
    setSaving(false)
  }

  async function remove(id: string) {
    if (!confirm('Supprimer ce projet ?')) return
    await fetch('/api/admin/projets-items', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }),
    })
    setItems(items.filter(p => p.id !== id))
    flash('✓ Projet supprimé')
  }

  return (
    <div className="space-y-6">
      {msg && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl px-4 py-3 text-sm font-medium">
          {msg}
        </div>
      )}

      {/* ── Compteurs ─────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
        <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Compteurs page d'accueil</h2>
        {savedCounts && (
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl px-4 py-3 text-sm font-medium">
            ✓ Compteurs sauvegardés !
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          {counterFields.map((f) => (
            <div key={f.key}>
              <label className={L}>{f.label}</label>
              <p className="text-xs text-gray-400 mb-2">{f.hint}</p>
              <input
                type="number" min={0} value={counts[f.key]}
                onChange={(e) => setCount(f.key, parseInt(e.target.value) || 0)}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-lg font-medium focus:border-[#0A2342] focus:outline-none transition-colors"
              />
            </div>
          ))}
        </div>
        <button onClick={saveCounts} disabled={loadingCounts}
          className="w-full bg-[#0A2342] text-white rounded-xl py-3 font-semibold hover:bg-[#1B4F8C] transition-colors disabled:opacity-50 text-sm">
          {loadingCounts ? 'Sauvegarde…' : 'Sauvegarder les compteurs'}
        </button>
      </div>

      {/* ── Liste des projets ──────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Liste des projets</h2>
          <span className="text-xs text-gray-400">{items.length} projet{items.length !== 1 ? 's' : ''}</span>
        </div>

        {!adding ? (
          <button onClick={() => setAdding(true)}
            className="w-full flex items-center justify-center gap-2 bg-[#0A2342] text-white rounded-xl py-3 font-semibold hover:bg-[#1B4F8C] transition-colors text-sm">
            <PlusIcon className="w-4 h-4" /> Ajouter un projet
          </button>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h3 className="font-semibold text-gray-900">Nouveau projet</h3>
            <ProjetFields form={form} set={setF} />
            <div className="flex gap-3">
              <button onClick={create} disabled={saving || !form.nom}
                className="flex-1 bg-[#0A2342] text-white rounded-xl py-3 font-semibold hover:bg-[#1B4F8C] transition-colors disabled:opacity-50 text-sm">
                {saving ? 'Création…' : 'Ajouter le projet'}
              </button>
              <button onClick={() => { setAdding(false); setForm(EMPTY_ITEM) }}
                className="px-5 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:border-gray-300 transition-colors text-sm">
                Annuler
              </button>
            </div>
          </div>
        )}

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400 text-sm">
            Aucun projet enregistré. Ajoutez votre premier projet ci-dessus.
          </div>
        ) : (
          <div className="space-y-2">
            {items.map(proj => (
              <div key={proj.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {editId === proj.id && editForm ? (
                  <div className="p-5 space-y-4">
                    <h3 className="font-semibold text-gray-900">Modifier le projet</h3>
                    <ProjetFields form={editForm} set={(k, v) => setEF(k, v)} />
                    <div className="flex gap-3">
                      <button onClick={saveEdit} disabled={saving}
                        className="flex-1 bg-[#0A2342] text-white rounded-xl py-2.5 font-semibold hover:bg-[#1B4F8C] transition-colors flex items-center justify-center gap-2 text-sm">
                        <CheckIcon className="w-4 h-4" /> {saving ? 'Sauvegarde…' : 'Enregistrer'}
                      </button>
                      <button onClick={() => { setEditId(null); setEditForm(null) }}
                        className="px-4 rounded-xl border-2 border-gray-200 text-gray-600 flex items-center gap-1 hover:border-gray-300 transition-colors text-sm">
                        <XMarkIcon className="w-4 h-4" /> Annuler
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 px-5 py-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${STATUT_COLORS[proj.statut]}`}>
                          {proj.statut}
                        </span>
                        {proj.secteur && <span className="text-xs text-gray-400">{proj.secteur}</span>}
                        {proj.zone && <span className="text-xs text-gray-300">· {proj.zone}</span>}
                      </div>
                      <div className="font-semibold text-gray-900 text-sm">{proj.nom}</div>
                      {proj.description && <div className="text-xs text-gray-400 mt-0.5 truncate">{proj.description}</div>}
                      <div className="flex gap-4 mt-1 text-xs text-gray-400">
                        {proj.investissement && <span>Investissement : {proj.investissement}</span>}
                        {proj.dateDebut && <span>Début : {new Date(proj.dateDebut).toLocaleDateString('fr-FR')}</span>}
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button onClick={() => { setEditId(proj.id); setEditForm(proj) }}
                        className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-colors">
                        <PencilSquareIcon className="w-4 h-4" />
                      </button>
                      <button onClick={() => remove(proj.id)}
                        className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ProjetFields({
  form,
  set,
}: {
  form: Omit<ProjetItem, 'id'> | ProjetItem
  set: (k: keyof Omit<ProjetItem, 'id'>, v: string) => void
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className={L}>Nom du projet *</label>
        <input type="text" value={form.nom} onChange={e => set('nom', e.target.value)}
          className={I} placeholder="Parc industriel de Maluku — Phase 2" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={L}>Zone</label>
          <input type="text" value={form.zone} onChange={e => set('zone', e.target.value)}
            className={I} placeholder="ZES de Maluku" />
        </div>
        <div>
          <label className={L}>Statut</label>
          <select value={form.statut} onChange={e => set('statut', e.target.value)} className={I}>
            {STATUTS.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={L}>Secteur</label>
          <input type="text" value={form.secteur} onChange={e => set('secteur', e.target.value)}
            className={I} placeholder="Industrie manufacturière" />
        </div>
        <div>
          <label className={L}>Investissement estimé</label>
          <input type="text" value={form.investissement} onChange={e => set('investissement', e.target.value)}
            className={I} placeholder="$50 M" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={L}>Date de début</label>
          <input type="date" value={form.dateDebut} onChange={e => set('dateDebut', e.target.value)} className={I} />
        </div>
      </div>
      <div>
        <label className={L}>Description</label>
        <textarea value={form.description} onChange={e => set('description', e.target.value)}
          className={I + ' resize-none'} rows={3}
          placeholder="Description détaillée du projet…" />
      </div>
    </div>
  )
}
