"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  Download,
  Share2,
  CalendarPlus,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Users
} from "lucide-react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { ReservationData } from "@/app/reserve/page"
import confetti from "canvas-confetti"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface ReservationCompleteProps {
  reservationData: ReservationData & { guestCount?: number; seatPreference?: string }
  onNewReservation: () => void
}

export default function ReservationComplete({ 
  reservationData, 
  onNewReservation 
}: ReservationCompleteProps) {
  const router = useRouter()

  useEffect(() => {
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FED766', '#F093F9']
    })
  }, [])

  const handleAddToCalendar = () => {
    // Generate calendar event (Google Calendar example)
    const startDate = reservationData.date ? new Date(reservationData.date) : new Date()
    const [hours, minutes] = (reservationData.timeSlot || "19:00").replace("~", "").split(":").map(Number)
    startDate.setHours(hours, minutes)
    
    const endDate = new Date(startDate)
    endDate.setHours(endDate.getHours() + 3) // Default 3 hours for calendar event

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('CHEETAH BAR 予約')}&dates=${startDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}/${endDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}&details=${encodeURIComponent('東京都渋谷区恵比寿西2-13-10 ルガール恵比寿B1')}&location=${encodeURIComponent('CHEETAH, 東京都渋谷区恵比寿西2-13-10')}`
    
    window.open(googleCalendarUrl, '_blank')
  }

  const handleShare = async () => {
    const shareData = {
      title: 'CHEETAH BAR 予約完了',
      text: `${format(reservationData.date!, "M月d日")} ${reservationData.timeSlot} CHEETAH BARを予約しました！`,
      url: window.location.origin
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.error('Share failed:', err)
      }
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full mb-4">
          <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-3xl font-bold mb-2">予約が完了しました！</h1>
        <p className="text-gray-600 dark:text-gray-400">
          確認メールをお送りしました
        </p>
      </motion.div>

      {/* Reservation Details Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="mb-6 border-2 border-primary/20">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">予約詳細</h2>
              <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                予約確定
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            {/* Date & Time */}
            <div className="flex items-center gap-4">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">
                  {reservationData.date && format(reservationData.date, "yyyy年M月d日 (E)", { locale: ja })}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {reservationData.timeSlot} 〜
                </p>
              </div>
            </div>

            <Separator />

            {/* Guest Count */}
            <div className="flex items-center gap-4">
              <Users className="w-5 h-5 text-primary" />
              <p className="font-medium">{reservationData.guestCount || 1}名様</p>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">CHEETAH</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  東京都渋谷区恵比寿西2-13-10<br />
                  ルガール恵比寿B1
                </p>
                <a 
                  href="https://maps.google.com/maps?q=CHEETAH+恵比寿"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline mt-1 inline-block"
                >
                  地図を開く →
                </a>
              </div>
            </div>

            {/* Public Status */}
            {reservationData.isPublic && (
              <>
                <Separator />
                <div className="flex items-center gap-4">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <div>
                    <p className="font-medium text-amber-600 dark:text-amber-400">
                      マッチング可能
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      同じ時間帯の他のメンバーとマッチングできます
                    </p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={handleAddToCalendar}
            className="w-full"
          >
            <CalendarPlus className="w-4 h-4 mr-2" />
            カレンダーに追加
          </Button>
          <Button
            variant="outline"
            onClick={handleShare}
            className="w-full"
          >
            <Share2 className="w-4 h-4 mr-2" />
            共有する
          </Button>
        </div>

        <Button
          onClick={() => router.push('/mypage')}
          className="w-full bg-primary hover:bg-primary/90 text-white"
          size="lg"
        >
          マイページで予約を確認
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>

        <Button
          variant="ghost"
          onClick={onNewReservation}
          className="w-full"
        >
          別の日程で予約する
        </Button>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg"
      >
        <div className="flex gap-3">
          <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">
              来店前のお願い
            </p>
            <ul className="text-blue-700 dark:text-blue-300 space-y-1">
              <li>• ドレスコード: スマートカジュアル</li>
              <li>• お時間に遅れる場合は必ずご連絡ください</li>
              <li>• 駐車場はございません（近隣のコインパーキングをご利用ください）</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}