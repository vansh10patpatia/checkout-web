import React from "react";
import cx from "classnames";
import { text } from "stream/consumers";

interface GInputProps {
    id: string;
    label?: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    disbabled?: boolean;
    icon?: React.ReactNode;
    inlineButton?: React.ReactNode;
    className?: string;
    placeholder?: string;
}

const Input = (props: GInputProps) => {
    const {
        icon,
        id,
        label,
        type = "text",
        value,
        onChange,
        error,
        disbabled = false,
        inlineButton,
        className,
        placeholder,
    } = props;

    return (
        <div className={className}>
            {!!label && <p className={"inputLabel"}>{label}</p>}
            <div className={"inputContainer"}>
                {!!icon && <div className={"iconContainer"}>{icon}</div>}
                <input
                    id={id}
                    className={cx("inputBox")}
                    type={type}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disbabled}
                    value={value}
                />
                {!!inlineButton && (
                    <div className={"inlineButton"}>{inlineButton}</div>
                )}
            </div>
            {!!error && <span className={"inputError"}> {error} </span>}
        </div>
    );
};

export default Input;
