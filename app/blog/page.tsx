"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ChevronRight } from "lucide-react"
import { getBlogPosts, BlogPost } from "@/lib/blog"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { getBlurDataURL, getOptimizedImageUrl } from "@/lib/image-utils"

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setPosts(getBlogPosts())
    setLoading(false)
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              ブログ
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              起業家のインサイト、ビジネストレンド、CHEETAH BARの最新情報をお届けします
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Content */}
      <div className="container mx-auto px-4 py-16">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">読み込み中...</p>
          </div>
        ) : posts.length === 0 ? (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-400">
                まだブログ記事がありません
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    {post.coverImage && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={getOptimizedImageUrl(post.coverImage, 800)}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          loading={index < 3 ? "eager" : "lazy"}
                          placeholder="blur"
                          blurDataURL={getBlurDataURL()}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        
                        {/* Categories on image */}
                        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                          {post.category.map((cat) => (
                            <Badge
                              key={cat}
                              className="bg-white/90 text-gray-800 hover:bg-white"
                            >
                              {cat}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <CardHeader className="pb-3">
                      {!post.coverImage && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.category.map((cat) => (
                            <Badge key={cat} variant="secondary">
                              {cat}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <h2 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(post.publishedAt || post.createdAt), "yyyy.MM.dd")}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {Math.ceil(post.content.length / 400)}分で読了
                        </span>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs text-gray-500 dark:text-gray-400"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 mt-4 text-primary group-hover:gap-3 transition-all">
                        <span className="text-sm font-medium">続きを読む</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}