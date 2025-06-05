"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import ProfileEditor from "@/components/mypage/ProfileEditor"
import VisitReservationManager from "@/components/mypage/VisitReservationManager"
import MembershipStatus from "@/components/mypage/MembershipStatus"
import DrinkRequestList from "@/components/mypage/DrinkRequestList"
import { 
  User, 
  Calendar, 
  CreditCard, 
  Users,
  Sparkles,
  Trophy,
  Building,
  Mail,
  Phone,
  TrendingUp,
  Star,
  Activity,
  Target,
  Zap,
  Award,
  Edit,
  ChevronRight,
  Clock,
  CheckCircle2
} from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export default function MyPage() {
  const { user, profile, loading, membership } = useAuth()
  const router = useRouter()
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login?redirect=/mypage")
    }
  }, [user, loading, router])

  if (loading || !mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <span className="text-gray-600 dark:text-gray-400">読み込み中...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // 実績データ
  const achievements = [
    { icon: TrendingUp, label: "営業利益", value: "2.1億円", change: "+276.5%" },
    { icon: Trophy, label: "EXIT実績", value: "バイアウト成功", status: "completed" },
    { icon: Building, label: "現職", value: "Wiz執行役員", subtitle: "AI戦略本部長" },
    { icon: Zap, label: "専門領域", value: "インサイドセールス", badge: "Pioneer" }
  ]

  // アクティビティデータ
  const recentActivity = [
    { date: "2024-12-25", type: "visit", title: "CHEETAH BAR 来店", status: "completed" },
    { date: "2024-12-20", type: "match", title: "林 尚弘氏とマッチング", status: "completed" },
    { date: "2024-12-15", type: "event", title: "AI戦略セミナー参加", status: "completed" },
    { date: "2025-01-10", type: "visit", title: "次回来店予約", status: "upcoming" }
  ]

  const getMatchingTypeInfo = (type: string) => {
    switch (type) {
      case "ロジック参謀型":
        return {
          color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800",
          icon: Target,
          description: "戦略的思考と分析力で、ビジネスの成長を支援"
        }
      default:
        return {
          color: "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300",
          icon: Star,
          description: ""
        }
    }
  }

  const matchingInfo = getMatchingTypeInfo(profile?.matching_type || "")

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with Profile */}
      <section className="relative bg-gradient-to-br from-primary/5 via-white to-amber-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-primary/10 pb-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="container mx-auto px-4 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto"
          >
            {/* Profile Header */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Avatar & Basic Info */}
                <div className="flex flex-col sm:flex-row gap-6 items-start flex-1">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <div className="w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-white dark:ring-gray-700 shadow-xl">
                      <Image
                        src={profile?.avatar_url || "/placeholder-user.jpg"}
                        alt={profile?.full_name || ""}
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                  </motion.div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                          {profile?.full_name}
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                          {profile?.position} @ {profile?.company_name}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="hidden sm:flex items-center gap-2"
                        onClick={() => document.getElementById('profile-tab')?.click()}
                      >
                        <Edit className="w-4 h-4" />
                        編集
                      </Button>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {profile?.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {profile?.phone}
                      </div>
                    </div>

                    {/* Matching Type Badge */}
                    {profile?.matching_type && (
                      <div className={`inline-flex items-center gap-3 px-4 py-3 rounded-xl border ${matchingInfo.color}`}>
                        <matchingInfo.icon className="w-5 h-5" />
                        <div>
                          <p className="font-semibold">{profile.matching_type}</p>
                          <p className="text-xs opacity-80">{matchingInfo.description}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Membership Status Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-full lg:w-80"
                >
                  <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-800 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        会員ステータス
                      </h3>
                      <Badge className="bg-amber-600 text-white">
                        {membership?.tier?.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">利用可能特典</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          プレミアムドリンク無料・優先予約
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">次回更新日</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          2025年1月1日
                        </p>
                      </div>
                      <Progress value={80} className="h-2" />
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        今月の来店: 4回 / 5回
                      </p>
                    </div>
                  </Card>
                </motion.div>
              </div>

              {/* Bio */}
              {profile?.bio && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-8 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl"
                >
                  <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    プロフィール
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {profile.bio}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Achievement Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <Card className="p-6 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <achievement.icon className="w-8 h-8 text-primary" />
                      {achievement.change && (
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          {achievement.change}
                        </Badge>
                      )}
                      {achievement.status === "completed" && (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      )}
                      {achievement.badge && (
                        <Badge variant="secondary">{achievement.badge}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {achievement.label}
                    </p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {achievement.value}
                    </p>
                    {achievement.subtitle && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {achievement.subtitle}
                      </p>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList className="grid grid-cols-2 lg:grid-cols-5 w-full bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                <TabsTrigger value="overview" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                  <Activity className="w-4 h-4 mr-2" />
                  概要
                </TabsTrigger>
                <TabsTrigger value="profile" id="profile-tab" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                  <User className="w-4 h-4 mr-2" />
                  プロフィール
                </TabsTrigger>
                <TabsTrigger value="reservations" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  予約
                </TabsTrigger>
                <TabsTrigger value="matching" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                  <Users className="w-4 h-4 mr-2" />
                  マッチング
                </TabsTrigger>
                <TabsTrigger value="membership" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                  <CreditCard className="w-4 h-4 mr-2" />
                  会員情報
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Recent Activity */}
                  <div className="lg:col-span-2">
                    <Card className="p-6">
                      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        最近のアクティビティ
                      </h3>
                      <div className="space-y-4">
                        {recentActivity.map((activity, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                activity.status === "completed" 
                                  ? "bg-green-100 dark:bg-green-900/30" 
                                  : "bg-blue-100 dark:bg-blue-900/30"
                              }`}>
                                {activity.type === "visit" && <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />}
                                {activity.type === "match" && <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                                {activity.type === "event" && <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {activity.title}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {activity.date}
                                </p>
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </motion.div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <Card className="p-6">
                      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-primary" />
                        クイックアクション
                      </h3>
                      <div className="space-y-3">
                        <Button className="w-full justify-start" variant="outline">
                          <Calendar className="w-4 h-4 mr-2" />
                          新規予約を作成
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <Users className="w-4 h-4 mr-2" />
                          マッチング申請を見る
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <CreditCard className="w-4 h-4 mr-2" />
                          プランをアップグレード
                        </Button>
                      </div>
                    </Card>

                    {/* Interests & Challenges */}
                    <Card className="p-6 mt-6">
                      <h3 className="text-lg font-semibold mb-4">興味・関心</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {profile?.interests?.map((interest) => (
                          <Badge key={interest} variant="secondary">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-4">課題・ニーズ</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile?.challenges?.map((challenge) => (
                          <Badge key={challenge} variant="outline">
                            {challenge}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <ProfileEditor />
              </TabsContent>

              {/* Reservations Tab */}
              <TabsContent value="reservations">
                <VisitReservationManager />
              </TabsContent>

              {/* Matching Tab */}
              <TabsContent value="matching">
                <DrinkRequestList />
              </TabsContent>

              {/* Membership Tab */}
              <TabsContent value="membership">
                <MembershipStatus />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </main>
  )
}