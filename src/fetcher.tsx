import { useEffect, useState } from "react";

interface FetcherState<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
}

export function useFetcher<T>(url: string): FetcherState<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setIsLoading(true);
      setIsError(false);

      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Erreur réseau: ${res.status}`);
        }
        const json = (await res.json()) as T;
        if (isMounted) {
          setData(json);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setIsError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, isLoading, isError };
}
