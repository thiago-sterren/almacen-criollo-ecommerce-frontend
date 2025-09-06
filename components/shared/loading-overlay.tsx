"use client"

interface LoadingOverlayProps {
    message?: string
}

const LoadingOverlay = ({ message = "Procesando..." }: LoadingOverlayProps) => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/60">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
            <p className="text-sm font-medium text-gray-700 mt-3">{message}</p>
        </div>
    )
}

export default LoadingOverlay