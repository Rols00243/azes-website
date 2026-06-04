'use client'

import { useEffect, useState } from 'react'
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'

interface Props {
  deadline: string
}

export default function CountdownTimer({ deadline }: Props) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    const target = new Date(deadline)
    const update = () => {
      const now = new Date()
      if (now >= target) { setExpired(true); return }
      const days = differenceInDays(target, now)
      const hours = differenceInHours(target, now) % 24
      const minutes = differenceInMinutes(target, now) % 60
      const seconds = differenceInSeconds(target, now) % 60
      setTimeLeft({ days, hours, minutes, seconds })
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [deadline])

  if (expired) return <span className="text-xs text-red-600 font-semibold">Délai expiré</span>

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="flex gap-2 text-xs">
      {[
        { label: 'j', value: timeLeft.days },
        { label: 'h', value: timeLeft.hours },
        { label: 'm', value: timeLeft.minutes },
        { label: 's', value: timeLeft.seconds },
      ].map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center bg-red-50 border border-red-100 rounded px-1.5 py-0.5">
          <span className="font-bold text-red-700 tabular-nums">{pad(value)}</span>
          <span className="text-red-400 text-[10px]">{label}</span>
        </div>
      ))}
    </div>
  )
}
