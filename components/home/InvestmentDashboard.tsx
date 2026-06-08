'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  MapPinIcon, BuildingOffice2Icon, UsersIcon, CurrencyDollarIcon,
  ArrowRightIcon, ChartBarIcon, GlobeAltIcon, BoltIcon,
} from '@heroicons/react/24/outline'
import type { Zone } from '@/lib/data/zones'

// ── Animated counter ──────────────────────────────────────────────────────────
function Counter({ end, suffix = '', prefix = '', duration = 1400 }: {
  end: number; suffix?: string; prefix?: string; duration?: number
}) {
  const [val, setVal] = useState(0)
  const ref = useRef(false)
  useEffect(() => {
    if (ref.current) return
    ref.current = true
    if (!end) return setVal(0)
    const start = Date.now()
    const step = () => {
      const p = Math.min((Date.now() - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(ease * end))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end, duration])
  return <>{prefix}{val.toLocaleString('fr-FR')}{suffix}</>
}

// ── Mini bar ──────────────────────────────────────────────────────────────────
function Bar({ pct, color, label, value }: { pct: number; color: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-24 text-right text-xs text-gray-500 truncate flex-shrink-0">{label}</div>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
      <div className="w-20 text-xs font-semibold text-gray-700">{value}</div>
    </div>
  )
}

// ── Radial progress ring ──────────────────────────────────────────────────────
function Ring({ pct, color, label }: { pct: number; color: string; label: string }) {
  const r = 28, circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="72" height="72" viewBox="0 0 72 72" className="-rotate-90">
        <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="5" />
        <motion.circle
          cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="5"
          strokeLinecap="round"
          initial={{ strokeDasharray: `0 ${circ}` }}
          animate={{ strokeDasharray: `${dash} ${circ}` }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />
      </svg>
      <div className="text-xs font-bold text-white -mt-1 drop-shadow">{pct}%</div>
      <div className="text-[10px] text-white/80 drop-shadow">{label}</div>
    </div>
  )
}

// ── Metric card ───────────────────────────────────────────────────────────────
function MetricCard({ icon: Icon, label, value, numeric, suffix, color }: {
  icon: React.ComponentType<{ className?: string }>
  label: string; value: string | number; numeric: boolean; suffix?: string; color: string
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-gray-300 hover:shadow-sm transition-all">
      <div className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-3"
        style={{ backgroundColor: `${color}15`, border: `1px solid ${color}25` }}>
        <span style={{ color }}><Icon className="w-4 h-4" /></span>
      </div>
      <div className="text-xl font-bold text-[#0A2342] tabular-nums">
        {numeric && typeof value === 'number'
          ? <Counter end={value} suffix={suffix} />
          : value}
      </div>
      <div className="text-xs text-gray-400 mt-0.5">{label}</div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
type TabMode = 'global' | 'zone'
type MetricKey = 'emplois' | 'entreprises'

export default function InvestmentDashboard({ zones }: { zones: Zone[] }) {
  const [mode, setMode] = useState<TabMode>('global')
  const [activeSlug, setActiveSlug] = useState(zones[0]?.slug ?? '')
  const [activeMetric, setActiveMetric] = useState<MetricKey>('emplois')

  const zone = zones.find((z) => z.slug === activeSlug)!

  // Global aggregates
  const totalEmplois = zones.reduce((s, z) => s + (z.emplois || 0), 0)
  const totalEntreprises = zones.reduce((s, z) => s + (z.entreprises || 0), 0)
  const maxEmplois = Math.max(...zones.map((z) => z.emplois || 1), 1)
  const maxEntreprises = Math.max(...zones.map((z) => z.entreprises || 1), 1)

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(150deg, #f8f9ff 0%, #ffffff 50%, #f0f8f4 100%)' }} aria-label="Synthèse des investissements">

      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 -right-24 w-[450px] h-[450px] rounded-full blur-3xl"
          style={{ backgroundColor: '#C4894A' }}
        />
        <motion.div
          animate={{ y: [0, 18, 0], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-0 -left-20 w-80 h-80 rounded-full blur-3xl"
          style={{ backgroundColor: '#1B4F8C' }}
        />
      </div>

      {/* Fine data-grid pattern */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: `
          linear-gradient(rgba(196,137,74,0.4) 1px, transparent 1px),
          linear-gradient(90deg, rgba(196,137,74,0.4) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-2 text-[#C4894A] text-xs font-bold uppercase tracking-widest mb-3">
              <ChartBarIcon className="w-4 h-4" /> Tableau de bord
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2342]">Synthèse des Investissements</h2>
            <p className="text-gray-500 mt-2 max-w-lg text-sm">
              Données consolidées et indicateurs de performance des Zones Économiques Spéciales de la RDC.
            </p>
          </motion.div>
          <div className="flex gap-2 flex-shrink-0">
            {(['global', 'zone'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  mode === m
                    ? 'bg-[#C4894A] text-white shadow-md'
                    : 'bg-white border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {m === 'global' ? '🌐 Vue Globale' : '📍 Par Zone'}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">

          {/* ════════════════════════ VUE GLOBALE ════════════════════════ */}
          {mode === 'global' && (
            <motion.div key="global"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
            >
              {/* KPI row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {[
                  { label: 'Zones opérationnelles', value: zones.length, suffix: '', color: '#1B4F8C', icon: GlobeAltIcon },
                  { label: 'Superficie totale', value: '3 200+', numeric: false, color: '#2A7A4B', icon: MapPinIcon },
                  { label: 'Emplois créés', value: totalEmplois || 5000, suffix: '', color: '#C4894A', icon: UsersIcon },
                  { label: 'Entreprises installées', value: totalEntreprises || 20, suffix: '+', color: '#8B5E3C', icon: BuildingOffice2Icon },
                ].map((k, i) => (
                  <motion.div key={k.label}
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.07 }}
                    className="relative bg-white border border-gray-200 rounded-2xl p-6 overflow-hidden hover:border-gray-300 hover:shadow-md transition-all"
                  >
                    <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${k.color}, transparent)` }} />
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${k.color}15`, border: `1px solid ${k.color}25` }}>
                      <k.icon className="w-5 h-5" style={{ color: k.color }} />
                    </div>
                    <div className="text-2xl font-bold text-[#0A2342] tabular-nums">
                      {k.numeric === false ? k.value : <Counter end={k.value as number} suffix={k.suffix} />}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{k.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Bar chart comparison */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Comparaison par zone</span>
                    <div className="flex gap-1">
                      {(['emplois', 'entreprises'] as const).map((m) => (
                        <button key={m} onClick={() => setActiveMetric(m)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                            activeMetric === m ? 'bg-[#C4894A] text-white' : 'text-gray-400 hover:text-gray-600'
                          }`}>
                          {m === 'emplois' ? 'Emplois' : 'Entreprises'}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <AnimatePresence mode="wait">
                      <motion.div key={activeMetric} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                        {[...zones]
                          .sort((a, b) => (b[activeMetric] || 0) - (a[activeMetric] || 0))
                          .map((z) => (
                            <Bar
                              key={z.slug}
                              label={z.shortName}
                              color={z.color}
                              pct={activeMetric === 'emplois'
                                ? ((z.emplois || 0) / maxEmplois) * 100
                                : ((z.entreprises || 0) / maxEntreprises) * 100}
                              value={activeMetric === 'emplois'
                                ? (z.emplois || 0).toLocaleString('fr-FR')
                                : `${z.entreprises || 0}`}
                            />
                          ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Zone pills grid */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-5">Zones & secteurs</div>
                  <div className="grid grid-cols-1 gap-3">
                    {zones.map((z, i) => (
                      <motion.button
                        key={z.slug}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        onClick={() => { setActiveSlug(z.slug); setMode('zone') }}
                        className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 transition-all text-left group"
                      >
                        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: z.color }} />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-gray-800 truncate">{z.shortName}</div>
                          <div className="text-xs text-gray-400">{z.sector}</div>
                        </div>
                        <div className="text-xs text-gray-400 group-hover:text-[#C4894A] transition-colors flex items-center gap-1">
                          Voir <ArrowRightIcon className="w-3 h-3" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <Link href="/zones" className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:border-[#C4894A]/50 hover:text-[#C4894A] transition-all">
                  Explorer toutes les zones <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}

          {/* ════════════════════════ VUE PAR ZONE ════════════════════════ */}
          {mode === 'zone' && (
            <motion.div key="zone"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
            >
              {/* Zone selector */}
              <div className="flex flex-wrap gap-2 mb-8">
                {zones.map((z) => (
                  <button
                    key={z.slug}
                    onClick={() => setActiveSlug(z.slug)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border"
                    style={activeSlug === z.slug
                      ? { backgroundColor: z.color, borderColor: z.color, color: '#fff' }
                      : { backgroundColor: '#fff', borderColor: '#e5e7eb', color: '#6b7280' }}
                  >
                    <span className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: activeSlug === z.slug ? 'rgba(255,255,255,0.7)' : z.color }} />
                    {z.shortName}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={activeSlug}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}
                >
                  {/* Zone header card — keeps colored gradient */}
                  <div className="rounded-2xl overflow-hidden mb-5">
                    <div className="px-7 py-6 relative overflow-hidden"
                      style={{ background: `linear-gradient(135deg, ${zone.color}dd 0%, ${zone.color}99 60%, rgba(10,35,66,0.95) 100%)` }}>
                      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">{zone.sector}</div>
                          <h3 className="text-2xl font-bold text-white">{zone.name}</h3>
                          <div className="flex items-center gap-1.5 mt-1.5 text-white/70 text-sm">
                            <MapPinIcon className="w-4 h-4" /> {zone.location}
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <Ring pct={zone.emplois > 0 ? Math.min(100, Math.round((zone.emplois / 5000) * 100)) : 0} color={zone.color} label="emplois" />
                          <Ring pct={zone.entreprises > 0 ? Math.min(100, Math.round((zone.entreprises / 50) * 100)) : 0} color={zone.color} label="entreprises" />
                          <Link href={`/zones/${zone.slug}`}
                            className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-semibold text-white transition-colors">
                            Fiche zone <ArrowRightIcon className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Metric cards + advantages */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <MetricCard icon={BuildingOffice2Icon} label="Superficie" value={zone.superficie} numeric={false} color={zone.color} />
                      <MetricCard icon={BuildingOffice2Icon} label="Entreprises" value={zone.entreprises} numeric suffix="+" color={zone.color} />
                      <MetricCard icon={UsersIcon} label="Emplois créés" value={zone.emplois} numeric color={zone.color} />
                      <MetricCard icon={CurrencyDollarIcon} label="Investissement" value={zone.investissement} numeric={false} color={zone.color} />

                      {/* Infrastructure tags */}
                      <div className="col-span-2 sm:col-span-4 bg-white border border-gray-200 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <BoltIcon className="w-4 h-4 text-[#C4894A]" />
                          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Infrastructures clés</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {zone.infrastructure.slice(0, 4).map((inf) => (
                            <span key={inf} className="text-xs px-2.5 py-1 rounded-full border border-gray-200 text-gray-600 bg-gray-50">
                              {inf}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl p-5">
                      <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Avantages</div>
                      <ul className="space-y-3">
                        {zone.advantages.slice(0, 5).map((a) => (
                          <li key={a} className="flex items-start gap-2.5 text-sm text-gray-600">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: zone.color }} />
                            {a}
                          </li>
                        ))}
                      </ul>
                      <Link href={`/zones/${zone.slug}`}
                        className="mt-5 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-all hover:opacity-90"
                        style={{ backgroundColor: zone.color }}>
                        Voir la fiche complète <ArrowRightIcon className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
