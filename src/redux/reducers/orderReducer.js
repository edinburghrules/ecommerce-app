import { GET_ORDER, GET_PREVIOUS_ORDERS } from "../types";

const initState = {
  order: null,
  previousOrders: null,
};

const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case GET_PREVIOUS_ORDERS:
      return {
        ...state,
        previousOrders: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default orderReducer;
