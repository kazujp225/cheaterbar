"use client"

import { motion } from "framer-motion"
import { 
  MapPin, 
  Train, 
  Clock, 
  Phone,
  ExternalLink,
  Calendar,
  Car,
  Info
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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
    <main className="h-screen bg-white flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Title */}
          <h1 className="text-3xl font-light mb-8 text-gray-900">
            CHEETAH BAR
          </h1>
          
          {/* Main Info Card */}
          <div className="bg-gray-50 rounded-xl p-8 mb-8">
            <div className="mb-6">
              <p className="text-2xl font-medium text-gray-900 mb-3">麻布十番駅から徒歩3分</p>
              <p className="text-gray-600 mb-4">東京都港区麻布十番１丁目５−１０</p>
              <p className="text-sm text-gray-500">第２石原ビル 別館 1階</p>
            </div>
            
            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <Button 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=東京都港区麻布十番１丁目５−１０', '_blank')}
              >
                <MapPin className="w-4 h-4 mr-2" />
                地図で見る
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-gray-300"
                onClick={() => window.location.href = 'tel:03-1234-5678'}
              >
                <Phone className="w-4 h-4 mr-2" />
                電話する
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-gray-300"
              >
                <Calendar className="w-4 h-4 mr-2" />
                予約する
              </Button>
            </div>
            
            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-gray-500 mb-1">営業時間</p>
                <p className="text-gray-900">月〜土 18:00-26:00</p>
                <p className="text-red-600">日曜定休</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">交通</p>
                <p className="text-gray-900">麻布十番駅 4番出口</p>
                <p className="text-gray-600">南北線・大江戸線</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </main>
  )
}