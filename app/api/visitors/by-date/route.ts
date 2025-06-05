import { NextResponse } from "next/server"
import { db } from "@/lib/dummy-db"
import { format } from "date-fns"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date")
    
    if (!date) {
      return NextResponse.json({ error: "Date parameter is required" }, { status: 400 })
    }

    // Get all reservations for the specified date
    const dateReservations = db.reservations?.filter(reservation => {
      const reservationDate = format(new Date(reservation.date), "yyyy-MM-dd")
      return reservationDate === date && reservation.isPublic
    }) || []

    // Map reservations to visitor info
    const visitors = dateReservations.map(reservation => {
      const user = db.users.find(u => u.id === reservation.userId)
      if (!user) return null

      return {
        id: user.id,
        name: user.profile?.full_name || user.email.split('@')[0],
        role: user.profile?.occupation || "メンバー",
        company: user.profile?.company || "非公開",
        matchingType: user.profile?.matching_type || "未設定",
        comment: reservation.comment || "",
        imageUrl: user.avatar_url || "/placeholder-user.jpg",
        tags: user.profile?.tags || [],
        isPublic: reservation.isPublic,
        timeSlot: reservation.timeSlot
      }
    }).filter(Boolean)

    // Get visitor counts for calendar badges
    const visitorCounts = getVisitorCountsForMonth(date)

    return NextResponse.json({
      success: true,
      date,
      visitors,
      visitorCounts
    })
  } catch (error) {
    console.error("Get visitors by date error:", error)
    return NextResponse.json({ error: "Failed to fetch visitors" }, { status: 500 })
  }
}

// Helper function to get visitor counts for the whole month
function getVisitorCountsForMonth(dateStr: string) {
  const counts: any[] = []
  const currentDate = new Date(dateStr)
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  
  // Get first and last day of the month
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  // Count visitors for each day
  for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
    const dayStr = format(d, "yyyy-MM-dd")
    const dayReservations = db.reservations?.filter(r => {
      const rDate = format(new Date(r.date), "yyyy-MM-dd")
      return rDate === dayStr && r.isPublic
    }) || []
    
    if (dayReservations.length > 0) {
      // Check if any VIP visitors (simplified logic - could be based on user tags or profile)
      const hasVipVisitors = dayReservations.some(r => {
        const user = db.users.find(u => u.id === r.userId)
        return user?.profile?.tags?.includes("VIP") || user?.profile?.tags?.includes("投資家")
      })
      
      counts.push({
        date: dayStr,
        count: dayReservations.length,
        hasVipVisitors
      })
    }
  }
  
  return counts
}