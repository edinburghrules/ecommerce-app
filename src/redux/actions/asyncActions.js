import {
  START_SUBMITTING_PAYMENT,
  STOP_SUBMITTING_PAYMENT,
  START_LOADING_PRODUCTS,
  STOP_LOADING_PRODUCTS,
  STOP_LOADING_CART,
  START_LOADING_SIGN_IN,
  STOP_LOADING_SIGN_IN,
  APP_LOADED,
} from "../types";

// APP ASYNC
export const appLoaded = () => {
  return async (dispatch) => {
    dispatch({ type: APP_LOADED });
  };
};
export const startLoadingSignin = () => ({ type: START_LOADING_SIGN_IN });
export const stopLoadingSignin = () => ({ type: STOP_LOADING_SIGN_IN });

// PRODUCT ASYNC
export const startLoadingProducts = () => ({ type: START_LOADING_PRODUCTS });
export const stopLoadingProducts = () => ({ type: STOP_LOADING_PRODUCTS });

// CART ASYNC
export const stopLoadingCart = () => ({ type: STOP_LOADING_CART });

// ORDER ASYNC
export const startSubmittingPayment = () => ({type: START_SUBMITTING_PAYMENT});
export const stopSubmittingPayment = () => ({type: STOP_SUBMITTING_PAYMENT});
