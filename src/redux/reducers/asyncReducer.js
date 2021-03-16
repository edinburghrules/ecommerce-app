import {
  APP_LOADED,
  START_LOADING_CART,
  START_LOADING_PRODUCTS,
  STOP_LOADING_CART,
  STOP_LOADING_PRODUCTS,
  START_LOADING_SIGN_IN,
  STOP_LOADING_SIGN_IN,
  START_SUBMITTING_PAYMENT,
  STOP_SUBMITTING_PAYMENT,
} from "../types";

const initState = {
  appLoaded: false,
  loadingProducts: false,
  loadingCart: { loading: false, cartItem: "" },
  loadingSignin: false,
  submittingPayment: false,
};

const asyncReducer = (state = initState, action) => {
  switch (action.type) {
    case APP_LOADED:
      return {
        ...state,
        appLoaded: true,
      };
    case START_LOADING_SIGN_IN:
      return {
        ...state,
        loadingSignin: true,
      };
    case STOP_LOADING_SIGN_IN:
      return {
        ...state,
        loadingSignin: false,
      };
    case START_LOADING_PRODUCTS:
      return {
        ...state,
        loadingProducts: true,
      };
    case STOP_LOADING_PRODUCTS:
      return {
        ...state,
        loadingProducts: false,
      };
    case START_LOADING_CART:
      return {
        ...state,
        loadingCart: { loading: true, cartItem: action.payload.cartItem },
      };
    case STOP_LOADING_CART:
      return {
        ...state,
        loadingCart: { loading: false, cartItem: "" },
      };
    case START_SUBMITTING_PAYMENT:
      return {
        ...state,
        submittingPayment: true,
      };
    case STOP_SUBMITTING_PAYMENT:
      return {
        ...state,
        submittingPayment: false,
      };
    default:
      return state;
  }
};

export default asyncReducer;
