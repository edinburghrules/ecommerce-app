import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "../types";

const initState = {
  authenticated: false,
  credentials: {},
};

const accountReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        authenticated: true,
        credentials: action.payload.credentials,
      };
    case SET_UNAUTHENTICATED:
      return {
        authenticated: false,
        credentials: {},
      };
    default:
      return state;
  }
};

export default accountReducer;
