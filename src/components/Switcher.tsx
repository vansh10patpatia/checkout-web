import React, { useContext } from "react";
import { CheckoutContext } from "@/contexts/Context";
import { API_ROUTES } from "@/utils/constants";
import { useCache } from "@/utils/useCache";
import { MerchantData } from "@/utils/types";
import cx from "classnames";

const Switcher: React.FC = () => {
    const [toggleTheme, setToggleTheme] = React.useState(false);
    const { changeTheme } = useContext(CheckoutContext);
    const { fetchData } = useCache<MerchantData>(
        API_ROUTES.THEME,
        changeTheme,
        true
    );

    const changeThemeMode = () => {
        setToggleTheme((prev) => !prev);
        fetchData();
    };

    return (
        <div className="switch-container">
            <div
                onClick={changeThemeMode}
                aria-label="Toggle para modo nocturno"
                className={cx("toggle", {
                    "dark-switch": toggleTheme,
                })}
            ></div>
        </div>
    );
};

export default Switcher;
