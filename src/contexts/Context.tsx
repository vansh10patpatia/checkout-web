import React, { createContext, useEffect, useState } from "react";
import { DELIVERY_FEE, defaultTheme } from "../utils/constants";
import { CartAPI, MerchantData, OrderSummary } from "../utils/types";
import { useCache } from "../utils/useCache";

type GProps = {
    children: React.ReactNode;
};

interface ContextType {
    cartDetails: CartAPI;
    orderSummary: OrderSummary;
    theme: MerchantData;
    changeTheme: (themeData: MerchantData | {}) => void;
    changeCartDetails: (cartDetails: CartAPI | {}) => void;
}

export const CheckoutContext = createContext<ContextType>({
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

const ContextProvider = (props: GProps) => {
    const [theme, setTheme] = useState<MerchantData>(defaultTheme);
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

    const changeTheme = (themeData: MerchantData | {}) => {
        if (!themeData) return;
        if (JSON.stringify(themeData) === JSON.stringify(theme)) return;
        const newTheme = themeData as MerchantData;
        setTheme(newTheme);
        if (newTheme) {
            const root = document.documentElement;
            const { theme } = newTheme;
            for (const [key, value] of Object.entries(theme)) {
                root.style.setProperty(`${key}`, value);
            }
        }
    };

    return (
        <CheckoutContext.Provider
            value={{
                cartDetails,
                changeCartDetails,
                orderSummary,
                theme,
                changeTheme,
            }}
        >
            {props.children}
        </CheckoutContext.Provider>
    );
};

export default ContextProvider;
