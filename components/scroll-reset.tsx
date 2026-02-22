"use client"

import { useEffect } from "react"

export function ScrollReset() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }

    const clearHashAndScrollTop = () => {
      if (window.location.hash) {
        window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`)
      }
      window.scrollTo(0, 0)
    }

    const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[]
    const isReload = navEntries[0]?.type === "reload"
    const legacyIsReload = (performance as Performance & { navigation?: { type?: number } }).navigation?.type === 1
    if (isReload || legacyIsReload) {
      clearHashAndScrollTop()
      setTimeout(() => window.scrollTo(0, 0), 0)
    }

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.scrollTo(0, 0)
      }
    }

    window.addEventListener("pageshow", onPageShow)
    return () => {
      window.removeEventListener("pageshow", onPageShow)
    }
  }, [])

  return null
}
