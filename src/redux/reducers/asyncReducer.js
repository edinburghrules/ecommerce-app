import {
  START_LOADING_CART,
  START_LOADING_PRODUCTS,
  STOP_LOADING_CART,
  STOP_LOADING_PRODUCTS,
} from "../types";

const initState = {
  loadingProducts: false,
  loadingCart: { loading: false, cartItem: "" },
};

const asyncReducer = (state = initState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default asyncReducer;
