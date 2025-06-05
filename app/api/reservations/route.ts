import { NextResponse } from "next/server"
import { db } from "@/lib/dummy-db"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const userEmail = cookieStore.get("user-email")?.value

    if (!userEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = db.users.find(u => u.email === userEmail)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const body = await request.json()
    const { date, timeSlot, comment, isPublic, guestCount, seatPreference, motivatedByVisitors } = body

    if (!date || !timeSlot) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create reservation
    const newReservation = {
      id: db.generateId(),
      userId: user.id,
      userName: user.profile?.full_name || user.email,
      userEmail: user.email,
      date: new Date(date),
      timeSlot,
      guestCount: guestCount || 1,
      seatPreference: seatPreference || 'no-preference',
      comment: comment || '',
      isPublic: isPublic !== false,
      motivatedByVisitors: motivatedByVisitors || [],
      status: 'confirmed' as const,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Add to database
    if (!db.reservations) {
      db.reservations = []
    }
    db.reservations.push(newReservation)

    // Send confirmation email simulation
    console.log(`Reservation confirmation sent to ${user.email} for ${date} ${timeSlot}`)

    return NextResponse.json({
      success: true,
      reservation: newReservation,
      message: "予約が確定しました"
    })
  } catch (error) {
    console.error("Reservation error:", error)
    return NextResponse.json({ error: "予約の処理中にエラーが発生しました" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies()
    const userEmail = cookieStore.get("user-email")?.value

    if (!userEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = db.users.find(u => u.email === userEmail)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Get user's reservations
    const userReservations = db.reservations?.filter(r => r.userId === user.id) || []
    
    // Sort by date, newest first
    userReservations.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return NextResponse.json({
      success: true,
      reservations: userReservations
    })
  } catch (error) {
    console.error("Get reservations error:", error)
    return NextResponse.json({ error: "予約の取得中にエラーが発生しました" }, { status: 500 })
  }
}