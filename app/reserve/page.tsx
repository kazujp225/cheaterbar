"use client"

import { motion } from "framer-motion"
import { useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import DateBasedVisitorSchedule from "@/components/reserve/DateBasedVisitorSchedule"
import { Shield, Users, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ReservePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login?redirect=/reserve')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <span className="text-gray-600 dark:text-gray-400">読み込み中...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white pt-20">
        <div className="container mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto"
          >
            <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-4">ログインが必要です</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              来店予約は会員限定の機能です。ログインしてご利用ください。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button 
                onClick={() => router.push('/auth/login?redirect=/reserve')}
                className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto"
              >
                ログイン
              </Button>
              <Button 
                variant="outline"
                onClick={() => router.push('/auth/register?redirect=/reserve')}
                className="w-full sm:w-auto"
              >
                新規会員登録
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white pt-20 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-8 h-8 text-primary" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">誰に会える？</h1>
            <Sparkles className="w-8 h-8 text-amber-500" />
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
            来店予定の人を見て、会いたい人がいる日に予約しよう
          </p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 mt-2 px-4">
            CHEETAH BARは「人との出会い」を最大化する会員制バーです
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <DateBasedVisitorSchedule />
        </motion.div>
      </div>
    </main>
  )
}