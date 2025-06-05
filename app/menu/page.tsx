"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Wine, Coffee, Beer, Martini, Utensils, Cake, Star, Clock, 
  Users, Leaf, Download, ChevronRight, Info
} from "lucide-react"
import { getOptimizedImageUrl, getBlurDataURL } from "@/lib/image-utils"

// 無料ドリンク
const freeDrinks = {
  soft: [
    { name: "コカ・コーラ", category: "コーラ各種" },
    { name: "ペプシコーラ", category: "コーラ各種" },
    { name: "ゼロカロリーコーラ", category: "コーラ各種" },
    { name: "オレンジジュース", category: "ジュース類" },
    { name: "グレープフルーツジュース", category: "ジュース類" },
    { name: "アップルジュース", category: "ジュース類" },
    { name: "トマトジュース", category: "ジュース類" },
    { name: "ウーロン茶", category: "お茶類" },
    { name: "緑茶", category: "お茶類" },
    { name: "ジャスミン茶", category: "お茶類" },
    { name: "ジンジャーエール", category: "その他" },
    { name: "トニックウォーター", category: "その他" },
    { name: "ソーダ", category: "その他" },
    { name: "コーヒー（ホット/アイス）", category: "コーヒー・紅茶" },
    { name: "紅茶（ホット/アイス）", category: "コーヒー・紅茶" }
  ],
  alcohol: [
    { name: "生ビール（アサヒスーパードライ）", category: "ビール" },
    { name: "瓶ビール各種", category: "ビール" },
    { name: "角ハイボール", category: "ハイボール" },
    { name: "ジムビームハイボール", category: "ハイボール" },
    { name: "赤ワイン（チリ産カベルネ・ソーヴィニヨン）", category: "ハウスワイン" },
    { name: "白ワイン（チリ産シャルドネ）", category: "ハウスワイン" }
  ]
}

// 有料ドリンクメニュー
const paidDrinks = {
  cocktails: [
    {
      name: "CHEETAH DASH",
      nameJp: "チーターダッシュ",
      price: "¥1,800",
      description: "ジン、ブルーキュラソー、レモン、ソーダ",
      ingredients: ["ジン", "ブルーキュラソー", "レモン", "ソーダ"],
      tags: ["人気", "爽快"],
      image: getOptimizedImageUrl("https://images.unsplash.com/photo-1536935338788-846bb9981813", 800)
    },
    {
      name: "STARTUP SPRITZ", 
      nameJp: "スタートアップスプリッツ",
      price: "¥1,600",
      description: "プロセッコ、アペロール、ソーダ",
      ingredients: ["プロセッコ", "アペロール", "ソーダ"],
      tags: ["華やか"],
      image: getOptimizedImageUrl("https://images.unsplash.com/photo-1551538827-9c037cb4f32a", 800)
    },
    {
      name: "INNOVATOR'S MANHATTAN",
      nameJp: "イノベーターズマンハッタン", 
      price: "¥2,200",
      description: "ライウイスキー、スイートベルモット、ビターズ",
      ingredients: ["ライウイスキー", "スイートベルモット", "ビターズ"],
      tags: ["クラシック"],
      image: getOptimizedImageUrl("https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b", 800)
    },
    {
      name: "UNICORN MOJITO",
      nameJp: "ユニコーンモヒート",
      price: "¥1,500",
      description: "ラム、ミント、ライム、エディブルフラワー",
      ingredients: ["ラム", "ミント", "ライム", "エディブルフラワー"],
      tags: ["限定", "インスタ映え"],
      image: getOptimizedImageUrl("https://images.unsplash.com/photo-1587888637140-849b25d80ef9", 800)
    }
  ],
  premium: [
    {
      category: "ウイスキー",
      items: [
        { name: "山崎 12年", price: "¥2,500" },
        { name: "白州", price: "¥1,800" },
        { name: "マッカラン 12年", price: "¥2,000" }
      ]
    },
    {
      category: "ジン",
      items: [
        { name: "ヘンドリックス", price: "¥1,200" },
        { name: "ボンベイサファイア", price: "¥1,000" }
      ]
    },
    {
      category: "ウォッカ",
      items: [
        { name: "グレイグース", price: "¥1,200" },
        { name: "ベルヴェデール", price: "¥1,200" }
      ]
    },
    {
      category: "テキーラ",
      items: [
        { name: "パトロン シルバー", price: "¥1,500" },
        { name: "ドンフリオ", price: "¥1,500" }
      ]
    },
    {
      category: "シャンパン・スパークリング",
      items: [
        { name: "モエ・エ・シャンドン", price: "¥12,000", unit: "ボトル" },
        { name: "ヴーヴ・クリコ", price: "¥15,000", unit: "ボトル" },
        { name: "ドン・ペリニヨン", price: "¥45,000", unit: "ボトル" },
        { name: "クリュッグ", price: "¥50,000", unit: "ボトル" }
      ]
    },
    {
      category: "ワインリスト",
      items: [
        { name: "常時20種類以上のセレクション", price: "¥5,000〜", unit: "ボトル" },
        { name: "ソムリエによる選定", price: "", unit: "" },
        { name: "月替わりおすすめワイン", price: "", unit: "" }
      ]
    }
  ]
}

// フードメニュー
const foodMenu = {
  starters: [
    {
      name: "CHEETAH チーズプラッター",
      price: "¥2,800",
      description: "3種のチーズ、ナッツ、ドライフルーツ",
      tags: ["人気", "シェア"],
      image: getOptimizedImageUrl("https://images.unsplash.com/photo-1486297678162-eb2a19b7c32d", 800)
    },
    {
      name: "起業家の枝豆",
      price: "¥800",
      description: "ガーリック風味の枝豆",
      tags: ["ベジタリアン"],
      image: getOptimizedImageUrl("https://images.unsplash.com/photo-1594736797933-d0501ba2fe65", 800)
    },
    {
      name: "スタートアップ・ナチョス",
      price: "¥1,200",
      description: "自家製サルサ、ワカモレ",
      tags: ["シェア"],
      image: getOptimizedImageUrl("https://images.unsplash.com/photo-1613514785940-daed07799d9b", 800)
    },
    {
      name: "ミックスナッツ",
      price: "¥800",
      description: "スモーク風味の特製ブレンド",
      tags: ["ベジタリアン"],
      image: getOptimizedImageUrl("https://images.unsplash.com/photo-1599599810694-b5b37304c041", 800)
    }
  ],
  tapas: [
    {
      name: "イノベーター・ブルスケッタ",
      price: "¥1,500",
      description: "3種の創作ブルスケッタ",
      tags: ["人気"],
      image: getOptimizedImageUrl("https://images.unsplash.com/photo-1572695157366-5e585ab2b69f", 800)
    },
    {
      name: "ピッチ・プロシュート",
      price: "¥1,800",
      description: "生ハムとメロン",
      tags: [],
      image: getOptimizedImageUrl("https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba", 800)
    },
    {
      name: "ベンチャー・春巻き",
      price: "¥1,400",
      description: "海老とアボカドの生春巻き",
      tags: ["ヘルシー"],
      image: getOptimizedImageUrl("https://images.unsplash.com/photo-1609501676725-7186f017a4b7", 800)
    },
    {
      name: "IPOポテト",
      price: "¥1,200",
      description: "トリュフ風味のフライドポテト",
      tags: ["人気"],
      image: getOptimizedImageUrl("https://images.unsplash.com/photo-1576107232684-1279f390859f", 800)
    }
  ],
  mains: [
    {
      name: "ユニコーン・ステーキ",
      price: "¥8,500",
      description: "和牛サーロイン150g",
      tags: ["プレミアム", "肉料理"],
      image: getOptimizedImageUrl("https://images.unsplash.com/photo-1558030006-450675393462", 800)
    },
    {
      name: "スケールアップ・パスタ",
      price: "¥2,200",
      description: "本日のシェフ特製パスタ",
      tags: ["日替わり"],
      image: getOptimizedImageUrl("https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9", 800)
    },
    {
      name: "ピボット・ピザ",
      price: "¥2,400",
      description: "日替わり創作ピザ",
      tags: ["日替わり"],
      image: getOptimizedImageUrl("https://images.unsplash.com/photo-1565299624946-b28f40a0ae38", 800)
    },
    {
      name: "エグジット・リゾット",
      price: "¥2,600",
      description: "シーフードリゾット",
      tags: ["魚介"],
      image: getOptimizedImageUrl("https://images.unsplash.com/photo-1633337474564-1d9478ca4e2e", 800)
    }
  ],
  desserts: [
    {
      name: "成功の甘み",
      price: "¥800",
      description: "本日のケーキ",
      tags: ["日替わり"],
      image: getOptimizedImageUrl("https://images.unsplash.com/photo-1565958011703-44f9829ba187", 800)
    },
    {
      name: "ネクストステージ・ジェラート",
      price: "¥1,000",
      description: "3種盛り合わせ",
      tags: ["人気"],
      image: getOptimizedImageUrl("https://images.unsplash.com/photo-1567206563064-6f60f40a2b57", 800)
    },
    {
      name: "ブレイクスルー・ブリュレ",
      price: "¥900",
      description: "クレームブリュレ",
      tags: ["人気"],
      image: getOptimizedImageUrl("https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc", 800)
    }
  ]
}

// パーティープラン
const partyPlans = [
  {
    name: "スタートアッププラン",
    price: "¥3,000",
    duration: "2時間",
    features: [
      "会員無料ドリンク飲み放題",
      "タパス3品",
      "最少催行人数: 10名"
    ],
    icon: Martini
  },
  {
    name: "スケールアッププラン",
    price: "¥5,000",
    duration: "2時間",
    features: [
      "プレミアムカクテル含む飲み放題",
      "タパス5品 + メイン1品",
      "最少催行人数: 15名"
    ],
    icon: Wine,
    popular: true
  },
  {
    name: "ユニコーンプラン",
    price: "¥8,000",
    duration: "3時間",
    features: [
      "シャンパン含む飲み放題",
      "フルコース料理",
      "専属スタッフ付き",
      "最少催行人数: 20名"
    ],
    icon: Star
  }
]

// 季節限定メニュー（例：春）
const seasonalItems = [
  {
    name: "桜カクテルシリーズ",
    price: "¥1,800〜",
    description: "桜の香りを楽しむ春限定カクテル",
    season: "春限定（3-5月）",
    image: getOptimizedImageUrl("https://images.unsplash.com/photo-1560526860-1f0e56046c85", 800)
  },
  {
    name: "春野菜のタパス",
    price: "¥1,500〜",
    description: "旬の春野菜を使った特別メニュー",
    season: "春限定（3-5月）",
    image: getOptimizedImageUrl("https://images.unsplash.com/photo-1540189549336-e6e99c3679fe", 800)
  }
]

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showDietaryInfo, setShowDietaryInfo] = useState(false)

  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white pt-20 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={getOptimizedImageUrl("https://images.unsplash.com/photo-1470337458703-46ad1756a187", 1920, 80)}
            alt="Premium bar setting"
            fill
            className="object-cover opacity-30"
            priority={true}
            loading="eager"
            placeholder="blur"
            blurDataURL={getBlurDataURL()}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 text-primary mb-4">
                <Martini className="w-8 h-8" />
                <span className="text-sm uppercase tracking-[0.3em] font-medium">Premium Selection</span>
                <Wine className="w-8 h-8" />
              </div>
            </motion.div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Menu & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-500">Drinks</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
              起業家の創造力を刺激する、こだわりのメニュー
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Badge className="px-4 py-2 text-sm bg-white/10 backdrop-blur border-white/20">
                <Users className="w-4 h-4 mr-2" />
                会員無料ドリンクあり
              </Badge>
              <Badge className="px-4 py-2 text-sm bg-white/10 backdrop-blur border-white/20">
                <Clock className="w-4 h-4 mr-2" />
                18:00 - 26:00
              </Badge>
              <Badge className="px-4 py-2 text-sm bg-white/10 backdrop-blur border-white/20">
                <Leaf className="w-4 h-4 mr-2" />
                ベジタリアン対応
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Member Free Drinks Section */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <Badge className="bg-gold text-black px-4 py-1">会員特典</Badge>
              <h2 className="text-3xl md:text-4xl font-light">無料ドリンク</h2>
            </div>
            <p className="text-center text-gray-600 dark:text-gray-400">
              会員の皆様は以下のドリンクが無料でお楽しみいただけます
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* ソフトドリンク */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Coffee className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold">ソフトドリンク</h3>
                </div>
                <div className="space-y-3">
                  {Object.entries(
                    freeDrinks.soft.reduce((acc, drink) => {
                      if (!acc[drink.category]) acc[drink.category] = []
                      acc[drink.category].push(drink.name)
                      return acc
                    }, {} as Record<string, string[]>)
                  ).map(([category, drinks]) => (
                    <div key={category}>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                        {category}
                      </p>
                      <div className="pl-4 space-y-1">
                        {drinks.map(drink => (
                          <p key={drink} className="text-sm">{drink}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* アルコール */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Beer className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold">アルコール</h3>
                </div>
                <div className="space-y-3">
                  {Object.entries(
                    freeDrinks.alcohol.reduce((acc, drink) => {
                      if (!acc[drink.category]) acc[drink.category] = []
                      acc[drink.category].push(drink.name)
                      return acc
                    }, {} as Record<string, string[]>)
                  ).map(([category, drinks]) => (
                    <div key={category}>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                        {category}
                      </p>
                      <div className="pl-4 space-y-1">
                        {drinks.map(drink => (
                          <p key={drink} className="text-sm">{drink}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Drinks & Food Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="cocktails" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 mb-12 bg-gray-100 dark:bg-gray-900">
              <TabsTrigger value="cocktails" className="flex items-center gap-2">
                <Martini className="w-4 h-4" />
                <span className="hidden sm:inline">カクテル</span>
              </TabsTrigger>
              <TabsTrigger value="premium" className="flex items-center gap-2">
                <Wine className="w-4 h-4" />
                <span className="hidden sm:inline">プレミアム</span>
              </TabsTrigger>
              <TabsTrigger value="food" className="flex items-center gap-2">
                <Utensils className="w-4 h-4" />
                <span className="hidden sm:inline">フード</span>
              </TabsTrigger>
              <TabsTrigger value="dessert" className="flex items-center gap-2">
                <Cake className="w-4 h-4" />
                <span className="hidden sm:inline">デザート</span>
              </TabsTrigger>
              <TabsTrigger value="party" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">パーティー</span>
              </TabsTrigger>
            </TabsList>

            {/* Cocktails Tab */}
            <TabsContent value="cocktails" className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-3xl font-light text-center mb-12">
                  シグネチャーカクテル
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {paidDrinks.cocktails.map((cocktail, index) => (
                    <motion.div
                      key={cocktail.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 h-full group">
                        <div className="aspect-square relative overflow-hidden">
                          <Image
                            src={cocktail.image}
                            alt={cocktail.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            priority={index < 4}
                            loading={index < 4 ? "eager" : "lazy"}
                            placeholder="blur"
                            blurDataURL={getBlurDataURL()}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute top-4 right-4 flex gap-2">
                            {cocktail.tags.map(tag => (
                              <Badge key={tag} className="bg-black/70 backdrop-blur text-white border-0">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-white text-sm font-medium">
                              {cocktail.nameJp}
                            </p>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="text-xl font-bold">{cocktail.name}</h4>
                            <span className="text-xl font-bold text-primary">
                              {cocktail.price}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                            {cocktail.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {cocktail.ingredients.map(ing => (
                              <Badge key={ing} variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-800">
                                {ing}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            {/* Premium Drinks Tab */}
            <TabsContent value="premium" className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {paidDrinks.premium.map((category, index) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <h3 className="text-2xl font-light mb-4">{category.category}</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.items.map(item => (
                        <Card key={item.name} className="p-4 hover:shadow-lg transition-shadow">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              {item.unit && (
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {item.unit}
                                </p>
                              )}
                            </div>
                            <span className="text-lg text-primary">{item.price}</span>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* Food Tab */}
            <TabsContent value="food" className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-12"
              >
                {/* Starters */}
                <div>
                  <h3 className="text-2xl font-light text-center mb-8">スターター</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {foodMenu.starters.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="overflow-hidden hover-lift h-full">
                          <div className="aspect-[4/3] relative">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              loading="lazy"
                              placeholder="blur"
                              blurDataURL={getBlurDataURL()}
                            />
                          </div>
                          <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-lg font-semibold">{item.name}</h4>
                              <span className="text-lg text-primary">{item.price}</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {item.description}
                            </p>
                            <div className="flex gap-2">
                              {item.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Tapas */}
                <div>
                  <h3 className="text-2xl font-light text-center mb-8">タパス・小皿料理</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {foodMenu.tapas.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="overflow-hidden hover-lift h-full">
                          <div className="aspect-[4/3] relative">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              loading="lazy"
                              placeholder="blur"
                              blurDataURL={getBlurDataURL()}
                            />
                          </div>
                          <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-lg font-semibold">{item.name}</h4>
                              <span className="text-lg text-primary">{item.price}</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {item.description}
                            </p>
                            <div className="flex gap-2">
                              {item.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Mains */}
                <div>
                  <h3 className="text-2xl font-light text-center mb-8">メイン</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {foodMenu.mains.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="overflow-hidden hover-lift h-full">
                          <div className="aspect-[4/3] relative">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                            {item.tags.includes("プレミアム") && (
                              <div className="absolute top-4 right-4">
                                <Badge className="bg-gold text-black">
                                  <Star className="w-3 h-3 mr-1" />
                                  Premium
                                </Badge>
                              </div>
                            )}
                          </div>
                          <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-lg font-semibold">{item.name}</h4>
                              <span className="text-lg text-primary">{item.price}</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {item.description}
                            </p>
                            <div className="flex gap-2">
                              {item.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            {/* Dessert Tab */}
            <TabsContent value="dessert" className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-light text-center mb-8">デザート</h3>
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {foodMenu.desserts.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden hover-lift h-full">
                        <div className="aspect-[4/3] relative">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL={getBlurDataURL()}
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-semibold">{item.name}</h4>
                            <span className="text-lg text-primary">{item.price}</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {item.description}
                          </p>
                          <div className="flex gap-2">
                            {item.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            {/* Party Plans Tab */}
            <TabsContent value="party" className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-light text-center mb-8">パーティープラン</h3>
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {partyPlans.map((plan, index) => {
                    const Icon = plan.icon
                    return (
                      <motion.div
                        key={plan.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className={`p-6 h-full ${plan.popular ? 'border-primary' : ''}`}>
                          {plan.popular && (
                            <Badge className="absolute -top-3 right-4 bg-primary text-white">
                              人気
                            </Badge>
                          )}
                          <div className="text-center mb-6">
                            <Icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                            <h4 className="text-xl font-semibold mb-2">{plan.name}</h4>
                            <div className="flex items-baseline justify-center gap-2">
                              <span className="text-3xl font-bold text-primary">
                                {plan.price}
                              </span>
                              <span className="text-gray-600 dark:text-gray-400">
                                / 人
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {plan.duration}
                            </p>
                          </div>
                          <ul className="space-y-2">
                            {plan.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <ChevronRight className="w-4 h-4 text-primary mt-0.5" />
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Seasonal Items */}
      <section className="py-16 bg-gradient-to-b from-transparent to-primary/5 dark:to-primary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-light text-center mb-4">
              季節限定メニュー
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400">
              期間限定の特別なメニューをお楽しみください
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {seasonalItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-primary/20 hover:border-primary/40 transition-colors">
                  <div className="aspect-video relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={getBlurDataURL()}
                    />
                    <Badge className="absolute top-4 left-4 bg-primary text-white">
                      {item.season}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-semibold">{item.name}</h4>
                      <span className="text-lg text-primary">{item.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent border-primary/20">
              <div className="flex items-start gap-4 mb-6">
                <Info className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">アレルギー・食事制限について</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ベジタリアン、ヴィーガン、グルテンフリー、ハラール対応可能です。
                      スタッフまでお気軽にご相談ください。
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">営業時間</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      月曜日〜土曜日: 18:00 - 26:00（L.O. 25:30）<br />
                      日曜日・祝日: 定休日
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">お支払い方法</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      現金、クレジットカード（VISA, Master, AMEX, JCB）、
                      電子マネー（PayPay, LINE Pay）がご利用いただけます。
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 justify-center pt-4 border-t border-gray-200 dark:border-gray-800">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  PDFメニューをダウンロード
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowDietaryInfo(!showDietaryInfo)}
                  className="flex items-center gap-2"
                >
                  <Leaf className="w-4 h-4" />
                  アレルギー情報を表示
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}