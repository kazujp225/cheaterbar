"use client"

import { motion } from "framer-motion"
import HeroSection from "@/components/membership/HeroSection"
import PlanComparisonTable from "@/components/membership/PlanComparisonTable"
import MembershipPerks from "@/components/membership/MembershipPerks"
import CallToRegister from "@/components/membership/CallToRegister"

export default function MembershipPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white pt-20 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <HeroSection />
        
        {/* Plan Comparison Table */}
        <PlanComparisonTable />
        
        {/* Membership Perks */}
        <MembershipPerks />
        
        {/* Call to Register */}
        <CallToRegister />
      </motion.div>
    </main>
  )
}