"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Award, Users, Zap, Target, Linkedin, Twitter } from "lucide-react"
import { getBlurDataURL, getOptimizedImageUrl } from "@/lib/image-utils"

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
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white pt-20 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={getOptimizedImageUrl("https://images.unsplash.com/photo-1497366216548-37526070297c", 3501, 80)}
            alt="Premium office space"
            fill
            className="object-cover opacity-20"
            priority={true}
            placeholder="blur"
            blurDataURL={getBlurDataURL()}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-5xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              私たちについて
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              日本最速で成長する起業家たちが集まり、<br className="hidden md:inline" />
              次世代のビジネスリーダーを育成する特別な空間
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-light text-center mb-4">創業者メッセージ</h2>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  width={300}
                  height={360}
                  className="object-cover w-full"
                  loading="eager"
                  placeholder="blur"
                  blurDataURL={getBlurDataURL()}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-xl font-bold text-white mb-1">{founder.name}</h3>
                  <p className="text-sm text-gray-200">{founder.title}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="prose prose-lg dark:prose-invert">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {founder.bio}
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold">主な実績</h4>
                <div className="flex flex-wrap gap-2">
                  {founder.achievements.map((achievement, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20"
                    >
                      {achievement}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href={founder.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href={founder.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>

              <Card className="bg-primary/5 dark:bg-primary/10 border-primary/20 p-6">
                <p className="text-lg italic text-gray-700 dark:text-gray-300">
                  "起業家にとって最も重要なのは、質の高い人脈です。CHEETAH BARは、
                  偶然の出会いを必然に変える場所として生まれました。"
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - Scrolling Banner */}
      <section className="py-8 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 dark:from-primary/20 dark:via-primary/10 dark:to-primary/20 overflow-hidden">
        <div className="relative">
          <motion.div
            animate={{
              x: [0, -50 + "%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
            className="flex"
          >
            {/* Duplicate the stats array for seamless loop */}
            {[...stats, ...stats].map((stat, index) => (
              <div
                key={`${stat.label}-${index}`}
                className="flex items-center gap-3 px-8 whitespace-nowrap"
              >
                <stat.icon className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold text-primary">{stat.number}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</span>
                {index < stats.length * 2 - 1 && (
                  <span className="text-gray-300 dark:text-gray-700 mx-4">•</span>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-light text-center mb-4">運営チーム</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8" />
            <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              日本のトップ起業家たちが集結し、次世代の起業家を育成
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 h-full group">
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={getBlurDataURL()}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Stats overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {Object.entries(member.stats).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-lg font-bold">{value}</div>
                            <div className="text-xs opacity-80">
                              {key === 'revenue' && '年商'}
                              {key === 'profit' && '営業利益'}
                              {key === 'stores' && '展開数'}
                              {key === 'growth' && '成長率'}
                              {key === 'funding' && '調達額'}
                              {key === 'buyout' && 'EXIT'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-1 flex items-baseline gap-2">
                        {member.name}
                        <span className="text-sm font-normal text-gray-500">
                          {member.nameReading}
                        </span>
                      </h3>
                      <p className="text-sm font-medium text-primary">{member.role}</p>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>
                    
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">主な実績</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {member.achievements.map((achievement, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="text-xs bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-0"
                          >
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50 dark:bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-light text-center mb-4">成功事例</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8" />
            <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              CHEETAH BARから生まれた、数々のビジネスストーリー
            </p>
          </motion.div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {successStories.map((story, index) => (
              <motion.div
                key={story.company}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-xl font-semibold">{story.company}</h3>
                        <Badge variant="outline" className="text-xs">
                          {story.date}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        創業者: {story.founder}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">{story.story}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-light text-center mb-4">メディア掲載</h2>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {mediaLogos.map((media, index) => (
              <motion.div
                key={media.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="text-center"
              >
                <Card className="p-6 h-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {media.displayName}
                  </h3>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gray-50 dark:bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-light text-center mb-4">パートナー</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8" />
            <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              起業家エコシステムを共に創る、信頼のパートナー企業
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <div className="text-center">
                    <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
                      {partner.type}
                    </Badge>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {partner.name}
                    </h3>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              起業家の成功を、共に加速させましょう
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              CHEETAH BARで、新しいビジネスの可能性を見つけてください
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/membership">
                <Button size="lg" className="px-8 py-6 text-lg">
                  会員になる
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
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