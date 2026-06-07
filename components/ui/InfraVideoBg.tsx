'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/**
 * InfraVideoBg — Atmospheric background with:
 *  - Cinematic MP4 loop (infra-bg.mp4)
 *  - Urban infrastructure exploded-view image overlay
 *  - Animated SVG utility lines (power=red, data=green, water=blue, sewage=cyan)
 *  - Blueprint grid dots
 *  - Dark gradient vignette
 */

interface Props {
  /** Optional extra dark tint 0–1 (default 0.72) */
  dimAmount?: number
  accentColor?: string
  /** Show the infrastructure schematic image overlay */
  showInfra?: boolean
  children?: React.ReactNode
  className?: string
}

// ── Animated utility line paths ──────────────────────────────────────────────

const LINES = [
  // [x1%, y1%, x2%, y2%, color, duration, delay]
  { x1: '0%', y1: '30%', x2: '100%', y2: '30%', color: '#ef4444', dur: 4.2, delay: 0 },       // power - horizontal
  { x1: '0%', y1: '65%', x2: '100%', y2: '65%', color: '#22c55e', dur: 5.1, delay: 0.8 },     // data - horizontal
  { x1: '0%', y1: '80%', x2: '100%', y2: '55%', color: '#3b82f6', dur: 6.0, delay: 1.5 },     // water - diagonal
  { x1: '0%', y1: '50%', x2: '100%', y2: '75%', color: '#06b6d4', dur: 4.8, delay: 2.2 },     // sewage - diagonal
  { x1: '25%', y1: '0%', x2: '25%', y2: '100%', color: '#ef4444', dur: 5.5, delay: 0.3 },     // power - vertical
  { x1: '70%', y1: '0%', x2: '60%', y2: '100%', color: '#22c55e', dur: 4.6, delay: 1.1 },     // data - vertical
  { x1: '45%', y1: '0%', x2: '55%', y2: '100%', color: '#3b82f6', dur: 5.8, delay: 2.0 },     // water - vertical
  { x1: '85%', y1: '0%', x2: '80%', y2: '100%', color: '#06b6d4', dur: 3.9, delay: 0.6 },     // sewage - vertical
]

// ── Flowing dot nodes ────────────────────────────────────────────────────────

const NODES = [
  { cx: '25%', cy: '30%', color: '#ef4444', r: 4 },
  { cx: '70%', cy: '65%', color: '#22c55e', r: 3 },
  { cx: '45%', cy: '80%', color: '#3b82f6', r: 4 },
  { cx: '85%', cy: '30%', color: '#06b6d4', r: 3 },
  { cx: '25%', cy: '65%', color: '#22c55e', r: 4 },
  { cx: '55%', cy: '55%', color: '#3b82f6', r: 3 },
]

function AnimatedLine({ x1, y1, x2, y2, color, dur, delay }: typeof LINES[0]) {
  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={color}
      strokeWidth="0.6"
      strokeOpacity="0"
      strokeDasharray="8 6"
      initial={{ strokeOpacity: 0, pathLength: 0 }}
      animate={{
        strokeOpacity: [0, 0.45, 0.3, 0.45, 0],
        pathLength: [0, 1],
        strokeDashoffset: [0, -60],
      }}
      transition={{
        duration: dur,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}

export default function InfraVideoBg({
  dimAmount = 0.72,
  accentColor = '#1B4F8C',
  showInfra = true,
  children,
  className = '',
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.playbackRate = 0.65 // slow cinematic pace
    v.play().catch(() => {}) // ignore autoplay block
  }, [])

  return (
    <div className={`relative overflow-hidden ${className}`}>

      {/* ── 1. Video loop ── */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src="/videos/infra-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ opacity: 0.28 }}
        />
      </div>

      {/* ── 2. Urban infrastructure exploded-view image ── */}
      {showInfra && (
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&w=1920&q=60"
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.06, mixBlendMode: 'screen' }}
            loading="lazy"
          />
        </div>
      )}

      {/* ── 3. Dark gradient vignette ── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `rgba(7,14,26,${dimAmount})` }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.4) 100%)' }} />

      {/* ── 4. Blueprint dot-grid ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />

      {/* ── 5. Animated SVG utility lines (power / data / water / sewage) ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        style={{ opacity: 0.6 }}
      >
        {/* Legend labels */}
        <text x="8" y="18" fontSize="7" fill="#ef4444" fillOpacity="0.5" fontFamily="monospace">⬡ POWER</text>
        <text x="8" y="28" fontSize="7" fill="#22c55e" fillOpacity="0.5" fontFamily="monospace">⬡ DATA</text>
        <text x="8" y="38" fontSize="7" fill="#3b82f6" fillOpacity="0.5" fontFamily="monospace">⬡ WATER</text>
        <text x="8" y="48" fontSize="7" fill="#06b6d4" fillOpacity="0.5" fontFamily="monospace">⬡ SEWAGE</text>

        {/* Utility lines */}
        {LINES.map((l, i) => (
          <AnimatedLine key={i} {...l} />
        ))}

        {/* Connection nodes (pulsing dots) */}
        {NODES.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.cx} cy={n.cy} r={n.r}
            fill={n.color}
            initial={{ fillOpacity: 0.2, r: n.r }}
            animate={{ fillOpacity: [0.2, 0.7, 0.2], r: [n.r, n.r + 2, n.r] }}
            transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
          />
        ))}

        {/* Scan-line horizontal (moving from top to bottom) */}
        <motion.line
          x1="0" y1="0%" x2="100%" y2="0%"
          stroke="#C4894A" strokeWidth="0.8" strokeOpacity="0"
          animate={{
            y1: ['0%', '100%', '0%'],
            y2: ['0%', '100%', '0%'],
            strokeOpacity: [0, 0.15, 0.15, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
      </svg>

      {/* ── 6. Accent top separator line ── */}
      <div className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}60, transparent)` }} />

      {/* ── 7. Content slot ── */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
