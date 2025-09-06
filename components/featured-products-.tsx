"use client"

import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import SkeletonSchema from "./skeleton-schema"
import { ProductType } from "@/types/product"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { Expand, ShoppingCart } from "lucide-react"
import IconButton from "./icon-button"
import { useRouter } from "next/navigation"
import { formatPrice } from "@/lib/formatPrice"
import { useCart } from "@/hooks/use-cart"

const FeaturedProducts = () => {
    const { loading, result } = useGetFeaturedProducts()
    const router = useRouter()
    const { addItemBySlug } = useCart()

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            <h3 className="px-6 text-3xl sm:pb-8 text-center">Productos destacados</h3>
            <Carousel
            plugins={[
                Autoplay({
                    delay: 2500
                })
            ]}>
                <CarouselContent className="-ml-2 md:-ml-4">
                    {loading && (
                        <SkeletonSchema grid={3} />
                    )}
                    {result !== null && (
                        result.map((product: ProductType) => {
                            const { id, slug, images, productName, price } = product
                            return (
                                <CarouselItem key={id} className="md:basis-1/2 lg:basis-1/3 group select-none">
                                    <div className="p-1">
                                        <Card className="h-95 flex flex-col justify-between py-4 border border-gray-200 shadow-none">
                                            <CardContent className="relative flex items-center justify-center px-6 py-2">
                                                <Image
                                                src={
                                                    images?.[0].url ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${images[0].url}` : "/placeholder.jpg"
                                                } 
                                                alt="Product main image"
                                                width={300}
                                                height={300}
                                                className="max-w-[250px] max-h-[250px] object-contain"
                                                priority
                                                />
                                                <div className="absolute w-full px-6 transition duration-200 opacity-100 2xl:opacity-0 2xl:group-hover:opacity-100 bottom-5">
                                                    <div className="flex justify-center gap-x-6">
                                                        <IconButton 
                                                        onClick={() => router.push(`product/${slug}`)}
                                                        icon={<Expand size={20} />}
                                                        className="text-gray-600 cursor-pointer" />
                                                        <IconButton 
                                                        onClick={() => addItemBySlug(product.slug)}
                                                        icon={<ShoppingCart size={20} />}
                                                        className="text-gray-600 cursor-pointer" />
                                                    </div>
                                                </div>
                                            </CardContent>
                                            <div className="flex justify-between gap-2 px-8">
                                                <h3 className="text-md font-bold line-clamp-2">{productName}</h3>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-md px-2 py-1 text-white bg-black rounded dark:bg-white dark:text-black w-fit">{formatPrice(price)}</p>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            )
                        })
                    )}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
            </Carousel>
        </div>
    )
}

export default FeaturedProducts