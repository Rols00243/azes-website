import { zones, getZoneBySlug } from '@/lib/data/zones'
import { getZoneDetail } from '@/lib/server-data'
import type { ZoneDetail } from '@/lib/server-data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPinIcon, EnvelopeIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import type { Metadata } from 'next'
import ZoneDetailBlocks from './ZoneDetailBlocks'

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return zones.map((z) => ({ slug: z.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const zone = getZoneBySlug(params.slug)
  if (!zone) return {}
  return {
    title: `${zone.name} — AZES`,
    description: zone.description.substring(0, 160),
  }
}

// Empty detail fallback
function emptyDetail(slug: string): ZoneDetail {
  return {
    foncier:       { superficieTotale: 0, superficieIndustrielle: 0, superficieEmprises: 0, updatedAt: '' },
    activite:      { secteurs: [], nbIndustries: 0, updatedAt: '' },
    infrastructures: { lineaireRoutier: 0, energieMW: 0, updatedAt: '' },
    impact:        { emplois: 0, investissement: '$0', updatedAt: '' },
  }
}

export default function ZoneDetailPage({ params }: Props) {
  const zone   = getZoneBySlug(params.slug)
  if (!zone) notFound()

  const detail = getZoneDetail(params.slug) ?? emptyDetail(params.slug)

  return (
    <div className="bg-[#040810] min-h-screen">

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[68vh] flex flex-col overflow-hidden bg-black pt-20">
        {/* Dark gradient base */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #030b1a 0%, ${zone.color}28 55%, #030b1a 100%)`,
          }}
        />
        {/* Accent glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ backgroundColor: zone.color }}
        />
        {/* Hex pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]">
          <defs>
            <pattern id={`hex-${zone.slug}`} width="52" height="60" patternUnits="userSpaceOnUse">
              <polygon points="26,2 50,15 50,45 26,58 2,45 2,15" fill="none" stroke={zone.color} strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#hex-${zone.slug})`} />
        </svg>
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#040810] via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${zone.color}70, transparent)` }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end flex-1 max-w-7xl mx-auto px-6 lg:px-12 pb-16 pt-10 w-full">
          <div className="max-w-3xl">
            <Link href="/zones"
              className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/80 text-sm mb-8 transition-colors">
              ← Toutes les zones
            </Link>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="text-xs font-bold px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: `${zone.color}CC` }}>
                {zone.sector}
              </span>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white/70 flex items-center gap-1">
                <MapPinIcon className="w-3 h-3" /> {zone.location}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-bold text-white leading-tight mb-4"
              style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)' }}>
              {zone.name}
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-2xl font-light">
              {zone.description.split('.')[0]}.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4 BLOCS DE DONNÉES ───────────────────────────────────────── */}
      <ZoneDetailBlocks detail={detail} zone={zone} />

      {/* ── AVANTAGES ────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#040810]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Avantages compétitifs */}
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: zone.color }}>
                Avantages
              </p>
              <h2 className="text-2xl font-bold text-white mb-7">Pourquoi choisir cette zone ?</h2>
              <div className="space-y-3">
                {zone.advantages.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: zone.color }} />
                    <span className="text-white/70 text-sm leading-relaxed">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Infrastructures */}
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: zone.color }}>
                Infrastructures
              </p>
              <h2 className="text-2xl font-bold text-white mb-7">Ce que vous trouverez sur place</h2>
              <div className="grid grid-cols-1 gap-2">
                {zone.infrastructure.map((inf, i) => (
                  <div key={i} className="flex items-center gap-3 p-3.5 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: zone.color }} />
                    <span className="text-sm text-white/60">{inf}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SIDEBAR CTA + AUTRES ZONES ───────────────────────────────── */}
      <section className="py-16 bg-[#0a1628] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* CTA Investir */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl p-6 border border-white/10"
                style={{ background: `linear-gradient(135deg, ${zone.color}22, ${zone.color}08)` }}>
                <h3 className="font-bold text-white text-lg mb-3">Investir dans cette zone</h3>
                <p className="text-white/50 text-sm mb-6 leading-relaxed">
                  Intéressé ? Notre équipe vous accompagne dans toutes vos démarches d'installation.
                </p>
                <div className="space-y-2">
                  <Link href="/demarches"
                    className="flex items-center justify-between w-full py-3 px-4 rounded-xl text-sm font-semibold text-white transition-all"
                    style={{ backgroundColor: zone.color }}>
                    Manifester mon intérêt <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                  <Link href="/guichet-unique"
                    className="flex items-center justify-between w-full py-3 px-4 rounded-xl bg-white/[0.06] border border-white/10 text-sm font-semibold text-white/80 hover:bg-white/10 transition-colors">
                    Contacter le Guichet Unique <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <a href={`mailto:${zone.contact}`}
                    className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors">
                    <EnvelopeIcon className="w-4 h-4" /> {zone.contact}
                  </a>
                </div>
              </div>
            </div>

            {/* Autres zones */}
            <div className="lg:col-span-2">
              <h3 className="font-bold text-white text-lg mb-5">Autres zones économiques spéciales</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {zones.filter((z) => z.slug !== zone.slug).map((z) => (
                  <Link key={z.slug} href={`/zones/${z.slug}`}
                    className="flex items-center gap-2.5 p-3.5 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:bg-white/[0.07] hover:border-white/10 transition-all group">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: z.color }} />
                    <div>
                      <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors leading-tight">
                        {z.shortName}
                      </div>
                      <div className="text-[10px] text-white/30 mt-0.5">{z.region}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
