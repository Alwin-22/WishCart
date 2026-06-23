import apiClient from "../Utils/api-client";
import { getJWt } from "./userServices";



export function increaseProductAPI(id) {
  return apiClient.patch(`/cart/increase/${id}`);
}

export function decreaseProductAPI(id) {
  return apiClient.patch(`/cart/decrease/${id}`);
}
