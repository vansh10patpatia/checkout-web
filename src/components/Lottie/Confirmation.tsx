import React, { useRef, useEffect } from "react";
import lottie, { AnimationItem } from "lottie-web";
import animationData from "@/assests/Confirmation.json";

interface LottieProps {}
const ConfirmationLottie: React.FC<LottieProps> = ({}) => {
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
            <p>Your order is confirmed</p>
        </div>
    );
};

export default ConfirmationLottie;
