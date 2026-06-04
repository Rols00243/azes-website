'use client'

import { useState } from 'react'
import type { Slide } from '@/lib/server-data'
import { TrashIcon, PlusIcon, ChevronUpIcon, ChevronDownIcon, PencilSquareIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'

const EMPTY: Omit<Slide, 'id'> = {
  image: '',
  tag: '',
  headline: '',
  accent: '',
  description: '',
  ctaLabel: 'Explorer les zones',
  ctaHref: '/zones',
  ctaSecondLabel: 'Investir maintenant',
  ctaSecondHref: '/demarches',
}

export default function SlidesForm({ initialSlides }: { initialSlides: Slide[] }) {
  const [slides, setSlides] = useState(initialSlides)
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(EMPTY)
  const [editForm, setEditForm] = useState<Slide | null>(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  function flash(m: string) { setMsg(m); setTimeout(() => setMsg(''), 3000) }

  async function addSlide() {
    if (!form.image || !form.headline) return
    setSaving(true)
    const res = await fetch('/api/admin/slides', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    setSlides([...slides, data.item])
    setForm(EMPTY); setAdding(false)
    flash('✓ Slide ajouté !')
    setSaving(false)
  }

  async function deleteSlide(id: string) {
    if (!confirm('Supprimer ce slide ?')) return
    await fetch('/api/admin/slides', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setSlides(slides.filter(s => s.id !== id))
    flash('✓ Slide supprimé')
  }

  async function saveEdit() {
    if (!editForm) return
    setSaving(true)
    const updated = slides.map(s => s.id === editForm.id ? editForm : s)
    await fetch('/api/admin/slides', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    })
    setSlides(updated); setEditingId(null); setEditForm(null)
    flash('✓ Slide mis à jour !')
    setSaving(false)
  }

  async function move(id: string, dir: 'up' | 'down') {
    const idx = slides.findIndex(s => s.id === id)
    if ((dir === 'up' && idx === 0) || (dir === 'down' && idx === slides.length - 1)) return
    const newArr = [...slides]
    const swap = dir === 'up' ? idx - 1 : idx + 1
    ;[newArr[idx], newArr[swap]] = [newArr[swap], newArr[idx]]
    await fetch('/api/admin/slides', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newArr),
    })
    setSlides(newArr)
    flash('✓ Ordre mis à jour')
  }

  return (
    <div className="space-y-4">
      {msg && <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl px-4 py-3 text-sm font-medium">{msg}</div>}

      {/* Slides list */}
      {slides.map((slide, idx) => (
        <div key={slide.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {editingId === slide.id && editForm ? (
            /* Edit mode */
            <div className="p-5 space-y-4">
              <h3 className="font-semibold text-gray-900">Modifier le slide {idx + 1}</h3>
              <SlideFields form={editForm} setForm={setEditForm as (f: Slide) => void} />
              <div className="flex gap-3 pt-2">
                <button onClick={saveEdit} disabled={saving}
                  className="flex-1 bg-[#0A2342] text-white rounded-xl py-2.5 font-semibold hover:bg-[#1B4F8C] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                  <CheckIcon className="w-4 h-4" /> {saving ? 'Sauvegarde…' : 'Enregistrer'}
                </button>
                <button onClick={() => { setEditingId(null); setEditForm(null) }}
                  className="px-4 rounded-xl border-2 border-gray-200 text-gray-600 hover:border-gray-300 transition-colors flex items-center gap-1">
                  <XMarkIcon className="w-4 h-4" /> Annuler
                </button>
              </div>
            </div>
          ) : (
            /* View mode */
            <div className="flex gap-4 p-4 items-start">
              {/* Thumbnail */}
              <div className="w-24 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                {slide.image && <img src={slide.image} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-400 mb-0.5">{slide.tag}</div>
                <div className="font-semibold text-gray-900 truncate">{slide.headline} {slide.accent}</div>
                <div className="text-xs text-gray-500 mt-1 line-clamp-1">{slide.description}</div>
              </div>
              {/* Actions */}
              <div className="flex flex-col gap-1 flex-shrink-0">
                <button onClick={() => move(slide.id, 'up')} disabled={idx === 0}
                  className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 disabled:opacity-30">
                  <ChevronUpIcon className="w-4 h-4" />
                </button>
                <button onClick={() => move(slide.id, 'down')} disabled={idx === slides.length - 1}
                  className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 disabled:opacity-30">
                  <ChevronDownIcon className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={() => { setEditingId(slide.id); setEditForm(slide) }}
                  className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-colors">
                  <PencilSquareIcon className="w-4 h-4" />
                </button>
                <button onClick={() => deleteSlide(slide.id)}
                  className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors">
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Add new slide */}
      {!adding ? (
        <button onClick={() => setAdding(true)}
          className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 text-gray-500 hover:border-[#0A2342] hover:text-[#0A2342] rounded-2xl py-4 font-semibold transition-colors">
          <PlusIcon className="w-5 h-5" /> Ajouter un slide
        </button>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Nouveau slide</h3>
          <SlideFields form={form} setForm={setForm} />
          <div className="flex gap-3 pt-2">
            <button onClick={addSlide} disabled={saving || !form.image || !form.headline}
              className="flex-1 bg-[#0A2342] text-white rounded-xl py-3 font-semibold hover:bg-[#1B4F8C] transition-colors disabled:opacity-50">
              {saving ? 'Ajout…' : 'Ajouter'}
            </button>
            <button onClick={() => { setAdding(false); setForm(EMPTY) }}
              className="px-5 rounded-xl border-2 border-gray-200 text-gray-600 hover:border-gray-300 transition-colors font-medium">
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function SlideFields({ form, setForm }: { form: Omit<Slide, 'id'> | Slide; setForm: (f: any) => void }) {
  const set = (k: string, v: string) => setForm({ ...form, [k]: v })
  return (
    <div className="space-y-4">
      <div>
        <label className={L}>URL de l'image *</label>
        <input type="url" value={form.image} onChange={e => set('image', e.target.value)}
          className={I} placeholder="https://images.unsplash.com/…" />
        <p className="text-xs text-gray-400 mt-1">Utilisez une URL d'image (Unsplash, votre serveur, etc.)</p>
      </div>
      {form.image && (
        <div className="h-32 rounded-xl overflow-hidden bg-gray-100">
          <img src={form.image} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={L}>Tag (sous-titre petite)</label>
          <input type="text" value={form.tag} onChange={e => set('tag', e.target.value)}
            className={I} placeholder="ZES de Maluku · Kinshasa" />
        </div>
        <div>
          <label className={L}>Titre principal *</label>
          <input type="text" value={form.headline} onChange={e => set('headline', e.target.value)}
            className={I} placeholder="Investissez au cœur" />
        </div>
      </div>
      <div>
        <label className={L}>Accent (suite du titre en couleur)</label>
        <input type="text" value={form.accent} onChange={e => set('accent', e.target.value)}
          className={I} placeholder="de l'Afrique Centrale" />
      </div>
      <div>
        <label className={L}>Description</label>
        <textarea value={form.description} onChange={e => set('description', e.target.value)}
          className={I + ' resize-none'} rows={2} placeholder="Texte sous le titre…" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={L}>Bouton principal — texte</label>
          <input type="text" value={form.ctaLabel} onChange={e => set('ctaLabel', e.target.value)} className={I} />
        </div>
        <div>
          <label className={L}>Bouton principal — lien</label>
          <input type="text" value={form.ctaHref} onChange={e => set('ctaHref', e.target.value)} className={I} placeholder="/zones" />
        </div>
        <div>
          <label className={L}>Bouton secondaire — texte</label>
          <input type="text" value={form.ctaSecondLabel} onChange={e => set('ctaSecondLabel', e.target.value)} className={I} />
        </div>
        <div>
          <label className={L}>Bouton secondaire — lien</label>
          <input type="text" value={form.ctaSecondHref} onChange={e => set('ctaSecondHref', e.target.value)} className={I} placeholder="/contact" />
        </div>
      </div>
    </div>
  )
}

const L = 'block text-xs font-semibold text-gray-500 mb-1.5'
const I = 'w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 focus:border-[#0A2342] focus:outline-none transition-colors text-sm'
