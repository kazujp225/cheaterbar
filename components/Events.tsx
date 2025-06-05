"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays } from "lucide-react"

const events = [
  {
    id: 1,
    title: "Pitch Night",
    description: "起業家×投資家マッチ",
    date: "毎月第1金曜",
  },
  {
    id: 2,
    title: "AI Demo Day",
    description: "最新生成AIをライブ体験",
    date: "隔月",
  },
  {
    id: 3,
    title: "秘密のCheetah",
    description: "招待制クローズド交流",
    date: "不定期",
  },
  {
    id: 4,
    title: "Founder's Talk",
    description: "成功起業家による講演会",
    date: "毎月第3水曜",
  },
]

export default function Events() {
  return (
    <section className="bg-white dark:bg-black py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-wide text-gray-900 dark:text-primary md:text-4xl lg:text-5xl">EVENTS</h2>
          <p className="mx-auto max-w-2xl text-gray-700 dark:text-gray-300 md:text-lg">ネットワークを広げ、知識を深める特別イベント</p>
        </motion.div>

        <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory overflow-x-auto px-4 pb-8 lg:justify-center">
          {" "}
          {/* Added lg:justify-center for desktop */}
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mr-6 w-[280px] flex-shrink-0 snap-center md:w-[320px] lg:w-[360px] lg:flex-shrink" /* Adjusted width for desktop, allow shrinking */
            >
              <Card className="h-full border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-secondary/50 shadow-md transition-all hover:shadow-lg hover:border-primary">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-primary lg:text-2xl">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">{event.description}</p>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {event.date}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
