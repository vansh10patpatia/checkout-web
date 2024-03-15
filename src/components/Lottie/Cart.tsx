import React, { useRef, useEffect } from "react";
import lottie, { AnimationItem } from "lottie-web";
import animationData from "@/assests/EmptyCart.json";

interface LottieProps {
    emptyCart?: boolean;
}
const EmptyCart: React.FC<LottieProps> = ({ emptyCart }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let anim: AnimationItem | undefined;

        if (containerRef.current) {
            anim = lottie.loadAnimation({
                container: containerRef.current,
                animationData: animationData,
                renderer: "svg",
                loop: true,
                autoplay: true,
            });
        }

        return () => {
            if (anim) {
                anim.destroy();
            }
        };
    }, []);

    return (
        <div className="lottie-container">
            <div ref={containerRef} className="lottie" />
            {emptyCart && <p>Cart is Empty</p>}
        </div>
    );
};

export default EmptyCart;
