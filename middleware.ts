import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { locales, defaultLocale } from "@/lib/i18n/config"

const canonicalHost =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/^https?:\/\//, "").replace(/\/$/, "").split("/")[0] ||
  "giwedding.com"

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const { pathname } = url
  const host = url.hostname
  const isProduction = host === canonicalHost || host === `www.${canonicalHost}`

  // Redirect to canonical https URL (works for www, non-www, http, or bare domain)
  if (isProduction) {
    const forwardedProto = request.headers.get("x-forwarded-proto")
    const isHttps = url.protocol === "https:" || forwardedProto === "https"
    const wantHttps = !isHttps
    const wantNonWww = host === `www.${canonicalHost}`
    if (wantHttps || wantNonWww) {
      const redirectUrl = new URL(request.url)
      redirectUrl.protocol = "https:"
      redirectUrl.host = canonicalHost
      return NextResponse.redirect(redirectUrl, 308)
    }
  }

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  // Skip internal paths and admin pages
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/responses") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  // Redirect to default locale
  const localeUrl = request.nextUrl.clone()
  localeUrl.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(localeUrl, 308)
}

export const config = {
  // Run on all requests so www/http redirect runs for every URL (including /images, etc.)
  matcher: ["/((?!_next/).*)"],
}
