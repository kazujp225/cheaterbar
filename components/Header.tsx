"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MenuIcon, XIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "@/components/ThemeToggle"

interface NavLinkProps {
  href: string
  label: string
}

const NavLink: React.FC<NavLinkProps> = ({ href, label }) => {
  const pathname = usePathname()
  const isActive = pathname === href
  
  return (
    <Link 
      href={href} 
      className={`relative text-sm font-light uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 group ${
        isActive 
          ? 'text-primary' 
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
      }`}
    >
      {label}
      <span className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-primary to-sapphire transition-all duration-300 ${
        isActive ? 'w-full' : 'w-0 group-hover:w-full'
      }`} />
    </Link>
  )
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: "/about", label: "私たちについて" },
    { href: "/menu", label: "メニュー" },
    { href: "/events", label: "イベント" },
    { href: "/blog", label: "ブログ" },
    { href: "/access", label: "アクセス" },
    { href: "/contact", label: "お問い合わせ" },
  ]

  useEffect(() => {
    setIsMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isMenuOpen 
          ? "bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 shadow-2xl" 
          : "bg-gradient-to-b from-white/50 dark:from-black/50 to-transparent"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center group hover:scale-105 transition-transform duration-200">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            開業チーター🐆
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden space-x-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              href={item.href}
              label={item.label}
            />
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {isMounted && <ThemeToggle />}
          <Link href="/admin/login">
            <Button
              variant="ghost"
              className="text-sm font-light uppercase tracking-wider"
              size="sm"
            >
              管理者
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button and Theme Toggle */}
        <div className="md:hidden flex items-center gap-2">
          {isMounted && <ThemeToggle />}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="text-gray-900 dark:text-white p-3 -mr-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/95 dark:bg-black/95 backdrop-blur-xl border-t border-gray-200 dark:border-white/10 md:hidden"
          >
            <nav className="flex flex-col items-center space-y-2 py-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={`block w-full max-w-xs px-6 py-4 text-center text-base font-light uppercase tracking-wider hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-all min-h-[48px] flex items-center justify-center ${
                      pathname === item.href
                        ? 'text-primary bg-primary/10'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                className="pt-4 space-y-3"
              >
                <Link href="/admin/login" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full max-w-xs rounded-full px-8 py-6 font-light uppercase tracking-wider text-base min-h-[48px]"
                  >
                    管理者
                  </Button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
