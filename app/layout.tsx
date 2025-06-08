import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header" // Import Header
import Footer from "@/components/Footer" // Import Footer
import FloatingNav from "@/components/FloatingNav" // Import FloatingNav
import { ThemeProvider } from "@/components/theme-provider" // Assuming you have this
import { AuthProvider } from "@/lib/auth-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://cheaterbar.com'),
  title: "CHEETAH BAR - 開業チーター | 起業家のための会員制バー",
  description: "麻布十番の起業家・イノベーター向け会員制バー。開業チータープロデュース。ネットワーキング、マッチング、イベント開催。",
  generator: 'Next.js',
  keywords: ['開業チーター', 'CHEETAH BAR', '起業家', 'バー', '麻布十番', 'ネットワーキング', 'スタートアップ'],
  authors: [{ name: '開業チーター' }],
  openGraph: {
    title: 'CHEETAH BAR - 開業チーター',
    description: '起業家のための会員制バー',
    type: 'website',
    locale: 'ja_JP',
    siteName: 'CHEETAH BAR',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CHEETAH BAR - 開業チーター',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CHEETAH BAR - 開業チーター',
    description: '起業家のための会員制バー',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0077FF" />
        {/* DNS Prefetch for external domains */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        {/* Preload critical fonts */}
        <link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href="/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2" />
        {/* Preload critical images */}
        <link rel="preload" as="image" href="https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=90&w=1920&auto=format&fit=crop" />
        <link rel="preload" as="image" href="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=90&w=2000&auto=format&fit=crop" />
        {/* Prefetch about page images for faster navigation - reduced quality and size */}
        <link rel="prefetch" as="image" href="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=75&w=400&auto=format&fit=crop" />
        <link rel="prefetch" as="image" href="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=75&w=400&auto=format&fit=crop" />
        <link rel="prefetch" as="image" href="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=75&w=400&auto=format&fit=crop" />
        <link rel="prefetch" as="image" href="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=75&w=400&auto=format&fit=crop" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Critical CSS for initial render */
              * { margin: 0; padding: 0; box-sizing: border-box; }
              html { scroll-behavior: smooth; }
              body { min-height: 100vh; font-family: system-ui, -apple-system, sans-serif; }
              .dark { background-color: #000; color: #fff; }
              .dark body { background-color: #000; }
              /* Ensure text is always visible */
              body, main, section, div, p, h1, h2, h3, h4, h5, h6 {
                opacity: 1 !important;
                visibility: visible !important;
              }
              /* Optimize image rendering */
              img { 
                content-visibility: auto; 
                contain-intrinsic-size: 1px 200px;
              }
              /* Reduce layout shift for cards */
              .aspect-square { aspect-ratio: 1; }
              /* Optimize scrolling performance */
              .horizontal-scroll {
                -webkit-overflow-scrolling: touch;
                scroll-behavior: smooth;
                will-change: scroll-position;
              }
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                // Default to dark theme
                const savedTheme = localStorage.getItem('theme');
                const theme = savedTheme || 'dark';
                
                // Always apply dark theme unless user explicitly chose light
                if (theme === 'dark' || !savedTheme) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.backgroundColor = '#000';
                  document.documentElement.style.color = '#fff';
                }
                
                // Ensure content is visible immediately
                document.body.style.opacity = '1';
                document.body.style.visibility = 'visible';
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-white dark:bg-secondary text-gray-900 dark:text-white transition-colors duration-300`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Header />
            <FloatingNav />
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-md z-50">
              Skip to main content
            </a>
            <main id="main-content">
              {children}
            </main>
            <Footer />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
