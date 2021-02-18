import axios from "axios";
import {
  GET_ALL_PRODUCTS,
  GET_CATEGORY_PRODUCTS,
  GET_FILTERED_PRODUCTS,
  SET_PRODUCT,
} from "../types";
import {
  startLoadingProducts,
  stopLoadingProducts,
} from "../actions/asyncActions";

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

export const getFilteredProducts = (collection, colors, bestFor, category) => {
  return async (dispatch) => {
    try {
      dispatch(startLoadingProducts());

      const getFilteredProductsResponse = await axios.get(
        `/filtered-products/?collection=${collection}${
          category ? `&category=${category}` : ""
        }${colors ? `&colors=${colors}` : ""}${
          bestFor ? `&bestfor=${bestFor}` : ""
        }`
      );

      dispatch({
        type: GET_FILTERED_PRODUCTS,
        payload: getFilteredProductsResponse.data,
      });
      dispatch(stopLoadingProducts());
    } catch (err) {
      console.log(err);
    }
  };
};

export const getProduct = (collection, productId) => {
  const productData = {
    collection,
    productId,
  };
  return async (dispatch) => {
    try {
      dispatch(startLoadingProducts());
      const getProductResponse = await axios.post("/get-product", productData);
      dispatch({ type: SET_PRODUCT, payload: getProductResponse.data });
      dispatch(stopLoadingProducts());
    } catch (err) {
      console.log(err);
    }
  };
};
