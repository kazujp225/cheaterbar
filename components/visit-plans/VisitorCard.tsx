"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Clock, 
  MessageCircle, 
  User, 
  Coffee,
  Star,
  MapPin,
  Briefcase
} from "lucide-react"

export interface VisitorData {
  id: string
  name: string
  avatar?: string
  businessType: string
  entrepreneurType: string
  stage: string
  industry: string
  timeSlot: string
  comment: string
  isOnline: boolean
  membershipTier: 'basic' | 'premium' | 'vip'
  canContact: boolean
}

interface VisitorCardProps {
  visitor: VisitorData
  isAuthenticated: boolean
  onContactRequest?: (visitorId: string) => void
  onViewProfile?: (visitorId: string) => void
}

const typeIcons = {
  'アイデアマン型': '💡',
  'ロジック参謀型': '🧠', 
  '職人型': '🔨',
  '協業ハブ型': '🤝',
  'スケール型': '📈'
}

const stageColors = {
  '開業準備中': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  '開業済': 'bg-green-500/20 text-green-400 border-green-500/30',
  'スケール中': 'bg-purple-500/20 text-purple-400 border-purple-500/30'
}

const tierColors = {
  'basic': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  'premium': 'bg-amber-500/20 text-amber-400 border-amber-500/30', 
  'vip': 'bg-primary/20 text-primary border-primary/30'
}

export default function VisitorCard({ 
  visitor, 
  isAuthenticated, 
  onContactRequest, 
  onViewProfile 
}: VisitorCardProps) {
  const typeIcon = typeIcons[visitor.entrepreneurType as keyof typeof typeIcons] || '💼'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -2 }}
      className="w-full"
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarImage src={visitor.avatar} alt={visitor.name} />
                <AvatarFallback className="bg-primary/20 text-primary">
                  {visitor.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {visitor.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white truncate">
                  {typeIcon} {visitor.name}
                </h3>
                <Badge className={tierColors[visitor.membershipTier]}>
                  {visitor.membershipTier.toUpperCase()}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                <Briefcase className="w-4 h-4" />
                <span>{visitor.businessType}</span>
              </div>
            </div>
          </div>

          {/* Types & Stage */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="text-xs">
              💡 {visitor.entrepreneurType}
            </Badge>
            <Badge className={stageColors[visitor.stage as keyof typeof stageColors]}>
              {visitor.stage}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {visitor.industry}
            </Badge>
          </div>

          {/* Time Slot */}
          <div className="flex items-center gap-2 mb-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Clock className="w-4 h-4 text-primary" />
            <span className="font-medium text-gray-900 dark:text-white">
              {visitor.timeSlot}
            </span>
          </div>

          {/* Comment */}
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-start gap-2">
              <MessageCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {visitor.comment}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {isAuthenticated ? (
              <>
                <Button
                  onClick={() => onContactRequest?.(visitor.id)}
                  disabled={!visitor.canContact}
                  className={`flex-1 ${
                    visitor.canContact
                      ? 'bg-primary hover:bg-primary/90 text-white'
                      : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Coffee className="w-4 h-4 mr-2" />
                  {visitor.canContact ? '一緒に飲みたい！' : '会員限定'}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => onViewProfile?.(visitor.id)}
                  className="px-4"
                >
                  <User className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <div className="w-full">
                <Button
                  disabled
                  className="w-full bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                >
                  ログインして詳細を見る
                </Button>
              </div>
            )}
          </div>

          {/* Premium Features */}
          {visitor.membershipTier === 'vip' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 p-3 bg-gradient-to-r from-primary/10 to-amber-500/10 rounded-lg border border-primary/20"
            >
              <div className="flex items-center gap-2 text-xs text-primary">
                <Star className="w-3 h-3" />
                <span className="font-medium">VIP会員 - 優先マッチング対象</span>
              </div>
            </motion.div>
          )}

          {/* Location Hint */}
          <div className="mt-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <MapPin className="w-3 h-3" />
            <span>CHEETAH BAR 麻布十番店</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}