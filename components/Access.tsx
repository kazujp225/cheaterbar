"use client"

import { motion } from "framer-motion"
import { MapPin } from "lucide-react"

export default function Access() {
  const ADDRESS = "Your Address Here"
  const STATION = "Nearest Station"
  const MIN = "5"
  const MAP_EMBED_URL =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.789012345678!2d139.6917064!3d35.6894875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188d8055555555%3A0x1234567890abcdef!2zVGFreW8gU2t5dHJlZSBMaW5l!5e0!3m2!1sen!2sus!4v1678886400000"

  return (
    <section className="bg-gray-50 dark:bg-secondary py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-wide text-gray-900 dark:text-primary md:text-4xl">ACCESS</h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-4"
          >
            <div className="flex items-start">
              <MapPin className="mr-2 h-5 w-5 text-primary" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">ADDRESS</h3>
                <p className="text-gray-700 dark:text-gray-300">{ADDRESS}</p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  最寄り駅: {STATION} から徒歩 {MIN} 分
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="h-[300px] overflow-hidden rounded-2xl shadow-md">
              <iframe
                src={MAP_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="CHEETAH BAR Location"
                className="h-full w-full"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
