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
import { getProductReviews } from "./reviewActions";

export const getAllProducts = (collection, sort) => {
  return async (dispatch) => {
    try {
      dispatch(startLoadingProducts());
      const getAllProductsResponse = await axios.get(
        `/products/?collection=${collection}${sort ? `&sort=${sort}` : ""}`
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

export const getCategoryProducts = (collection, category, sort) => {
  return async (dispatch) => {
    try {
      dispatch(startLoadingProducts());
      const getCategoryProductsResponse = await axios.get(
        `/products-category/?collection=${collection}&category=${category}${
          sort ? `&sort=${sort}` : ""
        }`
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

export const getFilteredProducts = (
  collection,
  colors,
  bestFor,
  weather,
  category,
  sort
) => {
  return async (dispatch) => {
    try {
      dispatch(startLoadingProducts());

      const getFilteredProductsResponse = await axios.get(
        `/filtered-products/?collection=${collection}${
          category ? `&category=${category}` : ""
        }${sort ? `&sort=${sort}` : ""}${
          colors ? `&colors=${colors.trim()}` : ""
        }${bestFor ? `&bestfor=${bestFor.trim()}` : ""}${
          weather ? `&weather=${weather.trim()}` : ""
        }
        `
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
      dispatch(getProductReviews(productId));
      dispatch({ type: SET_PRODUCT, payload: getProductResponse.data });
      dispatch(stopLoadingProducts());
    } catch (err) {
      console.log(err);
    }
  };
};
