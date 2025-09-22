import { ProductType } from "@/types/product"
import { useEffect, useState } from "react"
import { PaginationMeta } from "@/types/paginationMeta"

export function useSearchProducts(query: string, page: number = 1, pageSize: number = 12) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*&filters[active][$eq]=true&filters[productName][$containsi]=${query}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  const [result, setResult] = useState<ProductType[] | null>(null)
  const [meta, setMeta] = useState<PaginationMeta | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!query) return

    (async () => {
      try {
        const res = await fetch(url)
        const json = await res.json()
        setResult(json.data)
        setMeta(json.meta.pagination)
        setLoading(false)
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : String(error))
        setLoading(false)
      }
    })()
  }, [url, query])

  return { loading, result, error, meta }
}
