'use client'
import type { SiteStats, Slide } from '@/lib/server-data'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

export default function HeroSection({ stats, slides }: { stats: SiteStats; slides: Slide[] }) {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), [slides.length])
  const prev = useCallback(() => setCurrent(c => (c - 1 + slides.length) % slides.length), [slides.length])

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, next])

  const goTo = (i: number) => {
    setCurrent(i)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 12000)
  }

  const slide = slides[current]

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-black">

      {/* ── Cinematic video loop — base layer (always visible) ── */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.55 }}
        onLoadedData={(e) => { (e.target as HTMLVideoElement).playbackRate = 0.55 }}
      >
        <source src="/videos/zone-bg.mp4" type="video/mp4" />
        <source src="/videos/infra-bg.mp4" type="video/mp4" />
      </video>

      {/* Background image carousel — semi-transparent so video bleeds through */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 0.45, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.image}
            alt={slide.tag}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Layered overlays for cinematic depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end flex-1 max-w-7xl mx-auto px-6 lg:px-12 pb-28 pt-36 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-white/70 text-sm font-medium tracking-widest uppercase">
                {slide.tag}
              </span>
            </motion.div>

            {/* Headline — Apple-style huge type */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-bold text-white leading-[0.95] mb-3"
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
            >
              {slide.headline}
              <br />
              <span className="text-white/90">{slide.accent}</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl font-light"
            >
              {slide.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href={slide.ctaHref}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all text-sm tracking-wide"
              >
                {slide.ctaLabel}
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={slide.ctaSecondHref}
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/40 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/70 transition-all text-sm tracking-wide"
              >
                {slide.ctaSecondLabel}
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom bar — slide indicators + navigation + stats */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        {/* Progress bar */}
        <div className="flex h-0.5">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className="flex-1 relative overflow-hidden bg-white/20 transition-colors hover:bg-white/30"
              aria-label={`Slide ${i + 1}`}
            >
              {i === current && isAutoPlaying && (
                <motion.div
                  className="absolute inset-y-0 left-0 bg-white"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 6, ease: 'linear' }}
                />
              )}
              {i === current && !isAutoPlaying && (
                <div className="absolute inset-y-0 left-0 right-0 bg-white" />
              )}
            </button>
          ))}
        </div>

        {/* Bottom controls */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
          {/* Stats */}
          <div className="hidden md:flex gap-8">
            {[
              { label: 'Zones actives', value: String(stats.zones_actives) },
              { label: 'Investissements', value: stats.investissements },
              { label: 'Emplois', value: stats.emplois.toLocaleString('fr-FR') },
            ].map(s => (
              <div key={s.label}>
                <div className="text-white font-bold text-lg leading-none">{s.value}</div>
                <div className="text-white/40 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Slide counter + arrows */}
          <div className="flex items-center gap-4 ml-auto">
            <span className="text-white/40 text-sm tabular-nums">
              {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => { prev(); setIsAutoPlaying(false) }}
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/60 transition-all"
                aria-label="Slide précédente"
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => { next(); setIsAutoPlaying(false) }}
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/60 transition-all"
                aria-label="Slide suivante"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
