# 🔧 CHEETAH BAR - 技術仕様書

## システム全体構成

### フロントエンド
- **フレームワーク**: Next.js 15 (App Router)
- **UI フレームワーク**: Tailwind CSS + shadcn/ui
- **アニメーション**: Framer Motion
- **状態管理**: React Context API / Zustand
- **フォーム管理**: React Hook Form + Zod

### バックエンド
- **API**: Next.js API Routes
- **データベース**: PostgreSQL (Supabase)
- **認証**: Supabase Auth
- **ファイルストレージ**: Supabase Storage
- **リアルタイム**: Supabase Realtime

### 外部サービス連携
- **決済**: Stripe
- **メール送信**: SendGrid / Resend
- **SMS通知**: Twilio
- **プッシュ通知**: Firebase Cloud Messaging
- **地図**: Google Maps API
- **カレンダー**: Google Calendar API

## 主要機能の実装詳細

### 🔐 認証・会員管理

#### 認証フロー
```typescript
// 会員登録
1. メールアドレス・パスワード入力
2. Supabase Auth でユーザー作成
3. プロフィール情報を profiles テーブルに保存
4. 会員種別に応じて memberships テーブルに登録
5. ウェルカムメール送信

// ログイン
1. メールアドレス・パスワード認証
2. JWT トークン発行
3. セッション管理（7日間有効）
```

#### データベーススキーマ
```sql
-- ユーザープロフィール
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  company_name TEXT,
  position TEXT,
  phone TEXT,
  avatar_url TEXT,
  bio TEXT,
  interests TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 会員情報
CREATE TABLE memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  type TEXT NOT NULL CHECK (type IN ('free', 'paid')),
  status TEXT NOT NULL DEFAULT 'active',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  started_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  tier TEXT DEFAULT 'bronze'
);
```

### 💳 決済システム (Stripe)

#### 月額課金フロー
```typescript
// 1. Stripe Customer 作成
const customer = await stripe.customers.create({
  email: user.email,
  name: user.fullName,
  metadata: { userId: user.id }
});

// 2. サブスクリプション作成
const subscription = await stripe.subscriptions.create({
  customer: customer.id,
  items: [{ price: 'price_monthly_5000' }],
  payment_settings: {
    payment_method_types: ['card'],
  }
});

// 3. Webhook でサブスクリプション状態を同期
```

#### Webhook エンドポイント
- `subscription.created`: 新規登録時
- `subscription.updated`: プラン変更時
- `subscription.deleted`: 解約時
- `invoice.paid`: 支払い成功時
- `invoice.payment_failed`: 支払い失敗時

### 📅 来店予定システム

#### データモデル
```sql
-- 来店予定
CREATE TABLE visit_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  visit_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME,
  visibility TEXT DEFAULT 'public',
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_visit_date ON visit_plans(visit_date);
CREATE INDEX idx_user_id ON visit_plans(user_id);
```

#### リアルタイム更新
```typescript
// Supabase Realtime でリアルタイム更新
const subscription = supabase
  .from('visit_plans')
  .on('INSERT', payload => {
    // 新規来店予定を画面に反映
    updateVisitCalendar(payload.new);
  })
  .subscribe();
```

### 🤝 マッチングシステム

#### データモデル
```sql
-- マッチングリクエスト
CREATE TABLE matching_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id UUID REFERENCES profiles(id),
  to_user_id UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'pending',
  proposed_dates JSONB,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  responded_at TIMESTAMP
);

-- マッチング履歴
CREATE TABLE matching_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID REFERENCES matching_requests(id),
  matched_date DATE,
  location TEXT,
  notes TEXT,
  rating INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### マッチングアルゴリズム
```typescript
// 相性スコア計算
function calculateCompatibility(user1: Profile, user2: Profile): number {
  let score = 0;
  
  // 興味分野の重複
  const commonInterests = user1.interests.filter(i => 
    user2.interests.includes(i)
  );
  score += commonInterests.length * 10;
  
  // 過去のマッチング成功率
  const previousMatches = await getMatchingHistory(user1.id, user2.id);
  score += previousMatches.successRate * 20;
  
  // アクティビティレベル
  score += (user1.activityScore + user2.activityScore) / 2;
  
  return Math.min(score, 100);
}
```

### 📊 分析・レポート

#### 主要メトリクス
```typescript
// 日次レポート
interface DailyReport {
  date: Date;
  totalVisits: number;
  newMembers: number;
  matchingRequests: number;
  matchingSuccess: number;
  revenue: number;
  popularTimeSlots: TimeSlot[];
  activeMembers: number;
}

// 会員分析
interface MemberAnalytics {
  totalMembers: number;
  paidMembers: number;
  monthlyGrowth: number;
  churnRate: number;
  lifetimeValue: number;
  topIndustries: Industry[];
}
```

## セキュリティ要件

### データ保護
- **暗号化**: TLS 1.3 による通信暗号化
- **データベース**: 保存時の暗号化
- **個人情報**: PII のマスキング処理

### アクセス制御
- **Row Level Security**: Supabase RLS
- **API レート制限**: 1分間に60リクエスト
- **CORS設定**: 特定ドメインのみ許可

### 監査ログ
```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id UUID,
  metadata JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## パフォーマンス最適化

### フロントエンド
- **画像最適化**: Next.js Image Component
- **コード分割**: Dynamic imports
- **キャッシュ戦略**: SWR / React Query

### バックエンド
- **データベース最適化**: 
  - 適切なインデックス設計
  - マテリアライズドビュー
  - コネクションプーリング
- **API最適化**:
  - GraphQL での必要なデータのみ取得
  - バッチ処理
  - キャッシュヘッダー

## 開発・運用環境

### 環境構成
- **開発環境**: Vercel Preview Deployments
- **ステージング**: staging.cheetah-bar.com
- **本番環境**: cheetah-bar.com

### CI/CD
```yaml
# GitHub Actions
- 自動テスト実行
- ESLint / Prettier チェック
- TypeScript 型チェック
- Vercel への自動デプロイ
```

### モニタリング
- **エラー監視**: Sentry
- **パフォーマンス**: Vercel Analytics
- **ログ管理**: Supabase Logs
- **アップタイム**: UptimeRobot

## 今後の技術的拡張

### Phase 1 (3ヶ月)
- PWA対応
- オフライン機能
- 多言語対応（英語）

### Phase 2 (6ヶ月)
- ネイティブアプリ（React Native）
- AI マッチング最適化
- ビデオ通話機能

### Phase 3 (12ヶ月)
- ブロックチェーン会員証
- AR名刺交換
- 音声SNS連携