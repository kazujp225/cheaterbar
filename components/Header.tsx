"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
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
        isScrolled 
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

        {/* Desktop Navigation - Hidden on mobile since we have floating nav */}
        <nav className="hidden space-x-6 lg:flex">
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

        {/* Mobile - Only show theme toggle since nav is in floating menu */}
        <div className="md:hidden flex items-center gap-2">
          {isMounted && <ThemeToggle />}
        </div>
      </div>

    </header>
  )
}
