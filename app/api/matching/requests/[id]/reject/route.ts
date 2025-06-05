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

    // Update the request status
    const { data, error: updateError } = await supabase
      .from('matching_requests')
      .update({
        status: 'rejected',
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

    // Create notification for the requester
    await supabase
      .from('notifications')
      .insert({
        user_id: matchingRequest.from_user_id,
        type: 'matching_response',
        title: 'マッチングリクエストが拒否されました',
        message: 'あなたのリクエストは承認されませんでした。',
        data: { request_id: params.id, status: 'rejected' },
      })

    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'エラーが発生しました' },
      { status: 500 }
    )
  }
}