'use client'

import { useParams, notFound } from 'next/navigation'
import { zones } from '@/lib/data/zones'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  MapPinIcon, ArrowLeftIcon, ArrowRightIcon,
  CheckCircleIcon, BuildingOffice2Icon, EnvelopeIcon,
  CpuChipIcon, BoltIcon, TruckIcon,
} from '@heroicons/react/24/outline'
import LightPageHero from '@/components/ui/LightPageHero'
import LightSection from '@/components/ui/LightSection'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55 },
}

export default function ZoneDetailPage() {
  const params = useParams()
  const slug = Array.isArray(params?.slug) ? params.slug[0] : (params?.slug as string)
  const zone = zones.find((z) => z.slug === slug)

  if (!zone) return null // handled by Next.js notFound in server context

  const stats = [
    { label: 'Superficie totale', value: zone.superficie },
    { label: 'Entreprises', value: String(zone.entreprises || '—') },
    { label: 'Emplois créés', value: zone.emplois ? zone.emplois.toLocaleString('fr-FR') : '—' },
    { label: 'Investissement', value: zone.investissement },
  ]

  return (
    <div className="min-h-screen">

      {/* ── HERO ── */}
      <LightPageHero
        backHref="/zones"
        backLabel="Toutes les zones"
        eyebrow={zone.sector}
        title={zone.name}
        subtitle={zone.description}
        variant={1}
        accentColor={zone.color}
        minHeight="min-h-[60vh]"
        badges={
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white"
              style={{ backgroundColor: zone.color }}
            >
              <span>{zone.sectorIcon}</span> {zone.sector}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
              <MapPinIcon className="w-3.5 h-3.5" /> {zone.location}
            </span>
          </div>
        }
      />

      {/* ── STATS RAPIDES ── */}
      <LightSection className="py-14" image="aerial">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-md transition-all relative overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: `linear-gradient(90deg, ${zone.color}, transparent)` }}
                />
                <div className="text-2xl font-bold text-[#0A2342] mb-1">{s.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </LightSection>

      {/* ── AVANTAGES & INFRASTRUCTURE ── */}
      <LightSection className="py-20" alt image="infra">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Avantages */}
            <motion.div {...fadeUp}>
              <div className="inline-flex items-center gap-2 mb-3" style={{ color: zone.color }}>
                <span className="w-6 h-px" style={{ backgroundColor: zone.color + '80' }} />
                <span className="text-xs font-bold uppercase tracking-widest">Avantages</span>
              </div>
              <h2 className="text-2xl font-bold text-[#0A2342] mb-8">
                Pourquoi choisir cette zone ?
              </h2>
              <div className="space-y-4">
                {zone.advantages.map((adv, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition-all"
                  >
                    <CheckCircleIcon
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                      style={{ color: zone.color }}
                    />
                    <span className="text-sm text-gray-700 leading-relaxed">{adv}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Infrastructure */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 mb-3" style={{ color: zone.color }}>
                <span className="w-6 h-px" style={{ backgroundColor: zone.color + '80' }} />
                <span className="text-xs font-bold uppercase tracking-widest">Infrastructure</span>
              </div>
              <h2 className="text-2xl font-bold text-[#0A2342] mb-8">
                Équipements & Installations
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {zone.infrastructure.map((infra, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition-all"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: zone.color + '15' }}
                    >
                      <BoltIcon className="w-4 h-4" style={{ color: zone.color }} />
                    </div>
                    <span className="text-sm text-gray-700">{infra}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </LightSection>

      {/* ── INVESTIR / CONTACT ── */}
      <LightSection className="py-20" image="aerial">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Investir CTA */}
            <motion.div
              {...fadeUp}
              className="relative bg-white border border-gray-200 rounded-2xl p-8 overflow-hidden hover:shadow-md transition-all"
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: `linear-gradient(90deg, ${zone.color}, transparent)` }}
              />
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: zone.color + '18', border: `1px solid ${zone.color}30` }}
              >
                <BuildingOffice2Icon className="w-6 h-6" style={{ color: zone.color }} />
              </div>
              <h3 className="text-xl font-bold text-[#0A2342] mb-3">Investir dans cette zone</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Déposez votre manifestation d'intérêt et bénéficiez d'un accompagnement personnalisé
                par notre Guichet Unique pour toutes vos démarches d'installation.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/guichet-unique"
                  className="inline-flex items-center gap-2 px-5 py-3 text-white font-semibold rounded-xl text-sm transition-all hover:scale-105 active:scale-95"
                  style={{ backgroundColor: zone.color }}
                >
                  Guichet Unique <ArrowRightIcon className="w-4 h-4" />
                </Link>
                <Link
                  href="/demarches"
                  className="inline-flex items-center gap-2 px-5 py-3 font-semibold rounded-xl text-sm border border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  Voir les démarches
                </Link>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="relative bg-white border border-gray-200 rounded-2xl p-8 overflow-hidden hover:shadow-md transition-all"
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: `linear-gradient(90deg, ${zone.color}, transparent)` }}
              />
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: zone.color + '18', border: `1px solid ${zone.color}30` }}
              >
                <EnvelopeIcon className="w-6 h-6" style={{ color: zone.color }} />
              </div>
              <h3 className="text-xl font-bold text-[#0A2342] mb-3">Contact de la zone</h3>
              <p className="text-sm text-gray-600 mb-5">
                Notre équipe locale est disponible pour répondre à toutes vos questions sur cette zone.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <MapPinIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-600">{zone.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <EnvelopeIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <a
                    href={`mailto:${zone.contact}`}
                    className="font-medium hover:underline transition-colors"
                    style={{ color: zone.color }}
                  >
                    {zone.contact}
                  </a>
                </div>
              </div>
              <div className="mt-6 pt-5 border-t border-gray-100">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold hover:opacity-75 transition-opacity"
                  style={{ color: zone.color }}
                >
                  Nous contacter <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </LightSection>

      {/* ── AUTRES ZONES ── */}
      <LightSection className="py-16" alt image="infra">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-8">
            <div className="inline-flex items-center gap-2 text-[#C4894A] text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-6 h-px bg-[#C4894A]/60" /> Explorer
            </div>
            <h2 className="text-2xl font-bold text-[#0A2342]">Autres zones économiques</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {zones
              .filter((z) => z.slug !== zone.slug)
              .slice(0, 3)
              .map((z, i) => (
                <motion.div
                  key={z.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={`/zones/${z.slug}`}
                    className="block group bg-white border border-gray-200 rounded-2xl p-5 hover:border-gray-300 hover:shadow-md transition-all relative overflow-hidden"
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5"
                      style={{ background: `linear-gradient(90deg, ${z.color}, transparent)` }}
                    />
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white"
                        style={{ backgroundColor: z.color }}
                      >
                        {z.sector}
                      </span>
                    </div>
                    <h3 className="font-bold text-[#0A2342] mb-1 group-hover:text-[#1B4F8C] transition-colors">
                      {z.name}
                    </h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPinIcon className="w-3.5 h-3.5" /> {z.location}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-xs font-semibold" style={{ color: z.color }}>
                      Découvrir <ArrowRightIcon className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
          <motion.div {...fadeUp} className="mt-8 text-center">
            <Link
              href="/zones"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-300 hover:shadow-sm transition-all text-sm"
            >
              <ArrowLeftIcon className="w-4 h-4" /> Voir toutes les 7 zones
            </Link>
          </motion.div>
        </div>
      </LightSection>
    </div>
  )
}
