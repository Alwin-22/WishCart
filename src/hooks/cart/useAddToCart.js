import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryClient } from "./../../../node_modules/@tanstack/query-core/src/queryClient";
import apiClient from "../../Utils/api-client";
import { getJWt } from "../../services/userServices";

const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, quantity }) =>
      apiClient
        .post(
          `/cart/${id}`,
          { quantity },
          {
            headers: {
              "x-auth-token": getJWt(),
            },
          },
        )
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};
export default useAddToCart;
