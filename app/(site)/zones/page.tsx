import { zones } from '@/lib/data/zones'
import Link from 'next/link'
import { MapPinIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import type { Metadata } from 'next'
import MapZES from '@/components/MapZES'
import DarkPageHero from '@/components/ui/DarkPageHero'

export const metadata: Metadata = {
  title: 'Nos Zones Économiques Spéciales — AZES',
  description: 'Découvrez les 7 zones économiques spéciales de la RDC : Maluku, Kin-Malebo, Kinsevere, Kiswishi, Musompo, Nganda-Jika et Kalamba-Mbuji.',
}

export default function ZonesPage() {
  return (
    <div className="bg-[#040810] min-h-screen">

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <DarkPageHero
        eyebrow="Territoires d'opportunités"
        title="Nos 7 Zones"
        titleAccent="Économiques Spéciales"
        subtitle="Sept zones stratégiques couvrant les secteurs clés de l'économie congolaise, de l'industrie minière à l'agro-industrie."
        variant={1}
        accentColor="#1B4F8C"
      />

      {/* ── CARTE INTERACTIVE ─────────────────────────────────────────── */}
      <section className="py-20 bg-[#040810]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="text-xs font-semibold tracking-widest uppercase text-[#1B4F8C] mb-2">Géographie</div>
            <h2 className="text-3xl font-bold text-white mb-3">Carte interactive des ZES</h2>
            <p className="text-white/40 max-w-xl mx-auto text-sm">Survolez les marqueurs pour explorer chaque zone économique spéciale.</p>
          </div>
          <MapZES />
        </div>
      </section>

      {/* ── LISTE DES ZONES ───────────────────────────────────────────── */}
      <section className="py-20 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {zones.map((zone, i) => (
            <div
              key={zone.slug}
              className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/10 transition-all group"
              style={{ borderLeft: `3px solid ${zone.color}` }}
            >
              <div className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                  <div className="flex-1">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white"
                        style={{ backgroundColor: `${zone.color}CC` }}>
                        {zone.sector}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-white/40">
                        <MapPinIcon className="w-4 h-4" /> {zone.location}
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors">
                      {zone.name}
                    </h2>
                    <p className="text-white/50 leading-relaxed mb-6 max-w-2xl text-sm">{zone.description}</p>

                    <div className="mb-6">
                      <div className="text-xs font-semibold text-white/30 mb-3 uppercase tracking-wider">Avantages principaux</div>
                      <div className="space-y-2">
                        {zone.advantages.slice(0, 3).map((a) => (
                          <div key={a} className="flex items-start gap-2 text-sm text-white/40">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: zone.color }} />
                            {a}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={`/zones/${zone.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl transition-all hover:scale-105 active:scale-95 text-sm"
                      style={{ backgroundColor: zone.color }}
                    >
                      Découvrir la zone <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Chiffres */}
                  <div className="lg:w-64 grid grid-cols-2 gap-3">
                    {[
                      { label: 'Superficie', value: zone.superficie },
                      { label: 'Entreprises', value: String(zone.entreprises || '—') },
                      { label: 'Emplois', value: zone.emplois ? zone.emplois.toLocaleString('fr-FR') : '—' },
                      { label: 'Investissement', value: zone.investissement },
                    ].map((s) => (
                      <div key={s.label}
                        className="rounded-xl p-4 text-center border border-white/[0.06]"
                        style={{ background: `${zone.color}0D` }}>
                        <div className="font-bold text-white text-base">{s.value}</div>
                        <div className="text-[11px] text-white/35 mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
