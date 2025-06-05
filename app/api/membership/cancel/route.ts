import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: Object.fromEntries(headers()),
        },
      }
    )

    // Get the user from the session
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      )
    }

    // Get user's membership
    const { data: membership, error: membershipError } = await supabase
      .from('memberships')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (membershipError || !membership) {
      return NextResponse.json(
        { error: '会員情報が見つかりません' },
        { status: 404 }
      )
    }

    if (membership.type !== 'paid' || !membership.stripe_subscription_id) {
      return NextResponse.json(
        { error: '有料会員ではありません' },
        { status: 400 }
      )
    }

    // Cancel the subscription at period end
    const subscription = await stripe.subscriptions.update(
      membership.stripe_subscription_id,
      {
        cancel_at_period_end: true,
      }
    )

    // Update membership in database
    await supabase
      .from('memberships')
      .update({
        status: 'cancelled',
        expires_at: new Date(subscription.current_period_end * 1000).toISOString(),
      })
      .eq('user_id', user.id)

    return NextResponse.json({ 
      success: true,
      message: '有料会員を解約しました。期限まではサービスをご利用いただけます。',
      expires_at: new Date(subscription.current_period_end * 1000).toISOString(),
    })
  } catch (error: any) {
    console.error('Subscription cancellation error:', error)
    return NextResponse.json(
      { error: error.message || '解約処理中にエラーが発生しました' },
      { status: 500 }
    )
  }
}