import { NextResponse } from "next/server"
import { db } from "@/lib/dummy-db"

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const body = await request.json()
  const { status } = body

  const reservationIndex = db.reservations.findIndex((r) => r.id === id)
  if (reservationIndex === -1) {
    return NextResponse.json({ message: "Reservation not found" }, { status: 404 })
  }

  if (status && ["pending", "confirmed", "cancelled"].includes(status)) {
    db.reservations[reservationIndex].status = status
  } else {
    return NextResponse.json({ message: "Invalid status" }, { status: 400 })
  }

  return NextResponse.json(db.reservations[reservationIndex])
}
