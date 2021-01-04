import { START_LOADING_PRODUCTS, STOP_LOADING_PRODUCTS } from '../types';

const initState = {
  loadingProducts: false,
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
    default:
      return state;
  }
};

export default asyncReducer;
