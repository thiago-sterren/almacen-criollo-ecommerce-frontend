import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { ProductType } from "@/types/product"
import { toast } from "sonner"
import { CartItem } from "@/types/cartitem"

interface CartStore {
    items: CartItem[];
    addItemBySlug: (slug: string) => void;
    removeItem: (id: number) => void;
    removeAll: () => void;
    decrementItem: (id: number) => void;
    getTotalPrice: () => number
}

export const useCart = create(persist<CartStore>((set, get) => ({
    items: [],
    addItemBySlug: async (slug: string) => {
      const currentItems = get().items
      const existingItem = currentItems.find(item => item.slug === slug)

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[slug][$eq]=${slug}&populate=*`
        )
        const json = await res.json()
        const product = json?.data?.[0] ?? null

        if (!product) {
          toast.error("No se pudo obtener el producto desde el backend.")
          return
        }

        const stockActualizado = product.stock ?? 0
        
        const productData: ProductType = {
          id: product.id,
          slug: product.slug,
          productName: product.productName,
          description: product.description,
          active: product.active,
          isFeatured: product.isFeatured,
          price: product.price,
          stock: stockActualizado,
          images: product.images,
          category: product.category,
        }

        if (existingItem) {
          if (existingItem.quantity >= stockActualizado) {
            toast.error(`No se pudo agregar al carrito. Solo quedan ${stockActualizado} unidades.`)
            return
          }

          const updatedItems = currentItems.map(item =>
            item.slug === slug
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  stock: stockActualizado, // sincroniza visualmente
                }
              : item
          )

          set({ items: updatedItems })
          toast("Cantidad actualizada en el carrito.")
        } else {
          if (stockActualizado < 1) {
            toast.error("Producto sin stock disponible.")
            return
          }

          set({
            items: [
              ...currentItems,
              {
                ...productData,
                quantity: 1,
              },
            ],
          })
          toast("Producto añadido al carrito.")
        }
      } catch {
        toast.error("Hubo un problema al consultar el stock.")
      }
    },
    removeItem: (id: number) => {
      set({ items: get().items.filter(item => item.id !== id) })
      toast("Producto eliminado del carrito.")
    },
    removeAll: () => {
      set({ items: [] })
      //toast("Carrito vaciado.")
    },
    decrementItem: async (id: number) => {
      const currentItems = get().items
      const existingItem = currentItems.find((item) => item.id === id)

      if (!existingItem) return

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[slug][$eq]=${existingItem.slug}&populate=*`
        )
        const json = await res.json()
        const product = json?.data?.[0]

        const stockActualizado = product?.stock ?? null

        // Si el producto ya no existe o su stock es 0, lo eliminamos directamente
        if (stockActualizado === null || stockActualizado < 1) {
          set({ items: currentItems.filter((item) => item.id !== id) })
          toast.error(`${existingItem.productName} ya no está disponible. Se removió del carrito.`)
          return
        }

        // Si solo queda una unidad, se elimina del carrito
        if (existingItem.quantity === 1) {
          set({ items: currentItems.filter((item) => item.id !== id) })
          toast("Producto eliminado del carrito.")
        } else {
          const updatedItems = currentItems.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          set({ items: updatedItems })
          toast("Cantidad reducida.")
        }
      } catch {
        toast.error("No se pudo validar el stock.")
      }
    },
    getTotalPrice: () => {
      const items = get().items
      return items.reduce((total, item) => total + item.price * item.quantity, 0)
    }
}), {
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage)
}))