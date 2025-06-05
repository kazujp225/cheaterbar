'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { createBrowserSupabaseClient } from '@/lib/supabase-dummy'
import type { MatchingRequest } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Calendar, Clock, Check, X, MessageSquare, Loader2, Send, AlertCircle } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { ja } from 'date-fns/locale'

interface MatchingRequestWithProfiles extends MatchingRequest {
  from_user: any
  to_user: any
}

export default function MatchingRequestsPage() {
  const { user, membership, loading: authLoading } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [sentRequests, setSentRequests] = useState<MatchingRequestWithProfiles[]>([])
  const [receivedRequests, setReceivedRequests] = useState<MatchingRequestWithProfiles[]>([])
  const [selectedRequest, setSelectedRequest] = useState<MatchingRequestWithProfiles | null>(null)
  const [responseDialogOpen, setResponseDialogOpen] = useState(false)
  const [processingId, setProcessingId] = useState<string | null>(null)
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
      fetchRequests()
    }
  }, [user, membership])

  const fetchRequests = async () => {
    setLoading(true)
    try {
      // Fetch sent requests
      const { data: sent, error: sentError } = await supabase
        .from('matching_requests')
        .select(`
          *,
          from_user:profiles!from_user_id(*),
          to_user:profiles!to_user_id(*)
        `)
        .eq('from_user_id', user!.id)
        .order('created_at', { ascending: false })

      if (sentError) throw sentError

      // Fetch received requests
      const { data: received, error: receivedError } = await supabase
        .from('matching_requests')
        .select(`
          *,
          from_user:profiles!from_user_id(*),
          to_user:profiles!to_user_id(*)
        `)
        .eq('to_user_id', user!.id)
        .order('created_at', { ascending: false })

      if (receivedError) throw receivedError

      setSentRequests(sent || [])
      setReceivedRequests(received || [])
    } catch (error) {
      console.error('Error fetching requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAcceptRequest = async (requestId: string, selectedDate: any) => {
    setProcessingId(requestId)
    try {
      const response = await fetch(`/api/matching/requests/${requestId}/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selected_date: selectedDate }),
      })

      if (!response.ok) {
        throw new Error('承認に失敗しました')
      }

      await fetchRequests()
      setResponseDialogOpen(false)
      setSelectedRequest(null)
    } catch (error) {
      console.error('Error accepting request:', error)
    } finally {
      setProcessingId(null)
    }
  }

  const handleRejectRequest = async (requestId: string) => {
    setProcessingId(requestId)
    try {
      const response = await fetch(`/api/matching/requests/${requestId}/reject`, {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('拒否に失敗しました')
      }

      await fetchRequests()
      setResponseDialogOpen(false)
      setSelectedRequest(null)
    } catch (error) {
      console.error('Error rejecting request:', error)
    } finally {
      setProcessingId(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">返答待ち</Badge>
      case 'accepted':
        return <Badge variant="default">承認済み</Badge>
      case 'rejected':
        return <Badge variant="destructive">拒否</Badge>
      case 'expired':
        return <Badge variant="outline">期限切れ</Badge>
      case 'cancelled':
        return <Badge variant="outline">キャンセル</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

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
          <h1 className="text-3xl font-bold mb-2">マッチングリクエスト</h1>
          <p className="text-muted-foreground">
            送信・受信したマッチングリクエストを管理できます
          </p>
        </div>

        <Tabs defaultValue="received" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="received">
              受信したリクエスト
              {receivedRequests.filter(r => r.status === 'pending').length > 0 && (
                <Badge className="ml-2" variant="destructive">
                  {receivedRequests.filter(r => r.status === 'pending').length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="sent">送信したリクエスト</TabsTrigger>
          </TabsList>

          {/* Received Requests */}
          <TabsContent value="received" className="space-y-4">
            {receivedRequests.length > 0 ? (
              receivedRequests.map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={request.from_user.avatar_url || ''} />
                          <AvatarFallback>
                            {request.from_user.full_name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">
                            {request.from_user.full_name}
                          </CardTitle>
                          <CardDescription>
                            {request.from_user.company_name}
                            {request.from_user.position && ` - ${request.from_user.position}`}
                          </CardDescription>
                        </div>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">自己紹介</h4>
                      <p className="text-sm text-muted-foreground">{request.introduction}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">リクエスト理由</h4>
                      <p className="text-sm text-muted-foreground">{request.message}</p>
                    </div>
                    {request.topic && (
                      <div>
                        <h4 className="text-sm font-medium mb-1">話したいテーマ</h4>
                        <p className="text-sm text-muted-foreground">{request.topic}</p>
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-medium mb-1">希望日程</h4>
                      <div className="flex flex-wrap gap-2">
                        {request.proposed_dates.map((date: any, index: number) => (
                          <Badge key={index} variant="outline">
                            <Calendar className="h-3 w-3 mr-1" />
                            {format(parseISO(date.date), 'M月d日(E)', { locale: ja })}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      受信日時: {format(parseISO(request.created_at), 'yyyy年M月d日 HH:mm', { locale: ja })}
                    </div>
                  </CardContent>
                  {request.status === 'pending' && (
                    <CardFooter className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => handleRejectRequest(request.id)}
                        disabled={processingId === request.id}
                      >
                        <X className="h-4 w-4 mr-2" />
                        拒否
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedRequest(request)
                          setResponseDialogOpen(true)
                        }}
                        disabled={processingId === request.id}
                      >
                        {processingId === request.id ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            処理中...
                          </>
                        ) : (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            承認
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    受信したリクエストはありません
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Sent Requests */}
          <TabsContent value="sent" className="space-y-4">
            {sentRequests.length > 0 ? (
              sentRequests.map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={request.to_user.avatar_url || ''} />
                          <AvatarFallback>
                            {request.to_user.full_name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">
                            {request.to_user.full_name}
                          </CardTitle>
                          <CardDescription>
                            {request.to_user.company_name}
                            {request.to_user.position && ` - ${request.to_user.position}`}
                          </CardDescription>
                        </div>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">送信したメッセージ</h4>
                      <p className="text-sm text-muted-foreground">{request.message}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">提案した日程</h4>
                      <div className="flex flex-wrap gap-2">
                        {request.proposed_dates.map((date: any, index: number) => (
                          <Badge key={index} variant="outline">
                            <Calendar className="h-3 w-3 mr-1" />
                            {format(parseISO(date.date), 'M月d日(E)', { locale: ja })}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      送信日時: {format(parseISO(request.created_at), 'yyyy年M月d日 HH:mm', { locale: ja })}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Send className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    送信したリクエストはありません
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Response Dialog */}
        <Dialog open={responseDialogOpen} onOpenChange={setResponseDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>マッチングリクエストを承認</DialogTitle>
              <DialogDescription>
                希望日程から1つを選択してください
              </DialogDescription>
            </DialogHeader>
            {selectedRequest && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  {selectedRequest.proposed_dates.map((date: any, index: number) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleAcceptRequest(selectedRequest.id, date)}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      {format(parseISO(date.date), 'yyyy年M月d日(E)', { locale: ja })}
                      <span className="ml-auto text-muted-foreground">{date.time}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setResponseDialogOpen(false)}>
                キャンセル
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}