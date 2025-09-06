import type { Metadata } from "next"

export const generateMetadata = (): Metadata => ({
    title: "Tu carrito | Almacén Criollo",
    description: "Verificá tus productos antes de pagar. Comprá fácil, rápido y seguro",
    robots: {
        index: false,
        follow: false, // opcional: también evita seguir links internos
    }
})

export default function CartLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}