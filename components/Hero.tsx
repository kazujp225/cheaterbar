"use client"

import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { getBlurDataURL, getOptimizedImageUrl } from "@/lib/image-utils"

export default function Hero() {
  const [currentTime, setCurrentTime] = useState("00:00")
  const [isLoaded, setIsLoaded] = useState(false)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const titleScale = useTransform(scrollY, [0, 200], [1, 0.95])
  
  useEffect(() => {
    setIsLoaded(true)
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      setCurrentTime(`${hours}:${minutes}`)
    }
    
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        <Image
          src={getOptimizedImageUrl("https://images.unsplash.com/photo-1514933651103-005eec06c04b", 3474, 90)}
          alt="CHEETAH BAR Interior"
          fill
          className="object-cover scale-110"
          priority={true}
          loading="eager"
          placeholder="blur"
          blurDataURL={getBlurDataURL()}
        />
        {/* Dynamic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-amber-500/10" />
        
        {/* Animated Gradient Orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-primary/30 via-amber-500/30 to-orange-500/30 rounded-full blur-3xl" />
        </motion.div>
      </motion.div>

      {/* Floating Time Display */}
      <motion.div
        className="absolute top-4 right-4 md:top-10 md:right-10 text-white/90 backdrop-blur-sm bg-black/20 p-3 md:p-4 rounded-lg"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] mb-1 text-primary font-medium">Tokyo</p>
          <p className="text-xl md:text-2xl font-light tracking-wider tabular-nums">{currentTime}</p>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 flex h-full flex-col items-center justify-center px-4"
        style={{ opacity, scale: titleScale }}
      >
        <div className="text-center max-w-6xl mx-auto relative">
          {/* Decorative background elements */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-primary/20 to-amber-500/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-tr from-orange-500/15 to-primary/15 rounded-full blur-2xl animate-pulse" />
          
          {/* Bold Title with Gradient */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h1 className="relative mb-2">
              <motion.span 
                className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400 uppercase leading-[0.85]"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                CHEETAH
              </motion.span>
              
              {/* Glowing effect behind text */}
              <motion.div
                className="absolute inset-0 blur-xl opacity-50"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-500 to-orange-500 uppercase leading-[0.85]">
                  CHEETAH
                </span>
              </motion.div>
              
              {/* Additional light rays */}
              <motion.div
                className="absolute inset-0 -z-10"
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-2 bg-gradient-to-r from-transparent via-primary/30 to-transparent blur-sm" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-[120%] bg-gradient-to-b from-transparent via-amber-500/30 to-transparent blur-sm" />
              </motion.div>
            </h1>
            
            <div className="relative">
              <motion.h2 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-[0.15em] md:tracking-[0.2em] lg:tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-500 to-orange-500 uppercase leading-[0.85]"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                BAR
              </motion.h2>
              
              {/* Animated underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent origin-left"
              />
              
              {/* Additional shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>

          {/* Enhanced Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-12 space-y-2"
          >
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-extralight tracking-wide">
              Where Ideas 
              <motion.span
                className="text-primary font-semibold mx-2"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Sprint
              </motion.span>
              to Life
            </p>
            
            {/* Japanese with animation */}
            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 font-extralight tracking-wide"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              起業家たちの加速装置
            </motion.p>
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mt-10 md:mt-14 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4"
          >
            <Link href="/contact">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-white text-black hover:bg-white px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg font-medium tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-2xl w-full sm:w-auto"
              >
                <span className="relative z-10">Reserve Now</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary via-amber-500 to-primary"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  Reserve Now
                </motion.span>
              </Button>
            </Link>
            
            <Link href="/membership">
              <Button
                size="lg"
                variant="outline"
                className="group border-2 border-primary text-white hover:bg-primary hover:border-primary px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg font-medium tracking-wider uppercase transition-all duration-300 hover:scale-105 backdrop-blur-sm w-full sm:w-auto"
              >
                <span className="group-hover:scale-110 transition-transform duration-300">
                  Membership
                </span>
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={scrollToNext}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-white/60">Scroll</span>
            <div className="relative">
              <ChevronDown className="w-8 h-8 text-white/60" />
              <motion.div
                className="absolute inset-0"
                animate={{
                  y: [0, 10, 20],
                  opacity: [1, 0.5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
              >
                <ChevronDown className="w-8 h-8 text-primary" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Ambient Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => {
          // 固定値を使用してSSRとクライアントの一貫性を保つ
          const size = (i * 0.13 + 1)
          const xPos = (i * 3.37) % 100
          const duration = 20 + (i * 0.5)
          const delay = i * 0.33
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size + 'px',
                height: size + 'px',
                background: `radial-gradient(circle, ${i % 2 === 0 ? '#FFD700' : '#FFF'} 0%, transparent 70%)`,
              }}
              initial={{ 
                x: `${xPos}%`,
                y: "110%",
                opacity: 0
              }}
              animate={{ 
                y: "-10%",
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                delay: delay
              }}
            />
          )
        })}
      </div>
    </section>
  )
}