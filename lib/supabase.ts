import { createBrowserClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export const createBrowserSupabaseClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

// Type definitions for our database tables
export type Profile = {
  id: string
  email: string
  full_name: string
  company_name?: string
  position?: string
  phone?: string
  avatar_url?: string
  bio?: string
  interests: string[]
  created_at: string
  updated_at: string
}

export type Membership = {
  id: string
  user_id: string
  type: 'free' | 'paid'
  status: 'active' | 'inactive' | 'suspended' | 'cancelled'
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  stripe_customer_id?: string
  stripe_subscription_id?: string
  started_at: string
  expires_at?: string
  tier_updated_at: string
  created_at: string
  updated_at: string
}

export type VisitPlan = {
  id: string
  user_id: string
  visit_date: string
  start_time: string
  end_time?: string
  visibility: 'public' | 'members_only' | 'anonymous' | 'private'
  message?: string
  is_cancelled: boolean
  created_at: string
  updated_at: string
  // Joined data
  profile?: Profile
}

export type MatchingRequest = {
  id: string
  from_user_id: string
  to_user_id: string
  status: 'pending' | 'accepted' | 'rejected' | 'expired' | 'cancelled'
  proposed_dates: any[]
  message: string
  introduction: string
  topic?: string
  responded_at?: string
  expires_at: string
  created_at: string
  updated_at: string
  // Joined data
  from_user?: Profile
  to_user?: Profile
}

export type Event = {
  id: string
  title: string
  description?: string
  event_type: string
  start_datetime: string
  end_datetime: string
  location: string
  capacity: number
  price_free_member: number
  price_paid_member: number
  registration_deadline?: string
  is_published: boolean
  created_at: string
  updated_at: string
  // Computed
  registered_count?: number
  is_full?: boolean
}

export type EventRegistration = {
  id: string
  event_id: string
  user_id: string
  status: 'confirmed' | 'waitlist' | 'cancelled'
  payment_status: 'pending' | 'paid' | 'refunded'
  stripe_payment_intent_id?: string
  notes?: string
  created_at: string
  updated_at: string
  // Joined data
  event?: Event
  profile?: Profile
}

export type Notification = {
  id: string
  user_id: string
  type: 'visit_plan' | 'matching_request' | 'matching_response' | 'event' | 'system'
  title: string
  message: string
  data: any
  is_read: boolean
  created_at: string
}