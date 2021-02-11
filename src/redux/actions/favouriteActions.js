import axios from "axios";
import { SET_FAVOURITES } from "../types";
import {
  parseFavouritesFromLocalStorage,
  removeAllFavouritesFromLocalStorage,
} from "../../utils/local-storage/favourites-handler";
import { startLoadingProducts, stopLoadingProducts } from "./asyncActions";

export const getFavouritesList = () => {
  const favouritesFromLocalStorage = parseFavouritesFromLocalStorage(
    "favourites"
  );

  const productData = {
    favouritesFromLocalStorage,
  };

  return async (dispatch) => {
    try {
      dispatch(startLoadingProducts());
      const getFavouriteProductsResponse = await axios.post(
        "/get-favourites",
        productData
      );
      dispatch({
        type: SET_FAVOURITES,
        payload: getFavouriteProductsResponse.data,
      });
      removeAllFavouritesFromLocalStorage("favourites");
      dispatch(stopLoadingProducts());
      return true;
    } catch (err) {
      console.log(err);
    }
  };
};

export const getFavouriteProducts = () => {
  const favouritesFromLocalStorage = parseFavouritesFromLocalStorage(
    "favourites"
  );

  const productData = {
    favouritesFromLocalStorage,
  };

  return async (dispatch) => {
    try {
      const getFavouriteProductsResponse = await axios.post(
        "/get-favourites",
        productData
      );
      dispatch({
        type: SET_FAVOURITES,
        payload: getFavouriteProductsResponse.data,
      });
      removeAllFavouritesFromLocalStorage("favourites");
      return true;
    } catch (err) {
      console.log(err);
    }
  };
};

export const addFavouriteProduct = (product) => {
  const productData = {
    product,
  };
  console.log(product);
  return async (dispatch) => {
    try {
      await axios.post("/add-favourite", productData);
      dispatch(getFavouriteProducts());
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeFavouriteProduct = (product) => {
  const productData = {
    product,
  };
  return async (dispatch) => {
    try {
      await axios.post("/remove-favourite", productData);
      dispatch(getFavouritesList());
    } catch (err) {
      console.log(err);
    }
  };
};
