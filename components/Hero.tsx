"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { getBlurDataURL, getOptimizedImageUrl } from "@/lib/image-utils"

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={getOptimizedImageUrl("https://images.unsplash.com/photo-1514933651103-005eec06c04b", 3474, 90)}
          alt="CHEETAH BAR Interior"
          fill
          className="object-cover"
          priority={true}
          loading="eager"
          placeholder="blur"
          blurDataURL={getBlurDataURL()}
        />
        {/* Static Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-amber-500/10" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <div className="text-center max-w-6xl mx-auto relative">
          {/* Bold Title with Gradient */}
          <div>
            <h1 className="relative mb-2">
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400 uppercase leading-[0.85]">
                CHEETAH
              </span>
            </h1>
            
            <div className="relative">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-[0.15em] md:tracking-[0.2em] lg:tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-500 to-orange-500 uppercase leading-[0.85]">
                BAR
              </h2>
            </div>
          </div>

          {/* Tagline */}
          <div className="mt-12 space-y-2">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-extralight tracking-wide">
              Where Ideas 
              <span className="text-primary font-semibold mx-2">Sprint</span>
              to Life
            </p>
            
            {/* Japanese */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 font-extralight tracking-wide">
              起業家たちの加速装置
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 md:mt-14 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
            <Link href="/contact">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-white text-black hover:bg-gray-100 px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg font-medium tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-2xl w-full sm:w-auto"
              >
                Reserve Now
              </Button>
            </Link>
            
            <Link href="/membership">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-white hover:bg-primary hover:border-primary px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg font-medium tracking-wider uppercase transition-all duration-300 hover:scale-105 backdrop-blur-sm w-full sm:w-auto"
              >
                Membership
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer" onClick={scrollToNext}>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-[0.3em] text-white/60">Scroll</span>
            <ChevronDown className="w-8 h-8 text-white/60 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Client-side animations - only after mount */}
      {mounted && (
        <>
          {/* Import and use framer-motion dynamically */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Add subtle animations after hydration
                if (typeof window !== 'undefined') {
                  const title = document.querySelector('h1 span');
                  const subtitle = document.querySelector('h2');
                  if (title) title.style.animation = 'fadeInUp 1s ease-out';
                  if (subtitle) subtitle.style.animation = 'fadeInUp 1s ease-out 0.2s both';
                }
              `
            }}
          />
          <style jsx>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </>
      )}
    </section>
  )
}