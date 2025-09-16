"use client"

import { useGetCategories } from "@/api/useGetCategories"
import Link from "next/link"
import { CategoryType } from "@/types/category"
import Image from "next/image"

const ChooseCategory = () => {
    const { loading, result } = useGetCategories()

    return (
        <div className="max-w-6xl mx-auto sm:px-24">
            <h3 className="px-6 pb-4 text-3xl sm:pb-8 text-center">Navegá por tu categoría favorita</h3>
            <div className="flex flex-wrap justify-center gap-5 select-none">
                {loading && (
                    Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="w-[250px] h-[250px] bg-gray-200 rounded-lg animate-pulse" />
                    ))
                )}
                {!loading && result !== null && (
                    result.map((category: CategoryType) => {
                        const { slug, mainImage, categoryName, id } = category
                        return (
                            <Link
                            key={id}
                            href={`/category/${slug}`}
                            className="relative w-[250px] h-[250px] overflow-hidden rounded-lg">
                                <Image
                                src={
                                    mainImage ? mainImage.url : "/placeholder.jpg"
                                }
                                alt={`${categoryName} category main image`}
                                className="transition duration-300 ease-in-out rounded-lg hover:scale-110 object-cover"
                                fill
                                sizes="(max-width: 768px) 100vw, 250px"
                                />
                                <p className="absolute bottom-2 right-2 px-2 py-1 text-lg font-bold text-white rounded">{categoryName}</p>
                            </Link>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default ChooseCategory