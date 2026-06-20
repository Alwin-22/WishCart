import apiClient from "../Utils/api-client";

export function getSuggestionsAPI(search) {
  return apiClient.get(`/products/suggestions?search=${search}`);
}
