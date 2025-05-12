"use client"

import { useEffect, useState } from "react"

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Verificar si estamos en el cliente
    if (typeof window === "undefined") return

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Comprobar inicialmente
    checkIsMobile()

    // Agregar listener para cambios de tamaño
    window.addEventListener("resize", checkIsMobile)

    // Limpiar listener
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  return isMobile
}
