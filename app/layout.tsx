import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import ClientWrapper from "./api/auth/components/ClientWrapper"
import { Toaster } from "@/components/ui/toaster"
import { ThemeToggle } from "@/components/theme-toggle"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_TITLE || 'FinanzApp',
  description: process.env.NEXT_PUBLIC_DESCRIPTION || 'Aplicación para gestionar tus finanzas empresariales y personales',
  manifest: process.env.NEXT_PUBLIC_MANIFEST || '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: process.env.NEXT_PUBLIC_TITLE || 'FinanzApp',
  },
  icons: {
    icon: [
      { url: process.env.NEXT_PUBLIC_ICONS_ICON_192X192 || 'icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: process.env.NEXT_PUBLIC_ICONS_ICON_512X512 || 'icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: process.env.NEXT_PUBLIC_ICONS_APPLE_192X192 || 'icons/apple-icon-192x192.png', sizes: '192x192', type: 'image/png' },
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClientWrapper>
            <LanguageProvider>
              <SidebarProvider>
               
                {children}
              </SidebarProvider>
            </LanguageProvider>
          </ClientWrapper>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
