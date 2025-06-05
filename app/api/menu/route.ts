import { NextResponse } from "next/server"
import { db } from "@/lib/dummy-db"

export async function GET() {
  return NextResponse.json(db.menuItems)
}
