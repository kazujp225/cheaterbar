import { NextResponse } from "next/server"
import { db } from "@/lib/dummy-db"

export async function GET() {
  // In a real app, add authentication/authorization here
  return NextResponse.json(db.reservations)
}
