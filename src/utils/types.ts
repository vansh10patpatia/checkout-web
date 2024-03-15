export type cardDetails = {
    cvv: string;
    expirationMonth: string;
    expirationYear: string;
};

interface Theme {
    [key: string]: string;
}

export interface MerchantData {
    merchantName: string;
    merchantLogo: string;
    theme: Theme;
}

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

export interface CartAPI {
    products: Product[];
    paymentMethods: string[];
}

export interface OrderSummary {
    deliveryFee: number;
    orderAmount: number;
    discount: number;
    orderTotal: number;
}
