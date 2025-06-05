import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { headers } from 'next/headers'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const body = await request.json()
    const { selected_date } = body

    if (!selected_date) {
      return NextResponse.json(
        { error: '日程を選択してください' },
        { status: 400 }
      )
    }

    // Get the matching request
    const { data: matchingRequest, error: fetchError } = await supabase
      .from('matching_requests')
      .select('*')
      .eq('id', params.id)
      .eq('to_user_id', user.id)
      .eq('status', 'pending')
      .single()

    if (fetchError || !matchingRequest) {
      return NextResponse.json(
        { error: 'リクエストが見つかりません' },
        { status: 404 }
      )
    }

    // Check if request has expired
    if (new Date(matchingRequest.expires_at) < new Date()) {
      // Update status to expired
      await supabase
        .from('matching_requests')
        .update({ status: 'expired' })
        .eq('id', params.id)

      return NextResponse.json(
        { error: 'リクエストの有効期限が切れています' },
        { status: 400 }
      )
    }

    // Update the request status
    const { data, error: updateError } = await supabase
      .from('matching_requests')
      .update({
        status: 'accepted',
        responded_at: new Date().toISOString(),
      })
      .eq('id', params.id)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 400 }
      )
    }

    // Create matching history record
    await supabase
      .from('matching_history')
      .insert({
        request_id: params.id,
        matched_date: selected_date.date,
        location: 'CHEETAH BAR',
      })

    // Create notification for the requester
    await supabase
      .from('notifications')
      .insert({
        user_id: matchingRequest.from_user_id,
        type: 'matching_response',
        title: 'マッチングリクエストが承認されました',
        message: 'あなたのリクエストが承認されました。詳細を確認してください。',
        data: { request_id: params.id, status: 'accepted', selected_date },
      })

    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'エラーが発生しました' },
      { status: 500 }
    )
  }
}