import { formatPrice } from "@/lib/formatPrice"
import { ProductType } from "@/types/product"

interface ProductTypeWithQuantity extends ProductType {
  quantity: number;
}

interface CheckoutItemProps {
  product: ProductTypeWithQuantity;
}

const CheckoutItem = (props: CheckoutItemProps) => {
    const { product } = props
    const { productName, quantity, price } = product
    const totalItemPrice = quantity * price

    return (
        <li className="flex py-2 border-b select-none">
            <div className="flex justify-between flex-1 px-6">
                <div>
                    <h2 className="text-lg">
                        <span className="font-bold">{productName}</span>
                        {` × (${quantity} ${quantity > 1 ? "unidades" : "unidad"})`}
                    </h2>
                    <p>{formatPrice(totalItemPrice)}</p>
                </div>
            </div>
        </li>
    )
}

export default CheckoutItem