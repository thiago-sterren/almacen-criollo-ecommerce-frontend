//import BannerDiscount from "@/components/banner-discount";
import CarouselTextBanner from "@/components/carousel-text-banner";
import ChooseCategory from "@/components/choose-category";
import FeaturedProducts from "@/components/featured-products-";
import BannerProduct from "@/components/banner-product";
import Image from "next/image";

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
      width={300} 
      height={300} 
      className="mx-auto my-6 w-[150px] h-[150px] sm:w-[300px] sm:h-[300px]" 
      />
      <FeaturedProducts/>
      <ChooseCategory />
      <BannerProduct />
    </main>
  );
}
