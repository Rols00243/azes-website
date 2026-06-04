'use client'

import { useState } from 'react'
import type { SiteStats } from '@/lib/server-data'

export default function StatistiquesForm({ initialStats }: { initialStats: SiteStats }) {
  const [stats, setStats] = useState(initialStats)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  function set(key: keyof SiteStats, value: string | number) {
    setStats((s) => ({ ...s, [key]: value }))
    setSaved(false)
  }

  async function save() {
    setLoading(true)
    await fetch('/api/admin/stats', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(stats),
    })
    setSaved(true)
    setLoading(false)
    setTimeout(() => setSaved(false), 4000)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl px-4 py-3 text-sm font-medium">
          ✓ Sauvegardé avec succès ! Le site est mis à jour.
        </div>
      )}

      <Field label="Zones actives" hint="Nombre de ZES opérationnelles">
        <input
          type="number"
          min={0}
          value={stats.zones_actives}
          onChange={(e) => set('zones_actives', parseInt(e.target.value) || 0)}
          className={INPUT}
        />
      </Field>

      <Field label="Entreprises installées" hint="Nombre total d'entreprises dans les ZES">
        <input
          type="number"
          min={0}
          value={stats.entreprises}
          onChange={(e) => set('entreprises', parseInt(e.target.value) || 0)}
          className={INPUT}
        />
      </Field>

      <Field label="Investissements totaux" hint='Texte libre — ex : "$5.2 Mrd", "$780M"'>
        <input
          type="text"
          value={stats.investissements}
          onChange={(e) => set('investissements', e.target.value)}
          className={INPUT}
          placeholder="$0"
        />
      </Field>

      <Field label="Emplois créés" hint="Nombre total d'emplois générés">
        <input
          type="number"
          min={0}
          value={stats.emplois}
          onChange={(e) => set('emplois', parseInt(e.target.value) || 0)}
          className={INPUT}
        />
      </Field>

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

function Field({ label, hint, children }: { label: string; hint: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-1">{label}</label>
      <p className="text-xs text-gray-400 mb-2">{hint}</p>
      {children}
    </div>
  )
}

const INPUT = 'w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-lg font-medium focus:border-[#0A2342] focus:outline-none transition-colors'
