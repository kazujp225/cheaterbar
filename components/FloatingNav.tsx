"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Home, 
  Calendar, 
  FileText, 
  Menu as MenuIcon, 
  Info,
  MapPin,
  Mail,
  ChevronUp,
  X
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { href: "/", label: "ホーム", icon: <Home className="w-5 h-5" /> },
  { href: "/about", label: "メンター紹介", icon: <Info className="w-5 h-5" /> },
  { href: "/menu", label: "メニュー", icon: <MenuIcon className="w-5 h-5" /> },
  { href: "/events", label: "イベント", icon: <Calendar className="w-5 h-5" /> },
  { href: "/blog", label: "ブログ", icon: <FileText className="w-5 h-5" /> },
  { href: "/access", label: "アクセス", icon: <MapPin className="w-5 h-5" /> },
  { href: "/contact", label: "お問い合わせ", icon: <Mail className="w-5 h-5" /> },
]

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener("resize", checkMobile)
    
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Desktop: Bottom right fixed position
  // Mobile: Bottom center with horizontal layout
  return (
    <>
      {/* Desktop Floating Navigation */}
      <div className="fixed bottom-8 right-8 z-50 hidden md:block">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-20 right-0 bg-black/90 dark:bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-2xl"
            >
              <nav className="flex flex-col gap-2 min-w-[200px]">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                        "hover:bg-white/10 hover:translate-x-1",
                        pathname === item.href
                          ? "bg-primary/20 text-primary"
                          : "text-gray-300 hover:text-white"
                      )}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                onClick={scrollToTop}
                className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/20 group"
                aria-label="Scroll to top"
              >
                <ChevronUp className="w-6 h-6 text-white group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="w-14 h-14 bg-primary backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/50 group"
            aria-label="Toggle navigation menu"
          >
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <div className="flex flex-col gap-1">
                  <span className="w-5 h-0.5 bg-white rounded-full" />
                  <span className="w-5 h-0.5 bg-white rounded-full" />
                  <span className="w-5 h-0.5 bg-white rounded-full" />
                </div>
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="bg-black/95 dark:bg-white/10 backdrop-blur-xl border-t border-white/20"
        >
          <nav className="flex items-center justify-around py-2 px-4">
            {navItems.slice(0, 5).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all duration-200 min-w-[60px]",
                  pathname === item.href
                    ? "text-primary"
                    : "text-gray-400 hover:text-white"
                )}
              >
                <div className={cn(
                  "p-1.5 rounded-lg transition-all duration-200",
                  pathname === item.href && "bg-primary/20"
                )}>
                  {item.icon}
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </motion.div>

        {/* Mobile Menu Button for Additional Items */}
        {navItems.length > 5 && (
          <>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-full mb-2 right-4 bg-black/95 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-2xl"
                >
                  <div className="flex flex-col gap-2">
                    {navItems.slice(5).map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                            "hover:bg-white/10",
                            pathname === item.href
                              ? "bg-primary/20 text-primary"
                              : "text-gray-300 hover:text-white"
                          )}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="absolute bottom-full mb-4 right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/50"
              aria-label="More navigation options"
            >
              <motion.div
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <div className="flex gap-0.5">
                    <span className="w-1 h-1 bg-white rounded-full" />
                    <span className="w-1 h-1 bg-white rounded-full" />
                    <span className="w-1 h-1 bg-white rounded-full" />
                  </div>
                )}
              </motion.div>
            </motion.button>
          </>
        )}

        {/* Mobile Scroll to Top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={scrollToTop}
              className="absolute bottom-full mb-4 left-4 w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20"
              aria-label="Scroll to top"
            >
              <ChevronUp className="w-5 h-5 text-white" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}