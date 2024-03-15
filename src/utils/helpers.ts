import exp from "constants";
import { cardDetails } from "./types";

export const camelToFlat = (camel: string) => {
    const camelCase = camel.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");

    let flat = "";

    camelCase.forEach((word) => {
        flat = flat + word.charAt(0).toUpperCase() + word.slice(1) + " ";
    });
    return flat;
};

export const formatDate = () => {
    const futureDate = new Date();

    futureDate.setDate(futureDate.getDate() + 2);

    return futureDate.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

export const validateUPI = (upi: string) => {
    const upiPattern = /^[0-9A-Za-z.-]{2,256}@[A-Za-z]{2,64}$/;

    return {
        valid: upiPattern.test(upi),
        error: "Invalid UPI ID",
    };
};

const validateCard = (cardNumber: string, cardDetails: cardDetails) => {
    const { cvv, expirationMonth, expirationYear } = cardDetails;

    const patterns = {
        amex: /^3[47][0-9]{13}$/,
        bcGlobal: /^(6541|6556)[0-9]{12}$/,
        carteBlanche: /^389[0-9]{11}$/,
        dinersClub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
        discover:
            /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/,
        instaPayment: /^63[7-9][0-9]{13}$/,
        jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
        koreanLocal: /^9[0-9]{15}$/,
        laser: /^(6304|6706|6709|6771)[0-9]{12,15}$/,
        maestro: /^(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}$/,
        mastercard:
            /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/,
        solo: /^(6334|6767)[0-9]{12}|(6334|6767)[0-9]{14}|(6334|6767)[0-9]{15}$/,
        switch: /^(4903|4905|4911|4936|6333|6759)[0-9]{12}|(4903|4905|4911|4936|6333|6759)[0-9]{14}|(4903|4905|4911|4936|6333|6759)[0-9]{15}|564182[0-9]{10}|564182[0-9]{12}|564182[0-9]{13}|633110[0-9]{10}|633110[0-9]{12}|633110[0-9]{13}$/,
        unionPay: /^62[0-9]{14,17}$/,
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        visaMaster: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/,
    };

    let isValid = false;
    let error = "";

    for (const [vendor, pattern] of Object.entries(patterns)) {
        if (pattern.test(cardNumber)) {
            isValid = true;
            error = `${vendor} number is valid.`;
            break;
        }
    }

    if (!isValid) {
        error = "Invalid card number.";
    } else if (!/^\d{3,4}$/.test(cvv)) {
        isValid = false;
        error = "Invalid CVV.";
    } else {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        const expYear = parseInt("20" + expirationYear, 10);
        const expMonth = parseInt(expirationMonth, 10);

        console.log(expYear, expMonth, currentYear, currentMonth);

        if (
            !/^\d{2}$/.test(expirationYear) ||
            !/^\d{2}$/.test(expirationMonth) ||
            expYear < currentYear ||
            (expYear === currentYear && expMonth < currentMonth) ||
            expMonth > 12
        ) {
            isValid = false;
            error = "Invalid expiration date.";
        }
    }

    return { valid: isValid, error };
};

export const validatePhone = (phone: string) => {
    const phoneNumberPattern = /^\+?\d{10}$/;
    return {
        valid: phoneNumberPattern.test(phone.replace(/\s/g, "")),
        error: "Invalid Phone Number",
    };
};

type ValidationFunction = (
    input: string,
    cardDetails: cardDetails
) => {
    valid: boolean;
    error: string;
};

export const validationMapper: Record<string, ValidationFunction> = {
    UPI: validateUPI,
    CARDS: validateCard,
    WALLET: validatePhone,
};
