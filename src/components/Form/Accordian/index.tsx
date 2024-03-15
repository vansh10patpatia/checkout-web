import React, { useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import cx from "classnames";
import Input from "../Input";

const AccordionWithInput = ({
    title,
    children,
    key,
    isOpen,
    onToggle,
}: any) => {
    const toggleAccordion = () => {
        onToggle(!isOpen);
    };

    return (
        <div className="accordion">
            <div className={cx("accordionHeader")} onClick={toggleAccordion}>
                {title}
                <IoChevronUp
                    className={cx("icon", {
                        down: !isOpen,
                        up: isOpen,
                    })}
                />
            </div>
            {isOpen && <div className="accordionBody">{children}</div>}
        </div>
    );
};

export default AccordionWithInput;
