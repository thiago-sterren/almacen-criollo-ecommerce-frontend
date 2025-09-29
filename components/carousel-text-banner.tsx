"use client"

import { useRouter } from "next/navigation"
import { Carousel, CarouselItem, CarouselContent } from "./ui/carousel"
import { Card, CardContent } from "./ui/card"
import Autoplay from "embla-carousel-autoplay"

export const dataCarouselTop = [
    {
        id: 1,
        title: "Envío en 24hs",
        description: "Tus envíos en 24hs, o podemos programarlos para cuando los desees",
        link: "#"
    },
    {
        id: 2,
        title: "Conseguí un 10% OFF pagando con efectivo",
        description: "Al hacer el checkout, podés elegir la opción de pagar con efectivo al momento de la entrega del pedido",
        link: "#"
    },
    {
        id: 3,
        title: "Cambios y devoluciones gratuitas",
        description: "Como cliente, tenés cambios y devoluciones sin cargo en un plazo de 3 días",
        link: "#"
    },
]

const CarouselTextBanner = () => {
    const router = useRouter()
    return (
        <div className="bg-gray-200 dark:bg-primary">
            <Carousel className="w-full max-w-4xl mx-auto"
            plugins={[
                Autoplay({
                    delay: 2500
                })
            ]}
            >
                <CarouselContent>
                    {dataCarouselTop.map(({ id, title, link, description }) => (
                        <CarouselItem key={id} onClick={() => router.push(link)} className="cursor-pointer select-none">
                            <div>
                                <Card className="shadow-none border-none bg-transparent">
                                    <CardContent className="h-24 sm:h-14 flex flex-col justify-center items-center text-center">
                                        <p className="text-lg sm:text-xl text-wrap text-bold dark:text-secondary">{title}</p>
                                        <p className="text-sm sm:text-md text-wrap dark:text-secondary">{description}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}

export default CarouselTextBanner