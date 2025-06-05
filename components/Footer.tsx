"use client"

import type React from "react"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Youtube, Twitter } from "lucide-react" // Assuming Line icon is custom or from another source

const NavLink: React.FC<{ href: string; label: string; onClick: () => void }> = ({ href, label, onClick }) => (
  <a
    href={href}
    onClick={(e) => {
      e.preventDefault()
      onClick()
    }}
    className="text-sm text-gray-600 dark:text-gray-400 transition-all hover:text-primary hover:translate-x-1 inline-block"
  >
    {label}
  </a>
)

export default function Footer() {
  const navItems = [
    { href: "#about", label: "About" },
    { href: "#menu", label: "Menu" },
    { href: "#membership", label: "Membership" },
    { href: "#events", label: "Events" },
    { href: "#access", label: "Access" },
    { href: "#contact", label: "Contact" },
  ]

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  const LINE_URL = process.env.NEXT_PUBLIC_LINE_URL || "#"

  return (
    <footer className="bg-gray-100/95 dark:bg-secondary/95 py-16 text-gray-700 dark:text-gray-300 backdrop-blur-sm mt-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Logo and Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start"
          >
            <Link href="/" passHref legacyBehavior>
              <a onClick={() => scrollToSection("hero")} className="mb-4">
                <Image src="/placeholder-logo.svg" alt="CHEETAH BAR Logo" width={120} height={60} className="h-12 w-auto" />
              </a>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">© 2025 Kaigyo-Cheetah Inc. All rights reserved.</p>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Quick Links</h3>
            <nav className="grid grid-cols-2 gap-2 md:grid-cols-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  href={item.href}
                  label={item.label}
                  onClick={() => scrollToSection(item.href.substring(1))}
                />
              ))}
            </nav>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center md:text-right"
          >
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Follow Us</h3>
            <div className="flex justify-center space-x-6 md:justify-end">
              <a
                href="https://twitter.com/lasuone"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-gray-600 dark:text-gray-400 transition-all hover:text-primary hover:scale-110"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="https://youtube.com/@gamblesoul"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-gray-600 dark:text-gray-400 transition-all hover:text-primary hover:scale-110"
              >
                <Youtube className="h-6 w-6" />
              </a>
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LINE"
                className="text-gray-600 dark:text-gray-400 transition-all hover:text-primary hover:scale-110"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.24 10.41a13.04 13.04 0 01-7.01 11.03c-2.65.96-5.45.57-7.77-1.09a8.77 8.77 0 01-3.46-7.02c0-1.52.33-2.93.87-4.23l.09-.21a17.16 17.16 0 012.15-3.57l.36-.48c1.37-1.8 2.87-3.32 4.36-4.36l.64-.43a2.81 2.81 0 011.55-.47c.52 0 1.01.15 1.41.42a2.77 2.77 0 011.17 2.28v.2a35.62 35.62 0 01-.17 2.45c-.05.51-.11 1.08-.17 1.62-.14 1.28-.29 2.59-.37 3.8a63.97 63.97 0 00-.1 4.73c0 .46.02.99.05 1.54.04.73.09 1.47.13 2.18l.03.57v.01a.52.52 0 00.42.44c.07.01.14.02.22.02a.68.68 0 00.68-.68V10.4z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
