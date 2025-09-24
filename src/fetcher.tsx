import { useEffect, useState } from "react";

export const useFetcher = (url: string) => {
  const [data, setData] = useState<any>(null);   
  const [isError, setIsError] = useState(false); 
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]); 

  return { data, isError, isLoading };
};
