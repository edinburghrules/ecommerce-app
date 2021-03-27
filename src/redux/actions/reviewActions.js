import axios from "axios";
import { SET_PRODUCT_REVIEWS } from "../types";

export const getProductReviews = (productId) => {
  const productData = {
    productId,
  };
  return async (dispatch) => {
    try {
      const getProductReviewsResponse = await axios.post(
        "/get-reviews",
        productData
      );

      dispatch({
        type: SET_PRODUCT_REVIEWS,
        payload: getProductReviewsResponse.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const addProductReview = (review, history) => {
  const reviewData = {
    review,
  };
  return async (dispatch) => {
    try {
      await axios.post("/add-review", reviewData);
      history.push(`/account/${review.email}`);
    } catch (err) {
      console.log(err);
    }
  };
};
