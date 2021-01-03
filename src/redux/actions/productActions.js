import axios from 'axios';
import { GET_ALL_PRODUCTS, GET_CATEGORY_PRODUCTS } from '../types';

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

export const getCategoryProducts = (collection, category) => {
  return async (dispatch) => {
    try {
      const getCategoryProductsResponse = await axios.get(
        `/products-category/?collection=${collection}&category=${category}`
      );
      dispatch({
        type: GET_CATEGORY_PRODUCTS,
        payload: getCategoryProductsResponse.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
