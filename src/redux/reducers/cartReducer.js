import {
  SET_CART,
  CLOSE_CART,
  OPEN_CART,
  LOW_STOCK,
  CLEAR_LOW_STOCK,
} from "../types";

const initState = {
  cartList: [],
  cartOpen: false,
  lowStockMsg: [],
  lowStock: false,
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case CLOSE_CART:
      return {
        cartList: [...state.cartList],
        cartOpen: false,
        lowStockMsg: [],
      };
    case SET_CART:
      return {
        ...state,
        cartList: [...action.payload],
      };
    case OPEN_CART:
      return {
        ...state,
        cartOpen: true,
      };
    case LOW_STOCK:
      return {
        ...state,
        lowStockMsg: [
          ...state.lowStockMsg,
          {
            msg: action.payload.msg,
            cartItem: action.payload.cartItem,
          },
        ],
        lowStock: true,
      };
    case CLEAR_LOW_STOCK:
      return {
        ...state,
        lowStockMsg: state.lowStockMsg.filter((item) => {
          if (
            item.cartItem.id === action.payload.id &&
            item.cartItem.id === action.payload.id
          ) {
            return item.cartItem.size !== action.payload.size;
          } else return item.cartItem.id !== action.payload.id;
        }),
        lowStock: false,
      };
    default:
      return state;
  }
};

export default cartReducer;
