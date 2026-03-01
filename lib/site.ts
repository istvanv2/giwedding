/**
 * Canonical site URL and OG image URL for metadata.
 * Use absolute URLs so WhatsApp and other crawlers always get a full image URL
 * and tap-to-open uses the correct link.
 */
const base = process.env.NEXT_PUBLIC_SITE_URL || "https://giwedding.com"
export const SITE_URL = base.replace(/\/$/, "")

/** Smaller dedicated preview image (run `npm run generate:og` after changing hero image). Bump ?v= when changing the image to refresh WhatsApp cache. */
export const OG_IMAGE_URL = `${SITE_URL}/images/og-preview.jpg?v=1`
/** Dimensions of og-preview.jpg (800×420) – must match scripts/generate-og-preview.mjs */
export const OG_IMAGE_WIDTH = 800
export const OG_IMAGE_HEIGHT = 420
