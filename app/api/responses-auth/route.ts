import { NextResponse } from "next/server"

const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD || "SOOSpass123!"

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    if (password !== DASHBOARD_PASSWORD) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

    // Return a simple token the client stores in memory
    const token = Buffer.from(
      JSON.stringify({ authenticated: true, ts: Date.now() })
    ).toString("base64")

    return NextResponse.json({ success: true, token })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
