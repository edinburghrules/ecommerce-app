import {
  SET_CART,
  CLOSE_CART,
  OPEN_CART,
  LOW_STOCK,
  CLEAR_LOW_STOCK,
  START_LOADING_CART,
} from "../types";
import axios from "axios";
import { stopLoadingCart } from "./asyncActions";
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

export const getCart = (authenticated, product = "") => {
  return async (dispatch) => {
    if (authenticated) {
      try {
        dispatch({
          type: START_LOADING_CART,
          payload: { loading: true, cartItem: product },
        });
        const getCartResponse = await axios.get("/get-cart");
        dispatch({
          type: SET_CART,
          payload: getCartResponse.data,
        });
        dispatch(stopLoadingCart());
      } catch (err) {
        console.log(err);
      }
    } else {
      dispatch({
        type: START_LOADING_CART,
        payload: { loading: true, cartItem: product },
      });
      const cartFromLocalStorage = parseCartFromLocalStorage("cart");
      dispatch({ type: SET_CART, payload: cartFromLocalStorage });
      dispatch(stopLoadingCart());
    }
  };
};

export const addToCartFromLocalStorage = (products) => {
  const productsData = {
    products,
  };
  return async (dispatch) => {
    try {
      await axios.post("add-to-cart-from-local-storage", productsData);
      return;
    } catch (err) {
      console.log(err);
      dispatch({
        type: LOW_STOCK,
        payload: {
          msg: err.response.data.fail,
          cartItem: err.response.data.product,
        },
      });
      dispatch(openCart());
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
        dispatch(getCart(authenticated, product));
        dispatch(openCart());
      } catch (err) {
        dispatch({
          type: LOW_STOCK,
          payload: { msg: err.response.data.fail, cartItem: product },
        });
        dispatch(openCart());
      }
    } else {
      const currentQty = getCurrentQtyLocalStorage(product);
      const response = await axios.post("/get-stock-qty", productData);
      const qtyInStock = response.data;
      if (currentQty < qtyInStock) {
        addToCartLocalStorage(product);
        dispatch(getCart(authenticated, product));
        dispatch(openCart());
      } else {
        dispatch({
          type: LOW_STOCK,
          payload: {
            msg:
              "Sorry, there is not enough stock to increase quantity further",
            cartItem: product,
          },
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
        dispatch(getCart(authenticated, product));
      } catch (err) {
        console.log(err);
        dispatch({
          type: LOW_STOCK,
          payload: { msg: err.response.data.fail, cartItem: product },
        });
      }
    } else {
      const response = await axios.post("/get-stock-qty", productData);
      const qtyInStock = response.data;
      // increase qty of product in cart if cartQty is less than stockQty
      const currentQty = getCurrentQtyLocalStorage(product);
      if (currentQty < qtyInStock) {
        increaseQtyLocalStorage(product);
        dispatch(getCart(authenticated, product));
      } else {
        dispatch({
          type: LOW_STOCK,
          payload: {
            msg:
              "Sorry, there is not enough stock to increase quantity further",
            cartItem: product,
          },
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
        dispatch(getCart(authenticated, product));
        dispatch({ type: CLEAR_LOW_STOCK, payload: product });
      } catch (err) {
        console.log(err);
      }
    } else {
      decreaseQtyLocalStorage(product);
      dispatch(getCart(authenticated, product));
      dispatch({ type: CLEAR_LOW_STOCK, payload: product });
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
        dispatch(getCart(authenticated, product));
      } catch (err) {
        console.log(err);
      }
    } else {
      deleteFromCartLocalStorage(product);
      dispatch(getCart(authenticated, product));
      dispatch({ type: CLEAR_LOW_STOCK, payload: product });
    }
  };
};
