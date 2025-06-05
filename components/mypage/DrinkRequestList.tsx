"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  MessageSquare, 
  Check, 
  X, 
  Clock, 
  Calendar,
  Users,
  Sparkles,
  Heart,
  HandshakeIcon,
  ChevronRight,
  Send
} from "lucide-react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"

interface DrinkRequest {
  id: string
  user: {
    name: string
    role: string
    company: string
    avatar?: string
    matchingType?: string
  }
  status: "pending" | "accepted" | "rejected"
  date: string
  message: string
  meetingDate?: string
}

export default function DrinkRequestList() {
  const { user } = useAuth()
  const [sentRequests, setSentRequests] = useState<DrinkRequest[]>([])
  const [receivedRequests, setReceivedRequests] = useState<DrinkRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    setIsLoading(true)
    try {
      // Mock data - replace with actual API call
      setSentRequests([
        {
          id: "1",
          user: { 
            name: "山田太郎", 
            role: "投資家",
            company: "Future Capital",
            avatar: "/placeholder-user.jpg",
            matchingType: "コネクター型"
          },
          status: "pending",
          date: "2024-11-20",
          message: "AI事業について相談したいです"
        },
        {
          id: "2",
          user: { 
            name: "佐藤花子", 
            role: "デザイナー",
            company: "Design Lab",
            avatar: "/placeholder-user.jpg",
            matchingType: "クリエイティブ型"
          },
          status: "accepted",
          date: "2024-11-18",
          message: "UIデザインのトレンドについて話しましょう",
          meetingDate: "2024-11-25"
        }
      ])

      setReceivedRequests([
        {
          id: "3",
          user: { 
            name: "田中健一", 
            role: "エンジニア",
            company: "Tech Solutions",
            avatar: "/placeholder-user.jpg",
            matchingType: "ロジック参謀型"
          },
          status: "pending",
          date: "2024-11-19",
          message: "技術的な相談があります"
        }
      ])
    } catch (error) {
      console.error("Failed to fetch requests:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAccept = async (requestId: string) => {
    try {
      // API call would go here
      toast({
        title: "リクエストを承認しました",
        description: "マッチングが成立しました！"
      })
      fetchRequests()
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        variant: "destructive"
      })
    }
  }

  const handleReject = async (requestId: string) => {
    try {
      // API call would go here
      toast({
        title: "リクエストをお断りしました",
      })
      fetchRequests()
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        variant: "destructive"
      })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
            <Clock className="w-3 h-3 mr-1" />
            申請中
          </Badge>
        )
      case "accepted":
        return (
          <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
            <Check className="w-3 h-3 mr-1" />
            成立
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300">
            <X className="w-3 h-3 mr-1" />
            拒否
          </Badge>
        )
    }
  }

  const getMatchingTypeColor = (type: string) => {
    switch (type) {
      case "ロジック参謀型": return "text-blue-600 dark:text-blue-400"
      case "クリエイティブ型": return "text-purple-600 dark:text-purple-400"
      case "コネクター型": return "text-green-600 dark:text-green-400"
      default: return "text-gray-600 dark:text-gray-400"
    }
  }

  const RequestCard = ({ request, type }: { request: DrinkRequest, type: "sent" | "received" }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={request.user.avatar} />
            <AvatarFallback>{request.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold">{request.user.name}</h4>
              {request.user.matchingType && (
                <span className={`text-xs font-medium ${getMatchingTypeColor(request.user.matchingType)}`}>
                  {request.user.matchingType}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {request.user.role} @ {request.user.company}
            </p>
            {request.message && (
              <div className="mt-2 p-2 bg-white dark:bg-gray-900 rounded-lg">
                <p className="text-sm flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  {request.message}
                </p>
              </div>
            )}
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {format(new Date(request.date), "M月d日", { locale: ja })}
              </span>
              {request.meetingDate && (
                <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                  <HandshakeIcon className="w-3 h-3" />
                  {format(new Date(request.meetingDate), "M月d日", { locale: ja })}に会う予定
                </span>
              )}
            </div>
          </div>
        </div>
        {getStatusBadge(request.status)}
      </div>

      {/* Actions */}
      {type === "received" && request.status === "pending" && (
        <div className="flex gap-2 mt-4">
          <Button
            size="sm"
            className="flex-1 bg-green-500 hover:bg-green-600 text-white"
            onClick={() => handleAccept(request.id)}
          >
            <Check className="w-4 h-4 mr-1" />
            承認する
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => handleReject(request.id)}
          >
            <X className="w-4 h-4 mr-1" />
            お断りする
          </Button>
        </div>
      )}

      {request.status === "accepted" && (
        <div className="flex gap-2 mt-4">
          <Button size="sm" variant="outline" className="flex-1">
            <Send className="w-4 h-4 mr-1" />
            メッセージを送る
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Calendar className="w-4 h-4 mr-1" />
            当日確認
          </Button>
        </div>
      )}
    </motion.div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="rounded-2xl shadow-md bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold tracking-wide flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-500" />
            飲みたい申請一覧
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin" />
                <span className="text-gray-600 dark:text-gray-400">読み込み中...</span>
              </div>
            </div>
          ) : (
            <Tabs defaultValue="sent" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="sent">
                  送った申請 ({sentRequests.length})
                </TabsTrigger>
                <TabsTrigger value="received">
                  受けた申請 ({receivedRequests.length})
                  {receivedRequests.filter(r => r.status === "pending").length > 0 && (
                    <Badge className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5">
                      {receivedRequests.filter(r => r.status === "pending").length}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="sent" className="space-y-3">
                {sentRequests.length > 0 ? (
                  <>
                    {sentRequests.map((request) => (
                      <RequestCard key={request.id} request={request} type="sent" />
                    ))}
                    <Link href="/matching" className="block">
                      <Button variant="outline" className="w-full">
                        <Users className="w-4 h-4 mr-2" />
                        他のメンバーを探す
                      </Button>
                    </Link>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      まだ申請を送っていません
                    </p>
                    <Link href="/matching">
                      <Button variant="outline">
                        メンバーを探す
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="received" className="space-y-3">
                {receivedRequests.length > 0 ? (
                  receivedRequests.map((request) => (
                    <RequestCard key={request.id} request={request} type="received" />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      受け取った申請はありません
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}