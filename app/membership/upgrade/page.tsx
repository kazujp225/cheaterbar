'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, X, Loader2, Crown, Zap, Star, Gem } from 'lucide-react'

const MEMBERSHIP_BENEFITS = {
  free: [
    '基本ドリンク無料',
    '月例交流会への参加',
    '来店予定の閲覧（人数のみ）',
    'プロフィール作成',
  ],
  paid: [
    '無料会員の全特典',
    '来店予定者の詳細情報閲覧',
    '「一緒に飲みたい」マッチング機能',
    'VIPイベントへの優先参加',
    'ゲスト同伴可（月2名まで）',
    '会議室利用割引',
  ],
}

const TIER_BENEFITS = {
  bronze: {
    icon: Crown,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    duration: '入会～3ヶ月',
    benefits: ['基本特典のみ'],
  },
  silver: {
    icon: Zap,
    color: 'text-gray-400',
    bgColor: 'bg-gray-400/10',
    duration: '4ヶ月～12ヶ月',
    benefits: ['マッチング優先権', '特別イベント招待'],
  },
  gold: {
    icon: Star,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    duration: '13ヶ月以上',
    benefits: ['VIPルーム優先予約', 'ゲスト同伴月3名まで', '特別ドリンク20%OFF'],
  },
  platinum: {
    icon: Gem,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    duration: '24ヶ月以上',
    benefits: ['すべての有料ドリンク20%OFF', 'プライベートイベント開催権', '専用コンシェルジュサービス'],
  },
}

export default function MembershipUpgradePage() {
  const { user, membership, loading: authLoading } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (!authLoading && membership?.type === 'paid') {
      router.push('/membership')
    }
  }, [membership, authLoading, router])

  const handleUpgrade = async () => {
    setError(null)
    setLoading(true)

    try {
      // TODO: Implement Stripe checkout
      const response = await fetch('/api/membership/upgrade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
        }),
      })

      if (!response.ok) {
        throw new Error('アップグレードに失敗しました')
      }

      const data = await response.json()
      
      // Redirect to Stripe Checkout
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        throw new Error('チェックアウトURLが取得できませんでした')
      }
    } catch (err: any) {
      setError(err.message || 'アップグレードに失敗しました')
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            有料会員にアップグレード
          </h1>
          <p className="text-xl text-muted-foreground">
            月額5,000円で、すべての機能をご利用いただけます
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="max-w-2xl mx-auto mb-8">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {/* Current Plan (Free) */}
          <Card className="relative">
            <Badge className="absolute top-4 right-4" variant="secondary">
              現在のプラン
            </Badge>
            <CardHeader>
              <CardTitle className="text-2xl">無料会員</CardTitle>
              <CardDescription>開業予定者向けプラン</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="text-3xl font-bold">¥0<span className="text-lg font-normal">/月</span></p>
              </div>
              <ul className="space-y-3">
                {MEMBERSHIP_BENEFITS.free.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Upgrade Plan (Paid) */}
          <Card className="relative border-primary shadow-lg">
            <Badge className="absolute top-4 right-4" variant="default">
              おすすめ
            </Badge>
            <CardHeader>
              <CardTitle className="text-2xl">有料会員</CardTitle>
              <CardDescription>開業済みの経営者向けプラン</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="text-3xl font-bold">¥5,000<span className="text-lg font-normal">/月</span></p>
                <p className="text-sm text-muted-foreground mt-1">初月無料キャンペーン実施中</p>
              </div>
              <ul className="space-y-3">
                {MEMBERSHIP_BENEFITS.paid.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                size="lg"
                onClick={handleUpgrade}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    処理中...
                  </>
                ) : (
                  '有料会員にアップグレード'
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Membership Tiers */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            会員ステータスと特典
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(TIER_BENEFITS).map(([tier, info]) => {
              const Icon = info.icon
              return (
                <Card key={tier} className={info.bgColor}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`h-8 w-8 ${info.color}`} />
                      <Badge variant="secondary" className="capitalize">
                        {tier}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg capitalize">{tier}</CardTitle>
                    <CardDescription>{info.duration}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {info.benefits.map((benefit, index) => (
                        <li key={index} className="text-sm flex items-start">
                          <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            継続期間に応じて自動的にステータスがアップグレードされます
          </p>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            よくある質問
          </h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">支払い方法は？</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  クレジットカード（Visa、Mastercard、American Express、JCB）でのお支払いに対応しています。
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">いつでも解約できますか？</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  はい、いつでも解約可能です。解約後も、その月の末日まではサービスをご利用いただけます。
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">法人での申し込みは可能ですか？</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  はい、法人でのお申し込みも可能です。請求書払いをご希望の場合は、別途お問い合わせください。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}