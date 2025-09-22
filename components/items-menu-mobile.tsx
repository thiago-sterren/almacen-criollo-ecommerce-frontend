"use client"

import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet"
import Link from "next/link"
import { useState } from "react"

const ItemsMenuMobile = () => {
    const [open, setOpen] = useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Menu className="cursor-pointer" />
            </SheetTrigger>
            <SheetContent side="left" className="p-4">
                <SheetTitle>Categorías</SheetTitle>
                <Link href={"/category/vinos"} onClick={() => setOpen(false)}>Vinos</Link>
                <Link href={"/category/whiskies"} onClick={() => setOpen(false)}>Whiskies</Link>
                <Link href={"/category/espumantes"} onClick={() => setOpen(false)}>Espumantes</Link>
                <Link href={"/category/otras-bebidas"} onClick={() => setOpen(false)}>Otras bebidas</Link>
                <Link href={"/category/mate"} onClick={() => setOpen(false)}>Mate</Link>
                <Link href={"/category/chocolateria"} onClick={() => setOpen(false)}>Chocolatería</Link>
                <Link href={"/category/cocina"} onClick={() => setOpen(false)}>Cocina</Link>
                <Link href={"/category/delicatessen"} onClick={() => setOpen(false)}>Delicatessen</Link>
            </SheetContent>
        </Sheet>
    )
}

export default ItemsMenuMobile