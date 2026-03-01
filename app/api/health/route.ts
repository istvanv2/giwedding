import { NextResponse } from "next/server"

/**
 * Health check for monitoring and load balancers.
 * GET /api/health returns 200 when the app is up.
 */
export async function GET() {
  return NextResponse.json({ ok: true })
}
