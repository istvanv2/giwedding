import { getDictionary } from "@/lib/i18n/dictionaries"
import { locales, type Locale } from "@/lib/i18n/config"
import { HeroSection } from "@/components/hero-section"
import { FamilySection } from "@/components/family-section"
import { EventSection } from "@/components/event-section"
import { QASection } from "@/components/qa-section"
import { RSVPSection } from "@/components/rsvp-section"
import { Footer } from "@/components/footer"
import { FloatingNav } from "@/components/floating-nav"
import { SplitLayout, MobileImageBanner } from "@/components/split-layout"

const SECTION_IMAGES = [
  { sectionId: "top",    src: "/images/1.jpg", alt: "Giorgia & Istv\u00e1n", position: "center 30%" },
  { sectionId: "family", src: "/images/6.jpg", alt: "Giorgia & Istv\u00e1n", position: "center 30%" },
  { sectionId: "events", src: "/images/5.jpg", alt: "Giorgia & Istv\u00e1n", position: "center 20%" },
  { sectionId: "qa",     src: "/images/3.jpg", alt: "Giorgia & Istv\u00e1n", position: "center 25%" },
  { sectionId: "rsvp",   src: "/images/8.jpg", alt: "Giorgia & Istv\u00e1n", position: "center" },
]

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = getDictionary(locale as Locale)

  return (
    <>
      <FloatingNav dict={dict.nav} locale={locale} />
      <main>
        <SplitLayout images={SECTION_IMAGES}>
          {/* ── Hero ── */}
          <section id="top">
            <MobileImageBanner src="/images/1.jpg" alt="Giorgia & Istv\u00e1n" position="center 30%" />
            <HeroSection dict={dict} />
          </section>

          {/* ── Family / Parents ── */}
          <section id="family">
            <MobileImageBanner src="/images/6.jpg" alt="Giorgia & Istv\u00e1n" position="center 30%" />
            <FamilySection dict={dict.family} />
          </section>

          {/* ── Events / Schedule ── */}
          <section id="events">
            <MobileImageBanner src="/images/5.jpg" alt="Giorgia & Istv\u00e1n" position="center 20%" />
            <EventSection dict={dict.events} />
          </section>

          {/* ── Q&A ── */}
          <section id="qa">
            <MobileImageBanner src="/images/3.jpg" alt="Giorgia & Istv\u00e1n" position="center 25%" />
            <QASection dict={dict.qa} />
          </section>

          {/* ── RSVP ── */}
          <section id="rsvp">
            <MobileImageBanner src="/images/8.jpg" alt="Giorgia & Istv\u00e1n" position="center" />
            <RSVPSection dict={dict.rsvp} />
          </section>

          <Footer dict={dict.footer} />
        </SplitLayout>
      </main>
    </>
  )
}
