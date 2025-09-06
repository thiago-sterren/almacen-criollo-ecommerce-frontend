import { ProductType } from "./product"

export type CartItem = ProductType & { quantity: number }