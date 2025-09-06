import { ProductType } from "@/types/product"
import { formatPrice } from "@/lib/formatPrice"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"

interface InfoProductProps {
    product: ProductType
}

const InfoProduct = (props: InfoProductProps) => {
    const { product } = props
    const { productName, price, description, stock, slug, id } = product
    const isSoldOut = stock < 1
    const { addItemBySlug } = useCart()
    const { addItemToWishlist, removeItemFromWishlist, wishlistItems } = useWishlist()
    const itemInWishlist = wishlistItems.some(item => slug === item.slug)

    return (
        <div className="max-w-md mx-auto text-center px-6">
            <div className="mt-2 mb-3">
                <h1 className="text-2xl">{productName}</h1>
            </div>
            <Separator className="my-4" />
            <p>{description}</p>
            <Separator className="my-4" />
            <p className="my-4 text-2xl font-bold">{formatPrice(price)}</p>
            <div className="mt-6 flex justify-center">
                <div className="flex items-center gap-2 w-full max-w-[320px] select-none">
                    <Button disabled={isSoldOut} className="flex-1 cursor-pointer" onClick={() => addItemBySlug(product.slug)}>
                        {isSoldOut ? "Agotado" : "Agregar al carrito"}
                    </Button>
                    <Heart
                    width={30}
                    strokeWidth={1}
                    className={`transition duration-300 cursor-pointer hover:fill-black dark:hover:fill-white ${itemInWishlist ? "fill-black dark:fill-white" : "fill-white dark:fill-black"}`}
                    onClick={() => {
                        if (itemInWishlist) {
                            removeItemFromWishlist(id)
                        } else {
                            addItemToWishlist(product)
                        } 
                    }}
                    />
                </div>
            </div>
            {stock > 0 && stock <= 5 && (
                <p className="mt-4 text-sm font-medium">¡Quedan pocas unidades!</p>
            )}
        </div>
    )
}

export default InfoProduct