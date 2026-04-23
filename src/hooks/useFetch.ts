import { useState, useEffect } from "react";
import users from "../mock-data/user.mock.json";

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export const useFetch = <T>(
  url: string | null,
  searchTerm: string = "",
  pageOffset: number = 0,
): UseFetchState<T[]> => {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!url || searchTerm.trim() === "") {
      setData(null);
      return;
    }

    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simulate async behavior with setTimeout
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (signal.aborted) return;

        // Filter mock data based on search term
        let filteredResults = users;

        if (searchTerm.trim()) {
          const lowerSearchTerm = searchTerm.toLowerCase();
          filteredResults = users.filter((user) =>
            user.name.toLowerCase().includes(lowerSearchTerm),
          );
        }

        const result = filteredResults.slice(0, 10);
        setData((prev) =>
          pageOffset > 0 && prev
            ? ([...prev, ...result] as T[])
            : (result as T[]),
        );
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url, searchTerm, pageOffset]);

  return { data, loading, error };
};
