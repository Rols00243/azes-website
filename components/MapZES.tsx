'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { zones } from '@/lib/data/zones'

export default function MapZES() {
  const [hovered, setHovered] = useState<string | null>(null)
  const hoveredZone = zones.find(z => z.slug === hovered)

  return (
    <div className="relative w-full">
      <div className="relative aspect-[4/3] max-w-2xl mx-auto">
        {/* DRC SVG outline */}
        <svg
          viewBox="0 0 400 320"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* DRC simplified outline */}
          <path
            d="M 60 30 L 120 20 L 180 25 L 240 15 L 300 30 L 340 55 L 360 90 L 355 130 L 340 160 L 350 200 L 330 240 L 290 270 L 240 285 L 190 290 L 150 280 L 110 265 L 80 240 L 55 210 L 40 180 L 35 140 L 45 100 L 60 70 Z"
            fill="#EFF6FF"
            stroke="#BFDBFE"
            strokeWidth="2"
            className="drop-shadow-sm"
          />

          {/* River Congo suggestion */}
          <path
            d="M 75 50 Q 110 80 140 110 Q 160 130 175 155 Q 190 175 200 185"
            fill="none"
            stroke="#93C5FD"
            strokeWidth="1.5"
            strokeDasharray="4,3"
            opacity="0.6"
          />

          {/* Zone markers */}
          {zones.map((zone) => {
            // Map percentage coordinates to SVG viewBox (0-400, 0-320)
            const cx = (zone.coordinates.x / 100) * 400
            const cy = (zone.coordinates.y / 100) * 320
            const isHovered = hovered === zone.slug

            return (
              <g key={zone.slug}>
                {/* Pulse ring when hovered */}
                {isHovered && (
                  <motion.circle
                    cx={cx}
                    cy={cy}
                    r={22}
                    fill="none"
                    stroke={zone.color}
                    strokeWidth={1.5}
                    initial={{ r: 14, opacity: 0.8 }}
                    animate={{ r: 26, opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}

                {/* Zone dot */}
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 10 : 8}
                  fill={zone.color}
                  stroke="white"
                  strokeWidth={2}
                  style={{ cursor: 'pointer' }}
                  animate={{ r: isHovered ? 10 : 8 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => setHovered(zone.slug)}
                  onMouseLeave={() => setHovered(null)}
                />

                {/* Zone label */}
                <text
                  x={cx}
                  y={cy + 20}
                  textAnchor="middle"
                  fontSize="7"
                  fontWeight="600"
                  fill={zone.color}
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {zone.shortName}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Tooltip */}
        <AnimatePresence>
          {hoveredZone && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 5 }}
              transition={{ duration: 0.15 }}
              className="absolute top-4 left-4 bg-white rounded-xl shadow-lg border border-gray-100 p-4 max-w-[200px] pointer-events-none z-10"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: hoveredZone.color }} />
                <span className="font-bold text-xs text-gray-900">{hoveredZone.name}</span>
              </div>
              <div className="text-xs text-gray-500 mb-1">{hoveredZone.sector}</div>
              <div className="text-xs text-gray-400">{hoveredZone.location}</div>
              <div className="mt-2 pt-2 border-t border-gray-50 grid grid-cols-2 gap-1">
                <div className="text-center">
                  <div className="text-xs font-bold text-gray-800">{hoveredZone.entreprises}</div>
                  <div className="text-[10px] text-gray-400">entreprises</div>
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold text-gray-800">{hoveredZone.investissement}</div>
                  <div className="text-[10px] text-gray-400">investi</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Zone legend */}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {zones.map((zone) => (
          <Link
            key={zone.slug}
            href={`/zones/${zone.slug}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-100 hover:shadow-md transition-all text-xs font-medium text-gray-700 hover:border-gray-200"
            onMouseEnter={() => setHovered(zone.slug)}
            onMouseLeave={() => setHovered(null)}
          >
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: zone.color }} />
            {zone.shortName}
          </Link>
        ))}
      </div>
    </div>
  )
}
