import { AnimatedSection } from "@/components/animated-section"
import type { Dictionary } from "@/lib/i18n/dictionaries"

export function FamilySection({ dict }: { dict: Dictionary["family"] }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 py-16 sm:py-20 md:px-10 lg:min-h-screen lg:px-16 lg:py-24">
      <div className="mx-auto max-w-lg">
        {/* Poetic intro */}
        <AnimatedSection className="mb-12 md:mb-16">
          <p className="text-center font-serif text-base font-light italic leading-relaxed text-foreground/80 sm:text-lg md:text-xl text-balance">
            {dict.intro}
          </p>
        </AnimatedSection>

        {/* Parents */}
        <AnimatedSection delay={200} className="mb-12 md:mb-16">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-center sm:gap-8 md:gap-12">
            {/* Bride's parents */}
            <div className="flex flex-col items-center">
              <p className="font-serif text-base font-medium tracking-wide text-foreground sm:text-lg md:text-xl">
                {dict.brideParents}
              </p>
            </div>

            {/* "and" connector */}
            <p className="font-serif text-base font-light italic text-accent sm:text-lg md:text-xl">
              {dict.and}
            </p>

            {/* Groom's parents */}
            <div className="flex flex-col items-center">
              <p className="font-serif text-base font-medium tracking-wide text-foreground sm:text-lg md:text-xl">
                {dict.groomParents}
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Godparents intro */}
        <AnimatedSection delay={400}>
          <div className="flex flex-col items-center gap-4 text-center md:gap-6">
            <p className="max-w-md font-serif text-sm font-light italic leading-relaxed text-muted-foreground sm:text-base md:text-lg">
              {dict.godparentsIntro}
            </p>
            <p className="font-serif text-base font-medium tracking-wide text-foreground sm:text-lg md:text-xl">
              {dict.godparents}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
