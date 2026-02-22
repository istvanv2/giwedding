"use client"

import { useEffect, useState } from "react"
import { MapPin } from "lucide-react"
import { Countdown } from "@/components/countdown"
import type { Dictionary } from "@/lib/i18n/dictionaries"

export function HeroSection({ dict }: { dict: Dictionary }) {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 py-16 sm:py-20 md:px-10 lg:min-h-screen lg:px-16 lg:py-24">
      <div className="flex w-full max-w-lg flex-col items-center gap-6 text-center sm:gap-8 lg:gap-10">
        {/* Pre-title */}
        <p
          className={`text-[10px] uppercase tracking-[0.3em] text-muted-foreground transition-all delay-300 duration-[1500ms] sm:text-xs ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {dict.hero.preTitle}
        </p>

        {/* Names */}
        <div
          className={`transition-all delay-500 duration-[1500ms] ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h1 className="font-serif text-6xl font-light leading-tight tracking-wide text-foreground sm:text-7xl lg:text-8xl">
            {dict.hero.bride}
          </h1>
          <p className="my-3 font-serif text-2xl font-light italic text-accent sm:text-3xl md:my-4">
            &amp;
          </p>
          <h1 className="font-serif text-6xl font-light leading-tight tracking-wide text-foreground sm:text-7xl lg:text-8xl">
            {dict.hero.groom}
          </h1>
        </div>

        {/* Decorative line */}
        <div
          className={`transition-all delay-700 duration-[1500ms] ${
            loaded ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
        >
          <div className="h-px w-20 bg-accent sm:w-28" />
        </div>

        {/* Date & Location */}
        <div
          className={`flex flex-col items-center gap-2 transition-all delay-1000 duration-[1500ms] ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="font-serif text-lg font-light tracking-wide text-foreground sm:text-xl lg:text-2xl">
            {dict.hero.date}
          </p>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <p className="text-xs tracking-wide sm:text-sm">{dict.hero.location}</p>
          </div>
        </div>

        {/* Countdown */}
        <div
          className={`mt-2 transition-all delay-[1200ms] duration-[1500ms] ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Countdown labels={dict.countdown} />
        </div>

        {/* Scroll indicator */}
        <div
          className={`mt-4 transition-all delay-[1800ms] duration-[1500ms] sm:mt-6 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <a href="#family" className="group flex flex-col items-center gap-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 transition-colors group-hover:text-muted-foreground sm:text-xs">
              {dict.hero.scrollMore}
            </p>
            <div className="h-8 w-px animate-pulse bg-accent/40" />
          </a>
        </div>
      </div>
    </div>
  )
}
