import ProductImageMiniature from "@/components/shared/product-image-miniature"
import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/formatPrice"
import { ProductType } from "@/types/product"
import { Minus, Plus, Trash } from "lucide-react"

interface ProductTypeWithQuantity extends ProductType {
  quantity: number;
}

interface CartItemProps {
  product: ProductTypeWithQuantity;
}

const CartItem = (props: CartItemProps) => {
    const { product } = props
    const { id, productName, slug, images, quantity, price } = product
    const { removeItem, decrementItem, addItemBySlug } = useCart()
    const firstProductImageUrl = images?.[0]?.url ?? null

    return (
        <li className="flex py-6 border-b select-none">
            <ProductImageMiniature slug={slug} url={firstProductImageUrl} />
            <div className="flex justify-between flex-1 px-6">
                <div>
                    <h2 className="text-lg font-bold">{productName}</h2>
                    <p>{formatPrice(price)}</p>
                    <p className="mb-3">{`${quantity} ${quantity > 1 ? "unidades" : "unidad"}`}</p>
                    <div className="flex gap-3 mt-1">
                        <Plus size={20} onClick={() => addItemBySlug(slug)} className="cursor-pointer" />
                        <Minus size={20} onClick={() => decrementItem(id)} className="cursor-pointer" />
                    </div>
                </div>
                <div>
                    <Trash size={20} onClick={() => removeItem(id)} className="cursor-pointer" />
                </div>
            </div>
        </li>
    )
}

export default CartItem