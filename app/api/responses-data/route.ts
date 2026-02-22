import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

function isAuthenticatedToken(token: string): boolean {
  if (!token) return false
  try {
    const parsed = JSON.parse(Buffer.from(token, "base64").toString())
    if (!parsed.authenticated) return false
    return Date.now() - parsed.ts <= 24 * 60 * 60 * 1000
  } catch {
    return false
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const token = body?.token as string | undefined
    const action = (body?.action as string | undefined) || "list"

    // Verify token
    if (!isAuthenticatedToken(token || "")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const sql = neon(process.env.DATABASE_URL!)
    if (action === "list") {
      const rows = await sql`
        SELECT * FROM rsvp_responses ORDER BY submitted_at DESC
      `
      return NextResponse.json({ success: true, data: rows })
    }

    if (action === "delete") {
      const ids = Array.isArray(body?.ids)
        ? (body.ids as unknown[])
            .map((v) => Number(v))
            .filter((v) => Number.isInteger(v) && v > 0)
        : []
      if (ids.length === 0) {
        return NextResponse.json({ error: "No ids provided" }, { status: 400 })
      }

      for (const id of ids) {
        await sql`DELETE FROM rsvp_responses WHERE id = ${id}`
      }

      return NextResponse.json({ success: true, deleted: ids.length })
    }

    if (action === "update") {
      const row = body?.row
      const id = Number(row?.id)
      if (!Number.isInteger(id) || id <= 0) {
        return NextResponse.json({ error: "Invalid row id" }, { status: 400 })
      }

      const groupName = String(row?.group_name || "").trim()
      const personName = String(row?.person_name || "").trim()
      const attending = String(row?.attending || "") === "Yes"
      const menu = String(row?.menu || "").trim()
      const accommodation = String(row?.accommodation || "") === "Yes"
      const accommodationDetails = String(row?.accommodation_details || "").trim()
      const email = String(row?.email || "").trim()
      const phone = String(row?.phone || "").trim()
      const message = String(row?.message || "").trim()

      if (!groupName || !personName) {
        return NextResponse.json({ error: "Group and person name are required" }, { status: 400 })
      }

      await sql`
        UPDATE rsvp_responses
        SET
          group_name = ${groupName},
          person_name = ${personName},
          attending = ${attending},
          menu = ${menu},
          accommodation = ${accommodation},
          accommodation_details = ${accommodationDetails},
          email = ${email},
          phone = ${phone},
          message = ${message}
        WHERE id = ${id}
      `

      const updated = await sql`SELECT * FROM rsvp_responses WHERE id = ${id} LIMIT 1`
      return NextResponse.json({ success: true, row: updated[0] ?? null })
    }

    return NextResponse.json({ error: "Unsupported action" }, { status: 400 })
  } catch (err) {
    console.error("[responses-data]", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
