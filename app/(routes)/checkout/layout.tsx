import type { Metadata } from "next"

export const generateMetadata = (): Metadata => ({
    title: "Checkout | Almacén Criollo",
    description: "Completá tu compra de forma segura en Almacén Criollo. Revisá tu pedido y finalizá la transacción",
    robots: {
        index: false,
        follow: false, // opcional: también evita seguir links internos
    }
})

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}