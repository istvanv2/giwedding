import { AnimatedSection } from "@/components/animated-section"
import { FloralDividerSvg } from "@/components/floral-svg"
import type { Dictionary } from "@/lib/i18n/dictionaries"

export function Footer({ dict }: { dict: Dictionary["footer"] }) {
  return (
    <footer className="px-6 pb-28 pt-8 sm:pb-32">
      <AnimatedSection className="flex flex-col items-center gap-8 text-center">
        <FloralDividerSvg className="w-40 opacity-40 md:w-56" />

        <p className="font-serif text-2xl font-light tracking-wide text-foreground md:text-3xl">
          {dict.names}
        </p>

        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {dict.date}
        </p>

        <div className="h-px w-12 bg-accent/40" />

        <p className="text-xs tracking-wide text-muted-foreground/60">
          {dict.madeWith}
        </p>
      </AnimatedSection>
    </footer>
  )
}
