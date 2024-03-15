import React, { useRef, useEffect } from "react";
import lottie, { AnimationItem } from "lottie-web";
import animationData from "@/assests/NotFound.json";
import Link from "next/link";

interface LottieProps {}
const NotFoundLottie: React.FC<LottieProps> = ({}) => {
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
        <div className="lottie-container bg-none">
            <div ref={containerRef} className="lottie" />

            <p>
                Page Not Found. <Link href="/checkout">Return to home</Link>
            </p>
        </div>
    );
};

export default NotFoundLottie;
