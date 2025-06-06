"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin } from "lucide-react"
import { getEvents, Event } from "@/lib/events"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { getBlurDataURL, getOptimizedImageUrl } from "@/lib/image-utils"
import Link from "next/link"

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setEvents(getEvents())
    setLoading(false)
  }, [])

  const upcomingEvents = events.filter(
    (event) => new Date(event.date) >= new Date()
  )
  const pastEvents = events.filter(
    (event) => new Date(event.date) < new Date()
  )

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={getOptimizedImageUrl(
              "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1920",
              1920
            )}
            alt="Events"
            fill
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL={getBlurDataURL()}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              イベント
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              起業家が集い、アイデアが生まれる特別な夜
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Content */}
      <div className="container mx-auto px-4 py-16">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">読み込み中...</p>
          </div>
        ) : events.length === 0 ? (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="text-center py-12">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-xl text-gray-600 dark:text-gray-400">
                現在予定されているイベントはありません
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
              <section className="mb-16">
                <h2 className="text-3xl font-bold mb-8">開催予定のイベント</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Link href={`/events/${event.id}`}>
                        <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden group">
                          {event.imageUrl && (
                            <div className="relative h-48 overflow-hidden">
                              <Image
                                src={getOptimizedImageUrl(event.imageUrl, 800)}
                                alt={event.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                loading="lazy"
                                placeholder="blur"
                                blurDataURL={getBlurDataURL()}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                          )}
                          <CardHeader>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {event.category.map((cat) => (
                                <Badge key={cat} variant="secondary" className="text-xs">
                                  {cat}
                                </Badge>
                              ))}
                            </div>
                            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                              {event.title}
                            </h3>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                              {event.description}
                            </p>
                            <div className="space-y-2 text-sm text-gray-500">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {format(new Date(event.date), "yyyy年MM月dd日", {
                                    locale: ja,
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>{event.location}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Past Events */}
            {pastEvents.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold mb-8 text-gray-600 dark:text-gray-400">
                  過去のイベント
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="h-full opacity-75 hover:opacity-100 transition-opacity duration-300">
                        {event.imageUrl && (
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={getOptimizedImageUrl(event.imageUrl, 800)}
                              alt={event.title}
                              fill
                              className="object-cover"
                              loading="lazy"
                              placeholder="blur"
                              blurDataURL={getBlurDataURL()}
                            />
                            <div className="absolute inset-0 bg-black/40" />
                          </div>
                        )}
                        <CardHeader>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {event.category.map((cat) => (
                              <Badge key={cat} variant="outline" className="text-xs">
                                {cat}
                              </Badge>
                            ))}
                          </div>
                          <h3 className="text-xl font-semibold">{event.title}</h3>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                            {event.description}
                          </p>
                          <div className="text-sm text-gray-500">
                            {format(new Date(event.date), "yyyy年MM月dd日", {
                              locale: ja,
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </main>
  )
}