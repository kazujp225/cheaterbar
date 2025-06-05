"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  UserPlus, 
  Calendar, 
  Star, 
  Users,
  Gift,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles
} from "lucide-react"

const benefits = [
  {
    icon: Star,
    title: "優先参加権",
    description: "人気イベントに優先的に参加可能"
  },
  {
    icon: Users,
    title: "限定ネットワーク",
    description: "会員限定の特別交流会への招待"
  },
  {
    icon: Gift,
    title: "特別割引",
    description: "イベント料金の会員割引適用"
  },
  {
    icon: Calendar,
    title: "早期情報",
    description: "新イベントの先行案内"
  }
]

const steps = [
  {
    step: "01",
    title: "無料会員登録",
    description: "基本情報を入力して会員登録",
    icon: UserPlus
  },
  {
    step: "02", 
    title: "イベント選択",
    description: "参加したいイベントを選んで申込",
    icon: Calendar
  },
  {
    step: "03",
    title: "CHEETAH BARで交流",
    description: "新しい出会いとビジネスチャンス",
    icon: Users
  }
]

export default function EventCTA() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-amber-500/10" />
      
      {/* Background Image */}
      <div className="absolute inset-0 opacity-30">
        <Image
          src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=3474"
          alt="CHEETAH BAR Interior"
          fill
          className="object-cover"
        />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-primary/20 to-amber-500/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-orange-500/15 to-primary/15 rounded-full blur-2xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/5 via-amber-500/5 to-orange-500/5 rounded-full blur-3xl animate-pulse" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            参加方法のご案内
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            イベントに参加するには？
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            まだCHEETAH BARの会員ではない方へ
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Steps */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              簡単3ステップで参加可能
            </h3>
            
            <div className="space-y-6">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="w-5 h-5 text-primary" />
                        <h4 className="text-lg font-semibold text-white">
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-gray-400">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Right Column - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              会員になるとこんな特典が
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white h-full hover:bg-white/15 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <h4 className="font-semibold">{benefit.title}</h4>
                        </div>
                        <p className="text-gray-300 text-sm">
                          {benefit.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-lg mx-auto">
            {/* Primary CTA - Register */}
            <Link href="/auth/register" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="group w-full bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/25 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  会員登録（無料）
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </Link>

            {/* Secondary CTA - Reserve */}
            <Link href="/mypage" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="group w-full border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/60 px-8 py-6 text-lg font-medium transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  来店予約する
                </span>
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm">会員登録は完全無料</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-green-400" />
              <span className="text-sm">即日イベント参加可能</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-green-400" />
              <span className="text-sm">特典がすぐに利用可能</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-8 text-center"
        >
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">500+</div>
            <div className="text-gray-400">アクティブ会員数</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">50+</div>
            <div className="text-gray-400">月間イベント開催数</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">95%</div>
            <div className="text-gray-400">会員満足度</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}