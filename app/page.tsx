"use client"

import Hero from "@/components/Hero"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Sparkles, Clock, MapPin, Calendar, Users } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <main ref={containerRef} className="min-h-screen bg-black text-white">
      <section id="hero">
        <Hero />
      </section>
      
      {/* Concept Section - Full width image with text overlay */}
      <section id="concept" className="relative h-screen flex items-center overflow-hidden">
        {/* Section separator gradient */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black to-transparent z-20" />
        <motion.div 
          className="absolute inset-0"
          style={{ scale }}
        >
          <Image
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=3474"
            alt="Premium bar interior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-amber-500/5" />
        </motion.div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-thin tracking-wider mb-4 sm:mb-6 leading-[0.9]">
              The Space for
              <span className="block text-primary font-extralight">Visionaries</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-extralight text-gray-300 mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
              起業家たちが集い、アイデアが交差し、
              新たなビジネスが生まれる場所。
              CHEETAH BARは、あなたの野心を加速させる。
            </p>
            <Link href="/about">
              <Button 
                size="lg"
                variant="ghost"
                className="group text-white border-white/30 hover:bg-white/10 hover:border-white/60 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                私たちのストーリー
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Menu Preview - Split screen */}
      <section id="menu" className="relative min-h-screen flex flex-col lg:flex-row">
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-amber-500/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-tr from-orange-500/15 to-primary/15 rounded-full blur-3xl animate-pulse" />
        {/* Text Content */}
        <motion.div 
          className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-primary mb-6">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm uppercase tracking-[0.2em] font-medium">Premium Selection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-thin mb-4 sm:mb-6 tracking-wide leading-[0.9]">
              Curated
              <span className="block font-extralight">Cocktails & Cuisine</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-6 sm:mb-8 leading-relaxed font-light">
              世界各地から厳選された最高級のスピリッツと、
              シェフが腕を振るう創作料理。
              あなたの五感を刺激する、特別な体験をお届けします。
            </p>
            <Link href="/menu">
              <Button 
                size="lg"
                className="group bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-4 sm:py-5 text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden"
              >
                <span className="relative z-10">メニューを見る</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </Link>
          </div>
        </motion.div>
        
        {/* Image Grid */}
        <div className="flex-1 relative h-[600px] lg:h-auto">
          <div className="absolute inset-0 grid grid-cols-2 gap-2 p-2">
            <motion.div 
              className="relative overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=3470"
                alt="Premium cocktail"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
            <motion.div 
              className="relative overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=3474"
                alt="Gourmet dish"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
            <motion.div 
              className="relative overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=3469"
                alt="Wine selection"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
            <motion.div 
              className="relative overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=3458"
                alt="Premium spirits"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section - Parallax background */}
      <section id="experience" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-gradient-to-r from-primary/30 to-amber-500/30 rounded-full blur-xl animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}} />
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-orange-500/20 to-primary/20 rounded-full blur-2xl animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}} />
        <motion.div 
          className="absolute inset-0"
          style={{ y: useTransform(scrollYProgress, [0.3, 0.7], [0, -200]) }}
        >
          <Image
            src="https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=3488"
            alt="Networking event"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-amber-500/10" />
        </motion.div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-thin tracking-wider mb-6 sm:mb-8 leading-[0.9]">
              Accelerate Your Network
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 leading-relaxed font-extralight px-4 sm:px-0">
              毎晩、起業家やビジネスリーダーが集まり、
              新たなコネクションが生まれています。
              あなたのビジネスを次のステージへ。
            </p>
            
            {/* Features Grid */}
            <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
                whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.3 } }}
                className="text-center"
              >
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-light mb-2">Exclusive Network</h3>
                <p className="text-sm sm:text-base text-gray-400">厳選された会員制コミュニティ</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
                whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.3 } }}
                className="text-center"
              >
                <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-light mb-2">Premium Events</h3>
                <p className="text-sm sm:text-base text-gray-400">起業家向け特別イベント</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
                whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.3 } }}
                className="text-center"
              >
                <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-light mb-2">VIP Experience</h3>
                <p className="text-sm sm:text-base text-gray-400">特別な体験をあなたに</p>
              </motion.div>
            </div>
            
            <Link href="/membership">
              <Button 
                size="lg"
                className="group bg-white text-black hover:bg-gray-200 px-6 sm:px-10 py-5 sm:py-6 text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden"
              >
                <span className="relative z-10">会員について詳しく見る</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-amber-500/10"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="relative">
        {/* Enhanced background pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-50" />
        <div className="grid lg:grid-cols-2">
          {/* Map/Image Side */}
          <div className="relative h-[500px] lg:h-[700px]">
            <Image
              src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=3474"
              alt="Tokyo night view"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <MapPin className="h-8 w-8 text-primary mb-2" />
              <h3 className="text-2xl font-light mb-2">Roppongi, Tokyo</h3>
              <p className="text-lg text-gray-300">六本木の中心で、特別な夜を</p>
            </div>
          </div>
          
          {/* Info Side */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 sm:p-12 lg:p-20 flex items-center relative">
            {/* Decorative corner element */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/10 to-transparent" />
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-thin mb-4 sm:mb-6 tracking-wide">
                Visit Us Tonight
              </h2>
              <div className="space-y-6 text-gray-300">
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="text-white text-base sm:text-lg mb-1">営業時間</h4>
                    <p className="text-sm sm:text-base">月曜日〜土曜日: 18:00 - 26:00</p>
                    <p className="text-xs sm:text-sm text-gray-500">日曜・祝日定休</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="text-white text-base sm:text-lg mb-1">アクセス</h4>
                    <p className="text-sm sm:text-base">東京都港区六本木3-12-5</p>
                    <p className="text-sm sm:text-base">CHEETAH BUILDING 3F</p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-2">六本木駅より徒歩5分</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
                <Link href="/access">
                  <Button 
                    variant="outline"
                    className="group border-white/30 text-white hover:bg-white/10 hover:border-white/60 transition-all duration-300 hover:scale-105"
                  >
                    <span className="group-hover:scale-110 transition-transform duration-300">詳しいアクセス</span>
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button className="group bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <span className="group-hover:scale-110 transition-transform duration-300">予約する</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Clean and minimal */}
      <section className="relative py-32 text-center overflow-hidden">
        {/* Enhanced floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-primary/20 to-amber-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-orange-500/15 to-primary/15 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/5 via-amber-500/5 to-orange-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-amber-500/5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-thin tracking-wider mb-4 sm:mb-6">
              Ready to Sprint?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-10 max-w-2xl mx-auto font-light px-4 sm:px-0">
              今すぐ予約して、特別な夜を体験しましょう
            </p>
            <Link href="/contact">
              <Button 
                size="lg"
                className="group bg-primary hover:bg-primary/90 text-white px-8 sm:px-12 py-5 sm:py-7 text-lg sm:text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden"
              >
                <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">今すぐ予約</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-orange-500/30"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}