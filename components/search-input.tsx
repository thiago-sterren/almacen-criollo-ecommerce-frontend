"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { Search } from "lucide-react"
import { Input } from "./ui/input"

interface SearchInputProps {
    placeholder?: string,
    onSearch?: () => void
}

const SearchInput = ({ placeholder = "", onSearch}: SearchInputProps) => {
    const router = useRouter()
    const [query, setQuery] = useState("")

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        const trimmedQuery = query.trim() 
        if (trimmedQuery) {
            router.push(`/search/${encodeURIComponent(trimmedQuery)}`)
            setQuery("")
            if (onSearch) onSearch()
        }
    }

    return (
        <form onSubmit={handleSearch} className="flex items-center gap-2 w-full max-w-md">
            <Input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)} 
            />
            <Button type="submit" variant="default" size="icon" className="cursor-pointer">
                <Search className="w-4 h-4" />
            </Button>
        </form>
    )
}

export default SearchInput