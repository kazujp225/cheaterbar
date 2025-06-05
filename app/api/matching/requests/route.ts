import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { headers } from 'next/headers'

export async function GET(request: NextRequest) {
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

    // Check if user is a paid member
    const { data: membership } = await supabase
      .from('memberships')
      .select('type')
      .eq('user_id', user.id)
      .single()

    if (membership?.type !== 'paid') {
      return NextResponse.json(
        { error: '有料会員のみ利用可能です' },
        { status: 403 }
      )
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type') // 'sent' or 'received'

    let query = supabase
      .from('matching_requests')
      .select(`
        *,
        from_user:profiles!from_user_id(*),
        to_user:profiles!to_user_id(*)
      `)
      .order('created_at', { ascending: false })

    if (type === 'sent') {
      query = query.eq('from_user_id', user.id)
    } else if (type === 'received') {
      query = query.eq('to_user_id', user.id)
    } else {
      // Get both sent and received
      query = query.or(`from_user_id.eq.${user.id},to_user_id.eq.${user.id}`)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'エラーが発生しました' },
      { status: 500 }
    )
  }
}

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

    // Check if user is a paid member
    const { data: membership } = await supabase
      .from('memberships')
      .select('type, tier')
      .eq('user_id', user.id)
      .single()

    if (membership?.type !== 'paid') {
      return NextResponse.json(
        { error: '有料会員のみ利用可能です' },
        { status: 403 }
      )
    }

    // Check monthly request limit based on tier
    const limits = {
      bronze: 10,
      silver: 10,
      gold: 20,
      platinum: 999, // Unlimited
    }

    const limit = limits[membership.tier as keyof typeof limits] || 10

    // Count requests sent this month
    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    
    const { count } = await supabase
      .from('matching_requests')
      .select('*', { count: 'exact', head: true })
      .eq('from_user_id', user.id)
      .gte('created_at', monthStart.toISOString())

    if (count && count >= limit) {
      return NextResponse.json(
        { error: `月間リクエスト上限（${limit}件）に達しました` },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { to_user_id, proposed_dates, message, introduction, topic } = body

    // Validate required fields
    if (!to_user_id || !proposed_dates || !message || !introduction) {
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
        { status: 400 }
      )
    }

    // Check if request already exists
    const { data: existingRequest } = await supabase
      .from('matching_requests')
      .select('id')
      .eq('from_user_id', user.id)
      .eq('to_user_id', to_user_id)
      .eq('status', 'pending')
      .single()

    if (existingRequest) {
      return NextResponse.json(
        { error: 'すでにリクエストを送信しています' },
        { status: 400 }
      )
    }

    // Create matching request
    const { data, error } = await supabase
      .from('matching_requests')
      .insert({
        from_user_id: user.id,
        to_user_id,
        proposed_dates,
        message,
        introduction,
        topic: topic || null,
        status: 'pending',
        expires_at: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(), // 72 hours
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    // Create notification for the recipient
    await supabase
      .from('notifications')
      .insert({
        user_id: to_user_id,
        type: 'matching_request',
        title: '新しいマッチングリクエスト',
        message: `${user.email}さんから「一緒に飲みたい」リクエストが届きました`,
        data: { request_id: data.id },
      })

    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'エラーが発生しました' },
      { status: 500 }
    )
  }
}