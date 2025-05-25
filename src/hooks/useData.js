import { useEffect, useState} from "react";
import apiClient from "../Utils/api-client";

const useData = (endpoint, customConfig) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchingRef = customConfig?.fetchingRef || { current: false };

  useEffect(() => {
    let isMounted = true;
    setIsLoading(data === null);

    apiClient
      .get(endpoint, customConfig)
      .then((res) => {
        if (isMounted) {
          if (
            endpoint === "/products" &&
            data &&
            data.products &&
            customConfig.params.page !== 1
          ) {
            setData((prev) => ({
              ...prev,
              products: [...prev.products, ...res.data.products],
            }));
          } else {
            setData(res.data);
          }
          setIsLoading(false);
          fetchingRef.current = false;
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
          fetchingRef.current = false;
        }
      });

    return () => {
      isMounted = false;
    };
  }, [endpoint, customConfig]);

  return { data, error, isLoading };
};

export default useData;
