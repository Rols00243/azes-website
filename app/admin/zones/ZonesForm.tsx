'use client'

import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

interface ZoneRow {
  slug: string
  name: string
  region: string
  color: string
  emplois: number
  entreprises: number
  investissement: string
}

interface FoncierData { superficieTotale: number; superficieIndustrielle: number; superficieEmprises: number; updatedAt: string }
interface ActiviteData { secteurs: string[]; nbIndustries: number; updatedAt: string }
interface InfraData { lineaireRoutier: number; energieMW: number; updatedAt: string }
interface ImpactData { emplois: number; investissement: string; updatedAt: string }
interface ZoneDetail { foncier: FoncierData; activite: ActiviteData; infrastructures: InfraData; impact: ImpactData }
type ZonesDetailMap = Record<string, ZoneDetail>

interface Props {
  initialData: ZoneRow[]
  initialDetail: ZonesDetailMap
}

export default function ZonesForm({ initialData, initialDetail }: Props) {
  const [rows, setRows] = useState(initialData)
  const [detail, setDetail] = useState<ZonesDetailMap>(initialDetail)
  const [savedStats, setSavedStats] = useState(false)
  const [savedDetail, setSavedDetail] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [openSlug, setOpenSlug] = useState<string | null>(null)

  // ── Stats ──────────────────────────────────────────────────────────────────

  function updateStat(slug: string, key: keyof ZoneRow, value: string | number) {
    setRows((prev) => prev.map((r) => (r.slug === slug ? { ...r, [key]: value } : r)))
    setSavedStats(false)
  }

  async function saveStats() {
    setLoading(true)
    const payload: Record<string, { emplois: number; entreprises: number; investissement: string }> = {}
    for (const r of rows) {
      payload[r.slug] = { emplois: r.emplois, entreprises: r.entreprises, investissement: r.investissement }
    }
    await fetch('/api/admin/zones', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    setSavedStats(true)
    setLoading(false)
    setTimeout(() => setSavedStats(false), 4000)
  }

  // ── Detail ─────────────────────────────────────────────────────────────────

  function updateDetail<B extends keyof ZoneDetail>(slug: string, block: B, key: keyof ZoneDetail[B], value: unknown) {
    setDetail((prev) => ({
      ...prev,
      [slug]: {
        ...prev[slug],
        [block]: { ...prev[slug]?.[block], [key]: value, updatedAt: new Date().toISOString().split('T')[0] },
      },
    }))
    setSavedDetail((s) => ({ ...s, [slug + block]: '' }))
  }

  function updateSecteurs(slug: string, raw: string) {
    const arr = raw.split(',').map((s) => s.trim()).filter(Boolean)
    setDetail((prev) => ({
      ...prev,
      [slug]: { ...prev[slug], activite: { ...prev[slug]?.activite, secteurs: arr, updatedAt: new Date().toISOString().split('T')[0] } },
    }))
  }

  async function saveDetailBlock(slug: string, block: keyof ZoneDetail) {
    setLoading(true)
    await fetch('/api/admin/zones-detail', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, block, data: detail[slug]?.[block] }),
    })
    setSavedDetail((s) => ({ ...s, [slug + block]: 'ok' }))
    setLoading(false)
    setTimeout(() => setSavedDetail((s) => ({ ...s, [slug + block]: '' })), 4000)
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-4">
      {/* ── Stats section ──────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-bold text-gray-700 text-sm mb-4 uppercase tracking-wider">Statistiques globales par zone</h3>
        {savedStats && (
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl px-4 py-3 text-sm font-medium mb-4">
            ✓ Statistiques sauvegardées !
          </div>
        )}
        <div className="space-y-4">
          {rows.map((z) => (
            <div key={z.slug} className="rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-3 flex items-center gap-3" style={{ backgroundColor: z.color }}>
                <div className="w-2 h-2 rounded-full bg-white/70" />
                <span className="text-white font-semibold">{z.name}</span>
                <span className="text-white/50 text-xs ml-auto">{z.region}</span>
              </div>
              <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Emplois créés</label>
                  <input type="number" min={0} value={z.emplois}
                    onChange={(e) => updateStat(z.slug, 'emplois', parseInt(e.target.value) || 0)}
                    className={INPUT} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Entreprises</label>
                  <input type="number" min={0} value={z.entreprises}
                    onChange={(e) => updateStat(z.slug, 'entreprises', parseInt(e.target.value) || 0)}
                    className={INPUT} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Investissement</label>
                  <input type="text" value={z.investissement}
                    onChange={(e) => updateStat(z.slug, 'investissement', e.target.value)}
                    className={INPUT} placeholder="$0" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={saveStats} disabled={loading}
          className="w-full mt-4 bg-[#0A2342] text-white rounded-xl py-3.5 font-semibold hover:bg-[#1B4F8C] transition-colors disabled:opacity-50 text-sm">
          {loading ? 'Sauvegarde…' : 'Sauvegarder les statistiques'}
        </button>
      </div>

      {/* ── Detail blocks section ──────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-bold text-gray-700 text-sm mb-1 uppercase tracking-wider">Données détaillées par bloc</h3>
        <p className="text-xs text-gray-400 mb-4">Chaque bloc peut être mis à jour indépendamment. La date MàJ est mise à jour automatiquement.</p>

        <div className="space-y-3">
          {rows.map((z) => {
            const d = detail[z.slug]
            const isOpen = openSlug === z.slug

            return (
              <div key={z.slug} className="border border-gray-200 rounded-xl overflow-hidden">
                {/* Zone accordion header */}
                <button
                  onClick={() => setOpenSlug(isOpen ? null : z.slug)}
                  className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: z.color }} />
                  <span className="font-semibold text-gray-800 flex-1">{z.name}</span>
                  <span className="text-xs text-gray-400">{z.region}</span>
                  <ChevronDownIcon className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && d && (
                  <div className="border-t border-gray-100 p-5 grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* FONCIER */}
                    <BlockCard
                      title="Foncier"
                      color={z.color}
                      savedKey={z.slug + 'foncier'}
                      savedDetail={savedDetail}
                      onSave={() => saveDetailBlock(z.slug, 'foncier')}
                      loading={loading}
                    >
                      <Field label="Superficie totale (ha)" type="number" value={d.foncier.superficieTotale}
                        onChange={(v) => updateDetail(z.slug, 'foncier', 'superficieTotale', parseFloat(v) || 0)} />
                      <Field label="Parcelles industrielles (ha)" type="number" value={d.foncier.superficieIndustrielle}
                        onChange={(v) => updateDetail(z.slug, 'foncier', 'superficieIndustrielle', parseFloat(v) || 0)} />
                      <Field label="Emprises réservées (ha)" type="number" value={d.foncier.superficieEmprises}
                        onChange={(v) => updateDetail(z.slug, 'foncier', 'superficieEmprises', parseFloat(v) || 0)} />
                      <Field label="Date MàJ" type="date" value={d.foncier.updatedAt}
                        onChange={(v) => updateDetail(z.slug, 'foncier', 'updatedAt', v)} />
                    </BlockCard>

                    {/* ACTIVITÉ */}
                    <BlockCard
                      title="Activité"
                      color={z.color}
                      savedKey={z.slug + 'activite'}
                      savedDetail={savedDetail}
                      onSave={() => saveDetailBlock(z.slug, 'activite')}
                      loading={loading}
                    >
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                          Secteurs d'activité <span className="font-normal text-gray-400">(séparés par des virgules)</span>
                        </label>
                        <textarea
                          value={d.activite.secteurs.join(', ')}
                          onChange={(e) => updateSecteurs(z.slug, e.target.value)}
                          rows={2}
                          className={INPUT + ' resize-none'}
                        />
                      </div>
                      <Field label="Industries installées" type="number" value={d.activite.nbIndustries}
                        onChange={(v) => updateDetail(z.slug, 'activite', 'nbIndustries', parseInt(v) || 0)} />
                      <Field label="Date MàJ" type="date" value={d.activite.updatedAt}
                        onChange={(v) => updateDetail(z.slug, 'activite', 'updatedAt', v)} />
                    </BlockCard>

                    {/* INFRASTRUCTURES */}
                    <BlockCard
                      title="Infrastructures"
                      color={z.color}
                      savedKey={z.slug + 'infrastructures'}
                      savedDetail={savedDetail}
                      onSave={() => saveDetailBlock(z.slug, 'infrastructures')}
                      loading={loading}
                    >
                      <Field label="Réseau routier (ml)" type="number" value={d.infrastructures.lineaireRoutier}
                        onChange={(v) => updateDetail(z.slug, 'infrastructures', 'lineaireRoutier', parseInt(v) || 0)} />
                      <Field label="Énergie disponible (MW)" type="number" value={d.infrastructures.energieMW}
                        onChange={(v) => updateDetail(z.slug, 'infrastructures', 'energieMW', parseFloat(v) || 0)} />
                      <Field label="Date MàJ" type="date" value={d.infrastructures.updatedAt}
                        onChange={(v) => updateDetail(z.slug, 'infrastructures', 'updatedAt', v)} />
                    </BlockCard>

                    {/* IMPACT */}
                    <BlockCard
                      title="Impact"
                      color={z.color}
                      savedKey={z.slug + 'impact'}
                      savedDetail={savedDetail}
                      onSave={() => saveDetailBlock(z.slug, 'impact')}
                      loading={loading}
                    >
                      <Field label="Emplois créés" type="number" value={d.impact.emplois}
                        onChange={(v) => updateDetail(z.slug, 'impact', 'emplois', parseInt(v) || 0)} />
                      <Field label="Investissement total" type="text" value={d.impact.investissement}
                        onChange={(v) => updateDetail(z.slug, 'impact', 'investissement', v)} placeholder="$0" />
                      <Field label="Date MàJ" type="date" value={d.impact.updatedAt}
                        onChange={(v) => updateDetail(z.slug, 'impact', 'updatedAt', v)} />
                    </BlockCard>

                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function BlockCard({
  title, color, savedKey, savedDetail, onSave, loading, children,
}: {
  title: string; color: string; savedKey: string; savedDetail: Record<string, string>
  onSave: () => void; loading: boolean; children: React.ReactNode
}) {
  return (
    <div className="border border-gray-100 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color }}>{title}</span>
        {savedDetail[savedKey] === 'ok' && (
          <span className="text-xs text-green-600 font-semibold">✓ Sauvegardé</span>
        )}
      </div>
      <div className="space-y-3">{children}</div>
      <button
        onClick={onSave}
        disabled={loading}
        className="w-full mt-4 py-2 text-white text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40"
        style={{ backgroundColor: color }}
      >
        {loading ? '…' : `Sauvegarder ${title}`}
      </button>
    </div>
  )
}

function Field({ label, type, value, onChange, placeholder }: {
  label: string; type: string; value: string | number; onChange: (v: string) => void; placeholder?: string
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={INPUT}
      />
    </div>
  )
}

const INPUT = 'w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 font-medium focus:border-[#0A2342] focus:outline-none transition-colors text-sm'
