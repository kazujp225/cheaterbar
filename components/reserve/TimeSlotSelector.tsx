"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Clock, 
  Users, 
  Calendar,
  AlertCircle,
  ChevronRight,
  Sparkles,
  Wine,
  Coffee,
  Star,
  Info
} from "lucide-react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"

interface TimeSlotSelectorProps {
  selectedDate: Date
  onTimeSelect: (timeSlot: string, guestCount: number, seatPreference?: string) => void
}

interface TimeSlot {
  time: string
  available: boolean
  availableSeats: number
  isPopular?: boolean
  isPeakTime?: boolean
}

const timeSlots: TimeSlot[] = [
  { time: "18:00", available: true, availableSeats: 15, isPopular: true },
  { time: "18:30", available: true, availableSeats: 12 },
  { time: "19:00", available: true, availableSeats: 8, isPopular: true, isPeakTime: true },
  { time: "19:30", available: true, availableSeats: 5, isPeakTime: true },
  { time: "20:00", available: false, availableSeats: 0, isPeakTime: true },
  { time: "20:30", available: true, availableSeats: 3, isPeakTime: true },
  { time: "21:00", available: true, availableSeats: 7 },
  { time: "21:30", available: true, availableSeats: 10 },
  { time: "22:00", available: true, availableSeats: 15 },
  { time: "22:30", available: true, availableSeats: 15 },
  { time: "23:00", available: true, availableSeats: 15 },
  { time: "23:30", available: true, availableSeats: 13 },
  { time: "24:00", available: true, availableSeats: 11 },
  { time: "24:30", available: true, availableSeats: 8 },
  { time: "25:00", available: true, availableSeats: 6 },
  { time: "25:30", available: true, availableSeats: 4 }
]

export default function TimeSlotSelector({ selectedDate, onTimeSelect }: TimeSlotSelectorProps) {
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [guestCount, setGuestCount] = useState<number>(2)
  const [seatPreference, setSeatPreference] = useState<string>("no-preference")

  const handleProceed = () => {
    if (selectedTime) {
      onTimeSelect(selectedTime, guestCount, seatPreference)
    }
  }

  const getAvailabilityColor = (slot: TimeSlot) => {
    if (!slot.available) return "bg-gray-100 dark:bg-gray-800 text-gray-400 border-gray-200"
    if (slot.availableSeats <= 3) return "bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-700"
    return "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow-md"
  }

  const getAvailabilityText = (slot: TimeSlot) => {
    if (!slot.available) return "満席"
    if (slot.availableSeats <= 3) return `残り${slot.availableSeats}席`
    if (slot.availableSeats <= 8) return "◯"
    return "◎"
  }

  const getAvailabilityBadgeColor = (slot: TimeSlot) => {
    if (!slot.available) return "bg-gray-200 text-gray-600"
    if (slot.availableSeats <= 3) return "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
    if (slot.availableSeats <= 8) return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
    return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Reservation Details */}
        <div className="lg:col-span-1 space-y-6">
          {/* Selected Date Display */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent shadow-lg">
              <CardContent className="py-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">選択された日付</p>
                    <p className="text-xl font-bold">
                      {format(selectedDate, "M月d日 (E)", { locale: ja })}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="w-full justify-center py-2 text-sm font-semibold">
                  予約可能日
                </Badge>
              </CardContent>
            </Card>
          </motion.div>

          {/* Guest Count Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5 text-primary" />
                  人数を選択
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={guestCount.toString()} onValueChange={(value) => setGuestCount(parseInt(value))}>
                  <SelectTrigger className="w-full h-14 text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(15)].map((_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()} className="py-3">
                        {i + 1}名様
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300 flex items-start gap-2">
                    <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    団体でのご利用も承っております
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Seat Preference */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Wine className="w-5 h-5 text-primary" />
                  お席の希望
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={seatPreference} onValueChange={setSeatPreference} className="space-y-3">
                  <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <RadioGroupItem value="no-preference" id="no-preference" className="mt-1 min-w-[20px] min-h-[20px]" />
                    <Label htmlFor="no-preference" className="cursor-pointer flex-1">
                      <div className="font-medium">おまかせ</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        特に希望はありません
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <RadioGroupItem value="counter" id="counter" className="mt-1 min-w-[20px] min-h-[20px]" />
                    <Label htmlFor="counter" className="cursor-pointer flex-1">
                      <div className="font-medium">カウンター席</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        バーテンダーとの会話を楽しめます
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <RadioGroupItem value="table" id="table" className="mt-1 min-w-[20px] min-h-[20px]" />
                    <Label htmlFor="table" className="cursor-pointer flex-1">
                      <div className="font-medium">テーブル席</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        ゆったりとお過ごしいただけます
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <RadioGroupItem value="sofa" id="sofa" className="mt-1 min-w-[20px] min-h-[20px]" />
                    <Label htmlFor="sofa" className="cursor-pointer flex-1">
                      <div className="font-medium">ソファー席</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        リラックスしてお楽しみいただけます
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - Time Slots */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Clock className="w-6 h-6 text-primary" />
                    時間を選択
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span>空席あり</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <span>残りわずか</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-400" />
                      <span>満席</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                  {timeSlots.map((slot, index) => (
                    <motion.button
                      key={slot.time}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                      whileHover={{ scale: slot.available && slot.availableSeats >= guestCount ? 1.03 : 1 }}
                      whileTap={{ scale: slot.available && slot.availableSeats >= guestCount ? 0.97 : 1 }}
                      onClick={() => slot.available && slot.availableSeats >= guestCount && setSelectedTime(slot.time)}
                      disabled={!slot.available || slot.availableSeats < guestCount}
                      className={`
                        relative p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 min-h-[80px] flex flex-col justify-center items-center
                        ${selectedTime === slot.time 
                          ? "border-primary bg-primary/10 shadow-lg scale-105" 
                          : getAvailabilityColor(slot)
                        }
                        ${slot.available && slot.availableSeats >= guestCount 
                          ? "cursor-pointer" 
                          : "cursor-not-allowed opacity-60"
                        }
                      `}
                    >
                      <div className="text-base sm:text-lg font-bold mb-1 sm:mb-2">{slot.time}</div>
                      <Badge 
                        variant="secondary" 
                        className={`${getAvailabilityBadgeColor(slot)} text-xs px-2 py-0.5`}
                      >
                        {getAvailabilityText(slot)}
                      </Badge>
                      {slot.isPopular && slot.available && (
                        <div className="absolute -top-2 -right-2 bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          人気
                        </div>
                      )}
                      {slot.isPeakTime && (
                        <Sparkles className="absolute bottom-2 right-2 w-4 h-4 text-amber-500" />
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Peak Time Notice */}
                {selectedTime && timeSlots.find(s => s.time === selectedTime)?.isPeakTime && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800 rounded-xl"
                  >
                    <div className="flex gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
                          ピークタイムのご予約
                        </p>
                        <p className="text-amber-700 dark:text-amber-300">
                          選択された時間帯は混雑が予想されます。お席のご用意に少々お時間をいただく場合がございます。
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Proceed Button */}
                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={handleProceed}
                    disabled={!selectedTime}
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-base font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    size="lg"
                  >
                    予約内容を確認する
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}