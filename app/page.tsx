//import BannerDiscount from "@/components/banner-discount";
import CarouselTextBanner from "@/components/carousel-text-banner";
import ChooseCategory from "@/components/choose-category";
import FeaturedProducts from "@/components/featured-products-";
import BannerProduct from "@/components/banner-product";

export const metadata = {
  title: 'Inicio | Almacén Criollo',
  description: 'Explorá los mejores productos de Almacén Criollo desde tu pantalla principal',
}

export default function Home() {
  return (
    <main>
      <CarouselTextBanner />
      <FeaturedProducts/>
      <ChooseCategory />
      <BannerProduct />
    </main>
  );
}
