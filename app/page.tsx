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
import { useIsMobile } from "@/hooks/use-mobile"

export default function Home() {
  const containerRef = useRef(null)
  const isMobile = useIsMobile()
  const [activeSection, setActiveSection] = useState(0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  // Mobile horizontal sections
  const mobileSections = [
    {
      id: "concept",
      title: "Concept",
      subtitle: "起業家の加速装置",
      content: "アイデアがスプリントする場所",
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2000"
    },
    {
      id: "experience",
      title: "Experience",
      subtitle: "特別な体験",
      content: "ネットワーキングを超えた出会い",
      image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=2000"
    },
    {
      id: "membership",
      title: "Membership",
      subtitle: "会員制度",
      content: "選ばれた起業家のための空間",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=2000"
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
      
      {/* Mobile Horizontal Layout */}
      {isMobile ? (
        <section className="relative h-screen bg-black">
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
                    <p className="text-xl text-gray-300 mb-8">
                      {section.content}
                    </p>
                    <Link href={`/${section.id}`}>
                      <Button size="lg" className="rounded-full px-8">
                        詳しく見る
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>

                {/* Navigation Hint */}
                {index < mobileSections.length - 1 && (
                  <motion.div
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <ChevronRight className="w-8 h-8 text-white/50" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {mobileSections.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  document.querySelector('.snap-x')?.scrollTo({
                    left: index * window.innerWidth,
                    behavior: 'smooth'
                  })
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeSection === index 
                    ? 'w-8 bg-primary' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </section>
      ) : (
        <>
          {/* Desktop Concept Section */}
          <section id="concept" className="relative h-screen flex items-center overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black to-transparent z-20" />
            <motion.div 
              className="absolute inset-0"
              style={{ scale }}
            >
              <Image
                src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=3474"
                alt="Premium bar interior"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-amber-500/5" />
            </motion.div>
            
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="max-w-3xl"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Badge className="inline-flex items-center gap-2 mb-4 bg-white/10 backdrop-blur-sm text-white px-4 py-2">
                    <Sparkles className="w-4 h-4" />
                    CONCEPT
                  </Badge>
                </motion.div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                    Where Startup Minds
                  </span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-500 to-orange-500">
                    Gather & Sprint
                  </span>
                </h2>
                
                <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed font-light">
                  起業家の「今」と「未来」が交差する、
                  <br className="hidden md:inline" />
                  日本最速のビジネス創造空間。
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/about">
                    <Button size="lg" className="group bg-white text-black hover:bg-gray-100 px-8">
                      詳しく見る
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/membership">
                    <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                      会員になる
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      )}

      {/* Menu Preview Section - Mobile Optimized */}
      <section id="menu" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-amber-500/5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              MENU & DRINKS
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              創造性を刺激する
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-500">
                特別なメニュー
              </span>
            </h2>
          </motion.div>

          {/* Mobile: Horizontal scroll menu */}
          <div className={`${isMobile ? 'overflow-x-auto scrollbar-hide' : 'grid md:grid-cols-2 lg:grid-cols-4 gap-6'}`}>
            <div className={`${isMobile ? 'flex gap-4 pb-4' : 'contents'}`}>
              {[
                {
                  title: "Signature Cocktails",
                  subtitle: "シグネチャーカクテル",
                  description: "起業家の情熱を表現する創作カクテル",
                  price: "¥1,800〜",
                  image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=800"
                },
                {
                  title: "Premium Selection",
                  subtitle: "プレミアムセレクション",
                  description: "世界の名酒を厳選",
                  price: "¥2,000〜",
                  image: "https://images.unsplash.com/photo-1569924995012-c4c706bfcd51?q=80&w=800"
                },
                {
                  title: "Tapas & Bites",
                  subtitle: "タパス＆バイツ",
                  description: "会話を彩る創作料理",
                  price: "¥1,200〜",
                  image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800"
                },
                {
                  title: "Member's Special",
                  subtitle: "会員限定メニュー",
                  description: "会員だけの特別な一品",
                  price: "Ask",
                  image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800"
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={isMobile ? 'min-w-[280px]' : ''}
                >
                  <Card className="overflow-hidden h-full bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-primary/50 transition-all duration-300 group">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-300">{item.subtitle}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-primary">{item.price}</span>
                        <Link href="/menu">
                          <Button size="sm" variant="ghost" className="text-primary hover:text-primary/80">
                            詳細
                            <ArrowRight className="ml-1 w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/menu">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-10">
                メニューを見る
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Experience Section - Mobile Optimized */}
      <section id="experience" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=3488"
            alt="Networking event"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-white/10 text-white border-white/20">
              EXPERIENCE
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              ここでしか得られない
              <span className="block text-primary">特別な体験</span>
            </h2>
          </motion.div>

          {/* Mobile: Stack vertically */}
          <div className={`${isMobile ? 'space-y-6' : 'grid md:grid-cols-2 lg:grid-cols-4 gap-6'} max-w-6xl mx-auto`}>
            {[
              {
                icon: Users,
                title: "Exclusive Networking",
                description: "選ばれた起業家との出会い",
                stat: "500+",
                label: "アクティブメンバー"
              },
              {
                icon: Calendar,
                title: "Premium Events",
                description: "限定イベント・セミナー",
                stat: "20+",
                label: "月間イベント"
              },
              {
                icon: Star,
                title: "VIP Treatment",
                description: "会員限定の特別サービス",
                stat: "∞",
                label: "可能性"
              },
              {
                icon: TrendingUp,
                title: "Business Growth",
                description: "ビジネスを加速する出会い",
                stat: "95%",
                label: "満足度"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300 h-full">
                  <feature.icon className="w-12 h-12 mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{feature.description}</p>
                  <div className="pt-4 border-t border-white/10">
                    <div className="text-3xl font-bold text-primary">{feature.stat}</div>
                    <div className="text-xs text-gray-400">{feature.label}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section - Mobile Optimized */}
      <section id="location" className="py-20 bg-gradient-to-b from-black to-gray-900 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className={`${isMobile ? 'space-y-8' : 'grid md:grid-cols-2 gap-12'} items-center`}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=3474"
                  alt="Tokyo night view"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <Badge className="bg-primary/90 text-white">
                    麻布十番
                  </Badge>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
                    LOCATION
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    アクセス
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">住所</h3>
                      <p className="text-gray-400">
                        東京都港区麻布十番１丁目５−１０<br />
                        第２石原ビル 別館 1階
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">営業時間</h3>
                      <p className="text-gray-400">
                        月〜土: 18:00 - 26:00<br />
                        日祝: 定休日
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">定員</h3>
                      <p className="text-gray-400">
                        15名（完全予約制）
                      </p>
                    </div>
                  </div>
                </div>

                <Link href="/access">
                  <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                    アクセス詳細
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-t from-primary/20 via-black to-black">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              起業家の未来を加速する
              <span className="block text-primary">特別な場所へ</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              今すぐ会員登録して、次世代の起業家ネットワークに参加しましょう
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/membership">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-10">
                  会員登録
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-10">
                  お問い合わせ
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}