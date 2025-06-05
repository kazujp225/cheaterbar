"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  Calendar,
  Clock,
  MessageSquare,
  Eye,
  EyeOff,
  Save,
  X,
  Users,
  Coffee,
  Lightbulb
} from "lucide-react"

interface VisitScheduleFormProps {
  onClose: () => void
}

const timeSlots = [
  '18:00 - 19:00',
  '19:00 - 20:00', 
  '20:00 - 21:00',
  '21:00 - 22:00',
  '22:00 - 23:00',
  '23:00 - 24:00',
  '24:00 - 25:00',
  '25:00 - 26:00'
]

const suggestionTemplates = [
  "○○業界の相談できます",
  "初めて来店します！",
  "今日はまったり飲みたい気分",
  "新規事業のアイデア募集中",
  "資金調達の経験シェアします",
  "プロダクト開発の相談歓迎"
]

export default function VisitScheduleForm({ onClose }: VisitScheduleFormProps) {
  const [formData, setFormData] = useState({
    date: '',
    timeSlots: [] as string[],
    comment: '',
    isPublic: true
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get next 3 days for date selection
  const getNextDays = () => {
    const days = []
    for (let i = 0; i < 4; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      days.push({
        value: date.toISOString().split('T')[0],
        label: i === 0 ? '今日' : i === 1 ? '明日' : date.toLocaleDateString('ja-JP', { 
          month: 'short', 
          day: 'numeric',
          weekday: 'short' 
        })
      })
    }
    return days
  }

  const handleTimeSlotToggle = (slot: string) => {
    setFormData(prev => ({
      ...prev,
      timeSlots: prev.timeSlots.includes(slot)
        ? prev.timeSlots.filter(s => s !== slot)
        : [...prev.timeSlots, slot]
    }))
  }

  const handleSuggestionClick = (suggestion: string) => {
    setFormData(prev => ({
      ...prev,
      comment: prev.comment + (prev.comment ? ' ' : '') + suggestion
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Submitted visit schedule:', formData)
    setIsSubmitting(false)
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="border-primary/20 bg-white dark:bg-gray-900">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Calendar className="w-5 h-5 text-primary" />
              来店予定を登録
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            あなたの来店予定を登録して、他の会員とのマッチングチャンスを増やしましょう
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date Selection */}
            <div className="space-y-3">
              <Label className="text-base font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                来店日
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {getNextDays().map(day => (
                  <motion.div
                    key={day.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="button"
                      variant={formData.date === day.value ? "default" : "outline"}
                      className={`w-full h-12 ${
                        formData.date === day.value
                          ? 'bg-primary hover:bg-primary/90 text-white'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, date: day.value }))}
                    >
                      {day.label}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div className="space-y-3">
              <Label className="text-base font-medium flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                滞在予定時間（複数選択可）
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {timeSlots.map(slot => (
                  <motion.div
                    key={slot}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="button"
                      variant={formData.timeSlots.includes(slot) ? "default" : "outline"}
                      size="sm"
                      className={`w-full ${
                        formData.timeSlots.includes(slot)
                          ? 'bg-primary hover:bg-primary/90 text-white'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                      onClick={() => handleTimeSlotToggle(slot)}
                    >
                      {slot}
                    </Button>
                  </motion.div>
                ))}
              </div>
              {formData.timeSlots.length > 0 && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  選択中: {formData.timeSlots.join(', ')}
                </div>
              )}
            </div>

            {/* Comment */}
            <div className="space-y-3">
              <Label htmlFor="comment" className="text-base font-medium flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                一言メッセージ
              </Label>
              <Textarea
                id="comment"
                placeholder="例：○○の相談できます、初めて来店します、など..."
                value={formData.comment}
                onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                className="min-h-[100px] resize-none"
                maxLength={200}
              />
              <div className="text-xs text-gray-500 text-right">
                {formData.comment.length}/200文字
              </div>

              {/* Suggestion Templates */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Lightbulb className="w-3 h-3 text-amber-500" />
                  よく使われるメッセージ
                </Label>
                <div className="flex flex-wrap gap-2">
                  {suggestionTemplates.map((suggestion, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-primary/10 hover:border-primary/30 text-xs"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        + {suggestion}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Privacy Setting */}
            <div className="space-y-3">
              <Label className="text-base font-medium">公開設定</Label>
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  {formData.isPublic ? (
                    <Eye className="w-5 h-5 text-green-500" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  )}
                  <div>
                    <div className="font-medium">
                      {formData.isPublic ? '他の会員に公開' : '非公開'}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {formData.isPublic 
                        ? '他の会員があなたの来店予定を見ることができます'
                        : '自分だけが確認できます（マッチング機能は利用不可）'
                      }
                    </div>
                  </div>
                </div>
                <Switch
                  checked={formData.isPublic}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPublic: checked }))}
                />
              </div>
            </div>

            {/* Benefits Info */}
            <div className="bg-gradient-to-r from-primary/5 to-amber-500/5 dark:from-primary/10 dark:to-amber-500/10 p-4 rounded-lg border border-primary/20">
              <h4 className="font-medium text-primary mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                来店予定登録の特典
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 同じ時間帯の会員と事前マッチング</li>
                <li>• 「一緒に飲みたい」リクエストを受信</li>
                <li>• おすすめの会員を優先表示</li>
                <li>• 来店時のスムーズな交流をサポート</li>
              </ul>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                キャンセル
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90 text-white"
                disabled={!formData.date || formData.timeSlots.length === 0 || isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    登録中...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    予定を登録
                  </div>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}