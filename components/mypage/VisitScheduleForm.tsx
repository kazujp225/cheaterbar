'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarPlus, Clock, MessageSquare, Eye } from "lucide-react"
import { format, addDays } from 'date-fns'
import { ja } from 'date-fns/locale'
import { createBrowserSupabaseClient } from '@/lib/supabase-dummy'
import { useToast } from "@/hooks/use-toast"

const TIME_SLOTS = [
  { value: "18:00", label: "18:00" },
  { value: "19:00", label: "19:00" },
  { value: "20:00", label: "20:00" },
  { value: "21:00", label: "21:00" },
  { value: "22:00", label: "22:00" },
  { value: "23:00", label: "23:00" },
  { value: "24:00", label: "24:00" },
]

export default function VisitScheduleForm({ userId }: { userId: string }) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(addDays(new Date(), 1))
  const [selectedTime, setSelectedTime] = useState("19:00")
  const [comment, setComment] = useState("")
  const [isPublic, setIsPublic] = useState(true)
  const supabase = createBrowserSupabaseClient()

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const { error } = await supabase
        .from('visit_plans')
        .insert({
          user_id: userId,
          visit_date: format(selectedDate, 'yyyy-MM-dd'),
          start_time: selectedTime,
          end_time: null,
          visibility: isPublic ? 'public' : 'private',
          message: comment || null,
        })

      if (error) throw error

      toast({
        title: "来店予定を登録しました",
        description: `${format(selectedDate, 'M月d日(E)', { locale: ja })} ${selectedTime}〜`,
      })

      // フォームをリセット
      setSelectedDate(addDays(new Date(), 1))
      setSelectedTime("19:00")
      setComment("")
      setIsPublic(true)

      // 来店予定ページへリダイレクト
      router.push('/visit-plans')
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "エラーが発生しました",
        description: "来店予定の登録に失敗しました",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarPlus className="h-5 w-5" />
          来店予定を登録
        </CardTitle>
        <CardDescription>
          来店予定を登録して、他の会員とのネットワーキングを活性化しましょう
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 日付選択 */}
        <div className="space-y-2">
          <Label>来店予定日</Label>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            disabled={(date) => date < new Date()}
            locale={ja}
            className="rounded-md border"
          />
          <p className="text-sm text-muted-foreground">
            選択日: {format(selectedDate, 'yyyy年M月d日(E)', { locale: ja })}
          </p>
        </div>

        {/* 時間選択 */}
        <div className="space-y-2">
          <Label htmlFor="time" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            来店時間
          </Label>
          <Select value={selectedTime} onValueChange={setSelectedTime}>
            <SelectTrigger id="time">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIME_SLOTS.map((slot) => (
                <SelectItem key={slot.value} value={slot.value}>
                  {slot.label}〜
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* コメント */}
        <div className="space-y-2">
          <Label htmlFor="comment" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            コメント（任意）
          </Label>
          <Textarea
            id="comment"
            placeholder="例：19時に1杯だけいます、資金調達について相談したい"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
          />
        </div>

        {/* 公開設定 */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="public" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              他のユーザーに公開
            </Label>
            <p className="text-sm text-muted-foreground">
              ONにすると他の会員があなたの来店予定を確認できます
            </p>
          </div>
          <Switch
            id="public"
            checked={isPublic}
            onCheckedChange={setIsPublic}
          />
        </div>

        <Button 
          onClick={handleSubmit} 
          disabled={loading}
          className="w-full"
        >
          {loading ? "登録中..." : "来店予定を登録"}
        </Button>
      </CardContent>
    </Card>
  )
}