"use client"

import { useEffect, useState } from "react"

const WEDDING_DATE = new Date("2026-07-11T13:00:00+03:00")

function calcTimeLeft() {
  const diff = WEDDING_DATE.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

interface CountdownProps {
  labels: { days: string; hours: string; min: string; sec: string }
}

export function Countdown({ labels }: CountdownProps) {
  const [mounted, setMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft)

  useEffect(() => {
    setMounted(true)
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { value: timeLeft.days, label: labels.days },
    { value: timeLeft.hours, label: labels.hours },
    { value: timeLeft.minutes, label: labels.min },
    { value: timeLeft.seconds, label: labels.sec },
  ]

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-8 lg:gap-10">
      {units.map(({ value, label }, i) => (
        <div key={label} className="flex items-center gap-3 sm:gap-5 md:gap-8 lg:gap-10">
          <div className="flex flex-col items-center min-w-[44px] sm:min-w-[56px] md:min-w-[72px]">
            <span className="font-serif text-3xl font-light tabular-nums tracking-wide text-foreground transition-all duration-500 sm:text-4xl md:text-5xl lg:text-6xl">
              {mounted ? String(value).padStart(2, "0") : "--"}
            </span>
            <span className="mt-1 text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:text-[10px] md:text-xs">
              {label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="font-serif text-xl font-light text-accent/60 sm:text-2xl md:text-3xl">:</span>
          )}
        </div>
      ))}
    </div>
  )
}
