# 🐆 CHEETAH BAR - プロジェクトドキュメント

## 概要

CHEETAH BARは、「開業チーター」が運営する起業家・経営者のための会員制ナイトバーです。
麻布十番に位置し、スタートアップコミュニティの交流拠点として機能しています。

## 📚 ドキュメント一覧

### 1. [CONCEPT.md](./CONCEPT.md)
- ビジョン・ミッション
- コアバリュー
- ターゲット顧客
- 提供価値

### 2. [MEMBERSHIP.md](./MEMBERSHIP.md) 
- 会員種別（無料会員・有料会員）
- 会員特典
- ステータスシステム
- 入会フロー

### 3. [FEATURES.md](./FEATURES.md)
- 来店予定可視化機能
- マッチングリクエスト機能
- 通知システム
- 今後の機能拡張

### 4. [EVENTS.md](./EVENTS.md)
- イベント種別
- 運営フロー
- 料金体系
- 成功指標

### 5. [MENU.md](./MENU.md)
- ドリンクメニュー（無料・有料）
- フードメニュー
- パーティープラン
- 季節限定メニュー

### 6. [TECHNICAL.md](./TECHNICAL.md)
- システム構成
- 技術スタック
- セキュリティ要件
- 開発・運用環境

### 7. [BRANDING.md](./BRANDING.md)
- ブランドアイデンティティ
- ビジュアルガイドライン
- コミュニケーショントーン
- ブランド使用規定

## 🚀 クイックスタート

### 開発環境セットアップ
```bash
# リポジトリのクローン
git clone https://github.com/cheetah-bar/website.git

# 依存関係のインストール
npm install --legacy-peer-deps

# 環境変数の設定
cp .env.example .env.local

# 開発サーバーの起動
npm run dev
```

### 必要な環境変数
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Google APIs
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

# 連絡先
NEXT_PUBLIC_PHONE_NUMBER=
NEXT_PUBLIC_LINE_URL=
NEXT_PUBLIC_GOOGLE_FORM_URL=
```

## 📋 プロジェクト構造

```
cheetah-bar/
├── app/                    # Next.js App Router
│   ├── about/             # Aboutページ
│   ├── menu/              # メニューページ
│   ├── membership/        # 会員制度ページ
│   ├── events/            # イベントページ
│   ├── access/            # アクセスページ
│   └── contact/           # お問い合わせページ
├── components/            # Reactコンポーネント
├── docs/                  # プロジェクトドキュメント
├── lib/                   # ユーティリティ関数
└── public/               # 静的ファイル
```

## 🎯 主要機能

### 会員向け機能
- 会員登録・ログイン
- プロフィール管理
- 来店予定の登録・閲覧
- マッチングリクエスト
- イベント申込
- 決済管理

### 管理者向け機能
- 会員管理
- イベント管理
- 売上分析
- マッチング分析

## 📈 ロードマップ

### Phase 1 (現在)
- [x] Webサイト構築
- [x] 基本的な会員機能
- [ ] Stripe決済統合
- [ ] 来店予定機能

### Phase 2 (3ヶ月)
- [ ] マッチング機能実装
- [ ] モバイルアプリ対応
- [ ] 分析ダッシュボード

### Phase 3 (6ヶ月)
- [ ] AI マッチング最適化
- [ ] 多言語対応
- [ ] 他店舗展開準備

## 🤝 コントリビューション

### 開発フロー
1. Issueの作成
2. ブランチ作成 (`feature/issue-number`)
3. 開発・テスト
4. Pull Request
5. レビュー・マージ

### コーディング規約
- ESLint/Prettier設定に従う
- TypeScriptの型定義必須
- コンポーネントはfunctional componentで統一

## 📞 お問い合わせ

- **店舗住所**: 東京都港区麻布十番1丁目5−10 第2石原ビル 別館1階
- **メール**: info@cheetah-bar.com
- **電話**: 03-XXXX-XXXX

## 📄 ライセンス

Copyright © 2025 Kaigyo-Cheetah Inc. All rights reserved.