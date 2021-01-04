import axios from 'axios';
import { GET_ALL_PRODUCTS, GET_CATEGORY_PRODUCTS } from '../types';
import {
  startLoadingProducts,
  stopLoadingProducts,
} from '../actions/asyncActions';

export const getAllProducts = (collection) => {
  return async (dispatch) => {
    try {
      dispatch(startLoadingProducts());
      const getAllProductsResponse = await axios.get(
        `/products/?collection=${collection}`
      );
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: getAllProductsResponse.data,
      });
      dispatch(stopLoadingProducts());
    } catch (err) {
      console.log(err);
    }
  };
};

export const getCategoryProducts = (collection, category) => {
  return async (dispatch) => {
    try {
      dispatch(startLoadingProducts());
      const getCategoryProductsResponse = await axios.get(
        `/products-category/?collection=${collection}&category=${category}`
      );
      dispatch({
        type: GET_CATEGORY_PRODUCTS,
        payload: getCategoryProductsResponse.data,
      });
      dispatch(stopLoadingProducts());
    } catch (err) {
      console.log(err);
    }
  };
};
