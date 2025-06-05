'use client'

import UserProfileCard from "./UserProfileCard"
import MembershipStatus from "./MembershipStatus"
import type { Profile, Membership } from "@/lib/supabase"

interface UserSidebarProps {
  profile: Profile
  membership: Membership
}

export default function UserSidebar({ profile, membership }: UserSidebarProps) {
  return (
    <div className="space-y-6">
      <UserProfileCard 
        profile={profile}
        startupType={{
          primary: "idea",
          secondary: "logic"
        }}
      />
      <MembershipStatus membership={membership} />
    </div>
  )
}