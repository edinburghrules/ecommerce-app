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

  const favouritesFromLocalStorageData = {
    favouritesFromLocalStorage,
  };

  return async (dispatch) => {
    try {
      dispatch(startLoadingProducts());
      const getFavouriteProductsResponse = await axios.post(
        "/get-favourites",
        favouritesFromLocalStorageData
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
}

export const getFavouriteProducts = () => {
  const favouritesFromLocalStorage = parseFavouritesFromLocalStorage(
    "favourites"
  );

  const favouritesFromLocalStorageData = {
    favouritesFromLocalStorage,
  };

  return async (dispatch) => {
    try {
      // dispatch(startLoadingProducts());
      const getFavouriteProductsResponse = await axios.post(
        "/get-favourites",
        favouritesFromLocalStorageData
      );
      dispatch({
        type: SET_FAVOURITES,
        payload: getFavouriteProductsResponse.data,
      });
      removeAllFavouritesFromLocalStorage("favourites");
      // dispatch(stopLoadingProducts());
      return true;
    } catch (err) {
      console.log(err);
    }
  };
};

export const addFavouriteProduct = (product) => {
  const addFavouriteData = {
    product,
  };
  return async (dispatch) => {
    try {
      await axios.post("/add-favourite", addFavouriteData);
      dispatch(getFavouriteProducts());
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeFavouriteProduct = (product) => {
  const removeFavouriteData = {
    product,
  };
  return async (dispatch) => {
    try {
      await axios.post("/remove-favourite", removeFavouriteData);
      dispatch(getFavouritesList());
    } catch (err) {
      console.log(err);
    }
  };
};
