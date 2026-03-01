/**
 * Canonical site URL and OG image URL for metadata.
 * Use absolute URLs so WhatsApp and other crawlers always get a full image URL
 * and tap-to-open uses the correct link.
 */
const base = process.env.NEXT_PUBLIC_SITE_URL || "https://giwedding.com"
export const SITE_URL = base.replace(/\/$/, "")

/** Full-size preview image so WhatsApp shows a large preview card. Bump ?v= when changing the image to refresh cache. */
export const OG_IMAGE_URL = `${SITE_URL}/images/1.jpg?v=1`
/** Dimensions for OG (hero image 1.jpg). Use 1200×630 so preview occupies more space. */
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630
