'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, CheckCircle, Users, Calendar, Lightbulb, Clock } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { ja } from 'date-fns/locale'

const activities = [
  {
    id: 1,
    type: 'matching',
    title: '鈴木さんとマッチング成立',
    description: 'AI・機械学習について話しました',
    timestamp: '2024-06-03T19:30:00',
    icon: Users,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    id: 2,
    type: 'pitch',
    title: 'ピッチリクエスト送信',
    description: 'SaaSプロダクトの提案',
    timestamp: '2024-06-02T20:00:00',
    icon: Lightbulb,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50'
  },
  {
    id: 3,
    type: 'visit',
    title: '来店',
    description: '2時間滞在、3名と交流',
    timestamp: '2024-06-01T19:00:00',
    icon: Calendar,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    id: 4,
    type: 'achievement',
    title: 'Gold会員達成',
    description: '月間15回の来店を達成',
    timestamp: '2024-05-31T00:00:00',
    icon: CheckCircle,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50'
  }
]

export default function RecentActivityWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            最近のアクティビティ
          </span>
          <span className="text-sm font-normal text-muted-foreground">
            過去7日間
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity, index) => {
            const Icon = activity.icon
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                {/* アイコン */}
                <div className={`rounded-lg p-2 ${activity.bgColor} ${activity.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                
                {/* コンテンツ */}
                <div className="flex-1 space-y-1">
                  <h4 className="text-sm font-medium">{activity.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {activity.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {format(parseISO(activity.timestamp), 'M月d日(E) HH:mm', { locale: ja })}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
        
        {/* もっと見るリンク */}
        <div className="mt-4 pt-4 border-t text-center">
          <a 
            href="/mypage/activity" 
            className="text-sm text-primary hover:underline inline-flex items-center gap-1"
          >
            すべての履歴を見る
            <span className="text-xs">→</span>
          </a>
        </div>
      </CardContent>
    </Card>
  )
}