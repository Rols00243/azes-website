'use client'

import { useState } from 'react'
import type { ProjetsCount } from '@/lib/server-data'

export default function ProjetsForm({ initialCounts }: { initialCounts: ProjetsCount }) {
  const [counts, setCounts] = useState(initialCounts)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  function set(key: keyof ProjetsCount, value: number) {
    setCounts((c) => ({ ...c, [key]: value }))
    setSaved(false)
  }

  async function save() {
    setLoading(true)
    await fetch('/api/admin/projets', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(counts),
    })
    setSaved(true)
    setLoading(false)
    setTimeout(() => setSaved(false), 4000)
  }

  const fields: { key: keyof ProjetsCount; label: string; hint: string }[] = [
    { key: 'projets_en_cours',  label: 'Projets en cours',  hint: 'Nombre de projets actuellement en développement' },
    { key: 'projets_planifies', label: 'Projets planifiés', hint: 'Nombre de projets en préparation' },
    { key: 'opportunites',      label: 'Opportunités',      hint: "Nombre d'opportunités d'investissement disponibles" },
    { key: 'appels_offres',     label: "Appels d'offres",   hint: "Nombre d'appels d'offres en cours" },
  ]

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl px-4 py-3 text-sm font-medium">
          ✓ Sauvegardé avec succès ! Le site est mis à jour.
        </div>
      )}

      {fields.map((f) => (
        <div key={f.key}>
          <label className="block text-sm font-semibold text-gray-800 mb-1">{f.label}</label>
          <p className="text-xs text-gray-400 mb-2">{f.hint}</p>
          <input
            type="number"
            min={0}
            value={counts[f.key]}
            onChange={(e) => set(f.key, parseInt(e.target.value) || 0)}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-lg font-medium focus:border-[#0A2342] focus:outline-none transition-colors"
          />
        </div>
      ))}

      <button
        onClick={save}
        disabled={loading}
        className="w-full bg-[#0A2342] text-white rounded-xl py-3.5 font-semibold hover:bg-[#1B4F8C] transition-colors disabled:opacity-50 text-base"
      >
        {loading ? 'Sauvegarde…' : 'Sauvegarder'}
      </button>
    </div>
  )
}
