import type { Metadata } from "next"

export const generateMetadata = (): Metadata => ({
    title: "Tu sección de favoritos | Almacén Criollo",
    description: "Productos de Almacén Criollo que marcaste como favoritos",
    robots: {
        index: false,
        follow: false, // opcional: también evita seguir links internos
    }
})

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}