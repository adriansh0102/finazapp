"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  ChevronDown,
  ClipboardList,
  Cog,
  FileText,
  Home,
  LayoutGrid,
  Layers,
  Package,
  PieChart,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useTranslation } from "@/hooks/use-translation"
import { useSidebar } from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Image from "next/image"

interface SidebarItemProps {
  icon: React.ElementType
  label: string
  href: string
  isActive?: boolean
  subItems?: { label: string; href: string }[]
}

function SidebarItem({ icon: Icon, label, href, isActive, subItems }: SidebarItemProps) {
  const [open, setOpen] = useState(false)
  const hasSubItems = subItems && subItems.length > 0

  return (
    <div>
      {hasSubItems ? (
        <Collapsible open={open} onOpenChange={setOpen}>
          <div className="flex items-center">
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2 px-3 py-2 text-left",
                  isActive && "bg-accent text-accent-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="flex-1">{label}</span>
                <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="ml-8 mt-1 space-y-1">
              {subItems.map((subItem) => (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                >
                  {subItem.label}
                </Link>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <Link href={href}>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2 px-3 py-2 text-left",
              isActive && "bg-accent text-accent-foreground",
            )}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </Button>
        </Link>
      )}
    </div>
  )
}

export function AppSidebar() {
  const pathname = usePathname()
  const { t } = useTranslation()
  const { open, setOpen } = useSidebar()

  const sidebarItems = [
    {
      icon: Home,
      label: t("sidebar.dashboard"),
      href: "/",
    },
    {
      icon: ClipboardList,
      label: t("sidebar.transactions"),
      href: "/transactions",
    },
    {
      icon: BarChart3,
      label: t("sidebar.budgets"),
      href: "/budgets",
    },
    {
      icon: PieChart,
      label: t("sidebar.reports"),
      href: "/reports",
      subItems: [
        { label: t("sidebar.monthly"), href: "/reports/monthly" },
        { label: t("sidebar.annual"), href: "/reports/annual" },
        { label: t("sidebar.categories"), href: "/reports/categories" },
      ],
    },
    {
      icon: Cog,
      label: t("sidebar.configuration"),
      href: "/configuration",
      subItems: [
        { label: t("sidebar.profile"), href: "/configuration/profile" },
        { label: t("sidebar.preferences"), href: "/configuration/preferences" },
        { label: t("sidebar.security"), href: "/configuration/security" },
      ],
    },
    {
      icon: Package,
      label: t("sidebar.component_gallery"),
      href: "/components",
    },
    {
      icon: LayoutGrid,
      label: "Formularios",
      href: "/forms",
    },
    {
      icon: Layers,
      label: "Tablas",
      href: "/tables",
    },
    {
      icon: FileText,
      label: t("sidebar.documentation"),
      href: "/documentation",
    },
  ]

  // Mobile sidebar
  const MobileSidebar = (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className="p-0">
      <div className="flex h-16 items-center px-4">
        <Image src="favicon.png" alt="Logo" width={48} height={48} />
        <div className="text-xl font-bold px-4">FinanzApp</div>
      </div>
        
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="px-2 py-4">
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                isActive={pathname === item.href}
                subItems={item.subItems}
              />
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )

  // Desktop sidebar
  const DesktopSidebar = (
    <div className="hidden border-r bg-background md:block md:w-64">
      <div className="flex h-16 items-center px-4">
        <Image src="favicon.png" alt="Logo" width={48} height={48} />
        <div className="text-xl font-bold px-4">FinanzApp</div>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="px-2 py-4">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={pathname === item.href}
              subItems={item.subItems}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )

  return (
    <>
      {MobileSidebar}
      {DesktopSidebar}
    </>
  )
}
