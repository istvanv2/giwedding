/**
 * Google Sheets integration for RSVP submissions.
 *
 * Uses the Google Sheets API v4 with a Service Account.
 * Each person (main + guests) gets their own row, linked by a shared "Group" column
 * so you can see which people belong together.
 *
 * Required env vars:
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL  – the service account email
 *   GOOGLE_PRIVATE_KEY            – the PEM private key (with \n line breaks)
 *   GOOGLE_SHEET_ID               – the spreadsheet ID from the URL
 */

// ── JWT token generation for Google API ──────────────────────────────

function base64url(input: string | ArrayBuffer): string {
  const bytes =
    typeof input === "string" ? new TextEncoder().encode(input) : new Uint8Array(input)
  let binary = ""
  for (const b of bytes) binary += String.fromCharCode(b)
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

async function createJWT(email: string, key: string): Promise<string> {
  const header = { alg: "RS256", typ: "JWT" }
  const now = Math.floor(Date.now() / 1000)
  const claim = {
    iss: email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  }

  const encodedHeader = base64url(JSON.stringify(header))
  const encodedClaim = base64url(JSON.stringify(claim))
  const signatureInput = `${encodedHeader}.${encodedClaim}`

  // Import the PEM private key
  // Handle all ways the key can arrive: literal \n, actual newlines, quoted, etc.
  const pemContents = key
    .replace(/^["']+/, "")   // leading quotes
    .replace(/["']+$/, "")   // trailing quotes
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\\n/g, "")     // literal backslash-n from env vars
    .replace(/\n/g, "")      // actual newlines
    .replace(/\r/g, "")      // carriage returns
    .replace(/\s+/g, "")     // any remaining whitespace
    // Strip any non-base64 characters that might have sneaked in
    .replace(/[^A-Za-z0-9+/=]/g, "")

  if (pemContents.length < 100) {
    throw new Error(
      `Private key appears too short (${pemContents.length} chars after cleaning). ` +
      "Make sure you paste the full key from the JSON file."
    )
  }

  const binaryKey = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0))

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  )

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(signatureInput)
  )

  return `${signatureInput}.${base64url(signature)}`
}

async function getAccessToken(email: string, key: string): Promise<string> {
  const jwt = await createJWT(email, key)
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Google OAuth failed: ${err}`)
  }

  const data = await res.json()
  return data.access_token
}

// ── Append rows to Google Sheets ─────────────────────────────────────

interface RSVPRow {
  timestamp: string
  group: string       // mainName – links all people who were submitted together
  personName: string
  attending: string
  menu: string
  accommodation: string
  accommodationDetails: string
  email: string
  phone: string
  message: string
}

export async function appendToSheet(rows: RSVPRow[]): Promise<void> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const key = process.env.GOOGLE_PRIVATE_KEY
  const sheetId = process.env.GOOGLE_SHEET_ID

  if (!email || !key || !sheetId) {
    console.warn("[RSVP] Google Sheets env vars not configured, skipping sheet append.")
    return
  }

  const accessToken = await getAccessToken(email, key)

  const values = rows.map((r) => [
    r.timestamp,
    r.group,
    r.personName,
    r.attending,
    r.menu,
    r.accommodation,
    r.accommodationDetails,
    r.email,
    r.phone,
    r.message,
  ])

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A:J:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Google Sheets append failed: ${err}`)
  }
}
