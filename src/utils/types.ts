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
