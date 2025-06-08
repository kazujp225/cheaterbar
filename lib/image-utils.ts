export const getBlurDataURL = () => {
  // Ultra-optimized blur placeholder - minimal SVG
  const blurSvg = `<svg width="8" height="8" xmlns="http://www.w3.org/2000/svg"><rect width="8" height="8" fill="#e5e7eb"/></svg>`
  const base64 = typeof window === 'undefined' 
    ? Buffer.from(blurSvg).toString('base64')
    : btoa(blurSvg)
  return `data:image/svg+xml;base64,${base64}`
}

// 重要な画像のプリロード
export const preloadImages = (images: string[]) => {
  if (typeof window === 'undefined') return

  images.forEach((src) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)
  })
}

// Unsplash画像の最適化パラメータ - 品質を75に下げてサイズ削減
export const getOptimizedImageUrl = (url: string, width: number = 400, quality: number = 75) => {
  if (!url || typeof url !== 'string' || !url.includes('unsplash.com')) return url
  
  const baseUrl = url.split('?')[0]
  return `${baseUrl}?q=${quality}&w=${width}&auto=format&fit=crop`
}