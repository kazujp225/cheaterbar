"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const menuCategories = {
  cocktails: {
    name: "Signature Cocktails",
    items: [
      {
        id: 1,
        title: "Cheetah Dash",
        subtitle: "チーターダッシュ",
        description: "ブルーキュラソーとジンの爽快スプリント",
        price: "¥1,800",
        image: "/placeholder.svg?height=400&width=600",
        tags: ["人気", "爽快"],
        ingredients: ["ジン", "ブルーキュラソー", "レモン", "ソーダ"],
      },
      {
        id: 2,
        title: "Neon Sprint",
        subtitle: "ネオンスプリント",
        description: "ウォッカベースの電光石火カクテル",
        price: "¥2,000",
        image: "/placeholder.svg?height=400&width=600",
        tags: ["NEW", "華やか"],
        ingredients: ["ウォッカ", "エルダーフラワー", "グレープフルーツ"],
      },
      {
        id: 3,
        title: "Founder's Whiskey",
        subtitle: "ファウンダーズウイスキー",
        description: "起業家魂を宿した特製ウイスキー",
        price: "¥2,500",
        image: "/placeholder.svg?height=400&width=600",
        tags: ["プレミアム"],
        ingredients: ["12年物ウイスキー", "ビターズ", "オレンジピール"],
      },
      {
        id: 4,
        title: "AI Elixir",
        subtitle: "AIエリクサー",
        description: "未来を予測する神秘のミクソロジー",
        price: "¥2,200",
        image: "/placeholder.svg?height=400&width=600",
        tags: ["限定", "人気"],
        ingredients: ["秘密のレシピ"],
      },
    ],
  },
  appetizers: {
    name: "Appetizers",
    items: [
      {
        id: 5,
        title: "Tech Tapas Platter",
        subtitle: "テックタパスプラッター",
        description: "シェアして楽しむ創業者のためのタパス盛り合わせ",
        price: "¥3,500",
        image: "/placeholder.svg?height=400&width=600",
        tags: ["シェア", "人気"],
        ingredients: ["チーズ各種", "生ハム", "オリーブ", "ナッツ"],
      },
      {
        id: 6,
        title: "Blockchain Bruschetta",
        subtitle: "ブロックチェーンブルスケッタ",
        description: "層を重ねた革新的なブルスケッタ",
        price: "¥1,200",
        image: "/placeholder.svg?height=400&width=600",
        tags: ["ベジタリアン"],
        ingredients: ["トマト", "バジル", "モッツァレラ", "バゲット"],
      },
      {
        id: 7,
        title: "Startup Sliders",
        subtitle: "スタートアップスライダー",
        description: "ミニバーガー3種の盛り合わせ",
        price: "¥2,800",
        image: "/placeholder.svg?height=400&width=600",
        tags: ["肉料理"],
        ingredients: ["和牛", "チキン", "ポーク"],
      },
      {
        id: 8,
        title: "Data-Driven Dumplings",
        subtitle: "データドリブン餃子",
        description: "5種の特製餃子セット",
        price: "¥1,800",
        image: "/placeholder.svg?height=400&width=600",
        tags: ["アジアン"],
        ingredients: ["豚肉", "エビ", "野菜"],
      },
    ],
  },
  mains: {
    name: "Main Dishes",
    items: [
      {
        id: 9,
        title: "Unicorn Steak",
        subtitle: "ユニコーンステーキ",
        description: "希少な和牛を使用した極上ステーキ",
        price: "¥8,500",
        image: "/placeholder.svg?height=400&width=600",
        tags: ["プレミアム", "肉料理"],
        ingredients: ["A5和牛", "季節の野菜", "特製ソース"],
      },
      {
        id: 10,
        title: "Algorithm Pasta",
        subtitle: "アルゴリズムパスタ",
        description: "完璧に計算されたクリームパスタ",
        price: "¥2,200",
        image: "/placeholder.svg?height=400&width=600",
        tags: ["パスタ"],
        ingredients: ["生パスタ", "トリュフ", "パルメザン"],
      },
      {
        id: 11,
        title: "Venture Vegan Bowl",
        subtitle: "ベンチャービーガンボウル",
        description: "革新的なプラントベースの一皿",
        price: "¥2,000",
        image: "/placeholder.svg?height=400&width=600",
        tags: ["ビーガン", "ヘルシー"],
        ingredients: ["季節野菜", "キヌア", "アボカド", "豆腐"],
      },
      {
        id: 12,
        title: "IPO Seafood Platter",
        subtitle: "IPOシーフードプラッター",
        description: "新鮮な海の幸の豪華盛り合わせ",
        price: "¥6,800",
        image: "/placeholder.svg?height=400&width=600",
        tags: ["シーフード", "シェア"],
        ingredients: ["オイスター", "海老", "ホタテ", "本日の鮮魚"],
      },
    ],
  },
  desserts: {
    name: "Desserts",
    items: [
      {
        id: 13,
        title: "Cloud Computing Cake",
        subtitle: "クラウドコンピューティングケーキ",
        description: "ふわふわ雲のようなチーズケーキ",
        price: "¥1,200",
        image: "/placeholder.svg?height=400&width=600",
        tags: ["人気", "スイーツ"],
        ingredients: ["クリームチーズ", "ベリーソース"],
      },
      {
        id: 14,
        title: "Binary Brownie",
        subtitle: "バイナリーブラウニー",
        description: "0と1で構成された濃厚ブラウニー",
        price: "¥1,000",
        image: "/placeholder.svg?height=400&width=600",
        tags: ["チョコレート"],
        ingredients: ["ダークチョコレート", "バニラアイス"],
      },
    ],
  },
}

export default function MenuGrid() {
  const [selectedCategory, setSelectedCategory] = useState("cocktails")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  
  const allTags = Array.from(
    new Set(
      Object.values(menuCategories).flatMap(category =>
        category.items.flatMap(item => item.tags)
      )
    )
  )
  
  const filteredItems = menuCategories[selectedCategory as keyof typeof menuCategories].items.filter(
    item => selectedTags.length === 0 || item.tags.some(tag => selectedTags.includes(tag))
  )
  
  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  return (
    <section id="menu" className="relative py-24 overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white dark:from-black dark:via-secondary dark:to-black" />
      <div className="absolute inset-0 gradient-radial opacity-30" />
      
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-thin tracking-[0.2em] text-gray-900 dark:text-white uppercase">
            Our Menu
          </h2>
          <p className="jp text-xl md:text-2xl text-primary/80 font-light mb-2">メニュー</p>
          <p className="mx-auto max-w-3xl text-lg md:text-xl text-gray-600 dark:text-gray-400 font-light leading-relaxed">
            起業家の創造力を刺激する、厳選された料理とドリンクをご用意しています
          </p>
        </motion.div>

        {/* Category Tabs */}
        <Tabs defaultValue="cocktails" className="mb-12" onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-2 lg:grid-cols-4 bg-white/50 dark:bg-black/50 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-1 rounded-xl">
            {Object.entries(menuCategories).map(([key, category]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="data-[state=active]:bg-primary data-[state=active]:text-white text-gray-600 dark:text-gray-400 transition-all duration-300"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tag Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 justify-center mb-8"
          >
            {allTags.map(tag => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedTags.includes(tag)
                    ? "bg-primary text-white border-primary"
                    : "border-gray-300 dark:border-white/30 text-gray-600 dark:text-gray-400 hover:border-primary hover:text-primary"
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
            {selectedTags.length > 0 && (
              <Badge
                variant="outline"
                className="cursor-pointer border-ruby text-ruby hover:bg-ruby hover:text-white"
                onClick={() => setSelectedTags([])}
              >
                クリア
              </Badge>
            )}
          </motion.div>

          {/* Menu Items Grid */}
          {Object.entries(menuCategories).map(([key, category]) => (
            <TabsContent key={key} value={key} className="mt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group relative overflow-hidden rounded-2xl bg-white dark:bg-black/50 backdrop-blur-md border border-gray-200 dark:border-white/10 hover-lift"
                    >
                      {/* Premium tag */}
                      {item.tags.includes("プレミアム") && (
                        <div className="absolute top-4 right-4 z-20">
                          <Badge className="bg-gold text-black font-medium">
                            Premium
                          </Badge>
                        </div>
                      )}
                      
                      {/* Image Container */}
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                          placeholder="blur"
                          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMwQTBBMEEiLz48L3N2Zz4="
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      
                      {/* Content */}
                      <div className="p-6 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-500 jp">{item.subtitle}</p>
                          </div>
                          <span className="text-lg font-light text-primary">
                            {item.price}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {item.description}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {item.tags.filter(tag => tag !== "プレミアム").map(tag => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        {/* Hover Details */}
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          whileHover={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 border-t border-gray-200 dark:border-white/10">
                            <p className="text-xs text-gray-600 dark:text-gray-500 mb-2">材料:</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {item.ingredients.join(", ")}
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            アレルギーや食事制限がある方は、スタッフまでお申し付けください
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg rounded-xl shadow-premium transition-all duration-300 hover:scale-105"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            予約する
          </Button>
        </motion.div>
      </div>
    </section>
  )
}