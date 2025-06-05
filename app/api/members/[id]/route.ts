import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/dummy-db"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const member = db.members.find(m => m.id === params.id)
    
    if (!member) {
      return NextResponse.json(
        { error: "会員が見つかりません" },
        { status: 404 }
      )
    }

    return NextResponse.json(member)
  } catch (error) {
    console.error("会員取得エラー:", error)
    return NextResponse.json(
      { error: "会員情報の取得中にエラーが発生しました" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const memberIndex = db.members.findIndex(m => m.id === params.id)
    
    if (memberIndex === -1) {
      return NextResponse.json(
        { error: "会員が見つかりません" },
        { status: 404 }
      )
    }

    const body = await request.json()
    const { memberType, name } = body

    // 会員タイプのバリデーション（提供された場合）
    if (memberType && memberType !== "開業チーター" && memberType !== "ビジター") {
      return NextResponse.json(
        { error: "無効な会員タイプです" },
        { status: 400 }
      )
    }

    // 会員情報を更新
    if (memberType) {
      db.members[memberIndex].memberType = memberType
    }
    if (name !== undefined) {
      db.members[memberIndex].name = name || undefined
    }

    return NextResponse.json({
      message: "会員情報を更新しました",
      member: db.members[memberIndex]
    })
  } catch (error) {
    console.error("会員更新エラー:", error)
    return NextResponse.json(
      { error: "会員情報の更新中にエラーが発生しました" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const memberIndex = db.members.findIndex(m => m.id === params.id)
    
    if (memberIndex === -1) {
      return NextResponse.json(
        { error: "会員が見つかりません" },
        { status: 404 }
      )
    }

    // 会員を削除
    const deletedMember = db.members.splice(memberIndex, 1)[0]

    return NextResponse.json({
      message: "会員を削除しました",
      member: deletedMember
    })
  } catch (error) {
    console.error("会員削除エラー:", error)
    return NextResponse.json(
      { error: "会員の削除中にエラーが発生しました" },
      { status: 500 }
    )
  }
}