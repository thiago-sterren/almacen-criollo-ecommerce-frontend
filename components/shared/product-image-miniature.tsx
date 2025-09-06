import Image from "next/image"
import { useRouter } from "next/navigation"

interface ProductImageMiniatureProps {
    slug: string,
    url: string
}

const ProductImageMiniature = (props: ProductImageMiniatureProps) => {
    const { slug, url } = props
    const router = useRouter()

    return (
        <div onClick={() => router.push(`/product/${slug}`)} className="cursor-pointer">
            <Image 
            src={
                url ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}` : "/placeholder.jpg"
            }
            alt="Product image"
            width={100}
            height={100}
            className="max-w-[120px] max-h-[120px] object-contain overflow-hidden rounded-md sm:w-120 sm:h-120"
            priority
            />
        </div>
    )
}

export default ProductImageMiniature