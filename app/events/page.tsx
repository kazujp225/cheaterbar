"use client"

import { motion } from "framer-motion"
import EventHero from "@/components/events/EventHero"
import UpcomingEventsGrid from "@/components/events/UpcomingEventsGrid"
import PastEventsCarousel from "@/components/events/PastEventsCarousel"
import EventCTA from "@/components/events/EventCTA"

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-black text-white transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <EventHero />
        
        {/* Upcoming Events Grid */}
        <UpcomingEventsGrid />
        
        {/* Past Events Archive */}
        <PastEventsCarousel />
        
        {/* Call to Action */}
        <EventCTA />
      </motion.div>
    </main>
  )
}