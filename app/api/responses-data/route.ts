import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function POST(request: Request) {
  try {
    const { token } = await request.json()

    // Verify token
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
      const parsed = JSON.parse(Buffer.from(token, "base64").toString())
      if (!parsed.authenticated) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
      // Check if token is older than 24 hours
      if (Date.now() - parsed.ts > 24 * 60 * 60 * 1000) {
        return NextResponse.json({ error: "Session expired" }, { status: 401 })
      }
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const sql = neon(process.env.DATABASE_URL!)
    const rows = await sql`
      SELECT * FROM rsvp_responses ORDER BY submitted_at DESC
    `

    return NextResponse.json({ success: true, data: rows })
  } catch (err) {
    console.error("[responses-data]", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
