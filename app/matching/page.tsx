'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { createBrowserSupabaseClient } from '@/lib/supabase-dummy'
import type { Profile } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Search, Users, Filter, Send, Loader2, CheckCircle, X } from 'lucide-react'
import { format, addDays } from 'date-fns'
import { ja } from 'date-fns/locale'

interface MatchingDialogProps {
  profile: Profile | null
  open: boolean
  onClose: () => void
  onSend: (data: any) => Promise<void>
}

function MatchingRequestDialog({ profile, open, onClose, onSend }: MatchingDialogProps) {
  const [loading, setLoading] = useState(false)
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [message, setMessage] = useState('')
  const [introduction, setIntroduction] = useState('')
  const [topic, setTopic] = useState('')

  const handleSubmit = async () => {
    if (selectedDates.length === 0) return
    
    setLoading(true)
    try {
      await onSend({
        to_user_id: profile?.id,
        proposed_dates: selectedDates.map(date => ({
          date: format(date, 'yyyy-MM-dd'),
          time: '19:00-21:00'
        })),
        message,
        introduction,
        topic,
      })
      onClose()
      // Reset form
      setSelectedDates([])
      setMessage('')
      setIntroduction('')
      setTopic('')
    } catch (error) {
      console.error('Error sending request:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleDate = (date: Date) => {
    setSelectedDates(prev => {
      const exists = prev.find(d => d.toDateString() === date.toDateString())
      if (exists) {
        return prev.filter(d => d.toDateString() !== date.toDateString())
      }
      if (prev.length >= 3) return prev
      return [...prev, date]
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>マッチングリクエストを送信</DialogTitle>
          <DialogDescription>
            {profile?.full_name}さんに「一緒に飲みたい」リクエストを送信します
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>希望日程（最大3つまで）</Label>
            <Calendar
              mode="multiple"
              selected={selectedDates}
              onSelect={(date) => date && toggleDate(date)}
              disabled={(date) => date < new Date() || date > addDays(new Date(), 30)}
              locale={ja}
              className="rounded-md border"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedDates.map((date, index) => (
                <Badge key={index} variant="secondary">
                  {format(date, 'M月d日(E)', { locale: ja })}
                  <button
                    onClick={() => toggleDate(date)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="introduction">自己紹介（必須）</Label>
            <Textarea
              id="introduction"
              placeholder="簡単な自己紹介をお願いします..."
              rows={3}
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">リクエスト理由（必須）</Label>
            <Textarea
              id="message"
              placeholder="なぜ一緒に飲みたいか教えてください..."
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic">話したいテーマ（任意）</Label>
            <Textarea
              id="topic"
              placeholder="具体的に話したいテーマがあれば..."
              rows={2}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            キャンセル
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading || selectedDates.length === 0 || !introduction || !message}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                送信中...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                リクエストを送信
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function MatchingPage() {
  const { user, membership, loading: authLoading } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const supabase = createBrowserSupabaseClient()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login')
    } else if (!authLoading && membership?.type !== 'paid') {
      router.push('/membership/upgrade')
    }
  }, [user, membership, authLoading, router])

  useEffect(() => {
    if (user && membership?.type === 'paid') {
      fetchProfiles()
    }
  }, [user, membership])

  const fetchProfiles = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .neq('id', user!.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      setProfiles(data || [])
    } catch (error) {
      console.error('Error fetching profiles:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendRequest = async (requestData: any) => {
    try {
      const response = await fetch('/api/matching/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })

      if (!response.ok) {
        throw new Error('リクエストの送信に失敗しました')
      }

      setSuccess('マッチングリクエストを送信しました！')
      setTimeout(() => setSuccess(null), 5000)
    } catch (error) {
      console.error('Error sending matching request:', error)
      throw error
    }
  }

  const filteredProfiles = profiles.filter(profile => {
    if (!searchQuery) return true
    
    const query = searchQuery.toLowerCase()
    return (
      profile.full_name?.toLowerCase().includes(query) ||
      profile.company_name?.toLowerCase().includes(query) ||
      profile.position?.toLowerCase().includes(query) ||
      profile.interests?.some(interest => interest.toLowerCase().includes(query))
    )
  })

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary py-20">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">マッチング</h1>
          <p className="text-muted-foreground">
            気になる会員を見つけて、「一緒に飲みたい」リクエストを送信しましょう
          </p>
        </div>

        {success && (
          <Alert className="mb-6">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="名前、会社名、興味分野で検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                フィルター
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Member List */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProfiles.map((profile) => (
            <Card key={profile.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={profile.avatar_url || ''} />
                    <AvatarFallback>{profile.full_name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-lg mt-3">{profile.full_name}</CardTitle>
                {profile.company_name && (
                  <CardDescription>
                    {profile.company_name}
                    {profile.position && ` - ${profile.position}`}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {profile.bio && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {profile.bio}
                  </p>
                )}
                {profile.interests && profile.interests.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {profile.interests.slice(0, 3).map((interest) => (
                      <Badge key={interest} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                    {profile.interests.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{profile.interests.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => {
                    setSelectedProfile(profile)
                    setDialogOpen(true)
                  }}
                >
                  <Users className="h-4 w-4 mr-2" />
                  一緒に飲みたい
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProfiles.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchQuery ? '検索結果が見つかりませんでした' : '表示できる会員がいません'}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Matching Request Dialog */}
        <MatchingRequestDialog
          profile={selectedProfile}
          open={dialogOpen}
          onClose={() => {
            setDialogOpen(false)
            setSelectedProfile(null)
          }}
          onSend={handleSendRequest}
        />
      </div>
    </div>
  )
}