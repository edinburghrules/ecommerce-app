import React from "react";
import ReactDOM from "react-dom";
import store from "./redux/store";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import { signOut, getAccountData } from "./redux/actions/accountActions";
import { getCart } from "./redux/actions/cartActions";
import jwtDecode from "jwt-decode";
import { appLoaded } from "./redux/actions/asyncActions";
import ScrollToTop from "./utils/scroll-to-top";

axios.defaults.baseURL =
  "https://us-central1-e-commerce-app-9b649.cloudfunctions.net/api";

const token = localStorage.firebaseToken;

async function load() {
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 10000 < Date.now()) {
      store.dispatch(signOut());
      await store.dispatch(appLoaded());
      render();
    } else {
      axios.defaults.headers.common["Authorization"] = token;
      await store.dispatch(getAccountData());
      render();
    }
  } else {
    await store.dispatch(getCart(false));
    await store.dispatch(appLoaded());
    render();
  }
}

function render() {
  ReactDOM.render(
    <Router>
      <Provider store={store}>
        <ScrollToTop />
        <App />
      </Provider>
    </Router>,
    document.getElementById("root")
  );
}

load();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
