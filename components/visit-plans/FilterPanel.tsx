"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Filter,
  X,
  RotateCcw,
  Users,
  Briefcase,
  TrendingUp
} from "lucide-react"

interface FilterPanelProps {
  activeFilters: {
    types: string[]
    stages: string[]
    industries: string[]
  }
  onFiltersChange: (filters: any) => void
  onClose: () => void
}

const filterOptions = {
  types: [
    { value: 'アイデアマン型', label: 'アイデアマン型', icon: '💡' },
    { value: 'ロジック参謀型', label: 'ロジック参謀型', icon: '🧠' },
    { value: '職人型', label: '職人型', icon: '🔨' },
    { value: '協業ハブ型', label: '協業ハブ型', icon: '🤝' },
    { value: 'スケール型', label: 'スケール型', icon: '📈' }
  ],
  stages: [
    { value: '開業準備中', label: '開業準備中', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { value: '開業済', label: '開業済み', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
    { value: 'スケール中', label: 'スケール中', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' }
  ],
  industries: [
    { value: 'SaaS/IT', label: 'SaaS/IT' },
    { value: 'AI/ML', label: 'AI/ML' },
    { value: 'EC/物販', label: 'EC/物販' },
    { value: '飲食', label: '飲食業' },
    { value: '美容/健康', label: '美容/健康' },
    { value: '教育', label: '教育' },
    { value: '金融/フィンテック', label: '金融/フィンテック' },
    { value: 'その他', label: 'その他' }
  ]
}

export default function FilterPanel({ activeFilters, onFiltersChange, onClose }: FilterPanelProps) {
  const [localFilters, setLocalFilters] = useState(activeFilters)

  const handleFilterToggle = (category: string, value: string) => {
    setLocalFilters(prev => ({
      ...prev,
      [category]: prev[category as keyof typeof prev].includes(value)
        ? prev[category as keyof typeof prev].filter((item: string) => item !== value)
        : [...prev[category as keyof typeof prev], value]
    }))
  }

  const handleApplyFilters = () => {
    onFiltersChange(localFilters)
    onClose()
  }

  const handleResetFilters = () => {
    const resetFilters = { types: [], stages: [], industries: [] }
    setLocalFilters(resetFilters)
    onFiltersChange(resetFilters)
  }

  const getTotalActiveFilters = () => {
    return localFilters.types.length + localFilters.stages.length + localFilters.industries.length
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="border-primary/20 bg-white dark:bg-gray-900">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Filter className="w-5 h-5 text-primary" />
              フィルター設定
              {getTotalActiveFilters() > 0 && (
                <Badge className="bg-primary/20 text-primary border-primary/30 ml-2">
                  {getTotalActiveFilters()}件
                </Badge>
              )}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
                className="h-8 px-3 text-xs"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                リセット
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* 起業家タイプ */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <h3 className="font-medium">起業家タイプ</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {filterOptions.types.map(type => (
                <motion.div
                  key={type.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Badge
                    variant={localFilters.types.includes(type.value) ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      localFilters.types.includes(type.value)
                        ? 'bg-primary hover:bg-primary/90 text-white'
                        : 'hover:bg-primary/10 hover:border-primary/30'
                    }`}
                    onClick={() => handleFilterToggle('types', type.value)}
                  >
                    <span className="mr-1">{type.icon}</span>
                    {type.label}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 事業ステージ */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h3 className="font-medium">事業ステージ</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {filterOptions.stages.map(stage => (
                <motion.div
                  key={stage.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Badge
                    variant={localFilters.stages.includes(stage.value) ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      localFilters.stages.includes(stage.value)
                        ? stage.color
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => handleFilterToggle('stages', stage.value)}
                  >
                    {stage.label}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 業界 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-primary" />
              <h3 className="font-medium">業界</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {filterOptions.industries.map(industry => (
                <motion.div
                  key={industry.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Badge
                    variant={localFilters.industries.includes(industry.value) ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      localFilters.industries.includes(industry.value)
                        ? 'bg-primary hover:bg-primary/90 text-white'
                        : 'hover:bg-primary/10 hover:border-primary/30'
                    }`}
                    onClick={() => handleFilterToggle('industries', industry.value)}
                  >
                    {industry.label}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              キャンセル
            </Button>
            <Button
              onClick={handleApplyFilters}
              className="flex-1 bg-primary hover:bg-primary/90 text-white"
            >
              フィルターを適用
              {getTotalActiveFilters() > 0 && (
                <Badge className="bg-white/20 text-white border-white/30 ml-2">
                  {getTotalActiveFilters()}
                </Badge>
              )}
            </Button>
          </div>

          {/* Filter Summary */}
          {getTotalActiveFilters() > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-primary/5 dark:bg-primary/10 rounded-lg border border-primary/20"
            >
              <div className="text-sm font-medium text-primary mb-2">
                現在のフィルター設定
              </div>
              <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                {localFilters.types.length > 0 && (
                  <div>
                    <span className="font-medium">タイプ:</span> {localFilters.types.join(', ')}
                  </div>
                )}
                {localFilters.stages.length > 0 && (
                  <div>
                    <span className="font-medium">ステージ:</span> {localFilters.stages.join(', ')}
                  </div>
                )}
                {localFilters.industries.length > 0 && (
                  <div>
                    <span className="font-medium">業界:</span> {localFilters.industries.join(', ')}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}