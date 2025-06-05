"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Calendar, Clock, Users } from "lucide-react"
import { useEffect, useState } from "react"

export default function EventHero() {
  const [currentDate, setCurrentDate] = useState("")
  
  useEffect(() => {
    const updateDate = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
      }
      setCurrentDate(now.toLocaleDateString('ja-JP', options))
    }
    
    updateDate()
    const interval = setInterval(updateDate, 1000 * 60) // Update every minute
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=3474"
          alt="CHEETAH BAR Events"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Enhanced Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-amber-500/10" />
        
        {/* Neon-style animated overlay */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(255, 165, 0, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Floating Date Display */}
      <motion.div
        className="absolute top-10 right-10 text-white/90 backdrop-blur-sm bg-black/30 p-6 rounded-xl border border-primary/30"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.3em] mb-2 text-primary font-medium">Today</p>
          <p className="text-lg font-light tracking-wide">{currentDate}</p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Icon with animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              duration: 1.2, 
              type: "spring", 
              stiffness: 80,
              delay: 0.3 
            }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary/20 to-amber-500/20 rounded-full backdrop-blur-sm border border-primary/30">
              <Calendar className="w-10 h-10 text-primary" />
            </div>
          </motion.div>
          
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h1 className="mb-4">
              <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-300 uppercase leading-tight">
                EVENT
              </span>
              <span className="block text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-500 to-orange-500 uppercase leading-tight">
                CALENDAR
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-12"
          >
            <p className="text-xl md:text-2xl lg:text-3xl text-white font-light tracking-wide mb-4">
              毎月、出会いと
              <motion.span
                className="text-primary font-semibold mx-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                加速
              </motion.span>
              が起こる夜
            </p>
            
            <motion.p
              className="text-lg md:text-xl text-gray-400 font-light"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              起業家たちのネットワーキングイベント
            </motion.p>
          </motion.div>

          {/* Stats/Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            <div className="backdrop-blur-sm bg-black/30 p-6 rounded-xl border border-white/10">
              <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-1">50+</h3>
              <p className="text-gray-400 text-sm">Monthly Participants</p>
            </div>
            
            <div className="backdrop-blur-sm bg-black/30 p-6 rounded-xl border border-white/10">
              <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-1">4</h3>
              <p className="text-gray-400 text-sm">Events per Month</p>
            </div>
            
            <div className="backdrop-blur-sm bg-black/30 p-6 rounded-xl border border-white/10">
              <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-1">19:00</h3>
              <p className="text-gray-400 text-sm">Standard Start Time</p>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-white/60">Scroll for Events</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-primary rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Ambient Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => {
          // 固定値を使用してSSRとクライアントの一貫性を保つ
          const size = (i * 0.15 + 1)
          const xPos = (i * 5.23) % 100
          const duration = 25 + (i * 0.8)
          const delay = i * 0.5
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size + 'px',
                height: size + 'px',
                background: `radial-gradient(circle, ${i % 2 === 0 ? '#FFD700' : '#FFA500'} 0%, transparent 70%)`,
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