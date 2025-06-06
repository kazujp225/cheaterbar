import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Simplified mock response for build
    return NextResponse.json({ 
      success: true,
      message: '会員解約機能は現在準備中です。お問い合わせください。'
    })
  } catch (error: any) {
    console.error('Subscription cancellation error:', error)
    return NextResponse.json(
      { error: error.message || '解約処理中にエラーが発生しました' },
      { status: 500 }
    )
  }
}