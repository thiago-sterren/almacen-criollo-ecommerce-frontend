import { useEffect, useState } from "react"
import { OrderType } from "@/types/order"

export function useGetOrderByToken(orderToken: string | string[]) {
    const token = Array.isArray(orderToken) ? orderToken[0] : orderToken
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders?filters[orderToken][$eq]=${encodeURIComponent(token)}`
    const [result, setResult] = useState<OrderType | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        (async() => {
            try {
                const res = await fetch(url)
                const json = await res.json()
                setResult(json[0] ?? null)
                setLoading(false)
            } catch (error: unknown) {
                console.error("Error fetching order:", error)
                setError(error instanceof Error ? error.message : String(error))
                setLoading(false)
            }
        })()
    }, [url])

    return ({ loading, result, error })
}