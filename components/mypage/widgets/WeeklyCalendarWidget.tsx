'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, ChevronLeft, ChevronRight, Users, Plus } from 'lucide-react'
import { format, addDays, startOfWeek, isToday, isSameDay } from 'date-fns'
import { ja } from 'date-fns/locale'
import Link from 'next/link'

// ダミーデータ
const visitPlans = {
  '2024-06-10': 2,
  '2024-06-12': 1,
  '2024-06-14': 5,
  '2024-06-15': 3
}

export default function WeeklyCalendarWidget() {
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { locale: ja }))
  
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i))
  
  const handlePreviousWeek = () => {
    setCurrentWeek(addDays(currentWeek, -7))
  }
  
  const handleNextWeek = () => {
    setCurrentWeek(addDays(currentWeek, 7))
  }
  
  const handleToday = () => {
    setCurrentWeek(startOfWeek(new Date(), { locale: ja }))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            今週の来店予定
          </CardTitle>
          <Link href="/visit-plans/new">
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              予定を登録
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {/* 週ナビゲーション */}
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePreviousWeek}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {format(currentWeek, 'yyyy年M月', { locale: ja })}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToday}
              className="text-xs"
            >
              今週
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextWeek}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* カレンダーグリッド */}
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day, index) => {
            const dateStr = format(day, 'yyyy-MM-dd')
            const count = visitPlans[dateStr] || 0
            const isSelectedDay = isToday(day)
            
            return (
              <motion.div
                key={dateStr}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/visit-plans?date=${dateStr}`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      relative p-2 rounded-lg text-center cursor-pointer transition-colors
                      ${isSelectedDay ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}
                      ${isToday(day) && !isSelectedDay ? 'ring-2 ring-primary' : ''}
                    `}
                  >
                    <div className="text-xs mb-1">
                      {format(day, 'E', { locale: ja })}
                    </div>
                    <div className="font-semibold">
                      {format(day, 'd')}
                    </div>
                    {count > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`
                          mt-1 mx-auto w-6 h-6 rounded-full flex items-center justify-center text-xs
                          ${isSelectedDay ? 'bg-primary-foreground text-primary' : 'bg-primary text-primary-foreground'}
                        `}
                      >
                        {count}
                      </motion.div>
                    )}
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* サマリー */}
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">今週の来店予定者数</span>
            <span className="flex items-center gap-1 font-medium">
              <Users className="h-4 w-4" />
              {Object.values(visitPlans).reduce((a, b) => a + b, 0)}名
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}