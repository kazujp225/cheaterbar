'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Crown, TrendingUp, Star, Award } from 'lucide-react'
import type { Membership } from '@/lib/supabase'

interface MembershipStatusWidgetProps {
  membership: Membership
}

const tierConfig = {
  bronze: {
    name: 'Bronze',
    color: 'from-orange-600 to-orange-700',
    bgColor: 'bg-orange-50',
    icon: '🥉',
    nextTier: 'Silver',
    requiredVisits: 10
  },
  silver: {
    name: 'Silver',
    color: 'from-gray-400 to-gray-500',
    bgColor: 'bg-gray-50',
    icon: '🥈',
    nextTier: 'Gold',
    requiredVisits: 20
  },
  gold: {
    name: 'Gold',
    color: 'from-yellow-500 to-yellow-600',
    bgColor: 'bg-yellow-50',
    icon: '🥇',
    nextTier: 'Platinum',
    requiredVisits: 30
  },
  platinum: {
    name: 'Platinum',
    color: 'from-purple-600 to-purple-700',
    bgColor: 'bg-purple-50',
    icon: '💎',
    nextTier: null,
    requiredVisits: null
  }
}

export default function MembershipStatusWidget({ membership }: MembershipStatusWidgetProps) {
  const tier = membership.tier || 'bronze'
  const config = tierConfig[tier as keyof typeof tierConfig]
  const currentVisits = 15 // ダミーデータ
  const progress = config.requiredVisits ? (currentVisits / config.requiredVisits) * 100 : 100

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-primary" />
            会員ステータス
          </span>
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-2xl"
          >
            {config.icon}
          </motion.span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 現在のティア */}
        <div className={`rounded-lg p-4 ${config.bgColor}`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className={`font-bold text-lg bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
              {config.name} Member
            </h3>
            <Star className="h-5 w-5 text-amber-500" />
          </div>
          <p className="text-sm text-muted-foreground">
            今月の来店: <strong>{currentVisits}回</strong>
          </p>
        </div>

        {/* 次のティアまでの進捗 */}
        {config.nextTier && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">次のティアまで</span>
              <span className="font-medium">{config.requiredVisits! - currentVisits}回</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{currentVisits}回</span>
              <span>{config.requiredVisits}回</span>
            </div>
          </div>
        )}

        {/* 特典 */}
        <div className="pt-2 border-t">
          <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
            <Award className="h-4 w-4" />
            現在の特典
          </h4>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li>• ドリンク10%オフ</li>
            <li>• 優先マッチング</li>
            <li>• 月1回の特別イベント招待</li>
          </ul>
        </div>

        {/* アップグレードヒント */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-3"
        >
          <p className="text-xs flex items-start gap-2">
            <TrendingUp className="h-4 w-4 text-primary mt-0.5" />
            <span>
              あと{config.requiredVisits ? config.requiredVisits - currentVisits : 0}回の来店で
              <strong className="text-primary">{config.nextTier}</strong>にランクアップ！
            </span>
          </p>
        </motion.div>
      </CardContent>
    </Card>
  )
}