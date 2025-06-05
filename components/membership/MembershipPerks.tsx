"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const perks = [
  {
    icon: '🍸',
    title: 'ドリンク無料',
    desc: '基本ドリンクはいつでも0円で楽しめます',
    color: 'from-blue-500/10 to-purple-500/10'
  },
  {
    icon: '🎯',
    title: '起業相談マッチ',
    desc: 'あなたの悩みに合った人とつながれます',
    color: 'from-green-500/10 to-emerald-500/10'
  },
  {
    icon: '🎤',
    title: '著名人イベント',
    desc: '現場でしか聞けない話を最前線で',
    color: 'from-amber-500/10 to-orange-500/10'
  },
  {
    icon: '📅',
    title: '来店予定が見える',
    desc: '誰が今日いるか、事前にチェック可能',
    color: 'from-purple-500/10 to-pink-500/10'
  }
]

export default function MembershipPerks() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            会員だけの特別な体験
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            CHEETAH BARが提供する価値
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {perks.map((perk, index) => (
            <motion.div
              key={perk.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="relative h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${perk.color}`} />
                <CardContent className="relative p-6 flex flex-col items-center text-center h-full">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.3 + index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                    className="text-5xl mb-4"
                  >
                    {perk.icon}
                  </motion.div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3">
                    {perk.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex-grow">
                    {perk.desc}
                  </p>

                  {/* Decorative element */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile-optimized grid for smaller screens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 grid grid-cols-2 gap-4 max-w-md mx-auto lg:hidden"
        >
          {[
            { icon: '💡', text: 'アイデアが生まれる' },
            { icon: '🤝', text: '仲間が見つかる' },
            { icon: '🚀', text: '事業が加速する' },
            { icon: '✨', text: '毎日が刺激的に' }
          ].map((item, index) => (
            <motion.div
              key={item.text}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md text-center"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="text-sm font-medium">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}