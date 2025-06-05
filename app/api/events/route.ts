import { NextResponse } from "next/server"
import { db } from "@/lib/dummy-db"

export async function GET() {
  const publicEvents = db.events.filter((event) => event.isPublic)
  return NextResponse.json(publicEvents)
}
