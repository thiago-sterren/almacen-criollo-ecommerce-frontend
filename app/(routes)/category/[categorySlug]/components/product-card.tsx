"use client"

import Link from "next/link"
import Image from "next/image"

import { formatPrice } from "@/lib/formatPrice"
import { ProductType } from "@/types/product"

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

interface ProductTypeProps {
  product: ProductType
}

const ProductCard = (props: ProductTypeProps) => {
  const { product } = props
  const { images, productName, slug, price } = product
  const forSale = price > 0

  return (
    <Link
      href={`/product/${slug}`}
      className="relative w-full max-w-[300px] mx-auto p-2 transition-all duration-100 rounded-lg hover:shadow-lg active:shadow-md select-none"
    >
      <Card className="h-fit flex flex-col justify-between py-4 border border-gray-200 shadow-none">
        <div className="px-6 pt-4 pb-2 flex justify-center items-center">
          <Carousel opts={{ align: "start" }} className="w-full max-w-sm">
            <CarouselContent>
              {images?.length ? (
                images.map((image) => (
                  <CarouselItem key={image.id} className="group">
                    <div className="flex justify-center items-center w-full h-full">
                      <Image
                        src={image.url}
                        alt="Product image"
                        width={300}
                        height={300}
                        className="max-w-[250px] max-h-[250px] object-contain"
                        priority
                      />
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem className="flex justify-center items-center w-full h-full">
                  <Image
                    src="/placeholder.jpg"
                    alt="No available image"
                    width={300}
                    height={300}
                    className="max-w-[250px] max-h-[250px] object-contain"
                    priority
                  />
                </CarouselItem>
              )}
            </CarouselContent>
          </Carousel>
        </div>
        <CardContent className="flex justify-between items-center gap-2 px-6 pt-2 pb-4">
          <h3 className="text-md font-bold line-clamp-2">{productName}</h3>
          {forSale && (
            <p className="text-md px-1 py-1 text-white bg-black rounded dark:bg-white dark:text-black w-fit">
              {formatPrice(price)}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}

export default ProductCard