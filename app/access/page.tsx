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
  Info,
  Navigation,
  Building2,
  Users,
  Wifi,
  CircleParking,
  CreditCard,
  Wine
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"
import Link from "next/link"
import { getOptimizedImageUrl, getBlurDataURL } from "@/lib/image-utils"

const accessInfo = {
  address: "東京都港区麻布十番１丁目５−１０",
  building: "第２石原ビル 別館 1階",
  capacity: "15名",
  phone: "03-1234-5678",
  email: "info@cheetah-bar.com",
  stations: [
    {
      name: "麻布十番駅",
      lines: ["東京メトロ南北線", "都営大江戸線"],
      walkTime: "3分",
      exits: ["4番出口", "5a出口"],
      distance: "約180m"
    },
    {
      name: "赤羽橋駅",
      lines: ["都営大江戸線"],
      walkTime: "8分",
      exits: ["赤羽橋口"],
      distance: "約600m"
    }
  ],
  landmarks: [
    { name: "東京タワー", distance: "徒歩15分" },
    { name: "麻布十番商店街", distance: "徒歩1分" },
    { name: "善福寺", distance: "徒歩5分" },
    { name: "パティオ十番", distance: "徒歩2分" }
  ],
  facilities: [
    { icon: Wifi, label: "Free Wi-Fi" },
    { icon: CreditCard, label: "キャッシュレス対応" },
    { icon: CircleParking, label: "近隣にコインパーキング" },
    { icon: Wine, label: "プレミアムドリンク" }
  ]
}

const openingHours = [
  { day: "月曜日", hours: "18:00 - 26:00", note: "" },
  { day: "火曜日", hours: "18:00 - 26:00", note: "" },
  { day: "水曜日", hours: "18:00 - 26:00", note: "" },
  { day: "木曜日", hours: "18:00 - 26:00", note: "" },
  { day: "金曜日", hours: "18:00 - 26:00", note: "混雑予想" },
  { day: "土曜日", hours: "18:00 - 26:00", note: "混雑予想" },
  { day: "日曜日・祝日", hours: "定休日", closed: true, note: "" },
]

export default function AccessPage() {
  const handleMapOpen = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=東京都港区麻布十番１丁目５−１０', '_blank')
  }

  const handlePhoneCall = () => {
    window.location.href = `tel:${accessInfo.phone}`
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section with Map */}
      <section className="relative h-[50vh] bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src={getOptimizedImageUrl("https://images.unsplash.com/photo-1524661135-423995f22d0b", 3840, 85)}
            alt="Tokyo night view"
            fill
            className="object-cover opacity-40"
            priority
            placeholder="blur"
            blurDataURL={getBlurDataURL()}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        </div>
        
        <div className="relative z-10 h-full flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
                ACCESS
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                アクセス
              </h1>
              <p className="text-xl text-muted-foreground">
                麻布十番駅から徒歩3分の好立地
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Location Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    所在地
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">{accessInfo.address}</h3>
                    <p className="text-muted-foreground">{accessInfo.building}</p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button 
                      size="lg"
                      onClick={handleMapOpen}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Google Mapsで開く
                    </Button>
                    <Button 
                      size="lg"
                      variant="outline"
                      onClick={handlePhoneCall}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      電話で問い合わせ
                    </Button>
                    <Link href="/reserve">
                      <Button size="lg" variant="outline">
                        <Calendar className="w-4 h-4 mr-2" />
                        予約する
                      </Button>
                    </Link>
                  </div>

                  {/* Map Image */}
                  <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden cursor-pointer group" onClick={handleMapOpen}>
                    <Image
                      src={getOptimizedImageUrl("https://images.unsplash.com/photo-1555396273-367ea4eb4db5", 1920, 85)}
                      alt="Map"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      placeholder="blur"
                      blurDataURL={getBlurDataURL()}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="text-white text-center">
                        <MapPin className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-lg font-medium">クリックして地図を開く</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Transportation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Train className="w-5 h-5 text-primary" />
                    最寄り駅
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {accessInfo.stations.map((station, index) => (
                      <div key={station.name} className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-semibold">
                            {station.walkTime.replace('分', '')}分
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{station.name}</h3>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {station.lines.map(line => (
                              <Badge key={line} variant="secondary">
                                {line}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {station.exits.join('・')} • {station.distance}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-primary" />
                      周辺の目印
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {accessInfo.landmarks.map(landmark => (
                        <div key={landmark.name} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span className="text-sm">{landmark.name}</span>
                          <span className="text-xs text-muted-foreground">({landmark.distance})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Facilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>設備・サービス</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {accessInfo.facilities.map(facility => (
                      <div key={facility.label} className="flex flex-col items-center gap-2 p-4 rounded-lg bg-secondary">
                        <facility.icon className="w-8 h-8 text-primary" />
                        <span className="text-sm text-center">{facility.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Hours & Info */}
          <div className="space-y-8">
            {/* Opening Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    営業時間
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {openingHours.map((schedule) => (
                      <div
                        key={schedule.day}
                        className={`flex justify-between items-center ${
                          schedule.closed ? 'text-muted-foreground' : ''
                        }`}
                      >
                        <span className="font-medium">{schedule.day}</span>
                        <div className="flex items-center gap-2">
                          <span className={schedule.closed ? 'text-red-500' : ''}>
                            {schedule.hours}
                          </span>
                          {schedule.note && (
                            <Badge variant="secondary" className="text-xs">
                              {schedule.note}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Alert className="mt-6">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      完全予約制のため、事前のご予約をお願いします
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>お問い合わせ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">電話番号</p>
                    <a 
                      href={`tel:${accessInfo.phone}`}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {accessInfo.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">メールアドレス</p>
                    <a 
                      href={`mailto:${accessInfo.email}`}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {accessInfo.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">定員</p>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-lg font-medium">{accessInfo.capacity}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Parking Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="w-5 h-5 text-primary" />
                    駐車場
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    専用駐車場はございません。近隣のコインパーキングをご利用ください。
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <CircleParking className="w-4 h-4 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">パークジャパン麻布十番</p>
                        <p className="text-muted-foreground">徒歩2分 • 24時間営業</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CircleParking className="w-4 h-4 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">タイムズ麻布十番第3</p>
                        <p className="text-muted-foreground">徒歩3分 • 24時間営業</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}