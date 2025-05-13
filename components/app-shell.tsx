import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-100 dark:bg-gray-900/50">
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6 shadow-sm">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
