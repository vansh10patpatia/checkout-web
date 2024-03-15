import React, { useContext, useEffect, useMemo, useState } from "react";
import Button from "@/components/Form/Button";
import { IoChevronBack, IoLocationOutline } from "react-icons/io5";
import { BsTelephone, BsFillTrashFill } from "react-icons/bs";
import { CartContext } from "@/utils/CartContext";
import Input from "@/components/Form/Input";
import { useCache } from "@/utils/useCache";
import { camelToFlat, formatDate, validatePhone } from "@/utils/helpers";
import { API_ROUTES, CURRENCY_SYMBOL } from "@/utils/constants";
import Tooltip from "@/components/Tooltip";
import { Router, useRouter } from "next/router";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import EmptyCart from "@/components/Lottie/Cart";

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

interface ApiResponse {
    products: Product[];
    paymentMethods: string[];
}

const ActionButton = ({ children, onClick }: any) => {
    return (
        <Button className={"ActionButton"} onClick={onClick}>
            {children}
        </Button>
    );
};

const Checkout = () => {
    const router = useRouter();
    const { orderSummary, cartDetails, changeCartDetails } =
        useContext(CartContext);
    const { loading, fetchData } = useCache<ApiResponse>(
        API_ROUTES.CART,
        changeCartDetails
    );

    const deliveryDate = useMemo(() => formatDate(), []);

    const address = "15, Yemen Road, Yemen ads dsasa ssaasdsvfev s";

    const renderOrderSummary = () => {
        const summaryObj = {
            orderAmount: orderSummary.orderAmount,
            discount: orderSummary.discount,
            deliveryFee: orderSummary.deliveryFee,
        };

        return (
            <>
                <h2>Order Summary</h2>
                <div className={"OrderSummaryItem"}>
                    <span>Est. Delivery Date</span>
                    <span>{deliveryDate}</span>
                </div>
                {Object.entries(summaryObj).map(([key, value]) => (
                    <div className={"OrderSummaryItem"} key={key}>
                        <span>{camelToFlat(key)}</span>
                        <span>
                            {CURRENCY_SYMBOL} {value?.toFixed(2)}
                        </span>
                    </div>
                ))}{" "}
                <div className={"OrderSummaryItem"}>
                    <div>
                        <p>Total</p>
                        <p>
                            {CURRENCY_SYMBOL}{" "}
                            {orderSummary.orderTotal?.toFixed(2)}
                        </p>
                    </div>

                    <Button
                        onClick={formik.handleSubmit}
                        className="paymentButton"
                        disabled={orderSummary.orderTotal === 0}
                    >
                        Payment
                    </Button>
                </div>
            </>
        );
    };

    const handlePromoCode = () => {
        if (!formik.values.promoCode) {
            toast.error("Please enter a promo code");
            return;
        }
        toast.success("Promo code applied successfully");
    };

    const formik = useFormik({
        initialValues: {
            phone: "",
            address,
            promoCode: "",
        },
        onSubmit: (values) => {
            const { valid, error } = validatePhone(values.phone);
            if (!valid) {
                toast.error(error);
                return;
            }
            if (orderSummary.orderTotal === 0) {
                toast.error("OOPS! Your cart is empty.");
                return;
            }
            router.push("/payment");
        },
    });

    return (
        <div className={"checkout"}>
            <div className={"header"}>
                <h1 className={"headerTitle"}>Checkout</h1>
            </div>
            <div className={"body"}>
                <div className="flex-wrapper">
                    <div className={"Delivery"}>
                        <h2>Delivery Details</h2>
                        <Tooltip className={"DeliveryBadge"} text={address}>
                            <IoLocationOutline />
                            <span>{address.substring(0, 20)} ... </span>
                        </Tooltip>
                        <Input
                            className="DeliveryPhone"
                            label="Phone"
                            icon={<BsTelephone />}
                            error={""}
                            onChange={(e) => {
                                formik.setFieldValue("phone", e.target.value);
                            }}
                            id="phone"
                            type="number"
                            value={formik.values.phone}
                        />
                        <Input
                            className="PromoCode"
                            label="Promo Code"
                            onChange={(e) => {
                                formik.setFieldValue(
                                    "promoCode",
                                    e.target.value
                                );
                            }}
                            id="promoCode"
                            value={formik.values.promoCode}
                            inlineButton={
                                <Button
                                    className={"applyButton"}
                                    onClick={handlePromoCode}
                                >
                                    Apply
                                </Button>
                            }
                        />
                    </div>
                    <div className={"OrderSummary"}>{renderOrderSummary()}</div>
                </div>
                <h2>Order Details</h2>
                <div className={"OrderDetails"}>
                    {loading && <EmptyCart />}
                    {!cartDetails.products.length && !loading && (
                        <EmptyCart emptyCart />
                    )}
                    {!!cartDetails.products.length &&
                        !loading &&
                        cartDetails?.products?.map((item) => (
                            <div key={item.id} className={"OrderItem"}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    key={item.id}
                                    className={"OrderItemImage"}
                                />
                                <div className={"OrderItemDetails"}>
                                    <h4>{item.title}</h4>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>
                                        Price: {CURRENCY_SYMBOL} {item.price}
                                    </p>
                                </div>
                                <div className="OrderItemActions">
                                    <ActionButton
                                        onClick={() => {
                                            toast.success(
                                                "This will remove the item"
                                            );
                                        }}
                                    >
                                        <BsFillTrashFill />
                                    </ActionButton>
                                </div>
                            </div>
                        ))}
                </div>
                <div className={"view-910 OrderSummary"}>
                    {renderOrderSummary()}
                </div>
            </div>
        </div>
    );
};

export default Checkout;
