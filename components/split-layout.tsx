"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export interface SectionImage {
  /** Must match the section's HTML id */
  sectionId: string
  src: string
  alt: string
  position?: string
}

interface SplitLayoutProps {
  images: SectionImage[]
  children: React.ReactNode
}

/**
 * Desktop: fixed left-half image panel that crossfades between photos
 * as the user scrolls through content sections on the right half.
 * Mobile: images appear as full-width banners before each section.
 */
export function SplitLayout({ images, children }: SplitLayoutProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Only run the sticky-image logic on desktop
    const mql = window.matchMedia("(min-width: 1024px)")
    if (!mql.matches) return

    const sectionEls = images
      .map((img) => document.getElementById(img.sectionId))
      .filter(Boolean) as HTMLElement[]

    if (sectionEls.length === 0) return

    // Use a small observation strip at the very top of the viewport.
    // A section's image activates only when its top edge enters
    // the top 15% of the screen — i.e. when its title is near the top.
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = images.findIndex((img) => img.sectionId === entry.target.id)
            if (idx !== -1) setActiveIndex(idx)
          }
        }
      },
      {
        // Shrink the observation box to a thin strip at the top.
        // bottom margin of -85% means only the top 15% of the viewport counts.
        threshold: 0,
        rootMargin: "0px 0px -85% 0px",
      }
    )

    sectionEls.forEach((el) => observerRef.current!.observe(el))

    return () => {
      observerRef.current?.disconnect()
    }
  }, [images])

  return (
    <div className="lg:flex">
      {/* ──────────── Desktop: Sticky left image panel ──────────── */}
      <div className="hidden lg:sticky lg:top-0 lg:block lg:h-screen lg:w-1/2 lg:flex-shrink-0">
        {images.map((img, i) => (
          <div
            key={img.sectionId}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1500ms] ease-in-out",
              i === activeIndex ? "opacity-100" : "opacity-0"
            )}
            aria-hidden={i !== activeIndex}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              style={{ objectPosition: img.position ?? "center" }}
              sizes="50vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* ──────────── Right content column ──────────── */}
      <div className="w-full bg-background lg:w-1/2">
        {children}
      </div>
    </div>
  )
}

/**
 * Mobile-only image banner shown above each section.
 * Hidden on desktop where the sticky panel handles images.
 */
export function MobileImageBanner({
  src,
  alt,
  position = "center",
}: {
  src: string
  alt: string
  position?: string
}) {
  return (
    <div className="relative w-full lg:hidden">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={1600}
        className="h-auto w-full object-contain"
        style={{ objectPosition: position }}
        sizes="100vw"
        priority
      />
      {/* Subtle gradient fade for smooth transition to content below */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
