import {
  START_LOADING_CART,
  START_LOADING_PRODUCTS,
  STOP_LOADING_CART,
  STOP_LOADING_PRODUCTS,
} from "../types";

const initState = {
  loadingProducts: false,
  loadingCart: false,
};

const asyncReducer = (state = initState, action) => {
  switch (action.type) {
    case START_LOADING_PRODUCTS:
      return {
        loadingProducts: true,
      };
    case STOP_LOADING_PRODUCTS:
      return {
        loadingProducts: false,
      };
    case START_LOADING_CART:
      return {
        state,
        loadingCart: true,
      };
    case STOP_LOADING_CART:
      return {
        state,
        loadingCart: false,
      };
    default:
      return state;
  }
};

export default asyncReducer;
