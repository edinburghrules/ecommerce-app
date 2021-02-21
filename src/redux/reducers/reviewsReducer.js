import { SET_PRODUCT_REVIEWS } from "../types";

const initState = {
  reviews: null,
};

const reviewsReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_PRODUCT_REVIEWS:
      return {
        reviews: action.payload,
      };
    default:
      return state;
  }
};

export default reviewsReducer;
