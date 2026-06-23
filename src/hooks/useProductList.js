import apiClient from "../Utils/api-client";
import { useInfiniteQuery } from "@tanstack/react-query";

const useProductList = (query) => {
  const fetchFunction = ({ pageParam = 1 }) =>
    apiClient
      .get("/products", {
        params: {
          ...query,
          page: pageParam,
        },
      })
      .then((res) => res.data);

  return useInfiniteQuery({
    queryKey: ["products", query],
    queryFn: fetchFunction,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return null;
    },
  });
};

export default useProductList;
