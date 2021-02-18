import {
  GET_ALL_PRODUCTS,
  GET_FILTERED_PRODUCTS,
  GET_CATEGORY_PRODUCTS,
  SET_PRODUCT,
} from "../types";

const initState = {
  productsList: [],
  product: {},
};

const productsReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        productsList: action.payload,
      };
    case GET_CATEGORY_PRODUCTS:
      return {
        productsList: action.payload,
      };
    case GET_FILTERED_PRODUCTS:
      return {
        productsList: action.payload,
      };
    case SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
