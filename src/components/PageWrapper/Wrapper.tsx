import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";

interface Props {
    children: React.ReactNode;
    pageTitle: string;
}

const PageWrapper: NextPage<Props> = ({ children, pageTitle }) => {
    return (
        <Fragment>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <div>{children}</div>
        </Fragment>
    );
};

export default PageWrapper;
