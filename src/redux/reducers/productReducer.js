import {
  GET_ALL_PRODUCTS,
  GET_FILTERED_PRODUCTS,
  GET_CATEGORY_PRODUCTS,
} from '../types';

const initState = {
  productsList: [],
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
    default:
      return state;
  }
};

export default productsReducer;
