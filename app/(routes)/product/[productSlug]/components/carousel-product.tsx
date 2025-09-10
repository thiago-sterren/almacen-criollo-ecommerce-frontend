import Image from "next/image";

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

interface ImageData {
  id: number;
  url: string;
}

interface CarouselProductProps {
    images?: ImageData[] | null;
}

const CarouselProduct = (props: CarouselProductProps) => {
    const { images } = props
    const hasImages = Array.isArray(images) && images.length > 0
    
    return (
        <div className="w-full flex justify-center select-none">
            <Carousel className="w-full max-w-[300px]">
                <CarouselContent>
                    {hasImages ? (
                      images!.map((image) => {
                      const { id, url } = image
                      return (
                          <CarouselItem key={id} className="flex justify-center items-center min-h-[350px]">
                              <div className="p-2 border border-gray-200 rounded-lg shadow-sm bg-white">
                                  <div className="w-[250px] h-[350px] flex items-center justify-center">
                                    <Image
                                        src={url}
                                        alt="Product image"
                                        width={500}
                                        height={700}
                                        className="rounded-lg w-[250px] h-[250px] object-contain"
                                        priority
                                    />
                                  </div>
                              </div>
                          </CarouselItem>
                      )
                      })
                    ) : (
                      <CarouselItem className="flex justify-center items-center min-h-[350px]">
                        <Image
                        src="/placeholder.jpg"
                        alt="Imagen no disponible"
                        width={300}
                        height={300}
                        className="max-w-[250px] max-h-[250px] object-contain"
                        priority
                        />
                      </CarouselItem>
                    )}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
            </Carousel>
        </div>
    )
}

export default CarouselProduct