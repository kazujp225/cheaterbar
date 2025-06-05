"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import VisitorCard from "@/components/visit-plans/VisitorCard"
import { 
  CalendarDays,
  Users,
  Clock,
  MessageSquare,
  Sparkles,
  TrendingUp,
  UserCheck,
  Wine,
  ChevronRight,
  Star,
  Info
} from "lucide-react"
import { format, addDays, startOfWeek, endOfWeek, isToday, isTomorrow, isSameDay } from "date-fns"
import { ja } from "date-fns/locale"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface Visitor {
  id: string
  name: string
  role: string
  company: string
  matchingType: string
  comment: string
  imageUrl?: string
  tags?: string[]
  isPublic: boolean
}

interface DayVisitorCount {
  date: string
  count: number
  hasVipVisitors?: boolean
}

export default function DateBasedVisitorSchedule() {
  const { user } = useAuth()
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [visitors, setVisitors] = useState<Visitor[]>([])
  const [visitorCounts, setVisitorCounts] = useState<DayVisitorCount[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showReservationForm, setShowReservationForm] = useState(false)
  const [timeSlot, setTimeSlot] = useState("")
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch visitor counts for the calendar
  useEffect(() => {
    fetchVisitorCounts()
  }, [])

  // Fetch visitors when date is selected
  useEffect(() => {
    if (selectedDate) {
      fetchVisitorsForDate(selectedDate)
    }
  }, [selectedDate])

  const fetchVisitorCounts = async () => {
    try {
      const response = await fetch(`/api/visitors/by-date?date=${format(new Date(), "yyyy-MM-dd")}`)
      const data = await response.json()
      if (data.success && data.visitorCounts) {
        setVisitorCounts(data.visitorCounts)
      }
    } catch (error) {
      console.error("Failed to fetch visitor counts:", error)
      // Fallback to mock data for demo
      const counts: DayVisitorCount[] = [
        { date: format(new Date(), "yyyy-MM-dd"), count: 6, hasVipVisitors: true },
        { date: format(addDays(new Date(), 1), "yyyy-MM-dd"), count: 4 },
        { date: format(addDays(new Date(), 2), "yyyy-MM-dd"), count: 8, hasVipVisitors: true },
        { date: format(addDays(new Date(), 3), "yyyy-MM-dd"), count: 2 },
        { date: format(addDays(new Date(), 5), "yyyy-MM-dd"), count: 5 },
        { date: format(addDays(new Date(), 7), "yyyy-MM-dd"), count: 10, hasVipVisitors: true },
      ]
      setVisitorCounts(counts)
    }
  }

  const fetchVisitorsForDate = async (date: Date) => {
    setIsLoading(true)
    setShowReservationForm(false) // Reset form when changing dates
    
    try {
      const response = await fetch(`/api/visitors/by-date?date=${format(date, "yyyy-MM-dd")}`)
      const data = await response.json()
      
      if (data.success && data.visitors) {
        setVisitors(data.visitors)
      } else {
        setVisitors([])
      }
    } catch (error) {
      console.error("Failed to fetch visitors:", error)
      // Fallback to mock data for demo
      const mockVisitors: Visitor[] = [
        {
          id: "1",
          name: "タカシ",
          role: "CEO",
          company: "TechVentures Inc.",
          matchingType: "ロジック参謀型",
          comment: "アプリの初期ユーザー獲得について話したい",
          imageUrl: "/placeholder-user.jpg",
          tags: ["資金調達中", "SaaS", "B2B"],
          isPublic: true
        },
        {
          id: "2",
          name: "ユカ",
          role: "プロダクトマネージャー",
          company: "Design Studio X",
          matchingType: "クリエイティブ型",
          comment: "UI/UXデザインの最新トレンドについて情報交換したい",
          imageUrl: "/placeholder-user.jpg",
          tags: ["デザイン", "プロダクト開発"],
          isPublic: true
        },
        {
          id: "3",
          name: "ケンジ",
          role: "投資家",
          company: "Future Capital",
          matchingType: "コネクター型",
          comment: "シード期のスタートアップを探しています",
          imageUrl: "/placeholder-user.jpg",
          tags: ["VC", "シード投資", "FinTech"],
          isPublic: true
        }
      ]
      setVisitors(mockVisitors)
    } finally {
      setIsLoading(false)
    }
  }

  const getVisitorCountForDate = (date: Date): number => {
    const dateStr = format(date, "yyyy-MM-dd")
    const dayCount = visitorCounts.find(vc => vc.date === dateStr)
    return dayCount?.count || 0
  }

  const hasVipVisitorsForDate = (date: Date): boolean => {
    const dateStr = format(date, "yyyy-MM-dd")
    const dayCount = visitorCounts.find(vc => vc.date === dateStr)
    return dayCount?.hasVipVisitors || false
  }

  const handleReservation = async () => {
    if (!selectedDate || !timeSlot) return
    
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: selectedDate,
          timeSlot: timeSlot,
          comment: comment,
          isPublic: true,
          guestCount: 1,
          seatPreference: 'no-preference',
          motivatedByVisitors: visitors.map(v => v.id)
        })
      })

      if (response.ok) {
        router.push('/mypage')
      }
    } catch (error) {
      console.error('Reservation error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const timeSlots = [
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
    "21:00", "21:30", "22:00", "22:30", "23:00", "23:30",
    "24:00", "24:30", "25:00", "25:30"
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Calendar */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-xl border-2 border-gray-100 dark:border-gray-800">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <CalendarDays className="w-6 h-6 text-primary" />
                  誰に会える？日付を選ぼう
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  来店予定者を見て、会いたい人がいる日に予約
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="rounded-lg border-2 border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      console.log("Date selected:", date)
                      setSelectedDate(date)
                    }}
                    locale={ja}
                    className="rounded-md border-0 w-full"
                    classNames={{
                      months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                      month: "space-y-4",
                      caption: "flex justify-center pt-1 relative items-center",
                      caption_label: "text-lg font-semibold",
                      nav: "space-x-1 flex items-center",
                      nav_button: cn(
                        "h-9 w-9 bg-transparent p-0 opacity-70 hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                      ),
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      table: "w-full border-collapse space-y-1",
                      head_row: "flex",
                      head_cell: "text-gray-500 rounded-md w-12 font-normal text-[0.8rem]",
                      row: "flex w-full mt-2",
                      cell: cn(
                        "relative h-12 w-12 text-center text-sm p-0 focus-within:relative focus-within:z-20",
                        "[&:has([aria-selected])]:bg-transparent"
                      ),
                      day: cn(
                        "h-12 w-12 p-0 font-normal aria-selected:opacity-100 hover:bg-transparent"
                      ),
                      day_selected: "bg-transparent text-primary-foreground hover:bg-transparent hover:text-primary-foreground focus:bg-transparent focus:text-primary-foreground",
                      day_today: "bg-transparent text-accent-foreground",
                      day_outside: "text-gray-400 opacity-50",
                      day_disabled: "text-gray-400 opacity-50",
                      day_range_middle: "aria-selected:bg-gray-100 aria-selected:text-accent-foreground",
                      day_hidden: "invisible"
                    }}
                    components={{
                      Day: ({ date, ...props }) => {
                        const visitorCount = getVisitorCountForDate(date)
                        const hasVip = hasVipVisitorsForDate(date)
                        const isSelected = selectedDate && isSameDay(selectedDate, date)
                        const isCurrentDay = isToday(date)
                        
                        return (
                          <button
                            {...props}
                            className="relative w-full h-full p-0 hover:bg-transparent focus:outline-none"
                            onClick={() => {
                              console.log("Day clicked:", date)
                              setSelectedDate(date)
                            }}
                          >
                            <div className={cn(
                              "relative w-12 h-12 flex flex-col items-center justify-center rounded-xl transition-all duration-200 cursor-pointer",
                              isSelected && "bg-primary text-white shadow-lg scale-110 ring-2 ring-primary ring-offset-2",
                              !isSelected && visitorCount > 0 && "hover:bg-primary/10 hover:scale-105",
                              !isSelected && visitorCount === 0 && "hover:bg-gray-100 dark:hover:bg-gray-800",
                              isCurrentDay && !isSelected && "ring-2 ring-primary/30"
                            )}>
                              <span className={cn(
                                "text-sm font-medium",
                                isSelected && "text-white font-bold"
                              )}>
                                {format(date, "d")}
                              </span>
                              {visitorCount > 0 && (
                                <div className={cn(
                                  "absolute -bottom-1 -right-1 min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center text-xs font-bold",
                                  hasVip && !isSelected && "bg-gradient-to-r from-amber-400 to-orange-500 text-white animate-pulse",
                                  !hasVip && !isSelected && "bg-blue-500 text-white",
                                  isSelected && "bg-white text-primary"
                                )}>
                                  {visitorCount}
                                </div>
                              )}
                              {hasVip && !isSelected && (
                                <Star className="absolute -top-1 -right-1 w-3 h-3 text-amber-500 animate-pulse" />
                              )}
                            </div>
                          </button>
                        )
                      }
                    }}
                  />
                </div>

                {/* Legend */}
                <div className="mt-6 flex items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full" />
                    <span>来店予定あり</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse" />
                    <span>VIP来店</span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedDate(new Date())}
                    className={isToday(selectedDate || new Date()) ? 'border-primary bg-primary/10' : ''}
                  >
                    今日
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedDate(addDays(new Date(), 1))}
                    className={isTomorrow(selectedDate || new Date()) ? 'border-primary bg-primary/10' : ''}
                  >
                    明日
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedDate(addDays(new Date(), 7))}
                  >
                    来週
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Insights Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6"
          >
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                      今週の注目
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      金曜日は投資家の方が3名来店予定。資金調達を検討中の方におすすめです。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - Visitors List */}
        <div>
          <AnimatePresence mode="wait">
            {selectedDate ? (
              <motion.div
                key={selectedDate.toISOString()}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Card className="shadow-xl border-2 border-gray-100 dark:border-gray-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2 text-xl">
                          <Users className="w-5 h-5 text-primary" />
                          {format(selectedDate, "M月d日 (E)", { locale: ja })}の来店予定
                        </CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {visitors.length}名が来店予定
                        </p>
                      </div>
                      {visitors.length > 0 && !showReservationForm && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                          <UserCheck className="w-3 h-3 mr-1" />
                          マッチング可能
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    {isLoading ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                          <span className="text-gray-600 dark:text-gray-400">読み込み中...</span>
                        </div>
                      </div>
                    ) : visitors.length > 0 ? (
                      <div className="space-y-4">
                        {visitors.map((visitor, index) => (
                          <motion.div
                            key={visitor.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <VisitorCard visitor={visitor} />
                          </motion.div>
                        ))}

                        {!showReservationForm && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: visitors.length * 0.1 }}
                            className="mt-6"
                          >
                            <Button
                              onClick={() => setShowReservationForm(true)}
                              className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-base font-semibold shadow-lg"
                              size="lg"
                            >
                              <Sparkles className="w-5 h-5 mr-2" />
                              この日に予約する
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Wine className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">
                          この日はまだ来店予定者がいません
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                          最初の予約者になりませんか？
                        </p>
                        <Button
                          onClick={() => setShowReservationForm(true)}
                          variant="outline"
                          className="mt-4"
                        >
                          予約する
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Reservation Form */}
                <AnimatePresence>
                  {showReservationForm && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -20, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="shadow-lg border-primary/20">
                        <CardHeader className="pb-4">
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Clock className="w-5 h-5 text-primary" />
                            予約情報を入力
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label htmlFor="time">来店時間</Label>
                            <Select value={timeSlot} onValueChange={setTimeSlot}>
                              <SelectTrigger id="time" className="mt-1">
                                <SelectValue placeholder="時間を選択" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeSlots.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time} 〜
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="comment">
                              <MessageSquare className="w-4 h-4 inline mr-1" />
                              コメント（任意）
                            </Label>
                            <Textarea
                              id="comment"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder="話したいテーマや自己紹介など"
                              className="mt-1 min-h-[100px]"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              他の来店者に公開されます
                            </p>
                          </div>

                          <div className="flex gap-3 pt-4">
                            <Button
                              variant="outline"
                              onClick={() => setShowReservationForm(false)}
                              className="flex-1"
                            >
                              キャンセル
                            </Button>
                            <Button
                              onClick={handleReservation}
                              disabled={!timeSlot || isSubmitting}
                              className="flex-1 bg-primary hover:bg-primary/90 text-white"
                            >
                              {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                  予約中...
                                </div>
                              ) : (
                                <>
                                  予約を確定
                                  <ChevronRight className="w-4 h-4 ml-1" />
                                </>
                              )}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex items-center justify-center"
              >
                <Card className="w-full max-w-md shadow-lg">
                  <CardContent className="py-12 text-center">
                    <CalendarDays className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">日付を選択してください</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      カレンダーから日付を選ぶと、その日の来店予定者が表示されます
                    </p>
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                      <div className="flex items-start gap-2 text-left">
                        <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          数字バッジは来店予定人数、金色のバッジはVIPゲストの来店日を示しています
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}