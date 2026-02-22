import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { appendToSheet } from "@/lib/google-sheets"

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY
const DATABASE_URL = process.env.DATABASE_URL

interface RSVPPayload {
  mainName: string
  mainAttending: boolean
  mainMenu: "classic" | "vegetarian"
  guests: { name: string; attending: boolean; menu: "classic" | "vegetarian" }[]
  needAccommodation: boolean
  accommodationDetails: string
  email: string
  phone: string
  message: string
  recaptchaToken: string
  // Honeypot
  website?: string
}

// Email validation
function isValidEmail(email: string): boolean {
  if (!email) return true // optional
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Phone validation (international, at least 6 digits)
function isValidPhone(phone: string): boolean {
  if (!phone) return true // optional
  return /^[+]?[\d\s\-().]{6,20}$/.test(phone)
}

export async function POST(request: Request) {
  let stage = "start"
  try {
    stage = "parse_body"
    const body: RSVPPayload = await request.json()

    // 1. Honeypot check - bots fill hidden fields
    if (body.website && body.website.trim().length > 0) {
      // Silently reject - return success to not tip off the bot
      return NextResponse.json({ success: true })
    }

    // 2. reCAPTCHA v3 verification (soft-fail: we always save the data)
    stage = "recaptcha_check"
    let recaptchaScore: number | null = null
    let recaptchaPassed = true
    if (RECAPTCHA_SECRET && body.recaptchaToken) {
      try {
        const recaptchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            secret: RECAPTCHA_SECRET,
            response: body.recaptchaToken,
          }),
        })
        const recaptchaData = await recaptchaRes.json()
        recaptchaScore = recaptchaData.score ?? null
        recaptchaPassed = recaptchaData.success && recaptchaData.score >= 0.5
      } catch (err) {
        console.error("[RSVP] reCAPTCHA check failed, proceeding anyway:", err)
        // reCAPTCHA service down -- still save the response
      }
    }

    // 3. Validation
    if (!body.mainName || body.mainName.trim().length === 0) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 })
    }

    if (!body.email?.trim() && !body.phone?.trim()) {
      return NextResponse.json(
        { error: "Please provide at least an email or phone number." },
        { status: 400 }
      )
    }

    if (body.email && !isValidEmail(body.email)) {
      return NextResponse.json({ error: "Invalid email format." }, { status: 400 })
    }

    if (body.phone && !isValidPhone(body.phone)) {
      return NextResponse.json({ error: "Invalid phone format." }, { status: 400 })
    }

    // Validate guest names
    for (const guest of body.guests) {
      if (!guest.name || guest.name.trim().length === 0) {
        return NextResponse.json({ error: "All guest names are required." }, { status: 400 })
      }
    }

    // 4. All validation passed - build rows for Google Sheets
    stage = "build_rows"
    const timestamp = new Date().toISOString()
    const group = body.mainName.trim()

    // Each person (main + guests) gets their own row, all linked by the "Group" column
    const rows = [
      {
        timestamp,
        group,
        personName: body.mainName.trim(),
        attending: body.mainAttending ? "Yes" : "No",
        menu: body.mainAttending ? body.mainMenu : "",
        accommodation: body.needAccommodation ? "Yes" : "No",
        accommodationDetails: body.accommodationDetails?.trim() || "",
        email: body.email?.trim() || "",
        phone: body.phone?.trim() || "",
        message: body.message?.trim() || "",
      },
      ...body.guests.map((g) => ({
        timestamp,
        group,
        personName: g.name.trim(),
        attending: g.attending ? "Yes" : "No",
        menu: g.attending ? g.menu : "",
        accommodation: "",
        accommodationDetails: "",
        email: "",
        phone: "",
        message: "",
      })),
    ]

    // Save to Neon database (primary storage)
    stage = "config_check"
    let dbSaved = false
    if (DATABASE_URL) {
      try {
        stage = "db_init"
        const sql = neon(DATABASE_URL)
        stage = "db_insert"
        for (const row of rows) {
          await sql`
            INSERT INTO rsvp_responses (
              submitted_at, group_name, person_name, attending, menu,
              accommodation, accommodation_details, email, phone, message
            ) VALUES (
              ${row.timestamp}, ${row.group}, ${row.personName}, ${row.attending === "Yes"},
              ${row.menu}, ${row.accommodation === "Yes"}, ${row.accommodationDetails},
              ${row.email}, ${row.phone}, ${row.message}
            )
          `
        }
        dbSaved = true
      } catch (dbError) {
        console.error("[RSVP] Database write failed, attempting sheet fallback:", dbError)
      }
    } else {
      console.error("[RSVP] DATABASE_URL missing, attempting sheet fallback.")
    }

    // Append to Google Sheets (secondary -- graceful fail)
    stage = "sheet_append"
    let sheetSaved = false
    try {
      await appendToSheet(rows)
      sheetSaved = true
    } catch (sheetError) {
      console.error("[RSVP] Google Sheets write failed:", sheetError)
    }

    if (!dbSaved && !sheetSaved) {
      return NextResponse.json(
        { error: "Service temporarily unavailable. Please try again later." },
        { status: 503 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[RSVP] Unexpected route failure at stage:", stage, err)
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    )
  }
}
