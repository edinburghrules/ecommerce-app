import {
  SET_CART,
  CLOSE_CART,
  OPEN_CART,
  LOW_STOCK,
  CLEAR_LOW_STOCK,
} from "../types";
import axios from "axios";
import { startLoadingCart, stopLoadingCart } from "./asyncActions";

export const openCart = () => {
  return { type: OPEN_CART };
};

export const closeCart = () => {
  return { type: CLOSE_CART };
};

export const getCart = () => {
  return async (dispatch) => {
    try {
      dispatch(startLoadingCart());
      const getCartResponse = await axios.get("/get-cart");
      dispatch({ type: SET_CART, payload: getCartResponse.data });
      dispatch(stopLoadingCart());
      return;
    } catch (err) {
      console.log(err);
    }
  };
};

export const addToCart = (product) => {
  const productData = {
    product,
  };
  return async (dispatch) => {
    try {
      await axios.post("/add-to-cart", productData);
      dispatch(openCart());
    } catch (err) {
      dispatch({ type: LOW_STOCK, payload: err.response.data.fail });
      dispatch(openCart());
    }
  };
};

export const increaseQty = (product) => {
  const productData = {
    product,
  };
  return async (dispatch) => {
    try {
      await axios.post("/increase-qty", productData);
      dispatch(getCart());
    } catch (err) {
      console.log(err);
      dispatch({ type: LOW_STOCK, payload: err.response.data.fail });
    }
  };
};

export const decreaseQty = (product) => {
  const productData = {
    product,
  };
  return async (dispatch) => {
    try {
      await axios.post("/decrease-qty", productData);
      dispatch(getCart());
      dispatch({ type: CLEAR_LOW_STOCK });
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteFromCart = (product) => {
  const productData = {
    product,
  };
  return async (dispatch) => {
    try {
      await axios.post("/delete-from-cart", productData);
      dispatch(getCart());
    } catch (err) {
      console.log(err);
    }
  };
};
