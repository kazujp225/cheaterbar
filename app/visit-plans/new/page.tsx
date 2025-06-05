'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { createBrowserSupabaseClient } from '@/lib/supabase-dummy'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Calendar } from '@/components/ui/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, Calendar as CalendarIcon, Clock, Eye, Users, EyeOff, Lock } from 'lucide-react'
import { format, addDays, setHours, setMinutes } from 'date-fns'
import { ja } from 'date-fns/locale'

const VISIBILITY_OPTIONS = [
  {
    value: 'public',
    label: '全体公開',
    description: 'すべての会員に詳細が表示されます',
    icon: Eye,
  },
  {
    value: 'members_only',
    label: '会員限定',
    description: '有料会員のみ詳細が表示されます',
    icon: Users,
  },
  {
    value: 'anonymous',
    label: '匿名公開',
    description: '来店することのみ表示され、名前は非公開です',
    icon: EyeOff,
  },
  {
    value: 'private',
    label: '非公開',
    description: '他の会員には表示されません',
    icon: Lock,
  },
]

const TIME_OPTIONS = Array.from({ length: 9 }, (_, i) => {
  const hour = 18 + i
  return {
    value: `${hour.toString().padStart(2, '0')}:00`,
    label: `${hour}:00`,
  }
})

const DURATION_OPTIONS = [
  { value: '1', label: '1時間' },
  { value: '2', label: '2時間' },
  { value: '3', label: '3時間' },
  { value: '4', label: '4時間以上' },
]

export default function NewVisitPlanPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createBrowserSupabaseClient()

  const [formData, setFormData] = useState({
    visit_date: addDays(new Date(), 1),
    start_time: '19:00',
    duration: '2',
    visibility: 'public',
    message: '',
  })

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login')
    }
  }, [user, authLoading, router])

  const calculateEndTime = (startTime: string, duration: string) => {
    if (duration === '4') return null // 4時間以上の場合は終了時間を設定しない

    const [hours, minutes] = startTime.split(':').map(Number)
    const durationHours = parseInt(duration)
    const endHour = hours + durationHours
    
    if (endHour >= 26) return '26:00' // 深夜2時以降は26:00とする
    
    return `${endHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const endTime = calculateEndTime(formData.start_time, formData.duration)

      const { error: insertError } = await supabase
        .from('visit_plans')
        .insert({
          user_id: user!.id,
          visit_date: format(formData.visit_date, 'yyyy-MM-dd'),
          start_time: formData.start_time,
          end_time: endTime,
          visibility: formData.visibility,
          message: formData.message || null,
        })

      if (insertError) throw insertError

      router.push('/visit-plans')
    } catch (err: any) {
      setError(err.message || '来店予定の登録に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">来店予定を登録</CardTitle>
            <CardDescription>
              来店予定を登録して、他の会員に知らせましょう
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Date Selection */}
              <div className="space-y-2">
                <Label>来店予定日</Label>
                <Calendar
                  mode="single"
                  selected={formData.visit_date}
                  onSelect={(date) => date && setFormData({ ...formData, visit_date: date })}
                  disabled={(date) => date < new Date()}
                  locale={ja}
                  className="rounded-md border"
                />
                <p className="text-sm text-muted-foreground">
                  選択日: {format(formData.visit_date, 'yyyy年M月d日(E)', { locale: ja })}
                </p>
              </div>

              {/* Time Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_time">来店時間</Label>
                  <Select
                    value={formData.start_time}
                    onValueChange={(value) => setFormData({ ...formData, start_time: value })}
                  >
                    <SelectTrigger id="start_time">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">滞在予定時間</Label>
                  <Select
                    value={formData.duration}
                    onValueChange={(value) => setFormData({ ...formData, duration: value })}
                  >
                    <SelectTrigger id="duration">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DURATION_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Visibility Settings */}
              <div className="space-y-2">
                <Label>公開設定</Label>
                <RadioGroup
                  value={formData.visibility}
                  onValueChange={(value) => setFormData({ ...formData, visibility: value })}
                >
                  {VISIBILITY_OPTIONS.map((option) => {
                    const Icon = option.icon
                    return (
                      <div key={option.value} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent">
                        <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                        <Label
                          htmlFor={option.value}
                          className="flex-1 cursor-pointer space-y-1"
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            <span className="font-medium">{option.label}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {option.description}
                          </p>
                        </Label>
                      </div>
                    )
                  })}
                </RadioGroup>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">ひとことメッセージ（任意）</Label>
                <Textarea
                  id="message"
                  placeholder="今日は〇〇について話したいです..."
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  disabled={loading}
                />
                <p className="text-xs text-muted-foreground">
                  他の会員に向けてメッセージを残せます（最大200文字）
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/visit-plans')}
                disabled={loading}
              >
                キャンセル
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    登録中...
                  </>
                ) : (
                  '来店予定を登録'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Tips */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">来店予定登録のヒント</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              ・来店予定を事前に登録することで、効率的なネットワーキングが可能になります
            </p>
            <p>
              ・公開設定は後から変更することもできます
            </p>
            <p>
              ・急な予定変更の場合は、来店予定をキャンセルすることができます
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}