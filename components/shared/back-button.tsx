"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"

interface BackButtonProps {
    destinationURL: string,
    label?: string,
    className?: string,
    clearSessionKey?: string // clave del item a borrar del session storage, en caso de ser necesario
}

const BackButton = ({ destinationURL, label = "Volver", className, clearSessionKey }: BackButtonProps) => {
    const router = useRouter()

    const handleClick = () => {
        if (clearSessionKey) {
            sessionStorage.removeItem(clearSessionKey)
        }
        router.push(destinationURL)
    }

    return (
        <button onClick={handleClick} className={`cursor-pointer absolute top-4 left-4 z-10 ${className || ""}`}>
            <div className="flex items-center gap-x-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md transition hover:bg-gray-200 dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black">
                <ChevronLeft size={20} />
                {label}
            </div>
        </button>
    )
}

export default BackButton