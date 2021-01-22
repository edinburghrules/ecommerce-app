import axios from 'axios';
import { SET_FAVOURITES } from '../types';

export const getFavouriteProducts = () => {
  return async (dispatch) => {
    try {
      const getFavouriteProductsResponse = await axios.get('/get-favourites');
      dispatch({
        type: SET_FAVOURITES,
        payload: getFavouriteProductsResponse.data,
      });
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
      await axios.post('/add-favourite', addFavouriteData);
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
      await axios.post('/remove-favourite', removeFavouriteData);
      dispatch(getFavouriteProducts());
    } catch (err) {
      console.log(err);
    }
  };
};
