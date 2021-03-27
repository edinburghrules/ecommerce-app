import React from "react";
import "./App.scss";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PrivateRoute from "./utils/private-route/PrivateRoute";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
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
import AccountPage from "./pages/account/account-page";
import ReviewForm from "./pages/review-form/review-form";
import AddressForm from "./pages/address-form/address-form";
import ResetPassword from "./pages/auth/reset-password/reset-password";
import ProductListPage from "./pages/products/product-list/product-list-page";
import ProductPage from "./pages/products/product/product-page";
import FavouritesPage from "./pages/favourites/favourites-page";
import CheckoutPage from "./pages/checkout/checkout-page";
import OrderConfirmationPage from "./pages/order-confirmation/order-confirmation-page";
import Loading from "./components/loading/loading";

// 404 Gif
// <iframe src="https://giphy.com/embed/RjoLWhQBFEcHS" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/RjoLWhQBFEcHS">via GIPHY</a></p>

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY, {
  locale: "en-",
});

const App = (props) => {
  const { location, appLoaded } = props;
  return (
    <Elements stripe={stripePromise}>
      <div className="App">
        {location.pathname !== "/checkout" &&
          !location.pathname.includes("/order-confirmation/") && (
            <NavigationBar
              mensApparelLinks={mensApparelLinks}
              mensShoeLinks={mensShoeLinks}
              mensCollectionLinks={mensCollectionLinks}
              womensApparelLinks={womensApparelLinks}
              womensShoeLinks={womensShoeLinks}
              womensCollectionLinks={womensCollectionLinks}
            />
          )}
        {!appLoaded ? (
          <Loading
            style={{
              height: "100%",
              width: "100%",
              transform: "translateY(50rem)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        ) : (
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute path="/signIn" component={Signin} />
            <PrivateRoute path="/register" component={Register} />
            <PrivateRoute path="/reset-password" component={ResetPassword} />
            <Route exact path="/account/:accountId" component={AccountPage} />
            <Route
              path="/account/:accountId/manage-address"
              component={AddressForm}
            />
            <Route
              path="/leave-review/:collection/:category/:orderId/:productId"
              component={ReviewForm}
            />
            <Route
              exact
              path="/collection/:collection/:category?"
              component={ProductListPage}
            />
            <Route
              path={"/collection/:collection/:category?/product/:id"}
              component={ProductPage}
            />
            <Route path="/favourites/:accountId?" component={FavouritesPage} />
            <Route path="/checkout" component={CheckoutPage} />
            <Route
              path="/order-confirmation/:orderId"
              component={OrderConfirmationPage}
            />
          </Switch>
        )}
      </div>
    </Elements>
  );
};

const mapStateToProps = (state) => ({
  appLoaded: state.async.appLoaded,
});

export default withRouter(connect(mapStateToProps)(App));
