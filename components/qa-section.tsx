"use client"

import { AnimatedSection } from "@/components/animated-section"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { MessageCircle } from "lucide-react"
import type { Dictionary } from "@/lib/i18n/dictionaries"

export function QASection({ dict }: { dict: Dictionary["qa"] }) {
  return (
    <div className="px-6 py-16 sm:py-20 md:px-10 lg:px-16 lg:py-24">
      <AnimatedSection className="mx-auto flex max-w-lg flex-col items-center gap-6 lg:gap-8">
        {/* Section header */}
        <div className="flex flex-col items-center gap-3 text-center sm:gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card">
            <MessageCircle className="h-5 w-5 text-primary" />
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:text-xs">
            {dict.sectionLabel}
          </p>
          <h2 className="font-serif text-3xl font-light tracking-wide text-foreground sm:text-4xl md:text-5xl">
            {dict.sectionTitle}
          </h2>
          <p className="max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {dict.sectionDescription}
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-2 w-full sm:mt-4">
          <Accordion type="single" collapsible className="w-full">
            {dict.questions.map((q, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <AccordionItem value={`q-${i}`} className="border-border/60">
                  <AccordionTrigger className="font-serif text-sm font-normal tracking-wide text-foreground hover:no-underline hover:text-primary sm:text-base">
                    {q.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                    {q.answer}
                  </AccordionContent>
                </AccordionItem>
              </AnimatedSection>
            ))}
          </Accordion>
        </div>
      </AnimatedSection>
    </div>
  )
}
