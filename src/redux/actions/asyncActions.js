import {
  START_LOADING_PRODUCTS,
  STOP_LOADING_PRODUCTS,
  STOP_LOADING_CART,
} from "../types";

// PRODUCT ASYNC
export const startLoadingProducts = () => ({ type: START_LOADING_PRODUCTS });
export const stopLoadingProducts = () => ({ type: STOP_LOADING_PRODUCTS });

// CART ASYNC
export const stopLoadingCart = () => ({ type: STOP_LOADING_CART });
