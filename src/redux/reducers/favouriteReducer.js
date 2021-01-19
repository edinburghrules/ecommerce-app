import { SET_FAVOURITES, UNSET_FAVOURITES } from '../types';

const initState = {
  favourites: [],
};

const favouriteReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_FAVOURITES:
      return {
        favourites: [...action.payload],
      };
    case UNSET_FAVOURITES:
      return {
        favourites: [],
      };
    default:
      return state;
  }
};

export default favouriteReducer;
