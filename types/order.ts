export type OrderType = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    deliveryMethod: string;
    address: string;
    paymentMethod: string;
    mercadoPagoId: string;
    orderStatus: string;
    orderToken: string;
    totalPrice: number;
    products: {
        id: number;
        slug: string;
        quantity: number;
        unitPrice: number;
        productName: string;
    }[]
}