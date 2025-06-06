"use client"

import { useEffect, useState } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, ArrowLeft } from "lucide-react"
import { getEvent, Event } from "@/lib/events"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { getBlurDataURL, getOptimizedImageUrl } from "@/lib/image-utils"

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const eventData = getEvent(params.id)
    if (!eventData) {
      notFound()
    }
    setEvent(eventData)
    setLoading(false)
  }, [params.id])

  if (loading || !event) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-black pt-20">
        <div className="container mx-auto px-4 py-16">
          <p className="text-center text-gray-500">読み込み中...</p>
        </div>
      </main>
    )
  }

  const isPastEvent = new Date(event.date) < new Date()

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black pt-20">
      {/* Hero Section with Image */}
      {event.imageUrl && (
        <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <Image
            src={getOptimizedImageUrl(event.imageUrl, 1920)}
            alt={event.title}
            fill
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL={getBlurDataURL()}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          {/* Back Button */}
          <div className="absolute top-4 left-4 z-10">
            <Link href="/events">
              <Button variant="ghost" size="sm" className="text-white hover:text-white/80">
                <ArrowLeft className="w-4 h-4 mr-2" />
                イベント一覧へ
              </Button>
            </Link>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* If no image, show back button here */}
        {!event.imageUrl && (
          <div className="mb-6">
            <Link href="/events">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                イベント一覧へ
              </Button>
            </Link>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Event Header */}
            <div className="mb-8">
              {isPastEvent && (
                <Badge variant="secondary" className="mb-4">
                  終了したイベント
                </Badge>
              )}
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {event.title}
              </h1>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-6">
                {event.category.map((cat) => (
                  <Badge key={cat} variant="outline">
                    {cat}
                  </Badge>
                ))}
              </div>

              {/* Event Details */}
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-semibold">日付</p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {format(new Date(event.date), "yyyy年MM月dd日（E）", {
                            locale: ja,
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-semibold">時間</p>
                        <p className="text-gray-600 dark:text-gray-400">{event.time}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-semibold">場所</p>
                        <p className="text-gray-600 dark:text-gray-400">{event.location}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Event Description */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-2xl font-semibold mb-4">イベント詳細</h2>
              <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                {event.description}
              </div>
            </div>

            {/* Location Info */}
            {event.location === "CHEETAH BAR" && (
              <Card className="mt-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">アクセス</h3>
                  <div className="space-y-2 text-gray-600 dark:text-gray-400">
                    <p>東京都港区麻布十番１丁目５−１０</p>
                    <p>第２石原ビル 別館 1階</p>
                    <p className="text-sm">
                      麻布十番駅（東京メトロ南北線・都営大江戸線）より徒歩3分
                    </p>
                  </div>
                  <Link href="/access">
                    <Button variant="outline" className="mt-4">
                      詳しいアクセス情報
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Update Info */}
            <div className="mt-8 text-sm text-gray-500">
              <p>最終更新: {format(new Date(event.updatedAt), "yyyy年MM月dd日 HH:mm")}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}