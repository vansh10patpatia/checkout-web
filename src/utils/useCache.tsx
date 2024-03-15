import { useState, useEffect } from "react";
import { API_BASE_URL } from "./constants";

type CachedData<T> = {
    data: T | null;
    timestamp: number;
};

type ReturnData<T> = {
    data: T | null;
    loading: boolean;
    error: string | null;
    fetchData: () => void;
};

const DefaultTTL = 60000; // 60 Seconds

const useCachedAPI = <T,>(
    url: string,
    setFunction: (data: T | {}) => void = () => {},
    avoidInitialFetch: boolean = false,
    ttl: number = DefaultTTL
): ReturnData<T> => {
    const [cachedData, setCachedData] = useState<CachedData<T>>({
        data: null,
        timestamp: 0,
    });

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (hardRefresh: boolean = true) => {
        try {
            setIsLoading(true);

            const cachedItem = localStorage.getItem(url);
            if (cachedItem && !hardRefresh) {
                const parsedCachedData: CachedData<T> = JSON.parse(cachedItem);
                if (Date.now() - parsedCachedData.timestamp < ttl) {
                    setCachedData(parsedCachedData);
                    setIsLoading(false);
                    setFunction(parsedCachedData.data as T);
                    return;
                }
            }

            const response = await fetch(API_BASE_URL + url);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();

            const newCachedData: CachedData<T> = {
                data,
                timestamp: Date.now(),
            };
            localStorage.setItem(url, JSON.stringify(newCachedData));

            setCachedData(newCachedData);
            setFunction(newCachedData.data as T);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(error as string);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        let mounted = true;
        if (mounted && !avoidInitialFetch) fetchData(false);

        return () => {
            mounted = false;
        };
    }, [url, ttl]);

    return { data: cachedData.data, loading: isLoading, error, fetchData };
};

export const useCache = useCachedAPI;
