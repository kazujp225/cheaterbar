"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Award, Users, Zap, Target, Linkedin, Twitter, Quote, TrendingUp, Building2, Sparkles, BookOpen, Trophy, Rocket, Crown, Hexagon, Circle } from "lucide-react"
import { getBlurDataURL, getOptimizedImageUrl } from "@/lib/image-utils"
import { useRef } from "react"

// 創業者情報
const founder = {
  name: "林 尚弘",
  title: "開業チーター / CHEETAH BAR オーナー",
  image: getOptimizedImageUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", 800, 80),
  bio: "令和の虎として知られる起業家。開業支援サービス「開業チーター」を運営し、これまでに1000社以上の起業をサポート。CHEETAH BARは、起業家同士のリアルな交流の場として2023年に開業。",
  achievements: [
    "開業チーター創業者",
    "令和の虎 出演",
    "起業支援実績 1000社以上",
    "著書「最速開業メソッド」"
  ],
  social: {
    twitter: "https://twitter.com/kaigyo_cheetah",
    linkedin: "https://linkedin.com/in/kaigyo-cheetah"
  }
}

// チームメンバー
const team = [
  {
    name: "林 尚弘",
    nameReading: "はやし なおひろ",
    role: "株式会社FCチャンネル 代表取締役",
    image: getOptimizedImageUrl("https://images.unsplash.com/photo-1560250097-0b93528c311a", 800, 80),
    bio: "「授業をしない」武田塾を創業し、フランチャイズ展開により全国400校舎、年商130億円を達成。フランチャイズ展開と顧問業を通じて、教育業界に革新をもたらす。",
    achievements: [
      "武田塾創業者",
      "全国400校舎展開",
      "年商130億円達成",
      "教育業界の革新者"
    ],
    stats: {
      revenue: "130億円",
      stores: "400校舎",
      growth: "業界No.1"
    }
  },
  {
    name: "山﨑 俊",
    nameReading: "やまざき しゅん",
    role: "株式会社Wiz 代表取締役社長",
    image: getOptimizedImageUrl("https://images.unsplash.com/photo-1519085360753-af0119f7cbe7", 800, 80), 
    bio: "2012年に株式会社Wizを設立し、IT・通信、ビジネスサポート、メディアなど多岐にわたる事業を展開。2025年4月にMS&Consultingと資本業務提携。",
    achievements: [
      "営業利益9.4億円（前年比264.8％増）",
      "多角的事業展開",
      "8,835万円資金調達",
      "MS&Consulting提携"
    ],
    stats: {
      profit: "9.4億円",
      growth: "264.8%",
      funding: "8,835万円"
    }
  },
  {
    name: "清水 望",
    nameReading: "しみず のぞむ",
    role: "株式会社ラストワンマイル 代表取締役社長",
    image: getOptimizedImageUrl("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e", 800, 80),
    bio: "光通信での経験を経て、2011年に株式会社U-MXを設立。コールセンター事業からインサイドセールスへと事業を拡大。2023年プレミアムウォーターHDへのバイアウトを実現。",
    achievements: [
      "営業利益2.1億円（前年比276.5％増）",
      "プレミアムウォーターHDへバイアウト",
      "Wiz執行役員 AI戦略本部長",
      "インサイドセールスの先駆者"
    ],
    stats: {
      profit: "2.1億円",
      growth: "276.5%",
      buyout: "成功"
    }
  }
]

// メディア掲載実績（テキストのみで表示）
const mediaLogos = [
  { name: "日経新聞", displayName: "日本経済新聞" },
  { name: "TechCrunch", displayName: "TechCrunch Japan" },
  { name: "Forbes Japan", displayName: "Forbes JAPAN" },
  { name: "NewsPicks", displayName: "NewsPicks" },
  { name: "ダイヤモンド", displayName: "週刊ダイヤモンド" },
  { name: "東洋経済", displayName: "東洋経済オンライン" }
]

// 数字で見る実績
const stats = [
  { number: "1,000+", label: "会員数", icon: Users },
  { number: "500+", label: "月間マッチング", icon: Zap },
  { number: "50+", label: "月間イベント", icon: Target },
  { number: "95%", label: "満足度", icon: Award }
]

// 成功事例
const successStories = [
  {
    company: "株式会社AI Vision",
    founder: "田中 健一",
    story: "CHEETAH BARで出会った投資家から5000万円の資金調達に成功",
    date: "2024年3月"
  },
  {
    company: "Green Tech Inc.",
    founder: "山本 美咲",
    story: "月例ピッチイベントがきっかけで大手企業との業務提携を実現",
    date: "2024年2月"
  },
  {
    company: "FinTech Solutions",
    founder: "佐々木 大輔",
    story: "マッチング機能で出会ったCTOと共同創業、シリーズA調達",
    date: "2024年1月"
  }
]

// パートナー企業（テキストのみで表示）
const partners = [
  { name: "開業チーター", type: "主催" },
  { name: "SBIベンチャーキャピタル", type: "VC" },
  { name: "Plug and Play Japan", type: "アクセラレーター" },
  { name: "三菱UFJ銀行", type: "金融機関" }
]

export default function AboutPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-gray-900 text-gray-900 dark:text-white pt-20 transition-colors duration-300 relative">
      {/* Creative geometric pattern background */}
      <div className="fixed inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{ y }}
        >
          <Image
            src={getOptimizedImageUrl("https://images.unsplash.com/photo-1497366216548-37526070297c", 3501, 80)}
            alt="Premium office space"
            fill
            className="object-cover scale-110"
            priority={true}
            placeholder="blur"
            blurDataURL={getBlurDataURL()}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        </motion.div>
        
        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ opacity }}
            className="text-center max-w-6xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8 relative"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 -m-4"
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-primary/30 via-transparent to-primary/30 blur-xl" />
              </motion.div>
              <Sparkles className="w-16 h-16 mx-auto text-primary mb-4 relative z-10" />
            </motion.div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-light mb-8 tracking-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                私たちについて
              </span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl lg:text-3xl text-gray-200 leading-relaxed max-w-4xl mx-auto font-light"
            >
              日本最速で成長する起業家たちが集まり、
              <br className="hidden md:inline" />
              次世代のビジネスリーダーを育成する
              <span className="text-primary font-normal">特別な空間</span>
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-12 flex justify-center gap-8"
            >
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <motion.div 
                  className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500 mb-2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                >
                  1,000+
                </motion.div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Members</div>
              </motion.div>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <motion.div 
                  className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500 mb-2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, type: "spring" }}
                >
                  95%
                </motion.div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Satisfaction</div>
              </motion.div>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <motion.div 
                  className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500 mb-2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0, type: "spring" }}
                >
                  500+
                </motion.div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Connections</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
          </div>
        </motion.div>
        
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              x: [0, 100, 0],
              y: [0, -100, 0]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              x: [0, -100, 0],
              y: [0, 100, 0]
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          />
        </div>
      </section>

      {/* Founder Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 dark:from-primary/10 dark:via-transparent dark:to-primary/20" />
        
        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, currentColor 35px, currentColor 70px)`
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "3rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto mb-6"
            />
            <h2 className="text-4xl md:text-5xl font-light mb-4">創業者メッセージ</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              CHEETAH BARが目指す、起業家コミュニティの未来
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-16 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
              className="lg:col-span-1"
            >
              <div className="relative group">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" 
                />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    width={400}
                    height={480}
                    className="object-cover w-full h-[480px]"
                    loading="eager"
                    placeholder="blur"
                    blurDataURL={getBlurDataURL()}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-2xl font-bold text-white mb-2">{founder.name}</h3>
                      <p className="text-gray-200">{founder.title}</p>
                    </motion.div>
                  </div>
                </div>
                
                <motion.div
                  className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
              className="lg:col-span-2 space-y-8"
            >
              <div className="space-y-6">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
                >
                  {founder.bio}
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">主な実績</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {founder.achievements.map((achievement, index) => {
                      const icons = [Trophy, Crown, TrendingUp, BookOpen]
                      const Icon = icons[index % icons.length]
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                        >
                          <Badge
                            className="w-full justify-center py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-2 border-primary/30 hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-default backdrop-blur-sm font-bold"
                          >
                            <Icon className="w-4 h-4 mr-2 text-primary" />
                            {achievement}
                          </Badge>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-4 pt-4"
                >
                  <a
                    href={founder.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href={founder.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 dark:from-primary/10 dark:via-primary/20 dark:to-primary/10 border-primary/20 p-8">
                  <Quote className="absolute top-4 left-4 w-8 h-8 text-primary/20" />
                  <Quote className="absolute bottom-4 right-4 w-8 h-8 text-primary/20 rotate-180" />
                  <p className="text-lg lg:text-xl italic text-gray-700 dark:text-gray-200 font-light leading-relaxed relative z-10">
                    起業家にとって最も重要なのは、質の高い人脈です。CHEETAH BARは、
                    偶然の出会いを必然に変える場所として生まれました。
                  </p>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - Elegant Display */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 dark:from-primary/10 dark:via-transparent dark:to-primary/20" />
        
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ type: "spring" }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300"
                >
                  <stat.icon className="w-8 h-8 text-primary" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                  className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black" />
        
        {/* Floating shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-96 h-96"
          >
            <div className="w-full h-full rounded-full border border-primary/10" />
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -left-20 w-96 h-96"
          >
            <div className="w-full h-full rounded-full border border-primary/10" />
          </motion.div>
        </div>
        
        {/* Floating shapes animation */}
        <motion.div
          animate={{ 
            y: [0, -50, 0],
            x: [0, 30, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 right-10 w-20 h-20 opacity-10"
        >
          <div className="w-full h-full bg-gradient-to-br from-primary to-orange-500 rounded-lg" />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 50, 0],
            x: [0, -30, 0],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-20 left-10 w-24 h-24 opacity-10"
        >
          <div className="w-full h-full bg-gradient-to-br from-primary to-purple-500 rounded-full" />
        </motion.div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20 text-center"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "3rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto mb-6"
            />
            <h2 className="text-4xl md:text-5xl font-light mb-4">運営チーム</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg">
              日本のトップ起業家たちが集結し、次世代の起業家を育成
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15, type: "spring" }}
              >
                <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 h-full group bg-white dark:bg-gray-900 relative">
                  <div className="absolute top-0 right-0 p-4 z-20">
                    <div className="w-12 h-12 rounded-full bg-primary/10 backdrop-blur-md flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  
                  <div className="relative h-[420px] overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-center group-hover:scale-110 transition-transform duration-1000"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={getBlurDataURL()}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    
                    {/* Elegant stats overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="space-y-4"
                      >
                        <div className="flex items-end justify-between">
                          <div>
                            <h3 className="text-3xl font-bold text-white mb-1">
                              {member.name}
                            </h3>
                            <p className="text-gray-200 text-sm">
                              {member.nameReading}
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-3">
                          {Object.entries(member.stats).map(([key, value], idx) => (
                            <motion.div
                              key={key}
                              initial={{ scale: 0, opacity: 0 }}
                              whileInView={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.5 + index * 0.1 + idx * 0.05 }}
                              className="bg-white/10 backdrop-blur-md rounded-lg p-3 text-center"
                            >
                              <div className="text-xl font-bold text-white">{value}</div>
                              <div className="text-xs text-gray-300">
                                {key === 'revenue' && '年商'}
                                {key === 'profit' && '営業利益'}
                                {key === 'stores' && '展開数'}
                                {key === 'growth' && '成長率'}
                                {key === 'funding' && '調達額'}
                                {key === 'buyout' && 'EXIT'}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="p-8 space-y-6">
                    <div>
                      <p className="text-sm font-semibold text-primary mb-3">{member.role}</p>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">KEY ACHIEVEMENTS</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {member.achievements.slice(0, 4).map((achievement, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + idx * 0.05 }}
                          >
                            <Badge
                              className="w-full justify-start text-xs py-2 px-3 bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:shadow-md transition-all duration-300 font-semibold backdrop-blur-sm"
                            >
                              {achievement}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="pt-4 border-t border-gray-100 dark:border-gray-800"
                    >
                      <Button variant="ghost" className="w-full group/btn">
                        <span className="mr-2">詳細を見る</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
        <motion.div
          className="absolute inset-0 opacity-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </motion.div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "3rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto mb-6"
            />
            <h2 className="text-4xl md:text-5xl font-light mb-4">成功事例</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg">
              CHEETAH BARから生まれた、数々のビジネスストーリー
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid gap-8">
              {successStories.map((story, index) => (
                <motion.div
                  key={story.company}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white dark:bg-gray-900">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative p-8 lg:p-10">
                      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                        <div className="flex-1 space-y-4">
                          <div className="flex flex-wrap items-center gap-4">
                            <motion.h3 
                              className="text-2xl font-bold text-gray-900 dark:text-white"
                              whileHover={{ scale: 1.02 }}
                            >
                              {story.company}
                            </motion.h3>
                            <Badge className="bg-white dark:bg-gray-800 text-primary border-2 border-primary/30 font-bold shadow-sm">
                              {story.date}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Building2 className="w-4 h-4 text-gray-400" />
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              創業者: {story.founder}
                            </p>
                          </div>
                          
                          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                            {story.story}
                          </p>
                        </div>
                        
                        <motion.div
                          whileHover={{ scale: 1.1, x: 5 }}
                          className="flex-shrink-0 relative"
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 w-12 h-12 bg-gradient-to-r from-primary to-orange-500 rounded-full opacity-20 blur-lg"
                          />
                          <motion.div
                            whileHover={{ scale: 1.1, x: 5 }}
                            className="relative w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300 border border-primary/20"
                          >
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                              <Rocket className="w-6 h-6 text-primary" />
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      </div>
                      
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent origin-left"
                      />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "3rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto mb-6"
            />
            <h2 className="text-4xl md:text-5xl font-light mb-4">メディア掲載</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg">
              各種メディアで紹介された実績
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {mediaLogos.map((media, index) => (
                <motion.div
                  key={media.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  className="group"
                >
                  <Card className="h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-primary/30 hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="p-6 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <h3 className="relative text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors duration-300 text-center">
                        {media.displayName}
                      </h3>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 dark:from-primary/10 dark:via-transparent dark:to-primary/20" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "3rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto mb-6"
            />
            <h2 className="text-4xl md:text-5xl font-light mb-4">パートナー</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg">
              起業家エコシステムを共に創る、信頼のパートナー企業
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring"
                  }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="h-full bg-white dark:bg-gray-900 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    <div className="p-8 text-center relative">
                      <motion.div
                        className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-2xl"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      
                      <Badge className="mb-4 bg-gradient-to-r from-primary/20 to-primary/10 text-primary border-0 px-4 py-1 font-medium">
                        {partner.type}
                      </Badge>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300">
                        {partner.name}
                      </h3>
                      
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                        className="mt-4 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                      />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </motion.div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8 relative"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 -m-3"
              >
                <div className="w-18 h-18 mx-auto rounded-full bg-gradient-to-r from-primary/30 via-transparent to-primary/30 blur-xl" />
              </motion.div>
              <Sparkles className="w-12 h-12 mx-auto text-primary relative z-10" />
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 text-white">
              起業家の成功を、
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                共に加速させましょう
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 font-light leading-relaxed">
              CHEETAH BARで、新しいビジネスの可能性を見つけてください
            </p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/membership">
                <Button 
                  size="lg" 
                  className="px-10 py-7 text-lg font-medium bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transform hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  会員になる
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-10 py-7 text-lg font-medium border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transform hover:scale-105 transition-all duration-300"
                >
                  お問い合わせ
                </Button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-16 flex justify-center gap-8 text-gray-400"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">24/7</div>
                <div className="text-sm">Access</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">Premium</div>
                <div className="text-sm">Network</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">Exclusive</div>
                <div className="text-sm">Events</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}