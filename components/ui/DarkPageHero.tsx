'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

/**
 * DarkPageHero — cinematic dark hero for all interior pages.
 * variant 1 = diagonal scan lines   (zones, emplois, guichet)
 * variant 2 = dot matrix + vignette (à-propos, démarches, AO)
 * variant 3 = circuit grid          (documents, contact)
 * variant 4 = horizon coloré        (zone-detail, projets)
 */

export type HeroVariant = 1 | 2 | 3 | 4

interface Props {
  eyebrow?: string
  title: string
  titleAccent?: string          // optional coloured last word
  subtitle?: string
  backHref?: string
  backLabel?: string
  badges?: React.ReactNode
  children?: React.ReactNode    // extra bottom content (stats, CTAs…)
  variant?: HeroVariant
  accentColor?: string          // zone / page accent hex
  image?: string                // optional bg image URL
  minHeight?: string            // tailwind class e.g. 'min-h-[60vh]'
}

// ── SVG patterns (one per variant) ───────────────────────────────────────────

const PatternDiagonal = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="diag" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
        <line x1="0" y1="0" x2="0" y2="40" stroke="white" strokeWidth="0.6" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#diag)" />
  </svg>
)

const PatternDots = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="12" cy="12" r="1.2" fill="white" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)" />
  </svg>
)

const PatternCircuit = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="circ" width="60" height="60" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="60" height="60" fill="none" stroke="white" strokeWidth="0.4" />
        <rect x="15" y="15" width="30" height="30" fill="none" stroke="white" strokeWidth="0.3" />
        <circle cx="30" cy="30" r="3" fill="none" stroke="white" strokeWidth="0.4" />
        <line x1="0" y1="30" x2="15" y2="30" stroke="white" strokeWidth="0.4" />
        <line x1="45" y1="30" x2="60" y2="30" stroke="white" strokeWidth="0.4" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#circ)" />
  </svg>
)

const PatternHex = ({ color }: { color: string }) => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="hex" width="52" height="60" patternUnits="userSpaceOnUse">
        <polygon points="26,2 50,15 50,45 26,58 2,45 2,15" fill="none" stroke={color} strokeWidth="0.8" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#hex)" />
  </svg>
)

// ── Overlay gradients (one per variant) ──────────────────────────────────────

function overlayGradient(variant: HeroVariant, accent: string) {
  switch (variant) {
    case 1: return (
      <>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
      </>
    )
    case 2: return (
      <>
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-black/80" />
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black to-transparent" />
      </>
    )
    case 3: return (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/70 to-black/50" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.7)_70%)]" />
      </>
    )
    case 4: return (
      <>
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/40 to-black/90" />
        {/* accent color glow */}
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: `radial-gradient(ellipse 80% 40% at 50% 60%, ${accent}60 0%, transparent 70%)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </>
    )
  }
}

// ── Format date ──────────────────────────────────────────────────────────────

export function fmtDate(iso: string): string {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString('fr-FR')
  } catch {
    return iso
  }
}

// ── Main component ────────────────────────────────────────────────────────────

export default function DarkPageHero({
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
  image,
  minHeight = 'min-h-[62vh]',
}: Props) {
  return (
    <section className={`relative ${minHeight} flex flex-col overflow-hidden bg-black pt-20`}>
      {/* Background image */}
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}

      {/* Fallback dark — night base */}
      {!image && <div className="absolute inset-0 bg-[#020508]" />}

      {/* Per-variant industrial image (low opacity atmospheric) */}
      {!image && variant === 1 && (
        <div className="absolute inset-0 opacity-[0.10]"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1400&q=50')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      )}
      {!image && variant === 2 && (
        <div className="absolute inset-0 opacity-[0.09]"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=50')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      )}
      {!image && variant === 3 && (
        <div className="absolute inset-0 opacity-[0.09]"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=50')`, backgroundSize: 'cover', backgroundPosition: 'center 40%' }} />
      )}
      {!image && variant === 4 && (
        <div className="absolute inset-0 opacity-[0.11]"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1565118531796-763e5082d113?w=1400&q=50')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      )}

      {/* Night-blue directional gradient overlay */}
      {!image && (
        <div className="absolute inset-0" style={{
          background: variant === 4
            ? `linear-gradient(135deg, rgba(3,11,26,0.92) 0%, rgba(2,5,8,0.75) 50%, rgba(3,11,26,0.95) 100%)`
            : variant === 2
            ? 'linear-gradient(160deg, rgba(5,14,28,0.94) 0%, rgba(10,22,40,0.80) 50%, rgba(5,14,28,0.94) 100%)'
            : variant === 3
            ? 'linear-gradient(120deg, rgba(3,8,15,0.95) 0%, rgba(7,21,36,0.85) 60%, rgba(3,11,26,0.92) 100%)'
            : 'linear-gradient(145deg, rgba(3,11,26,0.93) 0%, rgba(6,17,32,0.82) 60%, rgba(13,25,41,0.90) 100%)',
        }} />
      )}

      {/* Overlay */}
      {overlayGradient(variant, accentColor)}

      {/* Pattern texture */}
      {variant === 1 && <PatternDiagonal />}
      {variant === 2 && <PatternDots />}
      {variant === 3 && <PatternCircuit />}
      {variant === 4 && <PatternHex color={accentColor} />}

      {/* ── Ambient glows: orange warmth + pale green ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Orange ember */}
        <div className="absolute rounded-full"
          style={{
            width: '550px', height: '350px',
            top: variant === 2 ? '-80px' : '20%',
            left: variant === 3 ? 'auto' : '-60px',
            right: variant === 3 ? '-60px' : 'auto',
            background: 'radial-gradient(ellipse, rgba(196,137,74,0.14) 0%, transparent 70%)',
          }} />
        {/* Pale green */}
        <div className="absolute rounded-full"
          style={{
            width: '450px', height: '300px',
            bottom: '0',
            right: variant === 1 ? '5%' : 'auto',
            left: variant === 1 ? 'auto' : '5%',
            background: 'radial-gradient(ellipse, rgba(42,122,75,0.10) 0%, transparent 70%)',
          }} />
        {/* Accent color glow */}
        <div className="absolute rounded-full"
          style={{
            width: '400px', height: '400px',
            top: '50%', left: '50%',
            transform: 'translate(-20%, -60%)',
            background: `radial-gradient(circle, ${accentColor}12 0%, transparent 65%)`,
          }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end flex-1 max-w-7xl mx-auto px-6 lg:px-12 pb-16 pt-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          {/* Back link */}
          {backHref && (
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05, duration: 0.45 }}
            >
              <Link
                href={backHref}
                className="inline-flex items-center gap-1.5 text-white/50 hover:text-white/90 text-sm mb-7 transition-colors"
              >
                <ArrowLeftIcon className="w-4 h-4" /> {backLabel}
              </Link>
            </motion.div>
          )}

          {/* Badges row */}
          {badges && (
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.45 }}
              className="flex flex-wrap items-center gap-2 mb-5"
            >
              {badges}
            </motion.div>
          )}

          {/* Eyebrow */}
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12, duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-5"
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
              <span className="text-white/60 text-sm font-medium tracking-widest uppercase">{eyebrow}</span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.65 }}
            className="font-bold text-white leading-[0.95] mb-4"
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
              className="text-white/65 text-lg leading-relaxed max-w-2xl font-light"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Extra children */}
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
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}60, transparent)` }} />
    </section>
  )
}

// ── Reusable dark section wrapper ─────────────────────────────────────────────

export function DarkSection({
  children,
  className = '',
  alt = false,
}: {
  children: React.ReactNode
  className?: string
  alt?: boolean
}) {
  return (
    <section className={`py-20 ${alt ? 'bg-[#0a1628]' : 'bg-[#040810]'} ${className}`}>
      {children}
    </section>
  )
}
