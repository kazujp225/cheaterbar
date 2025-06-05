"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import VisitorCard, { VisitorData } from "./VisitorCard"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Calendar, RefreshCw, Coffee } from "lucide-react"

interface VisitorListProps {
  selectedDate: string
  filters: {
    types: string[]
    stages: string[]
    industries: string[]
  }
  isAuthenticated: boolean
}

// Sample data - 実際の実装ではAPIから取得
const sampleVisitors: VisitorData[] = [
  {
    id: '1',
    name: '高橋 一也',
    avatar: '/placeholder-user.jpg',
    businessType: 'POS系SaaS起業家',
    entrepreneurType: 'ロジック参謀型',
    stage: '開業済',
    industry: 'SaaS/IT',
    timeSlot: '19:00〜21:00',
    comment: '店舗リニューアルの相談できます。POSシステムの導入や効率化について話しましょう！',
    isOnline: true,
    membershipTier: 'premium',
    canContact: true
  },
  {
    id: '2', 
    name: '西野 ミサキ',
    avatar: '/placeholder-user.jpg',
    businessType: 'パン屋開業準備中',
    entrepreneurType: 'アイデアマン型',
    stage: '開業準備中',
    industry: '飲食',
    timeSlot: '20:00〜',
    comment: '初めて来ます！POS導入で悩み中。同じ飲食業界の方とお話ししたいです。',
    isOnline: false,
    membershipTier: 'basic',
    canContact: true
  },
  {
    id: '3',
    name: '田中 慎太郎',
    avatar: '/placeholder-user.jpg', 
    businessType: 'AIスタートアップCTO',
    entrepreneurType: '職人型',
    stage: 'スケール中',
    industry: 'AI/ML',
    timeSlot: '18:30〜22:00',
    comment: 'LLMを活用したプロダクト開発について。技術的な相談から事業戦略まで何でも！',
    isOnline: true,
    membershipTier: 'vip',
    canContact: true
  },
  {
    id: '4',
    name: '山田 健太',
    avatar: '/placeholder-user.jpg',
    businessType: 'EC物販事業',
    entrepreneurType: 'スケール型',
    stage: '開業済',
    industry: 'EC/物販',
    timeSlot: '19:30〜21:30',
    comment: '今月売上3000万達成！スケールのコツをシェアします。',
    isOnline: true,
    membershipTier: 'premium',
    canContact: false // 会員限定
  }
]

const getDateLabel = (dateKey: string) => {
  switch (dateKey) {
    case 'today': return '今日の来店予定者'
    case 'tomorrow': return '明日の来店予定者'
    case 'week': return '今週の来店予定者'
    default: return '来店予定者'
  }
}

const getDateSubtitle = (dateKey: string) => {
  switch (dateKey) {
    case 'today': return '12月25日（月）'
    case 'tomorrow': return '12月26日（火）'
    case 'week': return '12月25日 - 12月31日'
    default: return ''
  }
}

export default function VisitorList({ selectedDate, filters, isAuthenticated }: VisitorListProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Filter visitors based on selected filters
  const filteredVisitors = sampleVisitors.filter(visitor => {
    if (filters.types.length > 0 && !filters.types.includes(visitor.entrepreneurType)) {
      return false
    }
    if (filters.stages.length > 0 && !filters.stages.includes(visitor.stage)) {
      return false
    }
    if (filters.industries.length > 0 && !filters.industries.includes(visitor.industry)) {
      return false
    }
    return true
  })

  // Simulate different data for different dates
  const getVisitorsForDate = (dateKey: string) => {
    switch (dateKey) {
      case 'today': return filteredVisitors
      case 'tomorrow': return filteredVisitors.slice(0, 2)
      case 'week': return [...filteredVisitors, ...filteredVisitors.slice(0, 2)]
      default: return filteredVisitors
    }
  }

  const displayVisitors = getVisitorsForDate(selectedDate)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const handleContactRequest = (visitorId: string) => {
    console.log('Contact request for visitor:', visitorId)
    // Implement contact request logic
  }

  const handleViewProfile = (visitorId: string) => {
    console.log('View profile for visitor:', visitorId)
    // Implement profile view logic
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            {getDateLabel(selectedDate)}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {getDateSubtitle(selectedDate)}
          </p>
        </div>
        
        <Button
          variant="outline"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          更新
        </Button>
      </div>

      {/* Stats Summary */}
      <Card className="bg-gradient-to-r from-primary/5 to-amber-500/5 dark:from-primary/10 dark:to-amber-500/10 border-primary/20">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{displayVisitors.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">総来店予定者</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">
                {displayVisitors.filter(v => v.isOnline).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">オンライン中</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-500">
                {displayVisitors.filter(v => v.membershipTier === 'premium' || v.membershipTier === 'vip').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">プレミアム会員</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">
                {displayVisitors.filter(v => v.canContact).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">コンタクト可能</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visitors Grid */}
      <AnimatePresence mode="wait">
        {displayVisitors.length > 0 ? (
          <motion.div
            key={selectedDate}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayVisitors.map((visitor, index) => (
              <motion.div
                key={visitor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <VisitorCard
                  visitor={visitor}
                  isAuthenticated={isAuthenticated}
                  onContactRequest={handleContactRequest}
                  onViewProfile={handleViewProfile}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-dashed border-2 border-gray-300 dark:border-gray-600">
              <CardContent className="p-12 text-center">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  まだ来店予定者がいません
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {selectedDate === 'today' 
                    ? '今日の来店予定者はまだいません。あなたが最初の予定者になりませんか？'
                    : 'この日程の来店予定者はまだいません。'
                  }
                </p>
                {isAuthenticated && (
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    <Coffee className="w-4 h-4 mr-2" />
                    来店予定を登録する
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guest CTA */}
      {!isAuthenticated && displayVisitors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-primary/10 to-amber-500/10 border-primary/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">
                さらに詳しい情報をチェック！
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                会員登録で「一緒に飲みたい」機能やプロフィール詳細をご利用いただけます
              </p>
              <div className="flex gap-4 justify-center">
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  無料で会員登録
                </Button>
                <Button variant="outline">
                  ログイン
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}