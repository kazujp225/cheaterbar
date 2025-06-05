"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { 
  MapPin, 
  Train, 
  Clock, 
  Users, 
  Navigation,
  Phone,
  ExternalLink,
  Building,
  Calendar,
  Star,
  ChevronRight,
  Car,
  Info
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const accessInfo = {
  address: "東京都港区麻布十番１丁目５−１０",
  building: "第２石原ビル 別館 1階",
  capacity: "15名",
  stations: [
    {
      name: "麻布十番駅",
      lines: ["東京メトロ南北線", "都営大江戸線"],
      walkTime: "3分",
      exits: ["4番出口", "5a出口"]
    },
    {
      name: "赤羽橋駅",
      lines: ["都営大江戸線"],
      walkTime: "8分",
      exits: ["赤羽橋口"]
    }
  ],
  landmarks: [
    "東京タワー",
    "麻布十番商店街",
    "善福寺",
    "パティオ十番"
  ]
}

const openingHours = [
  { day: "月曜日", hours: "18:00 - 26:00" },
  { day: "火曜日", hours: "18:00 - 26:00" },
  { day: "水曜日", hours: "18:00 - 26:00" },
  { day: "木曜日", hours: "18:00 - 26:00" },
  { day: "金曜日", hours: "18:00 - 26:00" },
  { day: "土曜日", hours: "18:00 - 26:00" },
  { day: "日曜日", hours: "定休日", closed: true },
]

export default function AccessPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section - Simplified */}
      <section className="relative pt-32 pb-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              アクセス
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
              麻布十番駅から徒歩3分
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              東京タワーを望む、隠れ家的空間
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 h-full">
                <CardContent className="p-6 text-center">
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">住所</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">港区麻布十番</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 h-full">
                <CardContent className="p-6 text-center">
                  <Train className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">最寄駅</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">麻布十番駅 徒歩3分</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 h-full">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">営業時間</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">18:00 - 26:00</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 h-full">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">定員</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">15名（完全予約制）</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {/* Left Column - Detailed Address */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24">
                <Card className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">所在地</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">住所</p>
                        <p className="text-lg font-medium text-gray-900 dark:text-white">
                          {accessInfo.address}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          {accessInfo.building}
                        </p>
                      </div>

                      <Separator className="bg-gray-200 dark:bg-gray-700" />

                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">収容人数</p>
                        <p className="text-lg font-medium text-gray-900 dark:text-white">
                          {accessInfo.capacity}
                        </p>
                      </div>

                      <Separator className="bg-gray-200 dark:bg-gray-700" />

                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">電話番号</p>
                        <p className="text-lg font-medium text-gray-900 dark:text-white">
                          03-1234-5678
                        </p>
                      </div>

                      <Button 
                        className="w-full bg-primary hover:bg-primary/90 text-white"
                        onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(accessInfo.address + " " + accessInfo.building)}`, '_blank')}
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        Google Mapsで開く
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Middle Column - Transportation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">交通アクセス</h2>
              
              <div className="space-y-6">
                {accessInfo.stations.map((station, index) => (
                  <Card 
                    key={station.name}
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Train className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {station.name}
                          </h3>
                          <p className="text-primary font-medium mb-3">
                            徒歩{station.walkTime}
                          </p>
                          
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">利用可能路線</p>
                              <div className="flex flex-wrap gap-2">
                                {station.lines.map((line) => (
                                  <Badge 
                                    key={line} 
                                    variant="secondary"
                                    className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                  >
                                    {line}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">推奨出口</p>
                              <div className="flex flex-wrap gap-2">
                                {station.exits.map((exit) => (
                                  <Badge 
                                    key={exit} 
                                    className="bg-primary/10 text-primary border-primary/20"
                                  >
                                    {exit}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Parking Information */}
                <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Car className="w-6 h-6 text-amber-600 dark:text-amber-400 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          お車でお越しの方へ
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          専用駐車場はございません。近隣のコインパーキングをご利用ください。
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Right Column - Hours & Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">営業時間</h2>
              
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 mb-6">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {openingHours.map((schedule) => (
                      <div
                        key={schedule.day}
                        className={`flex justify-between items-center py-3 px-4 rounded-lg ${
                          schedule.closed 
                            ? 'bg-red-50 dark:bg-red-900/20' 
                            : 'bg-gray-50 dark:bg-gray-700/50'
                        }`}
                      >
                        <span className="font-medium text-gray-900 dark:text-white">
                          {schedule.day}
                        </span>
                        <span className={
                          schedule.closed 
                            ? 'text-red-600 dark:text-red-400 font-medium' 
                            : 'text-gray-600 dark:text-gray-300'
                        }>
                          {schedule.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                      <div className="text-sm">
                        <p className="text-blue-900 dark:text-blue-100 font-medium mb-1">
                          ラストオーダー
                        </p>
                        <p className="text-blue-700 dark:text-blue-300">
                          フード 25:00 / ドリンク 25:30
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Nearby Landmarks */}
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    周辺スポット
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {accessInfo.landmarks.map((landmark) => (
                      <div
                        key={landmark}
                        className="bg-gray-50 dark:bg-gray-700 rounded-lg px-4 py-3 text-center"
                      >
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {landmark}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              地図
            </h2>
            
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-700 relative">
                {/* Map placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                      CHEETAH BAR
                    </p>
                    <Button 
                      onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(accessInfo.address + " " + accessInfo.building)}`, '_blank')}
                    >
                      地図を開く
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5 dark:bg-primary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              ご予約・お問い合わせ
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              完全予約制となっております。お早めのご予約をお勧めいたします。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8"
              >
                <Calendar className="w-5 h-5 mr-2" />
                今すぐ予約
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 dark:border-gray-600 px-8"
              >
                <Phone className="w-5 h-5 mr-2" />
                03-1234-5678
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}