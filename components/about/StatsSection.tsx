"use client"

import { motion } from "framer-motion"
import { FC } from "react"
import type { LucideIcon } from "lucide-react"

interface Stat {
  number: string
  label: string
  icon: LucideIcon
}

interface StatsSectionProps {
  stats: Stat[]
}

const StatsSection: FC<StatsSectionProps> = ({ stats }) => {
  return (
    <section className="py-8 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 dark:from-primary/20 dark:via-primary/10 dark:to-primary/20 overflow-hidden">
      <div className="relative">
        <motion.div
          animate={{
            x: [0, "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
          className="flex"
        >
          {/* Duplicate the stats array for seamless loop */}
          {[...stats, ...stats].map((stat, index) => (
            <div
              key={`${stat.label}-${index}`}
              className="flex items-center gap-3 px-8 whitespace-nowrap"
            >
              <stat.icon className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold text-primary">{stat.number}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</span>
              {index < stats.length * 2 - 1 && (
                <span className="text-gray-300 dark:text-gray-700 mx-4">•</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default StatsSection