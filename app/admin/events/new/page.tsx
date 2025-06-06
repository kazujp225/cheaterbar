"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, X } from "lucide-react"
import { isAuthenticated } from "@/lib/auth"
import { createEvent } from "@/lib/events"
import Link from "next/link"

const CATEGORY_SUGGESTIONS = [
  "ネットワーキング",
  "ピッチイベント",
  "セミナー",
  "ワークショップ",
  "交流会",
  "スペシャルゲスト",
]

export default function NewEventPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "CHEETAH BAR",
    imageUrl: "",
    category: [] as string[],
  })
  const [categoryInput, setCategoryInput] = useState("")

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin/login")
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createEvent(formData)
    router.push("/admin/events")
  }

  const addCategory = (cat: string) => {
    if (cat && !formData.category.includes(cat)) {
      setFormData({
        ...formData,
        category: [...formData.category, cat],
      })
    }
    setCategoryInput("")
  }

  const removeCategory = (cat: string) => {
    setFormData({
      ...formData,
      category: formData.category.filter((c) => c !== cat),
    })
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black pt-20">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-6">
          <Link href="/admin/events">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              戻る
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>新規イベント作成</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">イベントタイトル*</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  placeholder="例: 起業家ネットワーキングナイト"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">説明*</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  rows={5}
                  placeholder="イベントの詳細を入力してください"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">日付*</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">時間*</Label>
                  <Input
                    id="time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    required
                    placeholder="例: 19:00-21:00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">場所*</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">画像URL（任意）</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="space-y-2">
                <Label>カテゴリー</Label>
                <div className="flex gap-2">
                  <Input
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                    placeholder="カテゴリーを入力"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addCategory(categoryInput)
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addCategory(categoryInput)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {CATEGORY_SUGGESTIONS.map((cat) => (
                    <Badge
                      key={cat}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-white"
                      onClick={() => addCategory(cat)}
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>

                {formData.category.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.category.map((cat) => (
                      <Badge key={cat} className="bg-primary">
                        {cat}
                        <button
                          type="button"
                          onClick={() => removeCategory(cat)}
                          className="ml-2"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  イベントを作成
                </Button>
                <Link href="/admin/events" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    キャンセル
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}