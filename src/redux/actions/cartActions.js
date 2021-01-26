import { ADD_TO_CART } from '../types';

export const addToCart = (product) => {
  return async (dispatch) => {
    dispatch({ type: ADD_TO_CART, payload: product });
  };
};
