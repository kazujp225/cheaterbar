import { NextResponse } from "next/server"
import { db } from "@/lib/dummy-db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, date, people, message } = body

    if (!name || !email || !date || !people) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }
    if (people > 10) {
      // Example validation: max 10 people
      return NextResponse.json({ message: "Maximum 10 people per reservation" }, { status: 400 })
    }
    // Add more validation (date format, future date, etc.)

    const newReservation = {
      id: db.generateId(),
      name,
      email,
      date,
      people: Number.parseInt(people, 10),
      message,
      status: "pending" as const,
      createdAt: new Date(),
    }
    db.reservations.push(newReservation)

    // Simulate notification
    console.log(`Notification: New reservation from ${email} for ${date}`)

    return NextResponse.json(
      { message: "Reservation request received successfully", reservation: newReservation },
      { status: 201 },
    )
  } catch (error) {
    console.error("Reservation error:", error)
    return NextResponse.json({ message: "Error processing reservation" }, { status: 500 })
  }
}
