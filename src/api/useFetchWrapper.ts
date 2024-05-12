import { useState } from "react";

/**
 * A wrapper around fetch request for handling loading, error states.
 * 
 * Accepts a generic type that defines the type for the data to be returned.
 */
export function useFetchWrapper<T>() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState<T | undefined>(undefined);

    /**
     * Triggers the fetch request, updating loading, error, and data states accordingly.
     */
    async function trigger(callback: () => Promise<T>) {
        setError("");
        setLoading(true);
        setData(undefined);
        try {
            setData(await callback());
            setLoading(false);
        }
        catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
            else {
                setError("Failed to fetch resource (useFetchWrapper.ts)");
            }
        }
        finally {
            setLoading(false);
        }
    }

    return { loading, error, data, trigger }
}