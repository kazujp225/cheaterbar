"use client"

import Contact from "@/components/Contact"
import { motion } from "framer-motion"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white pt-20 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-24"
      >
        <Contact />
      </motion.div>
    </main>
  )
}