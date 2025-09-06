import ProductImageMiniature from "@/components/shared/product-image-miniature"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"
import { formatPrice } from "@/lib/formatPrice"
import { ProductType } from "@/types/product"
import { X } from "lucide-react"

interface WishlistItemProps {
  product: ProductType;
}

const WishlistItem = (props: WishlistItemProps) => {
    const { product } = props
    const { id, productName, slug, images, price } = product
    const { addItemBySlug } = useCart()
    const { removeItemFromWishlist } = useWishlist()
    const firstProductImageUrl = images?.[0]?.url ?? null

    return (
        <li className="flex py-6 border-b select-none">
            <ProductImageMiniature slug={slug} url={firstProductImageUrl} />
            <div className="flex justify-between flex-1 px-6">
                <div>
                    <h2 className="text-lg font-bold">{productName}</h2>
                    <p>{formatPrice(price)}</p>
                    <div className="flex gap-3">
                        <div className="flex items-center justify-center w-[150px] mt-3">
                            <Button className="w-full cursor-pointer" onClick={() => addItemBySlug(slug)}>Agregar al carrito</Button>
                        </div>
                    </div>
                </div>
                <X
                width={30}
                strokeWidth={1}
                className="transition duration-300 cursor-pointer"
                onClick={() => removeItemFromWishlist(id)}
                />
            </div>
        </li>
    )
}

export default WishlistItem