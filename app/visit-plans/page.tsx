'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { createBrowserSupabaseClient } from '@/lib/supabase-dummy'
import type { VisitPlan, Profile } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Calendar, Clock, Users, Eye, EyeOff, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { format, addDays, startOfWeek, endOfWeek, isToday, isSameDay, parseISO } from 'date-fns'
import { ja } from 'date-fns/locale'

interface VisitPlanWithProfile extends VisitPlan {
  profile: Profile
}

export default function VisitPlansPage() {
  const { user, membership, loading: authLoading } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [visitPlans, setVisitPlans] = useState<VisitPlanWithProfile[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), { locale: ja }))
  const supabase = createBrowserSupabaseClient()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) {
      fetchVisitPlans()
    }
  }, [user, weekStart])

  const fetchVisitPlans = async () => {
    setLoading(true)
    try {
      const weekEnd = endOfWeek(weekStart, { locale: ja })
      
      let query = supabase
        .from('visit_plans')
        .select(`
          *,
          profile:profiles(*)
        `)
        .gte('visit_date', format(weekStart, 'yyyy-MM-dd'))
        .lte('visit_date', format(weekEnd, 'yyyy-MM-dd'))
        .eq('is_cancelled', false)
        .order('visit_date', { ascending: true })
        .order('start_time', { ascending: true })

      // Apply visibility filters based on membership
      if (membership?.type !== 'paid') {
        query = query.in('visibility', ['public', 'members_only'])
      }

      const { data, error } = await query

      if (error) throw error

      setVisitPlans(data || [])
    } catch (error) {
      console.error('Error fetching visit plans:', error)
    } finally {
      setLoading(false)
    }
  }

  const groupPlansByDate = () => {
    const grouped: Record<string, VisitPlanWithProfile[]> = {}
    
    visitPlans.forEach(plan => {
      const date = plan.visit_date
      if (!grouped[date]) {
        grouped[date] = []
      }
      grouped[date].push(plan)
    })

    return grouped
  }

  const getWeekDays = () => {
    const days = []
    for (let i = 0; i < 7; i++) {
      days.push(addDays(weekStart, i))
    }
    return days
  }

  const handlePreviousWeek = () => {
    setWeekStart(addDays(weekStart, -7))
  }

  const handleNextWeek = () => {
    setWeekStart(addDays(weekStart, 7))
  }

  const handleToday = () => {
    setWeekStart(startOfWeek(new Date(), { locale: ja }))
    setSelectedDate(new Date())
  }

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case 'public':
        return <Eye className="h-4 w-4" />
      case 'members_only':
        return <Users className="h-4 w-4" />
      case 'private':
        return <EyeOff className="h-4 w-4" />
      default:
        return null
    }
  }

  const getVisibilityLabel = (visibility: string) => {
    switch (visibility) {
      case 'public':
        return '全体公開'
      case 'members_only':
        return '会員限定'
      case 'anonymous':
        return '匿名'
      case 'private':
        return '非公開'
      default:
        return visibility
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  const groupedPlans = groupPlansByDate()
  const weekDays = getWeekDays()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">来店予定</h1>
            <p className="text-muted-foreground">
              今週の来店予定を確認して、ネットワーキングの準備をしましょう
            </p>
          </div>
          <Link href="/visit-plans/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              来店予定を登録
            </Button>
          </Link>
        </div>

        {/* Week Navigation */}
        <Card className="mb-8">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousWeek}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold">
                  {format(weekStart, 'yyyy年M月', { locale: ja })}
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleToday}
                >
                  今週
                </Button>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextWeek}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Week Days */}
            <div className="grid grid-cols-7 gap-2">
              {weekDays.map((day) => {
                const dateStr = format(day, 'yyyy-MM-dd')
                const dayPlans = groupedPlans[dateStr] || []
                const isSelected = isSameDay(day, selectedDate)
                const isTodayDate = isToday(day)

                return (
                  <button
                    key={dateStr}
                    onClick={() => setSelectedDate(day)}
                    className={`
                      p-3 rounded-lg text-center transition-all
                      ${isSelected ? 'bg-primary text-white' : 'hover:bg-accent'}
                      ${isTodayDate && !isSelected ? 'ring-2 ring-primary' : ''}
                    `}
                  >
                    <div className="text-xs mb-1">
                      {format(day, 'E', { locale: ja })}
                    </div>
                    <div className="font-semibold">
                      {format(day, 'd')}
                    </div>
                    {dayPlans.length > 0 && (
                      <div className="mt-1">
                        <Badge variant={isSelected ? "secondary" : "default"} className="text-xs">
                          {dayPlans.length}
                        </Badge>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Selected Date Plans */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              {format(selectedDate, 'M月d日(E)', { locale: ja })}の来店予定
            </h3>
            <Badge variant="outline">
              {groupedPlans[format(selectedDate, 'yyyy-MM-dd')]?.length || 0}名
            </Badge>
          </div>

          {groupedPlans[format(selectedDate, 'yyyy-MM-dd')]?.length > 0 ? (
            <div className="grid gap-4">
              {groupedPlans[format(selectedDate, 'yyyy-MM-dd')].map((plan) => (
                <Card key={plan.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        {membership?.type === 'paid' && plan.visibility !== 'anonymous' ? (
                          <>
                            <Avatar>
                              <AvatarImage src={plan.profile.avatar_url || ''} />
                              <AvatarFallback>
                                {plan.profile.full_name?.charAt(0) || 'U'}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-semibold">{plan.profile.full_name}</h4>
                              {plan.profile.company_name && (
                                <p className="text-sm text-muted-foreground">
                                  {plan.profile.company_name}
                                  {plan.profile.position && ` - ${plan.profile.position}`}
                                </p>
                              )}
                              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4 mr-1" />
                                {plan.start_time}
                                {plan.end_time && ` - ${plan.end_time}`}
                              </div>
                              {plan.message && (
                                <p className="mt-2 text-sm">{plan.message}</p>
                              )}
                              {plan.profile.interests && plan.profile.interests.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {plan.profile.interests.slice(0, 3).map((interest) => (
                                    <Badge key={interest} variant="secondary" className="text-xs">
                                      {interest}
                                    </Badge>
                                  ))}
                                  {plan.profile.interests.length > 3 && (
                                    <Badge variant="secondary" className="text-xs">
                                      +{plan.profile.interests.length - 3}
                                    </Badge>
                                  )}
                                </div>
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarFallback>?</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-semibold">
                                {plan.visibility === 'anonymous' ? '匿名の会員' : '会員'}
                              </h4>
                              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4 mr-1" />
                                {plan.start_time}
                                {plan.end_time && ` - ${plan.end_time}`}
                              </div>
                              {membership?.type !== 'paid' && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  詳細は有料会員のみ閲覧可能
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center">
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getVisibilityIcon(plan.visibility)}
                          {getVisibilityLabel(plan.visibility)}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  この日の来店予定はまだありません
                </p>
                <Link href="/visit-plans/new">
                  <Button variant="outline" className="mt-4">
                    来店予定を登録する
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Upgrade CTA for free members */}
        {membership?.type === 'free' && (
          <Card className="mt-8 border-primary">
            <CardHeader>
              <CardTitle>もっと詳しい情報を見たいですか？</CardTitle>
              <CardDescription>
                有料会員になると、来店予定者の詳細情報やマッチング機能が利用できます
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/membership/upgrade">
                <Button>有料会員にアップグレード</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}