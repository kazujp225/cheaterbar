'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Users, Lightbulb, ArrowRight, Clock, Sparkles } from 'lucide-react'
import Link from 'next/link'

const actions = [
  {
    id: 'visit',
    title: '来店予定を登録する',
    description: 'まだ今週の予定がありません',
    icon: Calendar,
    href: '/visit-plans/new',
    color: 'from-blue-500 to-blue-600',
    urgent: true
  },
  {
    id: 'matching',
    title: '新着マッチングリクエスト',
    description: '山田さんから飲みのお誘い',
    icon: Users,
    href: '/matching/requests',
    color: 'from-purple-500 to-purple-600',
    badge: 2
  },
  {
    id: 'pitch',
    title: 'ピッチを投稿する',
    description: '今月のピッチ募集中',
    icon: Lightbulb,
    href: '/mypage/pitch',
    color: 'from-amber-500 to-amber-600'
  }
]

export default function QuickActionsWidget() {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            今日のアクション
          </span>
          <span className="text-sm font-normal text-muted-foreground">
            優先度順
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={action.href}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden rounded-lg border bg-card p-4 cursor-pointer group"
              >
                {/* 背景グラデーション */}
                <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                
                <div className="relative flex items-start gap-4">
                  {/* アイコン */}
                  <div className={`rounded-lg bg-gradient-to-r ${action.color} p-2 text-white`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  
                  {/* コンテンツ */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{action.title}</h3>
                      {action.urgent && (
                        <span className="flex items-center gap-1 text-xs text-amber-600">
                          <Clock className="h-3 w-3" />
                          急ぎ
                        </span>
                      )}
                      {action.badge && (
                        <span className="inline-flex items-center justify-center rounded-full bg-destructive px-2 py-1 text-xs font-medium text-destructive-foreground">
                          {action.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {action.description}
                    </p>
                  </div>
                  
                  {/* 矢印アイコン */}
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}