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
                <Link href={"/category/vino"} className="block">Vino</Link>
                <Link href={"/category/whisky"} className="block">Whisky</Link>
                <Link href={"/category/mate"} className="block">Mate</Link>
                <Link href={"/category/cocina"} className="block">Cocina</Link>
                <Link href={"/category/cerveceria"} className="block">Cervecería</Link>
                <Link href={"/category/chocolateria"} className="block">Chocolatería</Link>
            </PopoverContent>
        </Popover>
    )
}

export default ItemsMenuMobile