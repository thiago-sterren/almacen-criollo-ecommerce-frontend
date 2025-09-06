"use client"

import { useEffect } from "react"
import { useCart } from "@/hooks/use-cart"
import { toast } from "sonner"

const useSyncCartStock = () => {
  const { items, removeItem } = useCart()

  useEffect(() => {
    const interval = setInterval(async () => {
      const validations = items.map(async (item) => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[slug][$eq]=${item.slug}&populate=*`
          )
          const json = await res.json()
          const product = json?.data?.[0]

          if (!product) {
            return {
              item,
              reason: "not-found" as const,
              message: `${item.productName} fue removido del carrito porque no se encontró en el sistema.`,
            }
          }

          const { productName, active, stock, price } = product

          if (!active) {
            return {
              item,
              reason: "inactive" as const,
              message: `${productName} fue removido del carrito porque ya no está disponible.`,
            }
          }

          if (item.quantity > stock) {
            return {
              item,
              reason: "stock" as const,
              message: `${productName} fue removido del carrito porque nuestro stock es menor a las cantidades que querías llevar. Intenta agregarlo nuevamente.`,
            }
          }

          if (item.price !== price) {
            return {
              item,
              reason: "price" as const,
              message: `${productName} fue removido del carrito porque su precio cambió. Intenta agregarlo nuevamente.`,
            }
          }

          return null // válido
        } catch (error) {
          console.error(`Error al validar ${item.slug}:`, error)
          return {
            item,
            reason: "error" as const,
            message: `${item.productName} fue removido del carrito por un error de validación.`,
          }
        }
      })

      const results = await Promise.allSettled(validations)

      results.forEach((result) => {
        if (result.status === "fulfilled" && result.value) {
          const { item, message } = result.value
          removeItem(item.id)
          toast.error(message)
        }
      })
    }, 10000) // cada 10 segundos

    return () => clearInterval(interval)
  }, [items, removeItem])
}

export default useSyncCartStock