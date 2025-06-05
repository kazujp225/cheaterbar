import { NextRequest, NextResponse } from 'next/server'
import { stripe, getStripeUrl, MONTHLY_PRICE_ID } from '@/lib/stripe'
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

    // Get user's profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'プロフィールが見つかりません' },
        { status: 404 }
      )
    }

    // Check if user already has a paid membership
    const { data: membership } = await supabase
      .from('memberships')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (membership?.type === 'paid' && membership?.stripe_subscription_id) {
      return NextResponse.json(
        { error: 'すでに有料会員です' },
        { status: 400 }
      )
    }

    // Create or retrieve Stripe customer
    let stripeCustomerId = membership?.stripe_customer_id

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email!,
        name: profile.full_name,
        metadata: {
          user_id: user.id,
        },
      })
      stripeCustomerId = customer.id

      // Update membership with Stripe customer ID
      await supabase
        .from('memberships')
        .update({ stripe_customer_id: stripeCustomerId })
        .eq('user_id', user.id)
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: MONTHLY_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${getStripeUrl()}/dashboard?upgrade=success`,
      cancel_url: `${getStripeUrl()}/membership/upgrade?upgrade=cancelled`,
      metadata: {
        user_id: user.id,
      },
      subscription_data: {
        trial_period_days: 30, // 初月無料
        metadata: {
          user_id: user.id,
        },
      },
    })

    return NextResponse.json({ checkoutUrl: session.url })
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: error.message || 'エラーが発生しました' },
      { status: 500 }
    )
  }
}