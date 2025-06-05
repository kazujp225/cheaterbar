"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Calendar,
  Clock,
  Users,
  MessageSquare,
  Shield,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Wine,
  MapPin,
  Phone,
  Mail,
  Sparkles,
  Heart,
  Briefcase,
  Star,
  Utensils,
  ChevronLeft
} from "lucide-react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { ReservationData } from "@/app/reserve/page"

interface ReservationConfirmProps {
  reservationData: ReservationData & { guestCount?: number; seatPreference?: string }
  onConfirm: (data: Partial<ReservationData>) => void
  userName: string
}

export default function ReservationConfirm({ 
  reservationData, 
  onConfirm,
  userName 
}: ReservationConfirmProps) {
  const [comment, setComment] = useState(reservationData.comment || "")
  const [isPublic, setIsPublic] = useState(reservationData.isPublic)
  const [requests, setRequests] = useState({
    birthday: false,
    anniversary: false,
    business: false,
    dateNight: false,
    firstTime: false,
    allergies: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Build comment with special requests
    const specialRequests = Object.entries(requests)
      .filter(([_, value]) => value)
      .map(([key]) => {
        switch(key) {
          case 'birthday': return '誕生日のお祝い'
          case 'anniversary': return '記念日のお祝い'
          case 'business': return 'ビジネス利用'
          case 'dateNight': return 'デート'
          case 'firstTime': return '初めての来店'
          case 'allergies': return 'アレルギー対応希望'
          default: return ''
        }
      })
      .filter(Boolean)

    const fullComment = specialRequests.length > 0 
      ? `【${specialRequests.join('、')}】${comment ? '\n' + comment : ''}`
      : comment

    try {
      // Make API call
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: reservationData.date,
          timeSlot: reservationData.timeSlot,
          comment: fullComment,
          isPublic,
          guestCount: reservationData.guestCount,
          seatPreference: reservationData.seatPreference
        })
      })

      if (!response.ok) {
        throw new Error('Reservation failed')
      }

      const data = await response.json()
      console.log('Reservation created:', data)
      
      onConfirm({ comment: fullComment, isPublic })
    } catch (error) {
      console.error('Reservation error:', error)
      // You might want to show an error message here
    } finally {
      setIsSubmitting(false)
    }
  }

  const getSeatPreferenceText = (preference?: string) => {
    switch(preference) {
      case 'counter': return 'カウンター席'
      case 'table': return 'テーブル席'
      case 'sofa': return 'ソファー席'
      default: return 'おまかせ'
    }
  }

  const getRequestIcon = (key: string) => {
    switch(key) {
      case 'birthday': return <Heart className="w-4 h-4" />
      case 'anniversary': return <Star className="w-4 h-4" />
      case 'business': return <Briefcase className="w-4 h-4" />
      case 'dateNight': return <Heart className="w-4 h-4" />
      case 'firstTime': return <Sparkles className="w-4 h-4" />
      case 'allergies': return <Utensils className="w-4 h-4" />
      default: return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Reservation Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Reservation Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Shield className="w-6 h-6 text-primary" />
                  予約内容の確認
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date & Time */}
                <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-bold">
                      {reservationData.date && format(reservationData.date, "yyyy年M月d日 (E)", { locale: ja })}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4" />
                      {reservationData.timeSlot} 〜
                    </p>
                  </div>
                </div>

                {/* Guest & Seat Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">人数</p>
                      <p className="font-semibold">{reservationData.guestCount || 1}名様</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                      <Wine className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">お席</p>
                      <p className="font-semibold">{getSeatPreferenceText(reservationData.seatPreference)}</p>
                    </div>
                  </div>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg">
                  <Badge variant="secondary" className="bg-primary/20 text-primary px-3 py-1">
                    会員
                  </Badge>
                  <div>
                    <p className="font-semibold text-lg">{userName} 様</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">メンバーシップ会員</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Special Requests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  ご利用シーン・ご要望
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                  {Object.entries({
                    birthday: '誕生日',
                    anniversary: '記念日',
                    business: 'ビジネス',
                    dateNight: 'デート',
                    firstTime: '初来店',
                    allergies: 'アレルギー有'
                  }).map(([key, label]) => (
                    <motion.button
                      key={key}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setRequests(prev => ({ ...prev, [key]: !prev[key as keyof typeof requests] }))}
                      className={`
                        p-3 rounded-xl border-2 transition-all text-sm font-medium flex items-center justify-center gap-2
                        ${requests[key as keyof typeof requests]
                          ? 'border-primary bg-primary/10 text-primary shadow-md'
                          : 'border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }
                      `}
                    >
                      {getRequestIcon(key)}
                      {label}
                    </motion.button>
                  ))}
                </div>

                <Textarea
                  placeholder="その他のご要望、アレルギー情報、お祝いのメッセージなどをご記入ください"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
                
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  ※ アレルギーをお持ちの方は、具体的な食材名をご記入ください
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Privacy Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className={`shadow-lg transition-all ${isPublic ? 'border-primary/50' : ''}`}>
              <CardContent className="py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    {isPublic ? (
                      <Eye className="w-5 h-5 text-primary mt-0.5" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-gray-500 mt-0.5" />
                    )}
                    <div className="space-y-1">
                      <Label htmlFor="public-toggle" className="text-base font-semibold cursor-pointer">
                        他のメンバーに公開
                      </Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        公開すると、同じ時間帯に来店する他のメンバーとマッチングできます
                      </p>
                      {isPublic && (
                        <Badge variant="secondary" className="mt-2 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                          <Sparkles className="w-3 h-3 mr-1" />
                          マッチング可能
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Switch
                    id="public-toggle"
                    checked={isPublic}
                    onCheckedChange={setIsPublic}
                    className="ml-4"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - Restaurant Info & Actions */}
        <div className="lg:col-span-1 space-y-6">
          {/* Restaurant Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">店舗情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">CHEETAH</p>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      東京都渋谷区恵比寿西2-13-10<br />
                      ルガール恵比寿B1
                    </p>
                    <a 
                      href="https://maps.google.com/maps?q=CHEETAH+恵比寿"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline mt-2 inline-block"
                    >
                      地図を開く →
                    </a>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <p className="text-gray-600 dark:text-gray-400">03-1234-5678</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <p className="text-gray-600 dark:text-gray-400">info@cheetah-bar.com</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Cancellation Policy */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl"
          >
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                  キャンセルポリシー
                </p>
                <ul className="text-amber-700 dark:text-amber-300 space-y-1">
                  <li>• 当日キャンセルは3時間前まで</li>
                  <li>• 無断キャンセルはご遠慮ください</li>
                  <li>• 15分以上の遅刻はご連絡を</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="space-y-3"
          >
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-base font-semibold shadow-lg"
              size="lg"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  予約処理中...
                </div>
              ) : (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  予約を確定する
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              disabled={isSubmitting}
              className="w-full"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              時間選択に戻る
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}