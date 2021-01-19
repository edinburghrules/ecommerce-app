import axios from 'axios';
import { SET_FAVOURITES } from '../types';

export const getFavouriteProducts = () => {
  return async (dispatch) => {
    try {
      const getFavouriteProductsResponse = await axios.get('get-favourites');
      console.log(getFavouriteProductsResponse.data);
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
  return async () => {
    try {
      await axios.post('/add-favourite', addFavouriteData);
    } catch (err) {
      console.log(err);
    }
  };
};
