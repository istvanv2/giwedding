/**
 * Generates a smaller OG preview image from the hero image.
 * Run: node scripts/generate-og-preview.mjs
 * Use 800×420 for fast, reliable WhatsApp/social previews.
 */
import sharp from "sharp"
import { dirname, join } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")
const input = join(root, "public", "images", "1.jpg")
const output = join(root, "public", "images", "og-preview.jpg")

const W = 800
const H = 420

sharp(input)
  .resize(W, H, { fit: "cover", position: "center" })
  .jpeg({ quality: 85 })
  .toFile(output)
  .then((info) => console.log("OG preview saved:", output, info))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
