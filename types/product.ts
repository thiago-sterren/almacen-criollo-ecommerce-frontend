export type ProductType = {
    id: number;
    productName: string;
    slug: string;
    description: string;
    active: boolean;
    isFeatured: boolean;
    price: number;
    stock: number;
    images: {
        id: number;
        url: string;
    }[];
    category: {
        slug: string;
        categoryName: string;
    }
}