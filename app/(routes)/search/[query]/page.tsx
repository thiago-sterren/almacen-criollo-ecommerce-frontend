"use client"

import { useParams } from "next/navigation"

import { ProductType } from "@/types/product"
import { useSearchProducts } from "@/api/useSearchProducts"

import SkeletonSchema from "@/components/skeleton-schema"
import { Separator } from "@/components/ui/separator"
import ProductCard from "@/components/shared/product-card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

export default function Page() {
    const params = useParams()
    const query = params.query as string
    const [currentPage, setCurrentPage] = useState(1)
    const { result, loading, meta } = useSearchProducts(query, currentPage)

    useEffect(() => {
        setCurrentPage(1)
    }, [query])
    
    return (
        <>
            {result && !loading && result.length === 0 ? (
                <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24">
                    <p className="text-center text-lg text-gray-500">
                        {`No se encontraron productos coincidentes con su búsqueda "${query}" en el sistema.`}
                    </p>
                </div>
            ) : (
                <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
                    {result && result.length > 0 && !loading && (
                        <h1 className="text-3xl font-medium px-2 sm:px-0 text-center">{`Resultados encontrados para la búsqueda "${query}"`}</h1>
                    )}
                    {loading && result === null && (
                        <h1 className="text-3xl font-medium px-2 sm:px-0 text-center">Realizando búsqueda...</h1>
                    )}
                    <Separator className="mt-2" />
                    <div className="sm:flex sm:justify-between">
                        <div className="grid gap-5 mt-8 sm:grid-cols-2 lg:grid-cols-3 md:gap-10">
                            {loading && (
                                <SkeletonSchema grid={3}/>
                            )}
                            {result !== null && !loading && (
                                result.map((product: ProductType) => {
                                    const { id } = product
                                    return (
                                        <ProductCard product={product} key={id} />
                                    )
                                })
                            )}
                        </div>
                    </div>
                </div>
            )}
            {meta && (
                <div className="flex justify-center mt-6 space-x-4">
                    <ChevronLeft
                    strokeWidth={2}
                    onClick={() => meta.page > 1 && setCurrentPage(meta.page - 1)}
                    className={meta.page <= 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                    />
                    <span>Página {meta.page} de {meta.pageCount}</span>
                    <ChevronRight
                    strokeWidth={2}
                    onClick={() => meta.page < meta.pageCount && setCurrentPage(meta.page + 1)}
                    className={meta.page >= meta.pageCount ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                    />
                </div>
            )}
        </>
    )
}