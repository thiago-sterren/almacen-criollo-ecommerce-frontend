"use client"

import { Heart, ShoppingCart, BaggageClaim } from "lucide-react"
import { useRouter } from "next/navigation"
import MenuList from "./menu-list"
import ItemsMenuMobile from "./items-menu-mobile"
import ToggleTheme from "./toggle-theme"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"
import ResponsiveLogo from "./responsive-logo"
import SearchInput from "./search-input"
import SearchSheetMobile from "./search-sheet-mobile"

const NavBar = () => {
    const router = useRouter()
    const cart = useCart()
    const { wishlistItems } = useWishlist()

    return (
        <div className="grid grid-cols-3 items-center p-4 mx-auto sm:max-w-4xl md:max-w-6xl relative z-50 select-none">
            {/* Columna izquierda: Logo */}
            <ResponsiveLogo onClick={() => router.push("/")} />

            {/* Columna central: Menú */}
            <div className="hidden sm:flex justify-center gap-2">
                <MenuList />
                <SearchInput placeholder="Buscar productos..." />
            </div>
            <div className="flex sm:hidden justify-center gap-4">
                <ItemsMenuMobile />
                <SearchSheetMobile />
            </div>

            {/* Columna derecha: Íconos */}
            <div className="flex items-center justify-end gap-2 sm:gap-7">
                {cart.items.length === 0 ? (
                <ShoppingCart className="cursor-pointer" strokeWidth={1} onClick={() => router.push("/cart")} />
                ) : (
                <div className="flex gap-1" onClick={() => router.push("/cart")}>
                    <BaggageClaim strokeWidth={1} className="cursor-pointer" />
                    <span>{cart.items.length}</span>
                </div>
                )}
                <Heart
                className={`cursor-pointer ${wishlistItems.length > 0 && "fill-black dark:fill-white"}`}
                strokeWidth={1}
                onClick={() => router.push("/wishlist")}
                />
                <ToggleTheme />
            </div>
        </div>
    )
}

export default NavBar