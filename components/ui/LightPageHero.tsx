'use client'

/**
 * LightPageHero — hero clair pour toutes les pages intérieures.
 * Remplace DarkPageHero : fond blanc + image d'infrastructure en filigrane (6%) + orbes animés.
 * Même API props que DarkPageHero pour un remplacement direct.
 */

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

const IMG_INFRA  = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&w=1920&q=60'
const IMG_AERIAL = 'https://images.unsplash.com/photo-1565118531796-763e5082d113?w=1400&q=50'

export type HeroVariant = 1 | 2 | 3 | 4

interface Props {
  eyebrow?: string
  title: string
  titleAccent?: string
  subtitle?: string
  backHref?: string
  backLabel?: string
  badges?: React.ReactNode
  children?: React.ReactNode
  variant?: HeroVariant
  accentColor?: string
  image?: string
  minHeight?: string
}

export default function LightPageHero({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  backHref,
  backLabel = 'Retour',
  badges,
  children,
  variant = 1,
  accentColor = '#1B4F8C',
  minHeight = 'min-h-[52vh]',
}: Props) {
  // Alternate between infra and aerial images by variant
  const bgImg = variant === 2 || variant === 4 ? IMG_AERIAL : IMG_INFRA

  return (
    <section className={`relative ${minHeight} flex flex-col overflow-hidden bg-white pt-20`}>

      {/* ── Atmospheric image watermark ── */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url('${bgImg}')`, opacity: 0.07 }}
      />

      {/* ── Soft white directional vignette ── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.75) 100%)' }} />

      {/* ── Accent color ambient glow ── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 55% 45% at 85% 40%, ${accentColor}09 0%, transparent 70%)` }} />

      {/* ── Animated orb — top right ── */}
      <motion.div aria-hidden
        className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accentColor}07 0%, transparent 70%)` }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* ── Animated orb — bottom left ── */}
      <motion.div aria-hidden
        className="absolute -bottom-20 -left-20 w-[320px] h-[320px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(196,137,74,0.05) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.85, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col justify-end flex-1 max-w-7xl mx-auto px-6 lg:px-12 pb-16 pt-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          {/* Back link */}
          {backHref && (
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05, duration: 0.45 }}>
              <Link href={backHref}
                className="inline-flex items-center gap-1.5 text-gray-400 hover:text-gray-700 text-sm mb-7 transition-colors">
                <ArrowLeftIcon className="w-4 h-4" /> {backLabel}
              </Link>
            </motion.div>
          )}

          {/* Badges */}
          {badges && (
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.45 }}
              className="flex flex-wrap items-center gap-2 mb-5">
              {badges}
            </motion.div>
          )}

          {/* Eyebrow */}
          {eyebrow && (
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12, duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
              <span className="text-sm font-bold tracking-widest uppercase" style={{ color: accentColor }}>{eyebrow}</span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.65 }}
            className="font-bold text-[#0A2342] leading-[0.95] mb-4"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)' }}
          >
            {title}
            {titleAccent && (
              <>
                <br />
                <span style={{ color: accentColor }}>{titleAccent}</span>
              </>
            )}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-gray-500 text-lg leading-relaxed max-w-2xl font-light"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Extra children (CTAs, search bar…) */}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-8"
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <div aria-hidden className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}50, transparent)` }} />
    </section>
  )
}
