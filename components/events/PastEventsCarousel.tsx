"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Users, 
  Star,
  Quote,
  Play,
  Download,
  ExternalLink
} from "lucide-react"

interface PastEventData {
  id: string
  title: string
  description: string
  date: string
  thumbnail: string
  attendees: number
  rating: number
  category: string[]
  highlights: string[]
  testimonials: {
    name: string
    avatar?: string
    comment: string
    rating: number
  }[]
  photos?: string[]
  videoUrl?: string
  materialsUrl?: string
  successStories?: string[]
}

// Sample past events data
const pastEventsData: PastEventData[] = [
  {
    id: "past-1",
    title: "Pitch Night Vol.11",
    description: "11回目となるPitch Nightには過去最多の起業家が参加。投資家との熱いマッチングが実現しました。",
    date: "2024/12/15",
    thumbnail: "https://images.unsplash.com/photo-1559223607-b4d0555ae227?q=80&w=3470",
    attendees: 48,
    rating: 4.8,
    category: ["投資", "ネットワーキング"],
    highlights: [
      "3つのスタートアップが投資家とのMTG決定",
      "総額2億円の投資関心表明",
      "過去最多の参加者数達成"
    ],
    testimonials: [
      {
        name: "田中 健太",
        comment: "その場で投資家の方と次のMTGが決まりました！CHEETAH BARの繋がりの質は本当に高いです。",
        rating: 5
      },
      {
        name: "佐藤 美希",
        comment: "初参加でしたが、皆さんとても親切で業界の枠を超えた交流ができました。",
        rating: 5
      }
    ],
    photos: [
      "https://images.unsplash.com/photo-1559223607-b4d0555ae227?q=80&w=3470",
      "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=3470"
    ],
    successStories: [
      "AI画像解析スタートアップが1000万円の投資獲得",
      "フィンテック企業が大手銀行との業務提携決定"
    ]
  },
  {
    id: "past-2",
    title: "AI Demo Day Vol.3",
    description: "最新のAI技術デモンストレーションイベント。ChatGPTを超える新技術の体験会も開催。",
    date: "2024/11/20",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=3432",
    attendees: 35,
    rating: 4.9,
    category: ["AI", "テクノロジー"],
    highlights: [
      "最新GPT-4 Turboの実演",
      "日本語特化LLMのβ版公開",
      "エンジニア×経営者の交流促進"
    ],
    testimonials: [
      {
        name: "山田 浩司",
        comment: "最新のAI技術を実際に触れることができて、自社のDX戦略が明確になりました。",
        rating: 5
      },
      {
        name: "鈴木 雅子",
        comment: "技術者だけでなく、ビジネス側の視点も学べる貴重な機会でした。",
        rating: 4
      }
    ],
    videoUrl: "https://example.com/ai-demo-video",
    materialsUrl: "https://example.com/ai-demo-materials"
  },
  {
    id: "past-3",
    title: "Founder's Talk - 起業成功の法則",
    description: "IPOを達成した創業者による特別講演。失敗から学んだ成功のエッセンスを公開。",
    date: "2024/10/10",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3387",
    attendees: 52,
    rating: 4.7,
    category: ["講演", "起業"],
    highlights: [
      "IPO達成までの具体的ステップ",
      "投資家との関係構築術",
      "チームビルディングの実践論"
    ],
    testimonials: [
      {
        name: "高橋 信一",
        comment: "具体的な数字と実体験に基づいた話で、非常に参考になりました。",
        rating: 5
      },
      {
        name: "伊藤 みなみ",
        comment: "失敗談も包み隠さず話してくださり、リアルな学びがありました。",
        rating: 5
      }
    ]
  },
  {
    id: "past-4",
    title: "Web3 Workshop - ブロックチェーン入門",
    description: "Web3の基礎から実践まで。実際にNFTを作成し、取引する体験型ワークショップ。",
    date: "2024/09/25",
    thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=3432",
    attendees: 28,
    rating: 4.6,
    category: ["Web3", "ワークショップ"],
    highlights: [
      "全員がNFT作成・取引を体験",
      "DeFiプロトコルの実演",
      "メタバース空間でのアフターパーティ"
    ],
    testimonials: [
      {
        name: "中村 大輔",
        comment: "Web3が身近に感じられるようになりました。次回のワークショップも期待しています。",
        rating: 4
      }
    ]
  }
]

export default function PastEventsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const nextEvent = () => {
    setCurrentIndex((prev) => (prev + 1) % pastEventsData.length)
  }

  const prevEvent = () => {
    setCurrentIndex((prev) => (prev - 1 + pastEventsData.length) % pastEventsData.length)
  }

  const currentEvent = pastEventsData[currentIndex]

  return (
    <section className="bg-white dark:bg-black py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            過去のイベントアーカイブ
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            これまでに開催したイベントの実績と参加者の声をご紹介します
          </p>
        </motion.div>

        {/* Main Featured Event */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-gray-200 dark:border-gray-700">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative h-64 lg:h-auto">
                <Image
                  src={currentEvent.thumbnail}
                  alt={currentEvent.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Navigation Arrows */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevEvent}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-none"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextEvent}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-none"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>

                {/* Event Date */}
                <div className="absolute bottom-4 left-4">
                  <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="font-medium">{currentEvent.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Category Badges */}
                  <div className="flex flex-wrap gap-2">
                    {currentEvent.category.map((cat, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        #{cat}
                      </Badge>
                    ))}
                  </div>

                  {/* Title and Description */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {currentEvent.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {currentEvent.description}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {currentEvent.attendees}名参加
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {currentEvent.rating}/5.0
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      イベントハイライト
                    </h4>
                    <ul className="space-y-2">
                      {currentEvent.highlights.map((highlight, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setExpandedEvent(
                        expandedEvent === currentEvent.id ? null : currentEvent.id
                      )}
                      variant="outline"
                      className="flex-1"
                    >
                      {expandedEvent === currentEvent.id ? '詳細を閉じる' : '詳細を見る'}
                    </Button>
                    {currentEvent.videoUrl && (
                      <Button size="sm" variant="ghost" className="px-3">
                        <Play className="w-4 h-4" />
                      </Button>
                    )}
                    {currentEvent.materialsUrl && (
                      <Button size="sm" variant="ghost" className="px-3">
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </motion.div>

        {/* Expanded Content */}
        <AnimatePresence>
          {expandedEvent === currentEvent.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16 overflow-hidden"
            >
              <Card className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Testimonials */}
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <Quote className="w-5 h-5 text-primary" />
                        参加者の声
                      </h4>
                      <div className="space-y-4">
                        {currentEvent.testimonials.map((testimonial, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-primary font-semibold text-sm">
                                  {testimonial.name.charAt(0)}
                                </span>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    {testimonial.name}
                                  </span>
                                  <div className="flex">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                      <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                                    ))}
                                  </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                  "{testimonial.comment}"
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Success Stories */}
                    {currentEvent.successStories && (
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                          成功事例
                        </h4>
                        <div className="space-y-4">
                          {currentEvent.successStories.map((story, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              className="bg-gradient-to-r from-primary/10 to-amber-500/10 p-4 rounded-lg border-l-4 border-primary"
                            >
                              <p className="text-gray-700 dark:text-gray-300 font-medium">
                                {story}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Event Thumbnails Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex gap-4 justify-center overflow-x-auto pb-4"
        >
          {pastEventsData.map((event, index) => (
            <motion.button
              key={event.id}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                index === currentIndex
                  ? 'border-primary shadow-lg shadow-primary/25'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={event.thumbnail}
                alt={event.title}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}