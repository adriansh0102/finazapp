'use client'
import { AppShell } from "@/components/app-shell"
import { Dashboard } from "@/components/dashboard"
import { useAuth } from "@/app/api/auth/AuthContext"
import { useSession } from "next-auth/react"

export default function Home() {

  const { data: session } = useSession()

console.log({session})

  return (
    <AppShell>

      <p>{session?.user?.name || ''	}</p>
      
      <p>{session?.user?.email || ''}</p>
      <p>{session?.user?.phone || ''}</p>
      <p>{session?.user?.rol || ''}</p>
      <p>{session?.user?.username || ''}</p>
      <p>{session?.user?.status || ''}</p>
      <p>{session?.user?.permissions || ''}</p>
      <p>{session?.user?.token}</p>


      {/* <Dashboard /> */}
    </AppShell>
  )
}
