'use client'

import { useState } from 'react'
import { ChevronDownIcon, PlusIcon, TrashIcon, XMarkIcon, PencilSquareIcon, CheckIcon, FlagIcon } from '@heroicons/react/24/outline'
import type { ZoneProjet } from '@/lib/server-data'

const ACCENT_COLORS = ['#1B4F8C', '#2A7A4B', '#C4894A', '#8B5E3C', '#6B48A0', '#1E7A9E', '#B44B3C', '#4A7A3C']

interface ZoneRow {
  slug: string
  name: string
  region: string
  color: string
  emplois: number
  entreprises: number
  investissement: string
  custom: boolean
}

interface FoncierData { superficieTotale: number; superficieIndustrielle: number; superficieEmprises: number; updatedAt: string }
interface ActiviteData { secteurs: string[]; nbIndustries: number; updatedAt: string }
interface InfraData { lineaireRoutier: number; energieMW: number; updatedAt: string }
interface ImpactData { emplois: number; investissement: string; updatedAt: string }
interface ZoneDetail { foncier: FoncierData; activite: ActiviteData; infrastructures: InfraData; impact: ImpactData }
type ZonesDetailMap = Record<string, ZoneDetail>

const NIVEAUX: ZoneProjet['niveau'][] = ['Préfaisabilité', 'Faisabilité', 'Études', 'En cours', 'Réalisé']
const NIVEAU_COLORS: Record<ZoneProjet['niveau'], string> = {
  'Préfaisabilité': 'bg-gray-100 text-gray-600',
  'Faisabilité':    'bg-blue-100 text-blue-700',
  'Études':         'bg-purple-100 text-purple-700',
  'En cours':       'bg-green-100 text-green-700',
  'Réalisé':        'bg-emerald-100 text-emerald-700',
}

const EMPTY_ZP: Omit<ZoneProjet, 'id' | 'dateCreation'> = {
  zoneSlug: '',
  nom: '',
  niveau: 'Préfaisabilité',
  superficie: '',
  investissements: '',
  partenaires: '',
  secteursVises: [],
}

interface Props {
  initialData: ZoneRow[]
  initialDetail: ZonesDetailMap
  initialZoneProjets: ZoneProjet[]
}

const EMPTY_NEW_ZONE = { name: '', region: '', color: '#1B4F8C', emplois: 0, entreprises: 0, investissement: '$0' }

export default function ZonesForm({ initialData, initialDetail, initialZoneProjets }: Props) {
  const [rows, setRows] = useState(initialData)
  const [detail, setDetail] = useState<ZonesDetailMap>(initialDetail)
  const [savedStats, setSavedStats] = useState(false)
  const [savedDetail, setSavedDetail] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const [newZone, setNewZone] = useState(EMPTY_NEW_ZONE)
  const [msg, setMsg] = useState('')

  // Zone projets state
  const [zoneProjets, setZoneProjets] = useState<ZoneProjet[]>(initialZoneProjets)
  const [openProjetsSlug, setOpenProjetsSlug] = useState<string | null>(null)
  const [addingProjetSlug, setAddingProjetSlug] = useState<string | null>(null)
  const [newProjet, setNewProjet] = useState<Omit<ZoneProjet, 'id' | 'dateCreation'>>(EMPTY_ZP)
  const [editProjetId, setEditProjetId] = useState<string | null>(null)
  const [editProjet, setEditProjet] = useState<ZoneProjet | null>(null)
  const [savingProjet, setSavingProjet] = useState(false)

  function flash(m: string) { setMsg(m); setTimeout(() => setMsg(''), 3500) }

  // ── Create / Delete ────────────────────────────────────────────────────────

  async function createZone() {
    if (!newZone.name.trim()) return
    setLoading(true)
    const res = await fetch('/api/admin/zones', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newZone),
    })
    const data = await res.json()
    if (data.ok) {
      setRows(prev => [...prev, { ...data.zone, custom: true }])
      setNewZone(EMPTY_NEW_ZONE)
      setCreating(false)
      flash(`✓ Zone "${data.zone.name}" créée !`)
    } else {
      flash(`⚠ ${data.error || 'Erreur'}`)
    }
    setLoading(false)
  }

  async function deleteZone(slug: string) {
    if (!confirm('Supprimer cette zone ? Cette action est irréversible.')) return
    await fetch('/api/admin/zones', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ slug }),
    })
    setRows(prev => prev.filter(r => r.slug !== slug))
    flash('✓ Zone supprimée')
  }

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

  // ── Zone Projets CRUD ──────────────────────────────────────────────────────

  async function createZoneProjet(slug: string) {
    if (!newProjet.nom.trim()) return
    setSavingProjet(true)
    const payload = { ...newProjet, zoneSlug: slug }
    const res = await fetch('/api/admin/zone-projets', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
    })
    const data = await res.json()
    setZoneProjets(prev => [...prev, data.item])
    setNewProjet(EMPTY_ZP)
    setAddingProjetSlug(null)
    flash('✓ Projet de zone ajouté !')
    setSavingProjet(false)
  }

  async function saveEditZoneProjet() {
    if (!editProjet) return
    setSavingProjet(true)
    await fetch('/api/admin/zone-projets', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editProjet),
    })
    setZoneProjets(prev => prev.map(p => p.id === editProjet.id ? editProjet : p))
    setEditProjetId(null); setEditProjet(null)
    flash('✓ Projet mis à jour !')
    setSavingProjet(false)
  }

  async function deleteZoneProjet(id: string) {
    if (!confirm('Supprimer ce projet de zone ?')) return
    await fetch('/api/admin/zone-projets', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }),
    })
    setZoneProjets(prev => prev.filter(p => p.id !== id))
    flash('✓ Projet supprimé')
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-4">
      {msg && (
        <div className={`rounded-xl px-4 py-3 text-sm font-medium border ${
          msg.startsWith('⚠') ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-green-50 border-green-200 text-green-800'
        }`}>{msg}</div>
      )}

      {/* ── Create zone button ─────────────────── */}
      {!creating ? (
        <button onClick={() => setCreating(true)}
          className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-2xl py-3.5 text-sm font-semibold text-gray-500 hover:border-[#0A2342] hover:text-[#0A2342] transition-colors">
          <PlusIcon className="w-4 h-4" /> Créer une nouvelle zone
        </button>
      ) : (
        <div className="bg-white rounded-2xl border border-[#0A2342]/20 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-sm">Nouvelle zone économique</h3>
            <button onClick={() => { setCreating(false); setNewZone(EMPTY_NEW_ZONE) }}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100">
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Nom de la zone *</label>
              <input type="text" value={newZone.name}
                onChange={e => setNewZone(n => ({ ...n, name: e.target.value }))}
                className={INPUT} placeholder="ZES de Bandundu" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Région</label>
              <input type="text" value={newZone.region}
                onChange={e => setNewZone(n => ({ ...n, region: e.target.value }))}
                className={INPUT} placeholder="Bandundu" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Couleur d'accent</label>
            <div className="flex flex-wrap gap-2">
              {ACCENT_COLORS.map(c => (
                <button key={c} type="button"
                  onClick={() => setNewZone(n => ({ ...n, color: c }))}
                  className={`w-8 h-8 rounded-lg border-2 transition-all ${newZone.color === c ? 'border-gray-900 scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Emplois</label>
              <input type="number" min={0} value={newZone.emplois}
                onChange={e => setNewZone(n => ({ ...n, emplois: parseInt(e.target.value) || 0 }))}
                className={INPUT} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Entreprises</label>
              <input type="number" min={0} value={newZone.entreprises}
                onChange={e => setNewZone(n => ({ ...n, entreprises: parseInt(e.target.value) || 0 }))}
                className={INPUT} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Investissement</label>
              <input type="text" value={newZone.investissement}
                onChange={e => setNewZone(n => ({ ...n, investissement: e.target.value }))}
                className={INPUT} placeholder="$0" />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={createZone} disabled={loading || !newZone.name.trim()}
              className="flex-1 bg-[#0A2342] text-white rounded-xl py-3 font-semibold hover:bg-[#1B4F8C] transition-colors disabled:opacity-50 text-sm">
              {loading ? 'Création…' : 'Créer la zone'}
            </button>
            <button onClick={() => { setCreating(false); setNewZone(EMPTY_NEW_ZONE) }}
              className="px-5 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:border-gray-300 transition-colors text-sm">
              Annuler
            </button>
          </div>
        </div>
      )}

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
                <span className="text-white/50 text-xs">{z.region}</span>
                {z.custom && (
                  <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full text-white ml-1">Personnalisée</span>
                )}
                <div className="ml-auto flex items-center gap-2">
                  {z.custom && (
                    <button
                      onClick={() => deleteZone(z.slug)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/20 hover:bg-red-500 transition-colors"
                      title="Supprimer cette zone"
                    >
                      <TrashIcon className="w-3.5 h-3.5 text-white" />
                    </button>
                  )}
                </div>
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

      {/* ── Zone Projets section ───────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-1">
          <FlagIcon className="w-4 h-4 text-[#1B4F8C]" />
          <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider">Projets par zone</h3>
        </div>
        <p className="text-xs text-gray-400 mb-4">Suivez l'avancement des projets pour chaque ZES (niveau, superficie, investissements, partenaires, secteurs visés).</p>

        <div className="space-y-3">
          {rows.map((z) => {
            const zProjets = zoneProjets.filter(p => p.zoneSlug === z.slug)
            const isOpen = openProjetsSlug === z.slug
            return (
              <div key={z.slug} className="border border-gray-200 rounded-xl overflow-hidden">
                {/* Accordion header */}
                <button
                  onClick={() => setOpenProjetsSlug(isOpen ? null : z.slug)}
                  className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: z.color }} />
                  <span className="font-semibold text-gray-800 flex-1">{z.name}</span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{zProjets.length} projet{zProjets.length !== 1 ? 's' : ''}</span>
                  <ChevronDownIcon className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="border-t border-gray-100 p-4 space-y-3">
                    {/* Existing projets */}
                    {zProjets.map(proj => (
                      <div key={proj.id} className="border border-gray-100 rounded-xl overflow-hidden">
                        {editProjetId === proj.id && editProjet ? (
                          <div className="p-4 space-y-3">
                            <ZoneProjetFields form={editProjet} set={(k, v) => setEditProjet(p => p ? ({ ...p, [k]: v }) : p)} />
                            <div className="flex gap-2">
                              <button onClick={saveEditZoneProjet} disabled={savingProjet}
                                className="flex-1 bg-[#0A2342] text-white rounded-lg py-2 font-semibold hover:bg-[#1B4F8C] transition-colors flex items-center justify-center gap-2 text-sm">
                                <CheckIcon className="w-4 h-4" /> {savingProjet ? '…' : 'Enregistrer'}
                              </button>
                              <button onClick={() => { setEditProjetId(null); setEditProjet(null) }}
                                className="px-3 rounded-lg border border-gray-200 text-gray-500 hover:border-gray-300 text-sm">
                                Annuler
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start gap-3 p-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap gap-2 mb-1.5">
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${NIVEAU_COLORS[proj.niveau]}`}>
                                  {proj.niveau}
                                </span>
                              </div>
                              <div className="font-semibold text-gray-900 text-sm">{proj.nom}</div>
                              <div className="grid grid-cols-2 gap-x-4 mt-1.5 text-xs text-gray-500">
                                {proj.superficie && <span>Superficie : {proj.superficie}</span>}
                                {proj.investissements && <span>Investissement : {proj.investissements}</span>}
                                {proj.partenaires && <span className="col-span-2">Partenaires : {proj.partenaires}</span>}
                                {proj.secteursVises.length > 0 && (
                                  <span className="col-span-2">Secteurs : {proj.secteursVises.join(', ')}</span>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-1 flex-shrink-0">
                              <button onClick={() => { setEditProjetId(proj.id); setEditProjet(proj) }}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-colors">
                                <PencilSquareIcon className="w-3.5 h-3.5" />
                              </button>
                              <button onClick={() => deleteZoneProjet(proj.id)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors">
                                <TrashIcon className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Add new projet */}
                    {addingProjetSlug === z.slug ? (
                      <div className="border border-[#1B4F8C]/20 rounded-xl p-4 space-y-3">
                        <h4 className="font-semibold text-gray-800 text-sm">Nouveau projet pour {z.name}</h4>
                        <ZoneProjetFields
                          form={newProjet}
                          set={(k, v) => setNewProjet(p => ({ ...p, [k]: v }))}
                        />
                        <div className="flex gap-2">
                          <button onClick={() => createZoneProjet(z.slug)} disabled={savingProjet || !newProjet.nom.trim()}
                            className="flex-1 text-sm bg-[#0A2342] text-white rounded-lg py-2.5 font-semibold hover:bg-[#1B4F8C] transition-colors disabled:opacity-50">
                            {savingProjet ? 'Création…' : 'Ajouter le projet'}
                          </button>
                          <button onClick={() => { setAddingProjetSlug(null); setNewProjet(EMPTY_ZP) }}
                            className="px-3 rounded-lg border border-gray-200 text-gray-500 text-sm hover:border-gray-300">
                            Annuler
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setAddingProjetSlug(z.slug); setNewProjet({ ...EMPTY_ZP, zoneSlug: z.slug }) }}
                        className="w-full flex items-center justify-center gap-2 border border-dashed border-gray-200 rounded-xl py-3 text-sm text-gray-500 hover:border-[#1B4F8C] hover:text-[#1B4F8C] transition-colors"
                      >
                        <PlusIcon className="w-4 h-4" /> Ajouter un projet à cette zone
                      </button>
                    )}
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

function ZoneProjetFields({
  form,
  set,
}: {
  form: Omit<ZoneProjet, 'id' | 'dateCreation'> | ZoneProjet
  set: (k: string, v: string | string[]) => void
}) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Nom du projet *</label>
        <input type="text" value={form.nom}
          onChange={e => set('nom', e.target.value)}
          className={INPUT} placeholder="Parc photovoltaïque — 50 MW" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Niveau</label>
          <select value={form.niveau} onChange={e => set('niveau', e.target.value)} className={INPUT}>
            {NIVEAUX.map(n => <option key={n}>{n}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Superficie</label>
          <input type="text" value={form.superficie}
            onChange={e => set('superficie', e.target.value)}
            className={INPUT} placeholder="450 ha" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Investissements estimés</label>
          <input type="text" value={form.investissements}
            onChange={e => set('investissements', e.target.value)}
            className={INPUT} placeholder="$120 M" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Partenaires</label>
          <input type="text" value={form.partenaires}
            onChange={e => set('partenaires', e.target.value)}
            className={INPUT} placeholder="Bolloré, IFC…" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1.5">
          Secteurs visés <span className="font-normal text-gray-400">(séparés par des virgules)</span>
        </label>
        <input type="text"
          value={form.secteursVises.join(', ')}
          onChange={e => set('secteursVises', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
          className={INPUT} placeholder="Énergie, Logistique, Agro-industrie" />
      </div>
    </div>
  )
}
