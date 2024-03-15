import React, { Fragment, useContext } from "react";
import Head from "next/head";
import { CheckoutContext } from "@/contexts/Context";

interface WrapperProps {
    Component: React.ComponentType<any>;
    pageProps: any;
}

const Wrapper: React.FC<WrapperProps> = ({ Component, pageProps }) => {
    const { theme } = useContext(CheckoutContext);
    const title = theme.merchantName + "- Journey Through Checkout Bliss";
    const description =
        "Embark on a journey of seamless transactions with our user-friendly checkout experience!";

    return (
        <Fragment>
            <Head>
                {/* BASIC SITE INFO  */}
                <meta
                    httpEquiv="Content-Type"
                    content="text/html; charset=utf-8"
                />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                    key="viewport"
                />

                {/* SITE ICONS */}
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href={theme.merchantLogo}
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href={theme.merchantLogo}
                />
                <link rel="mask-icon" href="/vercel.svg" color="#4A91FF" />
                <meta name="theme-color" content="#ffffff" />

                {/* MAIN META TAGS  */}
                <title>{title}</title>
                <meta name="description" content={description} />

                {/* SOCIAL META TAGS  */}
                <meta property="og:site_name" content="GEU Drive" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta
                    property="og:image"
                    itemProp="image"
                    content={theme.merchantLogo}
                />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content={theme.merchantName} />

                {/* TWITTER META TAGS  */}
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={theme.merchantLogo} />
                <meta name="twitter:creator" content="@pattu___" />
            </Head>
            <div className="wrapper">
                <Component {...pageProps} />
            </div>
        </Fragment>
    );
};

export default Wrapper;
