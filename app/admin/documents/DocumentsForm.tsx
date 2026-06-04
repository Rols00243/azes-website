'use client'

import { useState } from 'react'
import type { DocumentAdmin } from '@/lib/server-data'
import { TrashIcon, PlusIcon, ArrowDownTrayIcon, PencilSquareIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'

const CATEGORIES = [
  'Lois', 'Décrets', 'Arrêtés', 'Arrêtés interministériels', "Arrêtés d'approbation",
  'Décisions', 'Rapports', 'Statuts', "Appels d'offres", "Offres d'emploi",
  'Guides investisseurs', 'Formulaires', 'Communiqués',
]
const TYPES = ['PDF', 'DOCX', 'XLSX', 'ZIP']

const EMPTY: Omit<DocumentAdmin, 'id'> = {
  titre: '', categorie: CATEGORIES[0], date: new Date().toISOString().split('T')[0],
  type: 'PDF', taille: '', description: '', reference: '', url: '',
}

const TYPE_COLORS: Record<string, string> = {
  PDF: 'bg-red-50 text-red-700', DOCX: 'bg-blue-50 text-blue-700',
  XLSX: 'bg-green-50 text-green-700', ZIP: 'bg-amber-50 text-amber-700',
}

export default function DocumentsForm({ initialItems }: { initialItems: DocumentAdmin[] }) {
  const [items, setItems] = useState(initialItems)
  const [form, setForm] = useState(EMPTY)
  const [adding, setAdding] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<DocumentAdmin | null>(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  function flash(m: string) { setMsg(m); setTimeout(() => setMsg(''), 3000) }
  function set(k: string, v: string) { setForm(f => ({ ...f, [k]: v })) }
  function setEdit(k: string, v: string) { setEditForm(f => f ? ({ ...f, [k]: v }) : f) }

  async function publish() {
    if (!form.titre || !form.url) return
    setSaving(true)
    const res = await fetch('/api/admin/documents', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
    })
    const data = await res.json()
    setItems([data.item, ...items])
    setForm(EMPTY); setAdding(false)
    flash('✓ Document publié !')
    setSaving(false)
  }

  async function saveEdit() {
    if (!editForm) return
    setSaving(true)
    await fetch('/api/admin/documents', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editForm),
    })
    setItems(items.map(d => d.id === editForm.id ? editForm : d))
    setEditId(null); setEditForm(null)
    flash('✓ Document mis à jour !')
    setSaving(false)
  }

  async function remove(id: string) {
    if (!confirm('Supprimer ce document ?')) return
    await fetch('/api/admin/documents', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }),
    })
    setItems(items.filter(d => d.id !== id))
    flash('✓ Document supprimé')
  }

  return (
    <div className="space-y-4">
      {msg && <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl px-4 py-3 text-sm font-medium">{msg}</div>}

      {/* Bouton ajouter */}
      {!adding ? (
        <button onClick={() => setAdding(true)}
          className="w-full flex items-center justify-center gap-2 bg-[#0A2342] text-white rounded-xl py-3.5 font-semibold hover:bg-[#1B4F8C] transition-colors">
          <PlusIcon className="w-5 h-5" /> Ajouter un document
        </button>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Nouveau document</h2>
          <DocFields form={form} set={set} />
          <div className="flex gap-3 pt-2">
            <button onClick={publish} disabled={saving || !form.titre || !form.url}
              className="flex-1 bg-[#0A2342] text-white rounded-xl py-3 font-semibold hover:bg-[#1B4F8C] transition-colors disabled:opacity-50">
              {saving ? 'Publication…' : 'Publier'}
            </button>
            <button onClick={() => { setAdding(false); setForm(EMPTY) }}
              className="px-5 rounded-xl border-2 border-gray-200 text-gray-600 hover:border-gray-300 transition-colors font-medium">
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Liste */}
      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400">
          Aucun document publié. Ajoutez votre premier document ci-dessus.
        </div>
      ) : (
        <div className="space-y-2">
          {items.map(doc => (
            <div key={doc.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {editId === doc.id && editForm ? (
                <div className="p-5 space-y-4">
                  <h3 className="font-semibold text-gray-900">Modifier le document</h3>
                  <DocFields form={editForm} set={setEdit} />
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
                <div className="flex items-center gap-4 px-5 py-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${TYPE_COLORS[doc.type] || 'bg-gray-100 text-gray-600'}`}>
                        {doc.type}
                      </span>
                      <span className="text-xs text-gray-400">{doc.categorie}</span>
                      <span className="text-xs text-gray-300">·</span>
                      <span className="text-xs text-gray-400">{new Date(doc.date).toLocaleDateString('fr-FR')}</span>
                      {doc.taille && <span className="text-xs text-gray-400">{doc.taille}</span>}
                    </div>
                    <div className="font-medium text-gray-900 text-sm truncate">{doc.titre}</div>
                    {doc.reference && <div className="text-xs text-gray-400 mt-0.5">{doc.reference}</div>}
                  </div>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-colors flex-shrink-0">
                    <ArrowDownTrayIcon className="w-4 h-4" />
                  </a>
                  <button onClick={() => { setEditId(doc.id); setEditForm(doc) }}
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-colors flex-shrink-0">
                    <PencilSquareIcon className="w-4 h-4" />
                  </button>
                  <button onClick={() => remove(doc.id)}
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors flex-shrink-0">
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function DocFields({
  form,
  set,
}: {
  form: Omit<DocumentAdmin, 'id'> | DocumentAdmin
  set: (k: string, v: string) => void
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className={L}>Titre du document *</label>
        <input type="text" value={form.titre} onChange={e => set('titre', e.target.value)}
          className={I} placeholder="Loi n°23-011 portant création des ZES" />
      </div>
      <div>
        <label className={L}>URL du fichier * <span className="font-normal text-gray-400">(lien de téléchargement)</span></label>
        <input type="url" value={form.url} onChange={e => set('url', e.target.value)}
          className={I} placeholder="https://… ou /documents/fichier.pdf" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="col-span-2">
          <label className={L}>Catégorie</label>
          <select value={form.categorie} onChange={e => set('categorie', e.target.value)} className={I}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className={L}>Type</label>
          <select value={form.type} onChange={e => set('type', e.target.value)} className={I}>
            {TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className={L}>Taille</label>
          <input type="text" value={form.taille} onChange={e => set('taille', e.target.value)} className={I} placeholder="2.4 Mo" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={L}>Date de publication</label>
          <input type="date" value={form.date} onChange={e => set('date', e.target.value)} className={I} />
        </div>
        <div>
          <label className={L}>Référence (optionnel)</label>
          <input type="text" value={form.reference} onChange={e => set('reference', e.target.value)} className={I} placeholder="Réf. : JO n°…" />
        </div>
      </div>
      <div>
        <label className={L}>Description (optionnel)</label>
        <textarea value={form.description} onChange={e => set('description', e.target.value)}
          className={I + ' resize-none'} rows={2} placeholder="Bref résumé du contenu…" />
      </div>
    </div>
  )
}

const L = 'block text-xs font-semibold text-gray-500 mb-1.5'
const I = 'w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 focus:border-[#0A2342] focus:outline-none transition-colors text-sm'
