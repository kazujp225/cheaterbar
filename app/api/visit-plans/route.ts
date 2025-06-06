import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Simplified mock response for build
    return NextResponse.json({ 
      data: [],
      message: '来店予定機能は現在準備中です。'
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'エラーが発生しました' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Simplified mock response for build
    return NextResponse.json({ 
      success: true,
      message: '来店予定機能は現在準備中です。'
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'エラーが発生しました' },
      { status: 500 }
    )
  }
}