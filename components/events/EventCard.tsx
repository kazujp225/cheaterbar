"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Eye, 
  UserPlus,
  Flame,
  Star,
  ArrowRight
} from "lucide-react"

export interface EventData {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  type: 'real' | 'online' | 'hybrid'
  category: string[]
  participants: number
  maxParticipants: number
  isPopular?: boolean
  isFeatured?: boolean
  image?: string
  price?: number
  memberOnly?: boolean
}

interface EventCardProps {
  event: EventData
  variant?: 'default' | 'featured' | 'compact'
  className?: string
}

export default function EventCard({ 
  event, 
  variant = 'default',
  className = ""
}: EventCardProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'real':
        return <MapPin className="w-4 h-4" />
      case 'online':
        return <Users className="w-4 h-4" />
      case 'hybrid':
        return <div className="flex">
          <MapPin className="w-3 h-3" />
          <Users className="w-3 h-3 -ml-1" />
        </div>
      default:
        return <MapPin className="w-4 h-4" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'real':
        return 'リアル参加'
      case 'online':
        return 'オンライン'
      case 'hybrid':
        return 'ハイブリッド'
      default:
        return 'リアル参加'
    }
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'real':
        return 'bg-primary/20 text-primary border-primary/30'
      case 'online':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'hybrid':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      default:
        return 'bg-primary/20 text-primary border-primary/30'
    }
  }

  const participationRate = (event.participants / event.maxParticipants) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      className={`group ${className}`}
    >
      <Card className={`
        h-full relative overflow-hidden border transition-all duration-300
        ${variant === 'featured' 
          ? 'border-primary/50 bg-gradient-to-br from-primary/5 to-amber-500/5' 
          : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'
        }
        hover:border-primary hover:shadow-2xl hover:shadow-primary/20
        ${event.isFeatured ? 'ring-2 ring-primary/30' : ''}
      `}>
        {/* Popular/Featured Badges */}
        {(event.isPopular || event.isFeatured) && (
          <div className="absolute top-4 left-4 z-20 flex gap-2">
            {event.isPopular && (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Badge variant="secondary" className="bg-orange-500/90 text-white border-orange-400 flex items-center gap-1">
                  <Flame className="w-3 h-3" />
                  人気
                </Badge>
              </motion.div>
            )}
            {event.isFeatured && (
              <Badge variant="secondary" className="bg-amber-500/90 text-white border-amber-400 flex items-center gap-1">
                <Star className="w-3 h-3" />
                注目
              </Badge>
            )}
          </div>
        )}

        {/* Event Image */}
        {event.image && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Date Overlay */}
            <div className="absolute bottom-4 left-4 text-white">
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="font-medium">{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-xs mt-1 text-gray-300">
                  <Clock className="w-3 h-3" />
                  <span>{event.time}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <CardHeader className="pb-3">
          {/* Category Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            {event.category.map((cat, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="text-xs border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400"
              >
                #{cat}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
            {event.title}
          </h3>
          
          {/* Date and Time (if no image) */}
          {!event.image && (
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-2">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-primary" />
                <span>{event.time}</span>
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {event.description.length > 120 
              ? `${event.description.substring(0, 120)}...` 
              : event.description
            }
          </p>

          {/* Event Details */}
          <div className="space-y-3">
            {/* Type and Location */}
            <div className="flex items-center justify-between">
              <Badge className={`flex items-center gap-1 ${getTypeBadgeColor(event.type)}`}>
                {getTypeIcon(event.type)}
                <span className="text-xs">{getTypeLabel(event.type)}</span>
                {event.memberOnly && <span className="text-xs">（会員限定）</span>}
              </Badge>
              
              {event.price !== undefined && (
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {event.price === 0 ? '無料' : `¥${event.price.toLocaleString()}`}
                </div>
              )}
            </div>

            {/* Participants */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Users className="w-4 h-4" />
                <span>{event.participants}/{event.maxParticipants}名</span>
              </div>
              
              {/* Participation Rate Bar */}
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      participationRate >= 80 ? 'bg-red-500' :
                      participationRate >= 60 ? 'bg-orange-500' :
                      'bg-primary'
                    }`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${participationRate}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
                <span className="text-xs text-gray-500">
                  {Math.round(participationRate)}%
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              size="sm"
              className="flex-1 group/btn border-gray-300 dark:border-gray-600 hover:border-primary"
            >
              <Eye className="w-4 h-4 mr-2 group-hover/btn:text-primary transition-colors" />
              詳細を見る
            </Button>
            
            <Button 
              size="sm"
              className="flex-1 bg-primary hover:bg-primary/90 text-white relative overflow-hidden"
              disabled={participationRate >= 100}
            >
              {participationRate >= 100 ? (
                <>満席</>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  参加申込
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
              
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </div>
        </CardContent>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 215, 0, 0.1), transparent 40%)'
          }}
        />
      </Card>
    </motion.div>
  )
}