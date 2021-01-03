import axios from 'axios';
import { GET_ALL_PRODUCTS } from '../types';

export const getAllProducts = (link, history) => {
  return async (dispatch) => {
    try {
      const getAllProductsResponse = await axios.get(
        `/products/?collection=${link}`
      );
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: getAllProductsResponse.data,
      });
      history.push(`/collection/${link}`);
    } catch (err) {
      console.log(err);
    }
  };
};
