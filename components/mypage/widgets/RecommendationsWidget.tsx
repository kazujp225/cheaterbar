'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, Calendar, UserPlus, FileText, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const recommendations = [
  {
    id: 1,
    type: 'event',
    title: '今週のイベントに参加',
    description: '「AI×起業」セミナー開催',
    icon: Calendar,
    href: '/events',
    action: '詳細を見る'
  },
  {
    id: 2,
    type: 'profile',
    title: 'プロフィールを充実させる',
    description: '興味分野を追加して30%アップ',
    icon: FileText,
    href: '/mypage/profile',
    action: '編集する'
  },
  {
    id: 3,
    type: 'connect',
    title: '田中さんと繋がる',
    description: '共通の興味: FinTech',
    icon: UserPlus,
    href: '/members/tanaka',
    action: 'プロフィールを見る'
  }
]

export default function RecommendationsWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-primary" />
          おすすめアクション
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recommendations.map((rec, index) => {
          const Icon = rec.icon
          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={rec.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="group flex items-start gap-3 p-3 rounded-lg border hover:border-primary/50 hover:bg-secondary/50 transition-all cursor-pointer"
                >
                  <div className="rounded-lg bg-secondary p-2">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-sm font-medium group-hover:text-primary transition-colors">
                      {rec.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {rec.description}
                    </p>
                  </div>
                  
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors mt-1" />
                </motion.div>
              </Link>
            </motion.div>
          )
        })}
        
        {/* AIアシスタント */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 p-3 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20"
        >
          <div className="flex items-start gap-2">
            <Sparkles className="h-4 w-4 text-primary mt-0.5" />
            <div className="flex-1">
              <p className="text-xs">
                <strong className="text-primary">AIアシスタント:</strong>
                あなたの興味分野に基づいて、最適なマッチング相手を見つけました。
              </p>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}