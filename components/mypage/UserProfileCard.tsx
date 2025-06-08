'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Briefcase, Hash } from "lucide-react"
import type { Profile } from "@/lib/supabase"

interface UserProfileCardProps {
  profile: Profile
  startupType?: {
    primary: string
    secondary: string
  }
}

const DEFAULT_STARTUP_TYPES = {
  idea: { icon: "💡", label: "アイデアマン" },
  logic: { icon: "🧠", label: "ロジック参謀" },
  sales: { icon: "💼", label: "営業の鬼" },
  tech: { icon: "⚡", label: "技術のプロ" },
  finance: { icon: "💰", label: "資金調達マスター" },
  creative: { icon: "🎨", label: "クリエイティブ" }
}

export default function UserProfileCard({ profile, startupType }: UserProfileCardProps) {
  const getInitials = (name: string) => {
    if (!name || typeof name !== 'string') return ''
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={profile.avatar_url || ''} alt={profile.full_name} />
            <AvatarFallback className="text-lg">
              {getInitials(profile.full_name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <h3 className="text-xl font-semibold">{profile.full_name}</h3>
            {profile.company_name && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Building2 className="h-3 w-3 mr-1" />
                {profile.company_name}
              </div>
            )}
            {profile.position && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Briefcase className="h-3 w-3 mr-1" />
                {profile.position}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Startup成分表 */}
        {startupType && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Startup成分表</p>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                {DEFAULT_STARTUP_TYPES.idea.icon} {DEFAULT_STARTUP_TYPES.idea.label}
              </Badge>
              <span className="text-sm text-muted-foreground">×</span>
              <Badge variant="secondary" className="text-sm">
                {DEFAULT_STARTUP_TYPES.logic.icon} {DEFAULT_STARTUP_TYPES.logic.label}
              </Badge>
            </div>
          </div>
        )}

        {/* 興味分野 */}
        {profile.interests && profile.interests.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">興味分野</p>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <Badge key={interest} variant="outline" className="text-xs">
                  <Hash className="h-3 w-3 mr-1" />
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* 自己紹介 */}
        {profile.bio && (
          <div className="space-y-2">
            <p className="text-sm font-medium">自己紹介</p>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {profile.bio}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}