'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowLeft, Crown, Calendar } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import QRCode from 'qrcode'

const TIER_CONFIG = {
  bronze: { label: "ブロンズ", color: "bg-orange-500", icon: "🥉" },
  silver: { label: "シルバー", color: "bg-gray-400", icon: "🥈" },
  gold: { label: "ゴールド", color: "bg-yellow-500", icon: "🥇" },
  platinum: { label: "プラチナ", color: "bg-purple-500", icon: "💎" }
}

export default function MemberCardPage() {
  const { user, profile, membership, loading } = useAuth()
  const router = useRouter()
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      // Generate QR code with member ID
      QRCode.toDataURL(
        `cheetah-bar-member:${user.id}`,
        {
          width: 200,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        }
      ).then(setQrCodeUrl)
    }
  }, [user])

  if (loading || !user || !profile || !membership) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  const tierConfig = TIER_CONFIG[membership.tier]
  const memberNumber = user.id.slice(0, 8).toUpperCase()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 戻るボタン */}
        <Link href="/mypage">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            マイページに戻る
          </Button>
        </Link>

        {/* 会員証カード */}
        <Card className="overflow-hidden">
          {/* ヘッダー部分 */}
          <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl">🐆</span>
                <h1 className="text-xl font-bold">CHEETAH BAR</h1>
              </div>
              <Badge className={`${tierConfig.color} text-white border-0`}>
                {tierConfig.icon} {tierConfig.label}
              </Badge>
            </div>
            <p className="text-sm opacity-90">Digital Membership Card</p>
          </div>

          <CardContent className="p-6 space-y-6">
            {/* プロフィール情報 */}
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile.avatar_url || ''} alt={profile.full_name} />
                <AvatarFallback className="text-xl">
                  {profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{profile.full_name}</h2>
                <p className="text-sm text-muted-foreground">{profile.company_name}</p>
                <p className="text-sm text-muted-foreground">{profile.position}</p>
              </div>
            </div>

            {/* 会員情報 */}
            <div className="space-y-3 p-4 bg-muted rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">会員番号</span>
                <span className="font-mono font-semibold">{memberNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">会員種別</span>
                <Badge variant={membership.type === 'paid' ? 'default' : 'secondary'}>
                  {membership.type === 'paid' ? '有料会員' : '無料会員'}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">入会日</span>
                <span className="text-sm">
                  {format(new Date(membership.started_at), 'yyyy年M月d日', { locale: ja })}
                </span>
              </div>
            </div>

            {/* QRコード */}
            <div className="flex flex-col items-center space-y-3">
              {qrCodeUrl && (
                <div className="p-4 bg-white rounded-lg shadow-inner">
                  <img src={qrCodeUrl} alt="Member QR Code" className="w-48 h-48" />
                </div>
              )}
              <p className="text-xs text-center text-muted-foreground">
                受付でこのQRコードをご提示ください
              </p>
            </div>

            {/* フッター */}
            <div className="pt-4 border-t text-center">
              <p className="text-xs text-muted-foreground">
                有効期限: {membership.expires_at ? format(new Date(membership.expires_at), 'yyyy年M月d日まで', { locale: ja }) : '無期限'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 注意事項 */}
        <Card className="mt-4">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">
              ※ この会員証は本人のみ有効です。他人への譲渡・貸与はできません。
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}