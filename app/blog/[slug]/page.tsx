"use client"

import { useEffect, useState } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { getBlogPostBySlug, getBlogPosts, BlogPost } from "@/lib/blog"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { getBlurDataURL, getOptimizedImageUrl } from "@/lib/image-utils"

// Simple Markdown parser
function parseMarkdown(text: string): string {
  return text
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
    // Bold
    .replace(/\*\*(.*)\*\*/g, '<strong class="font-semibold">$1</strong>')
    // Italic
    .replace(/\*(.*)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
    // Line breaks
    .replace(/\n\n/g, '</p><p class="mb-4">')
    // Lists
    .replace(/^\* (.+)$/gim, '<li class="ml-6 list-disc">$1</li>')
    .replace(/(<li.*<\/li>)/s, '<ul class="mb-4">$1</ul>')
    // Wrap in paragraphs
    .replace(/^(?!<[h|u|l])(.+)$/gim, '<p class="mb-4">$1</p>')
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const postData = getBlogPostBySlug(params.slug)
    if (!postData) {
      notFound()
    }
    setPost(postData)

    // Get related posts (same category or recent posts)
    const allPosts = getBlogPosts()
    const related = allPosts
      .filter(p => 
        p.id !== postData.id && 
        (p.category.some(cat => postData.category.includes(cat)) || allPosts.indexOf(p) < 3)
      )
      .slice(0, 3)
    setRelatedPosts(related)
    
    setLoading(false)
  }, [params.slug])

  if (loading || !post) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-black pt-20">
        <div className="container mx-auto px-4 py-16">
          <p className="text-center text-gray-500">読み込み中...</p>
        </div>
      </main>
    )
  }

  const readingTime = Math.ceil(post.content.length / 400)

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black pt-20">
      {/* Hero Section with Cover Image */}
      {post.coverImage && (
        <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <Image
            src={getOptimizedImageUrl(post.coverImage, 1920)}
            alt={post.title}
            fill
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL={getBlurDataURL()}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </section>
      )}

      <article className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back Button */}
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                ブログ一覧へ
              </Button>
            </Link>

            {/* Article Header */}
            <header className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.category.map((cat) => (
                  <Badge key={cat} variant="secondary">
                    {cat}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(post.publishedAt || post.createdAt), "yyyy年MM月dd日", {
                    locale: ja,
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {readingTime}分で読了
                </span>
              </div>

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm text-gray-500 dark:text-gray-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Article Content */}
            <div 
              className="prose prose-lg dark:prose-invert max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
            />

            <Separator className="my-12" />

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6">関連記事</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                      <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                        {relatedPost.coverImage && (
                          <div className="relative h-40 overflow-hidden">
                            <Image
                              src={getOptimizedImageUrl(relatedPost.coverImage, 400)}
                              alt={relatedPost.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                              loading="lazy"
                              placeholder="blur"
                              blurDataURL={getBlurDataURL()}
                            />
                          </div>
                        )}
                        <CardContent className="p-4">
                          <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors mb-2">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {format(new Date(relatedPost.publishedAt || relatedPost.createdAt), "yyyy.MM.dd")}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </motion.div>
        </div>
      </article>
    </main>
  )
}