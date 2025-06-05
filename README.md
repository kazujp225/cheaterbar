# CHEETAH BAR - 起業家のための会員制ナイトバー

## 概要

CHEETAH BARは、「開業チーター」が運営する起業家・経営者のための会員制ナイトバーです。
麻布十番に位置し、スタートアップコミュニティの交流拠点として機能しています。

## 主な機能

### 🔐 認証・会員管理
- 会員登録・ログイン（Supabase Auth）
- 無料会員・有料会員の区別
- 会員ステータス（Bronze/Silver/Gold/Platinum）

### 💳 決済システム
- Stripe統合による月額5,000円のサブスクリプション
- 安全なクレジットカード決済

### 📅 来店予定機能
- 来店予定の登録・閲覧
- 公開設定（全体公開/会員限定/匿名/非公開）
- カレンダービューでの表示

### 🤝 マッチングシステム
- 「一緒に飲みたい」リクエスト送信
- リクエストの承認/拒否
- マッチング履歴の管理

### 🍹 メニュー
- 会員無料ドリンク
- プレミアムカクテル・フードメニュー
- 季節限定メニュー

### 📱 マイページ（/mypage）
- プロフィール管理
- 会員ステータス確認
- 来店予定登録
- マッチングリクエスト管理
- デジタル会員証

## セットアップ

### 必要な環境
- Node.js 18以上
- npm または pnpm

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/your-repo/cheetah-bar.git
cd cheetah-bar

# 依存関係のインストール
npm install --legacy-peer-deps

# 環境変数の設定
cp .env.example .env.local
# .env.localファイルを編集して必要な値を設定
```

### 環境変数

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
STRIPE_MONTHLY_PRICE_ID=price_monthly_5000

# その他
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### データベースセットアップ

1. Supabaseプロジェクトを作成
2. `supabase/migrations/001_initial_schema.sql`をSupabaseのSQLエディタで実行
3. 認証設定でメール認証を有効化

### テストユーザー

開発環境でのテスト用アカウント：
- メール: `test@gmail.com`
- パスワード: `test1234`

Supabase CLIを使用してテストユーザーを作成：
```bash
supabase auth admin create-user --email test@gmail.com --password test1234
```

または、Supabaseダッシュボードの認証セクションから手動で作成してください。

### 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でアプリケーションが起動します。

## プロジェクト構造

```
cheetah-bar/
├── app/                    # Next.js App Router
│   ├── auth/              # 認証関連ページ
│   ├── mypage/            # マイページ
│   ├── visit-plans/       # 来店予定
│   ├── matching/          # マッチング
│   └── api/               # APIルート
├── components/            # Reactコンポーネント
│   ├── ui/               # shadcn/uiコンポーネント
│   └── mypage/           # マイページ用コンポーネント
├── lib/                   # ユーティリティ関数
├── supabase/             # データベース関連
│   └── migrations/       # DBマイグレーション
└── public/               # 静的ファイル
```

## 技術スタック

- **フロントエンド**: Next.js 15, React 19, TypeScript
- **スタイリング**: Tailwind CSS, shadcn/ui
- **認証**: Supabase Auth
- **データベース**: PostgreSQL (Supabase)
- **決済**: Stripe
- **その他**: Framer Motion, date-fns, QRCode

## 開発ガイドライン

- TypeScriptの型定義を必須とする
- ESLint/Prettierの設定に従う
- コンポーネントはfunctional componentで統一
- データベースアクセスはSupabaseクライアント経由

## ライセンス

Copyright © 2025 Kaigyo-Cheetah Inc. All rights reserved.