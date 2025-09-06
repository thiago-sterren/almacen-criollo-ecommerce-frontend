"use client"

import { Heart, ShoppingCart, BaggageClaim } from "lucide-react"
import { useRouter } from "next/navigation"
import MenuList from "./menu-list"
import ItemsMenuMobile from "./items-menu-mobile"
import ToggleTheme from "./toggle-theme"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"

const NavBar = () => {
    const router = useRouter()
    const cart = useCart()
    const { wishlistItems } = useWishlist()

    return (
        <div className="flex items-center justify-between p-4 mx-auto sm:max-w-4xl md:max-w-6xl relative z-50 select-none">
            <h1 className="text-2xl sm:text-3xl cursor-pointer" onClick={() => router.push("/")}>Almacén
                <span className="font-bold">Criollo</span>
            </h1>
            <div className="items-center justify-between cursor-pointer hidden sm:flex">
                <MenuList />
            </div>
            <div className="flex sm:hidden">
                <ItemsMenuMobile />
            </div>
            <div className="flex items-center justify-between gap-2 sm:gap-7">
                {cart.items.length === 0 ? (
                    <ShoppingCart className="cursor-pointer" strokeWidth={1} onClick={() => router.push("/cart")} />
                ) : (
                    <div className="flex gap-1" onClick={() => router.push("/cart")}>
                        <BaggageClaim strokeWidth={1} className="cursor-pointer" />
                        <span>{cart.items.length}</span>
                    </div>
                )}
                <Heart className={`cursor-pointer ${wishlistItems.length > 0 && "fill-black dark:fill-white"}`} strokeWidth={1} onClick={() => router.push("/wishlist")} />
            </div>
            <ToggleTheme />
        </div>
    )
}

export default NavBar