export type Product = {
    productId?: number;
    productName: string;
    categoryId: string;
    campaignId: string;
    gender: string;
    price: number;
    description: string;
    imageBase64: string;
    status: string;
    productSizes?: ProductSize[];
};

export type ProductSize = {
    size: string;
    colors: Collor[];
};

type Collor = {
    colorName: string;
    quantity: number;
};
