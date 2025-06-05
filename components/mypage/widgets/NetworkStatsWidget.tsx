'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, UserPlus, MessageSquare, TrendingUp, ArrowUp } from 'lucide-react'

const stats = [
  {
    label: 'コネクション',
    value: 24,
    change: '+3',
    trend: 'up',
    icon: Users,
    color: 'text-blue-600'
  },
  {
    label: '今月の新規',
    value: 5,
    change: '+2',
    trend: 'up',
    icon: UserPlus,
    color: 'text-green-600'
  },
  {
    label: 'マッチング成功',
    value: 8,
    change: '+1',
    trend: 'up',
    icon: MessageSquare,
    color: 'text-purple-600'
  }
]

export default function NetworkStatsWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5 text-primary" />
          ネットワーク統計
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center space-y-1"
              >
                <div className={`inline-flex p-2 rounded-lg bg-secondary ${stat.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
                {stat.change && (
                  <div className="flex items-center justify-center gap-1 text-xs text-green-600">
                    <ArrowUp className="h-3 w-3" />
                    {stat.change}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
        
        {/* ビジュアルグラフ */}
        <div className="mt-4 pt-4 border-t">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">ネットワーク成長率</span>
              <span className="font-medium text-green-600">+18%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-primary/80"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}