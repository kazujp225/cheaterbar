'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import UserSidebar from '@/components/mypage/UserSidebar'
import UserDashboardMain from '@/components/mypage/UserDashboardMain'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, QrCode } from 'lucide-react'
import Link from 'next/link'

export default function MyPage() {
  const { user, profile, membership, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  if (loading || !user || !profile || !membership) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* ヘッダー */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-3xl">🐆</span>
              マイページ
            </h1>
            <div className="flex items-center gap-2">
              <Link href="/mypage/card">
                <Button variant="outline" size="sm">
                  <QrCode className="h-4 w-4 mr-2" />
                  会員証
                </Button>
              </Link>
              {/* モバイル用メニュー */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <div className="py-4">
                    <UserSidebar profile={profile} membership={membership} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[350px_1fr] gap-8">
          {/* 左サイドバー（デスクトップのみ表示） */}
          <aside className="hidden lg:block">
            <div className="sticky top-8">
              <UserSidebar profile={profile} membership={membership} />
            </div>
          </aside>

          {/* 右メインエリア */}
          <main>
            <UserDashboardMain userId={user.id} />
          </main>
        </div>
      </div>
    </div>
  )
}