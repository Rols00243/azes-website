'use client'

/**
 * LightSection — atmospheric light background for interior page content sections.
 * White / gray-50 base with two subtle infrastructure image overlays:
 *   INFRA  = infrastructure exploded view (Power / Data / Water / Sewage layers)
 *   AERIAL = aerial view of an industrial economic zone
 * Both images render at 4–5 % opacity — readable content, strong visual ambiance.
 */

import { motion } from 'framer-motion'

export const IMG_INFRA  = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&w=1920&q=60'
export const IMG_AERIAL = 'https://images.unsplash.com/photo-1565118531796-763e5082d113?w=1400&q=50'

interface Props {
  children: React.ReactNode
  className?: string
  /** alternate = gray-50 base instead of white */
  alt?: boolean
  /** which atmospheric image to use (default: INFRA) */
  image?: 'infra' | 'aerial' | string
  /** extra opacity 0–1 for the image (default 0.045) */
  imageOpacity?: number
}

export default function LightSection({
  children,
  className = '',
  alt = false,
  image = 'infra',
  imageOpacity = 0.045,
}: Props) {
  const src =
    image === 'infra'  ? IMG_INFRA :
    image === 'aerial' ? IMG_AERIAL :
    image // allow raw URL too

  return (
    <section className={`relative overflow-hidden ${alt ? 'bg-gray-50' : 'bg-white'} ${className}`}>

      {/* ── Atmospheric image watermark ── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: `url('${src}')`, opacity: imageOpacity }}
      />

      {/* ── Very soft directional vignette ── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 60%, rgba(255,255,255,0.4) 100%)' }}
      />

      {/* ── Animated ambient glow — top-right ── */}
      <motion.div
        aria-hidden
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(27,79,140,0.04) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* ── Animated ambient glow — bottom-left ── */}
      <motion.div
        aria-hidden
        className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(196,137,74,0.03) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* ── Content ── */}
      <div className="relative z-10">{children}</div>
    </section>
  )
}
