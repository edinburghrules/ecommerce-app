import "./App.scss";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import axios from "axios";
import PrivateRoute from "./utils/private-route/PrivateRoute";
import jwtDecode from "jwt-decode";
import {
  mensApparelLinks,
  mensShoeLinks,
  mensCollectionLinks,
  womensApparelLinks,
  womensShoeLinks,
  womensCollectionLinks,
} from "./navigation-links/navigation-links";
import NavigationBar from "./components/navigation-bar/navigation-bar";
import Home from "./pages/home/home-page";
import Signin from "./pages/auth/signin/sign-in";
import Register from "./pages/auth/register/register";
import ResetPassword from "./pages/auth/reset-password/reset-password";
import ProductListPage from "./pages/products/product-list/product-list-page";
import FavouritesPage from "./pages/favourites/favourites-page";
import { signOut, getAccountData } from "./redux/actions/accountActions";

const token = localStorage.firebaseToken;

function load() {
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 10000 < Date.now()) {
      store.dispatch(signOut());
    } else {
      axios.defaults.headers.common["Authorization"] = token;
      store.dispatch(getAccountData());
    }
  } else {
    return null;
  }
}

load();

const App = (props) => {
  return (
    <Provider store={store}>
      <div className="App">
        <NavigationBar
          mensApparelLinks={mensApparelLinks}
          mensShoeLinks={mensShoeLinks}
          mensCollectionLinks={mensCollectionLinks}
          womensApparelLinks={womensApparelLinks}
          womensShoeLinks={womensShoeLinks}
          womensCollectionLinks={womensCollectionLinks}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/signIn" component={Signin} />
          <PrivateRoute path="/register" component={Register} />
          <PrivateRoute path="/reset-password" component={ResetPassword} />
          <Route path="/collection/:collection" component={ProductListPage} />
          <Route path="/favourites/:accountId?" component={FavouritesPage} />
        </Switch>
      </div>
    </Provider>
  );
};

export default App;
