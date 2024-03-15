import React, { createContext, useEffect, useState } from "react";
import { DELIVERY_FEE } from "./constants";
import { MerchantData } from "./types";
import { useCache } from "./useCache";

type GProps = {
    children: React.ReactNode;
};

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartAPI {
    products: Product[];
    paymentMethods: string[];
}

interface OrderSummary {
    deliveryFee: number;
    orderAmount: number;
    discount: number;
    orderTotal: number;
}

interface CartContextType {
    cartDetails: CartAPI;
    orderSummary: OrderSummary;
    theme: MerchantData;
    changeTheme: () => void;
    changeCartDetails: (cartDetails: CartAPI | {}) => void;
}
const defaultTheme = {
    merchantName: "GROWW",
    merchantLogo: "https://groww.in/groww-logo-270.png",
    theme: {
        "--background": "hsl(20, 14.3%, 4.1%)",
        "--foreground": "hsl(0, 0%, 95%)",
        "--primary": "hsl(346.8, 77.2%, 49.8%)",
        "--primary-foreground": "hsl(355.7, 100%, 97.3%)",
    },
};

export const CartContext = createContext<CartContextType>({
    cartDetails: {
        products: [],
        paymentMethods: [],
    },
    orderSummary: {
        deliveryFee: DELIVERY_FEE,
        orderAmount: 0,
        discount: 0,
        orderTotal: 0,
    },
    theme: defaultTheme,
    changeTheme: () => {},
    changeCartDetails: () => {},
});

const CartContextProvider = (props: GProps) => {
    const [cartDetails, setCartDetails] = useState<CartAPI>({
        products: [],
        paymentMethods: [],
    });

    const [orderSummary, setOrderSummary] = useState({
        deliveryFee: DELIVERY_FEE,
        orderAmount: 0,
        discount: 0,
        orderTotal: 0,
    });

    const [theme, setTheme] = useState<MerchantData>(defaultTheme);

    const changeCartDetails = (data: CartAPI | {}) => {
        const cartTotal = (data as CartAPI).products.reduce(
            (acc, product) => acc + product.price * product.quantity,
            0
        );
        const deliveryFee = !!(data as CartAPI).products?.length
            ? DELIVERY_FEE
            : 0;
        setOrderSummary({
            ...orderSummary,
            orderAmount: cartTotal,
            orderTotal: cartTotal + deliveryFee,
            deliveryFee,
        });

        setCartDetails(data as CartAPI);
    };

    const changeTheme = () => {
        const { data: themeData, loading } = useCache<MerchantData>(
            "https://groww-intern-assignment.vercel.app/v1/api/merchant-metadata"
        );
        if (JSON.stringify(themeData) === JSON.stringify(theme)) return;
        setTheme(themeData as MerchantData);
        if (themeData) {
            const root = document.documentElement;
            const { theme } = themeData;
            for (const [key, value] of Object.entries(theme)) {
                root.style.setProperty(`${key}`, value);
            }
        }
    };

    return (
        <CartContext.Provider
            value={{
                cartDetails,
                changeCartDetails,
                orderSummary,
                theme,
                changeTheme,
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
