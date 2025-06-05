"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Check, 
  X, 
  Sparkles, 
  Users, 
  MessageSquare, 
  Calendar,
  Coffee,
  Star,
  ArrowRight,
  Zap
} from "lucide-react"

interface Feature {
  name: string
  free: boolean | string
  paid: boolean | string
  icon?: any
}

const features: Feature[] = [
  {
    name: "利用料金",
    free: "¥0/月",
    paid: "¥5,000/月",
    icon: Sparkles
  },
  {
    name: "ドリンク",
    free: "基本ドリンク無料",
    paid: "基本ドリンク無料",
    icon: Coffee
  },
  {
    name: "来店",
    free: "登録で利用可",
    paid: "同上",
    icon: Calendar
  },
  {
    name: "イベント参加",
    free: "参加可（定員次第）",
    paid: "優先参加枠あり",
    icon: Star
  },
  {
    name: "誰が来てる？機能",
    free: false,
    paid: true,
    icon: Users
  },
  {
    name: "飲みたい申請",
    free: false,
    paid: "利用可能（3日希望制）",
    icon: MessageSquare
  },
  {
    name: "メッセージ機能",
    free: false,
    paid: "メッセージ送信＋チップ可能",
    icon: MessageSquare
  }
]

export default function PlanComparisonTable() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            選べる2つのプラン
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            開業前は無料、開業後は有料プランで本格的なネットワーキングを
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="relative border-2 border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-all duration-300">
              <CardHeader className="text-center pb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                  <Zap className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                </div>
                <CardTitle className="text-2xl mb-2">開業前（無料）</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">¥0</span>
                  <span className="text-gray-600 dark:text-gray-400">/月</span>
                </div>
                <Badge variant="secondary" className="mt-2">
                  開業準備中の方向け
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                    className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      {feature.icon && <feature.icon className="w-4 h-4 text-gray-500" />}
                      <span className="text-sm font-medium">{feature.name}</span>
                    </div>
                    <div className="text-right">
                      {typeof feature.free === 'boolean' ? (
                        feature.free ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300" />
                        )
                      ) : (
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {feature.free}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
                <div className="pt-6">
                  <Link href="/auth/register" className="block">
                    <Button 
                      variant="outline" 
                      className="w-full py-6 text-base hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      無料で登録する
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Paid Plan */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="relative border-2 border-primary hover:border-primary/70 transition-all duration-300 shadow-xl">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-white px-4 py-1">
                  おすすめ
                </Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl mb-2">開業済（有料）</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">¥5,000</span>
                  <span className="text-gray-600 dark:text-gray-400">/月</span>
                </div>
                <Badge className="mt-2 bg-primary/10 text-primary border-primary/20">
                  本気の起業家向け
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                    className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      {feature.icon && <feature.icon className="w-4 h-4 text-primary" />}
                      <span className="text-sm font-medium">{feature.name}</span>
                    </div>
                    <div className="text-right">
                      {typeof feature.paid === 'boolean' ? (
                        feature.paid ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300" />
                        )
                      ) : (
                        <span className="text-sm font-semibold text-primary">
                          {feature.paid}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
                <div className="pt-6">
                  <Link href="/auth/register?pro=1" className="block">
                    <Button 
                      className="w-full py-6 text-base bg-primary hover:bg-primary/90 text-white shadow-lg"
                    >
                      今すぐ¥5,000で登録
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ※ 開業済みの判断は自己申告制です。法人登記や開業届の提出は不要です。
          </p>
        </motion.div>
      </div>
    </section>
  )
}