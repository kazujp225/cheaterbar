import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Simplified mock response for build
    return NextResponse.json({ 
      success: true,
      message: 'マッチング機能は現在準備中です。'
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'エラーが発生しました' },
      { status: 500 }
    )
  }
}