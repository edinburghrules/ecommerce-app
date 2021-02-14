import {
  SET_CART,
  CLOSE_CART,
  OPEN_CART,
  LOW_STOCK,
  CLEAR_LOW_STOCK,
} from "../types";
import axios from "axios";
import { startLoadingCart, stopLoadingCart } from "./asyncActions";
import {
  deleteFromCartLocalStorage,
  parseCartFromLocalStorage,
  addToCartLocalStorage,
  increaseQtyLocalStorage,
  decreaseQtyLocalStorage,
  getCurrentQtyLocalStorage,
} from "../../utils/local-storage/cart-handler";

export const openCart = () => {
  return { type: OPEN_CART };
};

export const closeCart = () => {
  return { type: CLOSE_CART };
};

export const getCart = (authenticated) => {
  return async (dispatch) => {
    if (authenticated) {
      try {
        dispatch(startLoadingCart());
        const getCartResponse = await axios.get("/get-cart");
        dispatch({ type: SET_CART, payload: getCartResponse.data });
        dispatch(stopLoadingCart());
        return;
      } catch (err) {
        console.log(err);
      }
    } else {
      dispatch(startLoadingCart());
      const cartFromLocalStorage = parseCartFromLocalStorage("cart");
      dispatch({ type: SET_CART, payload: cartFromLocalStorage });
      dispatch(stopLoadingCart());
    }
  };
};

export const addToCart = (product, authenticated) => {
  const productData = {
    product,
  };
  return async (dispatch) => {
    if (authenticated) {
      try {
        await axios.post("/add-to-cart", productData);
        dispatch(openCart());
      } catch (err) {
        dispatch({ type: LOW_STOCK, payload: err.response.data.fail });
        dispatch(openCart());
      }
    } else {
      const currentQty = getCurrentQtyLocalStorage(product);
      const response = await axios.post("/get-stock-qty", productData);
      const qtyInStock = response.data;
      if (currentQty < qtyInStock) {
        addToCartLocalStorage(product);
        dispatch(openCart());
      } else {
        dispatch({
          type: LOW_STOCK,
          payload:
            "Sorry, there is not enough stock to increase quantity further",
        });
        dispatch(openCart());
      }
    }
  };
};

export const increaseQty = (product, authenticated) => {
  const productData = {
    product,
  };
  return async (dispatch) => {
    if (authenticated) {
      try {
        await axios.post("/increase-qty", productData);
        dispatch(getCart(authenticated));
      } catch (err) {
        console.log(err);
        dispatch({ type: LOW_STOCK, payload: err.response.data.fail });
      }
    } else {
      const response = await axios.post("/get-stock-qty", productData);
      const qtyInStock = response.data;
      // increase qty of product in cart if cartQty is less than stockQty
      const currentQty = getCurrentQtyLocalStorage(product);
      if (currentQty < qtyInStock) {
        increaseQtyLocalStorage(product);
        dispatch(getCart(authenticated));
      } else {
        dispatch({
          type: LOW_STOCK,
          payload:
            "Sorry, there is not enough stock to increase quantity further",
        });
      }
    }
  };
};

export const decreaseQty = (product, authenticated) => {
  const productData = {
    product,
  };
  return async (dispatch) => {
    if (authenticated) {
      try {
        await axios.post("/decrease-qty", productData);
        dispatch(getCart(authenticated));
        dispatch({ type: CLEAR_LOW_STOCK });
      } catch (err) {
        console.log(err);
      }
    } else {
      decreaseQtyLocalStorage(product);
      dispatch(getCart(authenticated));
      dispatch({ type: CLEAR_LOW_STOCK });
    }
  };
};

export const deleteFromCart = (product, authenticated) => {
  const productData = {
    product,
  };
  return async (dispatch) => {
    if (authenticated) {
      try {
        await axios.post("/delete-from-cart", productData);
        dispatch(getCart(authenticated));
      } catch (err) {
        console.log(err);
      }
    } else {
      deleteFromCartLocalStorage(product);
      dispatch(getCart(authenticated));
    }
  };
};
