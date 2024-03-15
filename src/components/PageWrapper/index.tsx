import { useEffect, useContext, Fragment } from "react";
import Head from "next/head";
import { useCache } from "@/utils/useCache";
import Header from "../Header";

interface WrapperProps {
    Component: React.ComponentType<any>;
    pageProps: any;
}

const Wrapper: React.FC<WrapperProps> = ({ Component, pageProps }) => {
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
                    href="/favicon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon.png"
                />
                <link rel="mask-icon" href="/vercel.svg" color="#4A91FF" />
                <meta name="theme-color" content="#ffffff" />

                {/* MAIN META TAGS  */}
                <title>GEU One - Explore a New College Experience</title>
                <meta
                    name="description"
                    content="Get Access to all the college essentials on your finger tips. Explore a new college experience with GEU One."
                />

                {/* SOCIAL META TAGS  */}
                <meta property="og:site_name" content="GEU Drive" />
                <meta
                    property="og:title"
                    content="GEU One - Explore a New College Experience"
                />
                <meta
                    property="og:description"
                    content="Get Access to all the college essentials on your finger tips. Explore a new college experience with GEU One."
                />
                <meta
                    property="og:image"
                    itemProp="image"
                    content="https://geu.one/favicon.png"
                />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="GEU One" />

                {/* TWITTER META TAGS  */}
                <meta
                    name="twitter:title"
                    content="GEU One - Explore a New College Experience"
                />
                <meta
                    name="twitter:description"
                    content="Get Access to all the college essentials on your finger tips. Explore a new college experience with GEU One."
                />
                <meta
                    name="twitter:image"
                    content="https://geu.one/favicon.png"
                />
                <meta name="twitter:creator" content="@amankumarjagdev" />
            </Head>
            <div className="wrapper">
                <Component {...pageProps} />
            </div>
        </Fragment>
    );
};

export default Wrapper;
