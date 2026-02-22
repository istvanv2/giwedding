"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Heart, Globe } from "lucide-react"
import { locales, localeNames, type Locale } from "@/lib/i18n/config"
import type { Dictionary } from "@/lib/i18n/dictionaries"

interface FloatingNavProps {
  dict: Dictionary["nav"]
  locale: string
}

function getRedirectedPathname(pathname: string, newLocale: string) {
  const segments = pathname.split("/")
  segments[1] = newLocale
  return segments.join("/")
}

export function FloatingNav({ dict, locale }: FloatingNavProps) {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [langOpen, setLangOpen] = useState(false)

  const navItems = [
    { label: dict.home, href: "#top" },
    { label: dict.schedule, href: "#events" },
    { label: dict.qa, href: "#qa" },
    { label: dict.confirm, href: "#rsvp" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [])

  /* Close dropdown when clicking outside */
  useEffect(() => {
    if (!langOpen) return
    const close = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Don't close if clicking a language link
      if (target.closest("[data-lang-link]")) return
      setLangOpen(false)
    }
    document.addEventListener("click", close)
    return () => document.removeEventListener("click", close)
  }, [langOpen])

  return (
    <nav
      className={cn(
        "fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transition-all duration-700 sm:bottom-6",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0 pointer-events-none"
      )}
    >
      <div className="relative flex items-center gap-0.5 rounded-full border border-border/80 bg-background/90 px-1.5 py-1.5 shadow-lg backdrop-blur-md sm:gap-1 sm:px-2 sm:py-2">
        {/* Heart icon */}
        <div className="hidden items-center px-1 sm:flex sm:px-2">
          <Heart className="h-3 w-3 text-accent" />
        </div>

        {/* Nav items */}
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-full px-2 py-1 text-[10px] tracking-wide transition-all sm:px-3 sm:py-1.5 sm:text-xs",
              activeSection === item.href.replace("#", "")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            {item.label}
          </a>
        ))}

        {/* Language switcher */}
        <div className="relative ml-0.5 sm:ml-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setLangOpen((v) => !v)
            }}
            className="flex items-center gap-1 rounded-full px-2 py-1 text-[10px] uppercase tracking-wide text-muted-foreground transition-all hover:text-foreground hover:bg-secondary sm:px-2.5 sm:py-1.5 sm:text-xs"
            aria-label="Change language"
          >
            <Globe className="h-3 w-3" />
            <span className="hidden sm:inline">{locale.toUpperCase()}</span>
          </button>

          {langOpen && (
            <div className="absolute bottom-full right-0 mb-2 flex flex-col overflow-hidden rounded-xl border border-border/80 bg-background/95 shadow-lg backdrop-blur-md">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={getRedirectedPathname(pathname, l)}
                  data-lang-link
                  className={cn(
                    "block px-4 py-2.5 text-left text-xs tracking-wide transition-colors hover:bg-secondary whitespace-nowrap",
                    l === locale
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => {
                    setLangOpen(false)
                  }}
                >
                  {localeNames[l as Locale]}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
