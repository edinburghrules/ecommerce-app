import {
  APP_LOADED,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  UNSET_FAVOURITES,
} from "../types";
import { startLoadingSignin, stopLoadingSignin } from "./asyncActions";
import axios from "axios";
import { getCart, addToCartFromLocalStorage } from "./cartActions";
import { parseCartFromLocalStorage } from "../../utils/local-storage/cart-handler";

export const register = (registerData, history) => {
  return async (dispatch) => {
    try {
      const registerResponse = await axios.post("/register", registerData);
      setAuthorizationHeader(registerResponse.data);
      dispatch(getAccountData());
      history.push("/");
    } catch (err) {
      return err.response.data;
    }
  };
};

const setAuthorizationHeader = (token) => {
  const firebaseToken = `Bearer ${token}`;
  localStorage.setItem("firebaseToken", firebaseToken);
  axios.defaults.headers.common["Authorization"] = firebaseToken;
};

export const getAccountData = () => {
  const cartFromLocalStorage = parseCartFromLocalStorage("cart");
  return async (dispatch) => {
    try {
      const accountDataResponse = await axios.get("/account");
      await dispatch({
        type: SET_AUTHENTICATED,
        payload: accountDataResponse.data,
      });
      if (cartFromLocalStorage.length > 0) {
        await dispatch(addToCartFromLocalStorage(cartFromLocalStorage));
        localStorage.removeItem("cart");
        await dispatch(getCart(true));
      } else {
        await dispatch(getCart(true));
      }
      dispatch({ type: APP_LOADED });
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const signIn = (signInData, history, location) => {
  return async (dispatch) => {
    try {
      dispatch(startLoadingSignin());
      const signInResponse = await axios.post("/signin", signInData);
      setAuthorizationHeader(signInResponse.data);
      await dispatch(getAccountData());
      if (location.state && location.state.fromCheckout) {
        history.push({
          pathname: "/checkout",
          state: { fromCart: true },
        });
        dispatch(stopLoadingSignin());
      } else {
        history.push("/");
        dispatch(stopLoadingSignin());
      }
    } catch (err) {
      console.log(err);
      dispatch(stopLoadingSignin());
      return err.response.data;
    }
  };
};

export const signOut = (history) => {
  return async (dispatch) => {
    try {
      dispatch(startLoadingSignin());
      localStorage.removeItem("firebaseToken");
      delete axios.defaults.headers.common["Authorization"];
      dispatch({ type: SET_UNAUTHENTICATED });
      dispatch({ type: UNSET_FAVOURITES });
      dispatch(getCart(false));
      if (history) {
        history.push("/");
      }
      dispatch(stopLoadingSignin());
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  };
};

export const addAddress = (address, email, history) => {
  const addressData = {
    address,
  };
  return async (dispatch) => {
    try {
      console.log(address);
      await axios.post("/add-address", addressData);
      await dispatch(getAccountData());
      history.push(`/account/${email}`);
    } catch (err) {
      console.log(err);
    }
  };
};
