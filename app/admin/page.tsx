"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, FileText, LogOut, Plus } from "lucide-react"
import { isAuthenticated, logout } from "@/lib/auth"

export default function AdminDashboard() {
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin/login")
    }
  }, [router])

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">管理者ダッシュボード</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            ログアウト
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Events Management */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                イベント管理
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                イベントの作成、編集、削除を行います
              </p>
              <div className="flex gap-3">
                <Link href="/admin/events">
                  <Button variant="outline" className="flex-1">
                    一覧を見る
                  </Button>
                </Link>
                <Link href="/admin/events/new">
                  <Button className="flex-1">
                    <Plus className="w-4 h-4 mr-2" />
                    新規作成
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Blog Management */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                ブログ記事管理
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                ブログ記事の作成、編集、削除を行います
              </p>
              <div className="flex gap-3">
                <Link href="/admin/blog">
                  <Button variant="outline" className="flex-1">
                    一覧を見る
                  </Button>
                </Link>
                <Link href="/admin/blog/new">
                  <Button className="flex-1">
                    <Plus className="w-4 h-4 mr-2" />
                    新規作成
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold mb-4">公開ページ</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/events">
              <Button variant="ghost">イベントページ</Button>
            </Link>
            <Link href="/blog">
              <Button variant="ghost">ブログページ</Button>
            </Link>
            <Link href="/">
              <Button variant="ghost">ホームページ</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}