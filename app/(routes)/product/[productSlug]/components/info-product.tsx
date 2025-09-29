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
    const { addItemBySlug } = useCart()
    const { addItemToWishlist, removeItemFromWishlist, wishlistItems } = useWishlist()
    const itemInWishlist = wishlistItems.some(item => slug === item.slug)
    const isSoldOut = stock < 1
    const forSale = price > 0
    const lastUnits = stock > 0 && stock <= 5

    const handleClickToAsk = () => {
        const phoneNumber = "5493493660838"
        const message = `Hola, quisiera consultar por precio y disponibilidad del producto ${productName}.`
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
        window.open(url, "_blank")
    }

    return (
        <div className="max-w-md mx-auto text-center px-6">
            <div className="mt-2 mb-3">
                <h1 className="text-2xl">{productName}</h1>
            </div>
            <Separator className="my-4" />
            <p>{description}</p>
            <Separator className="my-4" />
            {forSale && (
                <p className="my-4 text-2xl font-bold">{formatPrice(price)}</p>
            )}
            <div className="mt-6 flex justify-center">
                <div className="flex items-center gap-2 w-full max-w-[320px] select-none">
                    {forSale ? (
                        <Button disabled={isSoldOut} className="flex-1 cursor-pointer" onClick={() => addItemBySlug(product.slug)}>
                            {isSoldOut ? "Agotado" : "Agregar al carrito"}
                        </Button>
                    ) : (
                        <Button className="flex-1 cursor-pointer" onClick={handleClickToAsk}>
                            Consultar precio y stock
                        </Button>
                    )}
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
            {forSale && lastUnits && (
                <p className="mt-4 text-sm font-medium">¡Quedan pocas unidades!</p>
            )}
        </div>
    )
}

export default InfoProduct