import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/dummy-db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, memberType, name } = body

    // バリデーション
    if (!email || !memberType) {
      return NextResponse.json(
        { error: "メールアドレスと会員タイプは必須項目です" },
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

    // 会員タイプのバリデーション
    if (memberType !== "開業チーター" && memberType !== "ビジター") {
      return NextResponse.json(
        { error: "無効な会員タイプです" },
        { status: 400 }
      )
    }

    // 既存会員のチェック
    const existingMember = db.members.find(member => member.email === email)
    if (existingMember) {
      return NextResponse.json(
        { error: "このメールアドレスは既に登録されています" },
        { status: 409 }
      )
    }

    // 新しい会員を作成
    const newMember = {
      id: db.generateId(),
      email,
      memberType,
      name: name || undefined,
      createdAt: new Date()
    }

    // データベースに追加
    db.members.push(newMember)

    // 実際のアプリケーションでは、ここでウェルカムメール送信処理を行います
    // await sendWelcomeEmail(newMember)

    return NextResponse.json({
      message: "会員登録が完了しました",
      member: newMember
    }, { status: 201 })

  } catch (error) {
    console.error("会員登録エラー:", error)
    return NextResponse.json(
      { error: "会員登録の処理中にエラーが発生しました" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // URLからクエリパラメータを取得
    const { searchParams } = new URL(request.url)
    const memberType = searchParams.get('memberType')

    let members = [...db.members]

    // 会員タイプでフィルタリング
    if (memberType) {
      members = members.filter(member => member.memberType === memberType)
    }

    // 作成日の降順でソート
    members.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

    return NextResponse.json(members)
  } catch (error) {
    console.error("会員取得エラー:", error)
    return NextResponse.json(
      { error: "会員情報の取得中にエラーが発生しました" },
      { status: 500 }
    )
  }
}