import apiClient from "../Utils/api-client";
import { useQuery } from "@tanstack/react-query";

const useData = (endpoint, customConfig = {}, queryKey, options = {}) => {
  const fetchFunction = () =>
    apiClient.get(endpoint, customConfig).then((res) => res.data);

  return useQuery({
    queryKey: queryKey,
    queryFn: fetchFunction,
    staleTime: 300_000,
    ...options,
  });
};

export default useData;
