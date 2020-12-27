import { SET_ACCOUNT, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from '../types';

const initState = {
  authenticated: false,
  credentials: {},
};

const accountReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        authenticated: false,
      };
    case SET_ACCOUNT:
      return {
        authenticated: true,
        credentials: action.payload.credentials,
      };
    default:
      return state;
  }
};

export default accountReducer;
