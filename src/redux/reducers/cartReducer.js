import { ADD_TO_CART } from '../types';

const initState = {
  cartList: [],
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        cartList: [...state.cartList, action.payload],
      };
    default:
      return state;
  }
};

export default cartReducer;
