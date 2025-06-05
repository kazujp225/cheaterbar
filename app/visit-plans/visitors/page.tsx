"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import VisitorList from "@/components/visit-plans/VisitorList"
import VisitScheduleForm from "@/components/visit-plans/VisitScheduleForm"
import DateTabs from "@/components/visit-plans/DateTabs"
import FilterPanel from "@/components/visit-plans/FilterPanel"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { Plus, Users, Calendar, Filter } from "lucide-react"

export default function VisitorsPage() {
  const [selectedDate, setSelectedDate] = useState('today')
  const [activeFilters, setActiveFilters] = useState({
    types: [],
    stages: [],
    industries: []
  })
  const [showForm, setShowForm] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const { user } = useAuth()

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white pt-20 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            今日誰が来る？
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            来店予定者と事前にコネクト。偶然の出会いを必然に変える
          </p>

          {user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => setShowForm(!showForm)}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3"
              >
                <Plus className="w-4 h-4 mr-2" />
                来店予定を登録
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-gray-300 dark:border-gray-600"
              >
                <Filter className="w-4 h-4 mr-2" />
                フィルター
              </Button>
            </div>
          )}
        </motion.div>

        {/* Guest User Info */}
        {!user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-r from-primary/10 to-amber-500/10 border-primary/20">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  今日はWeb/AI系起業家が4名来店予定！
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  詳細な情報や「一緒に飲みたい」機能は会員登録後にご利用いただけます
                </p>
                <div className="flex gap-4 justify-center">
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    無料会員登録
                  </Button>
                  <Button variant="outline">
                    ログイン
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Visit Schedule Form */}
        {user && showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <VisitScheduleForm onClose={() => setShowForm(false)} />
          </motion.div>
        )}

        {/* Filter Panel */}
        {user && showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <FilterPanel 
              activeFilters={activeFilters}
              onFiltersChange={setActiveFilters}
              onClose={() => setShowFilters(false)}
            />
          </motion.div>
        )}

        {/* Date Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <DateTabs 
            selectedDate={selectedDate} 
            onDateChange={setSelectedDate} 
          />
        </motion.div>

        {/* Visitors List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <VisitorList 
            selectedDate={selectedDate}
            filters={activeFilters}
            isAuthenticated={!!user}
          />
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-br from-gray-100 dark:from-gray-900 to-white dark:to-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                今週の来店予定統計
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">12</div>
                  <div className="text-gray-600 dark:text-gray-400">今週の来店予定者</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">8</div>
                  <div className="text-gray-600 dark:text-gray-400">新規マッチング成立</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">95%</div>
                  <div className="text-gray-600 dark:text-gray-400">予定通り来店率</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  )
}