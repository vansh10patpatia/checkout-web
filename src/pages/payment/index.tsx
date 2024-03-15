import React, { useContext, useEffect, useState } from "react";
import { IoChevronBack, IoCardOutline } from "react-icons/io5";
import Button from "@/components/Form/Button";
import { useCache } from "@/utils/useCache";
import { CURRENCY_SYMBOL } from "@/utils/constants";
import AccordionWithInput from "@/components/Form/Accordian";
import { useFormik } from "formik";
import Input from "@/components/Form/Input";
import { CheckoutContext } from "@/contexts/Context";
import { useRouter } from "next/router";
import { validationMapper } from "@/utils/helpers";
import { toast } from "react-toastify";

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

const Payment = (props: any) => {
    const router = useRouter();
    const { cartDetails, orderSummary } = useContext(CheckoutContext);

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const data = cartDetails.paymentMethods;

    const formik = useFormik({
        initialValues: {
            paymentMethod: "",
            additionalInfo: "",
            expirationMonth: "",
            expirationYear: "",
            cvv: "",
        },
        onSubmit: (values) => {
            if (!values.paymentMethod) {
                toast.error("Please select a payment method");
                return;
            }
            const cardDetails = {
                cvv: values.cvv,
                expirationMonth: values.expirationMonth,
                expirationYear: values.expirationYear,
            };
            const { valid, error } = validationMapper[values.paymentMethod](
                values.additionalInfo,
                cardDetails
            );
            if (valid) router.push("/confirmation");
            else toast.error(error);
        },
    });

    const navigate = () => {
        router.push("/checkout");
    };

    const setPaymentMethod = (idx: number) => {
        formik.resetForm();
        formik.setFieldValue(
            "paymentMethod",
            openIndex === idx ? "" : data[idx]
        );
        setOpenIndex((prevIndex) => (prevIndex === idx ? null : idx));
    };

    useEffect(() => {
        let mounted = true;
        const checkCartItems = () => {
            if (mounted && !cartDetails.products.length) {
                router.push("/checkout?refresh=true");
            }
        };
        checkCartItems();
        return () => {
            mounted = false;
        };
    });

    return (
        <div className={"payment"}>
            <div className={"header"}>
                <h1 className={"headerTitle"}>Payment</h1>
            </div>
            <div className={"body"}>
                <div className="methods">
                    <h2>Choose Payment Method</h2>
                    {data.map((item, idx) => (
                        <AccordionWithInput
                            className={"paymentMethod"}
                            title={
                                <>
                                    {" "}
                                    <IoCardOutline />
                                    <div>
                                        <h4>{item}</h4>
                                    </div>
                                </>
                            }
                            key={idx}
                            isOpen={openIndex === idx}
                            onToggle={() => setPaymentMethod(idx)}
                        >
                            <Input
                                type={"text"}
                                id={item}
                                onChange={(e) =>
                                    formik.setFieldValue(
                                        "additionalInfo",
                                        e.target.value
                                    )
                                }
                                value={formik.values.additionalInfo}
                                placeholder={item}
                            />
                            {item === "CARDS" && (
                                <div className={"cardDetails"}>
                                    <Input
                                        type="text"
                                        id="cvv"
                                        onChange={(e) =>
                                            formik.setFieldValue(
                                                "cvv",
                                                e.target.value
                                            )
                                        }
                                        value={formik.values.cvv}
                                        placeholder="CVV"
                                    />
                                    <Input
                                        type="text"
                                        id="expirationMonth"
                                        onChange={(e) =>
                                            formik.setFieldValue(
                                                "expirationMonth",
                                                e.target.value
                                            )
                                        }
                                        value={formik.values.expirationMonth}
                                        placeholder="MM"
                                    />
                                    <Input
                                        type="text"
                                        id="expirationYear"
                                        onChange={(e) =>
                                            formik.setFieldValue(
                                                "expirationYear",
                                                e.target.value
                                            )
                                        }
                                        value={formik.values.expirationYear}
                                        placeholder="YY"
                                    />
                                </div>
                            )}
                        </AccordionWithInput>
                    ))}
                </div>
                <div className={"summary"}>
                    <h2>Order Summary</h2>
                    <div className={"summaryItem"}>
                        <span>Admin Fee</span>
                        <span>
                            {CURRENCY_SYMBOL} {0?.toFixed(2)}
                        </span>
                    </div>
                    <div className={"summaryItem"}>
                        <span>Total</span>
                        <span>
                            {CURRENCY_SYMBOL}{" "}
                            {orderSummary.orderTotal?.toFixed(2)}
                        </span>
                    </div>
                    <Button
                        onClick={formik.handleSubmit}
                        className="paymentButton"
                    >
                        Make a Payment
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Payment;
