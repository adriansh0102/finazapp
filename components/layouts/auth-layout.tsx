import type React from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen ">
      <div className="flex flex-col justify-center p-4 md:p-10">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Volver al inicio
            </Link>
          </Button>
          <ThemeToggle />
        </div>

        <div className="w-full max-w-md mx-auto space-y-6">{children}</div>
      </div>
    </div>
  )
}
