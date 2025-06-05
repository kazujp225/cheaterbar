-- Seed data for testing
-- Test user: test@gmail.com / test1234

-- First, create a test user in auth.users
-- Note: In production Supabase, you would use the Supabase Dashboard or Auth API to create users
-- This is a placeholder to show the structure

-- Insert test profile (assumes user already exists in auth.users)
-- You'll need to create the user first via Supabase Auth, then use the generated UUID here

-- Example test data (replace the UUID with actual user ID after creating user):
/*
INSERT INTO profiles (id, email, full_name, company_name, position, phone, bio, interests)
VALUES (
  'YOUR-USER-UUID-HERE',
  'test@gmail.com',
  'テスト太郎',
  '株式会社テストカンパニー',
  '代表取締役CEO',
  '090-1234-5678',
  'テストユーザーです。スタートアップの世界で頑張っています。',
  ARRAY['AI・機械学習', 'SaaS', '資金調達']
);

INSERT INTO memberships (user_id, type, status, tier, started_at)
VALUES (
  'YOUR-USER-UUID-HERE',
  'paid',
  'active',
  'silver',
  NOW() - INTERVAL '5 months'
);
*/

-- For local development, you can use Supabase CLI to create test users:
-- supabase auth admin create-user --email test@gmail.com --password test1234