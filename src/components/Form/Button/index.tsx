import React from "react";
import cx from "classnames";

interface GButtonProps {
    children: any;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

const Button = ({ children, onClick, className, disabled }: GButtonProps) => {
    return (
        <button
            className={cx("button", className, { disabled: disabled })}
            onClick={onClick}
            disabled={disabled}
            type="button"
        >
            {children}
        </button>
    );
};

export default Button;
