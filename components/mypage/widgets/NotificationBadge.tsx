'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Check, Users, Calendar, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { format, parseISO } from 'date-fns'
import { ja } from 'date-fns/locale'

interface NotificationBadgeProps {
  count: number
}

const notifications = [
  {
    id: 1,
    type: 'matching',
    title: '新しいマッチングリクエスト',
    description: '山田花子さんから「一緒に飲みたい」リクエストが届きました',
    timestamp: '2024-06-05T10:00:00',
    unread: true,
    icon: Users,
    href: '/matching/requests'
  },
  {
    id: 2,
    type: 'event',
    title: 'イベント開催のお知らせ',
    description: '「AI×起業」セミナーが今週金曜日に開催されます',
    timestamp: '2024-06-04T15:00:00',
    unread: true,
    icon: Calendar,
    href: '/events'
  },
  {
    id: 3,
    type: 'message',
    title: 'ピッチへの返信',
    description: '先日のピッチリクエストに返信がありました',
    timestamp: '2024-06-03T18:00:00',
    unread: false,
    icon: MessageSquare,
    href: '/mypage/pitch'
  }
]

export default function NotificationBadge({ count }: NotificationBadgeProps) {
  const [open, setOpen] = useState(false)
  const [localNotifications, setLocalNotifications] = useState(notifications)
  const unreadCount = localNotifications.filter(n => n.unread).length

  const markAsRead = (id: number) => {
    setLocalNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, unread: false } : n)
    )
  }

  const markAllAsRead = () => {
    setLocalNotifications(prev =>
      prev.map(n => ({ ...n, unread: false }))
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs font-medium flex items-center justify-center"
              >
                {unreadCount}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="font-semibold">通知</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs"
            >
              すべて既読にする
            </Button>
          )}
        </div>
        
        <ScrollArea className="h-[400px]">
          <div className="divide-y">
            {localNotifications.length > 0 ? (
              localNotifications.map((notification) => {
                const Icon = notification.icon
                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`
                      p-4 hover:bg-secondary/50 transition-colors cursor-pointer
                      ${notification.unread ? 'bg-secondary/30' : ''}
                    `}
                    onClick={() => {
                      markAsRead(notification.id)
                      setOpen(false)
                      // Navigate to href
                      window.location.href = notification.href
                    }}
                  >
                    <div className="flex gap-3">
                      <div className="rounded-lg bg-secondary p-2">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between">
                          <p className="text-sm font-medium">
                            {notification.title}
                          </p>
                          {notification.unread && (
                            <span className="h-2 w-2 rounded-full bg-primary" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {notification.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(parseISO(notification.timestamp), 'M月d日 HH:mm', { locale: ja })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">新しい通知はありません</p>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="border-t p-3 text-center">
          <a
            href="/notifications"
            className="text-sm text-primary hover:underline"
            onClick={() => setOpen(false)}
          >
            すべての通知を見る
          </a>
        </div>
      </PopoverContent>
    </Popover>
  )
}