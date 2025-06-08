"use client"

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { getBlurDataURL } from '@/lib/image-utils'
import { useIntersection } from '@/hooks/use-intersection'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  sizes?: string
  quality?: number
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  sizes = '100vw',
  quality = 75,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [ref, isIntersecting] = useIntersection({
    rootMargin: '50px',
    freezeOnceVisible: true,
  })

  const shouldLoad = priority || isIntersecting

  return (
    <div ref={ref} className={`relative ${className}`}>
      {shouldLoad && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          fill={!width || !height}
          quality={quality}
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={getBlurDataURL()}
          className={`${className} transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
        />
      )}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
      )}
    </div>
  )
}