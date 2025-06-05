"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar,
  Clock,
  MessageSquare,
  Eye,
  EyeOff,
  Trash2,
  Edit3,
  Users,
  Coffee,
  AlertCircle,
  CheckCircle2,
  XCircle
} from "lucide-react"

interface ReservationListProps {
  userId: string
}

interface Reservation {
  id: string
  date: string
  timeSlot: string
  comment: string
  isPublic: boolean
  status: 'upcoming' | 'completed' | 'cancelled'
  createdAt: string
  matchedMembers?: number
}

// Mock data - in real app, this would come from API
const mockReservations: Reservation[] = [
  {
    id: '1',
    date: '2024-01-15',
    timeSlot: '20:00~',
    comment: 'SaaS事業の相談できます！',
    isPublic: true,
    status: 'upcoming',
    createdAt: '2024-01-14T10:00:00Z',
    matchedMembers: 3
  },
  {
    id: '2',
    date: '2024-01-12',
    timeSlot: '19:00~',
    comment: '初めて来店します',
    isPublic: true,
    status: 'completed',
    createdAt: '2024-01-11T15:30:00Z',
    matchedMembers: 2
  },
  {
    id: '3',
    date: '2024-01-10',
    timeSlot: '21:00~',
    comment: '',
    isPublic: false,
    status: 'cancelled',
    createdAt: '2024-01-09T12:00:00Z'
  }
]

export default function ReservationList({ userId }: ReservationListProps) {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all')

  useEffect(() => {
    // Simulate API call
    const fetchReservations = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setReservations(mockReservations)
      setLoading(false)
    }

    fetchReservations()
  }, [userId])

  const filteredReservations = reservations.filter(reservation => {
    if (filter === 'all') return true
    return reservation.status === filter
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short'
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case 'completed':
        return <Coffee className="w-4 h-4 text-blue-500" />
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Calendar className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'upcoming':
        return '予約済み'
      case 'completed':
        return '来店済み'
      case 'cancelled':
        return 'キャンセル'
      default:
        return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'completed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const handleCancelReservation = async (reservationId: string) => {
    // Simulate API call
    setReservations(prev => 
      prev.map(reservation => 
        reservation.id === reservationId 
          ? { ...reservation, status: 'cancelled' as const }
          : reservation
      )
    )
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            予約履歴
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <span className="text-gray-600 dark:text-gray-400">読み込み中...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              予約履歴
            </CardTitle>
            
            {/* Filter Tabs */}
            <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              <Button
                variant={filter === 'all' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setFilter('all')}
                className={filter === 'all' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}
              >
                すべて
              </Button>
              <Button
                variant={filter === 'upcoming' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setFilter('upcoming')}
                className={filter === 'upcoming' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}
              >
                予約中
              </Button>
              <Button
                variant={filter === 'completed' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setFilter('completed')}
                className={filter === 'completed' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}
              >
                履歴
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {filteredReservations.length === 0 ? (
            <div className="text-center py-8">
              <Coffee className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                {filter === 'upcoming' ? '予約がありません' : '該当する予約がありません'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {filter === 'upcoming' 
                  ? '新しい予約を作成して、特別な夜を計画しましょう'
                  : 'フィルターを変更して他の予約を確認してください'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReservations.map((reservation, index) => (
                <motion.div
                  key={reservation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="border-gray-200 dark:border-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(reservation.status)}
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">
                                {formatDate(reservation.date)}
                              </h3>
                              <Badge className={getStatusColor(reservation.status)}>
                                {getStatusLabel(reservation.status)}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {reservation.timeSlot}
                              </div>
                              <div className="flex items-center gap-1">
                                {reservation.isPublic ? (
                                  <Eye className="w-3 h-3" />
                                ) : (
                                  <EyeOff className="w-3 h-3" />
                                )}
                                {reservation.isPublic ? '公開' : '非公開'}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        {reservation.status === 'upcoming' && (
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Edit3 className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                              onClick={() => handleCancelReservation(reservation.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* Comment */}
                      {reservation.comment && (
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <MessageSquare className="w-3 h-3 text-primary" />
                            <span className="text-sm font-medium">メッセージ</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 pl-5">
                            {reservation.comment}
                          </p>
                        </div>
                      )}

                      {/* Matched Members */}
                      {reservation.isPublic && reservation.matchedMembers && reservation.matchedMembers > 0 && (
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-3 h-3 text-primary" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {reservation.matchedMembers}名の会員とマッチング
                          </span>
                          {reservation.status === 'upcoming' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-xs text-primary"
                            >
                              詳細を見る
                            </Button>
                          )}
                        </div>
                      )}

                      {/* Warning for upcoming reservations */}
                      {reservation.status === 'upcoming' && (
                        <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5" />
                            <div className="text-sm">
                              <div className="font-medium text-amber-800 dark:text-amber-200">
                                キャンセルポリシー
                              </div>
                              <div className="text-amber-700 dark:text-amber-300">
                                来店3時間前までにキャンセルしてください
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}