import { ProductType } from "@/types/product";
import { useEffect, useState } from "react";

export function useGetProductBySlug(slug: string | string[]) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[slug][$eq]=${slug}&populate=*&filters[active][$eq]=true`
    const [result, setResult] = useState<ProductType | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        (async() => {
            try {
                const res = await fetch(url)
                const json = await res.json()
                setResult(json.data[0] ?? null)
                setLoading(false)
            } catch (error: unknown) {
                setError(error instanceof Error ? error.message : String(error))
                setLoading(false)
            }
        })()
    }, [url])

    return ({ loading, result, error })
}