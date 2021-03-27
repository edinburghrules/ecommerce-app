import React from "react";
import "./checkout-page.scss";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { ElementsConsumer } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/checkout-form/checkout-form";
import CheckoutLineItem from "../../components/checkout-line-item/checkout-line-item";
import amexIcon from "../../assets/001-amex.svg";
import mastercardIcon from "../../assets/002-mastercard.svg";
import americanexpressIcon from "../../assets/003-american-express.svg";
import visaIcon from "../../assets/004-visa.svg";

const CheckoutPage = (props) => {
  const { cartList, authenticated, credentials, history } = props;

  const totalPrice = cartList.reduce(function (total, currentValue) {
    if (currentValue.qty > 1) {
      total += currentValue.price * currentValue.qty;
    } else {
      total += currentValue.price;
    }
    return total;
  }, 0);

  const shipping = totalPrice > 45 ? 0.0 : 5.0;

  if (!props.location.state) {
    return <Redirect to="/" />;
  }

  if (props.location.state && props.location.state.fromCart)
    return (
      <div className="checkout-page">
        <div className="checkout-page__left-col">
          <Link
            className="checkout-page__logo"
            to={{ pathname: "/", state: { fromCheckout: true } }}
          >
            apparel.
          </Link>
          <h1>Checkout</h1>
          <p className='checkout-page__cards'>Credit or Debit Card</p>
          <div className="checkout-page__card-icons-container">
            <img src={amexIcon} />
            <img src={americanexpressIcon} />
            <img src={visaIcon} />
            <img src={mastercardIcon} />
          </div>
          <div className="checkout-page__form">
            <ElementsConsumer>
              {({ stripe, elements }) => (
                <CheckoutForm
                  shipping={shipping}
                  authenticated={authenticated}
                  stripe={stripe}
                  elements={elements}
                  totalPrice={totalPrice}
                  credentials={credentials}
                  lineItems={cartList}
                  history={history}
                />
              )}
            </ElementsConsumer>
          </div>
        </div>
        <div className="checkout-page__right-col">
          <div className="checkout-page__line-items">
            {cartList &&
              cartList.map((cartItem, index) => (
                <CheckoutLineItem key={index} lineItem={cartItem} />
              ))}
          </div>
          <div className="checkout-page__total-charges">
            <div className="checkout-page__charge">
              <p>Subtotal: </p>
              <p>£{totalPrice}</p>
            </div>
            <div className="checkout-page__charge">
              <p>Shipping: </p>
              <p>{shipping === 0.0 ? "Free" : `£${shipping}`}</p>
            </div>
            <div className="checkout-page__charge">
              <p>Total: </p>
              <p>£{totalPrice + shipping}</p>
            </div>
          </div>
        </div>
      </div>
    );
};

const mapStateToProps = (state) => ({
  authenticated: state.account.authenticated,
  credentials: state.account.credentials,
  cartList: state.cart.cartList,
});

export default connect(mapStateToProps)(CheckoutPage);
