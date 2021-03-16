import { GET_ORDER } from "../types";

const initState = {
  order: null,
};

const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default orderReducer;
