'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import VisitScheduleForm from "./VisitScheduleForm"
import DrinkRequestList from "./DrinkRequestList"
import PitchRequestForm from "./PitchRequestForm"
import PastMatches from "./PastMatches"
import { CalendarPlus, Users, Lightbulb, History } from "lucide-react"

interface UserDashboardMainProps {
  userId: string
}

export default function UserDashboardMain({ userId }: UserDashboardMainProps) {
  return (
    <Tabs defaultValue="visit" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="visit" className="flex items-center gap-2">
          <CalendarPlus className="h-4 w-4" />
          <span className="hidden sm:inline">来店予定</span>
        </TabsTrigger>
        <TabsTrigger value="requests" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span className="hidden sm:inline">リクエスト</span>
        </TabsTrigger>
        <TabsTrigger value="pitch" className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4" />
          <span className="hidden sm:inline">ピッチ</span>
        </TabsTrigger>
        <TabsTrigger value="history" className="flex items-center gap-2">
          <History className="h-4 w-4" />
          <span className="hidden sm:inline">履歴</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="visit" className="mt-6">
        <VisitScheduleForm userId={userId} />
      </TabsContent>

      <TabsContent value="requests" className="mt-6">
        <DrinkRequestList userId={userId} />
      </TabsContent>

      <TabsContent value="pitch" className="mt-6">
        <PitchRequestForm userId={userId} />
      </TabsContent>

      <TabsContent value="history" className="mt-6">
        <PastMatches userId={userId} />
      </TabsContent>
    </Tabs>
  )
}