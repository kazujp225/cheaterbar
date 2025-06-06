"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Plus, 
  Edit, 
  Trash2, 
  FileText,
  LogOut,
  Eye,
  Calendar,
  Clock
} from "lucide-react"
import { isAuthenticated, logout } from "@/lib/auth"
import { getBlogPosts, deleteBlogPost, BlogPost } from "@/lib/blog"
import { format } from "date-fns"
import { ja } from "date-fns/locale"

export default function AdminBlogPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin/login")
      return
    }
    setPosts(getBlogPosts(true)) // Include unpublished posts
  }, [router])

  const handleDelete = (id: string) => {
    if (deleteBlogPost(id)) {
      setPosts(posts.filter(p => p.id !== id))
      setDeleteConfirm(null)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">ブログ記事管理</h1>
          <div className="flex gap-4">
            <Link href="/admin/events">
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                イベント管理
              </Button>
            </Link>
            <Link href="/admin/blog/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                新規記事
              </Button>
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              ログアウト
            </Button>
          </div>
        </div>

        {posts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500 mb-4">まだブログ記事がありません</p>
              <Link href="/admin/blog/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  最初の記事を作成
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{post.title}</h3>
                        {!post.published && (
                          <Badge variant="secondary">下書き</Badge>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.publishedAt 
                            ? format(new Date(post.publishedAt), "yyyy年MM月dd日", { locale: ja })
                            : format(new Date(post.createdAt), "yyyy年MM月dd日", { locale: ja }) + " (作成)"
                          }
                        </span>
                        <span>slug: {post.slug}</span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        {post.category.map((cat) => (
                          <span
                            key={cat}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                          >
                            {cat}
                          </span>
                        ))}
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      {post.published && (
                        <Link href={`/blog/${post.slug}`}>
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                      )}
                      <Link href={`/admin/blog/${post.id}/edit`}>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setDeleteConfirm(post.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>

                  {deleteConfirm === post.id && (
                    <Alert className="mt-4">
                      <AlertDescription className="flex items-center justify-between">
                        <span>本当に削除しますか？</span>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDeleteConfirm(null)}
                          >
                            キャンセル
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(post.id)}
                          >
                            削除
                          </Button>
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}