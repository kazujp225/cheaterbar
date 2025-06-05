"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  Building2, 
  Sparkles, 
  Target, 
  MessageSquare,
  Twitter,
  Linkedin,
  Instagram,
  Save,
  CheckCircle2
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { toast } from "@/components/ui/use-toast"

export default function ProfileEditor() {
  const { user, profile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    full_name: "",
    company: "",
    interests: "",
    challenges: "",
    twitter_url: "",
    linkedin_url: "",
    instagram_url: ""
  })

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        company: profile.company || "",
        interests: profile.interests || "",
        challenges: profile.challenges || "",
        twitter_url: profile.twitter_url || "",
        linkedin_url: profile.linkedin_url || "",
        instagram_url: profile.instagram_url || ""
      })
    }
  }, [profile])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
      setIsEditing(false)
      
      toast({
        title: "プロフィールを更新しました",
        description: "変更が正常に保存されました。"
      })
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        description: "プロフィールの更新に失敗しました。",
        variant: "destructive"
      })
    } finally {
      setIsSaving(false)
    }
  }

  const getMatchingTypeColor = (type: string) => {
    switch (type) {
      case "ロジック参謀型": return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
      case "クリエイティブ型": return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
      case "コネクター型": return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="rounded-2xl shadow-md bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold tracking-wide flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              プロフィール編集
            </CardTitle>
            {showSuccess && (
              <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                保存完了
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Fixed Information */}
          <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-400">氏名（変更不可）</Label>
              <p className="text-lg font-medium mt-1">{formData.full_name || "未設定"}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-400">会社名（変更不可）</Label>
              <p className="text-lg font-medium mt-1 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-500" />
                {formData.company || "未設定"}
              </p>
            </div>
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-400">診断タイプ（変更不可）</Label>
              <div className="mt-2">
                <Badge className={`${getMatchingTypeColor(profile?.matching_type || "")} px-3 py-1`}>
                  <Sparkles className="w-3 h-3 mr-1" />
                  {profile?.matching_type || "未診断"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Editable Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="interests" className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-500" />
                興味・関心分野
              </Label>
              <Textarea
                id="interests"
                value={formData.interests}
                onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                placeholder="例：AI技術、スタートアップ投資、サステナビリティ"
                disabled={!isEditing}
                className="mt-2 min-h-[80px]"
              />
            </div>

            <div>
              <Label htmlFor="challenges" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-orange-500" />
                現在の課題・相談したいこと
              </Label>
              <Textarea
                id="challenges"
                value={formData.challenges}
                onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                placeholder="例：新規事業の立ち上げ、資金調達、人材採用"
                disabled={!isEditing}
                className="mt-2 min-h-[80px]"
              />
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">SNSリンク（任意）</Label>
              
              <div className="flex items-center gap-3">
                <Twitter className="w-4 h-4 text-blue-400" />
                <Input
                  value={formData.twitter_url}
                  onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                  placeholder="https://twitter.com/username"
                  disabled={!isEditing}
                  className="flex-1"
                />
              </div>

              <div className="flex items-center gap-3">
                <Linkedin className="w-4 h-4 text-blue-600" />
                <Input
                  value={formData.linkedin_url}
                  onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                  placeholder="https://linkedin.com/in/username"
                  disabled={!isEditing}
                  className="flex-1"
                />
              </div>

              <div className="flex items-center gap-3">
                <Instagram className="w-4 h-4 text-pink-500" />
                <Input
                  value={formData.instagram_url}
                  onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                  placeholder="https://instagram.com/username"
                  disabled={!isEditing}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                編集する
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="flex-1"
                  disabled={isSaving}
                >
                  キャンセル
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white"
                >
                  {isSaving ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      保存中...
                    </div>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      保存する
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}