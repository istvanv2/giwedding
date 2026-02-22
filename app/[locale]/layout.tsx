import { locales, type Locale } from "@/lib/i18n/config"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

const ogMeta: Record<string, { title: string; description: string }> = {
  ro: {
    title: "Nunta Giorgia & Istv\u00e1n",
    description: "V\u0103 invit\u0103m cu drag la nunta noastr\u0103 \u2013 11 Iulie 2026",
  },
  hu: {
    title: "Giorgia & Istv\u00e1n esk\u00fcv\u0151je",
    description: "Szeretettel megh\u00edvunk az esk\u00fcv\u0151nkre \u2013 2026. j\u00falius 11.",
  },
  en: {
    title: "Giorgia & Istv\u00e1n's Wedding",
    description: "Save the date \u2013 11 July 2026",
  },
  de: {
    title: "Hochzeit Giorgia & Istv\u00e1n",
    description: "Wir laden euch herzlich zu unserer Hochzeit ein \u2013 11. Juli 2026",
  },
  fr: {
    title: "Mariage Giorgia & Istv\u00e1n",
    description: "Nous vous invitons \u00e0 notre mariage \u2013 11 juillet 2026",
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const meta = ogMeta[locale] || ogMeta.ro

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: ["/images/1.jpg"],
      type: "website",
      locale: locale,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/images/1.jpg"],
    },
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!locales.includes(locale as Locale)) notFound()

  return <div lang={locale}>{children}</div>
}
