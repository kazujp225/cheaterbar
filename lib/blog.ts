export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage?: string
  category: string[]
  tags: string[]
  published: boolean
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

// Local storage key
const BLOG_KEY = 'cheetah_bar_blog_posts'

// Generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]+/g, '-')
    .replace(/^-|-$/g, '')
}

// Get all blog posts
export const getBlogPosts = (includeUnpublished = false): BlogPost[] => {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(BLOG_KEY)
  const posts = stored ? JSON.parse(stored) : []
  
  if (includeUnpublished) {
    return posts
  }
  
  return posts.filter((post: BlogPost) => post.published)
}

// Get single blog post by ID
export const getBlogPost = (id: string): BlogPost | null => {
  const posts = getBlogPosts(true)
  return posts.find(post => post.id === id) || null
}

// Get blog post by slug
export const getBlogPostBySlug = (slug: string): BlogPost | null => {
  const posts = getBlogPosts()
  return posts.find(post => post.slug === slug) || null
}

// Create blog post
export const createBlogPost = (postData: Omit<BlogPost, 'id' | 'slug' | 'createdAt' | 'updatedAt'>): BlogPost => {
  const posts = getBlogPosts(true)
  const newPost: BlogPost = {
    ...postData,
    id: Date.now().toString(),
    slug: generateSlug(postData.title),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: postData.published ? new Date().toISOString() : undefined
  }
  posts.unshift(newPost) // Add to beginning
  localStorage.setItem(BLOG_KEY, JSON.stringify(posts))
  return newPost
}

// Update blog post
export const updateBlogPost = (id: string, postData: Partial<BlogPost>): BlogPost | null => {
  const posts = getBlogPosts(true)
  const index = posts.findIndex(post => post.id === id)
  if (index === -1) return null
  
  const wasPublished = posts[index].published
  const isNowPublished = postData.published !== undefined ? postData.published : wasPublished
  
  posts[index] = {
    ...posts[index],
    ...postData,
    id,
    slug: postData.title ? generateSlug(postData.title) : posts[index].slug,
    updatedAt: new Date().toISOString(),
    publishedAt: !wasPublished && isNowPublished ? new Date().toISOString() : posts[index].publishedAt
  }
  localStorage.setItem(BLOG_KEY, JSON.stringify(posts))
  return posts[index]
}

// Delete blog post
export const deleteBlogPost = (id: string): boolean => {
  const posts = getBlogPosts(true)
  const filtered = posts.filter(post => post.id !== id)
  if (filtered.length === posts.length) return false
  
  localStorage.setItem(BLOG_KEY, JSON.stringify(filtered))
  return true
}

// Get posts by category
export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  const posts = getBlogPosts()
  return posts.filter(post => post.category.includes(category))
}

// Get posts by tag
export const getBlogPostsByTag = (tag: string): BlogPost[] => {
  const posts = getBlogPosts()
  return posts.filter(post => post.tags.includes(tag))
}

// Get recent posts
export const getRecentBlogPosts = (limit = 5): BlogPost[] => {
  const posts = getBlogPosts()
  return posts.slice(0, limit)
}