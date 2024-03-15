import React, { useState } from "react";
import cx from "classnames";

interface TooltipProps {
    text: string;
    children: React.ReactNode;
    className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, className }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    return (
        <div
            className={cx("tooltip-container", className)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {showTooltip && <div className="tooltip">{text}</div>}
        </div>
    );
};

export default Tooltip;
