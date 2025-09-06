import { ProductType } from "./product";

export type ProductResponseType = {
    result: ProductType[] |  null;
    loading: boolean;
    error: string
}