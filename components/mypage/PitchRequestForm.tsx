'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Lock, Send } from "lucide-react"
import { createBrowserSupabaseClient } from '@/lib/supabase-dummy'
import { useToast } from "@/hooks/use-toast"

const PITCH_TOPICS = [
  { value: "funding", label: "資金調達を検討中", icon: "💰" },
  { value: "pmf", label: "PMF達成のアドバイスがほしい", icon: "🎯" },
  { value: "marketing", label: "マーケティング戦略の相談", icon: "📣" },
  { value: "hiring", label: "採用・組織づくりの悩み", icon: "👥" },
  { value: "pivot", label: "事業ピボットの検討", icon: "🔄" },
  { value: "other", label: "その他", icon: "💭" }
]

export default function PitchRequestForm({ userId }: { userId: string }) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [topic, setTopic] = useState("")
  const [details, setDetails] = useState("")
  const supabase = createBrowserSupabaseClient()

  const handleSubmit = async () => {
    if (!topic || !details) {
      toast({
        title: "入力エラー",
        description: "トピックと詳細を入力してください",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      // 実際の実装では専用のpitch_requestsテーブルに保存
      const { error } = await supabase
        .from('audit_logs')
        .insert({
          user_id: userId,
          action: 'pitch_request',
          resource_type: 'pitch',
          metadata: {
            topic,
            details,
            is_anonymous: true
          }
        })

      if (error) throw error

      toast({
        title: "非公開ピッチ申請を送信しました",
        description: "店舗スタッフが確認後、マッチング候補をご提案します",
      })

      // フォームをリセット
      setTopic("")
      setDetails("")
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "エラーが発生しました",
        description: "申請の送信に失敗しました",
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
          <Lightbulb className="h-5 w-5" />
          非公開ピッチ申請
        </CardTitle>
        <CardDescription>
          今抱えている課題や相談したいことを匿名で送信できます
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
          <Lock className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            この内容は店舗スタッフのみが確認し、他の会員には公開されません
          </p>
        </div>

        {/* トピック選択 */}
        <div className="space-y-3">
          <Label>相談したいトピック</Label>
          <RadioGroup value={topic} onValueChange={setTopic}>
            {PITCH_TOPICS.map((item) => (
              <div key={item.value} className="flex items-center space-x-2">
                <RadioGroupItem value={item.value} id={item.value} />
                <Label
                  htmlFor={item.value}
                  className="flex items-center gap-2 cursor-pointer font-normal"
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* 詳細入力 */}
        <div className="space-y-2">
          <Label htmlFor="details">詳細（匿名で送信されます）</Label>
          <Textarea
            id="details"
            placeholder="例：シリーズAの資金調達を検討しています。VCとの接点を作りたいです..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={4}
          />
          <p className="text-xs text-muted-foreground">
            具体的に記載いただくと、より適切なマッチングをご提案できます
          </p>
        </div>

        <Button 
          onClick={handleSubmit} 
          disabled={loading || !topic || !details}
          className="w-full"
        >
          {loading ? (
            "送信中..."
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              匿名で申請を送信
            </>
          )}
        </Button>

        <div className="text-center">
          <Badge variant="outline" className="text-xs">
            通常1-2営業日で店舗よりご連絡します
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}