import { NextResponse } from "next/server"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config"

type EventType = "ceremony" | "celebration"

function escapeICS(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
}

function foldICSLine(line: string): string {
  const maxLen = 74
  if (line.length <= maxLen) return line
  const chunks: string[] = []
  for (let i = 0; i < line.length; i += maxLen) {
    chunks.push(i === 0 ? line.slice(i, i + maxLen) : ` ${line.slice(i, i + maxLen)}`)
  }
  return chunks.join("\r\n")
}

function buildICS(locale: Locale, eventType: EventType) {
  const dict = getDictionary(locale)
  const event = eventType === "ceremony" ? dict.events.ceremony : dict.events.celebration

  // Romania is UTC+3 in July (EEST).
  const startUtc = eventType === "ceremony" ? "20260711T100000Z" : "20260711T110000Z"
  const endUtc = eventType === "ceremony" ? "20260711T110000Z" : "20260711T180000Z"

  const summary = `${dict.events.calendarEventPrefix} - ${event.title}`
  const location = `${event.location}, ${event.address}`
  const description = `${event.description}\n\n${location}`
  const uid = `${eventType}-${locale}-giwedding-20260711@giwedding.com`
  const dtstamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z")

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//GIwedding//Wedding Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${startUtc}`,
    `DTEND:${endUtc}`,
    `SUMMARY:${escapeICS(summary)}`,
    `DESCRIPTION:${escapeICS(description)}`,
    `LOCATION:${escapeICS(location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ]

  return lines.map(foldICSLine).join("\r\n")
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const event = searchParams.get("event")
  const rawLocale = searchParams.get("locale")

  const eventType: EventType = event === "celebration" ? "celebration" : "ceremony"
  const locale: Locale = locales.includes(rawLocale as Locale) ? (rawLocale as Locale) : defaultLocale
  const ics = buildICS(locale, eventType)
  const fileName = `giwedding-${eventType}-${locale}.ics`

  return new NextResponse(ics, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Cache-Control": "public, max-age=3600",
    },
  })
}
