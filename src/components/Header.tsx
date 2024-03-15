import { Fade } from "react-awesome-reveal";
import { useRouter } from "next/router";
import Image from "next/image";
import FallbackLogo from "@/assests/logo.svg";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/utils/CartContext";
import Button from "./Form/Button";
import { IoChevronBack } from "react-icons/io5";

const excludeBackRoutes = ["/checkout", "/confirmation"];

const Header = () => {
    const { theme, changeTheme } = useContext(CartContext);

    const router = useRouter();
    const [imgSrc, setImgSrc] = useState(FallbackLogo);

    const navigateBack = () => {
        router.back();
    };

    useEffect(() => {
        setImgSrc(theme?.merchantLogo || FallbackLogo);
    }, [theme]);

    return (
        <div className="Header">
            <div className="container">
                <Fade triggerOnce cascade>
                    {excludeBackRoutes.includes(router.pathname) ? null : (
                        <Button
                            className={"headerButton"}
                            onClick={navigateBack}
                        >
                            <IoChevronBack />
                        </Button>
                    )}
                    <figure onClick={() => router.push("/checkout")}>
                        <div className="img-container">
                            <Image
                                src={imgSrc}
                                alt="GEU One Logo"
                                width={270}
                                height={270}
                                onError={(e) => {
                                    setImgSrc(FallbackLogo);
                                }}
                            />
                        </div>
                        <figcaption>{theme?.merchantName || "asas"}</figcaption>
                    </figure>
                </Fade>
            </div>
        </div>
    );
};

export default Header;