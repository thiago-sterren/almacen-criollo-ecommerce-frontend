"use client"

import Link from "next/link"
import { buttonVariants } from "./ui/button"

const BannerProduct = () => {

    return (
        <>    
            <div className="mt-4 text-center">
                <p>Disfrutá de una experiencia increíble</p>
                <h4 className="mx-2 mt-2 text-4xl font-extrabold uppercase">Chocolate Exquisito</h4>
                <p className="my-4 text-lg">Despertá tus sentidos con cada bocado</p>
                <Link href="category/chocolateria" className={`${buttonVariants()} select-none`}>Comprar</Link>
            </div>
            <div className="h-[300px] lg:h-[770px] bg-[url('/chocolates_banner.jpg')] bg-center mt-5 bg-cover" />
        </>
    )
}

export default BannerProduct