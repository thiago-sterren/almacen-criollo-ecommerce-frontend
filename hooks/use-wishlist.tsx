import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { ProductType } from "@/types/product"
import { toast } from "sonner"

interface UseWishlistProps {
    wishlistItems: ProductType[];
    addItemToWishlist: (data: ProductType) => void;
    removeItemFromWishlist: (id: number) => void
}

export const useWishlist = create(persist<UseWishlistProps>((set, get) => ({
    wishlistItems: [],
    addItemToWishlist: (data: ProductType) => {
        const currentWishlist = get().wishlistItems
        const existingItem = currentWishlist.find(item => item.slug === data.slug)

        if (existingItem) {
            return toast("El producto ya existe en la lista.")
        }

        set({
            wishlistItems: [...get().wishlistItems, data]
        })
        toast("Producto añadido a la lista.")
    },
    removeItemFromWishlist: (id: number) => {
        set({ wishlistItems: get().wishlistItems.filter(item => item.id !== id) })
        toast("Producto eliminado de la lista.")
    }
}), {
    name: "wishlist",
    storage: createJSONStorage(() => localStorage)
}))