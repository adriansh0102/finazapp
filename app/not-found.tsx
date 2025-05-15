'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">404</h1>
        <h2 className="text-2xl font-semibold tracking-tight">{t("not_found.title")}</h2>
        <p className="text-muted-foreground">{t("not_found.description")}</p>
      </div>
      <Button asChild>
        <Link href="/">
          {t("not_found.back_home")}
        </Link>
      </Button>
    </div>
  )
}
