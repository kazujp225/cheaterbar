import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header" // Import Header
import Footer from "@/components/Footer" // Import Footer
import { ThemeProvider } from "@/components/theme-provider" // Assuming you have this
import ScrollIndicator from "@/components/ScrollIndicator"
import { AuthProvider } from "@/lib/auth-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CHEETAH BAR - Startup minds gather, ideas sprint.",
  description: "Futuristic night lounge for entrepreneurs and innovators. Produced by Kaigyo Cheetah.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Critical CSS for initial render */
              * { margin: 0; padding: 0; box-sizing: border-box; }
              html { scroll-behavior: smooth; }
              body { min-height: 100vh; }
              .dark { background-color: #000; color: #fff; }
              .dark body { background-color: #000; }
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'dark';
                if (theme === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.backgroundColor = '#000';
                  document.documentElement.style.color = '#fff';
                }
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
            <ScrollIndicator />
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
