'use client'

import { motion } from 'framer-motion'
import type { ZoneDetail } from '@/lib/server-data'
import type { Zone } from '@/lib/data/zones'
import {
  MapIcon, TagIcon, WrenchScrewdriverIcon, ChartBarIcon,
} from '@heroicons/react/24/outline'

interface Props {
  detail: ZoneDetail
  zone: Zone
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function fmtNum(n: number, unit = ''): string {
  if (!n) return '—'
  return n.toLocaleString('fr-FR') + (unit ? ' ' + unit : '')
}

function fmtDate(iso: string): string {
  if (!iso) return null as any
  try { return new Date(iso).toLocaleDateString('fr-FR') } catch { return iso }
}

function UpdatedAt({ date }: { date: string }) {
  if (!date) return null
  return (
    <span className="text-[10px] text-white/25 tabular-nums">MàJ : {fmtDate(date)}</span>
  )
}

// ── Metric row ────────────────────────────────────────────────────────────────

function Metric({ label, value, unit, sub }: {
  label: string; value: string | number; unit?: string; sub?: string
}) {
  const display = typeof value === 'number' ? fmtNum(value, unit) : (value || '—')
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/[0.06] last:border-0">
      <span className="text-sm text-white/50">{label}</span>
      <div className="text-right">
        <span className="text-sm font-semibold text-white tabular-nums">{display}</span>
        {sub && <div className="text-[10px] text-white/30">{sub}</div>}
      </div>
    </div>
  )
}

// ── Block card ────────────────────────────────────────────────────────────────

function Block({
  icon: Icon, title, accentColor, updatedAt, children, index,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  accentColor: string
  updatedAt: string
  children: React.ReactNode
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
      className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/10 transition-all"
    >
      {/* Block header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]"
        style={{ background: `linear-gradient(90deg, ${accentColor}12, transparent)` }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${accentColor}20` }}>
            <span style={{ color: accentColor }}><Icon className="w-4 h-4" /></span>
          </div>
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accentColor }}>
            {title}
          </span>
        </div>
        <UpdatedAt date={updatedAt} />
      </div>

      {/* Block body */}
      <div className="px-5 py-1">
        {children}
      </div>
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ZoneDetailBlocks({ detail, zone }: Props) {
  const c = zone.color

  return (
    <section className="py-20 bg-[#040810]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: c }}>
            Données clés
          </p>
          <h2 className="text-2xl font-bold text-white">Tableau de bord de la zone</h2>
        </motion.div>

        {/* 2×2 grid of blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* ── BLOC 1 : FONCIER ──────────────────────────────── */}
          <Block icon={MapIcon} title="Foncier" accentColor={c}
            updatedAt={detail.foncier.updatedAt} index={0}>
            <Metric
              label="Superficie totale"
              value={detail.foncier.superficieTotale}
              unit="ha"
            />
            <Metric
              label="Parcelles industrielles"
              value={detail.foncier.superficieIndustrielle}
              unit="ha"
            />
            <Metric
              label="Emprises réservées"
              value={detail.foncier.superficieEmprises}
              unit="ha"
            />
          </Block>

          {/* ── BLOC 2 : ACTIVITÉ ────────────────────────────── */}
          <Block icon={TagIcon} title="Activité" accentColor={c}
            updatedAt={detail.activite.updatedAt} index={1}>

            {/* Secteurs — badges */}
            <div className="py-3 border-b border-white/[0.06]">
              <div className="text-sm text-white/50 mb-2">Secteurs d'activité</div>
              <div className="flex flex-wrap gap-1.5">
                {detail.activite.secteurs.length > 0
                  ? detail.activite.secteurs.map((s) => (
                      <span key={s}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-full border"
                        style={{ color: c, borderColor: `${c}50`, backgroundColor: `${c}12` }}>
                        {s}
                      </span>
                    ))
                  : <span className="text-xs text-white/25">—</span>
                }
              </div>
            </div>

            <Metric
              label="Industries installées"
              value={detail.activite.nbIndustries}
            />
          </Block>

          {/* ── BLOC 3 : INFRASTRUCTURES ─────────────────────── */}
          <Block icon={WrenchScrewdriverIcon} title="Infrastructures" accentColor={c}
            updatedAt={detail.infrastructures.updatedAt} index={2}>
            <Metric
              label="Réseau routier interne"
              value={detail.infrastructures.lineaireRoutier}
              unit="ml"
            />
            <Metric
              label="Énergie disponible"
              value={detail.infrastructures.energieMW}
              unit="MW"
            />
          </Block>

          {/* ── BLOC 4 : IMPACT ──────────────────────────────── */}
          <Block icon={ChartBarIcon} title="Impact" accentColor={c}
            updatedAt={detail.impact.updatedAt} index={3}>
            <Metric
              label="Emplois créés"
              value={detail.impact.emplois}
            />
            <Metric
              label="Investissement total"
              value={detail.impact.investissement}
            />
          </Block>

        </div>

        {/* Legend */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-xs text-white/20 mt-6 text-right"
        >
          « — » = donnée non encore renseignée · MàJ = dernière mise à jour
        </motion.p>
      </div>
    </section>
  )
}
