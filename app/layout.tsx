import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FinanzApp",
  description: "Aplicación para gestionar tus finanzas empresariales y personales",
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'FinanzApp',
  },
  icons: {
    icon: [
      { url: 'icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: 'icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: 'icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={cn(inter.className, "overflow-x-hidden")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
