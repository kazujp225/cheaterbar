"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Crown, 
  Calendar, 
  TrendingUp, 
  ExternalLink,
  CreditCard,
  Gift,
  Star,
  Shield,
  Zap
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"
import { format } from "date-fns"
import { ja } from "date-fns/locale"

const TIER_CONFIG = {
  bronze: {
    label: "ブロンズ",
    color: "bg-gradient-to-r from-orange-400 to-orange-600",
    icon: "🥉",
    nextTier: "シルバー",
    monthsToNext: 4,
    benefits: ["月2回まで来店無料", "基本ドリンク10%OFF"]
  },
  silver: {
    label: "シルバー",
    color: "bg-gradient-to-r from-gray-400 to-gray-600",
    icon: "🥈",
    nextTier: "ゴールド",
    monthsToNext: 13,
    benefits: ["月5回まで来店無料", "全ドリンク15%OFF", "優先予約"]
  },
  gold: {
    label: "ゴールド",
    color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
    icon: "🥇",
    nextTier: "プラチナ",
    monthsToNext: 24,
    benefits: ["月10回まで来店無料", "全ドリンク20%OFF", "VIPイベント招待"]
  },
  platinum: {
    label: "プラチナ",
    color: "bg-gradient-to-r from-purple-400 to-purple-600",
    icon: "💎",
    nextTier: null,
    monthsToNext: null,
    benefits: ["無制限来店", "全ドリンク30%OFF", "専用コンシェルジュ", "限定イベント優先招待"]
  }
}

export default function MembershipStatus() {
  const { membership } = useAuth()
  
  // デフォルト値の設定
  const currentTier = membership?.tier || "bronze"
  const tierConfig = TIER_CONFIG[currentTier as keyof typeof TIER_CONFIG]
  
  const membershipDuration = membership?.started_at 
    ? Math.floor((new Date().getTime() - new Date(membership.started_at).getTime()) / (1000 * 60 * 60 * 24 * 30))
    : 0
  
  const progressToNextTier = tierConfig.monthsToNext
    ? Math.min((membershipDuration / tierConfig.monthsToNext) * 100, 100)
    : 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="rounded-2xl shadow-md bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className={`h-2 ${tierConfig.color}`} />
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold tracking-wide flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-amber-500" />
            会員プラン状況
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Plan */}
          <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{tierConfig.icon}</span>
                <div>
                  <h3 className="text-lg font-bold">{tierConfig.label}会員</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {membership?.type === 'paid' ? '有料プラン' : '無料プラン'}
                  </p>
                </div>
              </div>
              <Badge 
                variant={membership?.status === 'active' ? 'default' : 'secondary'}
                className="capitalize"
              >
                {membership?.status === 'active' ? 'アクティブ' : membership?.status || 'inactive'}
              </Badge>
            </div>

            {/* Progress to Next Tier */}
            {tierConfig.nextTier && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                  <span>次のステータスまで</span>
                  <span className="font-medium">{tierConfig.nextTier}</span>
                </div>
                <Progress value={progressToNextTier} className="h-2" />
                <p className="text-xs text-right text-gray-500">
                  継続{membershipDuration}ヶ月目 / {tierConfig.monthsToNext}ヶ月
                </p>
              </div>
            )}
          </div>

          {/* Benefits */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Gift className="w-4 h-4 text-purple-500" />
              現在の特典
            </h4>
            <ul className="space-y-2">
              {tierConfig.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Star className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dates */}
          <div className="space-y-3 pt-4 border-t">
            {membership?.started_at && (
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4" />
                  開始日
                </span>
                <span className="font-medium">
                  {format(new Date(membership.started_at), 'yyyy年M月d日', { locale: ja })}
                </span>
              </div>
            )}
            
            {membership?.expires_at && (
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <TrendingUp className="h-4 w-4" />
                  次回更新日
                </span>
                <span className="font-medium">
                  {format(new Date(membership.expires_at), 'yyyy年M月d日', { locale: ja })}
                </span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          {membership?.type === 'free' || !membership ? (
            <Link href="/membership/upgrade" className="w-full">
              <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
                <Zap className="w-4 h-4 mr-2" />
                有料プランにアップグレード
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/profile#membership" className="w-full">
                <Button variant="outline" className="w-full">
                  会員情報を管理
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                onClick={() => {
                  if (confirm("本当に解約しますか？")) {
                    console.log("Cancelling membership...")
                  }
                }}
              >
                解約する
              </Button>
            </>
          )}
          
          {membership?.stripe_subscription_id && (
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
              <Shield className="w-3 h-3" />
              Stripeで安全に決済されています
            </p>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}