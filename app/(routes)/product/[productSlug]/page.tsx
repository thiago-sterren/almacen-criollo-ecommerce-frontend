"use client"

import { useParams } from "next/navigation"
import { useGetProductBySlug } from "@/api/useGetProductBySlug"
import SkeletonProduct from "./components/skeleton-product"
import CarouselProduct from "./components/carousel-product"
import InfoProduct from "./components/info-product"

export default function Page () {
    const params = useParams()
    const { productSlug } = params
    const { result, loading } = useGetProductBySlug(productSlug ?? "")

    if (loading) {
        return <SkeletonProduct />
    }

    if (!result) {
        return (
            <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24">
                <p className="text-center text-lg text-gray-500">
                    No se encontró este producto en el sistema.
                </p>
            </div>
        )
    }

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24">
            <div className="grid sm:grid-cols-2">
                <div>
                    <CarouselProduct images={result.images} />
                </div>
                <div className="sm:px-12">
                    <InfoProduct product={result} />
                </div>
            </div>
        </div>
    )
}