import { locales, type Locale } from "@/lib/i18n/config"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

const ogMeta: Record<string, { title: string; description: string }> = {
  ro: {
    title: "Nunta Giorgia & Istv\u00e1n",
    description: "Save the date - 11 Iulie 2026, Targu-Mures",
  },
  hu: {
    title: "Giorgia & Istv\u00e1n esk\u00fcv\u0151je",
    description: "Save the date - 2026. július 11., Targu-Mures",
  },
  en: {
    title: "Giorgia & Istv\u00e1n's Wedding",
    description: "Save the date - 11 July 2026, Targu-Mures",
  },
  de: {
    title: "Hochzeit Giorgia & Istv\u00e1n",
    description: "Save the date - 11. Juli 2026, Targu-Mures",
  },
  fr: {
    title: "Mariage Giorgia & Istv\u00e1n",
    description: "Save the date - 11 juillet 2026, Targu-Mures",
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
