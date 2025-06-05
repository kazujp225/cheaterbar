'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Loader2, User, CreditCard, Bell, Shield, X, Upload } from 'lucide-react'
import Link from 'next/link'

const INTEREST_OPTIONS = [
  'AI・機械学習',
  'Web3・ブロックチェーン',
  'SaaS',
  'FinTech',
  'HealthTech',
  'EdTech',
  'マーケティング',
  'デザイン',
  '営業・セールス',
  '資金調達',
  '人材・採用',
  'メディア・コンテンツ',
  'EC・リテール',
  'サステナビリティ',
  'その他'
]

export default function ProfilePage() {
  const { user, profile, membership, updateProfile, loading: authLoading } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    full_name: '',
    company_name: '',
    position: '',
    phone: '',
    bio: '',
    interests: [] as string[]
  })

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        company_name: profile.company_name || '',
        position: profile.position || '',
        phone: profile.phone || '',
        bio: profile.bio || '',
        interests: profile.interests || []
      })
    }
  }, [profile])

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      await updateProfile(formData)
      setSuccess('プロフィールを更新しました')
    } catch (err: any) {
      setError(err.message || 'プロフィールの更新に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelSubscription = async () => {
    if (!confirm('本当に有料会員を解約しますか？')) return

    setError(null)
    setLoading(true)

    try {
      const response = await fetch('/api/membership/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('解約に失敗しました')
      }

      router.refresh()
      setSuccess('有料会員を解約しました。月末まではサービスをご利用いただけます。')
    } catch (err: any) {
      setError(err.message || '解約に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  const membershipTierColors = {
    bronze: 'bg-orange-500',
    silver: 'bg-gray-400',
    gold: 'bg-yellow-500',
    platinum: 'bg-purple-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">プロフィール設定</h1>
          <p className="text-muted-foreground">
            プロフィール情報や会員設定を管理できます
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              プロフィール
            </TabsTrigger>
            <TabsTrigger value="membership">
              <CreditCard className="h-4 w-4 mr-2" />
              会員情報
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              通知設定
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-4 w-4 mr-2" />
              セキュリティ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>基本情報</CardTitle>
                <CardDescription>
                  他の会員に表示される情報です
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={profile.avatar_url || ''} />
                      <AvatarFallback>{profile.full_name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    <Button type="button" variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      写真を変更
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">お名前</Label>
                      <Input
                        id="full_name"
                        type="text"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">電話番号</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company_name">会社名・屋号</Label>
                      <Input
                        id="company_name"
                        type="text"
                        value={formData.company_name}
                        onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position">役職・肩書き</Label>
                      <Input
                        id="position"
                        type="text"
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">自己紹介</Label>
                    <Textarea
                      id="bio"
                      rows={4}
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      disabled={loading}
                      placeholder="あなたのビジネスや興味について教えてください..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>興味・関心分野</Label>
                    <div className="flex flex-wrap gap-2">
                      {INTEREST_OPTIONS.map((interest) => (
                        <Badge
                          key={interest}
                          variant={formData.interests.includes(interest) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => handleInterestToggle(interest)}
                        >
                          {interest}
                          {formData.interests.includes(interest) && (
                            <X className="h-3 w-3 ml-1" />
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        保存中...
                      </>
                    ) : (
                      '変更を保存'
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="membership" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>会員情報</CardTitle>
                <CardDescription>
                  現在の会員ステータスと特典
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">会員種別</p>
                    <p className="text-lg font-semibold">
                      {membership?.type === 'paid' ? '有料会員' : '無料会員'}
                    </p>
                  </div>
                  <Badge variant={membership?.type === 'paid' ? 'default' : 'secondary'}>
                    {membership?.type === 'paid' ? 'アクティブ' : '無料'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">会員ステータス</p>
                    <p className="text-lg font-semibold capitalize">{membership?.tier}</p>
                  </div>
                  {membership && (
                    <Badge className={membershipTierColors[membership.tier]}>
                      {membership.tier.toUpperCase()}
                    </Badge>
                  )}
                </div>

                {membership?.type === 'paid' && (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">開始日</p>
                      <p className="text-lg">
                        {new Date(membership.started_at).toLocaleDateString('ja-JP')}
                      </p>
                    </div>
                    {membership.expires_at && (
                      <div>
                        <p className="text-sm text-muted-foreground">次回更新日</p>
                        <p className="text-lg">
                          {new Date(membership.expires_at).toLocaleDateString('ja-JP')}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                {membership?.type === 'free' ? (
                  <Link href="/membership/upgrade">
                    <Button>有料会員にアップグレード</Button>
                  </Link>
                ) : (
                  <>
                    <Button variant="outline">プランを変更</Button>
                    <Button 
                      variant="destructive" 
                      onClick={handleCancelSubscription}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          処理中...
                        </>
                      ) : (
                        '解約する'
                      )}
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>通知設定</CardTitle>
                <CardDescription>
                  各種通知の受信設定を管理します
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  通知設定機能は現在開発中です
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>セキュリティ設定</CardTitle>
                <CardDescription>
                  パスワードやセキュリティ設定を管理します
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  セキュリティ設定機能は現在開発中です
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}