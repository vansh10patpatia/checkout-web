import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        router.push("/checkout");
    }, []);

    return <div>Home</div>;
};

export default Home;
