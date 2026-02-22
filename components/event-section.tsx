"use client"

import { Church, PartyPopper, Clock, Navigation, CalendarDays } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"

interface EventCardProps {
  icon: React.ReactNode
  title: string
  time: string
  description: string
  location: string
  address: string
  mapsUrl: string
  calendarUrl: string
  labels: { directions: string; addCalendar: string }
  delay?: number
}

function EventCard({ icon, title, time, description, location, address, mapsUrl, calendarUrl, labels, delay = 0 }: EventCardProps) {
  return (
    <AnimatedSection delay={delay} className="w-full">
      <div className="flex flex-col items-center gap-4 text-center lg:gap-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card">
          {icon}
        </div>

        <div className="flex flex-col items-center gap-2">
          <h3 className="font-serif text-xl font-light tracking-wide text-foreground sm:text-2xl lg:text-3xl">
            {title}
          </h3>
          <div className="flex items-center gap-2 text-accent">
            <Clock className="h-4 w-4" />
            <span className="font-serif text-base font-light">{time}</span>
          </div>
        </div>

        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>

        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-medium text-foreground">{location}</p>
          <p className="text-xs text-muted-foreground">{address}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <Navigation className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span className="tracking-wide">{labels.directions}</span>
          </a>
          <span className="text-border">|</span>
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <CalendarDays className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
            <span className="tracking-wide">{labels.addCalendar}</span>
          </a>
        </div>
      </div>
    </AnimatedSection>
  )
}

export function EventSection({ dict, locale }: { dict: Dictionary["events"]; locale: Locale }) {
  const labels = { directions: dict.directions, addCalendar: dict.addCalendar }
  const ceremonyCalendarUrl = `/api/calendar?event=ceremony&locale=${locale}`
  const celebrationCalendarUrl = `/api/calendar?event=celebration&locale=${locale}`

  return (
    <div className="px-6 py-16 sm:py-20 md:px-10 lg:px-16 lg:py-24">
      <AnimatedSection className="mb-12 flex flex-col items-center gap-3 text-center md:mb-16">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:text-xs">
          {dict.sectionLabel}
        </p>
        <h2 className="font-serif text-3xl font-light tracking-wide text-foreground sm:text-4xl md:text-5xl text-balance">
          {dict.sectionTitle}
        </h2>
        <div className="mt-2 h-px w-14 bg-accent sm:w-20" />
        <p className="font-serif text-base font-light italic text-muted-foreground sm:text-lg">
          {dict.sectionDate}
        </p>
      </AnimatedSection>

      <div className="mx-auto flex max-w-lg flex-col gap-16 md:gap-20">
        <EventCard
          icon={<Church className="h-6 w-6 text-primary" />}
          title={dict.ceremony.title}
          time={dict.ceremony.time}
          description={dict.ceremony.description}
          location={dict.ceremony.location}
          address={dict.ceremony.address}
          mapsUrl="https://maps.google.com/?q=Biserica+Reformata+din+Cetate+Targu+Mures"
          calendarUrl={ceremonyCalendarUrl}
          labels={labels}
          delay={0}
        />
        <EventCard
          icon={<PartyPopper className="h-6 w-6 text-primary" />}
          title={dict.celebration.title}
          time={dict.celebration.time}
          description={dict.celebration.description}
          location={dict.celebration.location}
          address={dict.celebration.address}
          mapsUrl="https://maps.google.com/?q=Hotel+Privo+Targu+Mures"
          calendarUrl={celebrationCalendarUrl}
          labels={labels}
          delay={200}
        />
      </div>
    </div>
  )
}
