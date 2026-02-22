"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Heart, Globe, Menu, X } from "lucide-react"
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: dict.home, href: "#top" },
    { label: dict.schedule, href: "#events" },
    { label: dict.qa, href: "#qa" },
    { label: dict.confirm, href: "#rsvp" },
  ]

  const handleNavClick = (href: string) => {
    const sectionId = href.replace("#", "")
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" })
      window.history.replaceState(null, "", pathname)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 640) {
        setVisible(true)
        return
      }
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
    window.addEventListener("resize", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
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

  useEffect(() => {
    if (!mobileMenuOpen) return
    const close = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("[data-mobile-menu]")) return
      setMobileMenuOpen(false)
    }
    document.addEventListener("click", close)
    return () => document.removeEventListener("click", close)
  }, [mobileMenuOpen])

  useEffect(() => {
    const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[]
    const isReload = navEntries[0]?.type === "reload"
    if (isReload && window.location.hash) {
      window.history.replaceState(null, "", pathname)
      window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    }
  }, [pathname])

  return (
    <>
      <div
        className={cn(
          "fixed right-4 top-4 z-50 transition-all duration-500 sm:hidden",
          visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"
        )}
        data-mobile-menu
      >
        <button
          onClick={(e) => {
            e.stopPropagation()
            setMobileMenuOpen((v) => !v)
          }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl ring-4 ring-primary/20 transition-transform hover:scale-105"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {mobileMenuOpen && (
          <div className="absolute right-0 top-16 mt-2 w-60 overflow-hidden rounded-2xl border border-border/80 bg-background/95 p-2 shadow-xl backdrop-blur-md">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-xs tracking-wide transition-colors",
                    activeSection === item.href.replace("#", "")
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.href)
                    setMobileMenuOpen(false)
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="mt-2 border-t border-border/70 pt-2">
              <p className="px-3 pb-1 text-[10px] uppercase tracking-wide text-muted-foreground">Language</p>
              <div className="grid grid-cols-2 gap-1">
                {locales.map((l) => (
                  <Link
                    key={l}
                    href={getRedirectedPathname(pathname, l)}
                    className={cn(
                      "rounded-lg px-2 py-1.5 text-center text-[11px] transition-colors",
                      l === locale ? "bg-primary text-primary-foreground" : "bg-secondary/60 text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {l.toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <nav
        className={cn(
          "fixed bottom-4 left-1/2 z-50 hidden -translate-x-1/2 transition-all duration-700 sm:bottom-6 sm:block",
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0 pointer-events-none"
        )}
      >
        <div className="relative flex items-center gap-1 rounded-full border border-border/80 bg-background/90 px-2 py-2 shadow-lg backdrop-blur-md">
          <div className="flex items-center px-2">
            <Heart className="h-3 w-3 text-accent" />
          </div>

          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs tracking-wide transition-all",
                activeSection === item.href.replace("#", "")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(item.href)
              }}
            >
              {item.label}
            </a>
          ))}

          <div className="relative ml-1">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLangOpen((v) => !v)
              }}
              className="flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs uppercase tracking-wide text-muted-foreground transition-all hover:text-foreground hover:bg-secondary"
              aria-label="Change language"
            >
              <Globe className="h-3 w-3" />
              <span>{locale.toUpperCase()}</span>
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
    </>
  )
}
