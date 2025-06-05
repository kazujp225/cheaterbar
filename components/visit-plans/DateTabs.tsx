"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Calendar, Clock } from "lucide-react"

interface DateTabsProps {
  selectedDate: string
  onDateChange: (date: string) => void
}

const dateOptions = [
  { 
    key: 'today', 
    label: '今日', 
    subtitle: '12/25',
    count: 4 
  },
  { 
    key: 'tomorrow', 
    label: '明日', 
    subtitle: '12/26',
    count: 2 
  },
  { 
    key: 'week', 
    label: '今週', 
    subtitle: '12/25-31',
    count: 12 
  }
]

export default function DateTabs({ selectedDate, onDateChange }: DateTabsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      {dateOptions.map((option, index) => (
        <motion.div
          key={option.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Button
            variant={selectedDate === option.key ? "default" : "outline"}
            className={`h-auto p-6 flex flex-col items-center gap-2 min-w-[120px] ${
              selectedDate === option.key
                ? 'bg-primary hover:bg-primary/90 text-white'
                : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            onClick={() => onDateChange(option.key)}
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="font-semibold">{option.label}</span>
            </div>
            <div className="text-xs opacity-80">{option.subtitle}</div>
            <div className={`text-xs px-2 py-1 rounded-full ${
              selectedDate === option.key
                ? 'bg-white/20 text-white'
                : 'bg-primary/20 text-primary'
            }`}>
              {option.count}名予定
            </div>
          </Button>
        </motion.div>
      ))}
    </div>
  )
}