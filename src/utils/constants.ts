export const CURRENCY_SYMBOL = "₹";
export const DELIVERY_FEE = 10;

export const API_BASE_URL = "https://groww-intern-assignment.vercel.app/v1";
export const API_ROUTES = {
    THEME: "/api/merchant-metadata",
    CART: "/api/order-details",
};

export const defaultTheme = {
    merchantName: "GROWW",
    merchantLogo: "https://groww.in/groww-logo-270.png",
    theme: {
        "--background": "hsl(0, 0%, 100%)",
        "--foreground": "hsl(240, 10%, 3.9%)",
        "--primary": "hsl(164.9, 100%, 35.1%)",
        "--primary-foreground": "hsl(0, 0%, 98%)",
    },
};
