import type { Metadata, Viewport } from 'next'
import { DM_Sans, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://giwedding.com"),
  title: "Giorgia & Istv\u00e1n's Wedding",
  description: "Save the date - 11 July 2026, Targu-Mures",
  icons: {
    icon: "/heart-icon.svg",
    apple: "/favicon.jpg",
  },
  openGraph: {
    title: "Giorgia & Istv\u00e1n's Wedding",
    description: "Save the date - 11 July 2026, Targu-Mures",
    images: ["/images/1.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Giorgia & Istv\u00e1n's Wedding",
    description: "Save the date - 11 July 2026, Targu-Mures",
    images: ["/images/1.jpg"],
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
        {children}
        <Analytics />
      </body>
    </html>
  )
}
