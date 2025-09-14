//import BannerDiscount from "@/components/banner-discount";
import CarouselTextBanner from "@/components/carousel-text-banner";
import ChooseCategory from "@/components/choose-category";
import FeaturedProducts from "@/components/featured-products-";
import BannerProduct from "@/components/banner-product";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: 'Inicio | Almacén Criollo',
  description: 'Explorá los mejores productos de Almacén Criollo desde tu pantalla principal',
}

export default function Home() {
  return (
    <main>
      <CarouselTextBanner />
      <Image 
      src="/almacen_criollo_logo.png" 
      alt="Logo image" 
      width={200} 
      height={200} 
      className="mx-auto my-6 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]" 
      />
      <Separator className="max-w-screen-xl my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <FeaturedProducts/>
      <Separator className="max-w-screen-xl my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <ChooseCategory />
      <Separator className="max-w-screen-xl my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <BannerProduct />
    </main>
  );
}
