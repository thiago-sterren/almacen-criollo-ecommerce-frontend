import { Search } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet"
import { useState } from "react"
import SearchInput from "./search-input"

const SearchSheetMobile = () => {
    const [open, setOpen] = useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Search className="cursor-pointer" />
            </SheetTrigger>
            <SheetContent side="left" className="p-4">
                <SheetTitle>Buscador de productos</SheetTitle>
                <SearchInput onSearch={() => setOpen(false)} />
            </SheetContent>
        </Sheet>
    )
}

export default SearchSheetMobile