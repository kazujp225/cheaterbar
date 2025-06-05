"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MenuIcon, XIcon, User, LogOut } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useAuth } from "@/lib/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
  const { user, profile, signOut } = useAuth()
  const pathname = usePathname()

  const navItems = [
    { href: "/about", label: "私たちについて" },
    { href: "/menu", label: "メニュー" },
    { href: "/membership", label: "会員制度" },
    { href: "/events", label: "イベント" },
    { href: "/reserve", label: "予約" },
    { href: "/access", label: "アクセス" },
    { href: "/contact", label: "お問い合わせ" },
  ]

  useEffect(() => {
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
          <ThemeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.avatar_url || ''} alt={profile?.full_name || ''} />
                    <AvatarFallback>{profile?.full_name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{profile?.full_name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {profile?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/mypage">
                    <User className="mr-2 h-4 w-4" />
                    <span>マイページ</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>プロフィール</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>ログアウト</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login">
              <Button
                className="relative overflow-hidden bg-primary px-6 py-2 text-sm font-light uppercase tracking-wider text-white transition-all duration-300 hover:bg-primary/90 hover:shadow-premium rounded-full hover:scale-105 active:scale-95"
                size="sm"
              >
                <span className="relative z-10">ログイン</span>
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button and Theme Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
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
                {user ? (
                  <>
                    <Link href="/mypage" onClick={() => setIsMenuOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full max-w-xs rounded-full px-8 py-6 font-light uppercase tracking-wider text-base min-h-[48px]"
                      >
                        マイページ
                      </Button>
                    </Link>
                    <Button
                      onClick={() => {
                        signOut()
                        setIsMenuOpen(false)
                      }}
                      variant="ghost"
                      className="w-full max-w-xs rounded-full px-8 py-6 font-light uppercase tracking-wider text-base min-h-[48px]"
                    >
                      ログアウト
                    </Button>
                  </>
                ) : (
                  <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      className="w-full max-w-xs bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 font-light uppercase tracking-wider text-base min-h-[48px]"
                    >
                      ログイン
                    </Button>
                  </Link>
                )}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
