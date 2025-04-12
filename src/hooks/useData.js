import { useEffect, useState } from "react";
import apiClient from "../Utils/api-client";

const useData = (endpoint, customConfig) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(data === null); // 👈 Only show skeletons if there's no existing data

    apiClient
      .get(endpoint, customConfig)
      .then((res) => {
        if (isMounted) {
          setData(res.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [endpoint, customConfig]);

  return { data, error, isLoading };
};

export default useData;
