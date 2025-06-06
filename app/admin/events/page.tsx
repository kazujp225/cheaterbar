"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Calendar,
  LogOut,
  Eye
} from "lucide-react"
import { isAuthenticated, logout } from "@/lib/auth"
import { getEvents, deleteEvent, Event } from "@/lib/events"
import { format } from "date-fns"
import { ja } from "date-fns/locale"

export default function AdminEventsPage() {
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([])
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin/login")
      return
    }
    setEvents(getEvents())
  }, [router])

  const handleDelete = (id: string) => {
    if (deleteEvent(id)) {
      setEvents(events.filter(e => e.id !== id))
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
          <h1 className="text-3xl font-bold">イベント管理</h1>
          <div className="flex gap-4">
            <Link href="/admin/events/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                新規イベント
              </Button>
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              ログアウト
            </Button>
          </div>
        </div>

        {events.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500 mb-4">まだイベントがありません</p>
              <Link href="/admin/events/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  最初のイベントを作成
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {events.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(event.date), "yyyy年MM月dd日", { locale: ja })}
                        </span>
                        <span>{event.time}</span>
                        <span>{event.location}</span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        {event.category.map((cat) => (
                          <span
                            key={cat}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Link href={`/events/${event.id}`}>
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/events/${event.id}/edit`}>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setDeleteConfirm(event.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>

                  {deleteConfirm === event.id && (
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
                            onClick={() => handleDelete(event.id)}
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