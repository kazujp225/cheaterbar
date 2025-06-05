"use client"

import { motion } from "framer-motion"
import { useState, useMemo } from "react"
import EventCard, { EventData } from "./EventCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar,
  Filter,
  SortAsc,
  Users,
  MapPin,
  Monitor,
  Sparkles
} from "lucide-react"

// Sample upcoming events data
const upcomingEventsData: EventData[] = [
  {
    id: "1",
    title: "Pitch Night Vol.12",
    description: "起業家と投資家が出会う月例イベント。あなたのアイデアを3分でプレゼンテーションし、貴重なフィードバックと投資機会を獲得しましょう。",
    date: "2025/01/17（金）",
    time: "19:00 - 22:00",
    location: "CHEETAH BAR",
    type: "real",
    category: ["投資", "ネットワーキング", "プレゼン"],
    participants: 42,
    maxParticipants: 50,
    isPopular: true,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1559223607-b4d0555ae227?q=80&w=3470",
    price: 5000,
    memberOnly: false
  },
  {
    id: "2",
    title: "AI Demo Day - 最新技術体験会",
    description: "ChatGPT、Claude、Midjourney等の最新AI技術を実際に体験。現役エンジニアが使い方からビジネス活用まで徹底解説します。",
    date: "2025/01/22（水）",
    time: "18:30 - 21:00",
    location: "オンライン + CHEETAH BAR",
    type: "hybrid",
    category: ["AI", "テクノロジー", "学習"],
    participants: 28,
    maxParticipants: 40,
    isPopular: false,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=3432",
    price: 3000,
    memberOnly: false
  },
  {
    id: "3",
    title: "秘密のCheetah - VIP交流会",
    description: "月商1000万円超えの経営者限定の特別交流会。他では聞けない実践的なビジネス戦略を共有し合う秘密の集まりです。",
    date: "2025/01/25（土）",
    time: "20:00 - 24:00",
    location: "CHEETAH BAR VIP Room",
    type: "real",
    category: ["VIP", "経営戦略", "プライベート"],
    participants: 12,
    maxParticipants: 15,
    isPopular: true,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=3432",
    price: 15000,
    memberOnly: true
  },
  {
    id: "4",
    title: "Founder's Talk with 田中CEO",
    description: "ユニコーン企業を創業した田中CEOによる特別講演。スタートアップの成長戦略から投資家との向き合い方まで語ります。",
    date: "2025/02/05（水）",
    time: "19:00 - 21:30",
    location: "CHEETAH BAR メインフロア",
    type: "real",
    category: ["講演", "起業", "成功事例"],
    participants: 35,
    maxParticipants: 60,
    isPopular: false,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3387",
    price: 4000,
    memberOnly: false
  },
  {
    id: "5",
    title: "Web3 & Blockchain Workshop",
    description: "ブロックチェーン技術の基礎からNFT、DeFi、DAOまで。実際にウォレットを作成し、トークンの売買を体験します。",
    date: "2025/02/12（水）",
    time: "18:00 - 21:00",
    location: "完全オンライン",
    type: "online",
    category: ["Web3", "ブロックチェーン", "ワークショップ"],
    participants: 18,
    maxParticipants: 30,
    isPopular: false,
    isFeatured: false,
    price: 2000,
    memberOnly: false
  },
  {
    id: "6",
    title: "女性起業家限定ネットワーキング",
    description: "女性起業家・経営者限定の交流会。業界の壁を越えて、お互いの経験を共有し、新たなコラボレーションを生み出しましょう。",
    date: "2025/02/20（木）",
    time: "19:30 - 22:00",
    location: "CHEETAH BAR",
    type: "real",
    category: ["女性限定", "ネットワーキング", "コラボレーション"],
    participants: 20,
    maxParticipants: 25,
    isPopular: true,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=3388",
    price: 0,
    memberOnly: false
  }
]

type FilterType = 'all' | 'real' | 'online' | 'hybrid' | 'featured' | 'free' | 'member-only'
type SortType = 'date' | 'popularity' | 'price'

export default function UpcomingEventsGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [sortBy, setSortBy] = useState<SortType>('date')

  const filters = [
    { key: 'all', label: 'すべて', icon: Calendar },
    { key: 'real', label: 'リアル開催', icon: MapPin },
    { key: 'online', label: 'オンライン', icon: Monitor },
    { key: 'hybrid', label: 'ハイブリッド', icon: Users },
    { key: 'featured', label: '注目イベント', icon: Sparkles },
    { key: 'free', label: '無料', icon: Calendar },
    { key: 'member-only', label: '会員限定', icon: Users },
  ]

  const filteredAndSortedEvents = useMemo(() => {
    let filtered = upcomingEventsData

    // Apply filters
    switch (activeFilter) {
      case 'real':
        filtered = filtered.filter(event => event.type === 'real')
        break
      case 'online':
        filtered = filtered.filter(event => event.type === 'online')
        break
      case 'hybrid':
        filtered = filtered.filter(event => event.type === 'hybrid')
        break
      case 'featured':
        filtered = filtered.filter(event => event.isFeatured)
        break
      case 'free':
        filtered = filtered.filter(event => event.price === 0)
        break
      case 'member-only':
        filtered = filtered.filter(event => event.memberOnly)
        break
      default:
        break
    }

    // Apply sorting
    switch (sortBy) {
      case 'popularity':
        filtered = [...filtered].sort((a, b) => {
          const aRate = a.participants / a.maxParticipants
          const bRate = b.participants / b.maxParticipants
          return bRate - aRate
        })
        break
      case 'price':
        filtered = [...filtered].sort((a, b) => (a.price || 0) - (b.price || 0))
        break
      case 'date':
      default:
        // Already sorted by date in the data
        break
    }

    return filtered
  }, [activeFilter, sortBy])

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-20">
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
            今後のイベント
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            起業家のための学び、つながり、成長の機会をご用意しています
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter, index) => {
                const Icon = filter.icon
                return (
                  <motion.button
                    key={filter.key}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    onClick={() => setActiveFilter(filter.key as FilterType)}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                      ${activeFilter === filter.key
                        ? 'bg-primary text-white shadow-lg shadow-primary/25'
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    {filter.label}
                  </motion.button>
                )
              })}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <SortAsc className="w-4 h-4" />
                <span>並び順:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortType)}
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="date">開催日順</option>
                <option value="popularity">人気順</option>
                <option value="price">料金順</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-6 text-sm text-gray-600 dark:text-gray-400"
          >
            {filteredAndSortedEvents.length}件のイベントが見つかりました
          </motion.div>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredAndSortedEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <EventCard 
                event={event} 
                variant={event.isFeatured ? 'featured' : 'default'}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredAndSortedEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              該当するイベントが見つかりません
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              フィルターを変更してお試しください
            </p>
            <Button
              onClick={() => setActiveFilter('all')}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              すべてのイベントを表示
            </Button>
          </motion.div>
        )}

        {/* Load More Button */}
        {filteredAndSortedEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-white px-8"
            >
              さらに読み込む
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}