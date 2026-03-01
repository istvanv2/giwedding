import type { Metadata, Viewport } from 'next'
import { DM_Sans, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ScrollReset } from '@/components/scroll-reset'
import { SITE_URL, OG_IMAGE_URL, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT } from '@/lib/site'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Giorgia & Istv\u00e1n's Wedding",
  description: "Save the date - 11 July 2026, Targu-Mures",
  alternates: {
    canonical: `${SITE_URL}/ro`,
  },
  icons: {
    icon: "/heart-icon.svg",
    apple: "/favicon.jpg",
  },
  openGraph: {
    title: "Giorgia & Istv\u00e1n's Wedding",
    description: "Save the date - 11 July 2026, Targu-Mures",
    url: `${SITE_URL}/ro`,
    siteName: "GIwedding",
    images: [
      {
        url: OG_IMAGE_URL,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: "Giorgia & István's Wedding",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Giorgia & Istv\u00e1n's Wedding",
    description: "Save the date - 11 July 2026, Targu-Mures",
    images: [OG_IMAGE_URL],
  },
}

export const viewport: Viewport = {
  themeColor: '#faf8f5',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={`${dmSans.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ScrollReset />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
