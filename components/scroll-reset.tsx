"use client"

import { useEffect } from "react"

export function ScrollReset() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }

    const scrollToTop = () => {
      if (window.location.hash) {
        window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`)
      }
      window.scrollTo(0, 0)
    }

    // Always start at top on load (link, reload, or back/forward from bfcache)
    scrollToTop()
    requestAnimationFrame(() => scrollToTop())
    const t = setTimeout(() => scrollToTop(), 0)
    const t2 = setTimeout(() => scrollToTop(), 150) // Override any late focus/scroll (e.g. form)

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) scrollToTop()
    }

    window.addEventListener("pageshow", onPageShow)
    return () => {
      clearTimeout(t)
      clearTimeout(t2)
      window.removeEventListener("pageshow", onPageShow)
    }
  }, [])

  return null
}
