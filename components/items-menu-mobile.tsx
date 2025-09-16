import { Menu } from "lucide-react"
import { PopoverContent, PopoverTrigger, Popover } from "./ui/popover"
import Link from "next/link"

const ItemsMenuMobile = () => {
    return (
        <Popover>
            <PopoverTrigger>
                <Menu className="cursor-pointer"/>
            </PopoverTrigger>
            <PopoverContent className="w-44 text-center px-2 py-3 space-y-2">
                <Link href={"/category/vinos"} className="block">Vinos</Link>
                <Link href={"/category/whiskies"} className="block">Whiskies</Link>
                <Link href={"/category/espumantes"} className="block">Espumantes</Link>
                <Link href={"/category/otras-bebidas"} className="block">Otras bebidas</Link>
                <Link href={"/category/mate"} className="block">Mate</Link>
                <Link href={"/category/chocolateria"} className="block">Chocolatería</Link>
                <Link href={"/category/cocina"} className="block">Cocina</Link>
                <Link href={"/category/delicatessen"} className="block">Delicatessen</Link>
            </PopoverContent>
        </Popover>
    )
}

export default ItemsMenuMobile