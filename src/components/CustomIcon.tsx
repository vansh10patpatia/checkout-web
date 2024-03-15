import React from "react";
import { PiContactlessPaymentDuotone } from "react-icons/pi";
import { IoCardOutline } from "react-icons/io5";
import { CiWallet, CiMoneyCheck1 } from "react-icons/ci";

interface GetCustomIconProps {
    iconType: string;
}

const GetCustomIcon: React.FC<GetCustomIconProps> = ({ iconType }) => {
    switch (iconType) {
        case "UPI":
            return <PiContactlessPaymentDuotone />;

        case "CARDS":
            return <IoCardOutline />;

        case "WALLET":
            return <CiWallet />;
        default:
            return <CiMoneyCheck1 />;
    }
};

export default GetCustomIcon;
