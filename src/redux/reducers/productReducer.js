import { GET_ALL_PRODUCTS } from '../types';

const initState = {
  productsList: [],
};

const productsReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        productsList: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
