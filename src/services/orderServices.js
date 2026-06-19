import apiClient from "../Utils/api-client";

export function checkoutAPI() {
  return apiClient.post("/order/checkout");
}
