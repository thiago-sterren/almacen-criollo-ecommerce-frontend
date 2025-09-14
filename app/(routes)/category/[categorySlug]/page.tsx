"use client"

import { useParams } from "next/navigation"

import { ProductType } from "@/types/product"
import { useGetCategoryProducts } from "@/api/useGetCategoryProducts"

import SkeletonSchema from "@/components/skeleton-schema"
import { Separator } from "@/components/ui/separator"
import ProductCard from "./components/product-card"
import { useEffect, useState } from "react"

export default function Page() {
    const params = useParams()
    const { categorySlug } = params
    const [currentPage, setCurrentPage] = useState(1)
    const { result, loading, meta } = useGetCategoryProducts(categorySlug ?? "", currentPage)

    useEffect(() => {
        setCurrentPage(1)
    }, [categorySlug])
    
    return (
        <>
            {result && !loading && result.length === 0 ? (
                <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24">
                    <p className="text-center text-lg text-gray-500">
                        No se encontraron productos para esta categoría en el sistema.
                    </p>
                </div>
            ) : (
                <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
                    {result && result.length > 0 && !loading && (
                        <h1 className="text-3xl font-medium px-2 sm:px-0">{result[0].category.categoryName}</h1>
                    )}
                    {loading && result === null && (
                        <h1 className="text-3xl font-medium px-2 sm:px-0">Cargando categoría...</h1>
                    )}
                    <Separator />

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
                    <button
                    disabled={meta.page <= 1}
                    onClick={() => setCurrentPage(meta.page - 1)}
                    >
                        Anterior
                    </button>
                    <span>Página {meta.page} de {meta.pageCount}</span>
                    <button
                    disabled={meta.page >= meta.pageCount}
                    onClick={() => setCurrentPage(meta.page + 1)}
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </>
    )
}