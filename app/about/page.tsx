"use client"

import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Zap, Target, Award } from "lucide-react"
import { getBlurDataURL, getOptimizedImageUrl } from "@/lib/image-utils"
import { motion } from "framer-motion"
import "./about.css"

// Use motion.div directly
const MotionDiv = motion.div

// Simple performance monitor for development
const PerformanceMonitor = () => {
  if (process.env.NODE_ENV !== 'development') return null
  return (
    <div className="fixed top-0 right-0 bg-black text-white text-xs p-2 z-50">
      {typeof window !== 'undefined' && performance.now().toFixed(0)}ms
    </div>
  )
}

// Skeleton loader for advisor cards
const AdvisorCardSkeleton = () => (
  <Card className="h-full animate-pulse">
    <div className="p-6">
      <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" />
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-1/2" />
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
      </div>
    </div>
  </Card>
)

// アドバイザー情報
const advisors = [
  {
    name: "林 尚弘",
    nameEn: "Naohiro Hayashi",
    role: "令和の虎二代目主幹",
    company: "FCチャンネル",
    image: getOptimizedImageUrl("https://images.unsplash.com/photo-1560250097-0b93528c311a", 400, 75),
    bio: "武田塾元塾長。YouTubeチャンネル『令和の虎』2代目主宰",
    fullBio: "日本の実業家。予備校「武田塾」の元塾長・元A.ver社長。YouTubeチャンネル『令和の虎』の2代目主宰を務める。現在は、フランチャイズ展開支援を行う株式会社FCチャンネルを設立し、代表取締役社長を務めている。",
    expertise: ["フランチャイズ", "教育事業", "YouTube"]
  },
  {
    name: "山崎 俊",
    nameEn: "Shun Yamazaki",
    role: "代表取締役社長",
    company: "株式会社Wiz",
    image: getOptimizedImageUrl("https://images.unsplash.com/photo-1519085360753-af0119f7cbe7", 400, 75),
    bio: "30歳で独立。早稲田大卒、元最年少執行役員",
    fullBio: "早稲田大学理工学部卒業後、大手通信商社に部長職で入社。最年少で執行役員に就任する。2012年、同社を退社し、「ヒトにフォーカスした仲間を集める企業を作りたい」そんな思いから30歳で独立し株式会社Wizを設立。",
    expertise: ["通信事業", "起業支援", "組織構築"]
  },
  {
    name: "岸 博幸",
    nameEn: "Hiroyuki Kishi",
    role: "大学院教授",
    company: "慶應義塾大学",
    image: getOptimizedImageUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", 400, 75),
    bio: "元経産省。小泉政権補佐官、MBA取得",
    fullBio: "一橋大学卒業後、経済産業省入省。コロンビア大学経営大学院にてMBAを取得。小泉政権では竹中平蔵大臣の補佐官・政務秘書官、菅政権では内閣官房参与として構造改革に携わる。現在はテレビや講演会で幅広く活躍中。",
    expertise: ["経済政策", "構造改革", "ビジネス戦略"]
  },
  {
    name: "清水 望",
    nameEn: "Nozomu Shimizu",
    role: "元上場企業社長",
    company: "プロポーカープレイヤー",
    image: getOptimizedImageUrl("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e", 400, 75),
    bio: "26歳で起業、上場達成。日本ポーカー年間王者",
    fullBio: "18歳で光通信にアルバイト入社し営業成績で頭角を現す。26歳でラストワンマイルを設立し、2021年に上場。2022年に社長退任後、ポーカーに挑戦。2023年に日本プレイヤーオブザイヤー受賞、現在はプロポーカープレイヤーとして活躍中。",
    expertise: ["営業戦略", "IPO", "リスク管理"]
  },
  {
    name: "大野 修平",
    nameEn: "Shuhei Ohno",
    role: "公認会計士・税理士",
    company: "セブンセンス税理士法人",
    image: getOptimizedImageUrl("https://images.unsplash.com/photo-1506794778202-cad84cf45f1d", 400, 75),
    bio: "元トーマツ。金融機関監査・経営コンサル専門",
    fullBio: "2008年有限責任監査法人トーマツ入所、フィナンシャル・インダストリー・グループにて金融機関の監査を担当する。現在は、経営・会計コンサルを手掛けるセブンセンス税理士法人に所属し、公認会計士・税理士・ディレクターとしてご活躍中。",
    expertise: ["会計監査", "税務相談", "経営コンサル"]
  },
  {
    name: "福井 彰次",
    nameEn: "Syoji Fukui",
    role: "代表取締役",
    company: "補助金ポータル",
    image: getOptimizedImageUrl("https://images.unsplash.com/photo-1500648767791-00dcc994a43e", 400, 75),
    bio: "月間100万人利用、国内最大級の補助金プラットフォーム",
    fullBio: "月間利用者100万人。国内最大級の補助金・助成金のプラットフォーム「補助金ポータル」を運営。補助金・助成金の概要や、申請方法など国と企業を繋ぐというミッションのもと事業を展開して会員数も30,000名を超えている。",
    expertise: ["補助金", "助成金", "資金調達"]
  },
  {
    name: "吉岡 諒",
    nameEn: "Ryo Yoshioka",
    role: "COO",
    company: "ウィルゲート",
    image: getOptimizedImageUrl("https://images.unsplash.com/photo-1507591064344-4c6ce005b128", 400, 75),
    bio: "慶應卒、共同創業。3000社以上のWebマーケ支援",
    fullBio: "1986年岡山生まれ。慶應義塾大学経済学部卒業後、2006年にウィルゲートを共同設立。3,000社以上のWebマーケ支援に携わり、SEOツールやM&A支援など複数事業を展開。現在はCOOとして経営とM&A事業を統括。",
    expertise: ["Webマーケ", "SEO", "M&A"]
  },
  {
    name: "青山 徹",
    nameEn: "Toru Aoyama",
    role: "事業責任者",
    company: "元マネーフォワード",
    image: getOptimizedImageUrl("https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e", 400, 75),
    bio: "元MF福岡支社長。パートナー事業統括",
    fullBio: "立教大学経営学部卒業後、通信事業会社でICTソリューション事業に従事。2015年にマネーフォワードに参画し、翌年から福岡支社長として拠点を立ち上げ。2018年よりパートナービジネス事業の責任者として戦略立案・実行を対応。",
    expertise: ["事業開発", "パートナー戦略", "拠点立ち上げ"]
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

// Create inline components to avoid unnecessary dynamic imports
const StatsSection = ({ stats }: { stats: any[] }) => (
  <section className="py-8 md:py-12 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <MotionDiv
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary mx-auto mb-2" />
              <div className="text-xl md:text-2xl font-bold mb-0.5">{stat.number}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
            </MotionDiv>
          )
        })}
      </div>
    </div>
  </section>
)

export default function AboutPage() {

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white pt-20 transition-colors duration-300" suppressHydrationWarning>
      {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full mb-4">
                <Award className="w-3 h-3 text-primary" />
                <span className="text-xs font-medium text-primary">PREMIUM ADVISORS</span>
              </div>
              
              {/* Main Title */}
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                超一流のメンター陣
              </h1>
              
              {/* Sub Title */}
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-6 font-light leading-relaxed">
                令和の虎、上場企業創業者、大学教授など<br />
                <span className="font-semibold text-primary">総勢{advisors.length}名</span>のプロフェッショナルがあなたを支援
              </p>
              
              {/* Quick Stats */}
              <div className="flex justify-center gap-6 md:gap-12 mb-6">
                <MotionDiv
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-0.5">100+</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">年の経営経験</p>
                </MotionDiv>
                <MotionDiv
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-0.5">50+</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">業界分野</p>
                </MotionDiv>
                <MotionDiv
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-0.5">1000+</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">支援実績</p>
                </MotionDiv>
              </div>
              
              {/* CTA */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button size="default" className="group">
                  無料相談を予約
                  <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="default" variant="outline">
                  メンター一覧を見る
                </Button>
              </MotionDiv>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Advisors Section */}
      <section className="py-8 md:py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Desktop: Compact Grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {advisors.map((advisor, index) => (
              <MotionDiv
                key={advisor.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.03 }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1">
                  <div className="p-4">
                    {/* Header with Photo and Basic Info */}
                    <div className="flex items-start gap-2 mb-2">
                      <div className="w-14 h-14 relative flex-shrink-0 overflow-hidden rounded-full ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-primary/40 transition-all">
                        <Image
                          src={advisor.image}
                          alt={advisor.name}
                          fill
                          className="object-cover"
                          loading={index < 8 ? "eager" : "lazy"}
                          placeholder="blur"
                          blurDataURL={getBlurDataURL()}
                          sizes="56px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm mb-0.5 truncate">
                          {advisor.name}
                        </h3>
                        <p className="text-xs text-primary font-medium truncate">
                          {advisor.role}
                        </p>
                        {advisor.company && (
                          <p className="text-xs text-gray-500 truncate">
                            {advisor.company}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Short Bio */}
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3 mb-3">
                      {advisor.bio}
                    </p>
                    
                    {/* Expertise Tags */}
                    {advisor.expertise && (
                      <div className="flex flex-wrap gap-1">
                        {advisor.expertise.slice(0, 2).map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className="text-[10px] px-2 py-0.5 bg-primary/10 border-0">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                  </div>
                  
                </Card>
              </MotionDiv>
            ))}
          </div>
          
          {/* View All Button */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-6"
          >
            <Button size="sm" variant="outline" className="group">
              すべてのメンターを見る
              <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </MotionDiv>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection stats={stats} />

      {/* Benefits Section */}
      <section className="py-8 md:py-12 bg-gray-50 dark:bg-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6 md:mb-8"
          >
            <h2 className="text-xl md:text-3xl font-bold mb-2">コミュニティ特典</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              開業チーター会員だけの<br className="md:hidden" />
              特別なサポートで、<br className="md:hidden" />
              あなたのビジネスを加速させます
            </p>
          </MotionDiv>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {/* 特典1 */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-4 h-full">
                <div className="text-2xl font-bold text-primary mb-2">1</div>
                <h3 className="text-base font-bold mb-2">「令和の虎」林 尚弘 さんが直接応援！</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">実践的な知見を学べる特別イベントを開催！</p>
                <ul className="space-y-1.5 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 text-xs">•</span>
                    <div>
                      <span className="font-semibold">オフライン交流会</span>
                      <span className="text-gray-500 block text-[10px]">定期的に実施されるオフ会に参加！</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <div>
                      <span className="font-semibold">プロモーション</span>
                      <span className="text-gray-500 block text-[10px]">YoutubeやXで事業や店舗をPR！</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <div>
                      <span className="font-semibold">質問BOX</span>
                      <span className="text-gray-500 block text-[10px]">経営のお悩み・質問に回答！</span>
                    </div>
                  </li>
                </ul>
              </Card>
            </MotionDiv>

            {/* 特典2 */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="p-4 h-full">
                <div className="text-2xl font-bold text-primary mb-2">2</div>
                <h3 className="text-base font-bold mb-2">豊富な開業支援実績を持つWizが応援！</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">登記費用0円や専用コンシェルジュのサポート付き！</p>
                <ul className="space-y-1.5 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 text-xs">•</span>
                    <div>
                      <span className="font-semibold">会員限定価格</span>
                      <span className="text-gray-500 block text-[10px]">開業に必要なサービスが会員価格で導入！</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <div>
                      <span className="font-semibold">登記費用最大０円</span>
                      <span className="text-gray-500 block text-[10px]">法人登記手続きもサポート可能！</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <div>
                      <span className="font-semibold">専用コンシェルジュ</span>
                      <span className="text-gray-500 block text-[10px]">ご提案から導入後のサポートまで対応！</span>
                    </div>
                  </li>
                </ul>
              </Card>
            </MotionDiv>

            {/* 特典3 */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-4 h-full">
                <div className="text-2xl font-bold text-primary mb-2">3</div>
                <h3 className="text-base font-bold mb-2">同期の仲間と切磋琢磨し応援し合おう！</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">開業の悩みを共有し、仲間と一緒に乗り越えよう！</p>
                <ul className="space-y-1.5 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 text-xs">•</span>
                    <div>
                      <span className="font-semibold">同期コミュニティ</span>
                      <span className="text-gray-500 block text-[10px]">会員限定Facebookグループで雑談や壁打ち！</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <div>
                      <span className="font-semibold">同期限定イベント</span>
                      <span className="text-gray-500 block text-[10px]">交流会や事業紹介で互いを高め合おう！</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <div>
                      <span className="font-semibold">CHEETAH BAR</span>
                      <span className="text-gray-500 block text-[10px]">麻布十番の『CHEETAH BAR』で交流できる！</span>
                    </div>
                  </li>
                </ul>
              </Card>
            </MotionDiv>

            {/* 特典4 */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-4 h-full">
                <div className="text-2xl font-bold text-primary mb-2">4</div>
                <h3 className="text-base font-bold mb-2">プロフェッショナルなサポーター陣が応援！</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">開業や経営に関する疑問やお悩みを、専門家に相談できる！</p>
                <ul className="space-y-1.5 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 text-xs">•</span>
                    <div>
                      <span className="font-semibold">経営相談</span>
                      <span className="text-gray-500 block text-[10px]">お悩みにあわせて各分野ごとのプロがピンポイントで解決！</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <div>
                      <span className="font-semibold">資金繰り</span>
                      <span className="text-gray-500 block text-[10px]">あなたにぴったりの士業や補助金助成金などをご紹介！</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <div>
                      <span className="font-semibold">コスト削減</span>
                      <span className="text-gray-500 block text-[10px]">経営で必ず発生する各コストを定期的に見直し可能！</span>
                    </div>
                  </li>
                </ul>
              </Card>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Member Plans Section */}
      <section className="py-8 md:py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-5xl">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6 md:mb-8"
          >
            <h2 className="text-xl md:text-3xl font-bold mb-2">会員プラン</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              あなたも、開業仲間と共に<br className="md:hidden" />
              成功への第一歩を踏み出しませんか？
            </p>
          </MotionDiv>

          <div className="max-w-5xl mx-auto">
            {/* Mobile: Stacked cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* ビギナー会員 */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-3 md:p-4 h-full">
                  <div className="text-center mb-3 md:mb-4">
                    <h3 className="text-base md:text-lg font-bold mb-1">ビギナー会員</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 md:mb-3">開業前の情報収集層</p>
                    <div className="text-xl md:text-2xl font-bold text-primary mb-0.5">0円</div>
                    <p className="text-xs text-gray-500">月額</p>
                  </div>
                  <ul className="space-y-1.5 md:space-y-2 text-xs">
                    <li className="flex items-center gap-2">
                      <span className="text-primary flex-shrink-0 text-xs">✓</span>
                      <span>コミュニティへの参加</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary flex-shrink-0">✓</span>
                      <span>基本的な開業情報の閲覧</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary flex-shrink-0">✓</span>
                      <span>イベント情報の受け取り</span>
                    </li>
                  </ul>
                </Card>
              </MotionDiv>

              {/* スタートアップ会員（開業1年目） */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="p-3 md:p-4 h-full border-2 border-primary bg-primary/5 dark:bg-primary/10 relative">
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs md:text-sm">おすすめ</Badge>
                  <div className="text-center mb-4 md:mb-6">
                    <h3 className="text-lg md:text-xl font-bold mb-2">スタートアップ会員</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 md:mb-3">開業1年目</p>
                    <div className="text-xl md:text-2xl font-bold text-primary mb-0.5">0円</div>
                    <p className="text-xs text-gray-500">月額</p>
                  </div>
                  <ul className="space-y-2 md:space-y-3 text-xs md:text-sm">
                    <li className="flex items-center gap-2">
                      <span className="text-primary font-bold flex-shrink-0 text-xs">✓</span>
                      <span>ビギナー会員の全ての特典</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary font-bold flex-shrink-0 text-xs">✓</span>
                      <span>専門家への相談</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary font-bold flex-shrink-0 text-xs">✓</span>
                      <span>各種サービスの会員価格</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary font-bold flex-shrink-0 text-xs">✓</span>
                      <span>オフラインイベントへの参加</span>
                    </li>
                  </ul>
                </Card>
              </MotionDiv>

              {/* スタートアップ会員（開業2年目以降） */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="p-3 md:p-4 h-full">
                  <div className="text-center mb-3 md:mb-4">
                    <h3 className="text-base md:text-lg font-bold mb-1">スタートアップ会員</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 md:mb-3">開業2年目以降</p>
                    <div className="text-xl md:text-2xl font-bold mb-0.5">30,000円</div>
                    <p className="text-xs text-gray-500">月額（税別）</p>
                  </div>
                  <ul className="space-y-1.5 md:space-y-2 text-xs">
                    <li className="flex items-center gap-2">
                      <span className="text-primary flex-shrink-0 text-xs">✓</span>
                      <span>開業1年目の全ての特典</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary flex-shrink-0">✓</span>
                      <span>優先的なサポート</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary flex-shrink-0">✓</span>
                      <span>特別イベントへの招待</span>
                    </li>
                  </ul>
                </Card>
              </MotionDiv>
            </div>

            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-6 md:mt-8 text-center px-4"
            >
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                ※チーター会員にご加入いただくにあたり、<br className="md:hidden" />
                スポンサー企業の商品・サービスの導入について、<br className="md:hidden" />
                前向きにご検討をお願いしております。
              </p>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Join Flow Section */}
      <section className="py-8 md:py-12 bg-gray-50 dark:bg-black">
        <div className="container mx-auto px-4 max-w-4xl">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6 md:mb-8"
          >
            <h2 className="text-xl md:text-3xl font-bold mb-2">参加方法</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              会員限定の特典や、<br className="md:hidden" />
              登記費用0円サポートなどを活用しながら、<br className="md:hidden" />
              スムーズに開業準備を進めましょう。
            </p>
          </MotionDiv>

          <div className="max-w-4xl mx-auto">
            {/* Mobile: Vertical flow */}
            <div className="md:hidden space-y-4">
              {/* Step 1 */}
              <MotionDiv
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-white">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold mb-1">問い合わせ</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    開業の疑問を専門コンシェルジュがサポート！
                  </p>
                </div>
              </MotionDiv>
              
              {/* Arrow */}
              <div className="flex justify-center py-2">
                <ArrowRight className="w-5 h-5 text-gray-400 rotate-90" />
              </div>

              {/* Step 2 */}
              <MotionDiv
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-white">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold mb-1">導入・参加</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    チーターのコミュニティに参加！お得なサービスを導入して開業準備！
                  </p>
                </div>
              </MotionDiv>
              
              {/* Arrow */}
              <div className="flex justify-center py-2">
                <ArrowRight className="w-5 h-5 text-gray-400 rotate-90" />
              </div>

              {/* Step 3 */}
              <MotionDiv
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-white">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold mb-1">相談・交流</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Facebookグループで仲間や専門家と交流開始！
                  </p>
                </div>
              </MotionDiv>
            </div>

            {/* Desktop: Horizontal cards */}
            <div className="hidden md:grid md:grid-cols-3 gap-4">
              {/* Step 1 */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <Card className="p-6 text-center h-full">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">問い合わせ</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    開業の疑問を専門コンシェルジュがサポート！
                  </p>
                </Card>
                {/* Arrow for desktop */}
                <div className="absolute top-1/2 -right-6 -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-primary" />
                </div>
              </MotionDiv>

              {/* Step 2 */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative"
              >
                <Card className="p-6 text-center h-full">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">導入・参加</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    チーターのコミュニティに参加！お得なサービスを導入して開業準備！
                  </p>
                </Card>
                {/* Arrow for desktop */}
                <div className="absolute top-1/2 -right-6 -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-primary" />
                </div>
              </MotionDiv>

              {/* Step 3 */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="p-6 text-center h-full">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">相談・交流</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Facebookグループで仲間や専門家と交流開始！
                  </p>
                </Card>
              </MotionDiv>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <MotionDiv
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-light mb-4">
              開業の成功を、共に加速させましょう
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6">
              超チート級のメンター陣と仲間が、あなたの挑戦を全力サポート
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="default" className="px-6">
                  問い合わせる
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/membership">
                <Button size="default" variant="outline" className="px-6">
                  会員プランを見る
                </Button>
              </Link>
            </div>
          </MotionDiv>
        </div>
      </section>
    </main>
  )
}