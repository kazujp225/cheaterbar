export const getBlurDataURL = () => {
  // 小さな透明な画像をBase64エンコード
  const blurSvg = `
    <svg width="400" height="300" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <filter id="blur">
          <feGaussianBlur stdDeviation="20" />
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="#000000" filter="url(#blur)" />
    </svg>
  `
  const base64 = Buffer.from(blurSvg).toString('base64')
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

// Unsplash画像の最適化パラメータ
export const getOptimizedImageUrl = (url: string, width: number = 1920, quality: number = 80) => {
  if (!url.includes('unsplash.com')) return url
  
  const baseUrl = url.split('?')[0]
  return `${baseUrl}?q=${quality}&w=${width}&auto=format&fit=crop`
}