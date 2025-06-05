"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const milestones = [
  {
    year: "2020",
    title: "開業チーターの始まり",
    description: "起業家支援プロジェクト開始",
    icon: "🚀",
  },
  {
    year: "2022",
    title: "CHEETAH BAR構想",
    description: "起業家が集まる場所の必要性を実感",
    icon: "💡",
  },
  {
    year: "2023",
    title: "グランドオープン",
    description: "六本木に起業家のための特別な空間が誕生",
    icon: "🎉",
  },
  {
    year: "2024",
    title: "コミュニティ拡大",
    description: "1000人を超える起業家ネットワークへ",
    icon: "🌟",
  },
]

const features = [
  {
    title: "Networking Hub",
    description: "毎晩開催される起業家交流会",
    icon: "🤝",
  },
  {
    title: "Pitch Events",
    description: "投資家向けピッチイベント",
    icon: "📊",
  },
  {
    title: "AI & Tech Talks",
    description: "最新テクノロジーの勉強会",
    icon: "🤖",
  },
]

export default function About() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1])
  const scale = useTransform(scrollYProgress, [0.1, 0.3], [0.8, 1])

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-secondary dark:via-black dark:to-secondary" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sapphire/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-thin tracking-[0.2em] text-gray-900 dark:text-white uppercase">
            About Us
          </h2>
          <p className="jp text-xl md:text-2xl text-primary/80 font-light mb-2">私たちについて</p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 mb-20">
          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="relative">
              <motion.div
                style={{ opacity, scale }}
                className="absolute -top-4 -left-4 text-8xl font-bold text-primary/10"
              >
                "
              </motion.div>
              <h3 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-white mb-6 leading-tight">
                開業チーターが
                <span className="block gradient-text-premium">プロデュースする</span>
                "加速装置"
              </h3>
            </div>
            
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed jp">
              令和の虎・林社長や起業家、AIギークが夜ごと集い、
              ネットワークが爆速で拡がるバーです。
            </p>
            
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              CHEETAH BARは、単なるバーではありません。
              起業家のアイデアが形になり、新しいビジネスが生まれる
              イノベーションの発信地です。
            </p>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl mb-2">{feature.icon}</div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">{feature.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-500 jp">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[400px] md:h-[500lg:h-[600px] rounded-2xl overflow-hidden group">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="CHEETAH BAR Interior"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMwQTBBMEEiLz48L3N2Zz4="
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Stats Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 grid grid-cols-3 gap-4">
                <div className="bg-white/80 dark:bg-black/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-primary">1000+</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">メンバー</p>
                </div>
                <div className="bg-white/80 dark:bg-black/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-primary">50+</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">イベント/月</p>
                </div>
                <div className="bg-white/80 dark:bg-black/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-primary">100+</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">起業成功</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-2xl md:text-3xl font-light text-center text-gray-900 dark:text-white mb-12 tracking-wide">
            Our Journey
          </h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent" />
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className="w-1/2" />
                  
                  {/* Center Icon */}
                  <div className="relative z-10 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white dark:bg-black rounded-full border-2 border-primary flex items-center justify-center">
                      <span className="text-2xl">{milestone.icon}</span>
                    </div>
                  </div>
                  
                  {/* Content Card */}
                  <div className="w-1/2 px-8">
                    <Card className={`bg-white/80 dark:bg-black/50 backdrop-blur-md border border-gray-200 dark:border-white/10 p-6 hover-lift ${
                      index % 2 === 0 ? "text-left" : "text-right"
                    }`}>
                      <Badge className="mb-2 bg-primary/20 text-primary border-primary/30">
                        {milestone.year}
                      </Badge>
                      <h4 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                        {milestone.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {milestone.description}
                      </p>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <Card className="bg-white/80 dark:bg-black/50 backdrop-blur-md border border-gray-200 dark:border-primary/20 p-8 md:p-12 max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-gray-900 dark:text-white font-light italic leading-relaxed mb-6">
              "Where startup minds gather, ideas sprint."
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 jp">
              スタートアップマインドが集まり、アイデアが疾走する場所
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}