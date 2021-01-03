import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import accountReducer from './reducers/accountReducer';
import productReducer from './reducers/productReducer';

const middleware = [thunk];

const rootReducer = combineReducers({
  account: accountReducer,
  products: productReducer,
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
