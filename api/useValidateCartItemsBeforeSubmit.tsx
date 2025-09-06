import { CartItem } from "@/types/cartitem"

type ValidationIssue = {
  slug: string
  name: string
  reason: "stock" | "price" | "inactive" | "not-found" | "error"
  expected?: number | boolean
  actual?: number | boolean
}

export const useValidateCartItemsBeforeSubmit = () => {
  const validate = async (items: CartItem[]): Promise<ValidationIssue[]> => {
    const validations = items.map(async (item): Promise<ValidationIssue[] | ValidationIssue> => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[slug][$eq]=${item.slug}&populate=*`
        )
        const json = await res.json()
        const product = json?.data?.[0]

        if (!product) {
          return {
            slug: item.slug,
            name: item.productName,
            reason: "not-found",
          } as const
        }

        const { productName, active, stock, price } = product
        const issues: ValidationIssue[] = []

        if (!active) {
          issues.push({
            slug: item.slug,
            name: productName,
            reason: "inactive",
            expected: true,
            actual: false,
          })
        }

        if (item.quantity > stock) {
          issues.push({
            slug: item.slug,
            name: productName,
            reason: "stock",
            expected: item.quantity,
            actual: stock,
          })
        }

        if (item.price !== price) {
          issues.push({
            slug: item.slug,
            name: productName,
            reason: "price",
            expected: item.price,
            actual: price,
          })
        }

        return issues
      } catch (error) {
        console.error(`Error al validar ${item.slug}:`, error)
        return {
          slug: item.slug,
          name: item.productName,
          reason: "error",
        } as const
      }
    })

    const results = await Promise.allSettled(validations)

    const invalids: ValidationIssue[] = []

    for (const result of results) {
      if (result.status === "fulfilled") {
        const value = result.value
        if (Array.isArray(value)) {
          invalids.push(...value)
        } else {
          invalids.push(value)
        }
      } else {
        console.error("Error inesperado en validación:", result.reason)
      }
    }

    return invalids
  }

  return { validate }
}