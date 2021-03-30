import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import accountReducer from "./reducers/accountReducer";
import favouriteReducer from "./reducers/favouriteReducer";
import cartReducer from "./reducers/cartReducer";
import orderReducer from "./reducers/orderReducer";
import productReducer from "./reducers/productReducer";
import asyncReducer from "./reducers/asyncReducer";
import reviewsReducer from "./reducers/reviewsReducer";

const middleware = [thunk];

const rootReducer = combineReducers({
  account: accountReducer,
  favourites: favouriteReducer,
  cart: cartReducer,
  products: productReducer,
  async: asyncReducer,
  reviews: reviewsReducer,
  orders: orderReducer,
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
