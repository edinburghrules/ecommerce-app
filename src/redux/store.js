import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import accountReducer from './reducers/accountReducer';
import productReducer from './reducers/productReducer';
import asyncReducer from './reducers/asyncReducer';

const middleware = [thunk];

const rootReducer = combineReducers({
  account: accountReducer,
  products: productReducer,
  async: asyncReducer
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
