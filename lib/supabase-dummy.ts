// ダミー実装用のSupabaseクライアント

// ダミーデータストア
let dummyVisitPlans: any[] = []
let dummyMatchingRequests: any[] = []
let dummyNotifications: any[] = []

export const createBrowserSupabaseClient = () => {
  return {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: (table: string) => ({
      select: (query?: string) => ({
        eq: (column: string, value: any) => ({
          single: async () => ({ data: null, error: null }),
          order: (column: string, options?: any) => ({
            limit: (count: number) => ({
              then: async (resolve: any) => resolve({ data: getDummyData(table), error: null })
            })
          }),
          then: async (resolve: any) => resolve({ data: getDummyData(table), error: null })
        }),
        neq: (column: string, value: any) => ({
          order: (column: string, options?: any) => ({
            then: async (resolve: any) => resolve({ data: getDummyProfiles(), error: null })
          })
        }),
        gte: (column: string, value: any) => ({
          lte: (column: string, value: any) => ({
            eq: (column: string, value: any) => ({
              order: (column: string, options?: any) => ({
                order: (column2: string, options2?: any) => ({
                  then: async (resolve: any) => resolve({ data: getDummyData(table), error: null })
                })
              })
            })
          })
        }),
        in: (column: string, values: any[]) => ({
          then: async (resolve: any) => resolve({ data: getDummyData(table), error: null })
        }),
        order: (column: string, options?: any) => ({
          limit: (count: number) => ({
            then: async (resolve: any) => resolve({ data: getDummyData(table), error: null })
          }),
          then: async (resolve: any) => resolve({ data: getDummyData(table), error: null })
        }),
        then: async (resolve: any) => resolve({ data: getDummyData(table), error: null })
      }),
      insert: async (data: any) => {
        // ダミーデータを追加
        if (table === 'visit_plans') {
          const newPlan = { id: Date.now().toString(), ...data }
          dummyVisitPlans.push(newPlan)
          return { data: newPlan, error: null }
        }
        if (table === 'audit_logs') {
          return { data, error: null }
        }
        return { data, error: null }
      },
      update: async (data: any) => ({
        eq: (column: string, value: any) => ({
          select: () => ({
            single: async () => ({ data, error: null })
          })
        })
      })
    })
  }
}

function getDummyProfiles() {
  return [
    {
      id: 'dummy-user-002',
      full_name: '山田花子',
      email: 'yamada@example.com',
      company_name: '株式会社AI革命',
      position: 'CTO',
      interests: ['AI・機械学習', 'FinTech'],
      bio: 'AIプロダクトを開発しています。技術的な課題解決が得意です。'
    },
    {
      id: 'dummy-user-003',
      full_name: '鈴木一郎',
      email: 'suzuki@example.com',
      company_name: 'マーケティング株式会社',
      position: 'CMO',
      interests: ['マーケティング', 'SaaS'],
      bio: 'B2B SaaSのマーケティング戦略を専門にしています。'
    },
    {
      id: 'dummy-user-004',
      full_name: '佐藤次郎',
      email: 'sato@example.com',
      company_name: 'セールステック株式会社',
      position: 'CEO',
      interests: ['営業・セールス', 'SaaS'],
      bio: '営業効率化ツールを提供しています。'
    }
  ]
}

function getDummyData(table: string) {
  switch (table) {
    case 'profiles':
      return getDummyProfiles()
    case 'visit_plans':
      return [
        {
          id: '1',
          user_id: 'dummy-user-002',
          visit_date: '2024-06-10',
          start_time: '19:00',
          end_time: '21:00',
          visibility: 'public',
          message: '資金調達について相談したいです',
          is_cancelled: false,
          profile: {
            id: 'dummy-user-002',
            full_name: '山田花子',
            company_name: '株式会社AI革命',
            position: 'CTO',
            interests: ['AI・機械学習', 'FinTech']
          }
        },
        {
          id: '2',
          user_id: 'dummy-user-003',
          visit_date: '2024-06-11',
          start_time: '20:00',
          visibility: 'members_only',
          message: 'マーケティング戦略について意見交換したい',
          is_cancelled: false,
          profile: {
            id: 'dummy-user-003',
            full_name: '鈴木一郎',
            company_name: 'マーケティング株式会社',
            position: 'CMO',
            interests: ['マーケティング', 'SaaS']
          }
        }
      ]
    case 'matching_requests':
      return [
        {
          id: '1',
          from_user_id: 'dummy-user-001',
          to_user_id: 'dummy-user-002',
          status: 'pending',
          proposed_dates: [
            { date: '2024-06-15', time: '19:00-21:00' },
            { date: '2024-06-16', time: '20:00-22:00' }
          ],
          message: 'AIプロダクトについて相談したいです',
          introduction: 'テストカンパニーのCEOです',
          created_at: '2024-06-05T10:00:00Z',
          to_user: {
            id: 'dummy-user-002',
            full_name: '山田花子',
            company_name: '株式会社AI革命'
          },
          from_user: {
            id: 'dummy-user-001',
            full_name: 'テスト太郎',
            company_name: '株式会社テストカンパニー'
          }
        },
        {
          id: '2',
          from_user_id: 'dummy-user-001',
          to_user_id: 'dummy-user-003',
          status: 'accepted',
          proposed_dates: [
            { date: '2024-06-10', time: '19:00-21:00' }
          ],
          message: 'マーケティング戦略について',
          introduction: 'B2B SaaSを運営しています',
          created_at: '2024-06-01T10:00:00Z',
          to_user: {
            id: 'dummy-user-003',
            full_name: '鈴木一郎',
            company_name: 'マーケティング株式会社'
          },
          from_user: {
            id: 'dummy-user-001',
            full_name: 'テスト太郎',
            company_name: '株式会社テストカンパニー'
          }
        }
      ]
    case 'matching_history':
      return [
        {
          id: '1',
          matched_date: '2024-05-20',
          request: {
            from_user_id: 'dummy-user-001',
            to_user_id: 'dummy-user-004',
            topic: '営業戦略',
            to_user: {
              id: 'dummy-user-004',
              full_name: '佐藤次郎',
              company_name: 'セールステック株式会社'
            },
            from_user: {
              id: 'dummy-user-001',
              full_name: 'テスト太郎',
              company_name: '株式会社テストカンパニー'
            }
          }
        }
      ]
    default:
      return []
  }
}