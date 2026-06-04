'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface Props {
  value: number
  label?: string
  color?: string
}

export default function ProgressBar({ value, label, color = '#2A7A4B' }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (inView) setWidth(value)
  }, [inView, value])

  return (
    <div ref={ref} className="w-full">
      {label && (
        <div className="flex justify-between text-sm mb-1.5">
          <span className="font-medium text-gray-700">{label}</span>
          <span className="font-bold" style={{ color }}>{value}%</span>
        </div>
      )}
      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        />
      </div>
    </div>
  )
}
