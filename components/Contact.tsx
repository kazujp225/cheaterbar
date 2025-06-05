"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Phone, 
  MessageSquare, 
  Send, 
  Calendar,
  Users,
  Clock,
  MapPin,
  Mail,
  CheckCircle,
  Sparkles
} from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    people: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const result = await response.json()
      if (response.ok) {
        setShowSuccess(true)
        setFormData({ name: "", email: "", date: "", people: "", message: "" })
        setTimeout(() => setShowSuccess(false), 5000)
      } else {
        alert(`エラー: ${result.message || "予約リクエストの送信に失敗しました。"}`)
      }
    } catch (error) {
      console.error("Failed to submit reservation:", error)
      alert("予約リクエストの送信中にエラーが発生しました。")
    } finally {
      setIsSubmitting(false)
    }
  }

  const PHONE = process.env.NEXT_PUBLIC_PHONE_NUMBER || "03-1234-5678"
  const GOOGLE_FORM_URL = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL || "#"
  const LINE_URL = process.env.NEXT_PUBLIC_LINE_URL || "#"

  return (
    <section id="contact" className="relative bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900 py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-wide text-gray-900 dark:text-white">
              CONTACT & RESERVE
            </h2>
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <p className="mx-auto max-w-2xl text-lg text-gray-700 dark:text-gray-300">
            特別な夜を、あなたのために。ご予約・お問い合わせをお待ちしております
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-2">
          {/* Left Column - Reservation Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="shadow-2xl border-0 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-primary to-primary/70" />
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-primary" />
                  ご予約フォーム
                </h3>
                
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                  >
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                      <CheckCircle className="w-5 h-5" />
                      <p>予約リクエストを受け付けました。確認メールをお送りします。</p>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-700 dark:text-gray-300 font-medium">
                        お名前 <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="山田 太郎"
                        className="h-12 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">
                        メールアドレス <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="example@email.com"
                        className="h-12 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-gray-700 dark:text-gray-300 font-medium">
                        ご希望日 <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="date"
                          name="date"
                          type="date"
                          value={formData.date}
                          onChange={handleChange}
                          required
                          className="h-12 pl-12 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="people" className="text-gray-700 dark:text-gray-300 font-medium">
                        人数 <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="people"
                          name="people"
                          type="number"
                          min="1"
                          max="15"
                          value={formData.people}
                          onChange={handleChange}
                          required
                          placeholder="2"
                          className="h-12 pl-12 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-700 dark:text-gray-300 font-medium">
                      ご要望・メッセージ
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="アレルギーや特別なご要望がございましたらお知らせください"
                      className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold text-base shadow-lg transition-all hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        送信中...
                      </div>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        予約リクエストを送信
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Contact Info & Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Quick Contact Card */}
            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Phone className="w-6 h-6 text-primary" />
                  お問い合わせ
                </h3>
                <div className="space-y-4">
                  <a
                    href={LINE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors group"
                  >
                    <div className="p-3 bg-green-500 rounded-full text-white group-hover:scale-110 transition-transform">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">LINE公式アカウント</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">最も早くご返信できます</p>
                    </div>
                  </a>

                  <a
                    href={`tel:${PHONE}`}
                    className="flex items-center gap-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
                  >
                    <div className="p-3 bg-blue-500 rounded-full text-white group-hover:scale-110 transition-transform">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">お電話</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{PHONE}</p>
                    </div>
                  </a>

                  <a
                    href={`mailto:info@cheetah-bar.com`}
                    className="flex items-center gap-4 p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors group"
                  >
                    <div className="p-3 bg-purple-500 rounded-full text-white group-hover:scale-110 transition-transform">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">メール</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">info@cheetah-bar.com</p>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours & Location */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="p-8 space-y-6">
                <div>
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    営業時間
                  </h4>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <div className="flex justify-between">
                      <span>月曜日〜土曜日</span>
                      <span className="font-medium">18:00 - 26:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>日曜日・祝日</span>
                      <span className="font-medium text-red-500">定休日</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    アクセス
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    〒150-0021<br />
                    東京都渋谷区恵比寿西2-13-10<br />
                    ルガール恵比寿B1
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    JR恵比寿駅 西口より徒歩3分
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}