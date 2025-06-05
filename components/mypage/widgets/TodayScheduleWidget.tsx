'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, MapPin, Users } from 'lucide-react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

const todayEvents = [
  {
    id: 1,
    time: '19:00',
    type: 'visit',
    title: '来店予定',
    location: 'CHEETAH BAR 3F',
    attendees: 5
  },
  {
    id: 2,
    time: '20:30',
    type: 'matching',
    title: '山田さんとのマッチング',
    location: 'カウンター席',
    confirmed: true
  }
]

export default function TodayScheduleWidget() {
  const today = new Date()
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          <span>今日のスケジュール</span>
          <span className="text-sm font-normal text-muted-foreground">
            {format(today, 'M月d日(E)', { locale: ja })}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {todayEvents.length > 0 ? (
          <div className="space-y-3">
            {todayEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-6 pb-3 last:pb-0"
              >
                {/* タイムライン */}
                <div className="absolute left-0 top-2 h-full w-px bg-border">
                  {index < todayEvents.length - 1 && (
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-transparent" />
                  )}
                </div>
                <div className="absolute left-[-4px] top-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
                
                {/* イベント内容 */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{event.time}</span>
                    {event.confirmed && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        確定
                      </span>
                    )}
                  </div>
                  <h4 className="font-medium">{event.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </span>
                    {event.attendees && (
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {event.attendees}名
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-4">
            今日の予定はありません
          </p>
        )}
      </CardContent>
    </Card>
  )
}