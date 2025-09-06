"use client"

import WishlistItem from "./components/wishlist-item"
import { useWishlist } from "@/hooks/use-wishlist"

export default function Page () {
    const { wishlistItems } = useWishlist()

    return (
        <div className="max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
            <h1 className="mb-5 text-3xl font-bold">
                Tus productos favoritos
            </h1>
            <div>
                <div>
                    {wishlistItems && wishlistItems.length === 0 ? (
                        <p>No hay productos en tu sección de favoritos.</p>
                    ) : (
                        <>
                            <ul>
                                {wishlistItems.map((item) => (
                                    <WishlistItem key={item.id} product={item} />
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}