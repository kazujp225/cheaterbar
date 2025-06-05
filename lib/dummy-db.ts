// This is a simple in-memory store for demo purposes.
// In a real application, you would use a database.

interface Reservation {
  id: string
  name: string
  email: string
  date: string
  people: number
  message?: string
  status: "pending" | "confirmed" | "cancelled"
  createdAt: Date
}

interface Event {
  id: string
  title: string
  description: string
  date: string
  isPublic: boolean
  createdAt: Date
}

interface Member {
  id: string
  email: string
  memberType: "開業チーター" | "ビジター"
  name?: string
  createdAt: Date
}

interface MenuItem {
  id: string
  name: string
  description: string
  price: string
  image: string
  category: string
  createdAt: Date
}

interface AccessSettings {
  address: string
  mapEmbedUrl: string
  station: string
  minutesToStation: string
}

interface ContactInquiry {
  id: string
  name: string
  email: string
  message: string
  createdAt: Date
}

const reservations: Reservation[] = [
  {
    id: "res1",
    name: "山田 太郎",
    email: "yamada@example.com",
    date: "2025-07-15",
    people: 2,
    status: "pending",
    createdAt: new Date("2025-06-01"),
  },
  {
    id: "res2",
    name: "鈴木 花子",
    email: "suzuki@example.com",
    date: "2025-07-16",
    people: 4,
    message: "窓際の席を希望します",
    status: "confirmed",
    createdAt: new Date("2025-06-02"),
  },
  {
    id: "res3",
    name: "佐藤 健",
    email: "sato@example.com",
    date: "2025-07-17",
    people: 1,
    status: "cancelled",
    createdAt: new Date("2025-06-03"),
  },
  {
    id: "res4",
    name: "田中 美咲",
    email: "tanaka@example.com",
    date: "2025-07-18",
    people: 3,
    message: "誕生日のお祝いで利用します",
    status: "pending",
    createdAt: new Date("2025-06-04"),
  },
]
const events: Event[] = [
  {
    id: "evt1",
    title: "Pitch Night",
    description: "起業家×投資家マッチ",
    date: "毎月第1金曜",
    isPublic: true,
    createdAt: new Date("2025-05-01"),
  },
  {
    id: "evt2",
    title: "AI Demo Day",
    description: "最新生成AIをライブ体験",
    date: "隔月",
    isPublic: true,
    createdAt: new Date("2025-05-15"),
  },
  {
    id: "evt3",
    title: "Startup Bootcamp",
    description: "3時間集中起業ワークショップ",
    date: "2025-07-20",
    isPublic: true,
    createdAt: new Date("2025-05-20"),
  },
  {
    id: "evt4",
    title: "プライベートパーティー",
    description: "会員限定の交流会",
    date: "2025-07-25",
    isPublic: false,
    createdAt: new Date("2025-05-25"),
  },
  {
    id: "evt5",
    title: "Tech Talk Tuesday",
    description: "最新テクノロジートレンド共有会",
    date: "毎週火曜 19:00〜",
    isPublic: true,
    createdAt: new Date("2025-05-30"),
  },
]
const members: Member[] = [
  { id: "mem1", email: "test@example.com", memberType: "開業チーター", name: "テストユーザー", createdAt: new Date("2025-04-01") },
  { id: "mem2", email: "startup@example.com", memberType: "開業チーター", name: "スタートアップ社長", createdAt: new Date("2025-04-15") },
  { id: "mem3", email: "visitor@example.com", memberType: "ビジター", name: "訪問者A", createdAt: new Date("2025-05-01") },
  { id: "mem4", email: "founder@example.com", memberType: "開業チーター", name: "創業者B", createdAt: new Date("2025-05-10") },
  { id: "mem5", email: "guest@example.com", memberType: "ビジター", name: "ゲストユーザー", createdAt: new Date("2025-05-20") },
]
const menuItems: MenuItem[] = [
  {
    id: "menu1",
    name: "Cheetah Dash",
    description: "ブルーキュラソーとジンの爽快スプリント",
    price: "¥1200",
    image: "/placeholder.svg?height=400&width=600",
    category: "Signature",
    createdAt: new Date("2025-03-01"),
  },
  {
    id: "menu2",
    name: "Neon Sprint",
    description: "ウォッカベースの電光石火カクテル",
    price: "¥1300",
    image: "/placeholder.svg?height=400&width=600",
    category: "Signature",
    createdAt: new Date("2025-03-01"),
  },
  {
    id: "menu3",
    name: "Startup Mojito",
    description: "フレッシュミントとライムの爽やかな一杯",
    price: "¥1100",
    image: "/placeholder.svg?height=400&width=600",
    category: "Classic",
    createdAt: new Date("2025-03-01"),
  },
  {
    id: "menu4",
    name: "Investor's Choice",
    description: "18年物ウイスキーのロック",
    price: "¥2000",
    image: "/placeholder.svg?height=400&width=600",
    category: "Premium",
    createdAt: new Date("2025-03-01"),
  },
  {
    id: "menu5",
    name: "Pivot Punch",
    description: "トロピカルフルーツの変化球カクテル",
    price: "¥1400",
    image: "/placeholder.svg?height=400&width=600",
    category: "Signature",
    createdAt: new Date("2025-03-01"),
  },
  {
    id: "menu6",
    name: "Unicorn Sparkle",
    description: "シャンパンベースの華やかなカクテル",
    price: "¥1800",
    image: "/placeholder.svg?height=400&width=600",
    category: "Premium",
    createdAt: new Date("2025-03-01"),
  },
  {
    id: "menu7",
    name: "Debug Beer",
    description: "クラフトビール各種",
    price: "¥800〜",
    image: "/placeholder.svg?height=400&width=600",
    category: "Beer",
    createdAt: new Date("2025-03-01"),
  },
  {
    id: "menu8",
    name: "Bootstrap Wine",
    description: "厳選ワイン赤・白",
    price: "¥900〜",
    image: "/placeholder.svg?height=400&width=600",
    category: "Wine",
    createdAt: new Date("2025-03-01"),
  },
  {
    id: "menu9",
    name: "Cheetah Nuts",
    description: "スパイシーミックスナッツ",
    price: "¥600",
    image: "/placeholder.svg?height=400&width=600",
    category: "Food",
    createdAt: new Date("2025-03-01"),
  },
  {
    id: "menu10",
    name: "Startup Cheese Platter",
    description: "3種のチーズ盛り合わせ",
    price: "¥1500",
    image: "/placeholder.svg?height=400&width=600",
    category: "Food",
    createdAt: new Date("2025-03-01"),
  },
]
const accessSettings: AccessSettings = {
  address: "東京都渋谷区XXXX-XX Cheetahビル1F",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.747980000000!2d139.7003693152587!3d35.65858048019906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b58b8b8b8b9%3A0x71b6db1b4f0e0b0c!2sShibuya%20Crossing!5e0!3m2!1sen!2sjp!4v1620000000000!5m2!1sen!2sjp",
  station: "渋谷駅",
  minutesToStation: "5",
}
const contactInquiries: ContactInquiry[] = [
  {
    id: "inq1",
    name: "問い合わせ太郎",
    email: "inquiry1@example.com",
    message: "会員制度について詳しく教えてください。",
    createdAt: new Date("2025-05-25"),
  },
  {
    id: "inq2",
    name: "イベント花子",
    email: "event@example.com",
    message: "Pitch Nightに参加したいのですが、どのように申し込めばよいですか？",
    createdAt: new Date("2025-05-28"),
  },
  {
    id: "inq3",
    name: "予約確認者",
    email: "confirm@example.com",
    message: "先日予約した日時を変更したいです。",
    createdAt: new Date("2025-06-01"),
  },
]

// Helper to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9)

export const db = {
  reservations,
  events,
  members,
  menuItems,
  accessSettings,
  contactInquiries,
  generateId,
}
