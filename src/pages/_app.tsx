import CartContextProvider from "@/utils/CartContext";
import Wrapper from "@/components/PageWrapper";
import { AppProps } from "next/app";

import "@/styles/index.scss";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import Header from "@/components/Header";
import { useCache } from "@/utils/useCache";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <CartContextProvider>
            <Header />
            <Wrapper Component={Component} pageProps={pageProps} />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </CartContextProvider>
    );
}

export default MyApp;
