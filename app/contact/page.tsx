"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MessageSquare, Send } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      alert('お問い合わせありがとうございます。後日ご連絡いたします。')
      setFormData({ name: "", email: "", message: "" })
    }, 1000)
  }

  return (
    <main className="h-screen bg-white flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Title */}
          <h1 className="text-3xl font-light mb-8 text-gray-900">
            お問い合わせ
          </h1>
          
          {/* Quick Contact Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Button 
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white h-16"
              onClick={() => window.open('https://line.me/ti/p/', '_blank')}
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              LINE
            </Button>
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white h-16"
              onClick={() => window.location.href = 'tel:03-1234-5678'}
            >
              <Phone className="w-5 h-5 mr-2" />
              電話
            </Button>
            <Button 
              size="lg"
              className="bg-gray-600 hover:bg-gray-700 text-white h-16"
              onClick={() => window.location.href = 'mailto:info@cheetah-bar.com'}
            >
              <Mail className="w-5 h-5 mr-2" />
              メール
            </Button>
          </div>
          
          {/* Contact Form */}
          <div className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-xl font-medium mb-6 text-gray-900">メッセージを送る</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  name="name"
                  placeholder="お名前"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-12 bg-white border-gray-300"
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="メールアドレス"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-12 bg-white border-gray-300"
                />
              </div>
              
              <Textarea
                name="message"
                placeholder="お問い合わせ内容をご記入ください"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="bg-white border-gray-300 resize-none"
              />
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                size="lg"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white h-12"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    送信中...
                  </div>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    送信する
                  </>
                )}
              </Button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div className="mt-8 text-sm text-gray-600">
            <p className="mb-2">電話: 03-1234-5678</p>
            <p className="mb-2">メール: info@cheetah-bar.com</p>
            <p>営業時間: 月〜土 18:00-26:00（日曜定休）</p>
          </div>
        </motion.div>
      </div>
    </main>
  )
}