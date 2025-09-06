"use client"

import { useCart } from "@/hooks/use-cart"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/formatPrice"
import { Button } from "@/components/ui/button"
import CartItem from "./components/cart-item"
import { useRouter } from "next/navigation"
import { useState } from "react"
import LoadingOverlay from "@/components/shared/loading-overlay"

export default function Page() {
    const { items, removeAll } = useCart()
    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleGoToCheckout = async () => {
        setIsLoading(true)
        try {
            sessionStorage.setItem("checkoutReady", "true")
            await router.push("/checkout")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
            <h1 className="mb-5 text-3xl font-bold">Carrito</h1>
            <div className="grid sm:grid-cols-2 sm:gap-5">
                <div>
                    {items && items.length === 0 ? (
                        <p>No hay productos en el carrito</p>
                    ) : (
                        <>
                            <ul>
                                {items.map((item) => (
                                    <CartItem key={item.slug} product={item} />
                                ))}
                            </ul>
                            <div className="flex items-center justify-center w-full mt-3 select-none">
                                <Button className="w-full cursor-pointer" onClick={() => removeAll()}>Limpiar el carrito</Button>
                            </div>
                        </>
                    )}
                </div>
                {items && items.length > 0 && (
                    <div className="max-w-xl mt-4 sm:mt-0">
                        <div className="p-6 rounded-lg bg-slate-100 dark:text-black">
                            <p className="mb-3 text-lg font-semibold select-none">Resumen de pedido</p>
                            <Separator />
                            <div className="flex justify-between gap-5 my-4">
                                <p className="select-none">Total:</p>
                                <p>{formatPrice(totalPrice)}</p>
                            </div>
                            <div className="flex items-center justify-center w-full mt-3 select-none">
                                <Button className="w-full cursor-pointer" onClick={handleGoToCheckout} disabled={isLoading}>
                                    {isLoading ? "Cargando..." : "Realizar pedido"}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {isLoading && (
                <LoadingOverlay message="Redirigiendo a checkout..." />
            )}
        </div>
    )
}