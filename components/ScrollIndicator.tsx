"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function ScrollIndicator() {
  const [activeSection, setActiveSection] = useState("")
  
  const sections = [
    { id: "hero", label: "Home" },
    { id: "concept", label: "Concept" },
    { id: "menu", label: "Menu" },
    { id: "experience", label: "Experience" },
    { id: "location", label: "Location" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial position
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // Calculate positions for semi-circle layout
  const calculatePosition = (index: number, total: number) => {
    const radius = 60 // Increased radius for better arc visibility
    const startAngle = 110 // Adjusted for better curve
    const endAngle = 250 // Adjusted for better curve
    const angleRange = endAngle - startAngle
    const angleStep = angleRange / (total - 1)
    const angle = startAngle + (index * angleStep)
    const radians = (angle * Math.PI) / 180
    
    return {
      x: Math.cos(radians) * radius,
      y: Math.sin(radians) * radius,
    }
  }

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed right-2 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <nav className="relative w-20 h-40">
        {sections.map((section, index) => {
          const position = calculatePosition(index, sections.length)
          const leftPos = Math.round(80 + position.x)
          const topPos = Math.round(80 + position.y)
          
          return (
            <motion.button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="absolute group p-2"
              style={{
                left: `${leftPos}px`,
                top: `${topPos}px`,
                transform: 'translate(-50%, -50%)',
              }}
              aria-label={`Scroll to ${section.label}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              {/* Tooltip - hidden by default */}
              <span
                className={`absolute right-full mr-3 text-xs whitespace-nowrap transition-all duration-200 pointer-events-none ${
                  activeSection === section.id
                    ? "opacity-0"
                    : "opacity-0 group-hover:opacity-80"
                }`}
              >
                {section.label}
              </span>
              
              {/* Dot */}
              <span
                className={`block w-2 h-2 rounded-full transition-all duration-300 ${
                  activeSection === section.id
                    ? "bg-primary opacity-100 scale-[1.4]"
                    : "bg-gray-400 dark:bg-gray-500 opacity-40 hover:opacity-100"
                }`}
              />
            </motion.button>
          )
        })}
      </nav>
    </div>
  )
}