'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Profile, Membership } from '@/lib/supabase'

// ダミーデータ
const DUMMY_USER = {
  id: 'dummy-user-001',
  email: 'shimizu@lastmile.jp',
  app_metadata: {},
  user_metadata: {},
  aud: 'authenticated',
  created_at: '2024-01-01T00:00:00.000Z'
}

const DUMMY_PROFILE: Profile = {
  id: 'dummy-user-001',
  email: 'shimizu@lastmile.jp',
  full_name: '清水 望',
  company_name: '株式会社ラストワンマイル',
  position: '代表取締役社長',
  phone: '090-1234-5678',
  avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop',
  bio: '光通信での経験を経て、2011年に株式会社U-MXを設立。コールセンター事業からインサイドセールスへと事業を拡大。2023年プレミアムウォーターHDへのバイアウトを実現。現在はWiz執行役員AI戦略本部長として、次世代のセールステクノロジーを推進。',
  interests: ['AI・機械学習', 'インサイドセールス', 'M&A・EXIT戦略', 'セールステック'],
  challenges: ['AI技術の実装', '人材採用', '新規事業開発'],
  matching_type: 'ロジック参謀型',
  created_at: '2024-01-01T00:00:00.000Z',
  updated_at: '2024-01-01T00:00:00.000Z'
}

const DUMMY_MEMBERSHIP: Membership = {
  id: 'dummy-membership-001',
  user_id: 'dummy-user-001',
  type: 'paid',
  status: 'active',
  tier: 'gold',
  stripe_customer_id: 'cus_dummy123',
  stripe_subscription_id: 'sub_dummy123',
  started_at: '2024-01-01T00:00:00.000Z',
  expires_at: '2025-01-01T00:00:00.000Z',
  tier_updated_at: '2024-01-01T00:00:00.000Z',
  created_at: '2024-01-01T00:00:00.000Z',
  updated_at: '2024-01-01T00:00:00.000Z'
}

type AuthContextType = {
  user: any | null
  profile: Profile | null
  membership: Membership | null
  session: any | null
  loading: boolean
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [membership, setMembership] = useState<Membership | null>(null)
  const [session, setSession] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('dummy_user')
    if (savedUser) {
      setUser(DUMMY_USER)
      setProfile(DUMMY_PROFILE)
      setMembership(DUMMY_MEMBERSHIP)
      setSession({ user: DUMMY_USER })
    }
    setLoading(false)
  }, [])

  const signUp = async (email: string, password: string, fullName: string) => {
    // ダミー実装：常に成功
    await new Promise(resolve => setTimeout(resolve, 1000)) // 1秒待機（ローディング演出）
    
    const newProfile = {
      ...DUMMY_PROFILE,
      email,
      full_name: fullName
    }
    
    setUser({ ...DUMMY_USER, email })
    setProfile(newProfile)
    setMembership(DUMMY_MEMBERSHIP)
    setSession({ user: { ...DUMMY_USER, email } })
    
    localStorage.setItem('dummy_user', 'true')
    router.push('/profile/complete')
  }

  const signIn = async (email: string, password: string) => {
    // ダミー実装：test@gmail.com / test1234 のみ成功
    await new Promise(resolve => setTimeout(resolve, 1000)) // 1秒待機（ローディング演出）
    
    if (email === 'test@gmail.com' && password === 'test1234') {
      setUser(DUMMY_USER)
      setProfile(DUMMY_PROFILE)
      setMembership(DUMMY_MEMBERSHIP)
      setSession({ user: DUMMY_USER })
      
      localStorage.setItem('dummy_user', 'true')
      router.push('/mypage')
    } else {
      throw new Error('メールアドレスまたはパスワードが正しくありません')
    }
  }

  const signOut = async () => {
    await new Promise(resolve => setTimeout(resolve, 500)) // 0.5秒待機
    
    setUser(null)
    setProfile(null)
    setMembership(null)
    setSession(null)
    
    localStorage.removeItem('dummy_user')
    router.push('/')
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    await new Promise(resolve => setTimeout(resolve, 1000)) // 1秒待機
    
    if (!profile) throw new Error('No user logged in')
    
    const updatedProfile = { ...profile, ...updates }
    setProfile(updatedProfile)
  }

  const value = {
    user,
    profile,
    membership,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}