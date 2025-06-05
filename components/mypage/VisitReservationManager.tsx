"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Calendar,
  Clock,
  MapPin,
  Edit2,
  Trash2,
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  MessageSquare
} from "lucide-react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

interface Reservation {
  id: string
  date: Date
  timeSlot: string
  status: "confirmed" | "pending" | "cancelled"
  comment?: string
  guestCount: number
  matchedMembers?: number
}

export default function VisitReservationManager() {
  const router = useRouter()
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchReservations()
  }, [])

  const fetchReservations = async () => {
    setIsLoading(true)
    try {
      // Mock data - replace with actual API call
      const mockReservations: Reservation[] = [
        {
          id: "1",
          date: new Date(Date.now() + 86400000 * 2),
          timeSlot: "19:00",
          status: "confirmed",
          comment: "新規事業について相談したい",
          guestCount: 1,
          matchedMembers: 3
        },
        {
          id: "2",
          date: new Date(Date.now() + 86400000 * 7),
          timeSlot: "20:30",
          status: "pending",
          guestCount: 2
        },
        {
          id: "3",
          date: new Date(Date.now() - 86400000 * 5),
          timeSlot: "21:00",
          status: "confirmed",
          comment: "素晴らしい出会いがありました",
          guestCount: 1,
          matchedMembers: 5
        }
      ]
      setReservations(mockReservations)
    } catch (error) {
      console.error("Failed to fetch reservations:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = async (id: string) => {
    if (confirm("予約をキャンセルしますか？")) {
      try {
        // API call would go here
        setReservations(prev => 
          prev.map(r => r.id === id ? { ...r, status: "cancelled" } : r)
        )
        toast({
          title: "予約をキャンセルしました",
          description: "キャンセルが完了しました。"
        })
      } catch (error) {
        toast({
          title: "エラーが発生しました",
          description: "キャンセルに失敗しました。",
          variant: "destructive"
        })
      }
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
            <CheckCircle className="w-3 h-3 mr-1" />
            確定
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
            <AlertCircle className="w-3 h-3 mr-1" />
            未定
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300">
            <XCircle className="w-3 h-3 mr-1" />
            キャンセル済
          </Badge>
        )
    }
  }

  const upcomingReservations = reservations.filter(r => r.date >= new Date())
  const pastReservations = reservations.filter(r => r.date < new Date())

  const ReservationCard = ({ reservation }: { reservation: Reservation }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="font-semibold text-lg">
              {format(reservation.date, "M月d日 (E)", { locale: ja })}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <Clock className="w-3 h-3" />
              {reservation.timeSlot} 〜
            </p>
          </div>
        </div>
        {getStatusBadge(reservation.status)}
      </div>

      {reservation.comment && (
        <div className="mb-3 p-3 bg-white dark:bg-gray-900 rounded-lg">
          <p className="text-sm flex items-start gap-2">
            <MessageSquare className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            {reservation.comment}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {reservation.guestCount}名
          </span>
          {reservation.matchedMembers && (
            <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
              <Users className="w-4 h-4" />
              {reservation.matchedMembers}名とマッチング
            </span>
          )}
        </div>

        {reservation.status !== "cancelled" && reservation.date >= new Date() && (
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() => router.push(`/reserve/edit/${reservation.id}`)}
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
              onClick={() => handleCancel(reservation.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="rounded-2xl shadow-md bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold tracking-wide flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              来店予約管理
            </CardTitle>
            <Button
              onClick={() => router.push("/reserve")}
              className="bg-blue-500 hover:bg-blue-600 text-white"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              新しく予約する
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
                <span className="text-gray-600 dark:text-gray-400">読み込み中...</span>
              </div>
            </div>
          ) : (
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="upcoming">
                  今後の予約 ({upcomingReservations.length})
                </TabsTrigger>
                <TabsTrigger value="past">
                  過去の来店 ({pastReservations.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-3">
                {upcomingReservations.length > 0 ? (
                  upcomingReservations.map((reservation) => (
                    <ReservationCard key={reservation.id} reservation={reservation} />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      予約がありません
                    </p>
                    <Button
                      onClick={() => router.push("/reserve")}
                      variant="outline"
                    >
                      予約する
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="past" className="space-y-3">
                {pastReservations.length > 0 ? (
                  pastReservations.map((reservation) => (
                    <ReservationCard key={reservation.id} reservation={reservation} />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      過去の来店履歴がありません
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}