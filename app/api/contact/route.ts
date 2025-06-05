import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/dummy-db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // バリデーション
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "名前、メールアドレス、メッセージは必須項目です" },
        { status: 400 }
      )
    }

    // メールアドレスの簡易バリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "有効なメールアドレスを入力してください" },
        { status: 400 }
      )
    }

    // 新しい問い合わせを作成
    const newInquiry = {
      id: db.generateId(),
      name,
      email,
      message,
      createdAt: new Date()
    }

    // データベースに追加
    db.contactInquiries.push(newInquiry)

    // 実際のアプリケーションでは、ここでメール送信処理を行います
    // await sendNotificationEmail(newInquiry)

    return NextResponse.json({
      message: "お問い合わせを受け付けました。担当者より返信いたしますので、しばらくお待ちください。",
      inquiry: newInquiry
    }, { status: 201 })

  } catch (error) {
    console.error("問い合わせ処理エラー:", error)
    return NextResponse.json(
      { error: "お問い合わせの処理中にエラーが発生しました" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // 管理者用のエンドポイント（認証が必要）
    // 実際のアプリケーションでは認証チェックを実装
    
    const inquiries = db.contactInquiries.sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    )

    return NextResponse.json(inquiries)
  } catch (error) {
    console.error("問い合わせ取得エラー:", error)
    return NextResponse.json(
      { error: "問い合わせの取得中にエラーが発生しました" },
      { status: 500 }
    )
  }
}