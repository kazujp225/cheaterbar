"use client"

import Hero from "@/components/Hero"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Sparkles, Clock, MapPin, Calendar, Users, Star, TrendingUp, Zap, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useRef, useState, useEffect } from "react"
import { getBlurDataURL, getOptimizedImageUrl } from "@/lib/image-utils"

export default function Home() {
  const containerRef = useRef(null)
  const [activeSection, setActiveSection] = useState(0)
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  // Set mounted state to true after component mounts
  useEffect(() => {
    setMounted(true)
  }, [])

  // Mobile horizontal sections
  const mobileSections = [
    {
      id: "concept",
      title: "Concept",
      subtitle: "起業家の加速装置",
      content: "アイデアがスプリントする場所",
      image: getOptimizedImageUrl("https://images.unsplash.com/photo-1514933651103-005eec06c04b", 2000, 80)
    },
    {
      id: "experience",
      title: "Experience",
      subtitle: "特別な体験",
      content: "ネットワーキングを超えた出会い",
      image: getOptimizedImageUrl("https://images.unsplash.com/photo-1541532713592-79a0317b6b77", 2000, 80)
    },
    {
      id: "membership",
      title: "Membership",
      subtitle: "会員制度",
      content: "選ばれた起業家のための空間",
      image: getOptimizedImageUrl("https://images.unsplash.com/photo-1503899036084-c55cdd92da26", 2000, 80)
    }
  ]

  const handleSectionChange = (index: number) => {
    setActiveSection(index)
  }

  return (
    <main ref={containerRef} className="min-h-screen bg-black text-white">
      <section id="hero">
        <Hero />
      </section>
      
      {/* Content Sections - Responsive without conditional rendering */}
      <section className="relative">
        {/* Mobile Horizontal Layout */}
        <div className="md:hidden relative h-screen bg-black">
          {/* Horizontal Scroll Container */}
          <div className="flex h-full snap-x snap-mandatory overflow-x-auto scrollbar-hide">
            {mobileSections.map((section, index) => (
              <motion.div
                key={section.id}
                className="min-w-full h-full snap-center relative flex items-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    placeholder="blur"
                    blurDataURL={getBlurDataURL()}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 px-8 py-20 max-w-lg mx-auto text-center">
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
                      {section.title}
                    </Badge>
                    <h2 className="text-4xl font-bold mb-4">
                      {section.subtitle}
                    </h2>
                    <p className="text-lg text-gray-300">
                      {section.content}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Indicators */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
            {mobileSections.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === activeSection 
                    ? 'w-8 bg-primary' 
                    : 'w-2 bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Vertical Layout */}
        <div className="hidden md:block">
          {/* Concept Section */}
          <section className="relative min-h-screen flex items-center">
            <motion.div 
              className="absolute inset-0"
              style={{ opacity, scale }}
            >
              <Image
                src={getOptimizedImageUrl("https://images.unsplash.com/photo-1514933651103-005eec06c04b", 3501, 80)}
                alt="Premium bar interior"
                fill
                className="object-cover"
                loading="lazy"
                placeholder="blur"
                blurDataURL={getBlurDataURL()}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />
            </motion.div>

            <div className="container relative z-10 mx-auto px-4">
              <motion.div 
                className="max-w-3xl"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 px-4 py-2">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Concept
                </Badge>
                
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                  起業家の
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-500">
                    加速装置
                  </span>
                </h2>
                
                <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                  アイデアがスプリントする場所。<br />
                  最速で成長する起業家たちが集まる、特別な空間。
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link href="/membership">
                    <Button size="lg" className="gap-2 hover:scale-105 transition-transform">
                      会員になる
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button size="lg" variant="outline" className="gap-2 hover:scale-105 transition-transform">
                      詳しく見る
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-20 bg-gradient-to-b from-black to-gray-900">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  体験を超える、
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-500">
                    成功への道
                  </span>
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  CHEETAH BARでしか味わえない、特別な価値
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Feature Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700 hover:border-primary/50 transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm h-full">
                    <div className="p-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-amber-500/20 rounded-2xl flex items-center justify-center mb-6">
                        <Users className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">会員制ネットワーク</h3>
                      <p className="text-gray-400 leading-relaxed">
                        厳選された起業家・投資家・専門家が集う、質の高いコミュニティ
                      </p>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700 hover:border-primary/50 transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm h-full">
                    <div className="p-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-amber-500/20 rounded-2xl flex items-center justify-center mb-6">
                        <Zap className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">AIマッチング</h3>
                      <p className="text-gray-400 leading-relaxed">
                        最適なビジネスパートナーをAIが提案。偶然を必然に変える
                      </p>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700 hover:border-primary/50 transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm h-full">
                    <div className="p-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-amber-500/20 rounded-2xl flex items-center justify-center mb-6">
                        <Calendar className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">限定イベント</h3>
                      <p className="text-gray-400 leading-relaxed">
                        月50回以上の交流会、ピッチイベント、成功者による講演会
                      </p>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Latest Events */}
          <section className="py-20 bg-black relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
            
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-2">最新イベント</h2>
                    <p className="text-xl text-gray-400">今週開催される注目のイベント</p>
                  </div>
                  <Link href="/events">
                    <Button variant="outline" className="gap-2">
                      すべて見る
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Event Cards would go here */}
                <p className="text-gray-500 text-center col-span-full py-12">
                  イベント情報を読み込み中...
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-t from-gray-900 to-black relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center max-w-3xl mx-auto"
              >
                <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 px-4 py-2">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Join Now
                </Badge>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  今すぐ、
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-500">
                    成功への扉
                  </span>
                  を開く
                </h2>
                
                <p className="text-xl text-gray-300 mb-8">
                  限定100名の起業家コミュニティ。<br />
                  あなたのビジネスを次のステージへ。
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/membership">
                    <Button size="lg" className="gap-2 hover:scale-105 transition-transform px-8 py-6 text-lg">
                      会員登録を始める
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="gap-2 hover:scale-105 transition-transform px-8 py-6 text-lg">
                      お問い合わせ
                    </Button>
                  </Link>
                </div>

                <div className="mt-12 flex justify-center items-center gap-8 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>24時間利用可能</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>東京・六本木</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    <span>満足度95%</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}