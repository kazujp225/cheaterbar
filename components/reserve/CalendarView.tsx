"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Sparkles,
  TrendingUp
} from "lucide-react"

interface CalendarViewProps {
  onDateSelect: (date: Date) => void
}

interface AvailabilityData {
  [key: string]: {
    status: 'available' | 'limited' | 'full'
    spotsLeft?: number
  }
}

// Mock availability data
const mockAvailability: AvailabilityData = {
  '2024-01-15': { status: 'available' },
  '2024-01-16': { status: 'limited', spotsLeft: 3 },
  '2024-01-17': { status: 'full' },
  '2024-01-18': { status: 'available' },
  '2024-01-19': { status: 'limited', spotsLeft: 2 },
  '2024-01-20': { status: 'available' },
}

export default function CalendarView({ onDateSelect }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startDayOfWeek = firstDay.getDay()
    
    const days = []
    
    // Previous month's trailing days
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const day = new Date(year, month, -i)
      days.push({ date: day, isCurrentMonth: false })
    }
    
    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(year, month, i)
      days.push({ date: day, isCurrentMonth: true })
    }
    
    // Next month's leading days
    const remainingDays = 42 - days.length // 6 weeks * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      const day = new Date(year, month + 1, i)
      days.push({ date: day, isCurrentMonth: false })
    }
    
    return days
  }

  const formatDateKey = (date: Date) => {
    try {
      return date.toISOString().split('T')[0]
    } catch {
      return ''
    }
  }

  const getAvailability = (date: Date) => {
    const key = formatDateKey(date)
    return mockAvailability[key] || { status: 'available' }
  }

  const isDateDisabled = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    // Disable past dates
    if (date < today) return true
    
    // Disable dates more than 30 days in the future
    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 30)
    if (date > maxDate) return true
    
    // Disable Sundays (day 0) and holidays
    if (date.getDay() === 0) return true
    
    // Check availability
    const availability = getAvailability(date)
    if (availability.status === 'full') return true
    
    return false
  }

  const handleDateClick = (date: Date) => {
    if (!isDateDisabled(date)) {
      setSelectedDate(date)
    }
  }

  const handleDateConfirm = () => {
    if (selectedDate) {
      onDateSelect(selectedDate)
    }
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const goToToday = () => {
    setCurrentMonth(new Date())
    setSelectedDate(new Date())
  }

  const days = getDaysInMonth(currentMonth)
  const weekDays = ['日', '月', '火', '水', '木', '金', '土']
  const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap gap-3 justify-center"
      >
        <Button
          variant="outline"
          size="sm"
          onClick={goToToday}
          className="rounded-full"
        >
          今日
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            setSelectedDate(tomorrow)
            setCurrentMonth(new Date())
          }}
          className="rounded-full"
        >
          明日
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const thisWeekend = new Date()
            const day = thisWeekend.getDay()
            const daysUntilFriday = (5 - day + 7) % 7 || 7
            thisWeekend.setDate(thisWeekend.getDate() + daysUntilFriday)
            setSelectedDate(thisWeekend)
            setCurrentMonth(new Date())
          }}
          className="rounded-full"
        >
          今週末
        </Button>
      </motion.div>

      {/* Calendar */}
      <Card className="border-primary/20">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPreviousMonth}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <CardTitle className="text-xl">
              {currentMonth.getFullYear()}年 {monthNames[currentMonth.getMonth()]}
            </CardTitle>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={goToNextMonth}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Week days header */}
          <div className="grid grid-cols-7 mb-2">
            {weekDays.map((day, index) => (
              <div
                key={day}
                className={`text-center text-sm font-medium py-2 ${
                  index === 0 ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map(({ date, isCurrentMonth }, index) => {
              const isDisabled = isDateDisabled(date)
              const isSelected = selectedDate?.toDateString() === date.toDateString()
              const isToday = new Date().toDateString() === date.toDateString()
              const availability = getAvailability(date)
              
              return (
                <motion.div
                  key={index}
                  whileHover={!isDisabled ? { scale: 1.05 } : {}}
                  whileTap={!isDisabled ? { scale: 0.95 } : {}}
                >
                  <button
                    onClick={() => handleDateClick(date)}
                    disabled={isDisabled}
                    className={`
                      relative w-full aspect-square flex flex-col items-center justify-center rounded-lg
                      transition-all duration-200
                      ${!isCurrentMonth ? 'opacity-30' : ''}
                      ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                      ${isSelected 
                        ? 'bg-primary text-white' 
                        : isToday
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }
                      ${date.getDay() === 0 && isCurrentMonth && !isDisabled ? 'text-red-500' : ''}
                    `}
                  >
                    <span className="text-sm md:text-base">{date.getDate()}</span>
                    
                    {/* Availability indicator */}
                    {isCurrentMonth && !isDisabled && (
                      <div className="absolute bottom-1 left-0 right-0 flex justify-center">
                        {availability.status === 'limited' && (
                          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                        )}
                        {availability.status === 'available' && (
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        )}
                      </div>
                    )}
                    
                    {/* Limited spots badge */}
                    {isCurrentMonth && !isDisabled && availability.status === 'limited' && availability.spotsLeft && (
                      <div className="absolute -top-1 -right-1">
                        <Badge className="bg-amber-500 text-white text-[10px] px-1 py-0">
                          {availability.spotsLeft}
                        </Badge>
                      </div>
                    )}
                  </button>
                </motion.div>
              )
            })}
          </div>
          
          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-gray-600 dark:text-gray-400">空席あり</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-500 rounded-full" />
              <span className="text-gray-600 dark:text-gray-400">残りわずか</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full" />
              <span className="text-gray-600 dark:text-gray-400">満席</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Date Info */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    {selectedDate.toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      weekday: 'long'
                    })}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    {getAvailability(selectedDate).status === 'limited' ? (
                      <>
                        <AlertCircle className="w-4 h-4 text-amber-500" />
                        <span className="text-amber-600 dark:text-amber-400">
                          残り{getAvailability(selectedDate).spotsLeft}席
                        </span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-green-500" />
                        <span className="text-green-600 dark:text-green-400">
                          予約可能
                        </span>
                      </>
                    )}
                  </div>
                </div>
                
                <Button
                  onClick={handleDateConfirm}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  この日付で時間を選ぶ
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}