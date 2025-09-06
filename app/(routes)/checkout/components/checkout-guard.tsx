"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function CheckoutGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    const valid = sessionStorage.getItem("checkoutReady") === "true"
    if (!valid) {
        router.replace("/")
    } else {
        setIsValid(true)
    }

    const removeItemInSessionStorage = () => {
        sessionStorage.removeItem("checkoutReady")
    }

    window.addEventListener("beforeunload", removeItemInSessionStorage)
    window.addEventListener("popstate", removeItemInSessionStorage)

    return () => { // (cleanup function) el return se activa cuando el componente se desmonta, este código permite que no se acumulen event listeners iguales en la window
        window.removeEventListener("beforeunload", removeItemInSessionStorage)
        window.removeEventListener("popstate", removeItemInSessionStorage)
    }
  }, [router])

  if (!isValid) return null // esto evita el render del contenido del checkout hasta validar que el acceso al mismo es válido

  return <>{children}</>
}