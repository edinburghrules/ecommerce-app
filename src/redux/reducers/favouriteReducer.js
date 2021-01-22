import { SET_FAVOURITES, UNSET_FAVOURITES } from '../types';

const initState = {
  favouritesList: [],
};

const favouriteReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_FAVOURITES:
      return {
        favouritesList: [...action.payload],
      };
    case UNSET_FAVOURITES:
      return {
        favouritesList: [],
      };
    default:
      return state;
  }
};

export default favouriteReducer;
