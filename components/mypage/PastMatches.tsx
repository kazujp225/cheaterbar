'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { History, Calendar, MessageSquare, RefreshCw } from "lucide-react"
import { createBrowserSupabaseClient } from '@/lib/supabase-dummy'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

interface PastMatchesProps {
  userId: string
}

interface MatchHistory {
  id: string
  matched_date: string
  notes?: string
  rating?: number
  request: {
    from_user_id: string
    to_user_id: string
    topic?: string
    from_user?: any
    to_user?: any
  }
}

export default function PastMatches({ userId }: PastMatchesProps) {
  const [matches, setMatches] = useState<MatchHistory[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createBrowserSupabaseClient()

  useEffect(() => {
    fetchPastMatches()
  }, [userId])

  const fetchPastMatches = async () => {
    try {
      const { data, error } = await supabase
        .from('matching_history')
        .select(`
          *,
          request:matching_requests(
            *,
            from_user:profiles!from_user_id(*),
            to_user:profiles!to_user_id(*)
          )
        `)
        .order('matched_date', { ascending: false })
        .limit(5)

      if (error) throw error
      
      // Filter matches where user is involved
      const userMatches = (data || []).filter(match => 
        match.request.from_user_id === userId || match.request.to_user_id === userId
      )
      
      setMatches(userMatches)
    } catch (error) {
      console.error('Error fetching matches:', error)
    } finally {
      setLoading(false)
    }
  }

  const getMatchedUser = (match: MatchHistory) => {
    return match.request.from_user_id === userId 
      ? match.request.to_user 
      : match.request.from_user
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          過去のマッチング
        </CardTitle>
        <CardDescription>
          これまでのマッチング履歴と相談内容
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : matches.length === 0 ? (
          <div className="text-center py-8">
            <History className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              まだマッチング履歴がありません
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {matches.map((match) => {
              const matchedUser = getMatchedUser(match)
              
              return (
                <div
                  key={match.id}
                  className="p-4 rounded-lg border hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={matchedUser?.avatar_url || ''} />
                        <AvatarFallback>
                          {matchedUser?.full_name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{matchedUser?.full_name}</h4>
                          <span className="text-sm text-muted-foreground">
                            {matchedUser?.company_name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(match.matched_date), 'yyyy年M月d日(E)', { locale: ja })}
                        </div>
                        {match.request.topic && (
                          <Badge variant="secondary" className="text-xs">
                            相談: {match.request.topic}
                          </Badge>
                        )}
                        {match.notes && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {match.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline">
                      <RefreshCw className="h-3 w-3 mr-1" />
                      再申請
                    </Button>
                    {match.rating && (
                      <div className="flex items-center gap-1 ml-auto">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={i < match.rating ? "text-yellow-500" : "text-gray-300"}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}

            <Button variant="outline" className="w-full">
              すべての履歴を見る
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}